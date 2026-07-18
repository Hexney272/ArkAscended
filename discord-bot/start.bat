@echo off
chcp 65001 >nul
title WildArk Discord Builder - Indítás

REM WildArk Discord Builder - Gyors Indító Script (Windows)
REM Használat: start.bat

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║          🦖 WildArk Discord Builder Indítás 🦖           ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM .env fájl ellenőrzése
if not exist .env (
    echo ❌ .env fájl nem található!
    echo.
    echo ⚠️  Futtasd először a telepítő scriptet:
    echo    setup.bat
    echo.
    pause
    exit /b 1
)

REM node_modules ellenőrzése
if not exist node_modules (
    echo ⚠️  node_modules nem található!
    echo 🔹 Függőségek telepítése...
    call npm install
    echo.
)

REM Bot indítása
echo 🚀 Bot indítása...
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

call npm start

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ Bot leállt
echo.

pause
