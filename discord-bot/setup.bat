@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM WildArk Discord Builder - Automatikus Telepítő Script (Windows)
REM Verzió: 1.0.0

color 0D
title WildArk Discord Builder Telepítő

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║        🦖 WildArk Discord Builder Telepítő 🦖            ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Ez a script automatikusan telepíti és beállítja a botot!
echo.

REM Előfeltételek ellenőrzése
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 1️⃣  Előfeltételek ellenőrzése...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Node.js ellenőrzése
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js nincs telepítve!
    echo.
    echo Telepítsd innen: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js telepítve: %NODE_VERSION%

REM NPM ellenőrzése
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ NPM nincs telepítve!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ NPM telepítve: %NPM_VERSION%

echo.

REM Függőségek telepítése
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 2️⃣  Függőségek telepítése...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo 🔹 npm install futtatása...
call npm install

if %ERRORLEVEL% neq 0 (
    echo ❌ Hiba a függőségek telepítése során!
    pause
    exit /b 1
)

echo ✅ Függőségek telepítve!
echo.

REM Token-ek bekérése
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 3️⃣  Bot konfiguráció beállítása...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo ℹ️  Discord Bot token-ek szükségesek!
echo.
echo 📖 Hogyan szerzed meg a token-eket?
echo.
echo    1. Menj ide: https://discord.com/developers/applications
echo    2. Kattints: 'New Application'
echo    3. Menj a 'Bot' fülre
echo    4. Kapcsold BE az Intent-eket:
echo       ✅ Presence Intent
echo       ✅ Server Members Intent
echo       ✅ Message Content Intent
echo    5. Másold ki a Token-t
echo    6. General Information → Application ID
echo    7. Discord → Jobb klikk szerverre → Copy Server ID
echo.
echo ⚠️  Nyomj ENTER-t ha készen állsz...
pause >nul

echo.
echo ─────────────────────────────────────────────────────────────

REM Bot Token
echo.
echo 🔹 Discord Bot Token:
echo    (A Bot fülről - Reset Token után másold ki)
set /p DISCORD_TOKEN="   Token: "
echo.

REM Client ID
echo 🔹 Application ID (Client ID):
echo    (General Information fülről)
set /p CLIENT_ID="   Client ID: "
echo.

REM Guild ID
echo 🔹 Server ID (Guild ID):
echo    (Jobb klikk a Discord szerveredre → Copy Server ID)
set /p GUILD_ID="   Guild ID: "
echo.

REM Ellenőrzés
if "%DISCORD_TOKEN%"=="" (
    echo ❌ Discord Token kötelező!
    pause
    exit /b 1
)
if "%CLIENT_ID%"=="" (
    echo ❌ Client ID kötelező!
    pause
    exit /b 1
)
if "%GUILD_ID%"=="" (
    echo ❌ Guild ID kötelező!
    pause
    exit /b 1
)

REM .env fájl létrehozása
echo 🔹 .env fájl létrehozása...

(
echo # WildArk Discord Builder Configuration
echo # Automatikusan generálva: %date% %time%
echo.
echo # Discord Bot Token
echo DISCORD_TOKEN=%DISCORD_TOKEN%
echo.
echo # Guild ID (Server ID^)
echo GUILD_ID=%GUILD_ID%
echo.
echo # Client ID (Application ID^)
echo CLIENT_ID=%CLIENT_ID%
echo.
echo # Admin Role Name
echo ADMIN_ROLE_NAME=Founder
echo.
echo # WildArk Branding Colors
echo PRIMARY_COLOR=0x9333EA
echo SECONDARY_COLOR=0x000000
echo ACCENT_COLOR=0xA855F7
echo.
echo # Ticket System Settings
echo TICKET_CATEGORY_NAME=📫 Support Tickets
echo MAX_TICKETS_PER_USER=3
echo.
echo # Welcome Channel
echo WELCOME_CHANNEL_NAME=👋-üdvözlés
echo.
echo # Log Channel
echo LOG_CHANNEL_NAME=📋-staff-logs
) > .env

echo ✅ .env fájl létrehozva!
echo.

REM Bot meghívó link
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 4️⃣  Bot meghívása a szerverre...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

set INVITE_URL=https://discord.com/api/oauth2/authorize?client_id=%CLIENT_ID%^&permissions=8^&scope=bot%%20applications.commands

echo ℹ️  Használd ezt a linket a bot meghívásához:
echo.
echo    🔗 %INVITE_URL%
echo.

REM Automatikus böngésző megnyitás
echo ⚠️  Megnyitjuk a linket a böngészőben...
start "" "%INVITE_URL%"
echo.

echo ⚠️  Hívd meg a botot és nyomj ENTER-t amikor kész vagy...
pause >nul

echo.

REM Telepítés kész
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ Telepítés befejezve!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo ✅ A bot készen áll az indításra!
echo.
echo 📖 Következő lépések:
echo.
echo    1️⃣  Indítsd el a botot:
echo       npm start
echo.
echo    2️⃣  Várj 1-2 percet (parancsok regisztrációja)
echo.
echo    3️⃣  Discord-on használd a parancsot:
echo       /setup
echo.
echo    4️⃣  Élvezd a kész szervert! 🎉
echo.

echo ℹ️  Development módban (auto-restart):
echo    npm run dev
echo.

REM Opcionális automatikus indítás
echo ─────────────────────────────────────────────────────────────
set /p START_NOW="🚀 Szeretnéd most elindítani a botot? (y/n): "

if /i "%START_NOW%"=="y" (
    echo.
    echo 🔹 Bot indítása...
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║          🦖 WildArk Discord Builder Indítása...          ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    call npm start
) else (
    echo.
    echo ℹ️  A botot később indíthatod el: npm start
    echo.
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🦖 Köszönjük hogy a WildArk Discord Builder-t használod! 💜
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

pause
