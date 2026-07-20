/**
 * /giveaway - Start a giveaway (Admin/Mod only)
 */

import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { startGiveaway } from '../modules/giveaway.js';

export const giveawayCommand = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Start a giveaway')
    .addStringOption(opt => opt.setName('prize').setDescription('What are you giving away?').setRequired(true))
    .addIntegerOption(opt => opt.setName('duration').setDescription('Duration in minutes').setRequired(true).setMinValue(1).setMaxValue(10080))
    .addIntegerOption(opt => opt.setName('winners').setDescription('Number of winners').setMinValue(1).setMaxValue(10))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const prize = interaction.options.getString('prize');
    const duration = interaction.options.getInteger('duration');
    const winners = interaction.options.getInteger('winners') || 1;
    await startGiveaway(interaction, prize, duration, winners);
  },
};

export default giveawayCommand;
