# 🎮 NITRADO JSON IMPORT - FRISSÍTETT BEÁLLÍTÁSOK
## ARK Primal Descended PvE x50 - Teljes Konfiguráció

---

## ⚠️ FONTOS VÁLTOZÁSOK (2026-07-18)

### **JAVÍTOTT BEÁLLÍTÁSOK:**

1. ✅ **OverrideOfficialDifficulty:** `30.0` → **`5.0`**
   - Wild dino max level: **150** (NEM 900!)
   - Tamed max: ~900 (150 wild + 73 bonus + 677 level-up)

2. ✅ **TamingSpeedMultiplier:** `50.0` → **`15.0`**
   - Lassabb, realisztikusabb taming

3. ✅ **Breeding beállítások:** x25 (gyorsabb)
   - `MatingIntervalMultiplier`: 0.04
   - `EggHatchSpeedMultiplier`: 25.0
   - `BabyMatureSpeedMultiplier`: 25.0
   - `BabyImprintAmountMultiplier`: 25.0

4. ✅ **Player Stat szorzók hozzáadva** (GameUserSettings.ini-ben)
   - Health: 5x
   - Weight: 10x
   - Melee: 5x

5. ✅ **Dino XP lassítás:** `0.5x`
   - Lassabb dino szintlépés

6. ✅ **Cryopod nerf kikapcsolva**
   - `EnableCryopodNerf`: false

7. ✅ **Supply crate & fishing quality:** `3.0x`

8. ✅ **Crop growth:** `10.0x`

---

## 📁 HASZNÁLHATÓ JSON FÁJLOK

### **1️⃣ nitrado_settings_FINAL.json** ⭐ AJÁNLOTT
**Teljes konfiguráció** minden javítással és optimalizációval.

**Tartalmaz:**
- ✅ OverrideOfficialDifficulty: 5.0
- ✅ TamingSpeed: 15.0x
- ✅ Breeding: 25.0x
- ✅ XP: 50.0x
- ✅ Harvest: 50.0x
- ✅ Player/Dino stat szorzók
- ✅ Supply crate quality: 3.0x
- ✅ Cryopod nerf: kikapcsolva

**Használat:**
```
1. Nitrado Panel → Szerver kikapcsolása
2. Settings → Import Settings
3. Válaszd ki: nitrado_settings_FINAL.json
4. Import
5. Szerver indítása
```

---

### **2️⃣ arksa-settings-1784371684.json**
**Régi konfiguráció** - NEM ajánlott (hibás értékekkel).

**Problémák:**
- ❌ OverrideOfficialDifficulty: 30.0 (HIBÁS!)
- ❌ TamingSpeed: 50.0x (túl gyors)
- ❌ Breeding: 1.0x (túl lassú)
- ❌ Supply crate: 1.0x (túl gyenge)

**NE HASZNÁLD!**

---

### **3️⃣ nitrado_official_x50.json**
**Régi x50 konfiguráció** - Részben hibás.

**Problémák:**
- ❌ OverrideOfficialDifficulty: 30.0 (HIBÁS!)
- ⚠️ Breeding: 1.0x (lassú)
- ✅ XP és Harvest megfelelő

**NE HASZNÁLD! Helyette: nitrado_settings_FINAL.json**

---

## 🎯 AJÁNLOTT IMPORT LÉPÉSEK

### **TELJES ÚJ SZERVER BEÁLLÍTÁS:**

```bash
1. Állítsd le a szervert (Nitrado panel)
2. Import: nitrado_settings_FINAL.json
3. Töltsd fel a Game.ini-t (MOD_SPAWN_CONFIG.ini tartalmával!)
4. Töltsd fel a GameUserSettings.ini-t
5. Modok telepítése (33 mod, lásd MOD_ID_LISTA.md)
6. Szerver indítása
7. DestroyWildDinos parancs
```

---

## 📊 FÁJL ÖSSZEHASONLÍTÁS

