/**
 * Leveling System - XP per message, level-up announcements
 * 
 * Simple memory-based (resets on restart - for persistence, add a JSON file or DB later)
 * XP: 15-25 random per message, 60s cooldown per user
 * Level formula: level = floor(sqrt(xp / 100))
 */

import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

// userData: Map<guildId_userId, { xp, level, lastMessage }>
const userData = new Map();
const COOLDOWN = 60000; // 1 minute between XP gains
const XP_MIN = 15;
const XP_MAX = 25;

function getLevel(xp) {
  return Math.floor(Math.sqrt(xp / 100));
}

function getKey(guildId, userId) {
  return `${guildId}_${userId}`;
}

export async function addXP(message) {
  if (!message.guild) return;

  const key = getKey(message.guild.id, message.author.id);
  const now = Date.now();

  let data = userData.get(key);
  if (!data) {
    data = { xp: 0, level: 0, lastMessage: 0 };
    userData.set(key, data);
  }

  // Cooldown check
  if (now - data.lastMessage < COOLDOWN) return;

  // Add random XP
  const gained = Math.floor(Math.random() * (XP_MAX - XP_MIN + 1)) + XP_MIN;
  data.xp += gained;
  data.lastMessage = now;

  // Check level up
  const newLevel = getLevel(data.xp);
  if (newLevel > data.level) {
    data.level = newLevel;
    await announceLevelUp(message, newLevel);
  }
}

async function announceLevelUp(message, level) {
  const embed = new EmbedBuilder()
    .setColor(COLORS.SUCCESS)
    .setTitle('🎉 Level Up!')
    .setDescription(`${message.author} reached **Level ${level}**! 🚀`)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  await message.channel.send({ embeds: [embed] }).catch(() => {});
  log.info(`Level up: ${message.author.tag} -> Level ${level}`);

  // Auto-assign Active role at level 5
  if (level >= 5) {
    const role = message.guild.roles.cache.find(r => r.name === '🔵 Active');
    if (role && !message.member.roles.cache.has(role.id)) {
      await message.member.roles.add(role).catch(() => {});
      log.info(`Active role assigned to ${message.author.tag}`);
    }
  }
}

/**
 * Get user stats (for /level command if you add it later)
 */
export function getStats(guildId, userId) {
  const key = getKey(guildId, userId);
  return userData.get(key) || { xp: 0, level: 0, lastMessage: 0 };
}
