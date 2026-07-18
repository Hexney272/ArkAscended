# 📊 PLAYER STAT ÉS DEATH RECOVERY ÚTMUTATÓ
## ARK: Survival Ascended PvE x50 Szerver

---

## 📈 PLAYER STAT BEÁLLÍTÁSOK (x50 Optimalizált)

### 🎯 **Jelenlegi Player Stat Szorzók:**

| Stat | Index | Szorzó | Mit jelent? |
|------|-------|--------|-------------|
| **Health** | [0] | **5.0x** | Életerő: Minden szinten +50 HP helyett +250 HP |
| **Stamina** | [1] | **5.0x** | Állóképesség: Futás, ugrás, ütés |
| **Torpidity** | [2] | 1.0x | Ájulás (NEM módosítható) |
| **Oxygen** | [3] | **3.0x** | Víz alatti levegő |
| **Food** | [4] | 1.5x | Éhség csökkenési ráta |
| **Water** | [5] | 1.5x | Szomjúság csökkenési ráta |
| **Temperature** | [6] | 2.0x | Hőmérséklet ellenállás |
| **Weight** | [7] | **10.0x** | Súly: Hordozható tömeg (NAGYON FONTOS!) |
| **Melee Damage** | [8] | **5.0x** | Közelharc sebzés |
| **Movement Speed** | [9] | **3.0x** | Mozgási sebesség |
| **Fortitude** | [10] | **3.0x** | Ellenállás hideggel/meleggel szemben |
| **Crafting Speed** | [11] | **5.0x** | Craftolási sebesség |

### 📊 **Mit jelentenek ezek a gyakorlatban?**

#### ✅ **Level 1 → Level 105 player:**
- **Health:** ~5250 HP (5x szorzó)
- **Stamina:** ~5000 stamina
- **Weight:** ~10000+ carry weight (10x szorzó!)
- **Melee:** ~500% sebzés
- **Speed:** ~200-250% mozgási sebesség

#### ✅ **Miért ezek a szorzók?**

1. **Weight 10.0x** - x50 szerveren RENGETEG erőforrást gyűjtesz, sok hely kell!
2. **Health 5.0x** - Túlélés PvE bossoknál, alpha dinóknál
3. **Melee 5.0x** - Erősebb közelharc PvE-ben
4. **Crafting 5.0x** - Gyorsabb crafting nagy mennyiséghez
5. **Movement 3.0x** - Gyorsabb felfedezés (de ne legyen túl OP)

---

## 🦖 TAMED DINO STAT BEÁLLÍTÁSOK (x50 Optimalizált)

### 🎯 **Háziasított Dino Stat Szorzók:**

| Stat | Index | Szorzó | Mit jelent? |
|------|-------|--------|-------------|
| **Health** | [0] | **3.0x** | Dínó életerő |
| **Stamina** | [1] | **3.0x** | Dínó állóképesség |
| **Oxygen** | [3] | **2.0x** | Víz alatti dínók |
| **Weight** | [7] | **5.0x** | Hordozható súly (pack dínók!) |
| **Melee Damage** | [8] | **3.0x** | Támadási sebzés |
| **Movement Speed** | [9] | **2.5x** | Mozgási sebesség |

### 📊 **Post-Tame Bónuszok (Add szorzók):**

Ezek **további** bónuszok a háziasítás UTÁN:

- **Health:** +2.0x
- **Stamina:** +2.0x
- **Weight:** +3.0x
- **Melee:** +2.0x
- **Speed:** +2.0x

**Mit jelent ez?**  
Ha egy Rex-et támaszt, a normál statjai feletti +200% bónuszt kap!

---

## 🌍 WILD DINO STAT BEÁLLÍTÁSOK (900 Max Level)

### 🎯 **Vad Dino Stat Szorzók:**

| Stat | Index | Szorzó | Mit jelent? |
|------|-------|--------|-------------|
| **Health** | [0] | **1.5x** | Erősebb vad dinók |
| **Melee Damage** | [8] | **1.5x** | Veszélyesebb támadások |

**Miért csak ezek?**  
A 900-as level wild dinók **alapból nagyon erősek**! Ha túl sokat növelnénk, lehetetlenek lennének megtámadni.

---

## ⚰️ INVENTORY BACKUP SAVER MOD (928597)

### 📋 **Mi ez a mod?**

Az **Inventory Backup Saver** egy admin tool, amely **halál esetén elmenti** a játékos teljes inventory-ját, hogy az admin később visszaadja.

### 🔧 **Konfiguráció (Game.ini):**

```ini
[InventoryBackupSaver]
AutoBackupOnDeath=true
BackupRetentionDays=7
MaxBackupsPerPlayer=10
NotifyAdminsOnDeath=true
AutoRestoreOnRespawn=false
BackupFolder=SaveGames/InventoryBackups
EnableLogging=true
```

### ⚙️ **Beállítások magyarázata:**

