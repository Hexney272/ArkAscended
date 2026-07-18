# 🦖 CUSTOM DINO LEVELS MOD ÚTMUTATÓ
## ARK: Survival Ascended - Dino Level Eloszlás Testreszabása

---

## 📋 MOD INFORMÁCIÓK

**Mod Neve:** Custom Dino Levels  
**CurseForge ID:** 928708  
**Letöltések:** 6.7+ millió  
**Crossplay:** Igen ✅  
**Kategória:** Creatures, Rebalancing

---

## 🎯 MIT CSINÁL EZ A MOD?

A Custom Dino Levels mod megváltoztatja a **wild dino level eloszlást** a szerveren. Vanilla ARK-ban a legtöbb dino alacsony szintű (5-50), és ritkán spawnoln high-level dinók (100+).

Ez a mod lehetővé teszi:
- ✅ **Egyenletes eloszlás** - Minden level egyforma eséllyel spawnol
- ✅ **High-end skew** - Több magas szintű dino
- ✅ **Ragnarok-stílusú** - Több high-level, mint vanilla
- ✅ **Custom tartományok** - Saját min/max level beállítás

---

## 🔧 JELENLEG BEÁLLÍTOTT KONFIGURÁCIÓ

A te szervereden a következő beállítások vannak:

```ini
[CustomDinoLevels]
; Egyenletes eloszlás (minden level egyforma eséllyel)
bUseEqualizedLevels=true

; Minimum level: 1 (0.0 * 30 + 1 = 1)
MinimumDinoLevel=0.0

; Maximum level: 900 (30.0 * 30 = 900)
MaximumDinoLevel=30.0

; Level lépésköz: 30 (1.0 * 30 = 30)
; Dinók spawolhatnak: 30, 60, 90, 120, 150... 900
LevelIncrement=1.0
```

### 📊 **Mit jelent ez a gyakorlatban?**

- **Level 30 dino:** Ugyanolyan eséllyel spawnol, mint a 900-as!
- **Minden 30. level:** 30, 60, 90, 120, 150, 180... 900
- **Egyenletes eloszlás:** Nem lesz túl sok low-level dino
- **High-level gazdagabb:** Könnyebb találni 600+ level dinókat

---

## 🎮 LEVEL ELOSZLÁS TÍPUSOK

### 1️⃣ **Vanilla Levels (Alapértelmezett ARK)**
```ini
bUseVanillaLevels=true
bUseRagnarokLevels=false
bUseEqualizedLevels=false
bUseHighEndSkew=false
```
**Leírás:**  
- Sok low-level dino (5-50)
- Kevés mid-level (50-100)
- Nagyon kevés high-level (100-150)
- **Nehéz** találni 900-as dinót!

**Mikor használd:**  
Ha a vanilla ARK élményt szeretnéd (nehezebb)

---

### 2️⃣ **Ragnarok Levels** ⭐
```ini
bUseVanillaLevels=false
bUseRagnarokLevels=true
bUseEqualizedLevels=false
bUseHighEndSkew=false
```
**Leírás:**  
- Közepes low-level (5-50)
- Több mid-level (50-100)
- Jóval több high-level (100-150+)
- **Könnyebb** találni jó dinókat

**Mikor használd:**  
Ha szeretnél több high-level dinót, de nem instant 900-asokat

---

### 3️⃣ **Equalized Levels (Egyenletes)** ✅ **JELENLEGI**
```ini
bUseVanillaLevels=false
bUseRagnarokLevels=false
bUseEqualizedLevels=true
bUseHighEndSkew=false
MinimumDinoLevel=0.0
MaximumDinoLevel=30.0
LevelIncrement=1.0
```
**Leírás:**  
- **Minden level egyforma eséllyel** spawnol
- 30, 60, 90, 120... 900 - MIND egyforma chance!
- Nincs "ritka" level
- **Legjobb** 900 max level szerverekhez!

**Mikor használd:**  
✅ **AJÁNLOTT 900 max level szerverekhez!**  
Ha szeretnél high-level dinókat találni anélkül, hogy órákat farmolnod kellene.

---

