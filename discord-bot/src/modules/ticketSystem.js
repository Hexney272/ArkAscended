/**
 * Ticket System Module
 * Teljes ticket kezelő rendszer
 */

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } from 'discord.js';
import { WildArkEmbed } from '../utils/embedBuilder.js';
import { createTicketChannel } from './channelBuilder.js';
import { getMemberLanguage } from './languageSystem.js';
import { t } from '../config/translations.js';
import { panelExists } from '../utils/panelGuard.js';
import logger from '../utils/logger.js';

// Aktív ticketek nyilvántartása
const activeTickets = new Map();
let ticketCounter = 1;

/**
 * Ticket rendszer beállítása - HU és EN csatornákban külön panel.
 * @param {Guild} guild - Discord Guild
 * @param {Map} roles - Létrehozott rangok
 */
export async function setupTicketSystem(guild, roles) {
  logger.info('🎫 Ticket rendszer beállítása...');

  try {
    const huChannel = guild.channels.cache.find(ch => ch.name === '📫-ticket-központ');
    const enChannel = guild.channels.cache.find(ch => ch.name === '📫-ticket-center');

    let huResult = false;
    let enResult = false;

    if (huChannel) {
      huResult = await sendTicketPanel(huChannel, 'hu');
    } else {
      logger.warn('⚠️ Magyar ticket csatorna (📫-ticket-központ) nem található!');
    }

    if (enChannel) {
      enResult = await sendTicketPanel(enChannel, 'en');
    } else {
      logger.warn('⚠️ English ticket channel (📫-ticket-center) not found!');
    }

    return huResult || enResult;

  } catch (error) {
    logger.error('Hiba a ticket rendszer beállításakor:', error);
    return false;
  }
}

/**
 * Egy nyelvű ticket panel kiküldése egy csatornába.
 * @param {TextChannel} channel
 * @param {string} lang - 'hu' vagy 'en'
 * @returns {Promise<Message|false>}
 */
async function sendTicketPanel(channel, lang) {
  const embed = WildArkEmbed.ticket(lang);

  // Ha a panel már ki van küldve, ne duplikáljuk (pl. /setup újrafuttatásakor)
  if (await panelExists(channel, embed.data.title)) {
    logger.warn(`⚠️ Ticket panel (${lang}) már létezik, kihagyva.`);
    return false;
  }

  const message = await channel.send({ embeds: [embed] });
  await message.react('🎫');

  logger.success(`✅ Ticket panel létrehozva (${lang}): ${channel.name}`);
  return message;
}

/**
 * Ticket reakció kezelése
 * @param {MessageReaction} reaction - Discord reaction
 * @param {User} user - Discord user
 */
export async function handleTicketReaction(reaction, user) {
  try {
    // Csak a ticket-panel csatornákból induljon (HU vagy EN)
    const channelName = reaction.message.channel.name;
    if (channelName !== '📫-ticket-központ' && channelName !== '📫-ticket-center') {
      return;
    }

    // Reakció eltávolítása
    await reaction.users.remove(user.id);

    // Ellenőrizzük, van-e már aktív ticketje
    const existingTicket = activeTickets.get(user.id);
    if (existingTicket) {
      try {
        const member = await reaction.message.guild.members.fetch(user.id);
        const langCode = getMemberLanguage(member);
        await user.send(t(langCode, 'ticketAlreadyOpen', existingTicket.channelId));
      } catch (error) {
        // DM küldés sikertelen
      }
      return;
    }

    // Új ticket létrehozása
    await createTicket(reaction.message.guild, user);

  } catch (error) {
    logger.error('Hiba a ticket reakció kezelésében:', error);
  }
}

/**
 * Új ticket létrehozása
 * @param {Guild} guild - Discord Guild
 * @param {User} user - User aki nyitotta
 */
