/**
 * Language System Module
 * Nyelvválasztó reakció-panel: a tag a rang alapján kap magyar
 * vagy angol nyelvű személyes üzeneteket (welcome, ticket, DM).
 *
 * FONTOS: Ez NEM változtatja meg a Discord kliens felületi nyelvét
 * (az a felhasználó saját Discord fiók-beállítása, amihez a botnak
 * nincs hozzáférése). Ez csak azt szabályozza, hogy A BOT milyen
 * nyelven szóljon az adott taghoz.
 */

import { WildArkEmbed } from '../utils/embedBuilder.js';
import logger from '../utils/logger.js';

export const LANGUAGE_ROLES = {
  '🇭🇺': { name: '🇭🇺 Magyar', code: 'hu', color: 0x477050 },
  '🇬🇧': { name: '🇬🇧 English', code: 'en', color: 0x3B82F6 },
};

const DEFAULT_LANGUAGE = 'hu';

/**
 * Nyelvi rangok létrehozása a szerveren (ha még nem léteznek).
 * @param {Guild} guild - Discord Guild
 */
export async function createLanguageRoles(guild) {
  for (const { name, color } of Object.values(LANGUAGE_ROLES)) {
    let role = guild.roles.cache.find(r => r.name === name);

    if (!role) {
      role = await guild.roles.create({
        name,
        color,
        hoist: false,
        reason: 'Nyelvválasztó rang létrehozása',
      });
      logger.success(`✅ Nyelvi rang létrehozva: ${name}`);
    }
  }
}

/**
 * Nyelvválasztó panel kiküldése egy csatornába.
 * @param {Guild} guild - Discord Guild
 * @param {TextChannel} channel - Célcsatorna
 */
export async function setupLanguageSelector(guild, channel) {
  logger.info('🌐 Nyelvválasztó panel beállítása...');

  try {
    await createLanguageRoles(guild);

    const embed = new WildArkEmbed()
      .setTitle('🌐 Válassz nyelvet! / Choose your language!')
      .setDescription(
        `Kattints egy reakcióra a nyelv kiválasztásához.\n` +
        `A bot ezen a nyelven fog írni neked (üdvözlés, ticket).\n\n` +
        `React below to choose your language.\n` +
        `The bot will speak to you in that language (welcome, tickets).\n\n` +
        `🇭🇺 **Magyar**\n` +
        `🇬🇧 **English**`
      )
      .setColor(0x9333EA);

    const message = await channel.send({ embeds: [embed] });

    for (const emoji of Object.keys(LANGUAGE_ROLES)) {
      await message.react(emoji);
      await delay(500);
    }

    logger.success('✅ Nyelvválasztó panel létrehozva!');
    return message;

  } catch (error) {
    logger.error('Hiba a nyelvválasztó beállításakor:', error);
    return false;
  }
}

/**
 * Nyelvválasztó reakció kezelése (hozzáadás/eltávolítás).
 * Egyszerre csak egy nyelvi rangja lehet a tagnak - ha másikra
 * kattint, az előzőt automatikusan levesszük.
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 * @param {string} action - 'add' vagy 'remove'
 */
export async function handleLanguageReaction(reaction, user, action) {
  const emoji = reaction.emoji.name;
  const langData = LANGUAGE_ROLES[emoji];

  if (!langData) {
    return; // Nem nyelvválasztó emoji
  }

  try {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const role = guild.roles.cache.find(r => r.name === langData.name);

    if (!role) {
      logger.error(`Nyelvi rang nem található: ${langData.name}`);
      return;
    }

    if (action === 'add') {
      // A másik nyelvi rang levétele, ha van
      for (const other of Object.values(LANGUAGE_ROLES)) {
        if (other.code === langData.code) continue;
        const otherRole = guild.roles.cache.find(r => r.name === other.name);
        if (otherRole && member.roles.cache.has(otherRole.id)) {
          await member.roles.remove(otherRole);
        }
      }

      if (!member.roles.cache.has(role.id)) {
        await member.roles.add(role);
        logger.success(`✅ Nyelv beállítva: ${langData.code} -> ${user.tag}`);
      }

      try {
        const { t } = await import('../config/translations.js');
        await user.send(t(langData.code, 'languageSwitched'));
      } catch (dmError) {
        // DM küldés sikertelen, nem baj
      }
    } else if (action === 'remove') {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
      }
    }

  } catch (error) {
    logger.error('Hiba a nyelvválasztó reakció kezelésében:', error);
  }
}

/**
 * A tag beállított nyelvének lekérése a nyelvi rangja alapján.
 * Ha nincs beállítva nyelvi rang, a DEFAULT_LANGUAGE-t adja vissza.
 *
 * @param {GuildMember} member - Discord Member
 * @returns {string} - 'hu' vagy 'en'
 */
export function getMemberLanguage(member) {
  if (!member || !member.roles) {
    return DEFAULT_LANGUAGE;
  }

  for (const { name, code } of Object.values(LANGUAGE_ROLES)) {
    if (member.roles.cache.some(r => r.name === name)) {
      return code;
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Delay utility
 * @param {number} ms
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  LANGUAGE_ROLES,
  createLanguageRoles,
  setupLanguageSelector,
  handleLanguageReaction,
  getMemberLanguage,
};
