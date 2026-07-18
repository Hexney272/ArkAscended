@echo off
chcp 65001 >nul 2>&1
title WildArk Discord Builder - Inditas

REM WildArk Discord Builder - Gyors Indito Script (Windows)

echo.
echo ============================================================
echo.
echo          WildArk Discord Builder Inditas
echo.
echo ============================================================
echo.

REM .env fajl ellenorzese
if not exist .env (
    echo [HIBA] .env fajl nem talalhato!
    echo.
    echo Futtasd eloszor a telepito scriptet:
    echo    setup.bat
    echo.
    pause
    exit /b 1
)

REM node_modules ellenorzese
if not exist node_modules (
    echo [FIGYELEM] node_modules nem talalhato!
    echo Fuggosegek telepitese...
    call npm install
    echo.
)

REM Bot inditasa
echo Bot inditasa...
echo.
echo ------------------------------------------------------------
echo.

call npm start

echo.
echo ------------------------------------------------------------
echo [OK] Bot leállt
echo.

pause
