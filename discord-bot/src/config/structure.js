/**
 * WildArk Discord Server Structure
 * Teljes szerver felépítés definíciója
 *
 * NYELVI KAPU RENDSZER (2026-07): Új tag belépéskor CSAK a
 * "🌐 KEZDÉS / START HERE" kategóriát látja (nyelvválasztó).
 * Miután reagált 🇭🇺 vagy 🇬🇧-vel, megkapja a megfelelő nyelvi
 * rangot, és onnantól CSAK az adott nyelv kategóriái válnak
 * láthatóvá - a másik nyelv rejtve marad.
 *
 * Minden kategóriának van egy `visibility` mezője:
 * - 'gateway': mindenki látja (@everyone), ez a belépési pont
 * - 'hu' / 'en': csak a megfelelő nyelvi rang + staff látja
 * - 'shared': bárki látja, akinek VAN nyelvi rangja (hu VAGY en)
 * - 'staff': csak staff rangok látják (Founder/Admin/Mod/Helper)
 *
 * TUDATOS DÖNTÉS: a Hangcsatornák és a Szerver Státusz kategória
 * NEM duplikált nyelvenként (nincs bennük fordítható szöveg /
 * élő, egyszeri panel), ezért 'shared' - bárki látja, aki már
 * választott valamelyik nyelvet.
 */

