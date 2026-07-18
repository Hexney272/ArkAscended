# ARK: Survival Ascended PvE x50 Szerver Konfiguráció

Ez a repository tartalmazza az **ARK: Survival Ascended PvE x50** szerver teljes konfigurációját Nitrado szerverekhez.

## 📦 Tartalom

- **GameUserSettings.ini** - Fő szerver beállítások (x50 rates, 900 max wild dino level, player stats)
- **Game.ini** - Speciális játékmechanizmusok, mod konfigurációk, item stack sizes
- **NITRADO_TELEPITESI_UTMUTATO.md** - Részletes magyar nyelvű telepítési útmutató

## 🎮 Szerver Jellemzők

- **Térkép:** Ragnarok
- **Mód:** PvE (Player vs Environment)
- **Max Wild Dino Szint:** 900
- **Rates:** x50 (XP, Taming, Harvesting, Breeding)
- **Player Stats:** 2-5x szorzók (Health, Stamina, Weight, Damage)
- **Modok:** 35 mod telepítve

### Főbb Modok:
- GameServerApp.com Integration (Crossplay)
- Ark Primal Chaos & Ark Descended
- Automated Ark & ARKomatic
- Awesome Spyglass, Teleporters, Tools
- Super Cryo Storage & Pelayori's Cryo Storage
- WBUI2, SmartTurrets, FPS Boost Buttons
- És még 22 további mod!

## 🚀 Gyors Kezdés

1. **Töltsd le** a `GameUserSettings.ini` és `Game.ini` fájlokat
2. **Módosítsd** a `GameUserSettings.ini`-ben az admin jelszót:
   ```ini
   ServerAdminPassword=VÁLTOZTASD_MEG_EZT
   ```
3. **Kövesd** a `NITRADO_TELEPITESI_UTMUTATO.md` lépéseit
4. **Töltsd fel** a fájlokat a Nitrado szerver `/Config/WindowsServer/` mappájába
5. **Telepítsd** a modokat a Nitrado control panelen
6. **Indítsd el** a szervert!

## 📖 Részletes Dokumentáció

A teljes telepítési útmutató magyar nyelven elérhető a **[NITRADO_TELEPITESI_UTMUTATO.md](NITRADO_TELEPITESI_UTMUTATO.md)** fájlban, amely tartalmazza:

- ✅ Lépésről-lépésre telepítési instrukciók
- ✅ 35 mod telepítési sorrendje táblázattal
- ✅ Config fájlok feltöltése Nitrado-ra
- ✅ Hibaelhárítási szekció
- ✅ Admin parancsok referencia
- ✅ Karbantartási útmutató

## ⚙️ Konfiguráció Kiemelések

### GameUserSettings.ini
- **XP Multiplier:** 50x
- **Taming Speed:** 50x
- **Harvest Amount:** 50x
- **Breeding Speed:** 50x (mating, hatching, maturation)
- **Player Stats:** Health 3x, Stamina 3x, Weight 5x, Damage 3x, Speed 2x
- **Dino Stats:** Health 2x, Stamina 2x, Damage 2x, Speed 1.5x
- **Structure Decay:** 5x longer (PvE)

### Game.ini
- **Item Stacks:** 10,000 (basic resources)
- **Platform Saddle Limit:** 500 structures
- **Crop Growth:** 20x faster
- **Loot Quality:** 5x better
- **Cave Building:** Enabled
- **Cryopod Sickness:** Disabled (PvE)

## 🛠️ Fontos Admin Parancsok

```
enablecheats JELSZÓ          # Admin jogok aktiválása
destroywilddinos              # Wild dinók újra spawn-olása
saveworld                     # Kézi mentés
dorestartserver              # Szerver újraindítása
giveengrams                  # Összes engram feloldása
```

## 📊 Mod Telepítési Sorrend

A modokat **szigorúan ebben a sorrendben** telepítsd a Nitrado control panelen:

1. GameServerApp.com Integration (Crossplay)
2. EOS ID Helper (CrossPlay)
3. WBUI2
4. Ark Primal Chaos
5. Ark Descended
6. _(... és további 30 mod - lásd a teljes listát az útmutatóban)_

## ⚠️ Fontos Megjegyzések

- **Admin Jelszó:** Feltétlenül változtasd meg a `VÁLTOZTASD_MEG_EZT` részt egy erős jelszóra!
- **Mod Sorrend:** Kritikus fontosságú, hogy a modokat a megadott sorrendben telepítsd
- **Wild Dino Wipe:** Az első indítás után add ki a `destroywilddinos` parancsot
- **Backup:** Készíts rendszeres mentéseket a Nitrado panelen keresztül

## 🆘 Támogatás

- **Nitrado Support:** [https://support.nitrado.net/](https://support.nitrado.net/)
- **Issues:** Használd a GitHub Issues fület
- **ARK Discord:** [https://discord.gg/playark](https://discord.gg/playark)

## 📝 Verzió Információk

- **Verzió:** 1.0
- **Utolsó Frissítés:** 2026-07-18
- **ARK Verzió:** Survival Ascended
- **Platform:** Nitrado Dedicated Server

## 📜 Licenc

Ez a konfiguráció szabadon használható és módosítható. Ha hasznodra volt, adj egy ⭐-ot a repository-nak!

---

**Jó játékot és jó szórakozást a szerveren! 🦖🎮**