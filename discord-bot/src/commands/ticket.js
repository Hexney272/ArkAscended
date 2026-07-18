/**
 * Ticket Commands
 * Ticket kezelő parancsok
 */

import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { closeTicket } from '../modules/ticketSystem.js';
import { WildArkEmbed } from '../utils/embedBuilder.js';
import logger from '../utils/logger.js';

// Close ticket command
const closeCommand = {
  data: new SlashCommandBuilder()
    .setName('ticket-close')
    .setDescription('🔒 Ticket bezárása'),

  async execute(interaction) {
    try {
      // Ellenőrizzük, hogy ticket csatornában vagyunk-e
      if (!interaction.channel.name.startsWith('ticket-')) {
        return interaction.reply({
          embeds: [WildArkEmbed.error(
            'Nem Ticket Csatorna',
            'Ez a parancs csak ticket csatornákban használható!'
          )],
          ephemeral: true,
        });
      }

      // Ellenőrizzük a jogosultságot
      const isStaff = interaction.member.roles.cache.some(role => 
        ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'].includes(role.name)
      );

      if (!isStaff) {
        return interaction.reply({
          embeds: [WildArkEmbed.error(
            'Nincs Jogosultság',
            'Csak staff tagok zárhatnak be ticketet!'
          )],
          ephemeral: true,
        });
      }

      await interaction.reply({
        embeds: [WildArkEmbed.info(
          'Ticket Bezárása',
          '🔒 A ticket bezárás folyamatban...'
        )],
      });

      // Ticket bezárása
      await closeTicket(interaction.channel, interaction.user);

    } catch (error) {
      logger.error('Hiba a ticket bezáráskor:', error);
      await interaction.reply({
        embeds: [WildArkEmbed.error(
          'Hiba',
          'Hiba történt a ticket bezárása során!'
        )],
        ephemeral: true,
      });
    }
  },
};

// Add user to ticket
const addCommand = {
  data: new SlashCommandBuilder()
    .setName('ticket-add')
    .setDescription('➕ User hozzáadása a tickethez')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('A hozzáadandó user')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      if (!interaction.channel.name.startsWith('ticket-')) {
        return interaction.reply({
          embeds: [WildArkEmbed.error(
            'Nem Ticket Csatorna',
            'Ez a parancs csak ticket csatornákban használható!'
          )],
          ephemeral: true,
        });
      }

      const user = interaction.options.getUser('user');
      const member = await interaction.guild.members.fetch(user.id);

      // Jogosultság hozzáadása
      await interaction.channel.permissionOverwrites.create(member, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
      });

      await interaction.reply({
        embeds: [WildArkEmbed.success(
          'User Hozzáadva',
          `${user} hozzáadva a tickethez!`
        )],
      });

      logger.success(`✅ User hozzáadva tickethez: ${user.tag}`);

    } catch (error) {
      logger.error('Hiba a user hozzáadáskor:', error);
      await interaction.reply({
        embeds: [WildArkEmbed.error('Hiba', 'Nem sikerült hozzáadni a usert!')],
        ephemeral: true,
      });
    }
  },
};

export const ticketCommands = [closeCommand, addCommand];
export default ticketCommands;
