/**
 * Permission Builder Module
 * Automatikus jogosultságok kezelése
 */

import { PermissionFlagsBits } from 'discord.js';
import logger from '../utils/logger.js';

/**
 * Alapértelmezett jogosultság-sémák rang típusok szerint
 */
const PERMISSION_SCHEMES = {
  FOUNDER: [
    PermissionFlagsBits.Administrator,
  ],
  
  ADMIN: [
    PermissionFlagsBits.Administrator,
  ],
  
  MODERATOR: [
    PermissionFlagsBits.KickMembers,
    PermissionFlagsBits.BanMembers,
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.ModerateMembers,
    PermissionFlagsBits.ManageThreads,
    PermissionFlagsBits.ViewAuditLog,
  ],
  
  HELPER: [
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.ModerateMembers,
    PermissionFlagsBits.ManageThreads,
  ],
  
  VIP: [
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.EmbedLinks,
    PermissionFlagsBits.AttachFiles,
    PermissionFlagsBits.UseExternalEmojis,
    PermissionFlagsBits.ChangeNickname,
  ],
};

/**
 * Szerver alapértelmezett jogosultságainak beállítása
 * @param {Guild} guild - Discord Guild
 * @param {Map} roles - Létrehozott rangok
 */
export async function setupPermissions(guild, roles) {
  logger.info('🔒 Jogosultságok beállítása...');

  try {
    // Everyone role alapértelmezett jogosultságai
    await guild.roles.everyone.setPermissions([
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.EmbedLinks,
      PermissionFlagsBits.AttachFiles,
      PermissionFlagsBits.AddReactions,
      PermissionFlagsBits.UseExternalEmojis,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.Connect,
      PermissionFlagsBits.Speak,
      PermissionFlagsBits.UseVAD,
    ]);

    logger.success('✅ Everyone jogosultságok beállítva');

    // Bot rangok permission-jei
    // MEGJEGYZÉS: a '🤖 Bot' rang jelenleg dekoratív - a kód sehol
    // nem rendeli hozzá a bot saját felhasználójához. A bot saját
    // láthatóságát a categoryBuilder.js biztosítja explicit módon
    // (guild.members.me-re állított permission overwrite minden
    // rejtett kategórián), ettől függetlenül.
    const botRole = roles.get('🤖 Bot');
    if (botRole) {
      await botRole.setPermissions([
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ManageMessages,
        PermissionFlagsBits.EmbedLinks,
        PermissionFlagsBits.AttachFiles,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.AddReactions,
        PermissionFlagsBits.UseExternalEmojis,
        PermissionFlagsBits.ManageRoles,
        PermissionFlagsBits.ManageChannels,
      ]);
      logger.success('✅ Bot jogosultságok beállítva');
    }

    logger.success('🎉 Jogosultságok sikeresen beállítva!');

  } catch (error) {
    logger.error('❌ Hiba a jogosultságok beállítása során:', error);
    throw error;
  }
}

/**
 * Csatorna-specifikus jogosultságok beállítása
 * @param {Channel} channel - Discord channel
 * @param {string} permissionType - Permission típusa
 * @param {Guild} guild - Discord Guild
 * @param {Map} roles - Rangok
 */
export async function setChannelPermissions(channel, permissionType, guild, roles) {
  try {
    switch (permissionType) {
      case 'READ_ONLY':
        await channel.permissionOverwrites.create(guild.roles.everyone, {
          SendMessages: false,
          AddReactions: true,
          ReadMessageHistory: true,
        });
        break;

      case 'STAFF_ONLY':
        await channel.permissionOverwrites.create(guild.roles.everyone, {
          ViewChannel: false,
        });

        const staffRoles = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];
        for (const roleName of staffRoles) {
          const role = roles.get(roleName);
          if (role) {
            await channel.permissionOverwrites.create(role, {
              ViewChannel: true,
              SendMessages: true,
              ReadMessageHistory: true,
            });
          }
        }
        break;

      case 'ADMIN_ONLY':
        await channel.permissionOverwrites.create(guild.roles.everyone, {
          ViewChannel: false,
        });

        const adminRoles = ['👑 Founder', '🔴 Admin'];
        for (const roleName of adminRoles) {
          const role = roles.get(roleName);
          if (role) {
            await channel.permissionOverwrites.create(role, {
              ViewChannel: true,
              SendMessages: true,
              ReadMessageHistory: true,
            });
          }
        }
        break;

      case 'LOG_CHANNEL':
        await channel.permissionOverwrites.create(guild.roles.everyone, {
          ViewChannel: false,
          SendMessages: false,
        });

        const logStaffRoles = ['👑 Founder', '🔴 Admin', '🟠 Moderator'];
        for (const roleName of logStaffRoles) {
          const role = roles.get(roleName);
          if (role) {
            await channel.permissionOverwrites.create(role, {
              ViewChannel: true,
              SendMessages: false,
              ReadMessageHistory: true,
            });
          }
        }
        break;
    }

    logger.success(`🔒 ${permissionType} jogosultságok beállítva: ${channel.name}`);

  } catch (error) {
    logger.error(`Hiba a csatorna jogosultságok beállításakor (${channel.name}):`, error);
  }
}

/**
 * VIP jogosultságok hozzáadása
 * @param {GuildMember} member - Discord Member
 */
export async function grantVIPPermissions(member) {
  try {
    const vipRole = member.guild.roles.cache.find(r => r.name === '💜 VIP');
    
    if (!vipRole) {
      logger.error('VIP rang nem található!');
      return false;
    }

    await member.roles.add(vipRole);
    logger.success(`✅ VIP jogosultságok hozzáadva: ${member.user.tag}`);
    return true;

  } catch (error) {
    logger.error('Hiba a VIP jogosultságok hozzáadásakor:', error);
    return false;
  }
}

/**
 * Ellenőrzi, hogy a member rendelkezik-e admin jogosultsággal
 * @param {GuildMember} member - Discord Member
 * @returns {boolean}
 */
export function hasAdminPermission(member) {
  return member.permissions.has(PermissionFlagsBits.Administrator);
}

/**
 * Ellenőrzi, hogy a member rendelkezik-e moderator jogosultsággal
 * @param {GuildMember} member - Discord Member
 * @returns {boolean}
 */
export function hasModeratorPermission(member) {
  return member.permissions.has(PermissionFlagsBits.KickMembers) ||
         member.permissions.has(PermissionFlagsBits.BanMembers) ||
         member.permissions.has(PermissionFlagsBits.Administrator);
}

export default {
  setupPermissions,
  setChannelPermissions,
  grantVIPPermissions,
  hasAdminPermission,
  hasModeratorPermission,
};
