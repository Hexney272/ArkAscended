/**
 * Setup Command
 * Főparancs a teljes szerver felépítéséhez
 */

import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { buildRoles } from '../modules/roleBuilder.js';
import { buildCategories } from '../modules/categoryBuilder.js';
import { buildChannels } from '../modules/channelBuilder.js';
import { setupPermissions } from '../modules/permissionBuilder.js';
import { setupReactionRoles } from '../modules/reactionRoles.js';
import { setupTicketSystem } from '../modules/ticketSystem.js';
import { setupLanguageSelector } from '../modules/languageSystem.js';
import { setupServerMonitor } from '../modules/serverMonitor.js';
import { WildArkEmbed } from '../utils/embedBuilder.js';
import { panelExists } from '../utils/panelGuard.js';
import logger from '../utils/logger.js';

export const setupCommand = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('🦖 Teljes WildArk szerver felépítése egy parancsra!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    try {
      // Defer reply (hosszú művelet)
      await interaction.deferReply();

      const guild = interaction.guild;
      const totalSteps = 11;
      let currentStep = 0;

      logger.bot('🚀 WildArk szerver telepítés indítása...');

      // Step 1: Rangok építése
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🎨 Rangok létrehozása...')]
      });
      const roles = await buildRoles(guild);
      await delay(1000);

      // Step 2: Kategóriák építése
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '📁 Kategóriák létrehozása...')]
      });
      const categories = await buildCategories(guild, roles);
      await delay(1000);

      // Step 3: Csatornák építése
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '💬 Csatornák létrehozása...')]
      });
      const channels = await buildChannels(guild, categories, roles);
      await delay(1000);

      // Step 4: Jogosultságok beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🔒 Jogosultságok beállítása...')]
      });
      await setupPermissions(guild, roles);
      await delay(1000);

      // Step 5-9: Panel-küldő lépések. FONTOS: mindegyik egyedi
      // try/catch-be csomagolva, hogy EGY lépés hibája (pl. rate
      // limit, hiányzó csatorna) NE akassza meg a többi panel
      // kiküldését. Korábban egyetlen hiba (a bot saját jogának
      // beállítása a categoryBuilder.js-ben) az EGÉSZ /setup-ot
      // megszakította, ezért hiányzott minden panel egyszerre.

      // Step 5: Szabályzat küldése
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '📜 Szabályzat létrehozása...')]
      });
      await runStepSafely('Szabályzat', () => sendRules(guild));
      await delay(1000);

      // Step 6: Reaction Roles beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🎭 Reaction Roles beállítása...')]
      });
      await runStepSafely('Reaction Roles', () => setupReactionRoles(guild, roles));
      await delay(1000);

      // Step 7: Nyelvválasztó beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🌐 Nyelvválasztó beállítása...')]
      });
      await runStepSafely('Nyelvválasztó', () => sendLanguageSetup(guild));
      await delay(1000);

      // Step 8: Ticket rendszer beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🎫 Ticket rendszer beállítása...')]
      });
      await runStepSafely('Ticket rendszer', () => setupTicketSystem(guild, roles));
      await delay(1000);

      // Step 8.5: Szerver státusz monitor beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '📊 Szerver státusz monitor beállítása...')]
      });
      await runStepSafely('Szerver státusz monitor', () => setupServerMonitor(guild));
      await delay(1000);

      // Step 9: Welcome üzenet
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '👋 Welcome rendszer beállítása...')]
      });
      await runStepSafely('Welcome rendszer', () => sendWelcomeSetup(guild));
      await delay(1000);

      // Step 10: Befejezés
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '✅ Finalizálás...')]
      });
      await delay(1000);

      // Sikeres telepítés
      const successEmbed = WildArkEmbed.success(
        'WildArk Szerver Telepítve! 🎉',
        `**A szerver teljesen fel van építve!**\n\n` +
        `✅ ${roles.size} rang létrehozva\n` +
        `✅ ${categories.size} kategória létrehozva\n` +
        `✅ Összes csatorna létrehozva\n` +
        `✅ Jogosultságok beállítva\n` +
        `✅ Reaction Roles aktív\n` +
        `✅ Nyelvválasztó aktív (🇭🇺/🇬🇧)\n` +
        `✅ Ticket rendszer aktív\n` +
        `✅ Szerver státusz monitor aktív\n` +
        `✅ AutoMod aktív\n` +
        `✅ Welcome rendszer aktív\n\n` +
        `🦖 **A WildArk szerver használatra kész!**\n\n` +
        `📋 Ellenőrizd a csatornákat és kezdj el játszani!`
      );

      await interaction.editReply({ embeds: [successEmbed] });

      logger.success('🎉 WildArk szerver telepítés befejezve!');

    } catch (error) {
      logger.error('Hiba a setup során:', error);

      const errorEmbed = WildArkEmbed.error(
        'Telepítési Hiba',
        `Hiba történt a szerver felépítése során:\n\`\`\`${error.message}\`\`\`\n` +
        `Kérlek, ellenőrizd a bot jogosultságait és próbáld újra!`
      );

      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};