async function createTicket(guild, user) {
  try {
    const member = await guild.members.fetch(user.id);
    const ticketNumber = ticketCounter++;
    const langCode = getMemberLanguage(member);

    // Ticket csatorna létrehozása
    const roles = new Map();
    guild.roles.cache.forEach(role => {
      roles.set(role.name, role);
    });

    const ticketChannel = await createTicketChannel(guild, member, ticketNumber, roles);

    // Ticket mentése
    activeTickets.set(user.id, {
      channelId: ticketChannel.id,
      ticketNumber: ticketNumber,
      createdAt: Date.now(),
    });

    // Welcome üzenet a ticket csatornában - a tag beállított nyelvén
    const welcomeEmbed = new WildArkEmbed()
      .setTitle(t(langCode, 'ticketWelcomeTitle', ticketNumber))
      .setDescription(t(langCode, 'ticketWelcomeDescription', member))
      .setColor(0x10B981);

    // Close gomb - a tag beállított nyelvén
    const closeButton = new ButtonBuilder()
      .setCustomId('ticket_close')
      .setLabel(t(langCode, 'ticketCloseButton'))
      .setEmoji('🔒')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(closeButton);

    await ticketChannel.send({ 
      content: `${member} | <@&${roles.get('🟠 Moderator')?.id}>`,
      embeds: [welcomeEmbed],
      components: [row]
    });

    // DM küldése a usernek, a beállított nyelvén
    try {
      await user.send(t(langCode, 'ticketCreatedDM', ticketChannel.id, ticketNumber));
    } catch (error) {
      // DM küldés sikertelen
    }

    logger.success(`🎫 Ticket létrehozva: #${ticketNumber} - ${user.tag}`);

    // Log küldése
    await logTicketAction(guild, 'CREATED', user, ticketNumber, ticketChannel);

  } catch (error) {
    logger.error('Hiba a ticket létrehozásakor:', error);
  }
}

/**
 * Ticket bezárása
 * @param {Channel} channel - Ticket channel
 * @param {User} closedBy - Ki zárta be
 */
export async function closeTicket(channel, closedBy) {
  try {
    // Ticket adatok keresése
    let ticketData = null;
    for (const [userId, data] of activeTickets.entries()) {
      if (data.channelId === channel.id) {
        ticketData = { userId, ...data };
        break;
      }
    }

    if (!ticketData) {
      return false;
    }

    // Bezárás üzenet
    const closeEmbed = new WildArkEmbed()
      .setTitle('🔒 Ticket bezárva')
      .setDescription(
        `Ezt a ticketet **${closedBy.tag}** bezárta.\n` +
        `A csatorna 10 másodperc múlva törlődik.`
      )
      .setColor(0x6B7280);

    await channel.send({ embeds: [closeEmbed] });

    // Ticket eltávolítása az aktívak közül
    activeTickets.delete(ticketData.userId);

    // Log
    await logTicketAction(channel.guild, 'CLOSED', closedBy, ticketData.ticketNumber, channel);

    // Csatorna törlése késleltetéssel
    setTimeout(async () => {
      try {
        await channel.delete('Ticket bezárva');
        logger.success(`🗑️ Ticket csatorna törölve: #${ticketData.ticketNumber}`);
      } catch (error) {
        logger.error('Hiba a ticket csatorna törlésekor:', error);
      }
    }, 10000);

    return true;

  } catch (error) {
    logger.error('Hiba a ticket bezáráskor:', error);
    return false;
  }
}

/**
 * Ticket akció naplózása
 * @param {Guild} guild - Discord Guild
 * @param {string} action - CREATED vagy CLOSED
 * @param {User} user - User
 * @param {number} ticketNumber - Ticket száma
 * @param {Channel} channel - Ticket channel
 */
async function logTicketAction(guild, action, user, ticketNumber, channel) {
  try {
    const logChannel = guild.channels.cache.find(
      ch => ch.name === '🎫-ticket-logs'
    );

    if (!logChannel) {
      return;
    }

    const embed = new WildArkEmbed()
      .setTitle(`🎫 Ticket ${action}`)
      .addFields(
        { name: 'Ticket #', value: `${ticketNumber}`, inline: true },
        { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Channel', value: `<#${channel.id}>`, inline: true },
        { name: 'Action', value: action, inline: true },
        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
      )
      .setColor(action === 'CREATED' ? 0x10B981 : 0x6B7280);

    await logChannel.send({ embeds: [embed] });

  } catch (error) {
    logger.error('Hiba a ticket log íráskor:', error);
  }
}

/**
 * Aktív ticketek lekérése
 * @returns {Map} - Aktív ticketek
 */
export function getActiveTickets() {
  return activeTickets;
}

export default {
  setupTicketSystem,
  handleTicketReaction,
  closeTicket,
  getActiveTickets,
};
