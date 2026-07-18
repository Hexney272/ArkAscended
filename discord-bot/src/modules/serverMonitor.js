/**
 * Server Monitor Module
 * ARK: Survival Ascended szerverek élő státuszának lekérdezése
 * és megjelenítése egy folyamatosan frissülő Discord embedben.
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

/**
 * Figyelt szerverek listája. A host/port a .env-ből jön - ha egy
 * szerverhez nincs host megadva, "ismeretlen" státusszal jelezzük,
 * de a bot nem áll el a többi szervertől.
 */
function getMonitoredServers() {
  return [
    {
      key: 'chaos',
      label: '🦖 Primal Chaos',
      host: process.env.CHAOS_SERVER_HOST || '',
      port: parseInt(process.env.CHAOS_SERVER_QUERY_PORT || '27015', 10),
    },
    {
      key: 'descended',
      label: '🌊 Primal Descended',
      host: process.env.DESCENDED_SERVER_HOST || '',
      port: parseInt(process.env.DESCENDED_SERVER_QUERY_PORT || '27015', 10),
    },
    {
      key: 'tides',
      label: '⚔️ Tides of Fortune',
      host: process.env.TIDES_SERVER_HOST || '',
      port: parseInt(process.env.TIDES_SERVER_QUERY_PORT || '27015', 10),
    },
  ];
}

// Az élő státusz embed üzenet-referenciája (frissítéshez kell)
let statusMessage = null;
let refreshInterval = null;

/**
 * Egyetlen szerver lekérdezése. Sosem dob hibát kifelé - ha a
 * lekérdezés elhasal (szerver offline, hibás host/port, timeout),
 * "offline" státusszal tér vissza, hogy a többi szerver lekérdezése
 * ne akadjon el miatta.
 *
 * @param {{key: string, label: string, host: string, port: number}} server
 * @returns {Promise<object>} - Normalizált státusz objektum
 */
async function queryServer(server) {
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
    logger.warn(`⚠️ Nem sikerült lekérdezni: ${server.label} (${server.host}:${server.port}) - ${error.message}`);
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
 * Minden figyelt szerver lekérdezése párhuzamosan.
 * @returns {Promise<object[]>}
 */
export async function queryAllServers() {
  const servers = getMonitoredServers();
  return Promise.all(servers.map(queryServer));
}

/**
 * Egy sor szöveg összeállítása egy szerver eredményéből.
 * @param {object} result
 * @returns {string}
 */
function formatServerLine(result) {
  if (result.status === 'unknown') {
    return `${result.label}\n⚪ Nincs beállítva (hiányzó host a .env-ben)`;
  }

  if (!result.online) {
    return `${result.label}\n🔴 Offline vagy nem elérhető`;
  }

  const playerCount = result.maxPlayers != null
    ? `${result.players}/${result.maxPlayers}`
    : `${result.players}`;

  const mapLine = result.map ? `\n🗺️ Térkép: ${result.map}` : '';

  return `${result.label}\n🟢 Online — 👥 ${playerCount} játékos${mapLine}`;
}

/**
 * Státusz embed felépítése a lekérdezési eredményekből.
 * @param {object[]} results
 * @returns {WildArkEmbed}
 */
function buildStatusEmbed(results) {
  const embed = new WildArkEmbed()
    .setTitle('📊 WildArk Szerver Státusz')
    .setDescription(
      results.map(formatServerLine).join('\n\n') +
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

    const results = await queryAllServers();
    const embed = buildStatusEmbed(results);

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

    startAutoRefresh(guild);
    return statusMessage;

  } catch (error) {
    logger.error('Hiba a szerver státusz monitor beállításakor:', error);
    return false;
  }
}

/**
 * Periodikus frissítés indítása (setInterval). Ha már fut egy
 * korábbi timer, előbb leállítjuk, hogy ne halmozódjanak.
 *
 * @param {Guild} guild - Discord Guild
 */
function startAutoRefresh(guild) {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  const minutes = parseFloat(process.env.SERVER_STATUS_REFRESH_MINUTES || '1');
  const intervalMs = Math.max(minutes, 0.5) * 60 * 1000;

  refreshInterval = setInterval(async () => {
    if (!statusMessage) return;

    try {
      const results = await queryAllServers();
      const embed = buildStatusEmbed(results);
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
  const results = await queryAllServers();
  return buildStatusEmbed(results);
}

export default {
  setupServerMonitor,
  queryAllServers,
  getServerStatusEmbed,
};
