/**
 * /setup - Builds the entire server in one command (Admin only)
 */

import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { buildRoles, buildChannels, setupPermissions } from '../modules/builders.js';
import { setupTicketPanel } from '../modules/tickets.js';
import { setupReactionRoles } from '../modules/reactionRoles.js';
import { COLORS } from '../config/structure.js';
import log from '../utils/logger.js';

export const setupCommand = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Build the entire WildArk server (roles, channels, panels)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply();
    const guild = interaction.guild;
    const steps = [];

    try {
      // Step 0: Delete all existing channels & categories (clean slate)
      await updateProgress(interaction, '🗑️ Removing old channels...');
      await deleteAllChannels(guild);
      steps.push('✅ Old channels removed');

      // Step 1: Roles
      await updateProgress(interaction, '🎨 Creating roles...');
      const roles = await buildRoles(guild);
      steps.push(`✅ ${roles.size} roles`);

      // Step 2: Channels
      await updateProgress(interaction, '💬 Creating channels...');
      await buildChannels(guild, roles);
      steps.push('✅ Categories & channels');

      // Step 3: Permissions
      await updateProgress(interaction, '🔒 Setting permissions...');
      await setupPermissions(guild);
      steps.push('✅ Permissions configured');

      // Step 4: Rules embed
      await updateProgress(interaction, '📜 Posting rules...');
      await postRules(guild);
      steps.push('✅ Rules posted');

      // Step 5: Reaction roles
      await updateProgress(interaction, '🎭 Setting up reaction roles...');
      await setupReactionRoles(guild);
      steps.push('✅ Reaction roles');

      // Step 6: Ticket panel
      await updateProgress(interaction, '🎫 Setting up tickets...');
      await setupTicketPanel(guild);
      steps.push('✅ Ticket system');

      // Step 7: Commands info panel
      await updateProgress(interaction, '📋 Posting commands info...');
      await postCommandsPanel(guild);
      steps.push('✅ Commands panel');

      // Done
      const embed = new EmbedBuilder()
        .setColor(COLORS.SUCCESS)
        .setTitle('✅ WildArk Server Setup Complete!')
        .setDescription(steps.join('\n') + '\n\n🦖 **Server is ready to go!**')
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      log.success('Server setup completed successfully');

    } catch (error) {
      log.error('Setup error:', error);
      const embed = new EmbedBuilder()
        .setColor(COLORS.ERROR)
        .setTitle('❌ Setup Error')
        .setDescription(`An error occurred during setup:\n\`\`\`${error.message}\`\`\`\n\nCompleted steps:\n${steps.join('\n') || 'None'}`)
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    }
  },
};

async function updateProgress(interaction, message) {
  const embed = new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('⏳ Setting up WildArk...')
    .setDescription(message);
  await interaction.editReply({ embeds: [embed] }).catch(() => {});
}

/**
 * Delete all channels and categories (clean slate before rebuild).
 * Keeps ONLY the system channel if one is set (Discord requires at
 * least one channel to exist on a server).
 */
async function deleteAllChannels(guild) {
  const systemChannelId = guild.systemChannelId;
  const channels = guild.channels.cache.filter(c => c.id !== systemChannelId);

  let deleted = 0;

  // Delete non-category channels first (Discord won't let you delete
  // a category that still has children)
  const nonCategories = channels.filter(c => c.type !== 4); // 4 = GuildCategory
  for (const [, ch] of nonCategories) {
    try {
      await ch.delete('WildArk /setup - clean slate');
      deleted++;
    } catch (e) {
      log.warn(`  Could not delete #${ch.name}: ${e.message}`);
    }
    await delay(300);
  }

  // Then delete categories
  const categories = channels.filter(c => c.type === 4);
  for (const [, cat] of categories) {
    try {
      await cat.delete('WildArk /setup - clean slate');
      deleted++;
    } catch (e) {
      log.warn(`  Could not delete category ${cat.name}: ${e.message}`);
    }
    await delay(300);
  }

  log.success(`Deleted ${deleted} channels/categories`);
}

async function postCommandsPanel(guild) {
  const channel = guild.channels.cache.find(c => c.name === '📢-announcements');
  if (!channel) return;

  const recent = await channel.messages.fetch({ limit: 10 });
  if (recent.find(m => m.author.id === guild.client.user.id && m.embeds[0]?.title === '📋 Bot Commands')) return;

  const embed = new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('📋 Bot Commands')
    .setDescription('Here are all the commands you can use:')
    .addFields(
      { name: '🎫 Support', value: '`/ticket` — Open a support ticket' },
      { name: '🦖 ARK', value: '`/breed` — Breeding times (x50)\n`/spawn` — Dino spawn map\n`/boss` — Boss fight guide\n`/dino` — Dino info + taming link' },
      { name: '📊 Community', value: '`/profile` — View your profile card\n`/leaderboard` — Top 10 active members\n`/suggest` — Submit a suggestion\n`/poll` — Create a poll' },
      { name: '🎁 Events & Fun', value: '`/giveaway` — Enter giveaways via button\n`/remind` — Set a personal reminder\n`/roll` — Roll a dice\n`/8ball` — Ask the magic 8-ball\n`/coinflip` — Flip a coin' },
      { name: '🎭 Roles', value: 'React in #🎭-pick-roles to get your roles!' },
    )
    .setFooter({ text: 'WildArk Bot • Use / to see all commands' })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
}

async function postRules(guild) {
  const channel = guild.channels.cache.find(c => c.name === '📜-rules');
  if (!channel) return;

  const recent = await channel.messages.fetch({ limit: 5 });
  if (recent.find(m => m.author.id === guild.client.user.id && m.embeds[0]?.title === '📜 Server Rules')) return;

  const embed = new EmbedBuilder()
    .setColor(COLORS.PRIMARY)
    .setTitle('📜 Server Rules')
    .setDescription(
      '**1️⃣ Respect everyone**\n' +
      'No harassment, racism, hate speech, or toxicity.\n\n' +
      '**2️⃣ No spam or flooding**\n' +
      'Use channels appropriately. No excessive messages.\n\n' +
      '**3️⃣ No NSFW content**\n' +
      'Keep it clean. This is a gaming community.\n\n' +
      '**4️⃣ No advertising**\n' +
      'Do not promote other servers without permission.\n\n' +
      '**5️⃣ English only**\n' +
      'Please communicate in English in all channels.\n\n' +
      '**6️⃣ Follow staff instructions**\n' +
      'Staff decisions are final. Use tickets for appeals.\n\n' +
      '**7️⃣ No cheating or exploiting**\n' +
      'Play fair on the ARK server.\n\n' +
      '**8️⃣ Have fun!** 🎮\n' +
      'We\'re here to enjoy ARK together.\n\n' +
      '⚠️ *Breaking rules may result in a mute, kick, or ban.*'
    )
    .setFooter({ text: 'WildArk Rules' })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export default setupCommand;
