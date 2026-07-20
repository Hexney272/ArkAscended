/**
 * ARK-specific commands - /breed, /spawn, /boss, /dino
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';

// Breeding data (x50 rates applied)
const BREED_DATA = {
  rex: { name: 'Rex', mating: '1m', egg: '10m', baby: '3h 40m', total: '~4h' },
  giga: { name: 'Giganotosaurus', mating: '1m', egg: '48m', baby: '11h', total: '~12h' },
  yuty: { name: 'Yutyrannus', mating: '1m', egg: '10m', baby: '4h', total: '~4.5h' },
  theri: { name: 'Therizinosaurus', mating: '1m', egg: '10m', baby: '4h', total: '~4.5h' },
  wyvern: { name: 'Wyvern', mating: 'N/A', egg: '60m', baby: '3h 45m', total: '~5h' },
  shadowmane: { name: 'Shadowmane', mating: '1m', egg: 'Live birth', baby: '6h', total: '~6h' },
  deinonychus: { name: 'Deinonychus', mating: 'N/A', egg: '10m', baby: '2h', total: '~2.5h' },
  magmasaur: { name: 'Magmasaur', mating: 'N/A', egg: '10m', baby: '4h', total: '~4.5h' },
};

const breedCommand = {
  data: new SlashCommandBuilder()
    .setName('breed')
    .setDescription('Breeding times for a dino (x50 rates)')
    .addStringOption(opt =>
      opt.setName('dino').setDescription('Dino name')
        .setRequired(true)
        .addChoices(
          ...Object.entries(BREED_DATA).map(([k, v]) => ({ name: v.name, value: k }))
        )),

  async execute(interaction) {
    const key = interaction.options.getString('dino');
    const d = BREED_DATA[key];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`🐣 Breeding: ${d.name}`)
      .setDescription('Times calculated for **x50 maturation rates**')
      .addFields(
        { name: 'Mating', value: d.mating, inline: true },
        { name: 'Egg/Gestation', value: d.egg, inline: true },
        { name: 'Baby Phase', value: d.baby, inline: true },
        { name: 'Total Time', value: d.total, inline: true },
      )
      .setFooter({ text: 'WildArk x50 Rates' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export default breedCommand;
