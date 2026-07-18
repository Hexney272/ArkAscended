# 🦖 WildArk Discord Builder

> **Egy parancsra felépíti a teljes Discord szervert WildArk arculattal!**

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![Discord.js](https://img.shields.io/badge/discord.js-v14-5865F2)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)

## 🎯 Funkciók

- 🚀 **Egy parancs telepítés** - `/setup` paranccsal minden felépül
- 🎨 **WildArk arculat** - Fekete-lila design minden elemben
- 🦖 **Külön kategóriák**:
  - Primal Chaos
  - Primal Descended
  - Tides of Fortune
- 🎫 **Ticket rendszer** - Teljes ügyfélszolgálati rendszer
- 👑 **Ranghierarchia** - Founder → Member teljes struktúra
- 🔒 **Automatikus jogosultságok** - Minden rang megfelelő hozzáférést kap
- 🎤 **Hangcsatornák** - Közösségi és admin voice
- 📜 **Szabályzat csatornák** - Info és rules
- 🛒 **Marketplace** - Kereskedési csatornák
- 🤝 **Tribe Recruitment** - Tribe toborzás
- 📈 **Event rendszer** - Boss és event csatornák
- 📝 **Staff logok** - Moderációs naplózás
- 🎭 **Reaction Roles** - Reakció alapú rangok
- 🛡️ **Automoderáció** - Link, spam, caps védelme

## 📦 Telepítés

### 1. Követelmények

- Node.js 18 vagy újabb
- Discord Bot token ([Discord Developer Portal](https://discord.com/developers/applications))
- Bot jogosultságok: Administrator

### 2. Letöltés

```bash
git clone https://github.com/your-repo/wildark-discord-builder.git
cd wildark-discord-builder
```

### 3. Függőségek telepítése

```bash
npm install
```

### 4. Konfiguráció

Másold le a `.env.example` fájlt `.env` névre:

```bash
cp .env.example .env
```

Szerkeszd a `.env` fájlt és add meg:

```env
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_server_id
CLIENT_ID=your_application_id
```

### 5. Bot meghívása

Hívd meg a botot a szerveredre ezzel az URL-lel (helyettesítsd be a CLIENT_ID-t):

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

### 6. Indítás

```bash
npm start
```

## 🎮 Használat

### Szerver felépítése

1. A bot csatlakozása után használd a parancsot:
   ```
   /setup
   ```

2. A bot automatikusan létrehozza:
   - ✅ Összes rangot (Founder, Admin, Moderator, stb.)
   - ✅ Összes kategóriát
   - ✅ Összes csatornát
   - ✅ Jogosultságokat
   - ✅ Ticket rendszert
   - ✅ Welcome rendszert
   - ✅ Reaction roles-t

3. **Kész!** A szerver teljesen felépült.

## 📚 Modulok

### 🏗️ Core Modules

- **RoleBuilder** - Ranghierarchia építő
- **CategoryBuilder** - Kategória struktúra
- **ChannelBuilder** - Csatorna létrehozó
- **PermissionBuilder** - Jogosultság kezelő

### 🎨 Feature Modules

- **DesignSystem** - WildArk embedek és színek
- **WelcomeSystem** - Üdvözlő rendszer
- **ReactionRoles** - Reakció alapú rangok
- **TicketSystem** - Ticket kezelő
- **AutoMod** - Automatikus moderáció

## 🎨 WildArk Design

### Színpaletta

- **Primary (Lila)**: `#9333EA`
- **Secondary (Fekete)**: `#000000`
- **Accent (Világos lila)**: `#A855F7`

### Rangok és színek

| Rang | Szín | Emoji |
|------|------|-------|
| Founder | Arany | 👑 |
| Admin | Piros | 🔴 |
| Moderator | Narancssárga | 🟠 |
| Helper | Sárga | 🟡 |
| VIP | Lila | 💜 |
| Active Member | Kék | 🔵 |
| Member | Szürke | ⚪ |

## 🎫 Ticket Rendszer

A ticket rendszer automatikusan beállításra kerül:

- **Ticket panel** a `📫-support` csatornában
- Reakció: 🎫
- Automatikus kategória létrehozás
- Staff értesítések
- Transcript mentés záráskor

## 🤖 Parancsok

| Parancs | Leírás | Jogosultság |
|---------|--------|-------------|
| `/setup` | Teljes szerver felépítése | Admin |
| `/ticket create` | Új ticket nyitása | Everyone |
| `/ticket close` | Ticket bezárása | Staff |
| `/reactionrole setup` | Reaction role beállítása | Admin |
| `/automod config` | Automoderáció beállítása | Admin |

## 📁 Projekt Struktúra

```
wildark-discord-builder/
├── src/
│   ├── index.js                 # Fő entry point
│   ├── config/
│   │   ├── colors.js           # Színek és design
│   │   └── structure.js        # Szerver struktúra
│   ├── modules/
│   │   ├── roleBuilder.js      # Rang építő
│   │   ├── categoryBuilder.js  # Kategória építő
│   │   ├── channelBuilder.js   # Csatorna építő
│   │   ├── permissionBuilder.js # Jogosultság kezelő
│   │   ├── welcomeSystem.js    # Üdvözlő rendszer
│   │   ├── reactionRoles.js    # Reaction roles
│   │   ├── ticketSystem.js     # Ticket rendszer
│   │   └── autoMod.js          # Automoderáció
│   ├── commands/
│   │   ├── setup.js            # Setup parancs
│   │   ├── ticket.js           # Ticket parancsok
│   │   └── admin.js            # Admin parancsok
│   └── utils/
│       ├── embedBuilder.js     # Embed készítő
│       └── logger.js           # Logger
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Testreszabás

### Színek módosítása

Szerkeszd a `src/config/colors.js` fájlt.

### Csatornák módosítása

Szerkeszd a `src/config/structure.js` fájlt.

### Új modul hozzáadása

1. Hozz létre új fájlt a `src/modules/` mappában
2. Implementáld a modult
3. Importáld a `src/index.js`-be

## ⚠️ Gyakori Hibák

### Bot nem válaszol

- Ellenőrizd a token-t a `.env` fájlban
- Ellenőrizd, hogy a bot admin jogosultsággal rendelkezik

### Parancsok nem jelennek meg

- Várj 1-2 percet (Discord cache)
- Próbáld újraindítani a botot

### Jogosultság hibák

- Ellenőrizd, hogy a bot role-ja a legfelső pozícióban van
- Adj Administrator jogot a botnak

## 📝 Changelog

### v1.0.0 (2026-07-18)

- ✅ Alap bot struktúra
- ✅ Role Builder modul
- ✅ Category Builder modul
- ✅ Channel Builder modul
- ✅ Permission Builder modul
- ✅ WildArk design system
- ✅ Welcome system
- ✅ Reaction Roles
- ✅ Ticket System
- ✅ AutoMod modul
- ✅ Setup parancs

## 🤝 Közreműködés

Hibát találtál? Van ötleted? Nyiss egy Issue-t vagy Pull Request-et!

## 📄 Licenc

MIT License - Használd szabadon!

## 🔗 Linkek

- [Discord.js Dokumentáció](https://discord.js.org/)
- [WildArk Szerverek](https://wildark.hu)

## 💜 Készítette

**WildArk Development Team**

---

*Ha tetszik a projekt, adj egy ⭐ csillagot!*
