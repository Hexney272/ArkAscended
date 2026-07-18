/**
 * Panel Guard Utility
 * Segít elkerülni, hogy a /setup újrafuttatásakor duplikálódjanak
 * a panel-üzenetek (szabályzat, reaction roles, ticket panel,
 * nyelvválasztó, welcome banner).
 *
 * A setup-lépések idempotensek a rangokra/kategóriákra/csatornákra,
 * de az üzenet-küldő lépések alapból mindig új üzenetet küldtek.
 * Ez a helper megnézi, hogy a bot már küldött-e egy adott című
 * embedet a csatornába, és ha igen, kihagyjuk az újraküldést.
 */

/**
 * Megnézi, hogy létezik-e már a csatornában egy embed a megadott
 * pontos címmel, amit a bot küldött.
 *
 * @param {TextChannel} channel - Discord szöveges csatorna
 * @param {string} title - Az embed pontos címe, amit keresünk
 * @param {number} limit - Hány legutóbbi üzenetet nézzünk át (alap: 20)
 * @returns {Promise<boolean>} - true, ha már létezik ilyen panel
 */
export async function panelExists(channel, title, limit = 20) {
  try {
    const messages = await channel.messages.fetch({ limit });
    const botId = channel.client.user.id;

    return messages.some(msg =>
      msg.author.id === botId &&
      msg.embeds.length > 0 &&
      msg.embeds[0].title === title
    );
  } catch (error) {
    // Ha valamiért nem tudjuk lekérni az üzeneteket (pl. hiányzó
    // jogosultság), inkább engedjük a küldést, mint hogy leálljon a setup.
    return false;
  }
}

export default { panelExists };
