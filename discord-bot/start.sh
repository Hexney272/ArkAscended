#!/bin/bash

# WildArk Discord Builder - Gyors Indító Script
# Használat: ./start.sh

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║          🦖 WildArk Discord Builder Indítás 🦖           ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Színek
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

# .env fájl ellenőrzése
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env fájl nem található!${NC}"
    echo ""
    echo -e "${YELLOW}Futtasd először a telepítő scriptet:${NC}"
    echo -e "   ${CYAN}./setup.sh${NC}"
    echo ""
    exit 1
fi

# node_modules ellenőrzése
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}⚠️  node_modules nem található!${NC}"
    echo -e "${CYAN}Függőségek telepítése...${NC}"
    npm install
    echo ""
fi

# Bot indítása
echo -e "${PURPLE}🚀 Bot indítása...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm start

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Bot leállt${NC}"
echo ""
