# ARK: Survival Ascended PvE x50 Szerver Telepítési Útmutató
## Nitrado Szerver Konfigurálás - Ragnarok Térkép

---

## 📋 Tartalomjegyzék
1. [Szerver Alapbeállítások](#1-szerver-alapbeállítások)
2. [Modok Telepítése](#2-modok-telepítése)
3. [Konfigurációs Fájlok Feltöltése](#3-konfigurációs-fájlok-feltöltése)
4. [Szerver Indítás és Ellenőrzés](#4-szerver-indítás-és-ellenőrzés)
5. [Hibaelhárítás](#5-hibaelhárítás)
6. [Karbantartás és Frissítések](#6-karbantartás-és-frissítések)

---

## 1. Szerver Alapbeállítások

### 1.1 Bejelentkezés Nitrado-ba
1. Látogass el a [Nitrado weboldalra](https://server.nitrado.net/)
2. Jelentkezz be a fiókodba
3. Válaszd ki az ARK: Survival Ascended szervert a vezérlőpultodból

### 1.2 Térkép Beállítása
1. Kattints a **"General"** (Általános) menüpontra
2. **"Map"** (Térkép) legördülő menüben válaszd ki: **Ragnarok**
3. Kattints a **"Save"** (Mentés) gombra
4. **NE INDÍTSD EL** még a szervert - először a modokat kell telepíteni!

### 1.3 Admin Jelszó Beállítása
1. A **GameUserSettings.ini** fájlban található:
   ```ini
   ServerAdminPassword=VÁLTOZTASD_MEG_EZT
   ```
2. Cseréld le ezt egy erős jelszóra (min. 8 karakter, számok és betűk)
3. **FONTOS:** Jegyezd fel ezt a jelszót - ezzel leszel admin a szerveren!

---

## 2. Modok Telepítése

### 2.1 Modok Hozzáadása Nitrado-n
A Nitrado ARK: Survival Ascended szerverek a **CurseForge** modokat használják.

#### Lépések:
1. A Nitrado vezérlőpulton válaszd a **"Mods"** menüpontot
2. Kattints az **"Install Mod"** vagy **"Add Mod"** gombra
3. Keresd meg és telepítsd a modokat **EBBEN A SORRENDBEN**:

### 2.2 Mod Lista (Telepítési Sorrend)

**KRITIKUS FONTOSSÁGÚ:** Telepítsd a modokat pontosan ebben a sorrendben, különben conflict hibák léphetnek fel!

#### ✅ 1. Alapvető Modok (Telepítsd elsőként)
| # | Mod Név | Leírás | Prioritás |
|---|---------|--------|-----------|
| 1 | **GameServerApp.com Integration (Crossplay)** | Crossplay támogatás | MAGAS |
| 2 | **EOS ID Helper (CrossPlay)** | Crossplay ID kezelés | MAGAS |
| 3 | **WBUI2** | UI információs rendszer | MAGAS |

#### 🦖 1.5 DLC Lények (Opcionális - Ajánlott)
| # | Mod Név | Leírás | Prioritás |
|---|---------|--------|-----------|
| 3.5 | **DLC Spawns** | Minden DLC lény spawn-olása más térképeken | KÖZEPES |

**MEGJEGYZÉS:** A DLC-ket meg kell vásárolnod, hogy használhasd a lényeket! A mod csak a spawn-olást teszi lehetővé.

#### 🔧 2. Játékmenet Modok
| # | Mod Név | Leírás |
|---|---------|--------|
| 4 | **Ark Primal Chaos** | Primal tartalom |
| 5 | **Ark Descended** | Descended tartalom |
| 6 | **Seed Farm: Grow Everything** | Farmolási rendszer |
| 7 | **ASA-Bot Companion** | Bot segéd |
| 8 | **ARKomatic** | Automatizálás |
| 9 | **Automated Ark** | További automatizálás |
| 10 | **Automated Dino Wipes** | Dino tisztítás |

#### 🏗️ 3. Építkezési és Tárolási Modok
| # | Mod Név | Leírás |
|---|---------|--------|
| 11 | **Cybers Structures QoL+ (Crossplay)** | Építési kényelmi funkciók |
| 12 | **Ark Descended Structures** | További struktúrák |
| 13 | **Klinger Additional Rustic Building** | Rustic építési stílus |
| 14 | **Dwarven Builders Custom Cosmetic Mod** | Dwarven építési stílus |
| 15 | **Pelayori's Cryo Storage (Crossplay!)** | Cryo tárolás |
| 16 | **Super Cryo Storage** | Bővített cryo tárolás |
| 17 | **Alfa Oceanic Platforms** | Óceáni platformok |

#### 🛠️ 4. Eszközök és Kiegészítők
| # | Mod Név | Leírás |
|---|---------|--------|
| 18 | **Utilities Plus** | Hasznos eszközök |
| 19 | **Awesome Spyglass!** | Fejlett távcsöves |
| 20 | **Upgrade Station** | Eszköz fejlesztés |
| 21 | **Awesome Teleporters!** | Teleportálás |
| 22 | **Awesome ARK Tools** | További eszközök |
| 23 | **Ultimate Tranqs** | Fejlett altatók |
| 24 | **Better Rafts** | Jobb tutajok |
| 25 | **Der Dino Finder** | Dino kereső |

#### 🎨 5. Kozmetikai Modok
| # | Mod Név | Leírás |
|---|---------|--------|
| 26 | **MarniiMods Hairstyles** | Frizurák |
| 27 | **Dino Painter** | Dino festés |
| 28 | **Lights Skins** | Világítás kinézetek |

#### ⚙️ 6. Speciális Funkciók
| # | Mod Név | Leírás |
|---|---------|--------|
| 29 | **Crazy's Crazy Ascended Potions** | Fejlett főzetek |
| 30 | **Resonant's Shop Mod** | Bolt rendszer |
| 31 | **Spawn Blocker** | Spawn kontroll |
| 32 | **New Dino Cloner** | Dino klónozás |
| 33 | **Inventory Backup Saver** | Inventory mentés |
| 34 | **SmartTurrets** | Intelligens tornyok |
| 35 | **FPS Boost Buttons (PauseMenu)** | FPS optimalizálás |

### 2.3 Mod Telepítési Útmutató (Részletes)

#### Hogyan találd meg a modokat Nitrado-n:
1. **Mods** menüpont → **"Browse Available Mods"**
2. Használd a **keresőmezőt** minden mod nevének beírásához
3. Ha a mod neve pontosan egyezik, kattints az **"Install"** gombra
4. Várd meg, amíg a mod státusza **"Installed"** lesz

#### Ha nem találsz egy modot:
- Ellenőrizd, hogy pontosan írtad-e be a nevet
- Próbálj rá keresni a CurseForge-on is: [CurseForge ARK Ascended Mods](https://www.curseforge.com/ark-survival-ascended/mods)
- Ha egy mod már nem elérhető, azt kihagyhatod (lásd alább a helyettesítéseket)

#### Elavult vagy Hiányzó Modok:
- **Dwarven Builders Mod - DISCONTINUED**: Használd helyette a **Dwarven Builders Custom Cosmetic Mod**-ot

### 2.4 Mod Sorrend Ellenőrzése
1. A **Mods** menüben láthatod a telepített modok listáját
2. A Nitrado automatikusan kezeli a mod sorrendet
3. **Mentés után NE módosítsd** a mod sorrendet manuálisan!

---

## 3. Konfigurációs Fájlok Feltöltése

### 3.1 File Manager Elérése
1. Nitrado vezérlőpultban válaszd: **"File Browser"** vagy **"Tools" → "File Browser"**
2. Navigálj a következő mappába:
   ```
   /games/ni123456789_1/noftp/arksa/ShooterGame/Saved/Config/WindowsServer/
   ```
   (A `ni123456789_1` a te szerver ID-d lesz)

### 3.2 GameUserSettings.ini Feltöltése

#### Letöltött fájl módosítása:
1. Nyisd meg a **GameUserSettings.ini** fájlt egy szövegszerkesztőben (pl. Notepad++)
2. Keresd meg ezt a sort:
   ```ini
   ServerAdminPassword=VÁLTOZTASD_MEG_EZT
   ```
3. Írd át egy erős jelszóra, például:
   ```ini
   ServerAdminPassword=MySecurePass123!
   ```
4. **(Opcionális)** Módosítsd a szerver nevét:
   ```ini
   ServerName=ARK Primal Descended PvE x50 - [HU]
   ```
5. **(Opcionális)** Add meg a szerver jelszót (ha privát szervert akarsz):
   ```ini
   ServerPassword=JelszoAJatekosoknak123
   ```
6. Mentsd el a fájlt

#### Feltöltés Nitrado-ra:
1. A File Browser-ben töröld a régi **GameUserSettings.ini** fájlt (ha van)
2. Kattints az **"Upload"** gombra
3. Válaszd ki a módosított **GameUserSettings.ini** fájlt
4. Várd meg a feltöltés befejezését

### 3.3 Game.ini Feltöltése

#### Feltöltés lépései:
1. Ugyanabban a mappában (WindowsServer):
   ```
   /games/ni123456789_1/noftp/arksa/ShooterGame/Saved/Config/WindowsServer/
   ```
2. Töröld a régi **Game.ini** fájlt (ha van)
3. Kattints az **"Upload"** gombra
4. Válaszd ki a **Game.ini** fájlt
5. Várd meg a feltöltés befejezését

### 3.4 Fájlok Ellenőrzése
A **WindowsServer** mappában a következő fájloknak kell lenniük:
- ✅ **GameUserSettings.ini** (~10-15 KB méret)
- ✅ **Game.ini** (~15-20 KB méret)

---

## 4. Szerver Indítás és Ellenőrzés

### 4.1 Szerver Újraindítása
1. A Nitrado vezérlőpultban válaszd: **"Dashboard"** vagy **"Home"**
2. Kattints a **"Stop"** gombra (ha a szerver már fut)
3. Várj 30 másodpercet
4. Kattints a **"Start"** gombra
5. A szerver indulása **5-15 percet** is igénybe vehet a modok betöltése miatt

### 4.2 Szerver Státusz Ellenőrzése
1. A **Dashboard**-on láthatod a szerver státuszát
2. Ha a státusz **"Online"** lesz, a szerver sikeresen elindult
3. Ha **"Offline"** vagy **"Error"** marad, lásd a [Hibaelhárítás](#5-hibaelhárítás) részt

### 4.3 Csatlakozás a Szerverhez

#### In-Game csatlakozás:
1. Indítsd el az ARK: Survival Ascended-et
2. Válaszd: **"Join ARK"**
3. Keresőmezőbe írd be a szerver nevét: `ARK Primal Descended PvE x50`
4. **(Alternatíva)** Használd a **"Favorites"** vagy **"My Survivors"** fület
5. Csatlakozz a szerverhez
6. Ha van jelszó, add meg

#### Admin jogok aktiválása:
1. Játékban nyomd meg a **TAB** billentyűt (konzol megnyitása)
2. Írd be:
   ```
   enablecheats ADMIN_JELSZAVAD
   ```
   (Cseréld le `ADMIN_JELSZAVAD`-at a korábban beállított jelszóra)
3. Ha sikeres, láthatod az üzenetet: **"Cheats Enabled"**

### 4.4 Beállítások Tesztelése

#### Wild Dino Szint Ellenőrzése:
1. Adminként adj magadnak egy távcsövet:
   ```
   giveitem "Blueprint'/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponSpyglass.PrimalItem_WeaponSpyglass'" 1 0 0
   ```
2. Nézz rá egy wild dinóra a távcsővel
3. A maximum szint **900** körül kell legyen (esetleg 870, 885, 900)

#### x50 Rates Ellenőrzése:
1. Ütni egyet egy fára → sok fa/szalma kell kijöjjön
2. Ölj meg egy dinót → nagy XP-t kell kapnod
3. Startolj egy háziasítást → nagyon gyorsan kell mennie

---

## 5. Hibaelhárítás

### ❌ Probléma: A szerver nem indul el

#### Megoldás 1: Mod konfliktus ellenőrzése
1. Menj a **Mods** menüpontra
2. Ellenőrizd, hogy minden mod **"Installed"** státuszú-e
3. Ha van **"Error"** vagy **"Failed"** státuszú mod:
   - Távolítsd el az adott modot
   - Telepítsd újra
   - Indítsd újra a szervert

#### Megoldás 2: Config fájl hiba
1. Menj a **File Browser**-be
2. Nyisd meg a **GameUserSettings.ini** fájlt
3. Ellenőrizd, hogy nincsenek-e extra karakterek vagy hibás sorok
4. Használd a **"Restore Default"** opciót, majd töltsd fel újra a fájlt

#### Megoldás 3: Szerver újratelepítése
1. **Dashboard** → **"Reinstall"**
2. **FIGYELEM:** Ez törli az összes adatot!
3. Telepítsd újra a modokat és config fájlokat

### ❌ Probléma: A modok nem működnek a játékban

#### Megoldás:
1. Ellenőrizd, hogy a kliensedre (gépen) is le vannak-e töltve a modok
2. ARK főmenüben: **"Mod Manager"** → Ellenőrizd, hogy minden mod **"Subscribed"**
3. Ha hiányzik mod:
   - Menj a CurseForge-ra
   - Iratkozz fel a modokra
   - Indítsd újra az ARK-ot

### ❌ Probléma: Wild dinók max szintje nem 900

#### Megoldás:
1. Nyisd meg a **GameUserSettings.ini** fájlt
2. Ellenőrizd ezt a sort:
   ```ini
   OverrideOfficialDifficulty=30.0
   DifficultyOffset=1.0
   ```
3. Ha más érték van, javítsd ki
4. Mentsd és indítsd újra a szervert
5. Töröld az összes wild dinót az alábbi admin paranccsal:
   ```
   destroywilddinos
   ```
   (Ez 5-10 perc alatt újra spawn-olja a dinókat az új max szinttel)

### ❌ Probléma: A játékosok nem kapnak x50 sebességet

#### Ez normális!
- Az x50 a gyűjtésre, XP-re, háziasításra, tenyésztésre vonatkozik
- A player statisztikák szorzói a fájlban: `PerLevelStatsMultiplier_Player[...]`
- Ezek **szintlépésenként** adnak extra statokat, nem x50-et egyből

### ❌ Probléma: Lag vagy alacsony FPS

#### Megoldások:
1. **Szerver oldalon:**
   - Csökkentsd a `DinoCountMultiplier` értékét `1.0`-ra
   - Használd a `destroywilddinos` parancsot rendszeresen
   
2. **Kliens oldalon:**
   - Használd az **FPS Boost Buttons** mod funkcióit
   - Csökkentsd a grafikai beállításokat
   - Kapcsold ki a felesleges mod tartalmakat

---

## 6. Karbantartás és Frissítések

### 6.1 Rendszeres Karbantartás

#### Hetente:
- ✅ **Wild Dino Wipe:** Parancs: `destroywilddinos`
  - Ez újra spawn-olja a dinókat friss statokkal
  - Javasolt: hétfő reggel vagy karbantartási ablakban

#### Havonta:
- ✅ **Backup készítése:**
  1. Nitrado Dashboard → **"Backup"**
  2. Kattints: **"Create Backup"**
  3. Nevezd el: pl. `Backup_2026_07_18`
  
- ✅ **Mod frissítések ellenőrzése:**
  1. **Mods** menüpont → **"Check for Updates"**
  2. Ha van frissítés, kattints **"Update All"**
  3. Indítsd újra a szervert

### 6.2 Szerver Frissítések

#### ARK Update észlelésekor:
1. Nitrado **automatikusan frissíti** az ARK szervert
2. Kapsz értesítést emailben vagy a dashboardon
3. A frissítés után:
   - Ellenőrizd a mod kompatibilitást
   - Teszteld a szerver működését
   - Ellenőrizd a config fájlokat (esetleg felülírhatja őket)

### 6.3 Config Fájlok Módosítása Játék Közben

#### Ha változtatni szeretnél a beállításokon:
1. **Állítsd le a szervert!** (nagyon fontos!)
2. Módosítsd a config fájlokat a File Browser-ben
3. Mentsd el
4. Indítsd újra a szervert

**FIGYELEM:** Ha futó szerveren módosítod a fájlokat, a változások elveszhetnek!

### 6.4 Új Modok Hozzáadása

#### Lépések:
1. Állítsd le a szervert
2. **Mods** menüpont → **"Install Mod"**
3. Add hozzá az új modot
4. **FONTOS:** Az új mod a lista végére kerül - ez általában rendben van
5. Indítsd újra a szervert
6. Teszteld, hogy működik-e az új mod

---

## 🦖 DLC Lények Hozzáadása (Opcionális)

### Opció 1: Mod Használata (AJÁNLOTT)

A legegyszerűbb módszer a **DLC Spawns** mod telepítése a CurseForge-ról:

1. Nitrado Control Panel → **Mods**
2. Keress rá: **"DLC Spawns"**
3. Telepítsd a mod-ot
4. Indítsd újra a szervert
5. Add ki a parancsot: `destroywilddinos`

**Előnyök:**
- ✅ Automatikus - minden DLC lény spawn-ol
- ✅ Optimalizált spawn súlyok
- ✅ Egyszerű telepítés
- ✅ Frissítések automatikusan jönnek

**FONTOS:** A DLC-ket meg kell vásárolnod, hogy használhasd (háziasítás, breeding) a lényeket!

### Opció 2: Manuális Konfiguráció

A `Game.ini` fájl már tartalmaz példa spawn konfigurációkat:
- Scorched Earth lények (Wyvern, Mantis, Rock Elemental)
- Aberration lények (Ravager, Rock Drake, Reaper)
- Extinction lények (Gacha, Managarmr, Velonasaur)
- Genesis lények (Magmasaur, Bloodstalker, Astrocetus)
- Fjordur lények (Fenrir, Andrewsarchus)

Ezek alapértelmezetten **ki vannak kommentezve** - ha használni akarod őket:
1. Nyisd meg a `Game.ini` fájlt
2. Keresd meg a `; === DLC LÉNYEK HOZZÁADÁSA` részt
3. Távolítsd el a `;` karaktereket a spawn sorok elől
4. Mentsd és töltsd fel a fájlt
5. Indítsd újra a szervert

**Figyelem:** Manuális konfiguráció bonyolultabb és több karbantartást igényel!

---

## 📊 Gyors Referencia Táblázat

### Fontos Admin Parancsok

| Parancs | Leírás |
|---------|--------|
| `enablecheats JELSZÓ` | Admin jogok aktiválása |
| `destroywilddinos` | Összes wild dino törlése és újra spawn |
| `saveworld` | Kézi mentés készítése |
| `dorestartserver` | Szerver újraindítása |
| `setplayerpos 0 0 0` | Teleportálás spawn pontra |
| `god` | God mode be/ki (halhatatlanság) |
| `fly` | Repülés be/ki |
| `ghost` | Falakon átmenés be/ki |
| `giveengrams` | Összes engram feloldása |
| `addexperience 1000000 0 1` | 1 millió XP hozzáadása |

### Szerver Beállítások Gyors Áttekintése

| Beállítás | Érték | Hol található |
|-----------|-------|---------------|
| Max Wild Dino Szint | 900 | GameUserSettings.ini |
| XP Szorzó | x50 | GameUserSettings.ini |
| Taming Szorzó | x50 | GameUserSettings.ini |
| Harvesting Szorzó | x50 | GameUserSettings.ini |
| Breeding Szorzó | x50 | GameUserSettings.ini |
| Player Stats | 2-5x | GameUserSettings.ini |
| Item Stacks | 10000 | Game.ini |
| Platform Limit | 500 | GameUserSettings.ini & Game.ini |

---

## 🆘 Támogatás és Közösség

### Nitrado Support:
- **Webes Support:** [https://support.nitrado.net/](https://support.nitrado.net/)
- **Email:** support@nitrado.net
- **Ticket rendszer:** Nitrado Dashboard → "Support"

### ARK Közösség:
- **ARK Official Discord:** [https://discord.gg/playark](https://discord.gg/playark)
- **Reddit:** r/ARK, r/playark
- **Steam Community:** ARK: Survival Ascended Hub

### Mod-specifikus Segítség:
- Minden mod CurseForge oldalán van **"Comments"** és **"Issues"** szekció
- Nézz utána a mod Discord szerverének (ha van)

---

## 📝 Changelog és Jegyzetek

### Verziótörténet:
- **v1.0 (2026-07-18):** Kezdeti konfiguráció
  - 35 mod telepítve
  - x50 PvE rates
  - 900 max wild dino szint
  - Ragnarok térkép

### Tervezett Frissítések:
- [ ] Event beállítások (karácsony, halloween, stb.)
- [ ] Custom loot táblák finomhangolása
- [ ] Tribe rank system konfiguráció
- [ ] Boss fight nehézség módosítások

---

## ✅ Ellenőrző Lista (Checklist)

Mentés előtt menj végig ezen a listán:

### Telepítés Előtt:
- [ ] Nitrado szerver bérelt és aktív
- [ ] Admin jelszó kitalálva és feljegyezve
- [ ] Szerver név eldöntve
- [ ] Config fájlok letöltve

### Telepítés Közben:
- [ ] Ragnarok térkép kiválasztva
- [ ] Mind a 35 mod telepítve (vagy döntés melyeket hagyjuk ki)
- [ ] GameUserSettings.ini módosítva (admin jelszó!)
- [ ] GameUserSettings.ini feltöltve
- [ ] Game.ini feltöltve
- [ ] Szerver elindítva

### Telepítés Után:
- [ ] Szerver státusz: Online
- [ ] Csatlakozás sikeres
- [ ] Admin parancsok működnek
- [ ] Wild dinók max szintje ~900
- [ ] x50 rates tesztelve (gyűjtés, XP)
- [ ] Modok láthatóak a játékban
- [ ] Backup készítve

---

## 🎮 Jó Játékot!

Ha minden lépést követtél, a szervered készen áll a játékra! 

**Tipp:** Hozz létre egy Discord szervert a közösség számára, ahol megoszthatod a szerver információkat, szabályokat, és koordinálhatod az eseményeket!

**Fontos:** Készíts rendszeresen backup-ot, főleg nagy építkezések vagy fontos tenyésztések előtt!

---

*Ez az útmutató az ARK: Survival Ascended 2026 júliusi verziójához készült. A játék és a modok frissülhetnek, ami változtathat bizonyos lépéseken.*

