/**
 * Button Handler - Routes button interactions to the correct module
 */

import { openTicket, closeTicket } from './tickets.js';
import { joinGiveaway } from './giveaway.js';

export async function handleButton(interaction) {
  const id = interaction.customId;

  if (id === 'ticket_open') return openTicket(interaction);
  if (id === 'ticket_close') return closeTicket(interaction);
  if (id.startsWith('giveaway_join_')) return joinGiveaway(interaction);
}
