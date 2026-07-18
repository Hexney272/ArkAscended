/**
 * AutoMod Module
 * Automatikus moderáció rendszer
 */

import { PermissionFlagsBits } from 'discord.js';
import { WildArkEmbed } from '../utils/embedBuilder.js';
import logger from '../utils/logger.js';

/**
 * AutoMod konfiguráció
 */
const AUTOMOD_CONFIG = {
  // Spam védelem
  spam: {
    enabled: true,
    messageLimit: 5,        // Max üzenet
    timeWindow: 5000,       // 5 másodperc alatt
    muteTime: 300000,       // 5 perc mute
  },
  
  // Link védelem
  links: {
    enabled: true,
    whitelist: [
      'discord.gg',
      'youtube.com',
      'youtu.be',
      'twitch.tv',
      'twitter.com',
      'x.com',
    ],
  },
  
  // CAPS védelem
  caps: {
    enabled: true,
    threshold: 0.7,         // 70% caps
    minLength: 10,          // Min 10 karakter
  },
  
  // Tiltott szavak
  badWords: {
    enabled: true,
    words: [
      // Magyar káromkodások és sértések
      'kurva', 'geci', 'picsa', 'fasz', 'szar',
      // Angol káromkodások
      'fuck', 'shit', 'bitch', 'nigger', 'faggot',
    ],
  },
  
  // Mention spam
  mentionSpam: {
    enabled: true,
    maxMentions: 5,
  },
};

// User üzenet cache (spam detection)
const userMessages = new Map();

/**
 * Üzenet ellenőrzése AutoMod szabályok alapján
 * @param {Message} message - Discord message
 */
export async function checkMessage(message) {
  // Bot üzeneteket és staff-ot ne ellenőrizzük
  if (message.author.bot) return;
  if (isStaff(message.member)) return;

  try {
    // Spam check
    if (AUTOMOD_CONFIG.spam.enabled) {
      const isSpam = await checkSpam(message);
      if (isSpam) return;
    }

    // Link check
    if (AUTOMOD_CONFIG.links.enabled) {
      const hasIllegalLink = await checkLinks(message);
      if (hasIllegalLink) return;
    }

    // CAPS check
    if (AUTOMOD_CONFIG.caps.enabled) {
      const isCaps = await checkCaps(message);
      if (isCaps) return;
    }

    // Bad words check
    if (AUTOMOD_CONFIG.badWords.enabled) {
      const hasBadWord = await checkBadWords(message);
      if (hasBadWord) return;
    }

    // Mention spam check
    if (AUTOMOD_CONFIG.mentionSpam.enabled) {
      const isMentionSpam = await checkMentionSpam(message);
      if (isMentionSpam) return;
    }

  } catch (error) {
    logger.error('Hiba az AutoMod ellenőrzésében:', error);
  }
}

/**
 * Spam ellenőrzés
 * @param {Message} message - Discord message
 * @returns {boolean} - Spam-e
 */
async function checkSpam(message) {
  const userId = message.author.id;
  const now = Date.now();

  // User üzenetek lekérése vagy létrehozása
  if (!userMessages.has(userId)) {
    userMessages.set(userId, []);
  }

  const messages = userMessages.get(userId);
  
  // Régi üzenetek törlése
  const filtered = messages.filter(
    msg => now - msg.timestamp < AUTOMOD_CONFIG.spam.timeWindow
  );

  // Új üzenet hozzáadása
  filtered.push({ timestamp: now, messageId: message.id });
  userMessages.set(userId, filtered);

  // Spam check
  if (filtered.length >= AUTOMOD_CONFIG.spam.messageLimit) {
    await message.delete();
    
    // Mute
    await muteUser(message.member, AUTOMOD_CONFIG.spam.muteTime, 'Spam');
    
    // Figyelmeztetés
    const warning = await message.channel.send(
      `⚠️ ${message.author}, ne spammelj! Időtartam: 5 perc.`
    );

    // Log
    await logAutoMod(message, 'SPAM', 'User spam-elt és mute-olva lett.');

    // Warning törlése 5 mp után
    setTimeout(() => warning.delete().catch(() => {}), 5000);

    // Cache reset
    userMessages.set(userId, []);
    
    return true;
  }

  return false;
}

/**
 * Link ellenőrzés
 * @param {Message} message - Discord message
 * @returns {boolean} - Illegális link-e
 */
async function checkLinks(message) {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const links = message.content.match(linkRegex);

  if (!links) return false;

  for (const link of links) {
    const isWhitelisted = AUTOMOD_CONFIG.links.whitelist.some(
      domain => link.includes(domain)
    );

    if (!isWhitelisted) {
      await message.delete();
      
      const warning = await message.channel.send(
        `⚠️ ${message.author}, ez a link nem engedélyezett! ` +
        `Engedélyezett domain-ek: ${AUTOMOD_CONFIG.links.whitelist.join(', ')}`
      );

      await logAutoMod(message, 'ILLEGAL_LINK', `Link: ${link}`);

      setTimeout(() => warning.delete().catch(() => {}), 10000);
      return true;
    }
  }

  return false;
}

