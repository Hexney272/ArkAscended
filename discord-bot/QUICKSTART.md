# ⚡ WildArk Discord Builder - Gyors Indítás

> **5 perc alatt működésre bírd a botot!**

## 🚀 Gyors Telepítés

### 1. Discord Bot létrehozása (2 perc)

1. Menj ide: https://discord.com/developers/applications
2. Kattints: **New Application**
3. Név: `WildArk Builder`
4. Menj a **Bot** fülre
5. Kattints: **Add Bot**
6. Kapcsold be az **Intent**-eket:
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
7. Másold ki a **Token**-t

### 2. Projekt telepítése (1 perc)

```bash
# 1. Függőségek telepítése
npm install

# 2. .env fájl létrehozása
cp .env.example .env
```

### 3. Konfiguráció (1 perc)

Szerkeszd a `.env` fájlt:

```env
DISCORD_TOKEN=ide_jön_a_token
GUILD_ID=ide_jön_a_szerver_id
CLIENT_ID=ide_jön_a_client_id
```

**Hol találod ezeket?**
- **Token**: Bot fül → Token
- **Guild ID**: Discord → Jobb klikk szerverre → Copy Server ID
- **Client ID**: General Information → Application ID

### 4. Bot meghívása (30 másodperc)

Nyisd meg ezt az URL-t (cseréld ki a `YOUR_CLIENT_ID`-t):

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

### 5. Indítás (30 másodperc)

```bash
npm start
```

## 🎯 Első Használat

### Szerver felépítése

```
/setup
```

**Ennyi!** A bot felépíti a teljes szervert 🎉

## 📚 További Információk

- 📖 [Teljes Telepítési Útmutató](INSTALL.md)
- 📜 [Parancsok Referencia](COMMANDS.md)
- 🦖 [Főoldal](README.md)

## ⚡ Egy Parancsban

```bash
npm install && cp .env.example .env && echo "⚠️ Szerkeszd a .env fájlt!" && npm start
```

## 🆘 Probléma?

1. Ellenőrizd a tokent
2. Ellenőrizd az Intent-eket
3. Várj 1-2 percet
4. Indítsd újra a botot

---

**🦖 Happy Building!**
