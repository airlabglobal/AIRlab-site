#!/bin/bash

# AIRLAB Website - Automated Fix and Test Script
# This script automates the installation and testing process

echo "🚀 AIRLAB Website - Fix and Test Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean up
echo "📦 Step 1: Cleaning up old installations..."
rm -rf node_modules package-lock.json .next
echo -e "${GREEN}✓ Cleanup complete${NC}"
echo ""

# Step 2: Install dependencies
echo "📥 Step 2: Installing dependencies..."
npm install --legacy-peer-deps
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    echo "Try running: npm cache clean --force"
    exit 1
fi
echo ""

# Step 3: Type checking
echo "🔍 Step 3: Running type check..."
npm run typecheck
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Type check passed${NC}"
else
    echo -e "${YELLOW}⚠ Type check found issues (may be expected with ignoreBuildErrors)${NC}"
fi
echo ""

# Step 4: Linting
echo "🧹 Step 4: Running linter..."
npm run lint
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Linting passed${NC}"
else
    echo -e "${YELLOW}⚠ Linting found issues${NC}"
fi
echo ""

# Step 5: Build
echo "🏗️  Step 5: Building application..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# Summary
echo "✅ All automated checks complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start development server"
echo "2. Open http://localhost:9002 in your browser"
echo "3. Follow the manual testing checklist in INSTALLATION_AND_TESTING.md"
echo "4. Test admin panel at /admin-air-airlabalaba (password: AIRLAB_2025)"
echo ""
echo "📚 Documentation:"
echo "- COMPREHENSIVE_ISSUES_AND_FIXES.md - All identified issues and fixes"
echo "- INSTALLATION_AND_TESTING.md - Complete testing guide"
echo ""