### 4️⃣ **High-End Skew (Magas szintek felé tolva)**
```ini
bUseVanillaLevels=false
bUseRagnarokLevels=false
bUseEqualizedLevels=false
bUseHighEndSkew=true
```
**Leírás:**  
- Kevés low-level (5-50)
- Közepes mid-level (50-100)
- **SOK high-level** (100-900)
- Szinte minden dino 500+ level!

**Mikor használd:**  
Ha szeretnéd, hogy MINDEN dino high-level legyen (nagyon easy mode)

---

## ⚙️ EGYENLETES ELOSZLÁS FINOMHANGOLÁSA

Ha az **Equalized Levels** módot használod, testre szabhatod a level tartományt:

### 🔹 **Minimum Dino Level:**
```ini
MinimumDinoLevel=0.0
```
**Számítás:**  
`Minimum Level = MinimumDinoLevel * 30 + 1`

**Példák:**
- `0.0` → Level 1 (alapértelmezett)
- `1.0` → Level 31
- `5.0` → Level 151
- `10.0` → Level 301

### 🔹 **Maximum Dino Level:**
```ini
MaximumDinoLevel=30.0
```
**Számítás:**  
`Maximum Level = MaximumDinoLevel * 30`

**Példák:**
- `30.0` → Level 900 (alapértelmezett 900-as szerver)
- `20.0` → Level 600
- `10.0` → Level 300
- `5.0` → Level 150

### 🔹 **Level Increment (Lépésköz):**
```ini
LevelIncrement=1.0
```
**Számítás:**  
`Level Lépés = LevelIncrement * 30`

**Példák:**
- `1.0` → 30-as lépés (30, 60, 90, 120...)
- `0.5` → 15-ös lépés (15, 30, 45, 60...)
- `2.0` → 60-as lépés (60, 120, 180, 240...)

---

## 📝 PÉLDA KONFIGURÁCIÓK

### ✅ **AJÁNLOTT: 900 Max Level Egyenletes (JELENLEGI)**
```ini
[CustomDinoLevels]
bUseEqualizedLevels=true
MinimumDinoLevel=0.0
MaximumDinoLevel=30.0
LevelIncrement=1.0
```
**Eredmény:** 30, 60, 90... 900 - mind egyforma eséllyel

---

### 🔸 **PÉLDA: Csak High-Level Dinók (600-900)**
```ini
[CustomDinoLevels]
bUseEqualizedLevels=true
MinimumDinoLevel=20.0
MaximumDinoLevel=30.0
LevelIncrement=1.0
```
**Eredmény:** 600, 630, 660... 900

---

### 🔸 **PÉLDA: Vanilla-szerű, de 900-ig (150 helyett)**
```ini
[CustomDinoLevels]
bUseRagnarokLevels=true
```
**Eredmény:** Több high-level, de még mindig van low-level is

---

### 🔸 **PÉLDA: Feles lépésközök (150, 300, 450, 600, 750, 900)**
```ini
[CustomDinoLevels]
bUseEqualizedLevels=true
MinimumDinoLevel=0.0
MaximumDinoLevel=30.0
LevelIncrement=5.0
```
**Eredmény:** Csak 6 féle level létezik

---

## ⚠️ FONTOS SZABÁLYOK

### 🔴 **Csak EGY boolean lehet TRUE egyszerre!**

**HELYES:**
```ini
bUseVanillaLevels=false
bUseRagnarokLevels=false
bUseEqualizedLevels=true    ✅
bUseHighEndSkew=false
```

**HIBÁS:**
```ini
bUseVanillaLevels=false
bUseRagnarokLevels=true     ❌
bUseEqualizedLevels=true    ❌
bUseHighEndSkew=false
```
**Ha több TRUE van, a mod hibásan fog működni!**

---

### 🔴 **Min/Max értékek csak Equalized módban működnek!**

Ha `bUseRagnarokLevels=true` vagy más mód van beállítva:
```ini
MinimumDinoLevel=10.0   ❌ Nem lesz hatása!
MaximumDinoLevel=20.0   ❌ Nem lesz hatása!
```

Csak akkor működnek, ha:
```ini
bUseEqualizedLevels=true   ✅
```