const HU_ROLE_NAME = '🇭🇺 Magyar';
const EN_ROLE_NAME = '🇬🇧 English';

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

  // Kategóriák és csatornák - lásd a fájl elején a visibility magyarázatot
  categories: [
    // ================================================================
    // GATEWAY - Mindenki ezt látja belépéskor, csak ez az egy
    // ================================================================
    {
      name: '🌐 KEZDÉS / START HERE',
      position: 0,
      visibility: 'gateway',
      channels: [
        {
          name: '👋-welcome',
          type: 'text',
          topic: 'Belépési üdvözlés / Join announcements',
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

    // ================================================================
    // MAGYAR (🇭🇺) TARTALOM
    // ================================================================
    {
      name: '📜 INFORMÁCIÓK 🇭🇺',
      position: 1,
      visibility: 'hu',
      channels: [
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
      ]
    },
    {
      name: '💬 KÖZÖSSÉG 🇭🇺',
      position: 2,
      visibility: 'hu',
      channels: [
        { name: '💬-általános', type: 'text', topic: 'Általános beszélgetések' },
        { name: '🎮-játék-beszélgetés', type: 'text', topic: 'ARK Ascended játékról beszélgetés' },
        { name: '📸-média', type: 'text', topic: 'Képek, videók megosztása' },
        { name: '🤣-meme', type: 'text', topic: 'Mémek és vicces tartalmak' },
      ]
    },
    {
      name: '🦖 PRIMAL CHAOS 🇭🇺',
      position: 3,
      visibility: 'hu',
      channels: [
        { name: '📋-mod-info', type: 'text', topic: 'Primal Chaos mod információk és beállítások' },
        { name: '💬-chaos-chat', type: 'text', topic: 'Primal Chaos játékosok chatelje' },
        { name: '🐲-boss-szervezés', type: 'text', topic: 'Boss harcok szervezése és koordináció' },
        { name: '🤝-tribe-recruitment', type: 'text', topic: 'Keress tribe-ot vagy tagokat!' },
      ]
    },
    {
      name: '🌊 PRIMAL DESCENDED 🇭🇺',
      position: 4,
      visibility: 'hu',
      channels: [
        { name: '📋-mod-info', type: 'text', topic: 'Primal Descended mod információk és beállítások' },
        { name: '💬-descended-chat', type: 'text', topic: 'Primal Descended játékosok chatelje' },
        { name: '🐲-boss-szervezés', type: 'text', topic: 'Boss harcok szervezése és koordináció' },
        { name: '🤝-tribe-recruitment', type: 'text', topic: 'Keress tribe-ot vagy tagokat!' },
      ]
    },
    {
      name: '⚔️ TIDES OF FORTUNE 🇭🇺',
      position: 5,
      visibility: 'hu',
      channels: [
        { name: '📋-mod-info', type: 'text', topic: 'Tides of Fortune mod információk és beállítások' },
        { name: '💬-tides-chat', type: 'text', topic: 'Tides of Fortune játékosok chatelje' },
        { name: '🐲-boss-szervezés', type: 'text', topic: 'Boss harcok szervezése és koordináció' },
        { name: '🤝-tribe-recruitment', type: 'text', topic: 'Keress tribe-ot vagy tagokat!' },
      ]
    },
    {
      name: '🛒 MARKETPLACE 🇭🇺',
      position: 6,
      visibility: 'hu',
      channels: [
        { name: '💰-kereskedés', type: 'text', topic: 'Cserélj, adj el vagy vegyél itt!' },
        { name: '🎁-aukció', type: 'text', topic: 'Ritka tárgyak aukciója' },
        { name: '📦-kínálat', type: 'text', topic: 'Mit kínálsz eladásra?' },
        { name: '🔍-keresés', type: 'text', topic: 'Mit keresel?' },
      ]
    },
    {
      name: '📅 EVENTEK & BOSS 🇭🇺',
      position: 7,
      visibility: 'hu',
      channels: [
        { name: '📅-event-naptár', type: 'text', topic: 'Közelgő eventek és programok' },
        { name: '🎉-event-chat', type: 'text', topic: 'Event szervezés és beszélgetés' },
        { name: '🐲-boss-naptár', type: 'text', topic: 'Boss időpontok és koordináció' },
        { name: '🏆-eredmények', type: 'text', topic: 'Event és boss eredmények' },
      ]
    },
    {
      name: '📫 SUPPORT 🇭🇺',
      position: 8,
      visibility: 'hu',
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

    // ================================================================
    // ENGLISH (🇬🇧) CONTENT
    // ================================================================
    {
      name: '📜 INFORMATION 🇬🇧',
      position: 9,
      visibility: 'en',
      channels: [
        {
          name: '📜-rules',
          type: 'text',
          topic: 'Server rules and guidelines',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '📢-news',
          type: 'text',
          topic: 'Important announcements and updates',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '🎭-roles',
          type: 'text',
          topic: 'Pick a role with reactions!',
          permissions: { everyone: { SendMessages: false } }
        },
      ]
    },
    {
      name: '💬 COMMUNITY 🇬🇧',
      position: 10,
      visibility: 'en',
      channels: [
        { name: '💬-general', type: 'text', topic: 'General discussions' },
        { name: '🎮-game-chat', type: 'text', topic: 'ARK Ascended game talk' },
        { name: '📸-media', type: 'text', topic: 'Share pictures and videos' },
        { name: '🤣-memes', type: 'text', topic: 'Memes and funny content' },
      ]
    },
    {
      name: '🦖 PRIMAL CHAOS 🇬🇧',
      position: 11,
      visibility: 'en',
      channels: [
        { name: '📋-mod-info', type: 'text', topic: 'Primal Chaos mod info and settings' },
        { name: '💬-chaos-chat', type: 'text', topic: 'Chat for Primal Chaos players' },
        { name: '🐲-boss-planning', type: 'text', topic: 'Boss fight planning and coordination' },
        { name: '🤝-tribe-recruitment', type: 'text', topic: 'Looking for a tribe or members!' },
      ]
    },
    {
      name: '🌊 PRIMAL DESCENDED 🇬🇧',
      position: 12,
      visibility: 'en',
      channels: [
        { name: '📋-mod-info', type: 'text', topic: 'Primal Descended mod info and settings' },
        { name: '💬-descended-chat', type: 'text', topic: 'Chat for Primal Descended players' },
        { name: '🐲-boss-planning', type: 'text', topic: 'Boss fight planning and coordination' },
        { name: '🤝-tribe-recruitment', type: 'text', topic: 'Looking for a tribe or members!' },
      ]
    },
    {
      name: '⚔️ TIDES OF FORTUNE 🇬🇧',
      position: 13,
      visibility: 'en',
      channels: [
        { name: '📋-mod-info', type: 'text', topic: 'Tides of Fortune mod info and settings' },
        { name: '💬-tides-chat', type: 'text', topic: 'Chat for Tides of Fortune players' },
        { name: '🐲-boss-planning', type: 'text', topic: 'Boss fight planning and coordination' },
        { name: '🤝-tribe-recruitment', type: 'text', topic: 'Looking for a tribe or members!' },
      ]
    },
    {
      name: '🛒 MARKETPLACE 🇬🇧',
      position: 14,
      visibility: 'en',
      channels: [
        { name: '💰-trading', type: 'text', topic: 'Trade, sell or buy here!' },
        { name: '🎁-auction', type: 'text', topic: 'Rare item auctions' },
        { name: '📦-selling', type: 'text', topic: 'What are you offering?' },
        { name: '🔍-looking-for', type: 'text', topic: 'What are you looking for?' },
      ]
    },
    {
      name: '📅 EVENTS & BOSS 🇬🇧',
      position: 15,
      visibility: 'en',
      channels: [
        { name: '📅-event-calendar', type: 'text', topic: 'Upcoming events and schedule' },
        { name: '🎉-event-chat', type: 'text', topic: 'Event planning and chat' },
        { name: '🐲-boss-calendar', type: 'text', topic: 'Boss timings and coordination' },
        { name: '🏆-results', type: 'text', topic: 'Event and boss results' },
      ]
    },
    {
      name: '📫 SUPPORT 🇬🇧',
      position: 16,
      visibility: 'en',
      channels: [
        {
          name: '📫-ticket-center',
          type: 'text',
          topic: 'Open a ticket here! React with 🎫',
          permissions: { everyone: { SendMessages: false } }
        },
        {
          name: '❓-faq',
          type: 'text',
          topic: 'Frequently Asked Questions',
          permissions: { everyone: { SendMessages: false } }
        },
      ]
    },

    // ================================================================
    // SHARED - Bárki látja, aki már választott nyelvet (hu VAGY en)
    // ================================================================
    {
      name: '📊 SZERVER STÁTUSZ / SERVER STATUS',
      position: 17,
      visibility: 'shared',
      channels: [
        {
          name: '📊-szerver-státusz',
          type: 'text',
          topic: 'Élő szerver státusz / Live server status',
          permissions: { everyone: { SendMessages: false } }
        },
      ]
    },
    {
      name: '🎤 VOICE CHANNELS',
      position: 18,
      visibility: 'shared',
      channels: [
        { name: '🎤 Általános Voice', type: 'voice', userLimit: 0 },
        { name: '🎮 Gaming #1', type: 'voice', userLimit: 10 },
        { name: '🎮 Gaming #2', type: 'voice', userLimit: 10 },
        { name: '🐲 Boss Raid', type: 'voice', userLimit: 15 },
        { name: '🤝 Tribe Voice', type: 'voice', userLimit: 10 },
        { name: '🎧 AFK', type: 'voice', userLimit: 0 },
      ]
    },

    // ================================================================
    // STAFF - Csak staff rangok (nyelvtől függetlenül)
    // ================================================================
    {
      name: '🔒 STAFF',
      position: 19,
      visibility: 'staff',
      channels: [
        {
          name: '👑-admin-chat',
          type: 'text',
          topic: 'Admin beszélgetés',
        },
        {
          name: '📋-staff-logs',
          type: 'text',
          topic: 'Moderációs logok',
          permissions: { staff: { SendMessages: false } }
        },
        {
          name: '🎫-ticket-logs',
          type: 'text',
          topic: 'Ticket rendszer logok',
          permissions: { staff: { SendMessages: false } }
        },
        {
          name: '🎤 Staff Voice',
          type: 'voice',
        },
      ]
    },
  ],
};

export { HU_ROLE_NAME, EN_ROLE_NAME };
export default SERVER_STRUCTURE;
