# 🦖 MOD DINO LEVEL BEÁLLÍTÁSOK
## Primal Chaos & Ark Descended - 400-600 Level Wild Dinók

---

## ⚠️ FONTOS FIGYELMEZTETÉS!

A jelenlegi konfiguráció **PÉLDA alapú**, mert:
1. ❌ **NEM ismerjük a pontos Blueprint class stringeket** a Primal Chaos és Ark Descended dinókhoz
2. ❌ **Ezek a modok NEM publikálják a spawn class neveket** a dokumentációjukban
3. ⚠️ **Tesztelni kell játékban**, hogy működnek-e

---

## 📊 JELENLEGI LEVEL BEÁLLÍTÁSOK

| Dino Típus | Wild Level | Spawn Esély | Tamed Max |
|------------|------------|-------------|-----------|
| **Vanilla dinók** | 5-150 | Ragnarok (több high-level) | ~900 |
| **Primal Chaos** | 400-600 | Nagyon ritka (0.5-1%) | ~1200+ |
| **Ark Descended** | 400-600 | Nagyon ritka (0.5-1%) | ~1200+ |

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
- **RITKA SPAWN:** 0.5-1% esély

---

## ⚙️ SPAWN OVERRIDE PÉLDÁK (Game.ini)

### 🔴 **Primal Chaos Alpha Rex (400-600 level):**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="PrimalChaosAlphaRex",
        EntryWeight=0.01,
        NPCsToSpawnStrings=("PrimalChaos_AlphaRex_Character_BP_C"),
        NPCsToSpawnPercentageChance=(0.1),
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="PrimalChaos_AlphaRex_Character_BP_C",
        MaxPercentageOfDesiredNumToAllow=0.01
    ))
)
```

**Paraméterek magyarázata:**
- `EntryWeight=0.01` → **1% spawn súly** (nagyon ritka)
- `NPCsToSpawnPercentageChance=(0.1)` → **10% esély** ezen belül is
- `MaxPercentageOfDesiredNumToAllow=0.01` → Max **1%** a populációból

**Végső spawn esély:** ~0.01% (nagyon ritka!)

---

## 🎯 SPAWN ESÉLY BEÁLLÍTÁSOK

| EntryWeight | Spawn Gyakoriság | Leírás |
|-------------|------------------|---------|
| 0.001-0.01 | Nagyon ritka | 1 dino / térkép (~0.1-1%) |
| 0.01-0.05 | Ritka | 5-10 dino / térkép (1-5%) |
| 0.05-0.1 | Közepes ritka | 10-20 dino / térkép (5-10%) |
| 0.1-0.5 | Gyakori | 50+ dino / térkép (10-50%) |
| 0.5-1.0 | Nagyon gyakori | 100+ dino / térkép (50-100%) |

---

## ⚠️ PROBLÉMA: BLUEPRINT CLASS NEVEK HIÁNYOZNAK!

### ❌ **Mi a probléma?**
Nem ismerjük a **pontos class stringeket** a mod dinókhoz!

**Példák (LEHET HOGY ROSSZ!):**
```
PrimalChaos_AlphaRex_Character_BP_C   ❓ Nem biztos
PrimalChaos_Giga_Character_BP_C       ❓ Nem biztos
ArkDescended_Rex_Character_BP_C       ❓ Nem biztos
ArkDescended_Wyvern_Character_BP_C    ❓ Nem biztos
```

### ✅ **MEGOLDÁS: Blueprint neveket kell találni!**

#### **1. Módszer: Spawn paranccsal tesztelés**
```
cheat spawndino "Blueprint'/Game/...' [...]" 1 1 1 150
```
Ha működik → Ez a helyes class string!

#### **2. Módszer: Mod dokumentáció**
- Nézd meg a CurseForge mod oldalt
- Keresd meg a "Spawn Codes" részt
- Vagy Discord-on kérdezd meg a mod készítőt

#### **3. Módszer: Admin Spawner mod**
Telepíts egy "Dino Spawner" modot, amely kilistázza az összes dino class nevet!

---

## 🛠️ HOGYAN TALÁLD MEG A HELYES CLASS STRINGEKET?

### **1️⃣ Primal Chaos Spawn Codes:**

Keress rá Google-ben:
```
"Ark Primal Chaos" spawn codes blueprint
```

**VAGY** nézd meg a CurseForge oldalt:
https://www.curseforge.com/ark-survival-ascended/mods/ark-primal-chaos

### **2️⃣ Ark Descended Spawn Codes:**

Már találtam egy dokumentumot! 🎉
https://www.scribd.com/document/758390132/SpawnCodes-ArkDescended

**Példa Ark Descended spawn kód:**
```
cheat spawndino "'/ArkDescended/Dinos/DireBear/Ordinary/Direbear_Character_BP_Ordinary.Direbear_Character_BP_Ordinary'" 1 1 1 150
```

**Blueprint string:**
```
/ArkDescended/Dinos/DireBear/Ordinary/Direbear_Character_BP_Ordinary_C
```

---

## 📝 LÉPÉSEK A HELYES KONFIGURÁCIÓ ELKÉSZÍTÉSÉHEZ

### **1️⃣ Spawn kódok beszerzése:**
- Primal Chaos: Discord / CurseForge
- Ark Descended: Scribd dokumentum (lásd fent)

### **2️⃣ Blueprint string kinyerése:**
```
Spawn kód:
cheat spawndino "'/Mod/Path/Dino_BP.Dino_BP'" 1 1 1 150

