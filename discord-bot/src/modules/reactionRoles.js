/**
 * Reaction Roles - React in #pick-roles to get/remove roles
 */

import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

// Emoji -> Role name mapping
const ROLE_MAP = {
  '🦖': '🦖 Primal Descended Fan',
  '🔔': '🔔 Notifications',
  '💜': '💜 VIP',
};

/**
 * Send the reaction roles panel (called by /setup, idempotent)
 */
export async function setupReactionRoles(guild) {
  const channel = guild.channels.cache.find(c => c.name === '🎭-pick-roles');
  if (!channel) {
    log.warn('Reaction roles: #🎭-pick-roles not found, skipping');
    return;
  }

  // Check if already exists
  const recent = await channel.messages.fetch({ limit: 5 });
  const existing = recent.find(m => m.author.id === guild.client.user.id && m.embeds[0]?.title === '🎭 Pick Your Roles');
  if (existing) {
    log.info('Reaction roles panel already exists, skipping');
    return;
  }

  // Create roles if they don't exist
  for (const [, roleName] of Object.entries(ROLE_MAP)) {
    if (!guild.roles.cache.find(r => r.name === roleName)) {
      await guild.roles.create({ name: roleName, color: 0x9333EA, hoist: false, reason: 'Reaction role' });
      log.success(`  Created reaction role: ${roleName}`);
    }
  }

  const embed = new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('🎭 Pick Your Roles')
    .setDescription(
      'React below to assign yourself a role!\n' +
      'Remove the reaction to remove the role.\n\n' +
      '🦖 **Primal Descended Fan** — Show your support\n' +
      '🔔 **Notifications** — Get pinged for events & updates\n' +
      '💜 **VIP** — VIP members\n'
    )
    .setFooter({ text: 'WildArk Roles' })
    .setTimestamp();

  const msg = await channel.send({ embeds: [embed] });
  for (const emoji of Object.keys(ROLE_MAP)) {
    await msg.react(emoji);
    await new Promise(r => setTimeout(r, 500));
  }

  log.success('Reaction roles panel created');
}

/**
 * Handle reaction add/remove
 */
export async function handleReaction(reaction, user, action) {
  if (reaction.message.channel.name !== '🎭-pick-roles') return;

  const roleName = ROLE_MAP[reaction.emoji.name];
  if (!roleName) return;

  const guild = reaction.message.guild;
  const member = await guild.members.fetch(user.id);
  const role = guild.roles.cache.find(r => r.name === roleName);
  if (!role) return;

  if (action === 'add') {
    if (!member.roles.cache.has(role.id)) {
      await member.roles.add(role);
      log.info(`Role added: ${roleName} -> ${user.tag}`);
    }
  } else {
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      log.info(`Role removed: ${roleName} <- ${user.tag}`);
    }
  }
}
