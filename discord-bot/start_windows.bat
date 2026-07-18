@echo off
title WildArk Discord Builder - Start

echo.
echo ============================================================
echo.
echo          WildArk Discord Builder Start
echo.
echo ============================================================
echo.

if not exist .env (
    echo [ERROR] .env file not found!
    echo.
    echo Please run setup first:
    echo    setup_windows.bat
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo [WARNING] node_modules not found!
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting bot...
echo.
echo ------------------------------------------------------------
echo.

call npm start

echo.
echo ------------------------------------------------------------
echo [OK] Bot stopped
echo.

pause
