#!/bin/bash

# WildArk Discord Builder - Automatikus Telepítő Script
# Verzió: 1.0.0

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║        🦖 WildArk Discord Builder Telepítő 🦖            ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "Ez a script automatikusan telepíti és beállítja a botot!"
echo ""

# Színek
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Függvények
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_step() {
    echo -e "${PURPLE}🔹 $1${NC}"
}

# Ellenőrzések
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  Előfeltételek ellenőrzése..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Node.js ellenőrzése
if ! command -v node &> /dev/null; then
    print_error "Node.js nincs telepítve!"
    echo "Telepítsd innen: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js telepítve: $NODE_VERSION"

# NPM ellenőrzése
if ! command -v npm &> /dev/null; then
    print_error "NPM nincs telepítve!"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "NPM telepítve: $NPM_VERSION"

echo ""

# Függőségek telepítése
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Függőségek telepítése..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

print_step "npm install futtatása..."
npm install

if [ $? -eq 0 ]; then
    print_success "Függőségek telepítve!"
else
    print_error "Hiba a függőségek telepítése során!"
    exit 1
fi

echo ""

# Token-ek bekérése
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Bot konfiguráció beállítása..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

print_info "Discord Bot token-ek szükségesek!"
echo ""
echo "📖 Hogyan szerzed meg a token-eket?"
echo ""
echo "   1. Menj ide: https://discord.com/developers/applications"
echo "   2. Kattints: 'New Application'"
echo "   3. Menj a 'Bot' fülre"
echo "   4. Kapcsold BE az Intent-eket:"
echo "      ✅ Presence Intent"
echo "      ✅ Server Members Intent"
echo "      ✅ Message Content Intent"
echo "   5. Másold ki a Token-t"
echo "   6. General Information → Application ID"
echo "   7. Discord → Jobb klikk szerverre → Copy Server ID"
echo ""
print_warning "Nyomj ENTER-t ha készen állsz..."
read

echo ""
echo "─────────────────────────────────────────────────────────────"

# Bot Token
echo ""
print_step "Discord Bot Token:"
echo "   (A Bot fülről - Reset Token után másold ki)"
read -p "   Token: " DISCORD_TOKEN
echo ""

# Client ID
print_step "Application ID (Client ID):"
echo "   (General Information fülről)"
read -p "   Client ID: " CLIENT_ID
echo ""

# Guild ID
print_step "Server ID (Guild ID):"
echo "   (Jobb klikk a Discord szerveredre → Copy Server ID)"
read -p "   Guild ID: " GUILD_ID
echo ""

# Ellenőrzés
if [ -z "$DISCORD_TOKEN" ] || [ -z "$CLIENT_ID" ] || [ -z "$GUILD_ID" ]; then
    print_error "Minden mező kitöltése kötelező!"
    exit 1
fi

# .env fájl létrehozása
print_step ".env fájl létrehozása..."

cat > .env << EOF
# WildArk Discord Builder Configuration
# Automatikusan generálva: $(date)

# Discord Bot Token
DISCORD_TOKEN=$DISCORD_TOKEN

# Guild ID (Server ID)
GUILD_ID=$GUILD_ID

# Client ID (Application ID)
CLIENT_ID=$CLIENT_ID

# Admin Role Name
ADMIN_ROLE_NAME=Founder

# WildArk Branding Colors
PRIMARY_COLOR=0x9333EA
SECONDARY_COLOR=0x000000
ACCENT_COLOR=0xA855F7

# Ticket System Settings
TICKET_CATEGORY_NAME=📫 Support Tickets
MAX_TICKETS_PER_USER=3

# Welcome Channel
WELCOME_CHANNEL_NAME=👋-üdvözlés

# Log Channel
LOG_CHANNEL_NAME=📋-staff-logs
EOF

print_success ".env fájl létrehozva!"
echo ""

# Bot meghívó link generálása
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  Bot meghívása a szerverre..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

INVITE_URL="https://discord.com/api/oauth2/authorize?client_id=$CLIENT_ID&permissions=8&scope=bot%20applications.commands"

print_info "Használd ezt a linket a bot meghívásához:"
echo ""
echo "   🔗 $INVITE_URL"
echo ""
print_warning "Nyisd meg a linket a böngészőben és hívd meg a botot!"
print_warning "Nyomj ENTER-t amikor kész vagy..."
read

echo ""

# Telepítés kész
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Telepítés befejezve!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

print_success "A bot készen áll az indításra!"
echo ""
echo "📖 Következő lépések:"
echo ""
echo "   1️⃣  Indítsd el a botot:"
echo "      ${GREEN}npm start${NC}"
echo ""
echo "   2️⃣  Várj 1-2 percet (parancsok regisztrációja)"
echo ""
echo "   3️⃣  Discord-on használd a parancsot:"
echo "      ${PURPLE}/setup${NC}"
echo ""
echo "   4️⃣  Élvezd a kész szervert! 🎉"
echo ""

print_info "Development módban (auto-restart):"
echo "   ${CYAN}npm run dev${NC}"
echo ""

# Opcionális automatikus indítás
echo "─────────────────────────────────────────────────────────────"
read -p "🚀 Szeretnéd most elindítani a botot? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    print_step "Bot indítása..."
    echo ""
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║          🦖 WildArk Discord Builder Indítása...          ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo ""
    npm start
else
    echo ""
    print_info "A botot később indíthatod el: ${GREEN}npm start${NC}"
    echo ""
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🦖 Köszönjük hogy a WildArk Discord Builder-t használod! 💜"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