/**
 * CAPS ellenőrzés
 * @param {Message} message - Discord message
 * @returns {boolean} - Túl sok CAPS-e
 */
async function checkCaps(message) {
  const content = message.content;
  
  if (content.length < AUTOMOD_CONFIG.caps.minLength) {
    return false;
  }

  const letters = content.replace(/[^a-zA-Z]/g, '');
  if (letters.length === 0) return false;

  const capsCount = (content.match(/[A-Z]/g) || []).length;
  const capsRatio = capsCount / letters.length;

  if (capsRatio >= AUTOMOD_CONFIG.caps.threshold) {
    await message.delete();
    
    const warning = await message.channel.send(
      `⚠️ ${message.author}, ne ÜVÖLTS! Kapcsold ki a Caps Lock-ot.`
    );

    await logAutoMod(message, 'CAPS', `CAPS ratio: ${(capsRatio * 100).toFixed(0)}%`);

    setTimeout(() => warning.delete().catch(() => {}), 5000);
    return true;
  }

  return false;
}

/**
 * Tiltott szavak ellenőrzése
 * @param {Message} message - Discord message
 * @returns {boolean} - Tartalmaz tiltott szót-e
 */
async function checkBadWords(message) {
  const content = message.content.toLowerCase();

  for (const word of AUTOMOD_CONFIG.badWords.words) {
    if (content.includes(word.toLowerCase())) {
      await message.delete();
      
      const warning = await message.channel.send(
        `⚠️ ${message.author}, ez a szó nem megengedett ezen a szerveren!`
      );

      await logAutoMod(message, 'BAD_WORD', `Tiltott szó használata`);

      setTimeout(() => warning.delete().catch(() => {}), 5000);
      return true;
    }
  }

  return false;
}

/**
 * Mention spam ellenőrzés
 * @param {Message} message - Discord message
 * @returns {boolean} - Mention spam-e
 */
async function checkMentionSpam(message) {
  const mentionCount = message.mentions.users.size + message.mentions.roles.size;

  if (mentionCount >= AUTOMOD_CONFIG.mentionSpam.maxMentions) {
    await message.delete();
    
    // Mute
    await muteUser(message.member, AUTOMOD_CONFIG.spam.muteTime, 'Mention spam');
    
    const warning = await message.channel.send(
      `⚠️ ${message.author}, ne spammelj mention-ökkel! Mute: 5 perc.`
    );

    await logAutoMod(message, 'MENTION_SPAM', `${mentionCount} mention`);

    setTimeout(() => warning.delete().catch(() => {}), 5000);
    return true;
  }

  return false;
}

/**
 * User mute-olása
 * @param {GuildMember} member - Discord Member
 * @param {number} duration - Időtartam milliszekundumban
 * @param {string} reason - Mute oka
 */
async function muteUser(member, duration, reason) {
  try {
    await member.timeout(duration, `AutoMod: ${reason}`);
    logger.success(`🔇 User mute-olva: ${member.user.tag} - ${reason}`);
  } catch (error) {
    logger.error('Hiba a mute során:', error);
  }
}

/**
 * AutoMod akció naplózása
 * @param {Message} message - Discord message
 * @param {string} action - Akció típusa
 * @param {string} details - Részletek
 */
async function logAutoMod(message, action, details) {
  try {
    const logChannel = message.guild.channels.cache.find(
      ch => ch.name === '📋-staff-logs'
    );

    if (!logChannel) return;

    const embed = new WildArkEmbed()
      .setTitle('🛡️ AutoMod Action')
      .setColor(0xF59E0B)
      .addFields(
        { name: 'User', value: `${message.author.tag} (${message.author.id})`, inline: true },
        { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
        { name: 'Action', value: action, inline: true },
        { name: 'Details', value: details, inline: false },
        { name: 'Message', value: message.content.substring(0, 200) || '*Nincs szöveg*', inline: false },
        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
      );

    await logChannel.send({ embeds: [embed] });

  } catch (error) {
    logger.error('Hiba az AutoMod log íráskor:', error);
  }
}

/**
 * Ellenőrzi, hogy staff-e a member
 * @param {GuildMember} member - Discord Member
 * @returns {boolean}
 */
function isStaff(member) {
  const staffRoles = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];
  return member.roles.cache.some(role => staffRoles.includes(role.name));
}

export { AUTOMOD_CONFIG };

export default {
  checkMessage,
  AUTOMOD_CONFIG,
};
