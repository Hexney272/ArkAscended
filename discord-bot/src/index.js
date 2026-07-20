/**
 * WildArk Discord Bot v2 - Main Entry Point
 * English-only, single-server, no language gate, no server query
 */

import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import log from './utils/logger.js';

// Commands
import { setupCommand } from './commands/setup.js';
import { ticketCommand } from './commands/ticket.js';
import { adminCommands } from './commands/admin.js';
import { giveawayCommand } from './commands/giveaway.js';
import { suggestCommand } from './commands/suggest.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

// Register commands
client.commands = new Collection();
const allCommands = [setupCommand, ticketCommand, ...adminCommands, giveawayCommand, suggestCommand];
allCommands.forEach(cmd => client.commands.set(cmd.data.name, cmd));

// Ready
client.once('ready', async () => {
  log.bot(`WildArk Bot online as ${client.user.tag}`);
  log.info(`Serving ${client.guilds.cache.size} guild(s)`);

  // Register slash commands
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: allCommands.map(c => c.data.toJSON()) }
    );
    log.success(`${allCommands.length} slash commands registered`);
  } catch (e) {
    log.error('Failed to register commands:', e);
  }

  client.user.setActivity('WildArk | /help', { type: 0 });
});

// Interactions (slash commands + buttons)
client.on('interactionCreate', async interaction => {
  // Slash commands
  if (interaction.isChatInputCommand()) {
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;
    try {
      log.cmd(interaction.commandName, interaction.user.tag);
      await cmd.execute(interaction);
    } catch (e) {
      log.error(`Error in /${interaction.commandName}:`, e);
      const msg = { content: '❌ Something went wrong.', ephemeral: true };
      if (interaction.replied || interaction.deferred) await interaction.followUp(msg);
      else await interaction.reply(msg);
    }
    return;
  }

  // Buttons (ticket system, giveaway)
  if (interaction.isButton()) {
    try {
      const { handleButton } = await import('./modules/buttonHandler.js');
      await handleButton(interaction);
    } catch (e) {
      log.error('Button handler error:', e);
    }
    return;
  }
});

// Member join (welcome)
client.on('guildMemberAdd', async member => {
  try {
    const { onMemberJoin } = await import('./modules/welcome.js');
    await onMemberJoin(member);
  } catch (e) {
    log.error('Welcome error:', e);
  }
});

// Member leave
client.on('guildMemberRemove', async member => {
  try {
    const { onMemberLeave } = await import('./modules/welcome.js');
    await onMemberLeave(member);
  } catch (e) {
    log.error('Leave log error:', e);
  }
});

// Message (automod + leveling)
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  try {
    const { checkMessage } = await import('./modules/automod.js');
    await checkMessage(message);
  } catch (e) {
    log.error('Automod error:', e);
  }
  try {
    const { addXP } = await import('./modules/leveling.js');
    await addXP(message);
  } catch (e) {
    log.error('Leveling error:', e);
  }
});

// Reaction add (reaction roles)
client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;
  try {
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    const { handleReaction } = await import('./modules/reactionRoles.js');
    await handleReaction(reaction, user, 'add');
  } catch (e) {
    log.error('Reaction add error:', e);
  }
});

// Reaction remove
client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return;
  try {
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    const { handleReaction } = await import('./modules/reactionRoles.js');
    await handleReaction(reaction, user, 'remove');
  } catch (e) {
    log.error('Reaction remove error:', e);
  }
});

// Error handling
process.on('unhandledRejection', e => log.error('Unhandled rejection:', e));

// Login
client.login(process.env.DISCORD_TOKEN).catch(e => {
  if (e.message?.includes('disallowed intents')) {
    log.error('INTENTS NOT ENABLED! Go to Discord Developer Portal -> Bot -> Enable all 3 Privileged Intents');
  } else if (e.message?.includes('token')) {
    log.error('INVALID TOKEN! Check DISCORD_TOKEN in your .env file');
  } else {
    log.error('Login failed:', e);
  }
  process.exit(1);
});

export default client;