---

## 🛠️ TELEPÍTÉS ÉS HASZNÁLAT

### 1️⃣ **Mod Telepítése:**
```
Nitrado Dashboard → Mods → Search: "Custom Dino Levels"
→ Install → Restart Server
```

### 2️⃣ **Game.ini Szerkesztése:**
```
Nitrado → Settings → Expert Mode → Game.ini
→ Add konfigurációt
→ Save → Restart Server
```

### 3️⃣ **Wild Dino Wipe (FONTOS!):**
```
Játékban admin parancs:
cheat DestroyWildDinos
```
**⚠️ FONTOS:** A meglévő dinók NEM változnak meg! Wipe-olni kell őket!

### 4️⃣ **Tesztelés:**
- Várj 5-10 percet, amíg új dinók spawnolnak
- Keress rá dinókra
- Ellenőrizd a level eloszlást

---

## 🎯 TIPPEK ÉS TRÜKKÖK

### ✅ **900-as max levelhez:**
- **Ajánlott:** `bUseEqualizedLevels=true`
- **Miért?** Különben szinte lehetetlen találni 900-as dinót!

### ✅ **Ha túl sok high-level van:**
- Használj `bUseRagnarokLevels=true` helyette
- Vagy csökkentsd a `MaximumDinoLevel` értékét

### ✅ **Ha túl kevés high-level van:**
- Használj `bUseHighEndSkew=true`
- Vagy növeld a `MinimumDinoLevel` értékét

### ✅ **Havi Wild Dino Wipe:**
```ini
[AutomatedDinoWipes]
WipeInterval=720    ; 30 nap
WipeTime=03:00
```
Ezzel mindig friss dinók lesznek a térképen!

---

## 🔄 VÁLTOZTATÁSOK ÉLETBE LÉPTETÉSE

1. **Szerkeszd a `Game.ini`-t**
2. **Mentsd el**
3. **Restart Server**
4. **Wild Dino Wipe:** `cheat DestroyWildDinos`
5. **Várj 5-10 percet**

**⚠️ MEGJEGYZÉS:** A háziasított dinók NEM változnak meg! Csak az új wild dinók!

---

## 📊 ÖSSZEHASONLÍTÁS

| Mód | Low-Level | Mid-Level | High-Level | 900-as esély |
|-----|-----------|-----------|------------|--------------|
| **Vanilla** | Sok ⬆️ | Közepes ➡️ | Kevés ⬇️ | 0.01% |
| **Ragnarok** | Közepes ➡️ | Több ⬆️ | Több ⬆️ | 5% |
| **Equalized** ✅ | Közepes ➡️ | Közepes ➡️ | Közepes ➡️ | 3.3% (30 levels) |
| **High-End** | Kevés ⬇️ | Kevés ⬇️ | Sok ⬆️ | 50%+ |

---

## 🐛 HIBAELHÁRÍTÁS

### ❌ **"Dinók még mindig low-level"**
**Megoldás:**
- Futtasd: `cheat DestroyWildDinos`
- Várj 10 percet
- Ellenőrizd, hogy a mod telepítve van-e

### ❌ **"Nincs változás a mod telepítése után"**
**Megoldás:**
- Ellenőrizd a `Game.ini` szintaxist
- Csak EGY boolean legyen TRUE!
- Restart Server után Wild Dino Wipe!

### ❌ **"Túl sok vagy túl kevés high-level"**
**Megoldás:**
- Változtasd a módot (Equalized → Ragnarok → High-End)
- Állítsd be a `MinimumDinoLevel` és `MaximumDinoLevel` értékeket

---

## 📖 HASZNOS LINKEK

- **CurseForge:** https://www.curseforge.com/ark-survival-ascended/mods/custom-dino-levels
- **Mod ID:** 928708
- **Discord Support:** Kérdezd a mod készítőjét a CurseForge kommentekben

---

**Készítette:** Kiro AI Assistant  
**Verzió:** 1.0  
**Utolsó frissítés:** 2026-07-18

**Kérdésed van? Szeretnéd megváltoztatni a beállításokat? Szólj! 😊**
