# DLC Lények Spawn-olása ARK Ascended Ragnarok Szerveren

## 📋 Áttekintés

Ez az útmutató bemutatja, hogyan add hozzá a fizetős DLC-kben található lényeket a Ragnarok térképedhez.

⚠️ **FONTOS:** A DLC-ket meg kell vásárolnod, hogy használhasd (háziasítás, breeding) a lényeket! A spawn konfiguráció vagy mod csak a megjelenést teszi lehetővé.

---

## 🎯 Ajánlott Módszer: DLC Spawns Mod

### Miért ezt válaszd?
- ✅ **Egyszerű telepítés** - 2 perc alatt kész
- ✅ **Automatikus frissítések** - nem kell kézzel karbantartani
- ✅ **Optimalizált spawn súlyok** - kiegyensúlyozott játékmenet
- ✅ **Minden DLC támogatott** - Scorched Earth, Aberration, Extinction, Genesis, Fjordur, stb.

### Telepítés Lépései:

1. **Nitrado Control Panel** → **Mods** menüpont
2. Keresés: **"DLC Spawns"**
3. Kattints az **"Install"** gombra
4. Várj, amíg a státusz **"Installed"** lesz
5. **Indítsd újra a szervert**
6. Játékban add ki ezt a parancsot (admin):
   ```
   destroywilddinos
   ```
   (Ez 5-10 perc alatt újra spawn-olja az összes wild dinót az új listával)

### Alternatív Modok:

