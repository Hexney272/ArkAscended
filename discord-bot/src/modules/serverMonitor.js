/**
 * Server Monitor Module
 * Az ARK: Survival Ascended szerver élő státuszának lekérdezése
 * és megjelenítése egy folyamatosan frissülő Discord embedben.
 *
 * FONTOS: Egyetlen szerver van! A "Primal Chaos" és "Primal
 * Descended" nem külön szerverek, hanem MODOK, amik együtt futnak
 * ugyanazon a szerveren (lásd SZERVER_INFO.md / MOD_ID_LISTA.md:
 * Ark Primal Chaos ID 932714, Ark Descended ID 952367).
 *
 * FONTOS KORLÁT: ASA a lekérdezéshez az Epic Online Services (EOS)
 * protokollt használja, NEM a régi Source/Valve A2S-t. Az EOS
 * protokoll NEM ad vissza játékos-név listát - csak azt tudjuk
 * lekérni, hogy a szerver fut-e, hány játékos van fent (szám),
 * és milyen a térkép/verzió infó. Ez a játék motorjának korlátja,
 * nem kódolható meg másképp jelenleg semmilyen külső bot számára.
 *
 * Forrás: https://github.com/gamedig/node-gamedig/blob/master/GAMES_LIST.md
 * ("EOS Protocol: EOS does not provide players data")
 */

import { GameDig } from 'gamedig';
import { WildArkEmbed } from '../utils/embedBuilder.js';
import logger from '../utils/logger.js';

// Az élő státusz embed üzenet-referenciája (frissítéshez kell).
// FONTOS: a guild ID-t is eltároljuk, mert hosszú ideig futó
// setInterval mellett a discord.js belső "sweeper" mechanizmusa
// időszakosan kitisztíthatja a channel cache-t - ha a Message
// objektum .channel getter-e (ami mindig client.channels.resolve()-t
// hív) nem talál semmit, DiscordjsError [ChannelNotCached] dobódik.
// Ezért minden frissítéskor FRISSEN lekérjük a csatornát a guild-ből
// (nem a régi Message.channel getterre bízzuk), és ha a csatorna
// maga sincs a cache-ben, guild.channels.fetch()-csel API-hívással
// visszaszerezzük.
let statusMessageId = null;
let statusChannelId = null;
let statusGuildId = null;
let refreshInterval = null;

/**
 * A szerver kapcsolati adatai a .env-ből.
 * Ha nincs megadva host, a bot "ismeretlen" státusszal jelzi,
 * de nem áll el - csak a monitor funkciót hagyja ki.
 */
function getServerConfig() {
  return {
    label: '🦖🌊 WildArk Szerver',
    subtitle: 'Primal Chaos + Primal Descended mod',
    host: process.env.ARK_SERVER_HOST || '',
    port: parseInt(process.env.ARK_SERVER_QUERY_PORT || '27015', 10),
  };
}

/**
 * A szerver lekérdezése. Sosem dob hibát kifelé - ha a lekérdezés
 * elhasal (szerver offline, hibás host/port, timeout), "offline"
 * státusszal tér vissza.
 *
 * @returns {Promise<object>} - Normalizált státusz objektum
 */
