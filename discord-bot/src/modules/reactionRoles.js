/**
 * Reaction Roles Module
 * Reakció alapú rangok rendszere
 */

import { WildArkEmbed } from '../utils/embedBuilder.js';
import logger from '../utils/logger.js';

/**
 * Reaction roles konfiguráció
 * emoji -> role name mapping
 */
const REACTION_ROLE_MAP = {
  '🦖': '🦖 Primal Chaos',
  '🌊': '🌊 Primal Descended',
  '⚔️': '⚔️ Tides of Fortune',
  '🔔': '🔔 Értesítések',
  '📢': '📢 Hírek',
};

/**
 * Reaction roles panel beállítása
 * @param {Guild} guild - Discord Guild
 * @param {Map} roles - Létrehozott rangok
 */
export async function setupReactionRoles(guild, roles) {
  logger.info('🎭 Reaction roles beállítása...');

  try {
    // Rangok csatorna keresése
    const rolesChannel = guild.channels.cache.find(
      ch => ch.name === '🎭-rangok'
    );

    if (!rolesChannel) {
      logger.error('Rangok csatorna nem található!');
      return false;
    }

    // Szerver-specifikus rangok létrehozása, ha nem léteznek
    await createServerRoles(guild);

    // Értesítés rangok létrehozása
    await createNotificationRoles(guild);

    // Embed létrehozása
    const embed = WildArkEmbed.reactionRoles();

    // Üzenet küldése
    const message = await rolesChannel.send({ embeds: [embed] });

    // Reakciók hozzáadása
    for (const emoji of Object.keys(REACTION_ROLE_MAP)) {
      await message.react(emoji);
      await delay(500); // Rate limit elkerülése
    }

    logger.success('✅ Reaction roles panel létrehozva!');
    return message;

  } catch (error) {
    logger.error('Hiba a reaction roles beállításakor:', error);
    return false;
  }
}

/**
 * Szerver-specifikus rangok létrehozása
 * @param {Guild} guild - Discord Guild
 */
async function createServerRoles(guild) {
  const serverRoles = [
    { name: '🦖 Primal Chaos', color: 0x10B981 },
    { name: '🌊 Primal Descended', color: 0x3B82F6 },
    { name: '⚔️ Tides of Fortune', color: 0xF59E0B },
  ];

  for (const roleData of serverRoles) {
    let role = guild.roles.cache.find(r => r.name === roleData.name);

    if (!role) {
      role = await guild.roles.create({
        name: roleData.name,
        color: roleData.color,
        hoist: false,
        reason: 'Reaction role létrehozása',
      });
      logger.success(`✅ Szerver rang létrehozva: ${roleData.name}`);
    }
  }
}

/**
 * Értesítés rangok létrehozása
 * @param {Guild} guild - Discord Guild
 */
async function createNotificationRoles(guild) {
  const notificationRoles = [
    { name: '🔔 Értesítések', color: 0x8B5CF6 },
    { name: '📢 Hírek', color: 0xEC4899 },
  ];

  for (const roleData of notificationRoles) {
    let role = guild.roles.cache.find(r => r.name === roleData.name);

    if (!role) {
      role = await guild.roles.create({
        name: roleData.name,
        color: roleData.color,
        hoist: false,
        reason: 'Értesítés rang létrehozása',
      });
      logger.success(`✅ Értesítés rang létrehozva: ${roleData.name}`);
    }
  }
}

/**
 * Reaction role kezelése (hozzáadás/eltávolítás)
 * @param {MessageReaction} reaction - Discord reaction
 * @param {User} user - Discord user
 * @param {string} action - 'add' vagy 'remove'
 */
export async function handleReactionRole(reaction, user, action) {
  try {
    // Ellenőrizzük, hogy a reakció a rangok csatornában van-e
    if (reaction.message.channel.name !== '🎭-rangok') {
      return;
    }

    const emoji = reaction.emoji.name;
    const roleName = REACTION_ROLE_MAP[emoji];

    if (!roleName) {
      return; // Nem reaction role emoji
    }

    const member = await reaction.message.guild.members.fetch(user.id);
    const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      logger.error(`Rang nem található: ${roleName}`);
      return;
    }

    if (action === 'add') {
      if (!member.roles.cache.has(role.id)) {
        await member.roles.add(role);
        logger.success(`✅ Rang hozzáadva: ${roleName} -> ${user.tag}`);
        
        // DM küldése a usernek
        try {
          await user.send(`🎉 Megkaptad a **${roleName}** rangot a WildArk szerveren!`);
        } catch (error) {
          // Ha nem lehet DM-et küldeni, nem baj
        }
      }
    } else if (action === 'remove') {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        logger.success(`✅ Rang eltávolítva: ${roleName} <- ${user.tag}`);
      }
    }

  } catch (error) {
    logger.error('Hiba a reaction role kezelésében:', error);
  }
}

/**
 * Delay utility
 * @param {number} ms - Milliszekundum
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  setupReactionRoles,
  handleReactionRole,
};
