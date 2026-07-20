/**
 * /ticket - Manual ticket command (alternative to button)
 */

import { SlashCommandBuilder } from 'discord.js';
import { openTicket } from '../modules/tickets.js';

export const ticketCommand = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Open a support ticket'),

  async execute(interaction) {
    await openTicket(interaction);
  },
};

export default ticketCommand;
