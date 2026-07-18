@echo off
setlocal enabledelayedexpansion

title WildArk Discord Builder - Telepito

echo.
echo ============================================================
echo.
echo        WildArk Discord Builder Telepito
echo.
echo ============================================================
echo.
echo Ez a script automatikusan telepiti es beallitja a botot!
echo.

echo ============================================================
echo 1. Elofeltetelek ellenorzese...
echo ============================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [HIBA] Node.js nincs telepitve!
    echo.
    echo Toltsd le innen: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js telepitve: %NODE_VERSION%

where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [HIBA] NPM nincs telepitve!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] NPM telepitve: %NPM_VERSION%

echo.

echo ============================================================
echo 2. Fuggosegek telepitese...
echo ============================================================
echo.

echo npm install futtatasa...
call npm install

if %ERRORLEVEL% neq 0 (
    echo [HIBA] Nem sikerult telepiteni a fuggosegeket!
    pause
    exit /b 1
)

echo [OK] Fuggosegek telepitve!
echo.

echo ============================================================
echo 3. Bot konfiguracio beallitasa...
echo ============================================================
echo.

echo Discord Bot token-ek szuksegesek!
echo.
echo Hogyan szerzed meg a token-eket?
echo.
echo    1. Menj ide: https://discord.com/developers/applications
echo    2. Kattints: New Application
echo    3. Menj a Bot fulre
echo    4. Kapcsold BE mindharom Intent-et:
echo       [X] Presence Intent
echo       [X] Server Members Intent
echo       [X] Message Content Intent
echo    5. Kattints: Save Changes
echo    6. Kattints: Reset Token, majd masold ki
echo    7. General Information fulon: Application ID masolasa
echo    8. Discord-ban: jobb klikk a szerveredre - Copy Server ID
echo       (Developer Mode kell hozza: Settings - Advanced)
echo.
echo Nyomj ENTER-t ha keszen allsz...
pause >nul

echo.
echo ------------------------------------------------------------
echo.
echo Discord Bot Token:
set /p DISCORD_TOKEN="   Token: "
echo.

echo Application ID (Client ID):
set /p CLIENT_ID="   Client ID: "
echo.

echo Server ID (Guild ID):
set /p GUILD_ID="   Guild ID: "
echo.

if "%DISCORD_TOKEN%"=="" (
    echo [HIBA] Discord Token megadasa kotelezo!
    pause
    exit /b 1
)
if "%CLIENT_ID%"=="" (
    echo [HIBA] Client ID megadasa kotelezo!
    pause
    exit /b 1
)
if "%GUILD_ID%"=="" (
    echo [HIBA] Guild ID megadasa kotelezo!
    pause
    exit /b 1
)

echo ------------------------------------------------------------
echo.
echo ARK Szerver Statusz Monitor beallitasa (opcionalis):
echo    A szerver IP-jet a Nitrado/hoszting admin panelen talalod.
echo    A QUERY PORT nem biztos hogy megegyezik a game porttal!
echo    Ha most kihagyod, ures marad es a bot "ismeretlen"
echo    statusszal jelzi - kesobb a .env fajlban is megadhatod.
echo.
set /p ARK_SERVER_HOST="   Szerver IP (ENTER = kihagyas): "
if not "%ARK_SERVER_HOST%"=="" (
    set /p ARK_SERVER_QUERY_PORT="   Query Port (ENTER = 27015): "
    if "%ARK_SERVER_QUERY_PORT%"=="" set ARK_SERVER_QUERY_PORT=27015
) else (
    set ARK_SERVER_QUERY_PORT=27015
)
echo.

echo .env fajl letrehozasa...

(
echo DISCORD_TOKEN=%DISCORD_TOKEN%
echo GUILD_ID=%GUILD_ID%
echo CLIENT_ID=%CLIENT_ID%
echo ADMIN_ROLE_NAME=Founder
echo PRIMARY_COLOR=0x9333EA
echo SECONDARY_COLOR=0x000000
echo ACCENT_COLOR=0xA855F7
echo TICKET_CATEGORY_NAME=Support Tickets
echo MAX_TICKETS_PER_USER=3
echo WELCOME_CHANNEL_NAME=udvozles
echo LOG_CHANNEL_NAME=staff-logs
echo ARK_SERVER_HOST=%ARK_SERVER_HOST%
echo ARK_SERVER_QUERY_PORT=%ARK_SERVER_QUERY_PORT%
echo SERVER_STATUS_REFRESH_MINUTES=1
) > .env

echo [OK] .env fajl letrehozva!
echo.

echo ============================================================
echo 4. Bot meghivasa a szerverre...
echo ============================================================
echo.

set INVITE_URL=https://discord.com/api/oauth2/authorize?client_id=%CLIENT_ID%^&permissions=8^&scope=bot%%20applications.commands

echo Hasznald ezt a linket a bot meghivasahoz:
echo.
echo    %INVITE_URL%
echo.

echo Megnyitjuk a linket a bongeszoben...
start "" "%INVITE_URL%"
echo.

echo Hivd meg a botot, majd nyomj ENTER-t...
pause >nul

echo.
echo ============================================================
echo [OK] Telepites befejezve!
echo ============================================================
echo.
echo Kovetkezo lepesek:
echo.
echo    1. Inditsd el a botot: npm start
echo    2. Varj 1-2 percet (parancsok regisztracioja)
echo    3. Discord-on hasznald: /setup
echo.

echo ------------------------------------------------------------
set /p START_NOW="Elinditod most a botot? (i/n): "

if /i "%START_NOW%"=="i" (
    echo.
    echo Bot inditasa...
    echo.
    echo ============================================================
    echo          WildArk Discord Builder Inditasa...
    echo ============================================================
    echo.
    call npm start
) else (
    echo.
    echo A botot kesobb indithatod: npm start
    echo.
)

echo.
echo ============================================================
echo Koszonjuk, hogy a WildArk Discord Builder-t hasznalod!
echo ============================================================
echo.

pause
