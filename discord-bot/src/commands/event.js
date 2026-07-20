/**
 * /event - Schedule an event with automatic notification
 */

import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

// Active scheduled events
const scheduledEvents = [];

export const eventCommand = {
  data: new SlashCommandBuilder()
    .setName('event')
    .setDescription('Schedule a server event with auto-notification')
    .addStringOption(opt => opt.setName('title').setDescription('Event title').setRequired(true))
    .addStringOption(opt => opt.setName('description').setDescription('Event description').setRequired(true))
    .addIntegerOption(opt => opt.setName('in_minutes').setDescription('Starts in X minutes from now').setRequired(true).setMinValue(1).setMaxValue(10080))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents),

  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const minutes = interaction.options.getInteger('in_minutes');

    const startsAt = Date.now() + minutes * 60 * 1000;
    const guild = interaction.guild;

    // Post event embed in #event-calendar
    const calendarChannel = guild.channels.cache.find(c => c.name === '📅-event-calendar');
    if (!calendarChannel) {
      return interaction.reply({ content: '❌ #📅-event-calendar channel not found. Run /setup first.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`📅 ${title}`)
      .setDescription(
        `${description}\n\n` +
        `⏰ **Starts:** <t:${Math.floor(startsAt / 1000)}:F> (<t:${Math.floor(startsAt / 1000)}:R>)\n\n` +
        `React with ✅ if you're joining!`
      )
      .setFooter({ text: `Scheduled by ${interaction.user.tag}` })
      .setTimestamp();

    const msg = await calendarChannel.send({ embeds: [embed] });
    await msg.react('✅');

    // Schedule notification 5 min before event
    const notifyIn = Math.max((minutes - 5) * 60 * 1000, 0);
    const timeoutId = setTimeout(async () => {
      const notifRole = guild.roles.cache.find(r => r.name === '🔔 Notifications');
      const eventChat = guild.channels.cache.find(c => c.name === '🎉-event-chat');
      const pingTarget = notifRole ? `${notifRole}` : '@here';

      const notifEmbed = new EmbedBuilder()
        .setColor(COLORS.WARNING)
        .setTitle(`⏰ Event Starting Soon!`)
        .setDescription(`**${title}** starts <t:${Math.floor(startsAt / 1000)}:R>!\n\n${description}`)
        .setTimestamp();

      const channel = eventChat || calendarChannel;
      await channel.send({ content: `${pingTarget} 🔔`, embeds: [notifEmbed] });
      log.info(`Event notification sent: "${title}"`);
    }, notifyIn);

    scheduledEvents.push({ title, startsAt, timeoutId });

    await interaction.reply({
      content: `✅ Event **"${title}"** scheduled! Starts <t:${Math.floor(startsAt / 1000)}:R>\nNotification will be sent 5 minutes before.`,
      ephemeral: true,
    });

    log.success(`Event scheduled: "${title}" in ${minutes} minutes by ${interaction.user.tag}`);
  },
};

export default eventCommand;
