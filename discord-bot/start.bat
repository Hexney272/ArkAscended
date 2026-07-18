@echo off
title WildArk Discord Builder - Inditas

echo.
echo ============================================================
echo.
echo          WildArk Discord Builder Inditas
echo.
echo ============================================================
echo.

if not exist .env (
    echo [HIBA] .env fajl nem talalhato!
    echo.
    echo Futtasd eloszor a telepito scriptet:
    echo    setup.bat
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo [FIGYELEM] node_modules nem talalhato!
    echo Fuggosegek telepitese...
    call npm install
    echo.
)

echo Bot inditasa...
echo.
echo ------------------------------------------------------------
echo.

call npm start

echo.
echo ------------------------------------------------------------
echo [OK] Bot leallt
echo.

pause
