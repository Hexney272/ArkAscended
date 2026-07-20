/**
 * Fun commands - /roll, /8ball, /coinflip
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';

const rollCommand = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a dice')
    .addIntegerOption(opt => opt.setName('sides').setDescription('Number of sides (default: 6)').setMinValue(2).setMaxValue(100)),

  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') || 6;
    const result = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor(COLORS.INFO)
      .setTitle('🎲 Dice Roll')
      .setDescription(`You rolled a **${result}** (d${sides})`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

const eightBallCommand = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8-ball a question')
    .addStringOption(opt => opt.setName('question').setDescription('Your question').setRequired(true)),

  async execute(interaction) {
    const responses = [
      '🟢 Yes, definitely!', '🟢 Without a doubt.', '🟢 You may rely on it.',
      '🟢 Absolutely!', '🟢 Signs point to yes.',
      '🟡 Ask again later.', '🟡 Cannot predict now.', '🟡 Concentrate and ask again.',
      '🔴 Don\'t count on it.', '🔴 My reply is no.', '🔴 Very doubtful.',
      '🔴 Outlook not so good.', '🔴 My sources say no.',
    ];

    const answer = responses[Math.floor(Math.random() * responses.length)];
    const question = interaction.options.getString('question');

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🎱 Magic 8-Ball')
      .addFields(
        { name: 'Question', value: question },
        { name: 'Answer', value: answer },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

const coinflipCommand = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin'),

  async execute(interaction) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const emoji = result === 'Heads' ? '🪙' : '💫';

    await interaction.reply(`${emoji} **${result}!**`);
  },
};

export const funCommands = [rollCommand, eightBallCommand, coinflipCommand];
export default funCommands;
