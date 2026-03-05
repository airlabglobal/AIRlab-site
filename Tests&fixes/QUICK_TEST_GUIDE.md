# Quick Test Guide - AIRLAB Website

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open http://localhost:9002

### 3. Quick Visual Check
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Theme toggle works
- ✅ Images display
- ✅ No console errors

---

## 🔐 Test Admin Panel (2 Minutes)

### 1. Navigate to Admin
```
http://localhost:9002/admin
```

### 2. Login
- Password: `AIRLAB_2025`
- Should redirect to dashboard

### 3. Test CRUD Operations
- Click "Add New Project"
- Fill form and submit
- Verify project appears in list
- Edit the project
- Delete the project

---

## 🧪 Run Automated Tests (Optional)

### Setup Testing (First Time Only)
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### Create Jest Config
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Create Jest Setup
```javascript
// jest.setup.js
import '@testing-library/jest-dom'
```

### Add Test Script to package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### Run Tests
```bash
npm test
```

---

## 🏗️ Build Test (1 Minute)

### Production Build
```bash
npm run build
```

### Expected Output
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### Start Production Server
```bash
npm start
```

---

## 🔍 Common Issues & Fixes

### Issue: "npm not found"
**Fix:** Install Node.js from https://nodejs.org/

### Issue: Port 9002 already in use
**Fix:** 
```bash
# Kill process on port 9002
npx kill-port 9002
# Or change port in package.json
```

### Issue: Build fails with TypeScript errors
**Fix:** 
```bash
npm run typecheck
# Fix errors or temporarily ignore in next.config.ts
```

### Issue: Images not loading
**Fix:** Check image URLs in JSON files are valid

### Issue: Admin login not working
**Fix:** 
- Clear browser cache
- Check sessionStorage in DevTools
- Verify password is exactly: `AIRLAB_2025`

---

## 📱 Mobile Testing (5 Minutes)

### Using Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test these devices:
   - iPhone 12 Pro
   - iPad Air
   - Samsung Galaxy S20

### Check:
- ✅ Mobile menu works
- ✅ Touch targets are large enough
- ✅ Text is readable
- ✅ Images scale properly
- ✅ Forms are usable

---

## 🎨 Theme Testing (2 Minutes)

### Light Mode
1. Click theme toggle (sun/moon icon)
2. Verify:
   - Background is light
   - Text is dark and readable
   - Colors have good contrast

### Dark Mode
1. Click theme toggle again
2. Verify:
   - Background is dark grey
   - Text is light/white
   - Colors maintain contrast

---

## ♿ Accessibility Quick Check (3 Minutes)

### Keyboard Navigation
1. Press Tab repeatedly
2. Verify:
   - Focus indicators visible
   - Can reach all interactive elements
   - Modal traps focus

### Screen Reader (Optional)
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate the site
3. Verify:
   - Images have alt text
   - Buttons are labeled
   - Headings are hierarchical

---

## 🚨 Critical Tests Before Deployment

### 1. Security Check
```bash
npm audit
```
Fix any high/critical vulnerabilities

### 2. Performance Check
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 90

### 3. Cross-Browser Check
Test in:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### 4. Data Integrity Check
```bash
# Verify JSON files are valid
node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/projects.json')))"
node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/news.json')))"
```

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

✅ PASSED
- [ ] Build succeeds
- [ ] Dev server runs
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Admin login works
- [ ] CRUD operations work
- [ ] Mobile responsive
- [ ] Theme toggle works
- [ ] No console errors

❌ FAILED
- Issue 1: ___________
- Issue 2: ___________

📝 NOTES
___________
```

---

## 🎯 Priority Testing Order

### Must Test (Critical)
1. Build succeeds
2. Admin authentication works
3. CRUD operations work
4. No console errors

### Should Test (Important)
1. All pages load
2. Navigation works
3. Forms submit
4. Mobile responsive

### Nice to Test (Optional)
1. Animations smooth
2. Performance scores
3. Accessibility
4. Cross-browser

---

## 💡 Pro Tips

### Fast Testing
```bash
# Watch mode for development
npm run dev

# In another terminal, watch for TypeScript errors
npm run typecheck -- --watch
```

### Debug Mode
```bash
# Enable verbose logging
NODE_ENV=development npm run dev
```

### Clear Cache
```bash
# If things act weird, clear Next.js cache
rm -rf .next
npm run dev
```

---

## 📞 Need Help?

### Check These Files
1. `TEST_RESULTS.md` - What's been tested
2. `ISSUES_FOUND.md` - Known issues
3. `SECURITY_RECOMMENDATIONS.md` - Security fixes
4. `TESTING_CHECKLIST.md` - Comprehensive checklist

### Common Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript
```

---

## ✅ Done!

If all quick tests pass, your app is ready for more thorough testing. Follow the comprehensive `TESTING_CHECKLIST.md` for production deployment.
