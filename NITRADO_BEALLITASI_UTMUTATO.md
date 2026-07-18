# 🎮 NITRADO SZERVER BEÁLLÍTÁSI ÚTMUTATÓ
## ARK: Survival Ascended PvE x50 Szerver

---

## ⚠️ MIÉRT NEM LÁTOM A SZERVERT JÁTÉKBAN?

### Leggyakoribb problémák:

1. **❌ Szerver nem indult el**: Nézd meg a Nitrado dashboard-on, hogy a szerver státusza "Running"
2. **❌ Modok nem települtek**: A modokat külön kell telepíteni a Nitrado webes felületén!
3. **❌ Rossz Session Name**: A játékban csak akkor jelenik meg, ha helyesen van beállítva
4. **❌ BattlEye filter problémák**: Némely mod BattlEye-t igényel vagy nem kompatibilis vele
5. **❌ Szerver régió problémák**: Válaszd ki a megfelelő régiót (EU ha Magyarországon vagy)

---

## 📝 LÉPÉSRŐL LÉPÉSRE TELEPÍTÉSI ÚTMUTATÓ

### 1️⃣ LÉPÉS: JSON IMPORT
1. Lépj be a **Nitrado webes felületére**: https://server.nitrado.net/
2. Válaszd ki a szervert
3. Menj a **"General" fülre**
4. Kattints az **"Import Settings"** gombra
5. Töltsd fel a **`nitrado_official_x50.json`** fájlt
6. Kattints a **"Save & Restart"** gombra

### 2️⃣ LÉPÉS: MODOK TELEPÍTÉSE
1. A Nitrado dashboard-on menj a **"Mods"** fülre
2. Keress rá a mod nevére a CurseForge-on
3. Telepítsd az alábbi modokat **PONTOSAN EBBEN A SORRENDBEN**:

```
940975 - GameServerApp.com Integration (Crossplay)
947033 - Seed Farm: Grow Everything
935408 - ASA-Bot Companion
950914 - Ark Primal Chaos
952367 - Ark Descended
1039294 - Cybers Structures QoL+ (Crossplay)
932714 - Pelayori's Cryo Storage (Crossplay!)
931762 - ARKomatic
951574 - Automated Ark
924900 - Utilities Plus
959740 - Crazy's Crazy Ascended Potions
939055 - Awesome Spyglass!
928621 - Upgrade Station
932975 - WBUI2
930494 - Awesome Teleporters!
936660 - Ultimate Tranqs
946694 - Better Rafts
928793 - Resonant's Shop Mod
1342708 - Spawn Blocker
980463 - MarniiMods Hairstyles
1122696 - Dino Painter
930442 - Klinger Additional Rustic Building
947733 - Dwarven Builders Custom Cosmetic
929334 - Awesome ARK Tools
936882 - Automated Dino Wipes
968618 - Lights Skins
931119 - New Dino Cloner
941450 - Super Cryo Storage
933099 - Alfa Oceanic Platforms
933447 - Ark Descended Structures
928597 - Inventory Backup Saver
1153016 - EOS ID Helper (CrossPlay)
NINCS ID - SmartTurrets
NINCS ID - Der Dino Finder
NINCS ID - FPS Boost Buttons (PauseMenu)
```

**⚠️ FONTOS:** Néhány mod ID hiányzik a listából (SmartTurrets, Der Dino Finder, FPS Boost Buttons).
Keresd meg ezeket a CurseForge-on és add hozzá manuálisan!

### 3️⃣ LÉPÉS: EXPERT MODE INI FÁJLOK
1. A Nitrado dashboard-on menj a **"Settings" → "Expert Mode"** fülre
2. Töltsd fel a **`GameUserSettings.ini`** fájlt
3. Töltsd fel a **`Game.ini`** fájlt
4. Kattints a **"Save & Restart"** gombra

### 4️⃣ LÉPÉS: SESSION NAME ÉS JELSZÓ
1. Menj a **"General"** fülre
2. **Session Name**: `ARK Primal Descended PvE x50`
3. **Server Password**: Hagyd üresen (nyilvános szerver) VAGY állíts be jelszót
4. **Admin Password**: Változtasd meg a **`CHANGE_THIS_PASSWORD`** részt!

### 5️⃣ LÉPÉS: SZERVER INDÍTÁS
1. Kattints a **"Restart Server"** gombra
2. Várj 5-10 percet, amíg a szerver elindul
3. Ellenőrizd a **"Server Log"** fület, hogy nincs-e hiba

### 6️⃣ LÉPÉS: JÁTÉKBAN CSATLAKOZÁS
1. Indítsd el az ARK: Survival Ascended-et
2. Menj a **"Join ARK"** menübe
3. Válaszd a **"Unofficial"** szervereket
4. Szűrés: Írd be: `ARK Primal Descended`
5. Ha nem jelenik meg azonnal, várj 2-3 percet és frissítsd (F5)

---

## 🔧 HIBAELHÁRÍTÁS

### ❌ "Szerver nem jelenik meg a listában"
**Megoldás:**
- Ellenőrizd, hogy a szerver fut-e (Nitrado dashboard → "Running" státusz)
- Kapcsold be a **"Show Unofficial Servers"** opciót
- Kapcsold ki a **"Show Password Protected"** filtert (ha jelszó védett a szerver)
- Próbáld meg közvetlen IP-vel csatlakozni:
  - Steam → View → Servers → Favorites → Add Server
  - IP: `31.214.216.164:5040`

