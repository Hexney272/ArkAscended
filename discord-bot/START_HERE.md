# 🚀 START HERE - WildArk Discord Builder

> **Kezdd itt! Ez a fájl végigvezet a bot használatán.**

## ✨ Mi ez a projekt?

A **WildArk Discord Builder** egy teljes Discord szerver builder bot, ami **egy paranccsal** felépíti a teljes WildArk közösségi szervert.

### 🎯 Főbb Funkciók

✅ **Egy parancs telepítés** - `/setup` és kész!  
✅ **WildArk arculat** - Fekete-lila design  
✅ **8 rang** - Founder-től Member-ig  
✅ **10 kategória** - Összes szükséges szekció  
✅ **40+ csatorna** - Text és voice  
✅ **Ticket rendszer** - Teljes ügyfélszolgálat  
✅ **Reaction Roles** - Automatikus rangok  
✅ **AutoMod** - Spam, link, caps védelem  
✅ **Welcome rendszer** - Automatikus üdvözlés  

---

## 📚 Dokumentáció Gyorsnavigáció

| Fájl | Tartalom | Időigény |
|------|----------|----------|
| **[README.md](README.md)** | Projekt áttekintés | 5 perc |
| **[QUICKSTART.md](QUICKSTART.md)** | Gyors indítás | 5 perc |
| **[INSTALL.md](INSTALL.md)** | Részletes telepítés | 15 perc |
| **[COMMANDS.md](COMMANDS.md)** | Parancsok referencia | 10 perc |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Közreműködés | 5 perc |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Teljes projekt összefoglaló | 10 perc |

---

## 🎯 3 Lépésben Működésre

### 1️⃣ Telepítés (5 perc)

```bash
# Függőségek telepítése
npm install

# .env fájl létrehozása
cp .env.example .env
```

### 2️⃣ Konfiguráció (2 perc)

Szerkeszd a `.env` fájlt:

```env
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_server_id_here
CLIENT_ID=your_client_id_here
```

