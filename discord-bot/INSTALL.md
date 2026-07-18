# 🚀 WildArk Discord Builder - Telepítési Útmutató

## 📋 Előfeltételek

1. **Node.js 18 vagy újabb**
   ```bash
   node --version
   # v18.0.0 vagy újabb kell
   ```

2. **Discord Bot létrehozása**
   - Menj a [Discord Developer Portal](https://discord.com/developers/applications)-ra
   - Kattints a "New Application" gombra
   - Add meg a bot nevét: "WildArk Builder"
   - Menj a "Bot" fülre
   - Kattints a "Add Bot" gombra
   - **FONTOS**: Kapcsold be ezeket a Intent-eket:
     - ✅ Presence Intent
     - ✅ Server Members Intent
     - ✅ Message Content Intent

3. **Bot Token mentése**
   - A "Bot" fülön kattints a "Reset Token" gombra
   - Másold ki a tokent (később kell!)

## 📦 Telepítés Lépésről Lépésre

### 1. Projekt letöltése

```bash
# Clone repository
git clone https://github.com/your-repo/wildark-discord-builder.git

# Belépés a mappába
cd wildark-discord-builder
```

### 2. Függőségek telepítése

```bash
npm install
```

Telepített csomagok:
- `discord.js` - Discord bot könyvtár
- `dotenv` - Környezeti változók kezelése

### 3. Környezeti változók beállítása

```bash
# .env fájl létrehozása
cp .env.example .env
```

Szerkeszd a `.env` fájlt:

```env
# Discord Bot Token
DISCORD_TOKEN=your_bot_token_here

# Guild ID (Szerver ID)
GUILD_ID=your_server_id_here

# Client ID (Application ID)
CLIENT_ID=your_client_id_here

# Admin Role
ADMIN_ROLE_NAME=Founder
```

**Hogyan szerzem meg ezeket?**

1. **Bot Token**: Discord Developer Portal → Bot → Token
2. **Guild ID**: Discord → Jobb klikk a szerverre → Copy Server ID
3. **Client ID**: Discord Developer Portal → General Information → Application ID

> ⚠️ **Fontos**: A Discord-ban kapcsold be a Developer Mode-ot: 
> Settings → Advanced → Developer Mode

### 4. Bot meghívása a szerverre

Használd ezt az URL-t (cseréld ki a `YOUR_CLIENT_ID`-t):

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

**Jogosultságok**:
- ✅ Administrator (8) - A bot teljes hozzáférést kap

> 💡 **Tipp**: Hozz létre egy "WildArk Builder" rangot a botnak és helyezd a legfelső pozícióba (kivéve a tulajdonosét).

### 5. Bot indítása

```bash
# Indítás
npm start

# Vagy development módban (auto-restart)
npm run dev
```

Ha minden jól megy, látnod kell:

```
[BOT] 🦖 WildArk Discord Builder elindult!
[SUCCESS] Bejelentkezve mint: WildArk Builder#1234
[INFO] Szerverek száma: 1
[SUCCESS] 3 slash command regisztrálva!
```

## 🎮 Használat

### Szerver felépítése

1. A Discord szerveren írd be:
   ```
   /setup
   ```

2. A bot automatikusan létrehozza:
   - ✅ Összes rangot (Founder, Admin, Moderator, stb.)
   - ✅ Összes kategóriát (Információk, Közösség, stb.)
   - ✅ Összes csatornát
   - ✅ Jogosultságokat
   - ✅ Ticket rendszert
   - ✅ Reaction Roles-t
   - ✅ Welcome rendszert
   - ✅ AutoMod-ot

3. **Kész!** A szerver teljesen felépült 🎉

### Parancsok

| Parancs | Leírás | Jogosultság |
|---------|--------|-------------|
| `/setup` | Teljes szerver felépítése | Admin |
| `/ticket-close` | Ticket bezárása | Staff |
| `/ticket-add @user` | User hozzáadása tickethez | Staff |
| `/purge <szám>` | Üzenetek törlése | Moderator |
| `/automod` | AutoMod státusz | Admin |
| `/serverinfo` | Szerver információk | Mindenki |

## 🔧 Testreszabás

### Színek módosítása

Szerkeszd: `src/config/colors.js`

```javascript
export const COLORS = {
  PRIMARY: 0x9333EA,    // WildArk lila
  SECONDARY: 0x000000,  // Fekete
  // ... stb
};
```

### Csatornák módosítása

Szerkeszd: `src/config/structure.js`

```javascript
categories: [
  {
    name: '📜 INFORMÁCIÓK',
    position: 0,
    channels: [
      { name: '👋-üdvözlés', type: 'text', ... },
      // Add hozzá a saját csatornáidat
    ]
  },
  // ...
]
```

### AutoMod beállítások

Szerkeszd: `src/modules/autoMod.js`

```javascript
const AUTOMOD_CONFIG = {
  spam: {
    enabled: true,
    messageLimit: 5,      // Módosítható
    timeWindow: 5000,     // Módosítható
  },
  // ...
};
```

## ❓ Gyakori Problémák

### Bot nem válaszol

**Probléma**: A bot online, de nem reagál parancsokra.

**Megoldás**:
1. Ellenőrizd a tokent a `.env` fájlban
2. Ellenőrizd a Guild ID-t és Client ID-t
3. Várj 1-2 percet (Discord cache)
4. Indítsd újra a botot: `npm start`

### "Missing Permissions" hiba

**Probléma**: A bot nem tudja létrehozni a csatornákat/rangokat.

**Megoldás**:
1. Ellenőrizd, hogy a bot Administrator jogosultsággal rendelkezik
2. A bot rangja legyen a legfelső pozícióban
3. Ellenőrizd a 2FA beállításokat (ha van)

### Parancsok nem jelennek meg

**Probléma**: A slash commands nem látszanak.

**Megoldás**:
1. Várj 1-2 percet (Discord cache)
2. Lépj ki és vissza a Discord-ból
3. Ellenőrizd a Client ID-t
4. Indítsd újra a botot

### "Intents Error"

**Probléma**: `Error: Used disallowed intents`

**Megoldás**:
1. Discord Developer Portal → Bot
2. Kapcsold be az Intent-eket:
   - Presence Intent
   - Server Members Intent
   - Message Content Intent
3. Mentés
4. Bot újraindítása

## 🔒 Biztonsági Tippek

1. **Soha ne commitolj token-t!**
   - A `.env` fájl a `.gitignore`-ban van
   - Ne oszd meg senkivel a tokent

2. **Token lecserélése**
   - Ha véletlenül nyilvánossá vált: azonnal cseréld le
   - Discord Developer Portal → Bot → Reset Token

3. **Jogosultságok**
   - Csak megbízható embereknek adj Admin rangot
   - A bot tokent tartsd biztonságban

## 📞 Support

- **Discord**: [WildArk Discord](https://discord.gg/wildark)
- **GitHub Issues**: [Report Bug](https://github.com/your-repo/issues)
- **Email**: support@wildark.hu

## 🎉 Sikeres Telepítés!

Ha mindent követtél, a WildArk Discord Builder működik! 

Következő lépések:
1. Tesztelj minden funkciót
2. Testreszabás (színek, csatornák)
3. Invite membereket
4. Élvezd! 🦖

---

**Készítette**: WildArk Development Team  
**Verzió**: 1.0.0  
**Utolsó frissítés**: 2026-07-18
