/**
 * Translations
 * Magyar / English szövegek a taghoz (személyesen) irányuló üzenetekhez.
 *
 * A megosztott, publikus csatornákba kerülő embedek (szabályzat, reaction
 * roles panel, ticket panel bejegyzés) továbbra is magyarul jelennek meg,
 * mivel azokat minden tag látja egyszerre, választott nyelvtől függetlenül.
 * Ez a fájl a SZEMÉLYES üzenetekhez (welcome, ticket, DM) ad fordítást,
 * amelyeket a getMemberLanguage() által megállapított nyelven küldünk.
 */

export const translations = {
  hu: {
    welcomeTitle: '👋 Üdvözlünk a WildArk közösségében!',
    welcomeDescription: (member) =>
      `Szia ${member}! 🦖\n\n` +
      `Köszönjük, hogy csatlakoztál hozzánk!\n\n` +
      `📜 Először is olvasd el a szabályzatot\n` +
      `🎭 Válassz szerver rangot magadnak\n` +
      `💬 Mutatkozz be az általános csatornában\n\n` +
      `Jó játékot kívánunk! 🎮`,
    welcomeJoinedLine: (member) => `${member} csatlakozott a szerverhez!`,

    ticketAlreadyOpen: (channelId) =>
      `⚠️ Már van egy aktív ticketed: <#${channelId}>\n` +
      `Kérlek, azt használd vagy zárd be, mielőtt újat nyitsz!`,
    ticketWelcomeTitle: (ticketNumber) => `🎫 Ticket #${ticketNumber}`,
    ticketWelcomeDescription: (member) =>
      `Szia ${member}! 👋\n\n` +
      `Köszönjük, hogy felvetted velünk a kapcsolatot!\n\n` +
      `📝 **Kérlek, írd le részletesen a problémádat vagy kérdésedet.**\n` +
      `⏰ A staff hamarosan válaszol.\n\n` +
      `A ticket bezárásához kattints a 🔒 gombra vagy használd a \`/ticket-close\` parancsot.`,
    ticketCloseButton: 'Ticket bezárása',
    ticketCreatedDM: (channelId, ticketNumber) =>
      `✅ Ticket létrehozva: <#${channelId}>\n` +
      `Ticket szám: **#${ticketNumber}**\n` +
      `A staff hamarosan válaszol!`,

    roleGrantedDM: (roleName) => `🎉 Megkaptad a **${roleName}** rangot a WildArk szerveren!`,

    languageSwitched: '✅ Nyelv átállítva **Magyar**-ra!',
  },

  en: {
    welcomeTitle: '👋 Welcome to the WildArk community!',
    welcomeDescription: (member) =>
      `Hi ${member}! 🦖\n\n` +
      `Thanks for joining us!\n\n` +
      `📜 First, please read the rules\n` +
      `🎭 Pick a server role for yourself\n` +
      `💬 Introduce yourself in the general channel\n\n` +
      `Have fun gaming! 🎮`,
    welcomeJoinedLine: (member) => `${member} joined the server!`,

    ticketAlreadyOpen: (channelId) =>
      `⚠️ You already have an active ticket: <#${channelId}>\n` +
      `Please use that one or close it before opening a new one!`,
    ticketWelcomeTitle: (ticketNumber) => `🎫 Ticket #${ticketNumber}`,
    ticketWelcomeDescription: (member) =>
      `Hi ${member}! 👋\n\n` +
      `Thanks for reaching out to us!\n\n` +
      `📝 **Please describe your issue or question in detail.**\n` +
      `⏰ Staff will respond shortly.\n\n` +
      `To close this ticket, click the 🔒 button or use \`/ticket-close\`.`,
    ticketCloseButton: 'Close Ticket',
    ticketCreatedDM: (channelId, ticketNumber) =>
      `✅ Ticket created: <#${channelId}>\n` +
      `Ticket number: **#${ticketNumber}**\n` +
      `Staff will respond shortly!`,

    roleGrantedDM: (roleName) => `🎉 You have been given the **${roleName}** role on the WildArk server!`,

    languageSwitched: '✅ Language switched to **English**!',
  },
};

/**
 * Fordítás lekérése.
 * @param {string} langCode - 'hu' vagy 'en'
 * @param {string} key - Kulcs a translations objektumban
 * @param {...any} args - Ha a kulcs függvény, ezekkel az argumentumokkal hívjuk meg
 * @returns {string}
 */
export function t(langCode, key, ...args) {
  const lang = translations[langCode] ? langCode : 'hu';
  const entry = translations[lang][key];

  if (typeof entry === 'function') {
    return entry(...args);
  }

  return entry ?? key;
}

export default translations;