Blueprint string (Game.ini-hez):
/Mod/Path/Dino_BP_C
```
**Fontos:** Add hozzá a `_C` végződést!

### **3️⃣ Game.ini frissítése:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="ModDinoName",
        EntryWeight=0.01,
        NPCsToSpawnStrings=("/Mod/Path/Dino_BP_C"),
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    ))
)
```

### **4️⃣ Tesztelés:**
```
1. Töltsd fel a Game.ini-t
2. Restart Server
3. DestroyWildDinos
4. Várj 10-15 percet
5. Keress rá a mod dinókra
```

---

## 🎮 PÉLDA: ARK DESCENDED DIRE BEAR (400-600 level)

**Spawn kód (Scribd dokumentumból):**
```
cheat spawndino "'/ArkDescended/Dinos/DireBear/Ordinary/Direbear_Character_BP_Ordinary.Direbear_Character_BP_Ordinary'" 1 1 1 150
```

**Game.ini konfiguráció:**
```ini
ConfigOverrideNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesSnow_C",
    NPCSpawnEntries=((
        AnEntryName="ArkDescendedDireBear400",
        EntryWeight=0.02,
        NPCsToSpawnStrings=("/ArkDescended/Dinos/DireBear/Ordinary/Direbear_Character_BP_Ordinary_C"),
        NPCsSpawnOffsets=((X=0.0,Y=0.0,Z=0.0)),
        NPCsToSpawnPercentageChance=(0.2),
        ManualSpawnPointSpreadRadius=650.0,
        NPCDifficultyLevelRangeOverride=(MinLevel=13.33,MaxLevel=20.0)
    )),
    NPCSpawnLimits=((
        NPCClassString="/ArkDescended/Dinos/DireBear/Ordinary/Direbear_Character_BP_Ordinary_C",
        MaxPercentageOfDesiredNumToAllow=0.02
    ))
)
```

**Eredmény:**
- Ark Descended Dire Bear spawnol havas területeken
- Level: 400-600
- Spawn esély: ~2% (ritka)

---

## 🔄 ALTERNATÍV MEGOLDÁS: CONFIGURATION TOOLKIT MOD

Ha a spawn override túl bonyolult, használd a **Configuration Toolkit** modot!

**Mod ID:** Keresés: "Configuration Toolkit" CurseForge

**Előnyök:**
- ✅ Egyszerűbb konfiguráció
- ✅ Mod-specifikus remapping
- ✅ Level range beállítás támogatva

**Hátrány:**
- ❌ Plusz mod telepítése szükséges

---

## ⚙️ ARK DESCENDED MOD BEÁLLÍTÁSOK

Az Ark Descended modnak vannak saját INI beállításai (már hozzáadva a Game.ini-hez):

```ini
[ArkDescended]
PickHarvestRate=5                  ; Pickaxe hatékonyság (1-5)
HatchetHarvestRate=5               ; Hatchet hatékonyság (1-5)
RocketSingularity=True             ; Rocket singularity engedélyezése
GalaxySingularitySmall=True        ; Kis galaxy singularity
GalaxySingularityLarge=True        ; Nagy galaxy singularity
DragonSingularity=False            ; Dragon singularity (kikapcsolva crashek miatt)
BossBattleMusic=False              ; Boss battle zene (kikapcsolva)
EternalSwordInfiniteHealth=True    ; Eternal Sword végtelen HP
WarGenUnbreakable=True             ; War Generator eltörhetetlen
TekShieldHealthMulti=1             ; Tek shield HP szorzó (0.1-10)
LARexGravityRoar=True              ; LA Rex gravity roar
EnableUltimateMinions=True         ; Ultimate minions engedélyezése
```

---

## 📖 ÖSSZEFOGLALÓ

### ✅ **MŰKÖDIK:**
- Vanilla dinók: 5-150 level (Ragnarok eloszlás)
- Custom Dino Levels mod telepítve

### ⚠️ **TESZTELNI KELL:**
- Primal Chaos dinók 400-600 level spawn
- Ark Descended dinók 400-600 level spawn
- Blueprint class stringek helyességét

### 🔍 **KÖVETKEZŐ LÉPÉSEK:**
1. Keress rá a Primal Chaos spawn kódokra (Discord/CurseForge)
2. Ellenőrizd az Ark Descended spawn kódokat (Scribd doc)
3. Javítsd a Game.ini-ben a Blueprint stringeket
4. Teszteld játékban
5. Ha nem működik → Configuration Toolkit mod telepítése

---

## 📞 SEGÍTSÉG

Ha nem találod a spawn kódokat:
1. **Primal Chaos Discord:** Kérdezd meg a mod készítőt
2. **Ark Descended Scribd:** https://www.scribd.com/document/758390132/SpawnCodes-ArkDescended
3. **CurseForge kommentek:** Nézd meg más játékosok kérdéseit

---

**Készítette:** Kiro AI Assistant  
**Verzió:** 1.0  
**Utolsó frissítés:** 2026-07-18

**FONTOS:** Ez egy kiindulási pont! A blueprint stringeket TESZTELNI és JAVÍTANI kell!
