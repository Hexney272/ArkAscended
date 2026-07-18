/**
 * Embed Builder Utility
 * WildArk dizájn embedek létrehozása
 */

import { EmbedBuilder } from 'discord.js';
import { COLORS, EMOJIS } from '../config/colors.js';

export class WildArkEmbed extends EmbedBuilder {
  constructor(options = {}) {
    super();
    
    // WildArk alapértelmezett design
    this.setColor(options.color || COLORS.PRIMARY);
    this.setTimestamp();
    
    if (options.footer !== false) {
      this.setFooter({ 
        text: options.footerText || 'WildArk Discord Builder',
        iconURL: options.footerIcon
      });
    }
  }

  // Success embed
  static success(title, description) {
    return new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Error embed
  static error(title, description) {
    return new EmbedBuilder()
      .setColor(COLORS.ERROR)
      .setTitle(`${EMOJIS.ERROR} ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Warning embed
  static warning(title, description) {
    return new EmbedBuilder()
      .setColor(COLORS.WARNING)
      .setTitle(`${EMOJIS.WARNING} ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Info embed
  static info(title, description) {
    return new EmbedBuilder()
      .setColor(COLORS.INFO)
      .setTitle(`${EMOJIS.INFO} ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Welcome embed - a gateway kategóriában látja mindenki, nyelvtől
  // függetlenül, MIELŐTT bármi más csatornát látna. Ezért kétnyelvű.
  static welcome(member) {
    return new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.WELCOME} Üdvözlünk a WildArk közösségében!`)
      .setDescription(
        `Szia ${member}! 🦖\n\n` +
        `Kérlek válassz nyelvet a #🌐-nyelv-language csatornában, ` +
        `hogy hozzáférj a szerver tartalmához!\n\n` +
        `─────────────────────\n\n` +
        `Hi ${member}! 🦖\n\n` +
        `Please pick a language in #🌐-nyelv-language to unlock ` +
        `access to the rest of the server!`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Ticket embed (HU/EN)
  static ticket(lang = 'hu') {
    if (lang === 'en') {
      return new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle(`${EMOJIS.TICKET} Support Ticket System`)
        .setDescription(
          `Need help? Open a ticket!\n\n` +
          `**How does it work?**\n` +
          `1️⃣ React with ${EMOJIS.TICKET}\n` +
          `2️⃣ A private channel is created automatically\n` +
          `3️⃣ Describe your issue\n` +
          `4️⃣ Staff will respond shortly\n\n` +
          `**Use this for:**\n` +
          `• Technical issues\n` +
          `• In-game help\n` +
          `• Admin questions\n` +
          `• Ban appeals\n` +
          `• Other support\n\n` +
          `⚠️ **Do not use this for spam or unnecessary tickets!**`
        )
        .setTimestamp()
        .setFooter({ text: 'WildArk Discord Builder' });
    }

    return new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.TICKET} Support Ticket Rendszer`)
      .setDescription(
        `Szükséged van segítségre? Nyiss egy ticketet!\n\n` +
        `**Hogyan működik?**\n` +
        `1️⃣ Kattints a ${EMOJIS.TICKET} reakcióra\n` +
        `2️⃣ Automatikusan létrejön egy privát csatorna\n` +
        `3️⃣ Írd le a problémádat\n` +
        `4️⃣ A staff hamarosan válaszol\n\n` +
        `**Mire használd:**\n` +
        `• Technikai problémák\n` +
        `• Játékbeli segítség\n` +
        `• Admin kérdések\n` +
        `• Ban fellebbezés\n` +
        `• Egyéb támogatás\n\n` +
        `⚠️ **Ne használd spam vagy felesleges ticketek nyitására!**`
      )
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Reaction Roles embed (HU/EN)
  static reactionRoles(lang = 'hu') {
    if (lang === 'en') {
      return new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle(`${EMOJIS.VIP} Pick Your Role!`)
        .setDescription(
          `React below to get a role!\n\n` +
          `🦖 **Primal Chaos** - Primal Chaos mod fan\n` +
          `🌊 **Primal Descended** - Primal Descended mod fan\n` +
          `⚔️ **Tides of Fortune** - Tides of Fortune interested\n\n` +
          `🔔 **Notifications** - Event and boss alerts\n` +
          `📢 **News** - Important news alerts\n\n` +
          `💜 **Roles are added automatically!**`
        )
        .setTimestamp()
        .setFooter({ text: 'WildArk Discord Builder' });
    }

    return new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.VIP} Válassz Rangot!`)
      .setDescription(
        `Kattints a reakciókra, hogy rangot kapj!\n\n` +
        `🦖 **Primal Chaos** - Primal Chaos mod kedvelője\n` +
        `🌊 **Primal Descended** - Primal Descended mod kedvelője\n` +
        `⚔️ **Tides of Fortune** - Tides of Fortune érdeklődő\n\n` +
        `🔔 **Értesítések** - Event és boss értesítések\n` +
        `📢 **Hírek** - Fontos hírek értesítései\n\n` +
        `💜 **A rangok automatikusan hozzáadódnak!**`
      )
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Rules embed (HU/EN)
  static rules(lang = 'hu') {
    if (lang === 'en') {
      return new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle(`${EMOJIS.RULES} WildArk Rules`)
        .setDescription(
          `**1️⃣ Respect and courtesy**\n` +
          `Be respectful to everyone. Harassment, racism and hate speech are forbidden.\n\n` +

          `**2️⃣ Spam and flooding**\n` +
          `Don't spam or flood. Use the appropriate channels.\n\n` +

          `**3️⃣ NSFW content**\n` +
          `Sharing NSFW (18+) content is forbidden.\n\n` +

          `**4️⃣ Advertising**\n` +
          `Advertising other servers or products only with permission.\n\n` +

          `**5️⃣ Nickname and avatar**\n` +
          `Use an appropriate name and profile picture.\n\n` +

          `**6️⃣ Voice chat**\n` +
          `Don't overuse soundboards or sound effects.\n\n` +

          `**7️⃣ Staff decisions**\n` +
          `Staff decisions are final. Disputes only via tickets.\n\n` +

          `**8️⃣ In-game rules**\n` +
          `Follow the server's gameplay rules.\n\n` +

          `⚠️ **Breaking the rules may result in a warning, mute or ban.**`
        )
        .setTimestamp()
        .setFooter({ text: 'WildArk Discord Builder' });
    }

    return new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.RULES} WildArk Szabályzat`)
      .setDescription(
        `**1️⃣ Tisztelet és udvariasság**\n` +
        `Légy tisztelettel mindenki felé. Zaklatás, rasszizmus és gyűlöletbeszéd tilos.\n\n` +
        
        `**2️⃣ Spam és flood**\n` +
        `Ne spammelj és ne floodolj. Használd a megfelelő csatornákat.\n\n` +
        
        `**3️⃣ NSFW tartalom**\n` +
        `NSFW (18+) tartalom megosztása tilos.\n\n` +
        
        `**4️⃣ Reklám**\n` +
        `Más szerverek vagy termékek reklámozása csak engedéllyel.\n\n` +
        
        `**5️⃣ Nick és profilkép**\n` +
        `Használj megfelelő nevet és profilképet.\n\n` +
        
        `**6️⃣ Voice chat**\n` +
        `Ne használj soundboardot vagy hangeffekteket túlzottan.\n\n` +
        
        `**7️⃣ Staff döntések**\n` +
        `A staff döntései végérvényesek. Vitákat csak ticket-ben.\n\n` +
        
        `**8️⃣ Játékbeli szabályok**\n` +
        `Kövesd a szerver játékszabályait.\n\n` +
        
        `⚠️ **A szabályok megszegése figyelmeztetést, mute-ot vagy ban-t vonhat maga után.**`
      )
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Setup progress embed
  static setupProgress(step, total, message) {
    const progress = Math.floor((step / total) * 10);
    const progressBar = '█'.repeat(progress) + '░'.repeat(10 - progress);
    
    return new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.LOADING} WildArk Server Setup`)
      .setDescription(
        `**Telepítés folyamatban...**\n\n` +
        `${progressBar} ${Math.floor((step / total) * 100)}%\n\n` +
        `${message}`
      )
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }
}

export default WildArkEmbed;
