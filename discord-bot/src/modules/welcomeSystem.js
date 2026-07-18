/**
 * Welcome System Module
 * Üdvözlő rendszer új memberek számára
 */

import { WildArkEmbed } from '../utils/embedBuilder.js';
import logger from '../utils/logger.js';

/**
 * Üdvözlő üzenet küldése új membernek - a gateway (mindenki által
 * látott) welcome csatornába, MIELŐTT nyelvet választana.
 * @param {GuildMember} member - Új member
 */
export async function sendWelcomeMessage(member) {
  try {
    // Welcome csatorna keresése (gateway kategória)
    const welcomeChannel = member.guild.channels.cache.find(
      ch => ch.name === '👋-welcome'
    );

    if (!welcomeChannel) {
      logger.warn('Welcome csatorna nem található!');
      return false;
    }

    // Welcome embed létrehozása
    const embed = WildArkEmbed.welcome(member);

    // Üzenet küldése
    await welcomeChannel.send({ 
      content: `${member} csatlakozott a szerverhez!`,
      embeds: [embed] 
    });

    logger.success(`✅ Welcome üzenet elküldve: ${member.user.tag}`);
    return true;

  } catch (error) {
    logger.error('Hiba a welcome üzenet küldésekor:', error);
    return false;
  }
}

/**
 * Alapértelmezett rang hozzáadása új memberhez
 * @param {GuildMember} member - Új member
 */
export async function assignDefaultRole(member) {
  try {
    const memberRole = member.guild.roles.cache.find(r => r.name === '⚪ Member');

    if (!memberRole) {
      logger.warn('Member rang nem található!');
      return false;
    }

    await member.roles.add(memberRole);
    logger.success(`✅ Member rang hozzáadva: ${member.user.tag}`);
    return true;

  } catch (error) {
    logger.error('Hiba a default role hozzáadásakor:', error);
    return false;
  }
}

/**
 * Teljes welcome folyamat végrehajtása
 * @param {GuildMember} member - Új member
 */
export async function handleWelcome(member) {
  logger.info(`👋 Új member csatlakozott: ${member.user.tag}`);

  // Welcome üzenet
  await sendWelcomeMessage(member);

  // Default role hozzáadása
  await assignDefaultRole(member);

  // Member count frissítése
  await updateMemberCount(member.guild);
}

/**
 * Member count channel frissítése
 * @param {Guild} guild - Discord Guild
 */
async function updateMemberCount(guild) {
  try {
    const memberCount = guild.memberCount;
    
    // Member count voice channel keresése (ha létezik)
    const countChannel = guild.channels.cache.find(
      ch => ch.name.startsWith('👥 Members:')
    );

    if (countChannel) {
      await countChannel.setName(`👥 Members: ${memberCount}`);
      logger.success(`✅ Member count frissítve: ${memberCount}`);
    }

  } catch (error) {
    logger.error('Hiba a member count frissítésekor:', error);
  }
}

/**
 * Goodbye üzenet küldése távozó membernek
 * @param {GuildMember} member - Távozó member
 */
export async function sendGoodbyeMessage(member) {
  try {
    const welcomeChannel = member.guild.channels.cache.find(
      ch => ch.name === '👋-welcome'
    );

    if (!welcomeChannel) {
      return false;
    }

    await welcomeChannel.send(
      `👋 **${member.user.tag}** elhagyta a szervert. Viszlát! 😢`
    );

    logger.info(`👋 Member távozott: ${member.user.tag}`);
    
    // Member count frissítése
    await updateMemberCount(member.guild);
    
    return true;

  } catch (error) {
    logger.error('Hiba a goodbye üzenet küldésekor:', error);
    return false;
  }
}

export default {
  sendWelcomeMessage,
  assignDefaultRole,
  handleWelcome,
  sendGoodbyeMessage,
};
