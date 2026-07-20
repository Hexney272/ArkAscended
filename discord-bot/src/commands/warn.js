/**
 * /warn, /warnings, /clearwarnings commands
 */

import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { addWarning, getWarnings, clearWarnings } from '../modules/warnings.js';
import { COLORS } from '../config/structure.js';

const warnCommand = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user (3 warnings = auto-mute)')
    .addUserOption(opt => opt.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if (!target) return interaction.reply({ content: '❌ User not found.', ephemeral: true });
    if (target.id === interaction.user.id) return interaction.reply({ content: '❌ You cannot warn yourself.', ephemeral: true });

    const count = await addWarning(interaction.guild, target, reason, interaction.user);

    const embed = new EmbedBuilder()
      .setColor(count >= 3 ? COLORS.ERROR : COLORS.WARNING)
      .setTitle(`⚠️ ${target.user.tag} has been warned`)
      .setDescription(`**Reason:** ${reason}\n**Total warnings:** ${count}`)
      .setFooter({ text: count >= 3 ? '🔇 User has been auto-muted (1 hour)' : 'At 3 warnings, user will be auto-muted' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

const warningsCommand = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings for a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to check').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const warns = getWarnings(interaction.guild.id, target.id);

    if (warns.length === 0) {
      return interaction.reply({ content: `✅ **${target.tag}** has no warnings.`, ephemeral: true });
    }

    const list = warns.map((w, i) =>
      `**#${i + 1}** — ${w.reason}\n  _By ${w.by} on ${w.date.split('T')[0]}_`
    ).join('\n\n');

    const embed = new EmbedBuilder()
      .setColor(COLORS.WARNING)
      .setTitle(`⚠️ Warnings for ${target.tag}`)
      .setDescription(list)
      .setFooter({ text: `${warns.length} total warning(s)` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

const clearWarningsCommand = {
  data: new SlashCommandBuilder()
    .setName('clearwarnings')
    .setDescription('Clear all warnings for a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to clear').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    clearWarnings(interaction.guild.id, target.id);
    await interaction.reply({ content: `✅ All warnings cleared for **${target.tag}**.`, ephemeral: true });
  },
};

export const warnCommands = [warnCommand, warningsCommand, clearWarningsCommand];
export default warnCommands;
