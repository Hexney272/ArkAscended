# 📜 WildArk Discord Builder - Parancsok Referencia

## 🎯 Parancs Áttekintés

Az összes parancs slash command (`/`) formátumban érhető el.

---

## 🔧 Admin Parancsok

### `/setup`
**Leírás**: Teljes WildArk szerver felépítése egy parancsra

**Jogosultság**: Administrator

**Használat**:
```
/setup
```

**Mit csinál**:
1. ✅ Létrehozza az összes rangot (Founder → Member)
2. ✅ Létrehozza az összes kategóriát
3. ✅ Létrehozza az összes csatornát
4. ✅ Beállítja a jogosultságokat
5. ✅ Elküldi a szabályzatot
6. ✅ Beállítja a Reaction Roles-t
7. ✅ Beállítja a Ticket rendszert
8. ✅ Beállítja a Welcome rendszert
9. ✅ Aktiválja az AutoMod-ot

**Időtartam**: ~30-60 másodperc

**Megjegyzés**: 
- Csak egyszer kell futtatni
- Ha újrafuttatod, frissíti a meglévő elemeket
- Admin jogosultság szükséges

---

### `/purge <count>`
**Leírás**: Üzenetek törlése a csatornából

**Jogosultság**: Manage Messages

**Paraméterek**:
- `count`: Törölendő üzenetek száma (1-100)

**Használat**:
```
/purge count:50
```

**Példák**:
- `/purge count:10` - 10 üzenet törlése
- `/purge count:100` - 100 üzenet törlése (maximum)

**Megjegyzés**:
- Maximum 100 üzenet törölhető egyszerre
- 14 napnál régebbi üzenetek nem törölhetők (Discord limit)
- Csak moderátorok használhatják

---

### `/automod`
**Leírás**: AutoMod konfiguráció megjelenítése

**Jogosultság**: Administrator

**Használat**:
```
/automod
```

**Megjeleníti**:
- 📊 Spam védelem beállításai
- 🔗 Link védelem whitelist
- 📢 CAPS limit
- 🚫 Tiltott szavak száma
- 👥 Mention spam limit

**Megjegyzés**: Csak admin jogosultsággal használható

---

### `/serverinfo`
**Leírás**: Szerver információk megjelenítése

**Jogosultság**: Mindenki

**Használat**:
```
/serverinfo
```

**Megjeleníti**:
- 👑 Tulajdonos
- 👥 Tagok száma
- 🎭 Rangok száma
- 💬 Csatornák száma
- 🎉 Boostok száma
- 📅 Szerver létrehozásának dátuma

---

## 🎫 Ticket Parancsok

### `/ticket-close`
**Leírás**: Aktív ticket bezárása

**Jogosultság**: Staff (Helper+)

**Használat**:
```
/ticket-close
```

**Mit csinál**:
1. Bezárja a ticketet
2. Log-olja a műveletet
3. 10 másodperc múlva törli a csatornát

**Megjegyzés**:
- Csak ticket csatornában működik
- Csak staff használhatja
- Automatikus log a `📋-staff-logs`-ba

---

### `/ticket-add <user>`
**Leírás**: User hozzáadása az aktuális tickethez

**Jogosultság**: Staff (Helper+)

**Paraméterek**:
- `user`: A hozzáadandó user (@mention)

**Használat**:
```
/ticket-add user:@username
```

**Példák**:
- `/ticket-add user:@Player123` - Player123 hozzáadása a tickethez

**Mit csinál**:
- Megadja a viewelési és írási jogot a usernek
- Log-olja a műveletet

**Megjegyzés**: Csak ticket csatornában működik

---

## 🎭 Reaction Roles

A Reaction Roles automatikusan működik a `🎭-rangok` csatornában.

**Elérhető rangok**:

| Emoji | Rang | Szín |
|-------|------|------|
| 🦖 | Primal Chaos | Zöld |
| 🌊 | Primal Descended | Kék |
| ⚔️ | Tides of Fortune | Narancs |
| 🔔 | Értesítések | Lila |
| 📢 | Hírek | Pink |

