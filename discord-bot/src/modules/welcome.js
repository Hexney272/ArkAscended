/**
 * Welcome System - Join/leave messages in #welcome, auto-role on join
 */

import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

export async function onMemberJoin(member) {
  // Auto-assign Member role
  const memberRole = member.guild.roles.cache.find(r => r.name === '⚪ Member');
  if (memberRole) {
    await member.roles.add(memberRole).catch(() => {});
  }

  // Send welcome message
  const channel = member.guild.channels.cache.find(c => c.name === '👋-welcome');
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(COLORS.SUCCESS)
    .setTitle('👋 Welcome to WildArk!')
    .setDescription(
      `Hey ${member}! Welcome to the **WildArk** community! 🦖\n\n` +
      '📜 Read the rules in #📜-rules\n' +
      '🎭 Pick your roles in #🎭-pick-roles\n' +
      '💬 Say hi in #💬-general\n\n' +
      'Have fun and enjoy your stay! 🎮'
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Member #${member.guild.memberCount}` })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
  log.info(`Welcome: ${member.user.tag} (member #${member.guild.memberCount})`);
}

export async function onMemberLeave(member) {
  const channel = member.guild.channels.cache.find(c => c.name === '📋-mod-logs');
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(COLORS.WARNING)
    .setTitle('👋 Member Left')
    .setDescription(`**${member.user.tag}** left the server.`)
    .addFields(
      { name: 'ID', value: member.user.id, inline: true },
      { name: 'Joined', value: member.joinedAt ? `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>` : 'Unknown', inline: true },
    )
    .setTimestamp();

  await channel.send({ embeds: [embed] });
}
