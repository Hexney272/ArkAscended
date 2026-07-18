# 🤝 Közreműködési Útmutató

Köszönjük, hogy hozzá szeretnél járulni a WildArk Discord Builder projekthez!

## 🌟 Hogyan járulhatsz hozzá?

### 1. Bug Report (Hibák jelentése)

Ha hibát találtál:

1. Nézd meg, hogy [már jelentették-e](https://github.com/your-repo/issues)
2. Ha nem, nyiss egy új Issue-t
3. Használd a bug template-et
4. Add meg:
   - 📝 Hiba leírása
   - 🔄 Lépések a reprodukáláshoz
   - 💻 Rendszer információk (OS, Node verzió)
   - 📸 Screenshot (ha van)

### 2. Feature Request (Funkció kérése)

Van ötleted új funkcióra?

1. Nyiss egy új Issue-t
2. Címkézd: `enhancement`
3. Írd le:
   - 🎯 Mit szeretnél
   - 🤔 Miért hasznos lenne
   - 💡 Hogyan működne

### 3. Pull Request

Kódot szeretnél hozzáadni?

1. **Fork** a repository-t
2. **Clone** a saját forkodat
3. Hozz létre egy új **branch**-et:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Commit**-old a változásokat:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push**-old a branch-et:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Nyiss egy **Pull Request**-et

## 📋 Kódolási Szabályok

### JavaScript Style Guide

```javascript
// ✅ JÓ
export async function buildRoles(guild) {
  logger.info('Rangok építése...');
  // ...
}

// ❌ ROSSZ
export async function BuildRoles(Guild){
logger.info("Rangok építése...")
//...
}
```

**Szabályok**:
- ✅ camelCase function és változó nevekhez
- ✅ PascalCase class nevekhez
- ✅ 2 space indentálás
- ✅ Single quotes `'` string-ekhez
- ✅ Semicolon használata
- ✅ Async/await promise-okhoz
- ✅ JSDoc kommentek function-ökhöz

### Commit Messages

Használj [Conventional Commits](https://www.conventionalcommits.org/) formátumot:

```
<type>: <description>

[optional body]
```

**Típusok**:
- `feat`: Új funkció
- `fix`: Bug javítás
- `docs`: Dokumentáció
- `style`: Code formázás
- `refactor`: Code refactor
- `test`: Tesztek
- `chore`: Build, config

**Példák**:
```bash
feat: add automod spam detection
fix: ticket system not closing
docs: update installation guide
style: format code with prettier
refactor: simplify role builder logic
```

### File Structure

```
src/
├── commands/        # Slash commands
├── modules/         # Feature modulok
├── config/          # Konfigurációs fájlok
└── utils/           # Segéd funkciók
```

## 🧪 Tesztelés

Mielőtt PR-t nyitsz:

1. ✅ Teszteld a kódot
2. ✅ Ellenőrizd a syntax-ot:
   ```bash
   node --check src/index.js
   ```
3. ✅ Futtasd a botot:
   ```bash
   npm start
   ```
4. ✅ Teszteld az új funkciót Discord-on

## 📚 Dokumentáció

Ha új funkciót adsz hozzá:

1. ✅ Frissítsd a `README.md`-t
2. ✅ Frissítsd a `COMMANDS.md`-t (ha parancs)
3. ✅ Adj hozzá JSDoc kommenteket
4. ✅ Példakód (ha szükséges)

### JSDoc példa

```javascript
/**
 * Ticket létrehozása
 * @param {Guild} guild - Discord Guild
 * @param {User} user - User aki nyitotta
 * @param {number} ticketNumber - Ticket száma
 * @returns {Channel} - Létrehozott ticket channel
 */
async function createTicket(guild, user, ticketNumber) {
  // ...
}
```

## 🐛 Bug Fix Checklist

- [ ] Bug reprodukálható
- [ ] Fix implementálva
- [ ] Tesztelve
- [ ] Dokumentáció frissítve
- [ ] Commit message megfelelő

## ✨ Feature Checklist

- [ ] Feature terv elkészült
- [ ] Kód implementálva
- [ ] Dokumentáció hozzáadva
- [ ] Példakód hozzáadva
- [ ] Tesztelve
- [ ] README frissítve

## 💬 Code Review

Pull Request után:

1. ⏰ Várj a review-ra (1-3 nap)
2. 💬 Válaszolj a kommentekre
3. 🔄 Javítsd a kért változtatásokat
4. ✅ Merge után delete branch

## 🎉 Elismerés

Minden közreműködő megjelenik a README Contributors szekciójában!

## 📞 Kérdések?

- 💬 Discord: [WildArk Discord](https://discord.gg/wildark)
- 📧 Email: dev@wildark.hu
- 💻 GitHub Issues

## 📜 License

A projekthez való hozzájárulással elfogadod, hogy a kódod MIT licensz alatt lesz.

---

**Köszönjük a hozzájárulásod! 🦖💜**