/**
 * Szabályzat küldése mindkét nyelvi csatornába
 * @param {Guild} guild - Discord Guild
 */
async function sendRules(guild) {
  await sendRulesForLang(guild, '📜-szabályzat', 'hu');
  await sendRulesForLang(guild, '📜-rules', 'en');
}

/**
 * Szabályzat küldése egy adott nyelvi csatornába.
 * @param {Guild} guild
 * @param {string} channelName
 * @param {string} lang - 'hu' vagy 'en'
 */
async function sendRulesForLang(guild, channelName, lang) {
  const rulesChannel = guild.channels.cache.find(ch => ch.name === channelName);

  if (!rulesChannel) {
    logger.warn(`⚠️ Szabályzat csatorna nem található: ${channelName}`);
    return;
  }

  const embed = WildArkEmbed.rules(lang);

  // Ha a szabályzat már ki van küldve, ne duplikáljuk
  if (await panelExists(rulesChannel, embed.data.title)) {
    logger.warn(`⚠️ Szabályzat (${lang}) már ki van küldve, kihagyva.`);
    return;
  }

  await rulesChannel.send({ embeds: [embed] });
  logger.success(`✅ Szabályzat elküldve (${lang})`);
}

/**
 * Nyelvválasztó panel kiküldése
 * @param {Guild} guild - Discord Guild
 */
async function sendLanguageSetup(guild) {
  const langChannel = guild.channels.cache.find(ch => ch.name === '🌐-nyelv-language');

  if (langChannel) {
    await setupLanguageSelector(guild, langChannel);
    logger.success('✅ Nyelvválasztó panel elküldve');
  } else {
    logger.warn('⚠️ Nyelv csatorna nem található, nyelvválasztó kihagyva');
  }
}

/**
 * Welcome setup banner - a gateway (mindenki által látott) welcome
 * csatornába, ezért KÉTNYELVŰ (a tag még nem választott nyelvet).
 * @param {Guild} guild - Discord Guild
 */
async function sendWelcomeSetup(guild) {
  const welcomeChannel = guild.channels.cache.find(ch => ch.name === '👋-welcome');

  if (!welcomeChannel) {
    logger.warn('⚠️ Welcome csatorna (👋-welcome) nem található!');
    return;
  }

  const embed = new WildArkEmbed()
    .setTitle('👋 Üdvözöljük a WildArk közösségében! / Welcome!')
    .setDescription(
      `🦖 **WildArk - ARK: Survival Ascended**\n\n` +
      `Egy szerveren játszunk (Ragnarok, PvE x50), amin a ` +
      `Primal Chaos, Primal Descended és Tides of Fortune modok futnak.\n\n` +
      `🌐 **Válassz nyelvet a #🌐-nyelv-language csatornában** a folytatáshoz!\n\n` +
      `─────────────────────\n\n` +
      `We play on one server (Ragnarok, PvE x50) running the ` +
      `Primal Chaos, Primal Descended and Tides of Fortune mods.\n\n` +
      `🌐 **Pick a language in #🌐-nyelv-language to continue!**`
    )
    .setColor(0x9333EA);

  // Ha a welcome banner már ki van küldve, ne duplikáljuk
  if (await panelExists(welcomeChannel, embed.data.title)) {
    logger.warn('⚠️ Welcome banner már ki van küldve, kihagyva.');
    return;
  }

  await welcomeChannel.send({ embeds: [embed] });
  logger.success('✅ Welcome üzenet elküldve');
}

/**
 * Egy setup-lépés biztonságos, hibatűrő futtatása. Ha a lépés
 * hibát dob, azt logoljuk és FOLYTATJUK a következő lépéssel -
 * nem hagyjuk, hogy egyetlen hiba (pl. rate limit egy csatornánál)
 * megakassza az összes utána következő panel kiküldését.
 *
 * @param {string} stepName - A lépés neve a log-üzenethez
 * @param {() => Promise<any>} fn - A futtatandó async függvény
 */
async function runStepSafely(stepName, fn) {
  try {
    await fn();
  } catch (error) {
    logger.error(`❌ Hiba a "${stepName}" lépésnél (a setup folytatódik a következő lépéssel):`, error);
  }
}

/**
 * Delay utility
 * @param {number} ms - Milliszekundum
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default setupCommand;
