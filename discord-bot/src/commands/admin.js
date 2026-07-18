/**
 * Admin Commands
 * Admin parancsok
 */

import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { WildArkEmbed } from '../utils/embedBuilder.js';
import { AUTOMOD_CONFIG } from '../modules/autoMod.js';
import logger from '../utils/logger.js';

// Purge command
const purgeCommand = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('🗑️ Üzenetek törlése')
    .addIntegerOption(option =>
      option.setName('count')
        .setDescription('Törölendő üzenetek száma (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    try {
      const count = interaction.options.getInteger('count');

      await interaction.deferReply({ ephemeral: true });

      // Üzenetek törlése
      const deleted = await interaction.channel.bulkDelete(count, true);

      await interaction.editReply({
        embeds: [WildArkEmbed.success(
          'Üzenetek Törölve',
          `🗑️ ${deleted.size} üzenet törölve ebből a csatornából!`
        )],
      });

      logger.success(`🗑️ ${deleted.size} üzenet törölve: ${interaction.user.tag}`);

    } catch (error) {
      logger.error('Hiba az üzenetek törlésekor:', error);
      await interaction.editReply({
        embeds: [WildArkEmbed.error('Hiba', 'Nem sikerült törölni az üzeneteket!')],
      });
    }
  },
};

// AutoMod status command
const automodCommand = {
  data: new SlashCommandBuilder()
    .setName('automod')
    .setDescription('🛡️ AutoMod státusz megjelenítése')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    try {
      const embed = new WildArkEmbed()
        .setTitle('🛡️ AutoMod Konfiguráció')
        .setDescription('Az automatikus moderáció jelenlegi beállításai:')
        .addFields(
          {
            name: '📊 Spam Védelem',
            value: `${AUTOMOD_CONFIG.spam.enabled ? '✅' : '❌'} ` +
                   `${AUTOMOD_CONFIG.spam.messageLimit} üzenet / ${AUTOMOD_CONFIG.spam.timeWindow / 1000}s`,
            inline: true
          },
          {
            name: '🔗 Link Védelem',
            value: `${AUTOMOD_CONFIG.links.enabled ? '✅' : '❌'} ` +
                   `Whitelist: ${AUTOMOD_CONFIG.links.whitelist.length} domain`,
            inline: true
          },
          {
            name: '📢 CAPS Védelem',
            value: `${AUTOMOD_CONFIG.caps.enabled ? '✅' : '❌'} ` +
                   `Limit: ${AUTOMOD_CONFIG.caps.threshold * 100}%`,
            inline: true
          },
          {
            name: '🚫 Tiltott Szavak',
            value: `${AUTOMOD_CONFIG.badWords.enabled ? '✅' : '❌'} ` +
                   `${AUTOMOD_CONFIG.badWords.words.length} szó tiltva`,
            inline: true
          },
          {
            name: '👥 Mention Spam',
            value: `${AUTOMOD_CONFIG.mentionSpam.enabled ? '✅' : '❌'} ` +
                   `Max: ${AUTOMOD_CONFIG.mentionSpam.maxMentions} mention`,
            inline: true
          },
          {
            name: 'ℹ️ Info',
            value: 'Staff tagok mentesek az AutoMod alól.',
            inline: false
          }
        )
        .setColor(0x10B981);

      await interaction.reply({ embeds: [embed], ephemeral: true });

    } catch (error) {
      logger.error('Hiba az automod parancs végrehajtásakor:', error);
      await interaction.reply({
        embeds: [WildArkEmbed.error('Hiba', 'Nem sikerült betölteni az AutoMod státuszt!')],
        ephemeral: true,
      });
    }
  },
};

// Server info command
const serverInfoCommand = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('📊 Szerver információk megjelenítése'),

  async execute(interaction) {
    try {
      const guild = interaction.guild;

      const embed = new WildArkEmbed()
        .setTitle(`📊 ${guild.name} - Szerver Info`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '👑 Tulajdonos', value: `<@${guild.ownerId}>`, inline: true },
          { name: '👥 Tagok', value: `${guild.memberCount}`, inline: true },
          { name: '🎭 Rangok', value: `${guild.roles.cache.size}`, inline: true },
          { name: '💬 Csatornák', value: `${guild.channels.cache.size}`, inline: true },
          { name: '🎉 Boostok', value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
          { name: '📅 Létrehozva', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true }
        )
        .setColor(0x9333EA);

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      logger.error('Hiba a serverinfo parancs végrehajtásakor:', error);
      await interaction.reply({
        embeds: [WildArkEmbed.error('Hiba', 'Nem sikerült betölteni a szerver információkat!')],
        ephemeral: true,
      });
    }
  },
};

export const adminCommands = [purgeCommand, automodCommand, serverInfoCommand];
export default adminCommands;
