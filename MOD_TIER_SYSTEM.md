# 🦖 MOD TIER RENDSZER ÉS LEVEL BEÁLLÍTÁSOK
## Primal Chaos & Ark Descended - Teljes Tier Lista

---

## 📊 TIER RENDSZER ÁTTEKINTÉS

### **Primal Chaos - 7 Tier (leggyengébb → legerősebb)**
1. **Alpha** - 80-150 level (leggyengébb, gyakori)
2. **Beta** - 150-220 level (vízi dinók, közepes)
3. **Gamma** - 220-300 level (közepes)
4. **Delta** - 300-380 level (közepes-erős)
5. **Epsilon** - 380-460 level (erős)
6. **Toxic** - 460-550 level (nagyon erős)
7. **Celestial** - 550-750 level (legerősebb!)

### **Ark Descended - 3 Tier (leggyengébb → legerősebb)**
1. **Ordinary** - 150-300 level (2x stats, közepes)
2. **Descended** - 400-550 level (különleges képességek, erős)
3. **Celestial/Elite** - 600-850 level (legerősebb!)

### **Vanilla Dinók - Custom Dino Levels Mod**
- **Level:** 5-150 (Ragnarok eloszlás)
- **Spawn:** Normál gyakoriság
- **Tamed Max:** ~900 level (150 + 73 bonus + 677 level-up)

---

## 🎯 SPAWN GYAKORISÁG BEÁLLÍTÁSOK

| Tier | Level Tartomány | Spawn Esély | EntryWeight | Spawn % | Leírás |
|------|----------------|-------------|-------------|---------|---------|
| **Primal Chaos Alpha** | 80-150 | Gyakori | 0.05-0.08 | 30-50% | Leggyengébb mod tier |
| **Primal Chaos Beta** | 150-220 | Ritka | 0.015-0.03 | 10-20% | Vízi dinók |
| **Primal Chaos Gamma** | 220-300 | Ritka | 0.01-0.02 | 5-15% | - |
| **Primal Chaos Delta** | 300-380 | Nagyon ritka | 0.008-0.015 | 3-8% | - |
| **Primal Chaos Epsilon** | 380-460 | Nagyon ritka | 0.005-0.01 | 2-5% | - |
| **Primal Chaos Toxic** | 460-550 | Extrém ritka | 0.003-0.008 | 2-5% | Zöld, mérgező |
| **Primal Chaos Celestial** | 550-750 | Ultra ritka | 0.001-0.003 | 0.5-2% | Legerősebb! |
| **Ark Descended Ordinary** | 150-300 | Ritka | 0.015-0.03 | 10-20% | 2x stats |
| **Ark Descended Descended** | 400-550 | Extrém ritka | 0.003-0.005 | 2-3% | Lila, speciális |
| **Ark Descended Celestial** | 600-850 | Ultra ritka | 0.001-0.002 | 0.5-1% | Legerősebb! |

---

## 🧮 LEVEL SZÁMÍTÁS TÁBLÁZAT

**Alapbeállítás:** `OverrideOfficialDifficulty=5.0` → Max vanilla wild level: 150

**Szorzó:** 30 (150 / 5 = 30)

| Tier | Kívánt Wild Level | MinLevel számítás | MaxLevel számítás | ConfigOverride |
|------|------------------|-------------------|-------------------|----------------|
| **Vanilla** | 5-150 | - | - | Nincs override |
| **Alpha** | 80-150 | 80 / 30 = 2.67 | 150 / 30 = 5.0 | MinLevel=2.67, MaxLevel=5.0 |
| **Beta** | 150-220 | 150 / 30 = 5.0 | 220 / 30 = 7.33 | MinLevel=5.0, MaxLevel=7.33 |
| **Gamma** | 220-300 | 220 / 30 = 7.33 | 300 / 30 = 10.0 | MinLevel=7.33, MaxLevel=10.0 |
| **Delta** | 300-380 | 300 / 30 = 10.0 | 380 / 30 = 12.67 | MinLevel=10.0, MaxLevel=12.67 |
| **Epsilon** | 380-460 | 380 / 30 = 12.67 | 460 / 30 = 15.33 | MinLevel=12.67, MaxLevel=15.33 |
| **Toxic** | 460-550 | 460 / 30 = 15.33 | 550 / 30 = 18.33 | MinLevel=15.33, MaxLevel=18.33 |
| **Celestial (PC)** | 550-750 | 550 / 30 = 18.33 | 750 / 30 = 25.0 | MinLevel=18.33, MaxLevel=25.0 |
| **Ordinary** | 150-300 | 150 / 30 = 5.0 | 300 / 30 = 10.0 | MinLevel=5.0, MaxLevel=10.0 |
| **Descended** | 400-550 | 400 / 30 = 13.33 | 550 / 30 = 18.33 | MinLevel=13.33, MaxLevel=18.33 |
| **Celestial (AD)** | 600-850 | 600 / 30 = 20.0 | 850 / 30 = 28.33 | MinLevel=20.0, MaxLevel=28.33 |

