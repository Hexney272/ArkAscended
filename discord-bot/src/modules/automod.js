/**
 * AutoMod - Spam, links, caps, bad words, mention spam
 * Staff members are exempt from all checks.
 */

import { EmbedBuilder } from 'discord.js';
import { COLORS, STAFF_ROLES } from '../config/structure.js';
import log from '../utils/logger.js';

const CONFIG = {
  spam: { enabled: true, maxMessages: 5, timeWindow: 5000, muteMs: 300000 },
  links: { enabled: true, whitelist: ['discord.gg', 'youtube.com', 'youtu.be', 'twitch.tv', 'twitter.com', 'x.com', 'reddit.com'] },
  caps: { enabled: true, threshold: 0.7, minLength: 10 },
  mentions: { enabled: true, max: 5 },
  badWords: { enabled: true, words: ['nigger', 'faggot', 'retard'] },
};

const messageCache = new Map(); // userId -> timestamps[]

export async function checkMessage(message) {
  if (!message.guild || !message.member) return;
  if (isStaff(message.member)) return;

  if (CONFIG.spam.enabled && await checkSpam(message)) return;
  if (CONFIG.links.enabled && await checkLinks(message)) return;
  if (CONFIG.caps.enabled && await checkCaps(message)) return;
  if (CONFIG.mentions.enabled && await checkMentions(message)) return;
  if (CONFIG.badWords.enabled && await checkBadWords(message)) return;
}

// --- Checks ---

async function checkSpam(message) {
  const uid = message.author.id;
  const now = Date.now();
  const cache = messageCache.get(uid) || [];
  const filtered = cache.filter(t => now - t < CONFIG.spam.timeWindow);
  filtered.push(now);
  messageCache.set(uid, filtered);

  if (filtered.length >= CONFIG.spam.maxMessages) {
    await message.delete().catch(() => {});
    await mute(message.member, CONFIG.spam.muteMs, 'Spam detected');
    await warn(message, 'Spam', 'Sending messages too fast');
    messageCache.set(uid, []);
    return true;
  }
  return false;
}

async function checkLinks(message) {
  const links = message.content.match(/https?:\/\/[^\s]+/g);
  if (!links) return false;

  for (const link of links) {
    const allowed = CONFIG.links.whitelist.some(d => link.includes(d));
    if (!allowed) {
      await message.delete().catch(() => {});
      await warn(message, 'Unauthorized Link', `Link not allowed: \`${link.slice(0, 50)}\``);
      return true;
    }
  }
  return false;
}

async function checkCaps(message) {
  const text = message.content;
  if (text.length < CONFIG.caps.minLength) return false;
  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (!letters.length) return false;
  const ratio = (text.match(/[A-Z]/g) || []).length / letters.length;
  if (ratio >= CONFIG.caps.threshold) {
    await message.delete().catch(() => {});
    await warn(message, 'Excessive Caps', 'Please don\'t type in ALL CAPS');
    return true;
  }
  return false;
}

async function checkMentions(message) {
  const count = message.mentions.users.size + message.mentions.roles.size;
  if (count >= CONFIG.mentions.max) {
    await message.delete().catch(() => {});
    await mute(message.member, CONFIG.spam.muteMs, 'Mention spam');
    await warn(message, 'Mention Spam', `${count} mentions in one message`);
    return true;
  }
  return false;
}

async function checkBadWords(message) {
  const lower = message.content.toLowerCase();
  for (const word of CONFIG.badWords.words) {
    if (lower.includes(word)) {
      await message.delete().catch(() => {});
      await warn(message, 'Prohibited Language', 'Message contained a banned word');
      return true;
    }
  }
  return false;
}

// --- Helpers ---

function isStaff(member) {
  return member.roles.cache.some(r => STAFF_ROLES.includes(r.name));
}

async function mute(member, duration, reason) {
  try {
    await member.timeout(duration, `AutoMod: ${reason}`);
    log.info(`Muted ${member.user.tag}: ${reason}`);
  } catch (e) {
    log.error(`Mute failed for ${member.user.tag}: ${e.message}`);
  }
}

async function warn(message, type, details) {
  // Send warning in channel (auto-deletes after 5s)
  const reply = await message.channel.send(`⚠️ ${message.author}, ${details}`).catch(() => null);
  if (reply) setTimeout(() => reply.delete().catch(() => {}), 5000);

  // Log to mod-logs
  const logCh = message.guild.channels.cache.find(c => c.name === '📋-mod-logs');
  if (logCh) {
    const embed = new EmbedBuilder()
      .setColor(COLORS.WARNING)
      .setTitle(`🛡️ AutoMod: ${type}`)
      .addFields(
        { name: 'User', value: `${message.author.tag} (${message.author.id})`, inline: true },
        { name: 'Channel', value: `${message.channel}`, inline: true },
        { name: 'Details', value: details },
      )
      .setTimestamp();
    await logCh.send({ embeds: [embed] });
  }
  log.info(`AutoMod [${type}]: ${message.author.tag} in #${message.channel.name}`);
}

export { CONFIG as AUTOMOD_CONFIG };