| Mod Név | Leírás | Link |
|---------|--------|------|
| **DLC Spawns** | Általános DLC lény spawn (összes térkép) | [CurseForge](https://www.curseforge.com/ark-survival-ascended/mods/dlc-spawns) |
| **More Creature Spawns** | The Island-re optimalizált spawn bővítés | [CurseForge](https://www.curseforge.com/ark-survival-ascended/mods/more-creature-spawns) |
| **United Arks** | Vízi lények minden térképre | [CurseForge](https://www.curseforge.com/ark-survival-ascended/mods/united-arks) |
| **Creature Spawns (Oasisaur)** | Csak az Oasisaur spawn-olása | [CurseForge](https://www.curseforge.com/ark-survival-ascended/mods/creature-spawns-oasisaur) |

---

## 🛠️ Alternatív Módszer: Manuális Konfiguráció

Ha nem akarsz modot használni, vagy finomhangolni szeretnéd a spawn-okat, ezt a módszert válaszd.

### Előkészületek:

A repository `Game.ini` fájlja már tartalmaz **előre elkészített spawn konfigurációkat** az alábbi DLC lényekhez:

#### 🏜️ Scorched Earth DLC Lények:
- **Wyvern** (Lightning, Fire, Poison)
- **Rock Elemental**
- **Mantis**
- **Thorny Dragon**

#### 🌌 Aberration DLC Lények:
- **Ravager**
- **Rock Drake**
- **Reaper**

#### 🦖 Extinction DLC Lények:
- **Gacha**
- **Managarmr**
- **Velonasaur**

#### 🌊 Genesis DLC Lények:
- **Magmasaur**
- **Bloodstalker**
- **Astrocetus** (Space Whale)

#### ❄️ Fjordur DLC Lények:
- **Fenrir**
- **Andrewsarchus**

### Aktiválás Lépései:

1. **Nyisd meg** a `Game.ini` fájlt egy szövegszerkesztőben
2. **Keresd meg** a `; === DLC LÉNYEK HOZZÁADÁSA (Opcionális) ===` részt
3. **Választott lények aktiválása:**
   - A sorban lévő `;` karakter **kommentezi ki** a kódot
   - **Távolítsd el a `;`** karaktert a sor elejéről
   - Például: 
     ```ini
     ; ConfigAddNPCSpawnEntriesContainer=(...)  ← KI van kapcsolva
     ConfigAddNPCSpawnEntriesContainer=(...)    ← BE van kapcsolva
     ```

4. **Példa - Wyvern aktiválása:**

   **ELŐTTE (kikapcsolt):**
   ```ini
   ; ConfigAddNPCSpawnEntriesContainer=(NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",NPCSpawnEntries=((AnEntryName="Wyvern_Lightning",EntryWeight=0.05,NPCsToSpawnStrings=("Wyvern_Character_BP_Lightning_C"))),NPCSpawnLimits=((NPCClassString="Wyvern_Character_BP_Lightning_C",MaxPercentageOfDesiredNumToAllow=0.05)))
   ```

   **UTÁNA (bekapcsolt):**
   ```ini
   ConfigAddNPCSpawnEntriesContainer=(NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",NPCSpawnEntries=((AnEntryName="Wyvern_Lightning",EntryWeight=0.05,NPCsToSpawnStrings=("Wyvern_Character_BP_Lightning_C"))),NPCSpawnLimits=((NPCClassString="Wyvern_Character_BP_Lightning_C",MaxPercentageOfDesiredNumToAllow=0.05)))
   ```

5. **Mentsd el** a fájlt
6. **Töltsd fel** a Nitrado szerverre (lásd főbb útmutató)
7. **Indítsd újra** a szervert
8. **Játékban** add ki: `destroywilddinos`

---

## 📊 Spawn Súlyok és Biome-ok

### EntryWeight (Spawn Súly):
- **0.01-0.03** = Nagyon ritka (Boss-tier lények)
- **0.04-0.07** = Ritka (Különleges lények)
- **0.08-0.15** = Közepes gyakoriság
- **0.15+** = Gyakori

### Spawn Területek (Ragnarok):

| Spawn Class String | Terület |
|--------------------|---------|
| `DinoSpawnEntriesGrassland_C` | Füves területek (Highland, síkság) |
| `DinoSpawnEntriesMountain_C` | Hegyi területek (Volcano, csúcsok) |
| `DinoSpawnEntriesSnow_C` | Havas területek (Murder Snow) |
| `DinoSpawnEntriesDesert_C` | Sivatag (Southwest Canyon) |
| `DinoSpawnEntriesSwamp_C` | Mocsaras területek |
| `DinoSpawnEntriesOcean_C` | Óceán (mélytenger) |
| `DinoSpawnEntriesCave_C` | Barlangok |
| `DinoSpawnEntriesVolcano_C` | Vulkáni területek |

---

## 🔧 Példa Spawn Konfiguráció Részletesen

### Lightning Wyvern Hozzáadása:

```ini
ConfigAddNPCSpawnEntriesContainer=(
    NPCSpawnEntriesContainerClassString="DinoSpawnEntriesMountain_C",
    NPCSpawnEntries=((
        AnEntryName="Wyvern_Lightning",
        EntryWeight=0.05,
        NPCsToSpawnStrings=("Wyvern_Character_BP_Lightning_C")
    )),
    NPCSpawnLimits=((
        NPCClassString="Wyvern_Character_BP_Lightning_C",
        MaxPercentageOfDesiredNumToAllow=0.05
    ))
)
```

#### Magyarázat:
- **NPCSpawnEntriesContainerClassString**: Hol spawn-oljon (hegyi területek)
- **AnEntryName**: A spawn bejegyzés neve (tetszőleges)
- **EntryWeight**: Spawn esély súlya (0.05 = 5% esély)
- **NPCsToSpawnStrings**: A lény Blueprint osztálya
- **MaxPercentageOfDesiredNumToAllow**: Maximum ennyit engedélyez az összes dino százalékából

---

## 🎮 Spawn Tesztelés

### 1. Admin Parancsok:

```bash
# Összes wild dino törlése és újra spawn
destroywilddinos

# Teleportálás egy adott lényhez (pl. Wyvern)
TPToPlayer Wyvern_Character_BP_Lightning_C

# Lény spawn-olása magadnál (teszteléshez)
summon Wyvern_Character_BP_Lightning_C
```

### 2. Spawn Ellenőrzés:

1. Adminként menj a megfelelő biome-ba (pl. hegyi terület Wyvern-hez)
2. Várj 5-10 percet (spawn ciklusok)
3. Repülj körbe és keresd a DLC lényeket
4. Ha nem spawn-ol:
   - Ellenőrizd a `Game.ini` szintaxisát (nincs extra karakter?)
   - Add ki újra: `destroywilddinos`
   - Nézd meg a szerver log-ot hibákért

---

## ⚠️ Gyakori Hibák és Megoldások

### ❌ Probléma: A DLC lények nem spawn-olnak

**Megoldás 1:** Ellenőrizd, hogy megvetted-e a DLC-t
- A lények csak akkor spawn-olnak, ha a szerver tulajdonosának van DLC-je
- Alternatíva: Használj modot (nem igényel DLC-t a spawn-hoz)

**Megoldás 2:** Szintaxis hiba a Game.ini-ben
```ini
# ROSSZ (hiányzó zárójel):
ConfigAddNPCSpawnEntriesContainer=(NPCSpawnEntriesContainerClassString="..."

# JÓ (minden zárójel megvan):
ConfigAddNPCSpawnEntriesContainer=(NPCSpawnEntriesContainerClassString="...",NPCSpawnEntries=(...))
```

**Megoldás 3:** Túl sok spawn konfiguráció
- Ha túl sok DLC lényt adsz hozzá, ütközhetnek
- Kezdd kevesebb lénnyel (5-10), majd bővítsd fokozatosan

### ❌ Probléma: A lények spawn-olnak, de nem tudom háziasítani

**OK:** Nincs megvásárolva a DLC
- A spawn konfiguráció vagy mod csak a megjelenést teszi lehetővé
- A háziasításhoz, breedinghez, használathoz **meg kell venni a DLC-t**!

### ❌ Probléma: A szerver crashel a spawn konfiguráció után

**Megoldás:**
1. Távolítsd el az utoljára hozzáadott spawn sorokat
2. Teszteld egyesével a spawn-okat
3. Ellenőrizd a szerver log-ot a pontos hibáért
4. Használj inkább modot (stabilabb)

---

## 📝 Blueprint Class Lista (Referencia)

### Scorched Earth:
```
Wyvern_Character_BP_Lightning_C    # Lightning Wyvern
Wyvern_Character_BP_Fire_C         # Fire Wyvern
Wyvern_Character_BP_Poison_C       # Poison Wyvern
RockGolem_Character_BP_C           # Rock Elemental
Mantis_Character_BP_C              # Mantis
SpineyLizard_Character_BP_C        # Thorny Dragon
Camelsaurus_Character_BP_C         # Morellatops
```

### Aberration:
```
CaveWolf_Character_BP_C            # Ravager
RockDrake_Character_BP_C           # Rock Drake
Xenomorph_Character_BP_Male_C      # Reaper King
LanternGoat_Character_BP_C         # Shinehorn
LanternBird_Character_BP_C         # Featherlight
```

### Extinction:
```
Gacha_Character_BP_C               # Gacha
IceJumper_Character_BP_C           # Managarmr
Spindles_Character_BP_C            # Velonasaur
Owl_Character_BP_C                 # Snow Owl
Enforcer_Character_BP_C            # Enforcer
```

### Genesis:
```
Cherufe_Character_BP_C             # Magmasaur
BogSpider_Character_BP_C           # Bloodstalker
SpaceWhale_Character_BP_C          # Astrocetus
VRMainBoss_Character_BP_C          # VR Boss (X-creatures)
```

### Fjordur:
```
Fenrir_Character_BP_C              # Fenrir
Andrewsarchus_Character_BP_C       # Andrewsarchus
Desmodus_Character_BP_C            # Desmodus
```

### Lost Island / Lost Colony:
```
Dinopithecus_Character_BP_C        # Dinopithecus
Amargasaurus_Character_BP_C        # Amargasaurus
Sinomacrops_Character_BP_C         # Sinomacrops
```

---

## 🆘 További Segítség

### Hasznos Linkek:
- **ARK Wiki - Spawn Entries:** https://ark.wiki.gg/wiki/Spawn_entries
- **ARK IDs - Creature List:** https://arkids.net/creatures
- **CurseForge Mods:** https://www.curseforge.com/ark-survival-ascended/mods

### Közösségi Támogatás:
- **ARK Reddit:** r/ARK, r/playark
- **ARK Discord:** https://discord.gg/playark
- **Steam Közösség:** ARK: Survival Ascended Hub

---

## ✅ Gyors Ellenőrző Lista

- [ ] Eldöntöttem: Mod vagy Manuális konfiguráció?
- [ ] Ha mod: Telepítve a "DLC Spawns" mod
- [ ] Ha manuális: Game.ini módosítva és feltöltve
- [ ] Szerver újraindítva
- [ ] `destroywilddinos` parancs kiadva
- [ ] Megfelelő biome-ban kerestem (pl. hegyek = Wyvern)
- [ ] Ellenőriztem a spawn-okat 10-15 perc várakozás után
- [ ] Ha nem működik: Szerver log ellenőrzése

---

**Jó játékot és jó vadászatot a DLC lényekre! 🦖✨**
