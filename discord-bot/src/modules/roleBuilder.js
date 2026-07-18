/**
 * Role Builder Module
 * Teljes ranghierarchia létrehozása WildArk színekkel
 */

import { PermissionFlagsBits } from 'discord.js';
import { SERVER_STRUCTURE } from '../config/structure.js';
import logger from '../utils/logger.js';

/**
 * Összes rang létrehozása a szerverhez
 * @param {Guild} guild - Discord Guild object
 * @returns {Object} - Létrehozott rangok map-je
 */
export async function buildRoles(guild) {
  logger.info('🎨 Rangok építése...');
  
  const createdRoles = new Map();
  const existingRoles = guild.roles.cache;

  try {
    // Végigmegyünk a rangok listáján
    for (const roleData of SERVER_STRUCTURE.roles) {
      // Ellenőrizzük, hogy létezik-e már a rang
      let role = existingRoles.find(r => r.name === roleData.name);

      if (role) {
        logger.warn(`⚠️ Rang már létezik: ${roleData.name}`);
        
        // Frissítjük a meglévő rangot
        await role.edit({
          color: roleData.color,
          hoist: roleData.hoist,
          permissions: convertPermissions(roleData.permissions),
        });
        
        logger.success(`♻️ Rang frissítve: ${roleData.name}`);
      } else {
        // Új rang létrehozása
        role = await guild.roles.create({
          name: roleData.name,
          color: roleData.color,
          hoist: roleData.hoist,
          permissions: convertPermissions(roleData.permissions),
          reason: 'WildArk Discord Builder - Automatikus rang létrehozás',
        });
        
        logger.success(`✅ Rang létrehozva: ${roleData.name}`);
      }

      createdRoles.set(roleData.name, role);

      // Kis delay a rate limit elkerülésére
      await delay(500);
    }

    logger.success(`🎉 ${createdRoles.size} rang sikeresen létrehozva/frissítve!`);
    
    // Rangok pozicionálása
    await positionRoles(guild, createdRoles);

    return createdRoles;

  } catch (error) {
    logger.error('❌ Hiba a rangok létrehozása során:', error);
    throw error;
  }
}

/**
 * Rangok pozicionálása a hierarchiában
 * @param {Guild} guild - Discord Guild object
 * @param {Map} roles - Létrehozott rangok
 */
async function positionRoles(guild, roles) {
  logger.info('📊 Rangok pozicionálása...');

  try {
    const botRole = guild.members.me.roles.highest;
    const positions = [];

    // Bot role-ja legyen a legmagasabb pozíción
    let currentPosition = botRole.position - 1;

    // Végigmegyünk a rangokon fordított sorrendben (legmagasabbtól lefelé)
    const sortedRoles = SERVER_STRUCTURE.roles.sort((a, b) => b.position - a.position);

    for (const roleData of sortedRoles) {
      const role = roles.get(roleData.name);
      if (role && role.position !== currentPosition) {
        positions.push({
          role: role.id,
          position: currentPosition,
        });
        currentPosition--;
      }
    }

    if (positions.length > 0) {
      await guild.roles.setPositions(positions);
      logger.success('✅ Rangok pozicionálva!');
    }

  } catch (error) {
    logger.error('❌ Hiba a rangok pozicionálása során:', error);
  }
}



/**
 * Permission string-ek konvertálása PermissionFlagsBits-re
 * @param {Array<string>} permissions - Permission string-ek
 * @returns {Array} - PermissionFlagsBits array
 */
function convertPermissions(permissions) {
  if (!permissions || permissions.length === 0) {
    return [];
  }

  const permissionFlags = [];

  for (const perm of permissions) {
    if (PermissionFlagsBits[perm]) {
      permissionFlags.push(PermissionFlagsBits[perm]);
    }
  }

  return permissionFlags;
}

/**
 * Rang hozzáadása memberhez
 * @param {GuildMember} member - Discord Member
 * @param {string} roleName - Rang neve
 * @returns {boolean} - Sikeres volt-e
 */
export async function addRoleToMember(member, roleName) {
  try {
    const role = member.guild.roles.cache.find(r => r.name === roleName);
    
    if (!role) {
      logger.error(`Rang nem található: ${roleName}`);
      return false;
    }

    if (member.roles.cache.has(role.id)) {
      logger.warn(`Member már rendelkezik ezzel a ranggal: ${roleName}`);
      return false;
    }

    await member.roles.add(role);
    logger.success(`✅ Rang hozzáadva: ${roleName} -> ${member.user.tag}`);
    return true;

  } catch (error) {
    logger.error('Hiba a rang hozzáadása során:', error);
    return false;
  }
}

/**
 * Rang eltávolítása membertől
 * @param {GuildMember} member - Discord Member
 * @param {string} roleName - Rang neve
 * @returns {boolean} - Sikeres volt-e
 */
export async function removeRoleFromMember(member, roleName) {
  try {
    const role = member.guild.roles.cache.find(r => r.name === roleName);
    
    if (!role) {
      logger.error(`Rang nem található: ${roleName}`);
      return false;
    }

    if (!member.roles.cache.has(role.id)) {
      logger.warn(`Member nem rendelkezik ezzel a ranggal: ${roleName}`);
      return false;
    }

    await member.roles.remove(role);
    logger.success(`✅ Rang eltávolítva: ${roleName} <- ${member.user.tag}`);
    return true;

  } catch (error) {
    logger.error('Hiba a rang eltávolítása során:', error);
    return false;
  }
}

/**
 * Member rang-jának lekérése
 * @param {GuildMember} member - Discord Member
 * @returns {Array<Role>} - Member rangjai
 */
export function getMemberRoles(member) {
  return member.roles.cache.filter(role => role.name !== '@everyone');
}

/**
 * Ellenőrzi, hogy a member rendelkezik-e staff ranggal
 * @param {GuildMember} member - Discord Member
 * @returns {boolean} - Staff-e a member
 */
export function isStaff(member) {
  const staffRoles = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];
  return member.roles.cache.some(role => staffRoles.includes(role.name));
}

/**
 * Delay utility function
 * @param {number} ms - Milliszekundum
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  buildRoles,
  addRoleToMember,
  removeRoleFromMember,
  getMemberRoles,
  isStaff,
};
