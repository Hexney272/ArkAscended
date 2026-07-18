/**
 * Reaction Roles Module
 * Reakció alapú rangok rendszere - HU és EN csatornákban külön panel.
 *
 * A mod-rangok (Primal Chaos/Descended, Tides of Fortune) és az
 * értesítés-rangok (Értesítések/Notifications) NYELVFÜGGETLENEK -
 * egy tag bármelyik nyelvi csatornából felveheti őket, a rang
 * maga nem duplikált. Csak a PANEL (embed + reakciók) jelenik meg
 * mindkét nyelvi csatornában, a saját nyelvén.
 */

import { WildArkEmbed } from '../utils/embedBuilder.js';
import { getMemberLanguage } from './languageSystem.js';
import { t } from '../config/translations.js';
import { panelExists } from '../utils/panelGuard.js';
import logger from '../utils/logger.js';

/**
 * Reaction roles konfiguráció
 * emoji -> role name mapping (nyelvfüggetlen rangok)
 */
const REACTION_ROLE_MAP = {
  '🦖': '🦖 Primal Chaos',
  '🌊': '🌊 Primal Descended',
  '⚔️': '⚔️ Tides of Fortune',
  '🔔': '🔔 Értesítések/Notifications',
  '📢': '📢 Hírek/News',
};

/**
 * Reaction roles panelek beállítása mindkét nyelvi csatornában.
 * @param {Guild} guild - Discord Guild
 * @param {Map} roles - Létrehozott rangok
 */
export async function setupReactionRoles(guild, roles) {
  logger.info('🎭 Reaction roles beállítása...');

  try {
    // Nyelvfüggetlen rangok létrehozása, ha nem léteznek
    await createServerRoles(guild);
    await createNotificationRoles(guild);

    const huChannel = guild.channels.cache.find(ch => ch.name === '🎭-rangok');
    const enChannel = guild.channels.cache.find(ch => ch.name === '🎭-roles');

    let huResult = false;
    let enResult = false;

    if (huChannel) {
      huResult = await sendReactionPanel(huChannel, 'hu');
    } else {
      logger.warn('⚠️ Magyar rangok csatorna (🎭-rangok) nem található!');
    }

    if (enChannel) {
      enResult = await sendReactionPanel(enChannel, 'en');
    } else {
      logger.warn('⚠️ English roles channel (🎭-roles) not found!');
    }

    return huResult || enResult;

  } catch (error) {
    logger.error('Hiba a reaction roles beállításakor:', error);
    return false;
  }
}

/**
 * Egy nyelvű reaction roles panel kiküldése egy csatornába.
 * @param {TextChannel} channel
 * @param {string} lang - 'hu' vagy 'en'
 * @returns {Promise<Message|false>}
 */
async function sendReactionPanel(channel, lang) {
  const embed = WildArkEmbed.reactionRoles(lang);

  // Ha a panel már ki van küldve, ne duplikáljuk (pl. /setup újrafuttatásakor)
  if (await panelExists(channel, embed.data.title)) {
    logger.warn(`⚠️ Reaction roles panel (${lang}) már létezik, kihagyva.`);
    return false;
  }

  const message = await channel.send({ embeds: [embed] });

  for (const emoji of Object.keys(REACTION_ROLE_MAP)) {
    await message.react(emoji);
    await delay(500); // Rate limit elkerülése
  }

  logger.success(`✅ Reaction roles panel létrehozva (${lang}): ${channel.name}`);
  return message;
}

/**
 * Mod-specifikus rangok létrehozása (egy szerver, több mod fut rajta,
 * a rangok NEM nyelvspecifikusak)
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
 * Értesítés rangok létrehozása (nyelvfüggetlen)
 * @param {Guild} guild - Discord Guild
 */
async function createNotificationRoles(guild) {
  const notificationRoles = [
    { name: '🔔 Értesítések/Notifications', color: 0x8B5CF6 },
    { name: '📢 Hírek/News', color: 0xEC4899 },
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
 * Reaction role kezelése (hozzáadás/eltávolítás) - mindkét
 * nyelvi csatornát figyeli.
 * @param {MessageReaction} reaction - Discord reaction
 * @param {User} user - Discord user
 * @param {string} action - 'add' vagy 'remove'
 */
export async function handleReactionRole(reaction, user, action) {
  try {
    // Ellenőrizzük, hogy a reakció a rangok csatornák egyikében van-e
    const channelName = reaction.message.channel.name;
    if (channelName !== '🎭-rangok' && channelName !== '🎭-roles') {
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
        
        // DM küldése a usernek, a beállított nyelvén
        try {
          const langCode = getMemberLanguage(member);
          await user.send(t(langCode, 'roleGrantedDM', roleName));
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