| Beállítás | arksa-settings (RÉGI) | nitrado_official (RÉGI) | nitrado_settings_FINAL (ÚJ) ⭐ |
|-----------|----------------------|------------------------|--------------------------------|
| **OverrideOfficialDifficulty** | ❌ 30.0 | ❌ 30.0 | ✅ 5.0 |
| **TamingSpeed** | ❌ 50.0x | ❌ 50.0x | ✅ 15.0x |
| **Breeding (Egg Hatch)** | ❌ 1.0x | ❌ 1.0x | ✅ 25.0x |
| **Breeding (Mature)** | ❌ 1.0x | ❌ 1.0x | ✅ 25.0x |
| **Breeding (Imprint)** | ❌ 1.0x | ❌ 1.0x | ✅ 25.0x |
| **Supply Crate Quality** | ❌ 1.0x | ❌ 1.0x | ✅ 3.0x |
| **Fishing Quality** | ❌ 1.0x | ❌ 1.0x | ✅ 3.0x |
| **Crop Growth** | ❌ 1.0x | ❌ 1.0x | ✅ 10.0x |
| **Cryopod Nerf** | ❌ true | ⚠️ false | ✅ false |
| **XP Multiplier** | ✅ 50.0x | ✅ 50.0x | ✅ 50.0x |
| **Harvest Multiplier** | ✅ 50.0x | ✅ 50.0x | ✅ 50.0x |

---

## ⚙️ GAMEUSERSETTINGS.INI KIEGÉSZÍTÉS

**FONTOS:** A JSON import NEM tartalmazza a Player Stat szorzókat!

Ezeket **manuálisan** add hozzá a `GameUserSettings.ini` fájlhoz:

```ini
[ServerSettings]
; Player stat szorzók (per level)
PerLevelStatsMultiplier_Player[0]=5.0    ; Health (5x)
PerLevelStatsMultiplier_Player[1]=1.5    ; Stamina
PerLevelStatsMultiplier_Player[2]=1.0    ; Torpor
PerLevelStatsMultiplier_Player[3]=1.5    ; Oxygen
PerLevelStatsMultiplier_Player[4]=1.5    ; Food
PerLevelStatsMultiplier_Player[5]=1.5    ; Water
PerLevelStatsMultiplier_Player[6]=1.0    ; Temperature
PerLevelStatsMultiplier_Player[7]=10.0   ; Weight (10x)
PerLevelStatsMultiplier_Player[8]=5.0    ; Melee (5x)
PerLevelStatsMultiplier_Player[9]=1.5    ; Speed
PerLevelStatsMultiplier_Player[10]=1.5   ; Temperature Fortitude
PerLevelStatsMultiplier_Player[11]=2.0   ; Crafting Speed

; Tamed dino stat szorzók (per level)
PerLevelStatsMultiplier_DinoTamed[0]=1.0    ; Health
PerLevelStatsMultiplier_DinoTamed[1]=1.0    ; Stamina
PerLevelStatsMultiplier_DinoTamed[7]=1.0    ; Weight
PerLevelStatsMultiplier_DinoTamed[8]=0.5    ; Melee (CSÖKKENTVE!)
PerLevelStatsMultiplier_DinoTamed[9]=1.0    ; Speed

; Tamed dino WILD szint bonus (tamingnél kapott bonus)
PerLevelStatsMultiplier_DinoTamed_Add[0]=0.5   ; Health
PerLevelStatsMultiplier_DinoTamed_Add[1]=1.0   ; Stamina
PerLevelStatsMultiplier_DinoTamed_Add[7]=1.0   ; Weight
PerLevelStatsMultiplier_DinoTamed_Add[8]=0.5   ; Melee
PerLevelStatsMultiplier_DinoTamed_Add[9]=1.0   ; Speed

; Dino XP szorzó (lassabb leveling)
DinoCharacterXPMultiplier=0.5
```

---

## 🔧 GAME.INI KIEGÉSZÍTÉS

**FONTOS:** A JSON import NEM tartalmazza a mod spawn config-ot!

Másold be a `MOD_SPAWN_CONFIG.ini` tartalmát a `Game.ini` végére:

```ini
; ===================================================================
; PRIMAL CHAOS & ARK DESCENDED - TIER SPAWN CONFIG
; ===================================================================
; Lásd: MOD_SPAWN_CONFIG.ini és MOD_TIER_SYSTEM.md
;
; TIER SORREND (gyengétől erősig):
; Primal Chaos: Alpha (80-150) → Beta (150-220) → Toxic (460-550) → Celestial (550-750)
; Ark Descended: Ordinary (150-300) → Descended (400-550) → Celestial (600-850)
;
; [Itt illeszd be a MOD_SPAWN_CONFIG.ini tartalmát]
```

