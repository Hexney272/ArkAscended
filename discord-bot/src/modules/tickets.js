/**
 * Ticket System - IN-SERVER (no DMs)
 * 
 * Flow:
 * 1. /setup sends a ticket panel embed with a "Open Ticket" button in #📫-open-ticket
 * 2. User clicks button -> bot creates a private channel (ticket-username) in a "Tickets" category
 * 3. Only the user + staff can see the channel
 * 4. Staff or user clicks "Close Ticket" button -> channel deleted after transcript logged
 *
 * Everything happens on-server, no DMs sent.
 */

import { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';
import { COLORS, STAFF_ROLES } from '../config/structure.js';
import log from '../utils/logger.js';

const TICKET_CATEGORY_NAME = '🎫 Tickets';

// ============================================================
// SETUP: Send the ticket panel embed + button
// ============================================================

export async function setupTicketPanel(guild) {
  const channel = guild.channels.cache.find(c => c.name === '📫-open-ticket');
  if (!channel) {
    log.warn('Ticket panel: #📫-open-ticket channel not found, skipping');
    return;
  }

  // Check if panel already exists (idempotent)
  const recent = await channel.messages.fetch({ limit: 5 });
  const existing = recent.find(m => m.author.id === guild.client.user.id && m.embeds[0]?.title === '🎫 Support Tickets');
  if (existing) {
    log.info('Ticket panel already exists, skipping');
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('🎫 Support Tickets')
    .setDescription(
      '**Need help? Open a ticket!**\n\n' +
      'Click the button below to create a private support channel.\n' +
      'Our staff will respond as soon as possible.\n\n' +
      '**Use tickets for:**\n' +
      '• Technical issues\n' +
      '• In-game help\n' +
      '• Admin requests\n' +
      '• Ban appeals\n' +
      '• Bug reports\n\n' +
      '⚠️ *Do not abuse the ticket system.*'
    )
    .setFooter({ text: 'WildArk Support' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ticket_open')
      .setLabel('Open Ticket')
      .setEmoji('🎫')
      .setStyle(ButtonStyle.Primary)
  );

  await channel.send({ embeds: [embed], components: [row] });
  log.success('Ticket panel created');
}

// ============================================================
// OPEN TICKET (button click)
// ============================================================

export async function openTicket(interaction) {
  const guild = interaction.guild;
  const user = interaction.user;

  // Check if user already has an open ticket
  const existingTicket = guild.channels.cache.find(
    c => c.name === `ticket-${user.username.toLowerCase()}` && c.parentId
  );

  if (existingTicket) {
    return interaction.reply({
      content: `⚠️ You already have an open ticket: ${existingTicket}`,
      ephemeral: true,
    });
  }

  await interaction.deferReply({ ephemeral: true });

  // Find or create Tickets category
  let category = guild.channels.cache.find(
    c => c.type === ChannelType.GuildCategory && c.name === TICKET_CATEGORY_NAME
  );

  if (!category) {
    category = await guild.channels.create({
      name: TICKET_CATEGORY_NAME,
      type: ChannelType.GuildCategory,
      reason: 'Ticket system',
    });
    // Hide category from everyone
    await category.permissionOverwrites.create(guild.roles.everyone, { ViewChannel: false });
  }

  // Create ticket channel
  const ticketChannel = await guild.channels.create({
    name: `ticket-${user.username.toLowerCase()}`,
    type: ChannelType.GuildText,
    parent: category.id,
    topic: `Support ticket for ${user.tag} | Created: ${new Date().toISOString().split('T')[0]}`,
    reason: `Ticket opened by ${user.tag}`,
  });

  // Set permissions: user + staff can see
  await ticketChannel.permissionOverwrites.create(user.id, {
    ViewChannel: true,
    SendMessages: true,
    ReadMessageHistory: true,
    AttachFiles: true,
  });

  for (const roleName of STAFF_ROLES) {
    const role = guild.roles.cache.find(r => r.name === roleName);
    if (role) {
      await ticketChannel.permissionOverwrites.create(role, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
      });
    }
  }

  // Welcome message in ticket channel
  const welcomeEmbed = new EmbedBuilder()
    .setColor(COLORS.SUCCESS)
    .setTitle(`🎫 Ticket - ${user.username}`)
    .setDescription(
      `Hey ${user}! 👋\n\n` +
      'Thanks for reaching out. Please describe your issue below.\n' +
      'A staff member will respond as soon as possible.\n\n' +
      'Click **Close Ticket** when your issue is resolved.'
    )
    .setTimestamp();

  const closeRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ticket_close')
      .setLabel('Close Ticket')
      .setEmoji('🔒')
      .setStyle(ButtonStyle.Danger)
  );

  await ticketChannel.send({ embeds: [welcomeEmbed], components: [closeRow] });

  await interaction.editReply({
    content: `✅ Ticket created: ${ticketChannel}\nStaff will respond shortly.`,
  });

  // Log
  const logChannel = guild.channels.cache.find(c => c.name === '🎫-ticket-logs');
  if (logChannel) {
    const logEmbed = new EmbedBuilder()
      .setColor(COLORS.INFO)
      .setTitle('🎫 Ticket Opened')
      .addFields(
        { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Channel', value: `${ticketChannel}`, inline: true },
      )
      .setTimestamp();
    await logChannel.send({ embeds: [logEmbed] });
  }

  log.success(`Ticket opened: ${user.tag}`);
}

// ============================================================
// CLOSE TICKET (button click)
// ============================================================

export async function closeTicket(interaction) {
  const channel = interaction.channel;
  const guild = interaction.guild;

  // Verify this is actually a ticket channel
  if (!channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: '❌ This is not a ticket channel.', ephemeral: true });
  }

  await interaction.reply({ content: '🔒 Closing ticket in 5 seconds...' });

  // Log transcript (last 50 messages)
  const logChannel = guild.channels.cache.find(c => c.name === '🎫-ticket-logs');
  if (logChannel) {
    const messages = await channel.messages.fetch({ limit: 50 });
    const transcript = messages
      .reverse()
      .map(m => `[${m.createdAt.toISOString().split('T')[0]}] ${m.author.tag}: ${m.content || '[embed/attachment]'}`)
      .join('\n');

    const logEmbed = new EmbedBuilder()
      .setColor(COLORS.WARNING)
      .setTitle(`🔒 Ticket Closed: #${channel.name}`)
      .setDescription(`Closed by ${interaction.user.tag}`)
      .addFields({ name: 'Transcript (last 50)', value: transcript.slice(0, 1000) || 'No messages' })
      .setTimestamp();

    await logChannel.send({ embeds: [logEmbed] });
  }

  log.info(`Ticket closed: ${channel.name} by ${interaction.user.tag}`);

  // Delete after delay
  setTimeout(async () => {
    try {
      await channel.delete('Ticket closed');
    } catch (e) {
      log.error('Failed to delete ticket channel:', e.message);
    }
  }, 5000);
}