Hol szerezd be:
- **Token**: [Discord Developer Portal](https://discord.com/developers/applications) → Bot → Token
- **Guild ID**: Discord → Jobb klikk szerverre → Copy Server ID
- **Client ID**: Developer Portal → General Information → Application ID

### 3️⃣ Indítás (1 perc)

```bash
# Bot indítása
npm start

# Ha látod ezt, működik:
# [BOT] 🦖 WildArk Discord Builder elindult!
```

---

## 🎮 Első Használat

### Discord Szerveren

```
/setup
```

**Ennyi!** A bot felépíti az egész szervert ~30 másodperc alatt.

---

## 📊 Mit Fog Létrehozni?

### Rangok (8 db)
- 👑 Founder (Arany)
- 🔴 Admin (Piros)
- 🟠 Moderator (Narancs)
- 🟡 Helper (Sárga)
- 💜 VIP (Lila)
- 🔵 Active Member (Kék)
- ⚪ Member (Szürke)
- 🤖 Bot (Lila)

### Kategóriák (10 db)
1. 📜 Információk
2. 💬 Közösség
3. 🦖 Primal Chaos
4. 🌊 Primal Descended
5. ⚔️ Tides of Fortune
6. 🛒 Marketplace
7. 📅 Eventek & Boss
8. 📫 Support
9. 🎤 Voice Channels
10. 🔒 Staff

### Csatornák (40+ db)
- Welcome, Rules, News
- General, Gaming, Media, Meme
- Szerver-specifikus chatök
- Boss szervezés, Tribe recruitment
- Marketplace csatornák
- Ticket rendszer
- Voice csatornák
- Staff csatornák és logok

### Automatikus Rendszerek
- ✅ Ticket rendszer (🎫 reakció)
- ✅ Reaction Roles (szerver rangok)
- ✅ Welcome üzenetek
- ✅ AutoMod (spam, link, caps)
- ✅ Staff logok

---

## 💡 Gyors Parancs Referencia

```bash
# Szerver építés
/setup

# Ticket kezelés
/ticket-close              # Ticket bezárása
/ticket-add @user          # User hozzáadása

# Moderálás
/purge count:50            # Üzenetek törlése
/automod                   # AutoMod státusz
/serverinfo                # Szerver info
```

---

## 🔥 Funkciók Áttekintés

### 🎫 Ticket Rendszer
1. User kattint 🎫 reakcióra a `📫-ticket-központ`-ban
2. Automatikusan létrejön privát csatorna
3. Staff értesítést kap
4. Close gomb vagy `/ticket-close` parancs

### 🎭 Reaction Roles
1. User megy a `🎭-rangok` csatornába
2. Kattint emoji reakcióra
3. Automatikusan megkapja a rangot
4. Reakció eltávolítás → rang elvétele

**Elérhető rangok**:
- 🦖 Primal Chaos
- 🌊 Primal Descended
- ⚔️ Tides of Fortune
- 🔔 Értesítések
- 📢 Hírek

### 🛡️ AutoMod
Automatikusan fut, védelem:
- Spam (5 msg / 5s → mute)
- Nem engedélyezett linkek
- CAPS spam (70%+ → törlés)
- Tiltott szavak
- Mention spam (5+ → mute)

**Staff tagok mentesek!**

### 👋 Welcome Rendszer
- Új member → welcome üzenet
- Automatikus `⚪ Member` rang
- Member count frissítése
- Goodbye üzenet távozáskor

---

## ⚠️ Fontos Tudnivalók

### 1. Bot Jogosultságok
- ✅ Administrator jogosultság szükséges
- ✅ Bot rangja legyen a legfelső pozícióban
- ✅ Intent-ek bekapcsolva (Developer Portal)

### 2. Setup Parancs
- 🔄 Csak egyszer futtasd
- 🔄 Ha újrafuttatod, frissíti a meglévőket
- ⏱️ ~30-60 másodperc

### 3. Testreszabás
- 🎨 Színek: `src/config/colors.js`
- 📂 Csatornák: `src/config/structure.js`
- 🛡️ AutoMod: `src/modules/autoMod.js`

---

## 🐛 Problémák?

### Bot nem válaszol
1. ✅ Ellenőrizd a tokent
2. ✅ Ellenőrizd az Intent-eket
3. ✅ Várj 1-2 percet
4. ✅ Indítsd újra: `npm start`

### Parancsok nem jelennek meg
1. ✅ Várj 1-2 percet (Discord cache)
2. ✅ Lépj ki és vissza Discord-ból
3. ✅ Ellenőrizd a Client ID-t

### "Missing Permissions"
1. ✅ Bot Administrator jogosultság
2. ✅ Bot rangja legfelül
3. ✅ 2FA beállítások

**Több segítség**: [INSTALL.md](INSTALL.md) → Gyakori Problémák

---

## 📂 Projekt Struktúra (Gyors)

```
wildark-discord-builder/
├── 📄 START_HERE.md         ← Te itt vagy!
├── 📄 README.md             ← Főoldal
├── 📄 QUICKSTART.md         ← 5 perc telepítés
├── 📄 INSTALL.md            ← Részletes útmutató
├── 📄 COMMANDS.md           ← Parancsok
├── 📄 package.json          ← Dependencies
├── 📄 .env.example          ← Config template
│
└── 📂 src/
    ├── index.js             ← Bot entry point
    ├── 📂 commands/         ← Slash parancsok
    ├── 📂 modules/          ← Funkció modulok
    ├── 📂 config/           ← Konfigok
    └── 📂 utils/            ← Segédfüggvények
```

---

## 🎓 Tanulási Útvonal

### Kezdő (5 perc)
1. Olvasd el ezt a fájlt ✅
2. Futtasd a [QUICKSTART.md](QUICKSTART.md)-t
3. Próbáld ki a `/setup` parancsot

### Haladó (30 perc)
1. Olvasd el [COMMANDS.md](COMMANDS.md)
2. Tesztelj minden funkciót
3. Nézd meg [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

### Expert (1 óra)
1. Olvasd el a kódot `src/`-ben
2. Testreszabás [CONTRIBUTING.md](CONTRIBUTING.md)
3. Új funkció fejlesztése

---

## 🎯 Következő Lépések

1. ✅ **Most**: Futtasd a `npm install` és `npm start` parancsokat
2. ✅ **5 perc**: Használd a `/setup` parancsot Discord-on
3. ✅ **10 perc**: Tesztelj minden funkciót
4. ✅ **30 perc**: Testreszabás (színek, csatornák)
5. ✅ **1 óra**: Ismerd meg a teljes projektet

---

## 📞 Segítség & Support

- 💬 **Discord**: discord.gg/wildark
- 📧 **Email**: support@wildark.hu
- 💻 **GitHub Issues**: github.com/your-repo/issues
- 📚 **Dokumentáció**: [INSTALL.md](INSTALL.md)

---

## 🏆 Készítők

**WildArk Development Team**

- 🦖 ARK Ascended szerverek
- 💜 Közösségi Discord építés
- 🚀 Bot fejlesztés

---

## 📝 License

MIT License - Használd szabadon!

Lásd: [LICENSE](LICENSE)

---

## 🎉 Köszönjük!

Köszönjük, hogy a WildArk Discord Builder-t választottad!

Ha tetszik a projekt:
- ⭐ Adj egy csillagot GitHub-on
- 🐛 Jelezz hibákat
- 💡 Javasolj új funkciókat
- 🤝 Járulj hozzá a kódhoz

**🦖 Happy Building! 💜**

---

*Utolsó frissítés: 2026-07-18*  
*Verzió: 1.0.0*
