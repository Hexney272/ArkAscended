# Nitrado JSON Import Útmutató

## 📋 Áttekintés

Ez az útmutató segít a szerver beállítások importálásában a Nitrado "General" fülön keresztül JSON formátumban.

---

## 📦 Elérhető Fájlok

| Fájl | Leírás | Használat |
|------|--------|-----------|
| **nitrado_settings.json** | Főbb szerver beállítások | Nitrado General → Import Settings |
| **GameUserSettings.ini** | Teljes INI fájl | Kézi feltöltés File Browser-rel |
| **Game.ini** | Mod konfigurációk | Kézi feltöltés File Browser-rel |

---

## 🚀 Módszer 1: JSON Import (GYORS - Ajánlott)

### Lépések:

1. **Töltsd le** a `nitrado_settings.json` fájlt a repository-ból
2. **Módosítsd** a fájlban:
   ```json
   "ServerAdminPassword": "IDE_ÍRD_A_JELSZAVAD",
   "ServerName": "A_SZERVERED_NEVE"
   ```

3. **Nitrado Control Panel:**
   - Jelentkezz be: https://server.nitrado.net
   - Válaszd ki az ARK: Survival Ascended szervert
   - Menj a **"General"** (Általános) fülre

4. **Import Settings:**
   - Keresd meg az **"Import Settings"** vagy **"Import Configuration"** gombot
   - Kattints rá
   - **"Choose File"** → Válaszd ki a `nitrado_settings.json` fájlt
   - Kattints az **"Import"** gombra

5. **Ellenőrzés:**
   - Görgess végig a General fülön
   - Ellenőrizd a főbb beállításokat (XP: 50x, Taming: 50x, stb.)
   - **Mentsd el** a változtatásokat

6. **Szerver újraindítás:**
   - Dashboard → **"Restart"**
   - Várj 5-10 percet

### ⚠️ Fontos Megjegyzések JSON Importnál:

- ✅ **NEM minden beállítás** kerül importálásra
- ✅ A Nitrado **csak a General fülön látható opciókat** importálja
- ❌ Komplex array értékek (pl. `HarvestResourceItemAmountClassMultipliers`) **NEM kerülnek át**
- ❌ A `Game.ini` beállítások **NEM importálhatók** JSON-nel

**Ezért javasolt:** JSON import + kézi INI feltöltés kombinálása!

---

## 🛠️ Módszer 2: Kézi INI Feltöltés (TELJES)

Ha minden beállítást át akarsz vinni (beleértve a komplex értékeket is):

### Lépések:

1. **Töltsd le** mindkét INI fájlt:
   - `GameUserSettings.ini`
   - `Game.ini`

2. **Módosítsd** a `GameUserSettings.ini` fájlt:
   ```ini
   ServerAdminPassword=IDE_ÍRD_A_JELSZAVAD
   ServerName=A_SZERVERED_NEVE
   ```

3. **Nitrado Control Panel:**
   - **"File Browser"** vagy **"Tools" → "File Browser"**
   - Navigálj ide:
     ```
     /games/ni123456789_1/noftp/arksa/ShooterGame/Saved/Config/WindowsServer/
     ```

4. **Töröld a régi fájlokat:**
   - Jelöld ki a régi `GameUserSettings.ini`-t → **Delete**
   - Jelöld ki a régi `Game.ini`-t → **Delete**

5. **Töltsd fel az új fájlokat:**
   - **"Upload"** gomb
   - Válaszd ki a `GameUserSettings.ini` fájlt → Feltöltés
   - **"Upload"** gomb
   - Válaszd ki a `Game.ini` fájlt → Feltöltés

6. **Szerver újraindítás:**
   - Dashboard → **"Stop"** (várj 30 mp)
   - Dashboard → **"Start"**

---

## 📊 JSON Import vs. INI Feltöltés Összehasonlítás

| Szempontok | JSON Import | INI Feltöltés |
|------------|-------------|---------------|
| **Sebesség** | ⚡ Gyors (2 perc) | 🐌 Lassabb (5 perc) |
| **Egyszerűség** | ✅ Egyszerű | ⚠️ Közepes |
| **Teljesség** | ⚠️ Csak alapvető beállítások | ✅ Minden beállítás |
| **Array értékek** | ❌ Nem támogatott | ✅ Támogatott |
| **Game.ini** | ❌ Nem importálható | ✅ Feltölthető |
| **Ajánlott** | Gyors teszteléshez | Végleges setuphoz |

---

## 🎯 Ajánlott Megoldás (HIBRID)

### Legjobb Stratégia:

1. **JSON Import először** → Gyors alap konfiguráció
2. **INI Feltöltés utána** → Teljes finomhangolás
3. **Modok telepítése** → Nitrado Mods menü
4. **Szerver indítás** → Tesztelés

**Miért?**
- ✅ JSON gyorsan beállítja az alapokat
- ✅ INI feltöltés biztosítja a komplex értékeket
- ✅ Minden konfiguráció 100%-ban átmegy

---

## 📝 JSON Fájl Tartalom Magyarázat

A `nitrado_settings.json` fájl az alábbi főbb beállításokat tartalmazza:

### 🎮 Alapvető Beállítások:
- ServerName
- ServerPassword / ServerAdminPassword
- MaxPlayers (70)
- ServerPVE (true)
- MapName (Ragnarok)

### 🦖 Nehézség és Dinók:
- OverrideOfficialDifficulty: **30.0** (900 max dino level)
- DifficultyOffset: 1.0
- DinoCountMultiplier: 1.5

