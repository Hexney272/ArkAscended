/**
 * Channel Builder Module
 * Összes csatorna létrehozása kategóriákba
 */

import { ChannelType } from 'discord.js';
import { SERVER_STRUCTURE } from '../config/structure.js';
import logger from '../utils/logger.js';

/**
 * Összes csatorna létrehozása
 * @param {Guild} guild - Discord Guild object
 * @param {Map} categories - Létrehozott kategóriák
 * @param {Map} roles - Létrehozott rangok
 * @returns {Map} - Létrehozott csatornák
 */
export async function buildChannels(guild, categories, roles) {
  logger.info('💬 Csatornák építése...');
  
  const createdChannels = new Map();
  let channelCount = 0;

  try {
    for (const categoryData of SERVER_STRUCTURE.categories) {
      const category = categories.get(categoryData.name);
      
      if (!category) {
        logger.error(`Kategória nem található: ${categoryData.name}`);
        continue;
      }

      for (const channelData of categoryData.channels) {
        // Ellenőrizzük, létezik-e már
        let channel = guild.channels.cache.find(
          c => c.name === channelData.name && c.parentId === category.id
        );

        if (channel) {
          logger.warn(`⚠️ Csatorna már létezik: ${channelData.name}`);
        } else {
          // Csatorna típus meghatározása
          const channelType = channelData.type === 'voice' 
            ? ChannelType.GuildVoice 
            : ChannelType.GuildText;

          // Új csatorna létrehozása
          channel = await guild.channels.create({
            name: channelData.name,
            type: channelType,
            parent: category.id,
            topic: channelData.topic || undefined,
            userLimit: channelData.userLimit || undefined,
            reason: 'WildArk Discord Builder - Automatikus csatorna létrehozás',
          });

          logger.success(`✅ Csatorna létrehozva: ${channelData.name}`);
          channelCount++;
        }

        // Speciális jogosultságok beállítása
        if (channelData.permissions) {
          await setChannelPermissions(channel, channelData.permissions, guild, roles);
        }

        createdChannels.set(channelData.name, channel);

        // Kis delay
        await delay(300);
      }
    }

    logger.success(`🎉 ${channelCount} csatorna sikeresen létrehozva!`);
    return createdChannels;

  } catch (error) {
    logger.error('❌ Hiba a csatornák létrehozása során:', error);
    throw error;
  }
}



/**
 * Csatorna jogosultságainak beállítása
 * @param {Channel} channel - Discord channel
 * @param {Object} permissions - Permission objektum
 * @param {Guild} guild - Discord Guild
 * @param {Map} roles - Rangok
 */
async function setChannelPermissions(channel, permissions, guild, roles) {
  try {
    // Everyone permission-ök
    if (permissions.everyone) {
      await channel.permissionOverwrites.create(
        guild.roles.everyone,
        permissions.everyone
      );
    }

    // Staff permission-ök
    if (permissions.staff) {
      const staffRoleNames = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];
      
      for (const roleName of staffRoleNames) {
        const role = roles.get(roleName);
        if (role) {
          await channel.permissionOverwrites.create(role, permissions.staff);
        }
      }
    }

    logger.success(`🔒 Jogosultságok beállítva: ${channel.name}`);

  } catch (error) {
    logger.error(`Hiba a csatorna jogosultságok beállításakor (${channel.name}):`, error);
  }
}

/**
 * Speciális csatorna keresése név alapján
 * @param {Guild} guild - Discord Guild
 * @param {string} channelName - Csatorna neve
 * @returns {Channel|null} - Talált csatorna vagy null
 */
export function findChannel(guild, channelName) {
  return guild.channels.cache.find(c => c.name === channelName);
}

/**
 * Ticket csatorna létrehozása
 * @param {Guild} guild - Discord Guild
 * @param {GuildMember} member - User aki nyitotta
 * @param {string} ticketNumber - Ticket száma
 * @param {Map} roles - Rangok
 * @returns {Channel} - Létrehozott ticket csatorna
 */
export async function createTicketChannel(guild, member, ticketNumber, roles) {
  try {
    // Ticket kategória keresése
    let ticketCategory = guild.channels.cache.find(
      c => c.type === ChannelType.GuildCategory && c.name.includes('Support Tickets')
    );

    // Ha nincs ticket kategória, létrehozzuk
    if (!ticketCategory) {
      ticketCategory = await guild.channels.create({
        name: '📫 Support Tickets',
        type: ChannelType.GuildCategory,
        reason: 'Ticket rendszer kategória',
      });
    }

    // Ticket csatorna létrehozása
    const ticketChannel = await guild.channels.create({
      name: `ticket-${ticketNumber}-${member.user.username}`,
      type: ChannelType.GuildText,
      parent: ticketCategory.id,
      topic: `Ticket #${ticketNumber} - ${member.user.tag}`,
      reason: `Ticket létrehozva ${member.user.tag} által`,
    });

    // Jogosultságok beállítása
    // Everyone ne lássa
    await ticketChannel.permissionOverwrites.create(guild.roles.everyone, {
      ViewChannel: false,
    });

    // Ticket létrehozója lássa
    await ticketChannel.permissionOverwrites.create(member, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true,
    });

    // Staff lássa
    const staffRoleNames = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];
    for (const roleName of staffRoleNames) {
      const role = roles.get(roleName);
      if (role) {
        await ticketChannel.permissionOverwrites.create(role, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
        });
      }
    }

    logger.success(`🎫 Ticket csatorna létrehozva: ${ticketChannel.name}`);
    return ticketChannel;

  } catch (error) {
    logger.error('Hiba a ticket csatorna létrehozásakor:', error);
    throw error;
  }
}

/**
 * Delay utility
 * @param {number} ms - Milliszekundum
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default { 
  buildChannels, 
  findChannel, 
  createTicketChannel 
};