async function queryServer() {
  const server = getServerConfig();

  if (!server.host) {
    return {
      ...server,
      status: 'unknown',
      online: false,
      players: null,
      maxPlayers: null,
      map: null,
    };
  }

  try {
    const state = await GameDig.query({
      type: 'asa',
      host: server.host,
      port: server.port,
      socketTimeout: 5000,
      attemptTimeout: 8000,
    });

    return {
      ...server,
      status: 'online',
      online: true,
      players: state.numplayers ?? state.players?.length ?? 0,
      maxPlayers: state.maxplayers ?? null,
      map: state.map || null,
    };
  } catch (error) {
    // Az ASA lekérdezés az Epic Online Services matchmaking API-ját
    // hívja (nem közvetlen UDP kapcsolatot a szerverhez!) - a bot
    // ott KERESI a szervert a globális session-listában IP+port
    // alapján. Ha Epic nem hirdeti megfelelően a session-t (ismert,
    // dokumentált jelenség ASA dedicated szervereknél, ún. "No
    // Sessions Found"), a lekérdezés "Server not found" hibát ad,
    // FÜGGETLENÜL attól, hogy a szerver valójában fut-e a
    // játékosok számára. Ez nem javítható a bot kódjából - Epic
    // oldali hirdetési probléma.
    const isNotFound = error.message?.includes('Server not found') ||
                        error.stack?.includes('Server not found');

    if (isNotFound) {
      logger.warn(
        `⚠️ Epic nem találja a szervert a matchmaking listájában ` +
        `(${server.host}:${server.port}). Ez nem feltétlenül jelenti, ` +
        `hogy a szerver offline - lehet Epic-oldali session-hirdetési ` +
        `hiba (ismert ASA jelenség). Próbáld csatlakozni közvetlenül ` +
        `a játékból, hogy megerősítsd, fut-e valójában.`
      );
    } else {
      logger.warn(`⚠️ Nem sikerült lekérdezni a szervert (${server.host}:${server.port}) - ${error.message}`);
    }

    return {
      ...server,
      status: 'offline',
      online: false,
      players: null,
      maxPlayers: null,
      map: null,
      queryLimitation: isNotFound,
    };
  }
}

/**
 * Szöveg összeállítása a lekérdezés eredményéből.
 * @param {object} result
 * @returns {string}
 */
function formatServerLine(result) {
  if (result.status === 'unknown') {
    return `${result.label}\n⚪ Nincs beállítva (hiányzó ARK_SERVER_HOST a .env-ben)`;
  }

  if (!result.online) {
    if (result.queryLimitation) {
      return `${result.label}\n🟡 Nem található az Epic session-listában\n` +
             `_(lehet, hogy fut - Epic-oldali hirdetési korlát, próbálj csatlakozni a játékból)_`;
    }
    return `${result.label}\n🔴 Offline vagy nem elérhető`;
  }

  const playerCount = result.maxPlayers != null
    ? `${result.players}/${result.maxPlayers}`
    : `${result.players}`;

  const mapLine = result.map ? `\n🗺️ Térkép: ${result.map}` : '';

  return `${result.label} (${result.subtitle})\n🟢 Online — 👥 ${playerCount} játékos${mapLine}`;
}

/**
 * Státusz embed felépítése a lekérdezés eredményéből.
 * @param {object} result
 * @returns {WildArkEmbed}
 */
function buildStatusEmbed(result) {
  const embed = new WildArkEmbed()
    .setTitle('📊 WildArk Szerver Státusz')
    .setDescription(
      formatServerLine(result) +
      `\n\n_Utolsó frissítés: <t:${Math.floor(Date.now() / 1000)}:R>_` +
      `\n\n⚠️ *Játékosnevek listája technikai okból nem elérhető ` +
      `(ARK: Survival Ascended nem ad vissza név-listát).*`
    );

  return embed;
}

/**
 * Élő státusz embed kiküldése és periodikus frissítés indítása.
 * A /setup ismételt futtatásakor nem hoz létre új üzenetet, hanem
 * a meglévőt keresi meg és onnantól azt frissíti.
 *
 * @param {Guild} guild - Discord Guild
 */
export async function setupServerMonitor(guild) {
  logger.info('📊 Szerver státusz monitor beállítása...');

  try {
    const channel = await resolveStatusChannel(guild);

    if (!channel) {
      logger.warn('⚠️ Szerver státusz csatorna nem található, kihagyva.');
      return false;
    }

    const result = await queryServer();
    const embed = buildStatusEmbed(result);

    // Keressünk egy már létező státusz-üzenetet a botunktól, hogy
    // ne duplikáljunk /setup újrafuttatásakor
    const recentMessages = await channel.messages.fetch({ limit: 10 });
    const existing = recentMessages.find(
      msg => msg.author.id === guild.client.user.id &&
             msg.embeds[0]?.title === '📊 WildArk Szerver Státusz'
    );

    let message;
    if (existing) {
      message = await existing.edit({ embeds: [embed] });
      logger.success('✅ Meglévő szerver státusz üzenet frissítve.');
    } else {
      message = await channel.send({ embeds: [embed] });
      logger.success('✅ Szerver státusz panel létrehozva.');
    }

    // Csak ID-kat tárolunk, nem magukat az objektumokat - így minden
    // frissítéskor FRISSEN kérjük le a csatornát/guildet a cache-ből
    // (vagy API hívással, ha közben kikerült onnan), sosem hagyatkozunk
    // egy régi Message/Channel objektum belső getter-eire.
    statusMessageId = message.id;
    statusChannelId = channel.id;
    statusGuildId = guild.id;

    startAutoRefresh(guild.client);
    return message;

  } catch (error) {
    logger.error('Hiba a szerver státusz monitor beállításakor:', error);
    return false;
  }
}