---

## 📋 PRIMAL CHAOS - TIER RÉSZLETEK

### **1️⃣ ALPHA TIER (80-150 level) - LEGGYENGÉBB**

**Jellemzők:**
- Leggyengébb mod tier (alapstatok csak kicsit magasabbak a vanillánál)
- Gyakori spawn (5-8%)
- Minden terep típuson megtalálhatók

**Ajánlott dinók spawn-hoz:**
- Alpha Rex (hegyek)
- Alpha Allo (dzsungel)
- Alpha Raptor (dzsungel, síkság)
- Alpha Carno (hegyek)
- Alpha Spino (folyók, dzsungel)

**Config példa:**
```ini
; Alpha Rex - 80-150 level
NPCDifficultyLevelRangeOverride=(MinLevel=2.67,MaxLevel=5.0)
EntryWeight=0.05
NPCsToSpawnPercentageChance=(0.3)
```

---

### **2️⃣ BETA TIER (150-220 level) - VÍZI DINÓK**

**Jellemzők:**
- Vízi dinók tier
- Közepes erősség
- Ritka spawn (1.5-3%)
- Csak vízben spawn-olnak

**Ajánlott dinók spawn-hoz:**
- Beta Mosa (mély óceán)
- Beta Megalodon (óceán)
- Beta Plesiosaur (óceán)
- Beta Tusoteuthis (mély óceán)
- Beta Basilosaurus (óceán)

**Config példa:**
```ini
; Beta Mosa - 150-220 level
NPCDifficultyLevelRangeOverride=(MinLevel=5.0,MaxLevel=7.33)
EntryWeight=0.02
NPCsToSpawnPercentageChance=(0.15)
```

---

### **3️⃣ TOXIC TIER (460-550 level) - NAGYON ERŐS**

**Jellemzők:**
- Zöld/mérgező megjelenés
- Nagyon erős statisztikák
- Extrém ritka spawn (0.3-0.8%)
- Különleges mérgező képességek

**Ajánlott dinók spawn-hoz:**
- Toxic Rex (hegyek)
- Toxic Gigant (hegyek) - EXTRÉM RITKA!
- Toxic Spino (folyók, dzsungel)
- Toxic Therizino (dzsungel)
- Toxic Quetz (hegyek) - EXTRÉM RITKA!

**Config példa:**
```ini
; Toxic Rex - 460-550 level
NPCDifficultyLevelRangeOverride=(MinLevel=15.33,MaxLevel=18.33)
EntryWeight=0.008
NPCsToSpawnPercentageChance=(0.05)
```

---

### **7️⃣ CELESTIAL TIER (550-750 level) - LEGERŐSEBB!**

**Jellemzők:**
- Legerősebb Primal Chaos tier
- Ultra ritka spawn (0.1-0.3%)
- Fénylő/csillogó effektek
- Boss-szintű statisztikák

**Ajánlott dinók spawn-hoz:**
- Celestial Rex (hegyek) - ULTRA RITKA!
- Celestial Gigant (hegyek) - ULTRA RITKA!
- Celestial Wyvern (hegyek) - ULTRA RITKA!

**Config példa:**
```ini
; Celestial Rex - 550-750 level
NPCDifficultyLevelRangeOverride=(MinLevel=18.33,MaxLevel=25.0)
EntryWeight=0.002
NPCsToSpawnPercentageChance=(0.01)
```

