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

// Az élő státusz embed üzenet-referenciája (frissítéshez kell)
let statusMessage = null;
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
    logger.warn(`⚠️ Nem sikerült lekérdezni a szervert (${server.host}:${server.port}) - ${error.message}`);
    return {
      ...server,
      status: 'offline',
      online: false,
      players: null,
      maxPlayers: null,
      map: null,
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
    const channel = guild.channels.cache.find(ch => ch.name === '📊-szerver-státusz');

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

    if (existing) {
      statusMessage = await existing.edit({ embeds: [embed] });
      logger.success('✅ Meglévő szerver státusz üzenet frissítve.');
    } else {
      statusMessage = await channel.send({ embeds: [embed] });
      logger.success('✅ Szerver státusz panel létrehozva.');
    }

    startAutoRefresh();
    return statusMessage;

  } catch (error) {
    logger.error('Hiba a szerver státusz monitor beállításakor:', error);
    return false;
  }
}

/**
 * Periodikus frissítés indítása (setInterval). Ha már fut egy
 * korábbi timer, előbb leállítjuk, hogy ne halmozódjanak.
 */
function startAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  const minutes = parseFloat(process.env.SERVER_STATUS_REFRESH_MINUTES || '1');
  const intervalMs = Math.max(minutes, 0.5) * 60 * 1000;

  refreshInterval = setInterval(async () => {
    if (!statusMessage) return;

    try {
      const result = await queryServer();
      const embed = buildStatusEmbed(result);
      await statusMessage.edit({ embeds: [embed] });
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