/**
 * Státusz csatorna megkeresése/lekérése a guild-ből.
 * @param {Guild} guild
 * @returns {Promise<TextChannel|null>}
 */
async function resolveStatusChannel(guild) {
  return guild.channels.cache.find(ch => ch.name === '📊-szerver-státusz') ?? null;
}

/**
 * Periodikus frissítés indítása (setInterval). Ha már fut egy
 * korábbi timer, előbb leállítjuk, hogy ne halmozódjanak.
 *
 * Minden ütemezett futásnál FRISSEN kérjük le a guild -> channel ->
 * message láncot a client cache-éből (szükség esetén API fetch-csel),
 * hogy elkerüljük a "ChannelNotCached" / "Unknown Message" hibákat,
 * amik egy hosszú ideig élő, elévült objektum-referencia használatából
 * adódnának.
 *
 * @param {Client} client - Discord Client (a guild/channel/message
 *   friss lekéréséhez van rá szükség minden tick-nél)
 */
function startAutoRefresh(client) {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  const minutes = parseFloat(process.env.SERVER_STATUS_REFRESH_MINUTES || '1');
  const intervalMs = Math.max(minutes, 0.5) * 60 * 1000;

  refreshInterval = setInterval(async () => {
    if (!statusMessageId || !statusChannelId || !statusGuildId) return;

    try {
      // 1. Guild friss lekérése (cache-ből, ez ritkán esik ki)
      const guild = client.guilds.cache.get(statusGuildId);
      if (!guild) {
        logger.warn('⚠️ Guild nem található a cache-ben, státusz frissítés kihagyva.');
        return;
      }

      // 2. Csatorna friss lekérése - ha kikerült a cache-ből,
      // fetch()-csel API-hívással visszaszerezzük
      let channel = guild.channels.cache.get(statusChannelId);
      if (!channel) {
        channel = await guild.channels.fetch(statusChannelId).catch(() => null);
      }
      if (!channel) {
        logger.warn('⚠️ Státusz csatorna nem található (törölve?), automatikus frissítés leáll.');
        clearInterval(refreshInterval);
        refreshInterval = null;
        return;
      }

      const result = await queryServer();
      const embed = buildStatusEmbed(result);

      // 3. Üzenet szerkesztése ID alapján, a FRISS channel objektumon -
      // ha az üzenetet törölték (Unknown Message / 10008), a catch-ág
      // ezt kezeli és újat hoz létre.
      try {
        await channel.messages.edit(statusMessageId, { embeds: [embed] });
      } catch (editError) {
        const isMissingMessage = editError.code === 10008 ||
                                  editError.message?.includes('Unknown Message');

        if (isMissingMessage) {
          logger.warn('⚠️ A státusz üzenetet törölték - új panel létrehozása...');
          const newMessage = await channel.send({ embeds: [embed] });
          statusMessageId = newMessage.id;
          statusChannelId = channel.id;
          logger.success('✅ Új szerver státusz panel létrehozva a törölt helyett.');
        } else {
          throw editError;
        }
      }

    } catch (error) {
      logger.error('Hiba az automatikus státusz frissítés során:', error);
    }
  }, intervalMs);

  logger.info(`🔄 Automatikus státusz frissítés elindult (${minutes} percenként).`);
}

/**
 * Kézi, azonnali lekérdezés egy embed visszaadásával
 * (a /serverstatus parancshoz).
 * @returns {Promise<WildArkEmbed>}
 */
export async function getServerStatusEmbed() {
  const result = await queryServer();
  return buildStatusEmbed(result);
}

export default {
  setupServerMonitor,
  getServerStatusEmbed,
};
