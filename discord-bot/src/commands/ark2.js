/**
 * More ARK commands - /spawn, /boss, /dino
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';

const spawnCommand = {
  data: new SlashCommandBuilder()
    .setName('spawn')
    .setDescription('Get spawn map link for a dino')
    .addStringOption(opt => opt.setName('dino').setDescription('Dino name').setRequired(true)),

  async execute(interaction) {
    const dino = interaction.options.getString('dino').toLowerCase().replace(/\s+/g, '-');
    const url = `https://www.dododex.com/spawns/${dino}/ragnarok`;

    const embed = new EmbedBuilder()
      .setColor(COLORS.INFO)
      .setTitle(`🗺️ Spawn Map: ${interaction.options.getString('dino')}`)
      .setDescription(`[View on Dododex (Ragnarok)](${url})`)
      .setFooter({ text: 'Powered by Dododex' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

const bossCommand = {
  data: new SlashCommandBuilder()
    .setName('boss')
    .setDescription('Boss fight info and requirements')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Boss name').setRequired(true)
        .addChoices(
          { name: 'Dragon', value: 'dragon' },
          { name: 'Manticore', value: 'manticore' },
          { name: 'Broodmother', value: 'broodmother' },
          { name: 'Megapithecus', value: 'megapithecus' },
        )),

  async execute(interaction) {
    const bosses = {
      dragon: {
        name: '🐲 Dragon', artifacts: 'Cunning, Immune, Strong',
        recommended: '19 Rexes + 1 Yuty', notes: 'Bring high HP rexes (40k+). Dragon does % damage.',
      },
      manticore: {
        name: '🦂 Manticore', artifacts: 'Crag, Destroyer, Gatekeeper',
        recommended: '19 Rexes + 1 Yuty', notes: 'Manticore lands infrequently. Patience is key.',
      },
      broodmother: {
        name: '🕷️ Broodmother', artifacts: 'Hunter, Clever, Massive',
        recommended: '19 Megatheriums + 1 Yuty', notes: 'Megatheriums get bug-killer buff. Easy fight.',
      },
      megapithecus: {
        name: '🦍 Megapithecus', artifacts: 'Brute, Devourer, Pack',
        recommended: '19 Rexes + 1 Yuty', notes: 'Bring shotguns for the monkeys.',
      },
    };

    const b = bosses[interaction.options.getString('name')];
    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(b.name)
      .addFields(
        { name: '📜 Artifacts', value: b.artifacts },
        { name: '🦖 Recommended', value: b.recommended },
        { name: '💡 Notes', value: b.notes },
      )
      .setFooter({ text: 'WildArk Boss Guide' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

const dinoCommand = {
  data: new SlashCommandBuilder()
    .setName('dino')
    .setDescription('Quick dino info + taming calculator link')
    .addStringOption(opt => opt.setName('name').setDescription('Dino name').setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const dododex = `https://www.dododex.com/taming/${slug}`;
    const wiki = `https://ark.wiki.gg/wiki/${name.replace(/\s+/g, '_')}`;

    const embed = new EmbedBuilder()
      .setColor(COLORS.INFO)
      .setTitle(`🦖 ${name}`)
      .setDescription(
        `**Quick Links:**\n` +
        `🧮 [Taming Calculator (Dododex)](${dododex})\n` +
        `📖 [Wiki Page](${wiki})\n` +
        `🗺️ [Spawn Map (Ragnarok)](https://www.dododex.com/spawns/${slug}/ragnarok)`
      )
      .setFooter({ text: 'Powered by Dododex & ARK Wiki' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export const arkCommands = [spawnCommand, bossCommand, dinoCommand];
export default arkCommands;
