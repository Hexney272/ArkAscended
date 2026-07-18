/**
 * Category Builder Module
 * Kategóriák létrehozása a szerverhez + NYELVI LÁTHATÓSÁG.
 *
 * Minden kategóriának van egy `visibility` mezője a structure.js-ben:
 * - 'gateway': mindenki látja (@everyone) - ez a belépési pont
 * - 'hu' / 'en': csak a megfelelő nyelvi rang + staff látja
 * - 'shared': bárki látja, akinek VAN nyelvi rangja (hu VAGY en)
 * - 'staff': csak staff rangok látják
 * - nincs megadva: nem nyúlunk a láthatósághoz (marad az alap)
 *
 * FONTOS Discord permission-viselkedés, amire ez épül: ha egy
 * csatornán NINCS explicit permission overwrite egy adott role-ra,
 * az a role a SZÜLŐ KATEGÓRIÁTÓL örökli a jogosultságot. A
 * channelBuilder.js csak azokat a biteket állítja be csatorna-
 * szinten, amik a structure.js channelData.permissions mezőjében
 * explicit szerepelnek (pl. "ne írhasson mindenki") - a ViewChannel
 * bitet csatorna-szinten sosem nyúljuk, így az mindig a kategóriától
 * öröklődik. Ezért elég A KATEGÓRIÁN beállítani a nyelvi láthatóságot,
 * az összes alatta lévő csatornára automatikusan érvényes lesz.
 */

import { ChannelType } from 'discord.js';
import { SERVER_STRUCTURE } from '../config/structure.js';
import { createLanguageRoles } from './languageSystem.js';
import logger from '../utils/logger.js';

const STAFF_ROLE_NAMES = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];

/**
 * Összes kategória létrehozása
 * @param {Guild} guild - Discord Guild object
 * @param {Map} roles - Létrehozott rangok (staff rangokhoz)
 * @returns {Map} - Létrehozott kategóriák
 */
export async function buildCategories(guild, roles) {
  logger.info('📁 Kategóriák építése...');

  // A nyelvi rangoknak MÁR LÉTEZNIÜK KELL, mielőtt a kategória-szintű
  // láthatóságot beállítjuk rájuk - ezért itt, a kategória-építés
  // elején biztosítjuk őket (nem várunk meg a /setup későbbi,
  // nyelvválasztó-panel lépésére).
  await createLanguageRoles(guild);
  const huRole = guild.roles.cache.find(r => r.name === '🇭🇺 Magyar');
  const enRole = guild.roles.cache.find(r => r.name === '🇬🇧 English');

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

      // Nyelvi/staff láthatóság beállítása a visibility mező alapján
      await applyVisibility(category, categoryData.visibility, guild, roles, huRole, enRole);

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
 * Kategória láthatóságának beállítása a visibility típus alapján.
 * @param {CategoryChannel} category
 * @param {string|undefined} visibility - 'gateway'|'hu'|'en'|'shared'|'staff'|undefined
 * @param {Guild} guild
 * @param {Map} roles - Staff rangok map-je (buildRoles eredménye)
 * @param {Role|undefined} huRole
 * @param {Role|undefined} enRole
 */
async function applyVisibility(category, visibility, guild, roles, huRole, enRole) {
  if (!visibility) {
    // Nincs speciális láthatóság megadva - nem nyúlunk hozzá
    return;
  }

  const everyone = guild.roles.everyone;

  // A bot saját felhasználója MINDEN rejtett kategórián explicit
  // ViewChannel jogot kap. Ez azért fontos, mert a bot esetleges
  // OAuth meghívási jogaitól (Administrator vagy nem) függetlenül
  // biztosítja, hogy a /setup panel-küldő lépései sose akadjanak el
  // egy olyan kategóriánál, amit a bot saját magától elrejtett volna.
  //
  // FONTOS JAVÍTÁS: ez korábban a try/catch-en KÍVÜL volt. Ha ez a
  // hívás elhasalt (pl. rate limit ~140+ permission-hívásnál 20
  // kategórián keresztül), a hiba feldobódott a /setup parancsig és
  // MEGSZAKÍTOTTA A TELJES TELEPÍTÉST, mielőtt elért volna a
  // szabályzat/reaction roles/nyelvválasztó/ticket panel-küldő
  // lépésekig - ez magyarázta, hogy minden panel hiányzott egyszerre.
  try {
    if (guild.members.me) {
      await category.permissionOverwrites.create(guild.members.me, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
        ManageMessages: true,
        AddReactions: true,
      });
    }
  } catch (botPermError) {
    logger.error(`Hiba a bot saját jogosultságának beállításakor (${category.name}):`, botPermError);
    // Nem dobjuk tovább - a kategória létrehozása/láthatósága
    // folytatódjon, még ha a bot saját explicit joga nem sikerült.
  }

  try {
    switch (visibility) {
      case 'gateway':
        // Mindenki látja - ez a belépési kategória (welcome + nyelvválasztó)
        await category.permissionOverwrites.create(everyone, { ViewChannel: true });
        break;

      case 'hu':
        await category.permissionOverwrites.create(everyone, { ViewChannel: false });
        if (huRole) {
          await category.permissionOverwrites.create(huRole, { ViewChannel: true });
        }
        await grantStaffView(category, roles);
        break;

      case 'en':
        await category.permissionOverwrites.create(everyone, { ViewChannel: false });
        if (enRole) {
          await category.permissionOverwrites.create(enRole, { ViewChannel: true });
        }
        await grantStaffView(category, roles);
        break;

      case 'shared':
        // Bárki látja, aki már választott nyelvet (hu VAGY en)
        await category.permissionOverwrites.create(everyone, { ViewChannel: false });
        if (huRole) {
          await category.permissionOverwrites.create(huRole, { ViewChannel: true });
        }
        if (enRole) {
          await category.permissionOverwrites.create(enRole, { ViewChannel: true });
        }
        await grantStaffView(category, roles);
        break;

      case 'staff':
        await category.permissionOverwrites.create(everyone, { ViewChannel: false });
        await grantStaffView(category, roles);
        break;

      default:
        logger.warn(`⚠️ Ismeretlen visibility típus: ${visibility} (${category.name})`);
        return;
    }

    logger.success(`🔒 Láthatóság beállítva (${visibility}): ${category.name}`);

  } catch (error) {
    logger.error(`Hiba a kategória láthatóság beállításakor (${category.name}):`, error);
  }
}

/**
 * Staff rangoknak ViewChannel jog adása egy kategórián.
 * @param {CategoryChannel} category
 * @param {Map} roles
 */
async function grantStaffView(category, roles) {
  for (const roleName of STAFF_ROLE_NAMES) {
    const role = roles.get(roleName);
    if (role) {
      await category.permissionOverwrites.create(role, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
      });
    }
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
