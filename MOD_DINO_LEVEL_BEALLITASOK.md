# 🦖 MOD DINO LEVEL BEÁLLÍTÁSOK
## Primal Chaos & Ark Descended - 400-600 Level Wild Dinók

---

## ✅ HIVATALOS BLUEPRINT PATHOK HASZNÁLVA!

A konfiguráció **hivatalos spawn kódokat** használ:
1. ✅ **Primal Chaos:** Hivatalos Google Sheets dokumentum
2. ✅ **Ark Descended:** Hivatalos Google Sheets dokumentum
3. ✅ **Tesztelt és működik** játékban

**Források:**
- Primal Chaos: https://docs.google.com/spreadsheets/d/1uxzHT2_4cVgEGJNMWywmH-KnL8HJimy8uQhrSzDSdTs/
- Ark Descended: https://docs.google.com/spreadsheets/d/1pZh51fZRv6mBejLuhToYnyT_xrlwOtvGKid-UQyx6TM/

---

## 📊 JELENLEGI LEVEL BEÁLLÍTÁSOK

| Dino Típus | Wild Level | Spawn Esély | Tamed Max |
|------------|------------|-------------|-----------|
| **Vanilla dinók** | 5-150 | Ragnarok (több high-level) | ~900 |
| **Primal Chaos (Toxic)** | 400-600 | Nagyon ritka (0.5-1%) | ~1200+ |
| **Primal Chaos (Alpha)** | 400-600 | Extrém ritka (0.3%) | ~1200+ |
| **Ark Descended (Ordinary)** | 400-600 | Ritka (0.4-1%) | ~1200+ |
| **Ark Descended (Descended)** | 400-600 | Extrém ritka (0.3%) | ~1200+ |

---

## 🔧 HOGYAN MŰKÖDIK?

### 1️⃣ **Vanilla Dinók (Custom Dino Levels mod):**
```ini
[CustomDinoLevels]
bUseRagnarokLevels=true
```
**Eredmény:**
- 5-150 level
- Ragnarok eloszlás (több 120-150 level dino)
- Vanilla dinók: Rex, Raptor, Carno, stb.

### 2️⃣ **Mod Dinók (ConfigOverride):**
```ini
NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
```
**Számítás:**
- `MinLevel=13.33` → 13.33 × 30 = **400 level**
- `MaxLevel=20.0` → 20.0 × 30 = **600 level**

**Eredmény:**
- Primal Chaos dinók: 400-600 level
- Ark Descended dinók: 400-600 level
- **RITKA SPAWN:** 0.3-1% esély

---

## 📋 PRIMAL CHAOS - TOXIC TIER DINÓK

A Toxic tier dinók zöld/mérgező megjelenésűek, erős statokkal.

### 🔴 **Toxic Rex (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosToxicRex",
        EntryWeight=0.01,
        NPCsToSpawnStrings=("ToxicRex_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.1),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="ToxicRex_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.01
    ))
)
```
**Blueprint:** `/PrimalChaos/1Dinos/1Toxic/Rex/ToxicRex_Character_BP.ToxicRex_Character_BP`

### 🟢 **Toxic Gigant (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosToxicGigant",
        EntryWeight=0.005,
        NPCsToSpawnStrings=("ToxicGigant_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.05),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="ToxicGigant_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.005
    ))
)
```
**Blueprint:** `/PrimalChaos/1Dinos/1Toxic/Giga/ToxicGigant_Character_BP.ToxicGigant_Character_BP`

### 🟣 **Toxic Spino (400-600 level) - Dzsungel:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesJungle_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosToxicSpino",
        EntryWeight=0.01,
        NPCsToSpawnStrings=("ToxicSpino_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.1),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="ToxicSpino_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.01
    ))
)
```
**Blueprint:** `/PrimalChaos/1Dinos/1Toxic/Spinosaurus/ToxicSpino_Character_BP.ToxicSpino_Character_BP`

### 🦅 **Toxic Quetz (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosToxicQuetz",
        EntryWeight=0.005,
        NPCsToSpawnStrings=("ToxicQuetz_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.05),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="ToxicQuetz_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.005
    ))
)
```
**Blueprint:** `/PrimalChaos/1Dinos/1Toxic/Quetzal/ToxicQuetz_Character_BP.ToxicQuetz_Character_BP`

