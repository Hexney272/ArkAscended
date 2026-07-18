@echo off
setlocal enabledelayedexpansion

title WildArk Discord Builder Setup

echo.
echo ============================================================
echo.
echo        WildArk Discord Builder Setup
echo.
echo ============================================================
echo.
echo This script will install and configure the bot!
echo.

echo ============================================================
echo 1. Checking prerequisites...
echo ============================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Download from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js installed: %NODE_VERSION%

where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] NPM is not installed!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] NPM installed: %NPM_VERSION%

echo.

echo ============================================================
echo 2. Installing dependencies...
echo ============================================================
echo.

echo Running npm install...
call npm install

if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)

echo [OK] Dependencies installed!
echo.

echo ============================================================
echo 3. Bot configuration...
echo ============================================================
echo.

echo Discord Bot tokens are required!
echo.
echo How to get the tokens:
echo.
echo    1. Go to: https://discord.com/developers/applications
echo    2. Click: New Application
echo    3. Go to Bot tab
echo    4. Enable Intents (ALL 3):
echo       [X] Presence Intent
echo       [X] Server Members Intent
echo       [X] Message Content Intent
echo    5. Copy the Token (Reset Token button)
echo    6. General Information - Application ID
echo    7. Discord - Right click server - Copy Server ID
echo.
echo Press ENTER when ready...
pause >nul

echo.
echo ------------------------------------------------------------

echo.
echo Discord Bot Token:
echo    (From Bot tab - Reset Token)
set /p DISCORD_TOKEN="   Token: "
echo.

echo Application ID (Client ID):
echo    (From General Information)
set /p CLIENT_ID="   Client ID: "
echo.

echo Server ID (Guild ID):
echo    (Right click server - Copy Server ID)
set /p GUILD_ID="   Guild ID: "
echo.

if "%DISCORD_TOKEN%"=="" (
    echo [ERROR] Discord Token is required!
    pause
    exit /b 1
)
if "%CLIENT_ID%"=="" (
    echo [ERROR] Client ID is required!
    pause
    exit /b 1
)
if "%GUILD_ID%"=="" (
    echo [ERROR] Guild ID is required!
    pause
    exit /b 1
)

echo Creating .env file...

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
echo WELCOME_CHANNEL_NAME=welcome
echo LOG_CHANNEL_NAME=staff-logs
) > .env

echo [OK] .env file created!
echo.

echo ============================================================
echo 4. Invite bot to server...
echo ============================================================
echo.

set INVITE_URL=https://discord.com/api/oauth2/authorize?client_id=%CLIENT_ID%^&permissions=8^&scope=bot%%20applications.commands

echo Use this link to invite the bot:
echo.
echo    %INVITE_URL%
echo.

echo Opening link in browser...
start "" "%INVITE_URL%"
echo.

echo Invite the bot and press ENTER when done...
pause >nul

echo.

echo ============================================================
echo [OK] Setup complete!
echo ============================================================
echo.

echo The bot is ready to start!
echo.
echo Next steps:
echo.
echo    1. Start the bot:
echo       npm start
echo.
echo    2. Wait 1-2 minutes (command registration)
echo.
echo    3. Use on Discord:
echo       /setup
echo.
echo    4. Enjoy!
echo.

echo Development mode:
echo    npm run dev
echo.

echo ------------------------------------------------------------
set /p START_NOW="Start the bot now? (y/n): "

if /i "%START_NOW%"=="y" (
    echo.
    echo Starting bot...
    echo.
    echo ============================================================
    echo          WildArk Discord Builder Starting...
    echo ============================================================
    echo.
    call npm start
) else (
    echo.
    echo You can start the bot later: npm start
    echo.
)

echo.
echo ============================================================
echo Thank you for using WildArk Discord Builder!
echo ============================================================
echo.

pause
