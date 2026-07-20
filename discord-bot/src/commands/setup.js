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

export default setupCommand;
