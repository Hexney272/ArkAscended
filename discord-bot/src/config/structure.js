/**
 * WildArk Discord Server Structure
 * English-only, single server (Ragnarok PvE x50)
 * One "Primal Descended" section (all mods run on the same server)
 */

export const SERVER_STRUCTURE = {
  roles: [
    { name: '👑 Founder', color: 0xFFD700, permissions: ['Administrator'], hoist: true },
    { name: '🔴 Admin', color: 0xFF0000, permissions: ['Administrator'], hoist: true },
    { name: '🟠 Moderator', color: 0xFFA500, permissions: ['KickMembers', 'BanMembers', 'ManageMessages', 'ModerateMembers'], hoist: true },
    { name: '🟡 Helper', color: 0xFFFF00, permissions: ['ManageMessages', 'ModerateMembers'], hoist: true },
    { name: '💜 VIP', color: 0x9333EA, permissions: [], hoist: true },
    { name: '🔵 Active', color: 0x3B82F6, permissions: [], hoist: true },
    { name: '⚪ Member', color: 0x6B7280, permissions: [], hoist: false },
    { name: '🔔 Notifications', color: 0x8B5CF6, permissions: [], hoist: false },
  ],

  categories: [
    {
      name: '📜 INFORMATION',
      channels: [
        { name: '👋-welcome', type: 'text', topic: 'Welcome messages', readOnly: true },
        { name: '📜-rules', type: 'text', topic: 'Server rules', readOnly: true },
        { name: '📢-announcements', type: 'text', topic: 'News and updates', readOnly: true },
        { name: '🎭-pick-roles', type: 'text', topic: 'React to get your roles', readOnly: true },
      ]
    },
    {
      name: '💬 COMMUNITY',
      channels: [
        { name: '💬-general', type: 'text', topic: 'General chat' },
        { name: '🎮-game-talk', type: 'text', topic: 'ARK gameplay discussion' },
        { name: '📸-media', type: 'text', topic: 'Screenshots and videos' },
        { name: '🤣-memes', type: 'text', topic: 'Memes and fun' },
        { name: '💡-suggestions', type: 'text', topic: 'Suggest ideas for the server' },
      ]
    },
    {
      name: '🦖 PRIMAL DESCENDED',
      channels: [
        { name: '📋-server-info', type: 'text', topic: 'Server settings, rates, mods list', readOnly: true },
        { name: '💬-server-chat', type: 'text', topic: 'In-game discussion' },
        { name: '🐲-boss-planning', type: 'text', topic: 'Organize boss fights' },
        { name: '🤝-tribe-recruitment', type: 'text', topic: 'Find a tribe or recruit members' },
        { name: '🛒-trading', type: 'text', topic: 'Buy, sell, trade items and dinos' },
      ]
    },
    {
      name: '📅 EVENTS',
      channels: [
        { name: '📅-event-calendar', type: 'text', topic: 'Upcoming events', readOnly: true },
        { name: '🎉-event-chat', type: 'text', topic: 'Event discussion' },
        { name: '🎁-giveaways', type: 'text', topic: 'Active giveaways', readOnly: true },
        { name: '🏆-results', type: 'text', topic: 'Event results and winners' },
      ]
    },
    {
      name: '📫 SUPPORT',
      channels: [
        { name: '📫-open-ticket', type: 'text', topic: 'Click the button to open a support ticket', readOnly: true },
        { name: '❓-faq', type: 'text', topic: 'Frequently asked questions', readOnly: true },
      ]
    },
    {
      name: '🎤 VOICE',
      channels: [
        { name: '🎤 General Voice', type: 'voice' },
        { name: '🎮 Gaming #1', type: 'voice', userLimit: 10 },
        { name: '🎮 Gaming #2', type: 'voice', userLimit: 10 },
        { name: '🐲 Boss Raid', type: 'voice', userLimit: 15 },
        { name: '🎧 AFK', type: 'voice' },
      ]
    },
    {
      name: '🔒 STAFF',
      staffOnly: true,
      channels: [
        { name: '👑-staff-chat', type: 'text', topic: 'Staff discussion' },
        { name: '📋-mod-logs', type: 'text', topic: 'Moderation logs', readOnly: true },
        { name: '🎫-ticket-logs', type: 'text', topic: 'Closed ticket transcripts', readOnly: true },
        { name: '🎤 Staff Voice', type: 'voice' },
      ]
    },
  ],
};

export const COLORS = {
  PRIMARY: 0x9333EA,
  SUCCESS: 0x10B981,
  ERROR: 0xEF4444,
  WARNING: 0xF59E0B,
  INFO: 0x3B82F6,
};

export const STAFF_ROLES = ['👑 Founder', '🔴 Admin', '🟠 Moderator', '🟡 Helper'];

export default SERVER_STRUCTURE;
