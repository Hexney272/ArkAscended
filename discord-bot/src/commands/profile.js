/**
 * /profile, /leaderboard commands
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getStats } from '../modules/leveling.js';
import { getWarnings } from '../modules/warnings.js';
import { COLORS } from '../config/structure.js';

const profileCommand = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View your or another user\'s profile')
    .addUserOption(opt => opt.setName('user').setDescription('User to view (default: yourself)')),

  async execute(interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(target.id).catch(() => null);
    if (!member) return interaction.reply({ content: '❌ User not found.', ephemeral: true });

    const stats = getStats(interaction.guild.id, target.id);
    const warns = getWarnings(interaction.guild.id, target.id);
    const roles = member.roles.cache
      .filter(r => r.name !== '@everyone')
      .sort((a, b) => b.position - a.position)
      .first(5)
      .map(r => r.toString())
      .join(', ') || 'None';

    const xpForNext = Math.pow((stats.level + 1), 2) * 100;
    const progressBar = createProgressBar(stats.xp, xpForNext);

    const embed = new EmbedBuilder()
      .setColor(member.displayColor || COLORS.PRIMARY)
      .setTitle(`👤 ${target.username}'s Profile`)
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: '📊 Level', value: `**${stats.level}**`, inline: true },
        { name: '✨ XP', value: `**${stats.xp}** / ${xpForNext}`, inline: true },
        { name: '⚠️ Warnings', value: `**${warns.length}**`, inline: true },
        { name: '📈 Progress', value: progressBar, inline: false },
        { name: '🎭 Top Roles', value: roles, inline: false },
        { name: '📅 Joined', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: '📅 Account', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true },
      )
      .setFooter({ text: 'WildArk Community' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

const leaderboardCommand = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the top 10 most active members'),

  async execute(interaction) {
    // Import the full userData map from leveling module
    const { getAllStats } = await import('../modules/leveling.js');
    const all = getAllStats(interaction.guild.id);

    if (all.length === 0) {
      return interaction.reply({ content: '📊 No activity data yet. Start chatting!', ephemeral: true });
    }

    const top10 = all
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);

    const list = top10.map((entry, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `**${i + 1}.**`;
      return `${medal} <@${entry.userId}> — Level ${entry.level} (${entry.xp} XP)`;
    }).join('\n');

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🏆 Activity Leaderboard')
      .setDescription(list)
      .setFooter({ text: 'Based on message activity • Updates live' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

function createProgressBar(current, max) {
  const pct = Math.min(current / max, 1);
  const filled = Math.round(pct * 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled) + ` ${Math.round(pct * 100)}%`;
}

export const profileCommands = [profileCommand, leaderboardCommand];
export default profileCommands;
