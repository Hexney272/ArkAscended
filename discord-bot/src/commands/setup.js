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
import { WildArkEmbed } from '../utils/embedBuilder.js';
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
      const totalSteps = 10;
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

      // Step 5: Szabályzat küldése
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '📜 Szabályzat létrehozása...')]
      });
      await sendRules(guild);
      await delay(1000);

      // Step 6: Reaction Roles beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🎭 Reaction Roles beállítása...')]
      });
      await setupReactionRoles(guild, roles);
      await delay(1000);

      // Step 7: Nyelvválasztó beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🌐 Nyelvválasztó beállítása...')]
      });
      await sendLanguageSetup(guild);
      await delay(1000);

      // Step 8: Ticket rendszer beállítása
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '🎫 Ticket rendszer beállítása...')]
      });
      await setupTicketSystem(guild, roles);
      await delay(1000);

      // Step 9: Welcome üzenet
      currentStep++;
      await interaction.editReply({
        embeds: [WildArkEmbed.setupProgress(currentStep, totalSteps, '👋 Welcome rendszer beállítása...')]
      });
      await sendWelcomeSetup(guild);
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
 * Szabályzat küldése
 * @param {Guild} guild - Discord Guild
 */
async function sendRules(guild) {
  const rulesChannel = guild.channels.cache.find(ch => ch.name === '📜-szabályzat');
  
  if (rulesChannel) {
    const embed = WildArkEmbed.rules();
    await rulesChannel.send({ embeds: [embed] });
    logger.success('✅ Szabályzat elküldve');
  }
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
 * Welcome setup üzenet
 * @param {Guild} guild - Discord Guild
 */
async function sendWelcomeSetup(guild) {
  const welcomeChannel = guild.channels.cache.find(ch => ch.name === '👋-üdvözlés');
  
  if (welcomeChannel) {
    const embed = new WildArkEmbed()
      .setTitle('👋 Üdvözöljük a WildArk közösségében!')
      .setDescription(
        `🦖 **WildArk - ARK Ascended Szerverek**\n\n` +
        `Üdvözlünk a hivatalos WildArk Discord szerveren!\n\n` +
        `Itt találsz minden információt a szerverjeinkről:\n` +
        `• 🦖 **Primal Chaos**\n` +
        `• 🌊 **Primal Descended**\n` +
        `• ⚔️ **Tides of Fortune**\n\n` +
        `📜 Először olvasd el a szabályzatot!\n` +
        `🎭 Válassz rangot a reakciókkal!\n` +
        `💬 Csatlakozz a közösséghez!\n\n` +
        `**Jó játékot és szórakozást! 🎮**`
      )
      .setColor(0x9333EA)
      .setImage('https://i.imgur.com/wildark-banner.png'); // Placeholder

    await welcomeChannel.send({ embeds: [embed] });
    logger.success('✅ Welcome üzenet elküldve');
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
