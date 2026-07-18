@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

REM WildArk Discord Builder - Windows Telepito
REM Verzio: 1.0.1 - Fixed Windows compatibility

title WildArk Discord Builder Telepito

echo.
echo ============================================================
echo.
echo        WildArk Discord Builder Telepito
echo.
echo ============================================================
echo.
echo Ez a script automatikusan telepiti es beallitja a botot!
echo.

REM Node.js ellenorzese
echo ============================================================
echo 1. Elofeltetelek ellenorzese...
echo ============================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [HIBA] Node.js nincs telepitve!
    echo.
    echo Telepitsd innen: https://nodejs.org/
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

REM Fuggosegek telepitese
echo ============================================================
echo 2. Fuggosegek telepitese...
echo ============================================================
echo.

echo npm install futtatasa...
call npm install

if %ERRORLEVEL% neq 0 (
    echo [HIBA] Hiba a fuggosegek telepitese soran!
    pause
    exit /b 1
)

echo [OK] Fuggosegek telepitve!
echo.

REM Token-ek bekerése
echo ============================================================
echo 3. Bot konfiguracio beallitasa...
echo ============================================================
echo.

echo Discord Bot token-ek szuksegesek!
echo.
echo Hogyan szerzed meg a token-eket?
echo.
echo    1. Menj ide: https://discord.com/developers/applications
echo    2. Kattints: 'New Application'
echo    3. Menj a 'Bot' fulre
echo    4. Kapcsold BE az Intent-eket:
echo       [X] Presence Intent
echo       [X] Server Members Intent
echo       [X] Message Content Intent
echo    5. Masold ki a Token-t
echo    6. General Information -^> Application ID
echo    7. Discord -^> Jobb klikk szerverre -^> Copy Server ID
echo.
echo Nyomj ENTER-t ha keszen allsz...
pause >nul

echo.
echo ------------------------------------------------------------

REM Bot Token
echo.
echo Discord Bot Token:
echo    (A Bot fulrol - Reset Token utan masold ki)
set /p DISCORD_TOKEN="   Token: "
echo.

REM Client ID
echo Application ID (Client ID):
echo    (General Information fulrol)
set /p CLIENT_ID="   Client ID: "
echo.

REM Guild ID
echo Server ID (Guild ID):
echo    (Jobb klikk a Discord szerveredre -^> Copy Server ID)
set /p GUILD_ID="   Guild ID: "
echo.

REM Ellenorzes
if "%DISCORD_TOKEN%"=="" (
    echo [HIBA] Discord Token kotelezo!
    pause
    exit /b 1
)
if "%CLIENT_ID%"=="" (
    echo [HIBA] Client ID kotelezo!
    pause
    exit /b 1
)
if "%GUILD_ID%"=="" (
    echo [HIBA] Guild ID kotelezo!
    pause
    exit /b 1
)

REM .env fajl letrehozasa
echo .env fajl letrehozasa...

(
echo # WildArk Discord Builder Configuration
echo # Automatikusan generalva
echo.
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
) > .env

echo [OK] .env fajl letrehozva!
echo.

REM Bot meghivo link
echo ============================================================
echo 4. Bot meghivasa a szerverre...
echo ============================================================
echo.

set INVITE_URL=https://discord.com/api/oauth2/authorize?client_id=%CLIENT_ID%^&permissions=8^&scope=bot%%20applications.commands

echo Hasznald ezt a linket a bot meghivasahoz:
echo.
echo    %INVITE_URL%
echo.

echo Megnyitjuk a linket a bongesztoben...
start "" "%INVITE_URL%"
echo.

echo Hivd meg a botot es nyomj ENTER-t amikor kesz vagy...
pause >nul

echo.

REM Telepites kesz
echo ============================================================
echo [OK] Telepites befejezve!
echo ============================================================
echo.

echo A bot keszen all az inditasra!
echo.
echo Kovetkezo lepesek:
echo.
echo    1. Inditsd el a botot:
echo       npm start
echo.
echo    2. Varj 1-2 percet (parancsok regisztracioja)
echo.
echo    3. Discord-on hasznald a parancsot:
echo       /setup
echo.
echo    4. Elvezd a kesz szervert!
echo.

echo Development modban (auto-restart):
echo    npm run dev
echo.

REM Opcionalis automatikus inditas
echo ------------------------------------------------------------
set /p START_NOW="Szeretned most elinditani a botot? (i/n): "

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
    echo A botot kesobb indithatod el: npm start
    echo.
)

echo.
echo ============================================================
echo Koszonjuk hogy a WildArk Discord Builder-t hasznalod!
echo ============================================================
echo.

pause
