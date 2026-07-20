/**
 * /embed - Staff custom embed builder
 */

import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/structure.js';

export const embedCommand = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Create a custom embed message (staff)')
    .addStringOption(opt => opt.setName('title').setDescription('Embed title').setRequired(true))
    .addStringOption(opt => opt.setName('description').setDescription('Embed content').setRequired(true))
    .addStringOption(opt => opt.setName('color').setDescription('Color: purple/green/red/blue/orange (default: purple)'))
    .addStringOption(opt => opt.setName('image').setDescription('Image URL (optional)'))
    .addStringOption(opt => opt.setName('thumbnail').setDescription('Thumbnail URL (optional)'))
    .addChannelOption(opt => opt.setName('channel').setDescription('Target channel (default: current)'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const colorName = interaction.options.getString('color') || 'purple';
    const image = interaction.options.getString('image');
    const thumbnail = interaction.options.getString('thumbnail');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    const colorMap = {
      purple: COLORS.PRIMARY,
      green: COLORS.SUCCESS,
      red: COLORS.ERROR,
      blue: COLORS.INFO,
      orange: COLORS.WARNING,
    };

    const embed = new EmbedBuilder()
      .setColor(colorMap[colorName] || COLORS.PRIMARY)
      .setTitle(title)
      .setDescription(description.replace(/\\n/g, '\n'))
      .setTimestamp();

    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: `✅ Embed sent to ${channel}`, ephemeral: true });
  },
};

export default embedCommand;
