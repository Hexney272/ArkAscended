# 🚀 WildArk Discord Builder - GYORS INDÍTÁS

> **Csak futtasd le a script-et és add meg a tokeneket!**

---

## 📋 **Automatikus Telepítő Script-ek**

Két verziót készítettem:
- 🐧 **Linux/Mac**: `setup.sh`
- 🪟 **Windows**: `setup.bat`

---

## 🐧 **LINUX / MAC Használat**

### 1️⃣ Telepítés

```bash
# Navigálj a projekt mappába
cd wildark-discord-builder

# Futtasd a telepítő scriptet
./setup.sh
```

Ha permission denied hibát kapsz:
```bash
chmod +x setup.sh
./setup.sh
```

### 2️⃣ Indítás (Későbbi használat)

```bash
# Egyszerű indítás
./start.sh

# Vagy
npm start
```

---

## 🪟 **WINDOWS Használat**

### 1️⃣ Telepítés

1. Nyisd meg a **Command Prompt**-ot vagy **PowerShell**-t
2. Navigálj a projekt mappába:
   ```cmd
   cd wildark-discord-builder
   ```
3. Futtasd a telepítő scriptet:
   ```cmd
   setup.bat
   ```

**VAGY**

Duplaklikk a `setup.bat` fájlra a Windows Explorerben!

### 2️⃣ Indítás (Későbbi használat)

```cmd
start.bat
```

**VAGY**

Duplaklikk a `start.bat` fájlra!

---

## 📝 **Mit Csinál a Telepítő Script?**

### Automatikusan:

1. ✅ **Ellenőrzi** Node.js és NPM telepítését
2. ✅ **Telepíti** a függőségeket (`npm install`)
3. ✅ **Bekéri** a Discord token-eket (interaktívan)
4. ✅ **Létrehozza** a `.env` konfigurációs fájlt
5. ✅ **Generál** egy bot meghívó linket
6. ✅ **Megnyitja** a linket böngészőben (Windows)
7. ✅ **Opcionálisan** elindítja a botot

### Mit kell csak neked csinálni:

1. 🔑 **Discord Bot Token** beszerzése
2. 🆔 **Client ID** beszerzése
3. 🏰 **Guild ID** (szerver ID) beszerzése
4. ✅ **Bot meghívása** a szerverre

---

## 🔑 **Discord Token-ek Beszerzése**

### **Step-by-Step Útmutató:**

#### 1. **Discord Developer Portal**

Menj ide: https://discord.com/developers/applications

#### 2. **Alkalmazás Létrehozása**

- Kattints: **"New Application"**
- Név: `WildArk Builder` (vagy amit szeretnél)
- Kattints: **"Create"**

#### 3. **Bot Létrehozása**

- Bal menü: **"Bot"** fül
- Kattints: **"Add Bot"** → **"Yes, do it!"**

#### 4. **Intent-ek Bekapcsolása** ⚠️ **FONTOS!**

Görgess le a Bot fülön és kapcsold BE mind a hármat:

- ✅ **Presence Intent**
- ✅ **Server Members Intent**
- ✅ **Message Content Intent**

Kattints: **"Save Changes"**

#### 5. **Bot Token Másolása**

- Kattints: **"Reset Token"**
- Erősítsd meg
- **Másold ki a tokent** (később már nem láthatod!)

⚠️ **NE oszd meg senkivel a tokent!**

#### 6. **Client ID Másolása**

- Bal menü: **"General Information"** fül
- **Application ID** alatt kattints a **Copy** gombra

#### 7. **Guild ID (Szerver ID) Másolása**

- Menj **Discord**-ba
- **Settings** → **Advanced** → Kapcsold BE: **Developer Mode**
- **Jobb klikk** a szerveredre (bal oldali sáv)
- Kattints: **"Copy Server ID"**

---

## 🎯 **Teljes Folyamat Lépésről Lépésre**

### **Linux/Mac:**

```bash
# 1. Projekt mappába lépés
cd wildark-discord-builder

# 2. Telepítő futtatása
./setup.sh

# A script végigvezet minden lépésen!
# Csak add meg a token-eket amikor kéri.

# 3. Discord-on használd
# /setup
```

