/**
 * /suggest - Submit a suggestion
 */

import { SlashCommandBuilder } from 'discord.js';
import { createSuggestion } from '../modules/suggestions.js';

export const suggestCommand = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Submit a suggestion for the server')
    .addStringOption(opt => opt.setName('idea').setDescription('Your suggestion').setRequired(true)),

  async execute(interaction) {
    const idea = interaction.options.getString('idea');
    await createSuggestion(interaction, idea);
  },
};

export default suggestCommand;
