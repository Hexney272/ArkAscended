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

  // Welcome embed
  static welcome(member) {
    return new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.WELCOME} Üdvözlünk a WildArk közösségében!`)
      .setDescription(
        `Szia ${member}! 🦖\n\n` +
        `Köszönjük, hogy csatlakoztál hozzánk!\n\n` +
        `🌐 Elsőként válassz nyelvet a #🌐-nyelv-language csatornában\n` +
        `📜 Olvasd el a szabályzatot\n` +
        `🎭 Válassz rangot magadnak\n` +
        `💬 Mutatkozz be az általános csatornában\n\n` +
        `Jó játékot kívánunk! 🎮\n\n` +
        `─────────────────────\n` +
        `Hi ${member}! Please pick a language in #🌐-nyelv-language ` +
        `so the bot can talk to you in English or Hungarian.`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Ticket embed
  static ticket() {
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

  // Reaction Roles embed
  static reactionRoles() {
    return new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.VIP} Válassz Rangot!`)
      .setDescription(
        `Kattints a reakciókra, hogy rangot kapj!\n\n` +
        `🦖 **Primal Chaos** - Chaos szerver játékos\n` +
        `🌊 **Primal Descended** - Descended szerver játékos\n` +
        `⚔️ **Tides of Fortune** - Tides szerver játékos\n\n` +
        `🔔 **Értesítések** - Event és boss értesítések\n` +
        `📢 **Hírek** - Fontos hírek értesítései\n\n` +
        `💜 **A rangok automatikusan hozzáadódnak!**`
      )
      .setTimestamp()
      .setFooter({ text: 'WildArk Discord Builder' });
  }

  // Rules embed
  static rules() {
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
