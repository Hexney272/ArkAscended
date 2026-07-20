/**
 * Giveaway System - Create timed giveaways with button entry
 * 
 * /giveaway <prize> <duration> <winners>
 * Posts embed in #giveaways with "Join" button
 * After duration, picks random winner(s) and announces
 */

import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

// Active giveaways: Map<messageId, { prize, endsAt, winners, entries: Set<userId>, channelId, guildId }>
const activeGiveaways = new Map();

/**
 * Start a new giveaway
 */
export async function startGiveaway(interaction, prize, durationMinutes, winnerCount) {
  const channel = interaction.guild.channels.cache.find(c => c.name === '🎁-giveaways');
  if (!channel) {
    return interaction.reply({ content: '❌ #🎁-giveaways channel not found. Run /setup first.', ephemeral: true });
  }

  await interaction.deferReply({ ephemeral: true });

  const endsAt = Date.now() + durationMinutes * 60 * 1000;

  const embed = new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('🎁 GIVEAWAY')
    .setDescription(
      `**Prize:** ${prize}\n\n` +
      `**Winners:** ${winnerCount}\n` +
      `**Ends:** <t:${Math.floor(endsAt / 1000)}:R>\n\n` +
      `Click the button below to enter! 🎉\n` +
      `Entries: **0**`
    )
    .setFooter({ text: `Hosted by ${interaction.user.tag}` })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('giveaway_join_placeholder')
      .setLabel('🎉 Enter Giveaway')
      .setStyle(ButtonStyle.Success)
  );

  const msg = await channel.send({ embeds: [embed], components: [row] });

  // Update button with actual message ID
  const realRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`giveaway_join_${msg.id}`)
      .setLabel('🎉 Enter Giveaway')
      .setStyle(ButtonStyle.Success)
  );
  await msg.edit({ components: [realRow] });

  // Store giveaway data
  activeGiveaways.set(msg.id, {
    prize,
    endsAt,
    winners: winnerCount,
    entries: new Set(),
    channelId: channel.id,
    guildId: interaction.guild.id,
    messageId: msg.id,
  });

  // Schedule end
  setTimeout(() => endGiveaway(msg.id, interaction.client), durationMinutes * 60 * 1000);

  await interaction.editReply({ content: `✅ Giveaway started in ${channel}!` });
  log.success(`Giveaway started: "${prize}" (${durationMinutes}m, ${winnerCount} winners)`);
}

/**
 * Handle join button click
 */
export async function joinGiveaway(interaction) {
  const messageId = interaction.customId.replace('giveaway_join_', '');
  const giveaway = activeGiveaways.get(messageId);

  if (!giveaway) {
    return interaction.reply({ content: '❌ This giveaway has ended.', ephemeral: true });
  }

  if (giveaway.entries.has(interaction.user.id)) {
    return interaction.reply({ content: '⚠️ You already entered this giveaway!', ephemeral: true });
  }

  giveaway.entries.add(interaction.user.id);

  // Update embed with entry count
  const msg = await interaction.message.fetch();
  const embed = EmbedBuilder.from(msg.embeds[0]);
  const desc = embed.data.description.replace(/Entries: \*\*\d+\*\*/, `Entries: **${giveaway.entries.size}**`);
  embed.setDescription(desc);
  await msg.edit({ embeds: [embed] });

  await interaction.reply({ content: '✅ You entered the giveaway! Good luck! 🎉', ephemeral: true });
}

/**
 * End a giveaway and pick winners
 */
async function endGiveaway(messageId, client) {
  const giveaway = activeGiveaways.get(messageId);
  if (!giveaway) return;

  activeGiveaways.delete(messageId);

  const guild = client.guilds.cache.get(giveaway.guildId);
  if (!guild) return;

  const channel = guild.channels.cache.get(giveaway.channelId);
  if (!channel) return;

  const entries = [...giveaway.entries];

  // Pick winners
  const winners = [];
  const pool = [...entries];
  for (let i = 0; i < Math.min(giveaway.winners, pool.length); i++) {
    const idx = Math.floor(Math.random() * pool.length);
    winners.push(pool.splice(idx, 1)[0]);
  }

  // Announce
  const winnerMentions = winners.length > 0
    ? winners.map(id => `<@${id}>`).join(', ')
    : 'No entries 😢';

  const embed = new EmbedBuilder()
    .setColor(winners.length > 0 ? COLORS.SUCCESS : COLORS.ERROR)
    .setTitle('🎁 GIVEAWAY ENDED')
    .setDescription(
      `**Prize:** ${giveaway.prize}\n\n` +
      `**Winner(s):** ${winnerMentions}\n` +
      `**Total entries:** ${entries.length}`
    )
    .setTimestamp();

  await channel.send({ embeds: [embed] });

  // Update original message
  try {
    const originalMsg = await channel.messages.fetch(messageId);
    const disabledRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`giveaway_ended_${messageId}`)
        .setLabel('Giveaway Ended')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true)
    );
    await originalMsg.edit({ components: [disabledRow] });
  } catch (e) {
    // Original message may have been deleted
  }

  log.success(`Giveaway ended: "${giveaway.prize}" | Winners: ${winnerMentions}`);
}
