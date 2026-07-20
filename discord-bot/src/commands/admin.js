/**
 * Admin Commands - purge, announce, automod status
 */

import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import { AUTOMOD_CONFIG } from '../modules/automod.js';
import log from '../utils/logger.js';

// /purge <count>
const purgeCommand = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete messages from this channel')
    .addIntegerOption(opt => opt.setName('count').setDescription('Number of messages (1-100)').setRequired(true).setMinValue(1).setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const count = interaction.options.getInteger('count');
    await interaction.deferReply({ ephemeral: true });

    const deleted = await interaction.channel.bulkDelete(count, true);
    await interaction.editReply({ content: `🗑️ Deleted ${deleted.size} messages.` });
    log.info(`Purge: ${deleted.size} messages by ${interaction.user.tag}`);
  },
};

// /announce <message>
const announceCommand = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Send an announcement embed')
    .addStringOption(opt => opt.setName('message').setDescription('Announcement text').setRequired(true))
    .addChannelOption(opt => opt.setName('channel').setDescription('Target channel (default: #announcements)'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const text = interaction.options.getString('message');
    const target = interaction.options.getChannel('channel')
      || interaction.guild.channels.cache.find(c => c.name === '📢-announcements');

    if (!target) {
      return interaction.reply({ content: '❌ No target channel found.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('📢 Announcement')
      .setDescription(text)
      .setFooter({ text: `By ${interaction.user.tag}` })
      .setTimestamp();

    await target.send({ embeds: [embed] });
    await interaction.reply({ content: `✅ Announcement sent to ${target}`, ephemeral: true });
    log.info(`Announce by ${interaction.user.tag} in #${target.name}`);
  },
};

// /automod
const automodCommand = {
  data: new SlashCommandBuilder()
    .setName('automod')
    .setDescription('View AutoMod configuration')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const c = AUTOMOD_CONFIG;
    const embed = new EmbedBuilder()
      .setColor(COLORS.INFO)
      .setTitle('🛡️ AutoMod Configuration')
      .addFields(
        { name: 'Spam', value: `${c.spam.enabled ? '✅' : '❌'} ${c.spam.maxMessages} msg / ${c.spam.timeWindow / 1000}s`, inline: true },
        { name: 'Links', value: `${c.links.enabled ? '✅' : '❌'} ${c.links.whitelist.length} whitelisted`, inline: true },
        { name: 'Caps', value: `${c.caps.enabled ? '✅' : '❌'} ${c.caps.threshold * 100}% limit`, inline: true },
        { name: 'Mentions', value: `${c.mentions.enabled ? '✅' : '❌'} Max ${c.mentions.max}`, inline: true },
        { name: 'Bad Words', value: `${c.badWords.enabled ? '✅' : '❌'} ${c.badWords.words.length} banned`, inline: true },
        { name: 'Note', value: 'Staff members are exempt from all checks.', inline: false },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

// /serverinfo
const serverInfoCommand = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Show server information'),

  async execute(interaction) {
    const g = interaction.guild;
    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`📊 ${g.name}`)
      .setThumbnail(g.iconURL({ dynamic: true }))
      .addFields(
        { name: 'Owner', value: `<@${g.ownerId}>`, inline: true },
        { name: 'Members', value: `${g.memberCount}`, inline: true },
        { name: 'Roles', value: `${g.roles.cache.size}`, inline: true },
        { name: 'Channels', value: `${g.channels.cache.size}`, inline: true },
        { name: 'Boosts', value: `${g.premiumSubscriptionCount || 0}`, inline: true },
        { name: 'Created', value: `<t:${Math.floor(g.createdTimestamp / 1000)}:D>`, inline: true },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export const adminCommands = [purgeCommand, announceCommand, automodCommand, serverInfoCommand];
export default adminCommands;
