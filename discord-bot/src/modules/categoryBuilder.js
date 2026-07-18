/**
 * Category Builder Module
 * Kategóriák létrehozása a szerverhez
 */

import { ChannelType } from 'discord.js';
import { SERVER_STRUCTURE } from '../config/structure.js';
import logger from '../utils/logger.js';

/**
 * Összes kategória létrehozása
 * @param {Guild} guild - Discord Guild object
 * @param {Map} roles - Létrehozott rangok
 * @returns {Map} - Létrehozott kategóriák
 */
export async function buildCategories(guild, roles) {
  logger.info('📁 Kategóriák építése...');
  
  const createdCategories = new Map();

  try {
    for (const categoryData of SERVER_STRUCTURE.categories) {
      // Ellenőrizzük, létezik-e már
      let category = guild.channels.cache.find(
        c => c.type === ChannelType.GuildCategory && c.name === categoryData.name
      );

      if (category) {
        logger.warn(`⚠️ Kategória már létezik: ${categoryData.name}`);
      } else {
        // Új kategória létrehozása
        category = await guild.channels.create({
          name: categoryData.name,
          type: ChannelType.GuildCategory,
          position: categoryData.position,
          reason: 'WildArk Discord Builder - Automatikus kategória létrehozás',
        });

        logger.success(`✅ Kategória létrehozva: ${categoryData.name}`);
      }

      // Staff kategória speciális permission-jei
      if (categoryData.name.includes('STAFF')) {
        await setStaffPermissions(category, guild, roles);
      }

      createdCategories.set(categoryData.name, category);

      // Kis delay
      await delay(500);
    }

    logger.success(`🎉 ${createdCategories.size} kategória sikeresen létrehozva!`);
    return createdCategories;

  } catch (error) {
    logger.error('❌ Hiba a kategóriák létrehozása során:', error);
    throw error;
  }
}

/**
 * Staff kategória jogosultságainak beállítása
 * @param {Channel} category - Kategória channel
 * @param {Guild} guild - Discord Guild
 * @param {Map} roles - Rangok
 */
async function setStaffPermissions(category, guild, roles) {
  try {
    // Everyone ne lássa
    await category.permissionOverwrites.create(guild.roles.everyone, {
      ViewChannel: false,
    });

    // Staff rangok lássák
    const staffRoleNames = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];
    
    for (const roleName of staffRoleNames) {
      const role = roles.get(roleName);
      if (role) {
        await category.permissionOverwrites.create(role, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
        });
      }
    }

    logger.success(`🔒 Staff jogosultságok beállítva: ${category.name}`);

  } catch (error) {
    logger.error('Hiba a staff jogosultságok beállításakor:', error);
  }
}

/**
 * Delay utility
 * @param {number} ms - Milliszekundum
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default { buildCategories };
