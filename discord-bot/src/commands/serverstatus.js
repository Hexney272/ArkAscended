/**
 * Server Status Command
 * Azonnali, kézi lekérdezés az ARK szerverek státuszáról.
 *
 * FONTOS: a lekérdezés nem tudja megmutatni KIK vannak fent név
 * szerint - ez ASA EOS query protokolljának technikai korlátja,
 * csak online/offline állapotot és játékosszámot ad vissza.
 */

import { SlashCommandBuilder } from 'discord.js';
import { getServerStatusEmbed } from '../modules/serverMonitor.js';
import { WildArkEmbed } from '../utils/embedBuilder.js';
import logger from '../utils/logger.js';

export const serverStatusCommand = {
  data: new SlashCommandBuilder()
    .setName('serverstatus')
    .setDescription('📊 ARK szerverek élő státuszának lekérdezése (online/offline, játékosszám)'),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const embed = await getServerStatusEmbed();
      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      logger.error('Hiba a serverstatus parancs végrehajtásakor:', error);
      await interaction.editReply({
        embeds: [WildArkEmbed.error(
          'Hiba',
          'Nem sikerült lekérdezni a szerverek státuszát. Ellenőrizd a .env fájlban a szerver host/port beállításokat.'
        )],
      });
    }
  },
};

export const serverStatusCommands = [serverStatusCommand];
export default serverStatusCommands;