---

## 📋 ARK DESCENDED - TIER RÉSZLETEK

### **1️⃣ ORDINARY TIER (150-300 level) - 2X STATS**

**Jellemzők:**
- 2x statisztikák a vanilla dinókhoz képest
- Különleges képességek (bleed, rage, stb.)
- Ritka spawn (1.5-3%)
- Minden terep típuson

**Ajánlott dinók spawn-hoz:**
- Ordinary Rex (hegyek) - Bleed attack, rage buff
- Ordinary Spino (folyók) - Spino Rage Mode
- Ordinary Argent (hegyek) - Gyorsabb repülés
- Ordinary Quetz (hegyek) - Több súly
- Ordinary Mosa (óceán) - Erősebb harapás

**Config példa:**
```ini
; Ordinary Rex - 150-300 level
NPCDifficultyLevelRangeOverride=(MinLevel=5.0,MaxLevel=10.0)
EntryWeight=0.02
NPCsToSpawnPercentageChance=(0.15)
```

---

### **2️⃣ DESCENDED TIER (400-550 level) - KÜLÖNLEGES**

**Jellemzők:**
- Lila színű dinók
- Különleges képességek (Descended Essence termelés)
- Extrém ritka spawn (0.3-0.5%)
- Boss-szerű erősség

**Ajánlott dinók spawn-hoz:**
- Descended Wyvern (hegyek) - EXTRÉM RITKA!
- Descended Griffin (hegyek) - EXTRÉM RITKA!
- Descended Rex (hegyek)
- Descended Titanosaur (síkság) - EXTRÉM RITKA!

**Config példa:**
```ini
; Descended Wyvern - 400-550 level
NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=18.33)
EntryWeight=0.003
NPCsToSpawnPercentageChance=(0.02)
```

---

### **3️⃣ CELESTIAL/ELITE TIER (600-850 level) - LEGERŐSEBB!**

**Jellemzők:**
- Legerősebb Ark Descended tier
- Ultra ritka spawn (0.1-0.2%)
- Csillogó/fénylő effektek
- Raid boss szintű statisztikák

**Ajánlott dinók spawn-hoz:**
- Celestial Wyvern (hegyek) - ULTRA RITKA!
- Celestial Rex (hegyek) - ULTRA RITKA!
- Celestial Titanosaur (síkság) - ULTRA RITKA!

**Config példa:**
```ini
; Celestial Wyvern - 600-850 level
NPCDifficultyLevelRangeOverride=(MinLevel=20.0,MaxLevel=28.33)
EntryWeight=0.001
NPCsToSpawnPercentageChance=(0.01)
```

---

## ⚙️ GAME.INI KONFIGURÁCIÓ PÉLDÁK

### **Teljes Spawn Override Példa:**

```ini
[/Script/ShooterGame.ShooterGameMode]

; Primal Chaos - Alpha Rex (80-150 level, gyakori)
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosAlphaRex80",
        EntryWeight=0.05,
        NPCsToSpawnStrings=("AlphaRex_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.3),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=2.67,MaxLevel=5.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="AlphaRex_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.05
    ))
)

; Primal Chaos - Toxic Rex (460-550 level, extrém ritka)
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosToxicRex460",
        EntryWeight=0.008,
        NPCsToSpawnStrings=("ToxicRex_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.05),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=15.33,MaxLevel=18.33)
    )),
    NPCSpawnLimits=((
        NPCClassString="ToxicRex_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.008
    ))
)

; Ark Descended - Ordinary Rex (150-300 level, ritka)
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedRexOrdinary150",
        EntryWeight=0.02,
        NPCsToSpawnStrings=("Rex_Character_BP_Ordinary_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.15),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=5.0,MaxLevel=10.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Rex_Character_BP_Ordinary_C",
        MaxPercentageOfDesiredNumToAllow=0.02
    ))
)

; Ark Descended - Descended Wyvern (400-550 level, extrém ritka)
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedWyvernDescended400",
        EntryWeight=0.003,
        NPCsToSpawnStrings=("Wyvern_Character_BP_Descended_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.02),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=18.33)
    )),
    NPCSpawnLimits=((
        NPCClassString="Wyvern_Character_BP_Descended_C",
        MaxPercentageOfDesiredNumToAllow=0.003
    ))
)
```