### 📈 XP Szorzók (x50):
- XPMultiplier: **50.0**
- KillXPMultiplier: 1.5
- HarvestXPMultiplier: 1.5
- CraftXPMultiplier: 2.0

### 🌾 Gyűjtés (x50):
- HarvestAmountMultiplier: **50.0**
- HarvestHealthMultiplier: 3.0
- ResourcesRespawnPeriodMultiplier: 0.3

### 🦕 Háziasítás (x50):
- TamingSpeedMultiplier: **50.0**
- DinoCharacterFoodDrainMultiplier: 2.0
- WildDinoCharacterFoodDrainMultiplier: 3.0

### 👶 Tenyésztés (x50):
- MatingIntervalMultiplier: 0.02
- EggHatchSpeedMultiplier: **50.0**
- BabyMatureSpeedMultiplier: **50.0**
- BabyImprintAmountMultiplier: **50.0**

### 💪 Player Stats (Megnövelt):
- PerLevelStatsMultiplier_Player[0-11]: 1.0-5.0
  - Health: 3x
  - Stamina: 3x
  - Weight: 5x
  - Damage: 3x
  - Speed: 2x

### 🦖 Dino Stats (Háziasított):
- PerLevelStatsMultiplier_DinoTamed[0-11]: 1.0-2.0
  - Health: 2x
  - Stamina: 2x
  - Damage: 2x

### 🏗️ Építmények (PvE):
- StructureResistanceMultiplier: 2.0
- PvEStructureDecayPeriodMultiplier: 5.0
- MaxStructuresInRange: 10500
- MaxPlatformSaddleStructureLimit: 500

### 🎁 Loot és Egyéb:
- SupplyCrateLootQualityMultiplier: 3.0
- CropGrowthSpeedMultiplier: 10.0
- CustomRecipeEffectivenessMultiplier: 2.0

---

## ⚠️ Hibaelhárítás

### ❌ Probléma: "Invalid JSON format" hiba

**Megoldás:**
1. Nyisd meg a JSON fájlt egy text editorban (Notepad++)
2. Ellenőrizd, hogy nincs-e:
   - Extra vessző az utolsó sor végén
   - Hiányzó idézőjel (`"`)
   - Hibás karakter (pl. speciális magyar betűk)
3. Használj JSON validátort: https://jsonlint.com/
4. Javítsd a hibákat és próbáld újra

### ❌ Probléma: Import sikeres, de a beállítások nem változtak

**OK:** A Nitrado cache-eli a beállításokat

**Megoldás:**
1. Import után **mentsd el** a General fül alján
2. **Szerver újraindítás**
3. Ha még mindig nem működik: használd az INI feltöltést

### ❌ Probléma: Néhány beállítás hiányzik

**OK:** A JSON import nem támogat minden beállítást

**Megoldás:**
1. Használd a **Hibrid módszert**:
   - JSON import az alapokhoz
   - INI feltöltés a komplexekhez
2. Vagy csak az **INI feltöltést** használd

### ❌ Probléma: "File not found" hiba feltöltésnél

**Megoldás:**
1. Ellenőrizd a fájl elérési útját
2. Navigálj a helyes mappába:
   ```
   /games/ni123456789_1/noftp/arksa/ShooterGame/Saved/Config/WindowsServer/
   ```
3. Ha a mappa nem létezik, **indítsd el egyszer a szervert**, hogy létrejöjjön

---

## 📚 További Információk

### Hasznos Linkek:
- **Nitrado Support:** https://support.nitrado.net/
- **JSON Validator:** https://jsonlint.com/
- **ARK Wiki - Server Config:** https://ark.wiki.gg/wiki/Server_configuration

### Repository Fájlok:
- `nitrado_settings.json` - JSON import fájl
- `GameUserSettings.ini` - Teljes INI konfiguráció
- `Game.ini` - Mod és extra beállítások
- `NITRADO_TELEPITESI_UTMUTATO.md` - Teljes telepítési útmutató

---

## ✅ Gyors Ellenőrző Lista

### JSON Import Előtt:
- [ ] `nitrado_settings.json` letöltve
- [ ] Admin jelszó módosítva a JSON-ben
- [ ] Szerver név módosítva (opcionális)
- [ ] JSON validálva (jsonlint.com)

### Import Után:
- [ ] General fül megnyitva
- [ ] Beállítások ellenőrizve (XP: 50x, stb.)
- [ ] Változások mentve
- [ ] Szerver újraindítva
- [ ] Játékban tesztelve (wild dino szint ~900)

### Teljes Setup:
- [ ] JSON importálva VAGY INI feltöltve
- [ ] `Game.ini` feltöltve (INI módszerrel)
- [ ] Modok telepítve (32 db)
- [ ] Szerver online
- [ ] Admin parancsok működnek
- [ ] `destroywilddinos` kiadva

---

## 🎮 Tesztelés Játékban

### 1. Csatlakozás ellenőrzése:
```
Szerver neve keresőben: "ARK Primal Descended PvE x50"
```

### 2. Admin jogok tesztelése:
```
TAB → enablecheats ADMIN_JELSZAVAD
```

### 3. Wild dino szint ellenőrzése:
```
Nézz rá egy wild dinóra távcsővel → max level ~900
```

### 4. x50 rates ellenőrzése:
```
- Üss egy fát → sok fa/szalma kell jöjjön
- Ölj meg egy dinót → nagy XP ugrás
- Startolj egy tame-et → nagyon gyorsan kell mennie
```

---

**Utolsó frissítés:** 2026-07-18  
**Verzió:** 1.0  
**Platform:** Nitrado ARK: Survival Ascended

**Jó játékot! 🦖🎮**