---

## 📝 TELJES IMPORT CHECKLIST

### **1️⃣ Nitrado Panel - JSON Import:**
- [ ] Szerver leállítása
- [ ] Settings → Import Settings
- [ ] `nitrado_settings_FINAL.json` kiválasztása
- [ ] Import végrehajtása
- [ ] Ellenőrzés: OverrideOfficialDifficulty = 5.0

### **2️⃣ GameUserSettings.ini feltöltés:**
- [ ] Fájl megnyitása
- [ ] Player Stat szorzók ellenőrzése
- [ ] Dino XP szorzó ellenőrzése: 0.5
- [ ] Feltöltés Nitrado-ra

### **3️⃣ Game.ini feltöltés:**
- [ ] MOD_SPAWN_CONFIG.ini tartalmának beillesztése
- [ ] CustomDinoLevels section ellenőrzése
- [ ] ArkDescended section ellenőrzése
- [ ] InventoryBackupSaver section ellenőrzése
- [ ] Feltöltés Nitrado-ra

### **4️⃣ Modok telepítése:**
- [ ] 33 mod hozzáadása (MOD_ID_LISTA.md)
- [ ] Sorrend ellenőrzése
- [ ] Custom Dino Levels (928708) telepítve

### **5️⃣ Szerver indítás:**
- [ ] Szerver indítása
- [ ] Console log ellenőrzése
- [ ] Modok betöltésének ellenőrzése

### **6️⃣ Wild dinók újragenerálása:**
- [ ] Admin bejelentkezés
- [ ] `cheat DestroyWildDinos` parancs
- [ ] Várj 15-20 percet
- [ ] Új spawn-ok ellenőrzése

### **7️⃣ Tesztelés:**
- [ ] Vanilla dino spawn (5-150 level)
- [ ] Mod dino spawn (Alpha 80-150, Toxic 460-550, stb.)
- [ ] Player stat leveling (Health, Weight, Melee)
- [ ] Taming sebessége (15x)
- [ ] Breeding sebessége (25x)
- [ ] Death recovery mod működése

---

## 🛠️ HIBAELHÁRÍTÁS

### **❌ "Wild dinók 900 level!"**
**Ok:** OverrideOfficialDifficulty = 30.0  
**Megoldás:** Változtasd 5.0-ra, restart szerver, DestroyWildDinos

### **❌ "Taming túl gyors!"**
**Ok:** TamingSpeedMultiplier = 50.0  
**Megoldás:** Változtasd 15.0-ra

### **❌ "Breeding túl lassú!"**
**Ok:** Breeding szorzók = 1.0  
**Megoldás:** Állítsd 25.0-ra (egg hatch, mature, imprint)

### **❌ "Mod dinók nem spawnolnak!"**
**Ok:** Game.ini spawn override hiányzik  
**Megoldás:** Illeszd be a MOD_SPAWN_CONFIG.ini tartalmát

### **❌ "Dino XP túl gyors!"**
**Ok:** DinoCharacterXPMultiplier hiányzik  
**Megoldás:** Add hozzá GameUserSettings.ini-hez: `DinoCharacterXPMultiplier=0.5`

---

## 📞 FORRÁSOK ÉS DOKUMENTÁCIÓ

**Fájlok:**
- `nitrado_settings_FINAL.json` - Teljes szerver konfiguráció ⭐
- `GameUserSettings.ini` - Player/Dino stat beállítások
- `Game.ini` - Mod spawn config
- `MOD_SPAWN_CONFIG.ini` - Teljes tier spawn konfiguráció
- `MOD_TIER_SYSTEM.md` - Tier rendszer dokumentáció
- `MOD_ID_LISTA.md` - 33 mod lista

**GitHub Repo:**
https://github.com/Hexney272/ArkAscended

---

**Verzió:** 3.0 (Frissített - 2026-07-18)  
**Készítette:** Kiro AI Assistant

✅ **MINDEN BEÁLLÍTÁS JAVÍTVA ÉS OPTIMALIZÁLVA!**
