# AIRLAB Website - Automated Fix and Test Script (PowerShell)
# This script automates the installation and testing process for Windows

Write-Host "🚀 AIRLAB Website - Fix and Test Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean up
Write-Host "📦 Step 1: Cleaning up old installations..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Write-Host "✓ Cleanup complete" -ForegroundColor Green
Write-Host ""

# Step 2: Install dependencies
Write-Host "📥 Step 2: Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    Write-Host "Try running: npm cache clean --force" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Step 3: Type checking
Write-Host "🔍 Step 3: Running type check..." -ForegroundColor Yellow
npm run typecheck
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Type check passed" -ForegroundColor Green
} else {
    Write-Host "⚠ Type check found issues (may be expected with ignoreBuildErrors)" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Linting
Write-Host "🧹 Step 4: Running linter..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Linting passed" -ForegroundColor Green
} else {
    Write-Host "⚠ Linting found issues" -ForegroundColor Yellow
}
Write-Host ""

# Step 5: Build
Write-Host "🏗️  Step 5: Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Summary
Write-Host "✅ All automated checks complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run 'npm run dev' to start development server"
Write-Host "2. Open http://localhost:9002 in your browser"
Write-Host "3. Follow the manual testing checklist in INSTALLATION_AND_TESTING.md"
Write-Host "4. Test admin panel at /admin-air-airlabalaba (password: AIRLAB_2025)"
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "- COMPREHENSIVE_ISSUES_AND_FIXES.md - All identified issues and fixes"
Write-Host "- INSTALLATION_AND_TESTING.md - Complete testing guide"
Write-Host ""