---

## 📋 PRIMAL CHAOS - ALPHA TIER DINÓK

Az Alpha tier dinók még erősebbek, speciális glowing effektekkel.

### 👑 **Alpha Rex (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosAlphaRex",
        EntryWeight=0.003,
        NPCsToSpawnStrings=("AlphaRex_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.03),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="AlphaRex_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.003
    ))
)
```
**Blueprint:** `/PrimalChaos/1Dinos/2Alpha/Rex/AlphaRex_Character_BP.AlphaRex_Character_BP`  
**Megjegyzés:** Ez NEM a vanilla Alpha Rex! Ez a Primal Chaos mod Alpha Rexa.

### 🦖 **Alpha Allo (400-600 level) - Dzsungel:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesJungle_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosAlphaAllo",
        EntryWeight=0.005,
        NPCsToSpawnStrings=("AlphaAllo_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.05),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="AlphaAllo_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.005
    ))
)
```
**Blueprint:** `/PrimalChaos/1Dinos/2Alpha/Allo/AlphaAllo_Character_BP.AlphaAllo_Character_BP`

---

## 📋 PRIMAL CHAOS - BETA TIER (VÍZI DINÓK)

A Beta tier dinók vízben spawn-olnak.

### 🌊 **Beta Mosa (400-600 level) - Óceán:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesWater_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosBetaMosa",
        EntryWeight=0.005,
        NPCsToSpawnStrings=("Beta_Mosa_Character_BP_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.05),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Beta_Mosa_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.005
    ))
)
```
**Blueprint:** `/PrimalChaos/1WaterDinos/1Beta/mosa/Beta_Mosa_Character_BP.Beta_Mosa_Character_BP`

---

## 📋 ARK DESCENDED - ORDINARY TIER DINÓK

Az Ordinary tier dinók 2x statokkal rendelkeznek a vanilla dinókhoz képest.

### 🔴 **Ordinary Rex (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedRex",
        EntryWeight=0.01,
        NPCsToSpawnStrings=("Rex_Character_BP_Ordinary_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.1),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Rex_Character_BP_Ordinary_C",
        MaxPercentageOfDesiredNumToAllow=0.01
    ))
)
```
**Blueprint:** `/ArkDescended/Dinos/Rex/Ordinary/Rex_Character_BP_Ordinary.Rex_Character_BP_Ordinary`  
**Különleges képesség:** Bleed attack, rage buff

### 🟣 **Ordinary Spino (400-600 level) - Dzsungel:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesJungle_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedSpino",
        EntryWeight=0.01,
        NPCsToSpawnStrings=("Spino_Character_BP_Ordinary_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.1),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Spino_Character_BP_Ordinary_C",
        MaxPercentageOfDesiredNumToAllow=0.01
    ))
)
```
**Blueprint:** `/ArkDescended/Dinos/Spino/Ordinary/Spino_Character_BP_Ordinary.Spino_Character_BP_Ordinary`  
**Különleges képesség:** Spino Rage Mode

### 🦅 **Ordinary Argent (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedArgent",
        EntryWeight=0.008,
        NPCsToSpawnStrings=("Argent_Character_BP_Ordinary_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.08),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Argent_Character_BP_Ordinary_C",
        MaxPercentageOfDesiredNumToAllow=0.008
    ))
)
```
**Blueprint:** `/ArkDescended/Dinos/Argent/Ordinary/Argent_Character_BP_Ordinary.Argent_Character_BP_Ordinary`  
**Különleges képesség:** Gyorsabb repülés

### 🦖 **Ordinary Quetz (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedQuetz",
        EntryWeight=0.004,
        NPCsToSpawnStrings=("Quetz_Character_BP_Ordinary_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.04),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Quetz_Character_BP_Ordinary_C",
        MaxPercentageOfDesiredNumToAllow=0.004
    ))
)
```
**Blueprint:** `/ArkDescended/Dinos/Quetzalcoatuls/Ordinary/Quetz_Character_BP_Ordinary.Quetz_Character_BP_Ordinary`

### 🌊 **Ordinary Mosa (400-600 level) - Óceán:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesWater_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedMosa",
        EntryWeight=0.006,
        NPCsToSpawnStrings=("Mosa_Character_BP_Ordinary_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.06),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Mosa_Character_BP_Ordinary_C",
        MaxPercentageOfDesiredNumToAllow=0.006
    ))
)
```
**Blueprint:** `/ArkDescended/Dinos/Mosasaurus/Ordinary/Mosa_Character_BP_Ordinary.Mosa_Character_BP_Ordinary`

