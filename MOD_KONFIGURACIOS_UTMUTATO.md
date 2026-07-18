# 🔧 MOD KONFIGURÁCIÓS ÚTMUTATÓ
## ARK: Survival Ascended - Mod Beállítások

---

## 📋 TARTALOMJEGYZÉK
1. [Általános mod konfiguráció](#általános-mod-konfiguráció)
2. [Mod-specifikus beállítások](#mod-specifikus-beállítások)
3. [Game.ini és GameUserSettings.ini](#gameini-és-gameusersettingsini)
4. [Nitrado webes felület](#nitrado-webes-felület)
5. [Gyakori problémák](#gyakori-problémák)

---

## 🎯 ÁLTALÁNOS MOD KONFIGURÁCIÓ

### 1️⃣ **Mod telepítése (Nitrado webes felület)**

A modokat **NEM az INI fájlokban**, hanem a **Nitrado webes felületén** kell telepíteni!

**Lépések:**
1. Lépj be a Nitrado dashboardra: https://server.nitrado.net/
2. Válaszd ki a szervert
3. Menj a **"Mods"** fülre
4. Keresd meg a modot név vagy ID szerint
5. Kattints a **"Install"** gombra
6. Várj, amíg települ (ez néhány percig tarthat)
7. Indítsd újra a szervert

### 2️⃣ **Mod ID-k megadása**

A `Game.ini` fájlban az **ActiveMods** sorokat használjuk a telepített modok azonosítására:

```ini
[/Script/ShooterGame.ShooterGameMode]
ActiveMods=940975
ActiveMods=947033
ActiveMods=935408
...stb
```

**⚠️ FONTOS:** Ezek a sorok csak **referencia** jellegűek! A tényleges mod telepítés a Nitrado webes felületén történik!

---

## 🛠️ MOD-SPECIFIKUS BEÁLLÍTÁSOK

A legtöbb mod saját konfigurációs opciókat tartalmaz. Ezeket a **Game.ini** vagy **GameUserSettings.ini** fájlokban lehet beállítani.

### 📦 **1. WBUI2 (932975) - Felület konfiguráció**

A WBUI2 egy UI mod, amely egyedi üzeneteket jelenít meg a játékosoknak.

**Game.ini konfigurálás:**
```ini
[WBUI2]
JsonURL=https://your-website.com/wbui2-config.json
```

**Vagy használd a Nitrado beépített WBUI2 konfigurátorát:**
- Nitrado Dashboard → Plugins → WBUI2

**Mit tudsz beállítani:**
- Szerver üzenetek (Welcome message, Rules, stb.)
- Discord link
- Szerver információk
- Egyedi gombok és linkek

**Példa konfiguráció (JSON):**
```json
{
  "OpenButton": 1,
  "HideIcon": false,
  "HideIconAfter": 60,
  "IconURL": "https://i.imgur.com/your-logo.png",
  "DisableIconText": false,
  "IconPosition": 0,
  "IconTextColor": 0,
  "OpenOnStart": true,
  "OpenOnStartOnlyNewPlayers": false,
  "UpdateInterval": 24
}
```

---

### 🌾 **2. Seed Farm: Grow Everything (947033)**

Ez a mod lehetővé teszi, hogy minden növényt ültethess.

**Game.ini konfigurálás:**
```ini
[SeedFarm]
; Növekedési sebesség szorzó (alapértelmezett: 1.0)
GrowthSpeedMultiplier=5.0

; Termés mennyiség szorzó
HarvestMultiplier=10.0

; Víz szükséglet (true/false)
RequiresWater=true

; Műtrágya hatékonyság
FertilizerEffectiveness=2.0
```

**GameUserSettings.ini opció:**
```ini
[ServerSettings]
CropGrowthSpeedMultiplier=20.0
CropDecaySpeedMultiplier=0.2
```

---

### 🔫 **3. SmartTurrets (hiányzó ID)**

Custom turret beállítások.

**Game.ini konfigurálás:**
```ini
[SmartTurrets]
; Turret lőtávolság szorzó
RangeMultiplier=2.0

; Sebzés szorzó
DamageMultiplier=1.5

; Lőszer fogyasztás
AmmoConsumptionMultiplier=0.5

; Auto-célzás beállítások
AutoTargetWildDinos=true
AutoTargetPlayers=false
AutoTargetTamedDinos=false
```

---

### 🚀 **4. Utilities Plus (924900)**

Hasznos eszközök és funkciók.

**Game.ini konfigurálás:**
```ini
[UtilitiesPlus]
; Item pickup távolság
ItemPickupRange=500.0

; Auto-pickup engedélyezése
EnableAutoPickup=true

; Max stack size override
StackSizeMultiplier=10.0
```

---

### 🧪 **5. Awesome Spyglass (939055)**

Továbbfejlesztett távcső mod.

**Game.ini konfigurálás:**
```ini
[AwesomeSpyglass]
; Távcső távolság
ViewDistance=5000.0

; Stat mutatás
ShowStats=true
ShowWildLevel=true
ShowTamedLevel=true
ShowBreedingInfo=true

; Színes kijelzés
UseColorCoding=true
```

---

### 🧬 **6. New Dino Cloner (931119)**

Dínó klónozás mod.

**Game.ini konfigurálás:**
```ini
[NewDinoCloner]
; Klónozási idő (másodpercben)
CloningTime=3600

; Klónozási költség szorzó
CostMultiplier=1.0

; Element felhasználás
ElementCost=100

; Shards helyett Element használata
UseElementInsteadOfShards=false
```

---

### 🏗️ **7. Awesome ARK Tools (929334)**

Továbbfejlesztett építési eszközök.

**Game.ini konfigurálás:**
```ini
[AwesomeArkTools]
; Építési távolság
BuildingRange=500.0

; Snap távolság
SnapDistance=50.0

; Collision ellenőrzés kikapcsolása
DisableCollisionCheck=false
```

---

### 📡 **8. Automated Ark (951574)**

Automatizálási mod.

**Game.ini konfigurálás:**
```ini
[AutomatedArk]
; Auto-feeding engedélyezése
EnableAutoFeeding=true

; Auto-breeding engedélyezése
EnableAutoBreeding=true

; Feeding távolság
FeedingRange=50.0

; Breeding intervallum (másodperc)
BreedingCheckInterval=300
```

---

### 🎨 **9. Dino Painter (1122696)**

Dínó festés mod.

**Game.ini konfigurálás:**
```ini
[DinoPainter]
; Festék költség
PaintCost=1

; Spray távolság
SprayDistance=10.0

; Színek száma
AvailableColors=256
```

---

### 🌐 **10. GameServerApp.com Integration (940975)**

Crossplay támogatás.

**Nincs szükség külön konfigurációra!** A mod automatikusan működik, ha telepítve van.

**Opcionális GameUserSettings.ini:**
```ini
[ServerSettings]
# Crossplay engedélyezése
crossplay-enable-pc=true
crossplay-enable-wingdk=true
crossplay-enable-xsx=true
crossplay-enable-ps5=true
```

---

### 🧊 **11. Pelayori's Cryo Storage (932714)**

Cryo tárolás mod.

**Game.ini konfigurálás:**
```ini
[PelayoriCryoStorage]
; Cryo fridge tárolási limit
StorageLimit=500

; Cryo sickness kikapcsolása
DisableCryoSickness=true

; Decay idő
DecayTime=0
```

---

### 🏛️ **12. Ark Primal Chaos (950914) és Ark Descended (952367)**

Ezek nagy content modok, sok egyedi beállítással.

**Game.ini általános beállítások:**
```ini
[ArkPrimalChaos]
; Custom spawn rate
CustomSpawnRate=1.5

; Custom loot quality
LootQualityMultiplier=2.0

[ArkDescended]
; Engram unlock automatikus
AutoUnlockEngrams=true

; Custom crafting költségek
CraftCostMultiplier=0.5
```

**⚠️ FONTOS:** Ezeknek a modoknak saját dokumentációja van a CurseForge oldalukon! Olvasd el a leírást!

---

### 🎯 **13. Spawn Blocker (1342708)**

Spawn blokkolás megadott területeken.

**Game.ini konfigurálás:**
```ini
[SpawnBlocker]
; Blokkolási sugár
BlockRadius=100.0

; Működik-e flyer-ekre is
BlockFlyers=true

; Működik-e ground dino-kra
BlockGroundDinos=true
```

**Használat játékban:**
- Helyezz le egy "Spawn Blocker" struktúrát
- A beállított sugárban nem spawnolnak dinók

---

### 🔄 **14. Automated Dino Wipes (936882)**

Automatikus wild dino wipe.

**Game.ini konfigurálás:**
```ini
[AutomatedDinoWipes]
; Wipe intervallum (óra)
WipeInterval=24

; Wipe időpont (24h formátum)
WipeTime=03:00

; Admin értesítés
NotifyAdmins=true
```

---

### 🌊 **15. Alfa Oceanic Platforms (933099)**

Óceáni platform építmények.

**Game.ini konfigurálás:**
```ini
[AlfaOceanicPlatforms]
; Max platform méret
MaxPlatformSize=50x50

; Max struktúrák a platformon
MaxStructuresOnPlatform=500

; Collision beállítások
AllowCollision=false
```

---

## 📂 GAME.INI ÉS GAMEUSERSETTINGS.INI

### 🔹 **Game.ini helye:**
- **Nitrado szerveren:** Settings → Expert Mode → Game.ini
- **Lokális szerveren:** `ShooterGame/Saved/Config/WindowsServer/Game.ini`

### 🔹 **GameUserSettings.ini helye:**
- **Nitrado szerveren:** Settings → Expert Mode → GameUserSettings.ini
- **Lokális szerveren:** `ShooterGame/Saved/Config/WindowsServer/GameUserSettings.ini`

### 🔹 **Mi megy hova?**

**Game.ini:**
- Mod-specifikus beállítások
- Item stack size override
- Loot crate konfigurációk
- Dino spawn módosítások
- Crafting cost override
- Engram unlock beállítások

**GameUserSettings.ini:**
- Szerver alapbeállítások (név, jelszó, stb.)
- XP szorzók
- Taming sebesség
- Harvesting szorzók
- Breeding beállítások
- Player/Dino stat szorzók
- Difficulty beállítások

---

## 🌐 NITRADO WEBES FELÜLET

### 📱 **Mod telepítése Nitrado-n:**

1. **Bejelentkezés:**
   - https://server.nitrado.net/
   - Válaszd ki a szervert

2. **Mods fül:**
   - Bal oldali menü → Mods
   - Keresés: Mod név vagy ID
   - Kattints az "Install" gombra

3. **Mod sorrend:**
   - A modok telepítési sorrendje FONTOS!
   - Húzd-vidd a modokat a kívánt sorrendbe
   - **Általános szabály:**
     - Core modok (Crossplay, Bot) → ELÖL
     - Content modok (Primal Chaos, Descended) → KÖZÉPEN
     - UI/kozmetikai modok → HÁTUL

4. **Mod frissítése:**
   - Automatikus frissítés: Be van kapcsolva alapértelmezetten
   - Kézi frissítés: Mods fül → Update gomb

5. **Mod eltávolítása:**
   - Mods fül → Uninstall gomb
   - **⚠️ FIGYELEM:** Ez törölheti a mod által létrehozott tárgyakat!

---

## 🛠️ INI FÁJL SZERKESZTÉS NITRADO-N

### Módszer 1: Webes szerkesztő
1. Settings → Expert Mode
2. Válaszd ki a fájlt (Game.ini vagy GameUserSettings.ini)
3. Szerkeszd a beállításokat
4. Kattints a "Save" gombra
5. Indítsd újra a szervert

### Módszer 2: FTP feltöltés
1. Settings → FTP Credentials
2. Csatlakozz FTP klienssel (FileZilla, WinSCP)
3. Navigálj a mappába:
   - `/ShooterGame/Saved/Config/WindowsServer/`
4. Töltsd fel a módosított INI fájlokat
5. Indítsd újra a szervert

### Módszer 3: Backup/Restore
1. Settings → Backup
2. Készíts backup-ot
3. Töltsd le a backup-ot
4. Szerkeszd a fájlokat
5. Töltsd fel újra
6. Restore from backup

---

## ⚠️ GYAKORI PROBLÉMÁK

### ❌ **"Mod nem tölt be"**
**Okok:**
- Mod nem települt rendesen
- Mod ID rossz a Game.ini-ben
- Mod nem kompatibilis az ARK verzióval
- BattlEye blokkolja a modot

**Megoldás:**
1. Ellenőrizd a Server Log-ot (Nitrado → Logs)
2. Telepítsd újra a modot
3. Ellenőrizd a mod CurseForge oldalán a kompatibilitást
4. Ha BattlEye problémák vannak:
   ```ini
   [ServerSettings]
   BattlEye=false
   ```
   **⚠️ NE KAPCSOLD KI a BattlEye-t PvP szervereken!**

### ❌ **"Mod konfiguráció nem működik"**
**Okok:**
- Rossz szintaxis az INI fájlban
- Mod nem támogatja azt a beállítást
- Szerver nem indult újra a változtatás után

**Megoldás:**
1. Ellenőrizd a szintaxist (vesszők, zárójelek, idézőjelek)
2. Olvasd el a mod dokumentációját a CurseForge-on
3. Indítsd újra a szervert minden INI változtatás után
4. Nézd meg a Server Log-ban a hibaüzeneteket

### ❌ **"Modok konfliktusba kerülnek"**
**Okok:**
- Két mod ugyanazt a funkciót módosítja
- Mod load order rossz
- Incompatibilis modok

**Megoldás:**
1. Ellenőrizd a mod leírásokat (kompatibilitás)
2. Változtasd meg a mod sorrendet
3. Távolíts el konfliktáló modokat
4. Kérdezz a mod készítőjétől (Discord, CurseForge kommentek)

### ❌ **"INI fájl visszaáll alapértelmezettre"**
**Okok:**
- Szerver új világot generált
- Backup restore
- Nitrado automatikus javítás

**Megoldás:**
1. Készíts helyi backup-ot az INI fájlokról
2. Ne törölj világot szerver reset közben
3. Ellenőrizd a fájl jogosultságokat (FTP)

---

## 📖 HASZNOS LINKEK

### 🔗 **Mod dokumentációk:**
- CurseForge ARK SA Mods: https://www.curseforge.com/ark-survival-ascended/mods
- ARK DevKit dokumentáció: https://ark.wiki.gg/wiki/Dev_Kit
- Nitrado Support: https://support.nitrado.net/

### 🔗 **Community:**
- ARK Official Discord: https://discord.gg/playark
- ARK Subreddit: https://www.reddit.com/r/playark/
- Nitrado Discord: https://discord.gg/nitrado

### 🔗 **INI Generátorok:**
- Beacon: https://beacon.gg/ (ARK config generator)
- ARK Smart Breeding: https://github.com/cadon/ARKStatsExtractor (stat calculator)

---

## 💡 PRO TIPPEK

### ✅ **1. Készíts backup-ot mindig!**
- INI fájlok módosítása előtt
- Mod telepítése előtt
- Nagyobb változtatások előtt

### ✅ **2. Tesztelj kis lépésekben!**
- Ne telepíts egyszerre 30 modot
- Először 5-10 modot telepíts
- Ellenőrizd, hogy működnek-e
- Aztán adj hozzá többet

### ✅ **3. Olvasd el a mod dokumentációkat!**
- Minden mod CurseForge oldalán van leírás
- Nézd meg a "Files" fület a changelog-ért
- Olvasd el a kommenteket (gyakori problémák)

### ✅ **4. Használj Discord-ot!**
- Legtöbb mod készítőnek van Discord szervere
- Gyors support
- Community segítség

### ✅ **5. Tartsd frissen a modokat!**
- Engedélyezd az auto-update-et
- Ellenőrizd rendszeresen a frissítéseket
- Nézd meg a changelog-ot (breaking changes)

---

## 📋 ÖSSZEFOGLALÁS

1. **Modok telepítése:** Nitrado webes felület → Mods fül
2. **Mod konfiguráció:** Game.ini és GameUserSettings.ini szerkesztése
3. **Mod sorrend:** Fontos! Core modok elöl, kozmetikai hátra
4. **Backup:** Mindig készíts mentést!
5. **Tesztelés:** Kis lépésekben, ne egyszerre mindent
6. **Dokumentáció:** Olvasd el a mod leírásokat!
7. **Community:** Használj Discord-ot és Reddit-et segítségért

---

**Készítette:** Kiro AI Assistant  
**Verzió:** 1.0  
**Utolsó frissítés:** 2026-07-18

**Kérdésed van?** Írj nyugodtan! 😊
