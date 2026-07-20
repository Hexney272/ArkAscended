/**
 * Builder Modules - Roles, Categories, Channels, Permissions
 * Creates the entire server structure from config/structure.js
 * Idempotent: skips existing items, updates if needed
 */

import { ChannelType, PermissionFlagsBits } from 'discord.js';
import { SERVER_STRUCTURE, STAFF_ROLES } from '../config/structure.js';
import log from '../utils/logger.js';

// ============================================================
// ROLE BUILDER
// ============================================================

const PERM_MAP = {
  Administrator: PermissionFlagsBits.Administrator,
  KickMembers: PermissionFlagsBits.KickMembers,
  BanMembers: PermissionFlagsBits.BanMembers,
  ManageMessages: PermissionFlagsBits.ManageMessages,
  ModerateMembers: PermissionFlagsBits.ModerateMembers,
};

export async function buildRoles(guild) {
  log.info('Building roles...');
  const created = new Map();

  for (const r of SERVER_STRUCTURE.roles) {
    let role = guild.roles.cache.find(x => x.name === r.name);
    const perms = (r.permissions || []).map(p => PERM_MAP[p]).filter(Boolean);

    if (role) {
      await role.edit({ color: r.color, hoist: r.hoist, permissions: perms });
      log.info(`  ♻️ Updated role: ${r.name}`);
    } else {
      role = await guild.roles.create({
        name: r.name,
        color: r.color,
        hoist: r.hoist,
        permissions: perms,
        reason: 'WildArk Bot setup',
      });
      log.success(`  ✅ Created role: ${r.name}`);
    }
    created.set(r.name, role);
    await delay(300);
  }

  log.success(`${created.size} roles ready`);
  return created;
}

// ============================================================
// CATEGORY + CHANNEL BUILDER
// ============================================================

export async function buildChannels(guild, roles) {
  log.info('Building categories & channels...');
  let catCount = 0;
  let chCount = 0;

  for (const cat of SERVER_STRUCTURE.categories) {
    // Find or create category
    let category = guild.channels.cache.find(
      c => c.type === ChannelType.GuildCategory && c.name === cat.name
    );

    if (!category) {
      category = await guild.channels.create({
        name: cat.name,
        type: ChannelType.GuildCategory,
        reason: 'WildArk Bot setup',
      });
      catCount++;
      log.success(`  ✅ Category: ${cat.name}`);
    }

    // Apply category-level permissions
    await applyCategoryPerms(category, cat, guild, roles);
    await delay(300);

    // Create channels inside
    for (const ch of cat.channels) {
      const type = ch.type === 'voice' ? ChannelType.GuildVoice : ChannelType.GuildText;

      let channel = guild.channels.cache.find(
        c => c.name === ch.name && c.parentId === category.id
      );

      if (!channel) {
        channel = await guild.channels.create({
          name: ch.name,
          type,
          parent: category.id,
          topic: ch.topic || undefined,
          userLimit: ch.userLimit || undefined,
          reason: 'WildArk Bot setup',
        });
        chCount++;
      }

      // Read-only channels: deny @everyone SendMessages
      if (ch.readOnly && type === ChannelType.GuildText) {
        await channel.permissionOverwrites.create(guild.roles.everyone, {
          SendMessages: false,
          AddReactions: true,
          ReadMessageHistory: true,
        });
      }

      await delay(200);
    }
  }

  log.success(`${catCount} categories, ${chCount} channels created`);
}

// ============================================================
// CATEGORY PERMISSIONS
// ============================================================

async function applyCategoryPerms(category, catData, guild, roles) {
  try {
    if (catData.staffOnly) {
      // Hide from everyone, show to staff
      await category.permissionOverwrites.create(guild.roles.everyone, { ViewChannel: false });
      for (const name of STAFF_ROLES) {
        const role = roles.get(name);
        if (role) {
          await category.permissionOverwrites.create(role, {
            ViewChannel: true, SendMessages: true, ReadMessageHistory: true,
          });
        }
      }
    }
  } catch (e) {
    log.error(`  Permission error on ${category.name}: ${e.message}`);
  }
}

// ============================================================
// PERMISSIONS SETUP (server-wide defaults)
// ============================================================

export async function setupPermissions(guild) {
  log.info('Setting server-wide permissions...');
  try {
    await guild.roles.everyone.setPermissions([
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.EmbedLinks,
      PermissionFlagsBits.AttachFiles,
      PermissionFlagsBits.AddReactions,
      PermissionFlagsBits.UseExternalEmojis,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.Connect,
      PermissionFlagsBits.Speak,
      PermissionFlagsBits.UseVAD,
    ]);
    log.success('Server permissions configured');
  } catch (e) {
    log.error('Permission setup error:', e.message);
  }
}

// ============================================================

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