### ❌ "Connection Timeout"
**Megoldás:**
- Ellenőrizd a Nitrado dashboard **"Ports"** fülét:
  - Game Port: `5040`
  - Query Port: `5040`
  - RCON Port: `11040`
- Indítsd újra a szervert
- Ellenőrizd a tűzfal beállításokat (ritkán szükséges)

### ❌ "Version Mismatch"
**Megoldás:**
- Frissítsd az ARK klienst a legújabb verzióra (Steam)
- Frissítsd a szervert a Nitrado dashboardon:
  - Settings → Updates → "Update Server"

### ❌ "Mod Mismatch Error"
**Megoldás:**
- Ellenőrizd, hogy minden mod telepítve van a szervereden
- Ellenőrizd, hogy a mod ID-k helyesek
- Frissítsd a modokat a Nitrado dashboard **"Mods"** fülén
- Kliens oldalon is frissítsd a modokat (Steam Workshop)

### ❌ "Server Crash / Not Starting"
**Megoldás:**
- Nézd meg a **"Server Log"** fület a Nitrado dashboardon
- Keresd a hibaüzeneteket (ERROR vagy FATAL)
- Gyakori problémák:
  - **Rossz mod kombináció**: Próbáld meg kevesebb moddal indítani
  - **Kevés RAM**: ARK SA sok RAM-ot igényel (min 16 GB ajánlott)
  - **Korrupt config fájlok**: Töröld és töltsd fel újra az INI fájlokat

### ❌ "Players Can't Tame / Build"
**Megoldás:**
- Ellenőrizd a `ServerPVE=True` beállítást
- Nézd meg a `Game.ini`-ben a `bDisableDinoTaming` értékét (legyen `false`)
- Ellenőrizd a tribe jogosultságokat

---

## 📊 FONTOS BEÁLLÍTÁSOK ELLENŐRZÉSE

### ✅ Szerver Info
- **Név:** ARK Primal Descended PvE x50
- **IP:** 31.214.216.164:5040
- **Max játékosok:** 20
- **Térkép:** Ragnarok
- **Max Wild Dino Szint:** 900 (OverrideOfficialDifficulty: 30.0)

### ✅ x50 Multiplierek
- **Gyűjtés:** 50x (HarvestAmountMultiplier)
- **Háziasítás:** 50x (TamingSpeedMultiplier)
- **Breeding:** Nincs 50x-es szorzó a breeding-nél! (A JSON-ban 1x van beállítva)
- **XP:** Nincs 50x-es szorzó az XP-nél! (A JSON-ban 1x van beállítva)

**⚠️ MEGJEGYZÉS:** Ha szeretnéd a breeding és XP szorzókat is 50x-re állítani, 
akkor módosítsd a `nitrado_official_x50.json` fájlban az alábbi értékeket:
```json
"EggHatchSpeedMultiplier": "50.0",
"BabyMatureSpeedMultiplier": "50.0",
"BabyImprintAmountMultiplier": "50.0",
"MatingIntervalMultiplier": "0.02",
"KillXPMultiplier": "1.5",
"HarvestXPMultiplier": "1.5",
"CraftXPMultiplier": "2.0",
"GenericXPMultiplier": "1.5",
"SpecialXPMultiplier": "2.0"
```
Majd importáld újra a JSON-t.

### ✅ Player Stat Szorzók
- **Health:** 3x
- **Stamina:** 3x
- **Weight:** 5x
- **Melee Damage:** 3x
- **Movement Speed:** 2x

### ✅ Dino Stat Szorzók (Háziasított)
- **Health:** 2x
- **Stamina:** 2x
- **Weight:** 2x
- **Melee Damage:** 2x
- **Movement Speed:** 1.5x

---

## 🎯 KÖVETKEZŐ LÉPÉSEK A SZERVER INDÍTÁS UTÁN

### 1. **Csatlakozz adminként:**
```
enablecheats ADMIN_JELSZAVAD
```

### 2. **Első Wild Dino Wipe:**
```
DestroyWildDinos
```
Ez újraindítja az összes wild dinót 900-as max szinttel.

### 3. **Ellenőrizd a modokat:**
```
ListActiveMods
```
Ez kilistázza az aktív modokat.

### 4. **Tesztelés:**
- Próbálj háziasítani egy dinót → gyorsnak kell lennie (50x)
- Próbálj gyűjteni → sok erőforrást kell kapnod (50x)
- Nézd meg a max wild dino szintet → 900-ig mehet

---

## 📞 TÁMOGATÁS

Ha továbbra sem működik:
1. **Nitrado Support:** https://support.nitrado.net/
2. **ARK SA Discord:** https://discord.gg/playark
3. **Reddit:** r/playark vagy r/arksurvivalascended

---

## 📁 FÁJLOK HELYE

- `/projects/sandbox/ArkAscended/GameUserSettings.ini` - Szerver alapbeállítások
- `/projects/sandbox/ArkAscended/Game.ini` - Mod és játékmechanika beállítások
- `/projects/sandbox/ArkAscended/nitrado_official_x50.json` - JSON import fájl
- `/projects/sandbox/ArkAscended/MOD_ID_LISTA.md` - Teljes mod lista ID-kkal

---

**Készítette:** Kiro AI Assistant  
**Verzió:** 2.0  
**Utolsó frissítés:** 2026-07-18
