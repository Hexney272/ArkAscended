/**
 * /remind - Set a reminder
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

export const remindCommand = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder')
    .addIntegerOption(opt => opt.setName('minutes').setDescription('Remind in X minutes').setRequired(true).setMinValue(1).setMaxValue(1440))
    .addStringOption(opt => opt.setName('message').setDescription('What to remind you about').setRequired(true)),

  async execute(interaction) {
    const minutes = interaction.options.getInteger('minutes');
    const message = interaction.options.getString('message');
    const user = interaction.user;
    const channel = interaction.channel;

    await interaction.reply({
      content: `⏰ Got it! I'll remind you in **${minutes} minute${minutes > 1 ? 's' : ''}**.`,
      ephemeral: true,
    });

    setTimeout(async () => {
      const embed = new EmbedBuilder()
        .setColor(COLORS.INFO)
        .setTitle('⏰ Reminder!')
        .setDescription(`${user}, you asked me to remind you:\n\n**${message}**`)
        .setTimestamp();

      await channel.send({ content: `${user}`, embeds: [embed] }).catch(() => {});
      log.info(`Reminder delivered: ${user.tag} - "${message}"`);
    }, minutes * 60 * 1000);
  },
};

export default remindCommand;