**Használat**:
1. Menj a `🎭-rangok` csatornába
2. Kattints az emoji reakcióra
3. Automatikusan megkapod a rangot
4. Reakció eltávolításával leveszi a rangot

---

## 🎫 Ticket Rendszer

### Ticket nyitása

**Lépések**:
1. Menj a `📫-ticket-központ` csatornába
2. Kattints a 🎫 reakcióra
3. Automatikusan létrejön egy privát csatorna
4. Írd le a problémádat
5. A staff válaszol

**Megjegyzés**:
- Egyszerre csak 1 aktív ticket lehet
- Staff automatikusan értesítést kap
- Minden ticket log-olódik

### Ticket bezárása

**Módszerek**:
1. `/ticket-close` parancs használata
2. 🔒 gomb megnyomása a ticket csatornában

---

## 👋 Welcome Rendszer

**Automatikusan működik!**

**Mit csinál**:
- Új member csatlakozásakor welcome üzenet a `👋-üdvözlés` csatornában
- Automatikusan megadja a `⚪ Member` rangot
- Member count frissítése

**Goodbye üzenet**:
- Member távozásakor goodbye üzenet
- Member count frissítése

---

## 🛡️ AutoMod Rendszer

**Automatikusan fut a háttérben!**

### Funkciók

**1. Spam védelem**
- Max 5 üzenet / 5 másodperc
- Automatikus mute: 5 perc
- Cache reset

**2. Link védelem**
- Engedélyezett domain-ek:
  - discord.gg
  - youtube.com / youtu.be
  - twitch.tv
  - twitter.com / x.com
- Nem engedélyezett linkek törlése

**3. CAPS védelem**
- 70% CAPS limit
- Min 10 karakter hossz
- Automatikus üzenet törlés

**4. Tiltott szavak**
- Magyar és angol káromkodások
- Automatikus üzenet törlés
- Nincs mute (csak figyelmeztetés)

**5. Mention spam**
- Max 5 mention / üzenet
- Automatikus mute: 5 perc

**Staff mentesség**:
- Staff tagok (Helper+) mentesek az AutoMod alól

**Logolás**:
- Minden AutoMod akció log-olódik a `📋-staff-logs` csatornában

---

## 📊 Parancs Jogosultságok

| Rang | Parancsok |
|------|-----------|
| 👑 Founder | Minden parancs |
| 🔴 Admin | Minden parancs |
| 🟠 Moderator | `/purge`, `/ticket-close`, `/ticket-add`, `/serverinfo` |
| 🟡 Helper | `/ticket-close`, `/ticket-add`, `/serverinfo` |
| 💜 VIP | `/serverinfo` |
| 🔵 Active Member | `/serverinfo` |
| ⚪ Member | `/serverinfo` |

---

## 🚀 Gyors Parancs Referencia

```bash
# Admin
/setup              # Szerver telepítése
/purge count:50     # 50 üzenet törlése
/automod            # AutoMod státusz
/serverinfo         # Szerver info

# Ticket
/ticket-close       # Ticket bezárása
/ticket-add user:@user  # User hozzáadása
```

---

## 💡 Tippek

1. **Setup parancs**: Csak egyszer futtasd, ha újat akarsz építeni
2. **Purge**: 14 napnál régebbi üzenetek nem törölhetők
3. **Ticket**: Egyszerre csak 1 aktív ticket lehet userenként
4. **AutoMod**: Staff tagok mentesek az AutoMod alól
5. **Reaction Roles**: Bármikor változtatható a `🎭-rangok` csatornában

---

## 🐛 Hibakezelés

Ha egy parancs nem működik:

1. ✅ Ellenőrizd a jogosultságokat
2. ✅ Várj 1-2 másodpercet
3. ✅ Próbáld újra
4. ✅ Ha továbbra sem működik, jelezd a staff-nak

---

**Készítette**: WildArk Development Team  
**Verzió**: 1.0.0  
**Utolsó frissítés**: 2026-07-18