### **Windows:**

```cmd
REM 1. Projekt mappába lépés
cd wildark-discord-builder

REM 2. Telepítő futtatása (duplaklikk vagy parancssor)
setup.bat

REM A script végigvezet minden lépésen!
REM Csak add meg a token-eket amikor kéri.

REM 3. Discord-on használd
REM /setup
```

---

## 🎮 **Bot Használata Discord-on**

### 1️⃣ **Várj 1-2 percet**

A slash commands regisztrációja időbe telik.

### 2️⃣ **Használd a /setup parancsot**

```
/setup
```

### 3️⃣ **Kész!**

A bot automatikusan felépíti:
- ✅ 8 rangot
- ✅ 10 kategóriát
- ✅ 40+ csatornát
- ✅ Ticket rendszert
- ✅ Reaction Roles-t
- ✅ Welcome rendszert
- ✅ AutoMod-ot

**Időtartam**: ~30-60 másodperc

---

## 📂 **Fájlok Magyarázata**

| Fájl | Mit csinál? |
|------|-------------|
| `setup.sh` | Linux/Mac telepítő script |
| `setup.bat` | Windows telepítő script |
| `start.sh` | Linux/Mac gyors indító |
| `start.bat` | Windows gyors indító |
| `.env` | Konfiguráció (auto-generált) |
| `package.json` | NPM dependencies |

---

## 🔧 **Későbbi Indítás**

Ha már egyszer telepítetted:

### Linux/Mac:
```bash
./start.sh
```

### Windows:
```cmd
start.bat
```

### Vagy mindkettő:
```bash
npm start
```

---

## 🐛 **Gyakori Hibák**

### **"Permission denied" (Linux/Mac)**

```bash
chmod +x setup.sh start.sh
./setup.sh
```

### **"Node.js nincs telepítve"**

Telepítsd innen: https://nodejs.org/

### **"Invalid Token"**

1. Ellenőrizd a tokent a `.env` fájlban
2. Generálj új tokent: Developer Portal → Bot → Reset Token
3. Futtasd újra a `setup.sh`-t

### **"Missing Intents"**

1. Discord Developer Portal → Bot
2. Kapcsold BE mind a 3 Intent-et
3. Save Changes
4. Indítsd újra a botot

### **Parancsok nem jelennek meg**

1. Várj 1-2 percet
2. Lépj ki és vissza Discord-ból
3. Ellenőrizd a CLIENT_ID-t és GUILD_ID-t

---

## 💡 **Hasznos Parancsok**

```bash
# Telepítés
./setup.sh           # (Linux/Mac)
setup.bat            # (Windows)

# Indítás
./start.sh           # (Linux/Mac)
start.bat            # (Windows)
npm start            # (Mindkettő)

# Development mód (auto-restart)
npm run dev

# Függőségek újratelepítése
npm install

# .env szerkesztése
nano .env            # (Linux/Mac)
notepad .env         # (Windows)
```

---

## 📚 **További Dokumentáció**

- 📖 **START_HERE.md** - Részletes kezdőlépések
- ⚡ **QUICKSTART.md** - 5 perces gyors start
- 🔧 **INSTALL.md** - Manuális telepítés
- 📜 **COMMANDS.md** - Összes parancs
- 📊 **PROJECT_SUMMARY.md** - Projekt áttekintés

---

## 🎉 **Összefoglalás**

### **3 Egyszerű Lépés:**

1. **Futtasd** `setup.sh` (Linux/Mac) vagy `setup.bat` (Windows)
2. **Add meg** a Discord token-eket
3. **Használd** `/setup` Discord-on

### **Ennyi!** 🦖💜

---

## 📞 **Segítség**

Ha elakadtál:

1. Nézd meg a **INSTALL.md**-t (Gyakori Hibák szekció)
2. Ellenőrizd, hogy minden token helyes-e a `.env`-ben
3. Próbáld újrafuttatni a `setup.sh`-t

---

**🚀 Happy Building! 🦖💜**