| Beállítás | Érték | Mit csinál? |
|-----------|-------|-------------|
| `AutoBackupOnDeath` | `true` | Automatikus backup halálkor |
| `BackupRetentionDays` | `7` | Backup megőrzése 7 napig |
| `MaxBackupsPerPlayer` | `10` | Max 10 backup / játékos |
| `NotifyAdminsOnDeath` | `true` | Admin értesítés halálkor |
| `AutoRestoreOnRespawn` | `false` | NEM automatikus visszaadás |
| `BackupFolder` | `SaveGames/InventoryBackups` | Mentés helye |
| `EnableLogging` | `true` | Log fájl írása |

### 🎮 **Használat játékban (Admin parancsok):**

#### 1️⃣ **Játékos inventory visszaadása:**
```
cheat scriptcommand restore PlayerName
```
**Példa:**
```
cheat scriptcommand restore Steve
```

#### 2️⃣ **Mindenki backup-olása (manuális):**
```
cheat scriptcommand backupall
```

#### 3️⃣ **Backup lista lekérdezése:**
```
cheat scriptcommand listbackups PlayerName
```

#### 4️⃣ **Konkrét backup visszaállítása:**
```
cheat scriptcommand restore PlayerName BackupID
```

### ⚠️ **FONTOS MEGJEGYZÉSEK:**

1. **NEM automatikus!**  
   Az `AutoRestoreOnRespawn=false` azt jelenti, hogy az adminnak **MANUÁLISAN** kell visszaadni az itemeket!

2. **Miért nem automatikus?**  
   - PvE szerveren fontos a halálbüntetés (kihívás)
   - Elkerüli az abusálást (suicide farming)
   - Admin dönthet, hogy jogos-e a visszaadás

3. **Mikor adja vissza az admin?**
   - Server crash
   - Lag miatti halál
   - Bug miatti halál
   - Boss fight crash
   - **NEM** normál haláloknál!

---

## 🔄 ALTERNATÍVA: AUTOMATIKUS DEATH RECOVERY

Ha szeretnéd, hogy **AUTOMATIKUSAN** visszaadja az itemeket, két opció van:

### ✅ **Opció 1: AutoRestoreOnRespawn engedélyezése**

**Game.ini módosítás:**
```ini
[InventoryBackupSaver]
AutoRestoreOnRespawn=true
```

**Előnyök:**
- Automatikus visszaadás halál után
- Nincs szükség admin beavatkozásra

**Hátrányok:**
- ❌ Megszünteti a halálbüntetést (easy mode)
- ❌ Abusálható (suicide farming)
- ❌ Elveszi a PvE kihívást

### ✅ **Opció 2: "Death Inventory Keeper" mod használata**

Ez egy **másik mod**, ami automatikusan visszaadja az itemeket.

**CurseForge ID:** Keressd meg: "Death Inventory Keeper (Cross-Platform)"

**Előnyök:**
- Automatikus item visszaadás
- Konfigurálható késleltetés
- Opcionális penalty (XP vesztés, kevesebb item)

**Telepítés:**
1. Nitrado → Mods fül
2. Keresés: "Death Inventory Keeper"
3. Install
4. Restart

**Konfiguráció (Game.ini):**
```ini
[DeathInventoryKeeper]
EnableAutoRecover=true
RecoverDelay=30
RecoverPercentage=100
XPPenaltyOnDeath=10
```

---

## 🛠️ STAT PONTOK TESTRESZABÁSA

### 🔧 **Ha módosítani szeretnéd a stat szorzókat:**

**1. Szerkeszd a `GameUserSettings.ini` fájlt:**
```
Nitrado → Settings → Expert Mode → GameUserSettings.ini
```

**2. Keresd meg a következő sorokat:**
```ini
PerLevelStatsMultiplier_Player[0]=5.0  ; Health
PerLevelStatsMultiplier_Player[7]=10.0 ; Weight
PerLevelStatsMultiplier_Player[8]=5.0  ; Melee
```

**3. Változtasd meg az értékeket:**
- **Alacsonyabb érték** = kevesebb stat növekedés
- **Magasabb érték** = több stat növekedés

**4. Mentsd el és indítsd újra a szervert**

---

## 📋 STAT SZORZÓ AJÁNLÁSOK KÜLÖNBÖZŐ STÍLUSOKHOZ

### 🟢 **Easy Mode (Casual játékosok):**
```ini
PerLevelStatsMultiplier_Player[0]=10.0  ; Health
PerLevelStatsMultiplier_Player[7]=20.0  ; Weight
PerLevelStatsMultiplier_Player[8]=10.0  ; Melee
```

### 🟡 **Balanced Mode (Jelenlegi):**
```ini
PerLevelStatsMultiplier_Player[0]=5.0   ; Health
PerLevelStatsMultiplier_Player[7]=10.0  ; Weight
PerLevelStatsMultiplier_Player[8]=5.0   ; Melee
```

