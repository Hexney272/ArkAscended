/**
 * Warning System - Track warnings per user, auto-mute at 3
 * Memory-based (resets on restart - for persistence add JSON/DB later)
 */

import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

// Map<guildId_userId, { warnings: [{reason, by, date}] }>
const warnData = new Map();

function getKey(guildId, userId) {
  return `${guildId}_${userId}`;
}

/**
 * Add a warning to a user. Auto-mutes at 3 warnings.
 */
export async function addWarning(guild, targetMember, reason, moderator) {
  const key = getKey(guild.id, targetMember.id);
  if (!warnData.has(key)) warnData.set(key, []);

  const warnings = warnData.get(key);
  warnings.push({ reason, by: moderator.tag, date: new Date().toISOString() });

  log.info(`Warning added: ${targetMember.user.tag} (${warnings.length} total) by ${moderator.tag}`);

  // Auto-mute at 3 warnings (1 hour)
  if (warnings.length >= 3) {
    try {
      await targetMember.timeout(60 * 60 * 1000, `Auto-mute: ${warnings.length} warnings`);
      log.info(`Auto-muted ${targetMember.user.tag} (${warnings.length} warnings)`);
    } catch (e) {
      log.error(`Failed to auto-mute ${targetMember.user.tag}: ${e.message}`);
    }
  }

  // Log to mod-logs
  const logChannel = guild.channels.cache.find(c => c.name === '📋-mod-logs');
  if (logChannel) {
    const embed = new EmbedBuilder()
      .setColor(warnings.length >= 3 ? COLORS.ERROR : COLORS.WARNING)
      .setTitle(`⚠️ Warning #${warnings.length}`)
      .addFields(
        { name: 'User', value: `${targetMember.user.tag} (${targetMember.id})`, inline: true },
        { name: 'Moderator', value: moderator.tag, inline: true },
        { name: 'Reason', value: reason },
      )
      .setFooter({ text: warnings.length >= 3 ? '⚠️ AUTO-MUTED (3+ warnings)' : `Total warnings: ${warnings.length}` })
      .setTimestamp();
    await logChannel.send({ embeds: [embed] });
  }

  return warnings.length;
}

/**
 * Get all warnings for a user
 */
export function getWarnings(guildId, userId) {
  const key = getKey(guildId, userId);
  return warnData.get(key) || [];
}

/**
 * Clear all warnings for a user
 */
export function clearWarnings(guildId, userId) {
  const key = getKey(guildId, userId);
  warnData.delete(key);
}
