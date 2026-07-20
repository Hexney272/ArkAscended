/**
 * Suggestions System - /suggest command posts embed with upvote/downvote reactions
 */

import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

export async function createSuggestion(interaction, text) {
  const channel = interaction.guild.channels.cache.find(c => c.name === '💡-suggestions');
  if (!channel) {
    return interaction.reply({ content: '❌ #💡-suggestions channel not found.', ephemeral: true });
  }

  const embed = new EmbedBuilder()
    .setColor(COLORS.INFO)
    .setTitle('💡 Suggestion')
    .setDescription(text)
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
    .setFooter({ text: 'React with 👍 or 👎 to vote!' })
    .setTimestamp();

  const msg = await channel.send({ embeds: [embed] });
  await msg.react('👍');
  await msg.react('👎');

  await interaction.reply({ content: `✅ Suggestion posted in ${channel}!`, ephemeral: true });
  log.info(`Suggestion by ${interaction.user.tag}: "${text.slice(0, 50)}..."`);
}