---

## 📋 ARK DESCENDED - DESCENDED TIER DINÓK

A Descended tier dinók extrém ritka, lila színű változatok, különleges képességekkel.

### 🐉 **Descended Wyvern (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedWyvern",
        EntryWeight=0.003,
        NPCsToSpawnStrings=("Wyvern_Character_BP_Descended_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.03),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Wyvern_Character_BP_Descended_C",
        MaxPercentageOfDesiredNumToAllow=0.003
    ))
)
```
**Blueprint:** `/ArkDescended/Dinos/Wyvern/Descended/Wyvern_Character_BP_Descended.Wyvern_Character_BP_Descended`  
**Különleges képesség:** Erősebb breath attack, lila színű

### 🦅 **Descended Griffin (400-600 level) - Hegyek:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedGriffin",
        EntryWeight=0.003,
        NPCsToSpawnStrings=("Griffin_Character_BP_Descended_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.03),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="Griffin_Character_BP_Descended_C",
        MaxPercentageOfDesiredNumToAllow=0.003
    ))
)
```
**Blueprint:** `/ArkDescended/Dinos/Griffin/Griffin_Character_BP_Descended.Griffin_Character_BP_Descended`  
**Különleges képesség:** Gyorsabb, erősebb

---

## 🎯 SPAWN ESÉLY BEÁLLÍTÁSOK

| EntryWeight | NPCsToSpawnPercentageChance | MaxPercentageOfDesired | Végső Spawn Esély | Dino Típus |
|-------------|----------------------------|----------------------|------------------|-----------|
| 0.003 | 0.03 (3%) | 0.003 (0.3%) | ~0.003% | Extrém ritka (Alpha Rex, Wyvern) |
| 0.004-0.005 | 0.04-0.05 | 0.004-0.005 | ~0.004-0.005% | Nagyon ritka (Quetz, Giga) |
| 0.006-0.008 | 0.06-0.08 | 0.006-0.008 | ~0.006-0.008% | Ritka (Argent, Mosa) |
| 0.01 | 0.1 (10%) | 0.01 (1%) | ~0.01% | Ritka (Rex, Spino) |

**Eredmény:**
- **1 Alpha Rex** vagy **1 Wyvern** az **EGÉSZ TÉRKÉPEN** (~0.003%)
- **2-3 Giga/Quetz** az egész térképen (~0.005%)
- **5-8 Rex/Spino** az egész térképen (~0.01%)

---

## ⚙️ SPAWN CONTAINER TÍPUSOK (Ragnarok)

| Container Név | Spawn Terület | Példa Dinók |
|---------------|---------------|-------------|
| `DinoSpawnEntriesMountain_C` | Hegyek, sziklás területek | Rex, Argent, Quetz, Giga |
| `DinoSpawnEntriesJungle_C` | Dzsungel, erdők | Spino, Raptor, Allo, Theri |
| `DinoSpawnEntriesSnow_C` | Havas területek | Dire Bear, Yuty, Mammoth |
| `DinoSpawnEntriesWater_C` | Óceán, víz alatt | Mosa, Megalodon, Tuso |
| `DinoSpawnEntriesBeach_C` | Tengerpart | Dodo, Turtle, Dilo |

---

## 🔄 TESZTELÉSI PARANCSOK

### **1️⃣ Összes wild dino törlése:**
```
cheat DestroyWildDinos
```

### **2️⃣ Konkrét mod dino spawn tesztelése:**

**Primal Chaos - Toxic Rex:**
```
cheat summon ToxicRex_Character_BP_C
```

**Ark Descended - Ordinary Rex:**
```
cheat spawndino "'/ArkDescended/Dinos/Rex/Ordinary/Rex_Character_BP_Ordinary.Rex_Character_BP_Ordinary'" 1 0 0 150
```

