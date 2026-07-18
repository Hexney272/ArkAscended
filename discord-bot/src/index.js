/**
 * WildArk Discord Builder - Main Entry Point
 * Bot inicializáció és event handling
 */

import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import logger from './utils/logger.js';
import { setupCommand } from './commands/setup.js';
import { ticketCommands } from './commands/ticket.js';
import { adminCommands } from './commands/admin.js';
import { serverStatusCommands } from './commands/serverstatus.js';

// Környezeti változók betöltése
config();

// Discord Client létrehozása
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

// Commands collection
client.commands = new Collection();

// Parancsok regisztrálása
const commands = [
  setupCommand,
  ...ticketCommands,
  ...adminCommands,
  ...serverStatusCommands,
];

commands.forEach(command => {
  client.commands.set(command.data.name, command);
});

// Bot ready event
client.once('ready', async () => {
  logger.bot(`🦖 WildArk Discord Builder elindult!`);
  logger.success(`Bejelentkezve mint: ${client.user.tag}`);
  logger.info(`Szerverek száma: ${client.guilds.cache.size}`);

  // Diagnosztika: mutassuk meg induláskor, hogy a bot milyen ARK
  // szerver-adatokat lát a .env-ből. Ha ez üres, a .env módosítása
  // NEM lesz érvényes amíg nem indítod újra a botot (a dotenv csak
  // induláskor egyszer olvassa be a fájlt).
  if (process.env.ARK_SERVER_HOST) {
    logger.info(`📊 ARK szerver monitor: ${process.env.ARK_SERVER_HOST}:${process.env.ARK_SERVER_QUERY_PORT || '27015'}`);
  } else {
    logger.warn('📊 ARK szerver monitor: ARK_SERVER_HOST nincs beállítva (.env) - a státusz "ismeretlen" lesz.');
  }

  // Slash commands regisztrálása
  await registerCommands();

  // Szerver státusz monitor automatikus (re)indítása.
  // FONTOS: ez korábban CSAK a /setup parancs futtatásakor indult
  // el, ezért bot-újraindítás után a panel "megfagyott" és nem
  // frissült tovább, amíg valaki nem futtatta újra a /setup-ot.
  // Mostantól minden induláskor automatikusan folytatja a meglévő
  // panel frissítését, nem kell hozzá /setup.
  try {
    const { setupServerMonitor } = await import('./modules/serverMonitor.js');
    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (guild) {
      await setupServerMonitor(guild);
    } else {
      logger.warn('📊 Szerver monitor auto-indítás kihagyva: GUILD_ID nem található a cache-ben.');
    }
  } catch (error) {
    logger.error('Hiba a szerver monitor automatikus indításakor:', error);
  }

  // Status beállítása
  client.user.setActivity('WildArk Server Builder 🦖', { type: 'WATCHING' });
});



// Slash command interaction handling
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    logger.warn(`Ismeretlen parancs: ${interaction.commandName}`);
    return;
  }

  try {
    logger.command(interaction.commandName, interaction.user.tag);
    await command.execute(interaction);
  } catch (error) {
    logger.error(`Hiba a ${interaction.commandName} parancs végrehajtásakor:`, error);
    
    const errorMessage = { 
      content: '❌ Hiba történt a parancs végrehajtása során!', 
      ephemeral: true 
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Member join event (Welcome System)
// FONTOS JAVÍTÁS: korábban ez közvetlenül küldte a welcome embedet,
// megkerülve a welcomeSystem.js handleWelcome()-ját - ezért a
// '⚪ Member' alapértelmezett rang SOSEM lett automatikusan
// kiosztva új tagoknak. Mostantól a handleWelcome() fut, ami a
// welcome üzenetet ÉS a default rangot is elintézi.
client.on('guildMemberAdd', async member => {
  try {
    const { handleWelcome } = await import('./modules/welcomeSystem.js');
    await handleWelcome(member);
  } catch (error) {
    logger.error('Hiba a welcome rendszerben:', error);
  }
});

// Message reaction add event (Reaction Roles & Ticket)
client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  try {
    // Fetch partial messages
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    const { handleReactionRole } = await import('./modules/reactionRoles.js');
    const { handleTicketReaction } = await import('./modules/ticketSystem.js');
    const { handleLanguageReaction } = await import('./modules/languageSystem.js');

    // Reaction Roles
    await handleReactionRole(reaction, user, 'add');

    // Nyelvválasztó
    await handleLanguageReaction(reaction, user, 'add');

    // Ticket System
    if (reaction.emoji.name === '🎫') {
      await handleTicketReaction(reaction, user);
    }
  } catch (error) {
    logger.error('Hiba a reaction handlerben:', error);
  }
});

// Message reaction remove event (Reaction Roles)
client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return;

  try {
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    const { handleReactionRole } = await import('./modules/reactionRoles.js');
    const { handleLanguageReaction } = await import('./modules/languageSystem.js');

    await handleReactionRole(reaction, user, 'remove');
    await handleLanguageReaction(reaction, user, 'remove');
  } catch (error) {
    logger.error('Hiba a reaction remove handlerben:', error);
  }
});



// Message create event (AutoMod)
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  try {
    const { checkMessage } = await import('./modules/autoMod.js');
    await checkMessage(message);
  } catch (error) {
    logger.error('Hiba az automod rendszerben:', error);
  }
});

// Slash commands regisztrálása
async function registerCommands() {
  try {
    logger.info('Slash commands regisztrálása...');

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    const commandsData = commands.map(cmd => cmd.data.toJSON());

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commandsData }
    );

    logger.success(`${commandsData.length} slash command regisztrálva!`);
  } catch (error) {
    logger.error('Hiba a slash commands regisztrációja során:', error);
  }
}

// Error handling
process.on('unhandledRejection', error => {
  logger.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

// Bot bejelentkezés
client.login(process.env.DISCORD_TOKEN).catch(error => {
  if (error.message && error.message.includes('disallowed intents')) {
    logger.error('❌ HIBA: Privileged Intents nincsenek bekapcsolva!');
    console.log('');
    console.log('============================================================');
    console.log('  A bot 3 privilegizált Intent-et igényel, amit a Discord');
    console.log('  Developer Portal-on KÉZZEL be kell kapcsolni!');
    console.log('============================================================');
    console.log('');
    console.log('  Javítás lépései:');
    console.log('  1. Menj: https://discord.com/developers/applications');
    console.log('  2. Válaszd ki az alkalmazásod');
    console.log('  3. Bal menü: "Bot" fül');
    console.log('  4. Görgess le "Privileged Gateway Intents" részhez');
    console.log('  5. Kapcsold BE mind a hármat:');
    console.log('     [ ] PRESENCE INTENT');
    console.log('     [ ] SERVER MEMBERS INTENT');
    console.log('     [ ] MESSAGE CONTENT INTENT');
    console.log('  6. Kattints: "Save Changes"');
    console.log('  7. Indítsd újra a botot: npm start');
    console.log('');
    console.log('============================================================');
    console.log('');
  } else if (error.message && error.message.includes('token')) {
    logger.error('❌ HIBA: Érvénytelen Discord Token!');
    console.log('');
    console.log('  Ellenőrizd a DISCORD_TOKEN értékét a .env fájlban.');
    console.log('  Generálj új tokent: Developer Portal → Bot → Reset Token');
    console.log('');
  } else {
    logger.error('Nem sikerült bejelentkezni:', error);
  }
  process.exit(1);
});

export default client;