### 🔴 **Hard Mode (Pro játékosok):**
```ini
PerLevelStatsMultiplier_Player[0]=2.0   ; Health
PerLevelStatsMultiplier_Player[7]=3.0   ; Weight
PerLevelStatsMultiplier_Player[8]=2.0   ; Melee
```

---

## 🎯 GYAKORI PROBLÉMÁK

### ❌ **"Stat pontok nem változnak szintelésnél"**

**Okok:**
- INI fájl nem töltődött be
- Szintaxis hiba az INI-ben
- Szerver nem indult újra

**Megoldás:**
1. Ellenőrizd az INI szintaxist
2. Restart server
3. Próbálj meg újra szintet lépni
4. Ha még mindig nem működik: `cheat ForcePlayerToJoinTribe YourName YourTribeName`

### ❌ **"Inventory Backup Saver nem működik"**

**Okok:**
- Mod nincs telepítve
- Mod konfiguráció rossz helyen van
- Mod nem töltődött be

**Megoldás:**
1. Ellenőrizd, hogy a mod telepítve van (Nitrado Mods fül)
2. Nézd meg a Server Log-ot: `Mods loaded: InventoryBackupSaver`
3. Próbáld ki az admin parancsot: `cheat scriptcommand backupall`
4. Nézd meg a backup mappát FTP-n: `/SaveGames/InventoryBackups/`

### ❌ **"Dino statjai nem változnak"**

**Okok:**
- Régi dinók a világban (már léteztek)
- Wild dino szorzók nem frissültek

**Megoldás:**
1. **Wild Dino Wipe:** `cheat DestroyWildDinos`
2. Várj 5-10 percet, amíg új dinók spawnolnak
3. **Háziasított dinókra:** Sajnos a régi dinók statjai nem változnak!
4. Új dinókat kell támasítani

---

## 💡 PRO TIPPEK

### ✅ **1. Respec (Stat Reset):**
```ini
[ServerSettings]
bAllowUnlimitedRespecs=True
```
Ez már be van állítva! Játékban: Mindgrain Tonic crafting és elfogyasztás.

### ✅ **2. Admin Commands stat teszteléshez:**
```
cheat GiveExpToPlayer 0 1000000 1 1  ; 1M XP
cheat SetStatOnTarget Health 10000   ; 10000 HP beállítás
cheat LevelUp                        ; +1 szint
```

### ✅ **3. Stat Calculator használata:**
- **ARK Smart Breeding:** https://github.com/cadon/ARKStatsExtractor
- Offline tool, amely kiszámolja a pontos statokat

### ✅ **4. Backup készítés stat változtatás előtt:**
```
Nitrado → Settings → Backup → Create Backup
```

---

## 📊 ÖSSZEFOGLALÓ TÁBLÁZAT

| Beállítás | Érték | Hol van? | Mit csinál? |
|-----------|-------|----------|-------------|
| Player Health | 5.0x | GameUserSettings.ini | +250 HP / szint |
| Player Weight | 10.0x | GameUserSettings.ini | +100 weight / szint |
| Player Melee | 5.0x | GameUserSettings.ini | +5% sebzés / szint |
| Tamed Dino Health | 3.0x | GameUserSettings.ini | +30 HP / szint |
| Tamed Dino Weight | 5.0x | GameUserSettings.ini | +50 weight / szint |
| Wild Dino Health | 1.5x | GameUserSettings.ini | Erősebb wild dinók |
| Death Recovery | Manual | Game.ini | Admin visszaadja itemeket |
| Max Wild Level | 900 | GameUserSettings.ini | OverrideOfficialDifficulty=30.0 |

---

## 🎮 TESZTELÉSI CHECKLIST

### ✅ **Player Stat Tesztelés:**
1. [ ] Új karakter létrehozása
2. [ ] Szintelés és stat pontok kiosztása
3. [ ] Ellenőrizd a stat növekedést
4. [ ] Weight teszt: Sok item felvétele
5. [ ] Melee teszt: Dino/struktúra ütése

### ✅ **Dino Stat Tesztelés:**
1. [ ] Wild dino wipe: `cheat DestroyWildDinos`
2. [ ] Új wild dino spawn ellenőrzése (900 level)
3. [ ] Dino háziasítása
4. [ ] Stat növekedés ellenőrzése szintelésnél
5. [ ] Weight és melee tesztelése

### ✅ **Death Recovery Tesztelés:**
1. [ ] Inventory megtöltése itemekkel
2. [ ] Halál okozása (admin: `cheat Kill`)
3. [ ] Respawn
4. [ ] Admin parancs: `cheat scriptcommand restore YourName`
5. [ ] Itemek visszakapása ellenőrzése

---

**Készítette:** Kiro AI Assistant  
**Verzió:** 1.0  
**Utolsó frissítés:** 2026-07-18

**Kérdésed van?** Írj nyugodtan! 😊