---

## 🎮 TESZTELÉSI PARANCSOK

### **Spawn tesztelés admin paranccsal:**

```
; Alpha Rex (80-150 level)
cheat spawndino "Blueprint'/PrimalChaos/1Dinos/2Alpha/Rex/AlphaRex_Character_BP.AlphaRex_Character_BP'" 1 0 0 80

; Toxic Rex (460-550 level)
cheat spawndino "Blueprint'/PrimalChaos/1Dinos/1Toxic/Rex/ToxicRex_Character_BP.ToxicRex_Character_BP'" 1 0 0 460

; Ordinary Rex (150-300 level)
cheat spawndino "Blueprint'/ArkDescended/Dinos/Rex/Ordinary/Rex_Character_BP_Ordinary.Rex_Character_BP_Ordinary'" 1 0 0 150

; Descended Wyvern (400-550 level)
cheat spawndino "Blueprint'/ArkDescended/Dinos/Wyvern/Descended/Wyvern_Character_BP_Descended.Wyvern_Character_BP_Descended'" 1 0 0 400
```

### **Wild dino újragenerálás:**
```
cheat DestroyWildDinos
```

---

## 📊 VÁRHATÓ SPAWN ELOSZLÁS

**1000 dino spawning esetén:**

| Tier | Spawn Darab | Szint | Erősség |
|------|-------------|-------|---------|
| Vanilla | ~850 | 5-150 | Normál |
| Primal Chaos Alpha | ~50 | 80-150 | Közepes |
| Primal Chaos Beta | ~20 | 150-220 | Közepes |
| Primal Chaos Toxic | ~5 | 460-550 | Nagyon erős |
| Primal Chaos Celestial | ~1 | 550-750 | Boss |
| Ark Descended Ordinary | ~20 | 150-300 | Közepes-erős |
| Ark Descended Descended | ~3 | 400-550 | Nagyon erős |
| Ark Descended Celestial | ~1 | 600-850 | Raid Boss |

---

## 🛠️ IMPLEMENTÁCIÓS LÉPÉSEK

### **1️⃣ Game.ini frissítése:**
```bash
# Másold be a MOD_SPAWN_CONFIG.ini tartalmát a Game.ini végére
# A régi spawn override-okat töröld ki először!
```

### **2️⃣ Szerver restart:**
```
1. Állítsd le a szervert (Nitrado panel)
2. Töltsd fel az új Game.ini-t
3. Indítsd újra a szervert
```

### **3️⃣ Wild dinók újragenerálása:**
```
cheat DestroyWildDinos
Várj 15-20 percet
```

### **4️⃣ Tesztelés:**
```
1. Repülj végig a térképen
2. Ellenőrizd a mod dinók spawn-ját
3. Győződj meg a level tartományokról
4. Teszteld az erősségüket
```

---

## ⚠️ FONTOS MEGJEGYZÉSEK

1. **OverrideOfficialDifficulty=5.0** KELL LEGYEN a GameUserSettings.ini-ben!
2. **Custom Dino Levels mod (928708)** telepítve és aktiválva!
3. **Primal Chaos & Ark Descended** modok aktívak és betöltve!
4. **DestroyWildDinos** után várj 15-20 percet az új spawn-okra!
5. **Backup** készítése ajánlott a frissítés előtt!

---

## 📞 FORRÁSOK

- **Primal Chaos Spawn Codes:** https://docs.google.com/spreadsheets/d/1uxzHT2_4cVgEGJNMWywmH-KnL8HJimy8uQhrSzDSdTs/
- **Ark Descended Spawn Codes:** https://docs.google.com/spreadsheets/d/1pZh51fZRv6mBejLuhToYnyT_xrlwOtvGKid-UQyx6TM/
- **Custom Dino Levels Mod:** https://www.curseforge.com/ark-survival-ascended/mods/custom-dino-levels

---

**Készítette:** Kiro AI Assistant  
**Verzió:** 3.0 (Teljes Tier Rendszer)  
**Utolsó frissítés:** 2026-07-18

✅ **HELYES TIER SORREND ÉS SZINTEK!**