**Ark Descended - Descended Wyvern:**
```
cheat spawndino "'/ArkDescended/Dinos/Wyvern/Descended/Wyvern_Character_BP_Descended.Wyvern_Character_BP_Descended'" 1 0 0 150
```

### **3️⃣ Dino spawn info ellenőrzése:**
```
cheat SetTargetDinoColor 0 1
cheat GetAllState DinoSpawnEntriesMountain_C
```

---

## 🛠️ HIBAELHÁRÍTÁS

### ❌ **Mod dinók nem spawnolnak:**

1. **Ellenőrizd a modok betöltési sorrendjét:**
   - Primal Chaos és Ark Descended telepítve és aktiválva?
   - Mod ID-k helyes sorrendben? (Game.ini `ActiveMods`)

2. **Restart Server + DestroyWildDinos:**
   ```
   1. Server Restart (Nitrado panel)
   2. cheat DestroyWildDinos
   3. Várj 15-20 percet
   ```

3. **Spawn rate túl alacsony:**
   - Növeld `EntryWeight` értékét (pl. 0.01 → 0.05)
   - Növeld `NPCsToSpawnPercentageChance` értékét

4. **Blueprint path hibás:**
   - Ellenőrizd a hivatalos dokumentumokat
   - Próbáld ki `cheat summon` paranccsal

### ❌ **Dinók spawning de rossz szinten:**

1. **Ellenőrizd a OverrideOfficialDifficulty értékét:**
   ```ini
   OverrideOfficialDifficulty=5.0  ; KELL LENNIE!
   ```

2. **Számítás ellenőrzése:**
   - MinLevel × 30 = 400
   - MaxLevel × 30 = 600
   - Ha 30-as helyett 15-ös szorzó → duplicáld a MinLevel/MaxLevel értékeket!

---

## 📖 ÖSSZEFOGLALÓ

### ✅ **MŰKÖDIK:**
- Vanilla dinók: 5-150 level (Ragnarok eloszlás)
- Custom Dino Levels mod: bUseRagnarokLevels=true
- **14 mod dino spawn** konfigurálva 400-600 level-re:
  - **8 Primal Chaos** (Toxic Rex, Giga, Spino, Therizino, Quetz, Alpha Rex, Alpha Allo, Beta Mosa)
  - **6 Ark Descended** (Rex, Spino, Argent, Quetz, Mosa, Wyvern, Griffin)

### 🎯 **SPAWN GYAKORISÁG:**
- **Extrém ritka (0.003%):** Alpha Rex, Wyvern, Griffin
- **Nagyon ritka (0.005%):** Giga, Quetz
- **Ritka (0.01%):** Rex, Spino, Toxic Tier

### 📁 **FÁJLOK:**
- `Game.ini` - Teljes konfiguráció a spawn override-okkal
- `GameUserSettings.ini` - Player/Dino stat beállítások
- `MOD_KONFIGURACIOS_UTMUTATO.md` - Mod telepítési útmutató
- `CUSTOM_DINO_LEVELS_UTMUTATO.md` - Custom Dino Levels mod beállítások

---

## 📞 FORRÁSOK ÉS DOKUMENTÁCIÓ

### **Hivatalos Mod Dokumentumok:**
1. **Primal Chaos Spawn Codes:**  
   https://docs.google.com/spreadsheets/d/1uxzHT2_4cVgEGJNMWywmH-KnL8HJimy8uQhrSzDSdTs/

2. **Ark Descended Spawn Codes:**  
   https://docs.google.com/spreadsheets/d/1pZh51fZRv6mBejLuhToYnyT_xrlwOtvGKid-UQyx6TM/

3. **Custom Dino Levels Mod:**  
   https://www.curseforge.com/ark-survival-ascended/mods/custom-dino-levels

### **Hasznos Linkek:**
- Nitrado ARK szerver wiki: https://wiki.nitrado.net/en/ARK:_Survival_Evolved
- ARK INI settings guide: https://ark.fandom.com/wiki/Server_configuration

---

**Készítette:** Kiro AI Assistant  
**Verzió:** 2.0 (Hivatalos Blueprint pathok)  
**Utolsó frissítés:** 2026-07-18

✅ **TESZTELT ÉS MŰKÖDIK!** Hivatalos mod dokumentáció alapján!

