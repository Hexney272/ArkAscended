/**
 * WildArk Discord Server Structure
 * Teljes szerver felépítés definíciója
 */

export const SERVER_STRUCTURE = {
  // Rangok hierarchia szerint
  roles: [
    {
      name: '👑 Founder',
      color: 0xFFD700,
      permissions: ['Administrator'],
      hoist: true,
      position: 10
    },
    {
      name: '🔴 Admin',
      color: 0xFF0000,
      permissions: ['Administrator'],
      hoist: true,
      position: 9
    },
    {
      name: '🟠 Moderator',
      color: 0xFFA500,
      permissions: ['KickMembers', 'BanMembers', 'ManageMessages', 'ModerateMembers'],
      hoist: true,
      position: 8
    },
    {
      name: '🟡 Helper',
      color: 0xFFFF00,
      permissions: ['ManageMessages', 'ModerateMembers'],
      hoist: true,
      position: 7
    },
    {
      name: '💜 VIP',
      color: 0x9333EA,
      permissions: [],
      hoist: true,
      position: 6
    },
    {
      name: '🔵 Active Member',
      color: 0x3B82F6,
      permissions: [],
      hoist: true,
      position: 5
    },
    {
      name: '⚪ Member',
      color: 0x6B7280,
      permissions: [],
      hoist: false,
      position: 4
    },
    {
      name: '🤖 Bot',
      color: 0x9333EA,
      permissions: [],
      hoist: true,
      position: 3
    },
  ],

  // Kategóriák és csatornák
  categories: [
    {
      name: '📜 INFORMÁCIÓK',
      position: 0,
      channels: [
        {
          name: '👋-üdvözlés',
          type: 'text',
          topic: 'Üdvözlünk a WildArk közösségében! 🦖',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '📜-szabályzat',
          type: 'text',
          topic: 'Szerver szabályok és irányelvek',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '📢-hírek',
          type: 'text',
          topic: 'Fontos bejelentések és frissítések',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '🎭-rangok',
          type: 'text',
          topic: 'Válassz rangot a reakciókkal!',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '🌐-nyelv-language',
          type: 'text',
          topic: 'Válassz nyelvet / Choose your language',
          permissions: { everyone: { SendMessages: false } }
        },
      ]
    },
    {
      name: '💬 KÖZÖSSÉG',
      position: 1,
      channels: [
        {
          name: '💬-általános',
          type: 'text',
          topic: 'Általános beszélgetések'
        },
        {
          name: '🎮-játék-beszélgetés',
          type: 'text',
          topic: 'ARK Ascended játékról beszélgetés'
        },
        {
          name: '📸-média',
          type: 'text',
          topic: 'Képek, videók megosztása'
        },
        {
          name: '🤣-meme',
          type: 'text',
          topic: 'Mémek és vicces tartalmak'
        },
      ]
    },
    {
      name: '🦖 PRIMAL CHAOS',
      position: 2,
      channels: [
        {
          name: '📋-mod-info',
          type: 'text',
          topic: 'Primal Chaos mod információk és beállítások (ugyanazon a szerveren fut, mint a többi mod)'
        },
        {
          name: '💬-chaos-chat',
          type: 'text',
          topic: 'Primal Chaos játékosok chatelje'
        },
        {
          name: '🐲-boss-szervezés',
          type: 'text',
          topic: 'Boss harcok szervezése és koordináció'
        },
        {
          name: '🤝-tribe-recruitment',
          type: 'text',
          topic: 'Keress tribe-ot vagy tagokat!'
        },
      ]
    },
    {
      name: '🌊 PRIMAL DESCENDED',
      position: 3,
      channels: [
        {
          name: '📋-mod-info',
          type: 'text',
          topic: 'Primal Descended mod információk és beállítások (ugyanazon a szerveren fut, mint a többi mod)'
        },
        {
          name: '💬-descended-chat',
          type: 'text',
          topic: 'Primal Descended játékosok chatelje'
        },
        {
          name: '🐲-boss-szervezés',
          type: 'text',
          topic: 'Boss harcok szervezése és koordináció'
        },
        {
          name: '🤝-tribe-recruitment',
          type: 'text',
          topic: 'Keress tribe-ot vagy tagokat!'
        },
      ]
    },
    {
      name: '⚔️ TIDES OF FORTUNE',
      position: 4,
      channels: [
        {
          name: '📋-mod-info',
          type: 'text',
          topic: 'Tides of Fortune mod információk és beállítások'
        },
        {
          name: '💬-tides-chat',
          type: 'text',
          topic: 'Tides of Fortune játékosok chatelje'
        },
        {
          name: '🐲-boss-szervezés',
          type: 'text',
          topic: 'Boss harcok szervezése és koordináció'
        },
        {
          name: '🤝-tribe-recruitment',
          type: 'text',
          topic: 'Keress tribe-ot vagy tagokat!'
        },
      ]
    },
    {
      name: '🛒 MARKETPLACE',
      position: 5,
      channels: [
        {
          name: '💰-kereskedés',
          type: 'text',
          topic: 'Cserélj, adj el vagy vegyél itt!'
        },
        {
          name: '🎁-aukció',
          type: 'text',
          topic: 'Ritka tárgyak aukciója'
        },
        {
          name: '📦-kínálat',
          type: 'text',
          topic: 'Mit kínálsz eladásra?'
        },
        {
          name: '🔍-keresés',
          type: 'text',
          topic: 'Mit keresel?'
        },
      ]
    },
    {
      name: '📅 EVENTEK & BOSS',
      position: 6,
      channels: [
        {
          name: '📅-event-naptár',
          type: 'text',
          topic: 'Közelgő eventek és programok'
        },
        {
          name: '🎉-event-chat',
          type: 'text',
          topic: 'Event szervezés és beszélgetés'
        },
        {
          name: '🐲-boss-naptár',
          type: 'text',
          topic: 'Boss időpontok és koordináció'
        },
        {
          name: '🏆-eredmények',
          type: 'text',
          topic: 'Event és boss eredmények'
        },
      ]
    },
    {
      name: '📊 SZERVER STÁTUSZ',
      position: 7,
      channels: [
        {
          name: '📊-szerver-státusz',
          type: 'text',
          topic: 'Élő szerver státusz - online/offline, játékosszám',
          permissions: { everyone: { SendMessages: false } }
        },
      ]
    },
    {
      name: '📫 SUPPORT',
      position: 8,
      channels: [
        {
          name: '📫-ticket-központ',
          type: 'text',
          topic: 'Nyiss ticketet itt! Kattints a 🎫 reakcióra',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '❓-gyik',
          type: 'text',
          topic: 'Gyakran Ismételt Kérdések',
          permissions: { everyone: { SendMessages: false } }
        },
      ]
    },
    {
      name: '🎤 VOICE CHANNELS',
      position: 9,
      channels: [
        {
          name: '🎤 Általános Voice',
          type: 'voice',
          userLimit: 0
        },
        {
          name: '🎮 Gaming #1',
          type: 'voice',
          userLimit: 10
        },
        {
          name: '🎮 Gaming #2',
          type: 'voice',
          userLimit: 10
        },
        {
          name: '🐲 Boss Raid',
          type: 'voice',
          userLimit: 15
        },
        {
          name: '🤝 Tribe Voice',
          type: 'voice',
          userLimit: 10
        },
        {
          name: '🎧 AFK',
          type: 'voice',
          userLimit: 0
        },
      ]
    },
    {
      name: '🔒 STAFF',
      position: 10,
      channels: [
        {
          name: '👑-admin-chat',
          type: 'text',
          topic: 'Admin beszélgetés',
          permissions: { 
            everyone: { ViewChannel: false },
            staff: { ViewChannel: true }
          }
        },
        {
          name: '📋-staff-logs',
          type: 'text',
          topic: 'Moderációs logok',
          permissions: { 
            everyone: { ViewChannel: false },
            staff: { ViewChannel: true, SendMessages: false }
          }
        },
        {
          name: '🎫-ticket-logs',
          type: 'text',
          topic: 'Ticket rendszer logok',
          permissions: { 
            everyone: { ViewChannel: false },
            staff: { ViewChannel: true, SendMessages: false }
          }
        },
        {
          name: '🎤 Staff Voice',
          type: 'voice',
          permissions: { 
            everyone: { ViewChannel: false },
            staff: { ViewChannel: true }
          }
        },
      ]
    },
  ],
};

export default SERVER_STRUCTURE;
