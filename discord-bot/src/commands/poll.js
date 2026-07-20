/**
 * /poll - Create a poll with reactions
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';

const NUMBER_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

export const pollCommand = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')
    .addStringOption(opt => opt.setName('question').setDescription('Poll question').setRequired(true))
    .addStringOption(opt => opt.setName('option1').setDescription('Option 1').setRequired(true))
    .addStringOption(opt => opt.setName('option2').setDescription('Option 2').setRequired(true))
    .addStringOption(opt => opt.setName('option3').setDescription('Option 3'))
    .addStringOption(opt => opt.setName('option4').setDescription('Option 4'))
    .addStringOption(opt => opt.setName('option5').setDescription('Option 5')),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = [];
    for (let i = 1; i <= 5; i++) {
      const val = interaction.options.getString(`option${i}`);
      if (val) options.push(val);
    }

    const description = options
      .map((opt, i) => `${NUMBER_EMOJIS[i]} ${opt}`)
      .join('\n\n');

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`📊 ${question}`)
      .setDescription(description)
      .setFooter({ text: `Poll by ${interaction.user.tag} • React to vote!` })
      .setTimestamp();

    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    for (let i = 0; i < options.length; i++) {
      await msg.react(NUMBER_EMOJIS[i]);
    }
  },
};

export default pollCommand;
