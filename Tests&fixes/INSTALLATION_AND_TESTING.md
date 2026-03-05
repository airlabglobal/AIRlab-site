# AIRLAB Website - Installation & Testing Guide

## Step 1: Install Dependencies

### Option A: Clean Install (Recommended)
```bash
# Remove existing node_modules and lock file
rm -rf node_modules package-lock.json

# Install with legacy peer deps to handle React 19 compatibility
npm install --legacy-peer-deps
```

### Option B: If Network Issues Persist
```bash
# Clear npm cache
npm cache clean --force

# Try with different registry
npm install --legacy-peer-deps --registry=https://registry.npmjs.org/

# Or use yarn
yarn install
```

## Step 2: Verify Installation

```bash
# Check if Next.js is installed
npx next --version

# Run type checking
npm run typecheck
```

## Step 3: Build the Application

```bash
# Production build
npm run build

# This will identify any compilation errors
```

## Step 4: Run Development Server

```bash
# Start dev server on port 9002
npm run dev

# Open browser to http://localhost:9002
```

## Step 5: Manual Testing Checklist

### Homepage Testing
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Images load properly
- [ ] Navigation works
- [ ] Theme toggle works (light/dark mode)
- [ ] All links are functional
- [ ] Animations work smoothly
- [ ] Responsive on mobile/tablet/desktop

### Navigation Testing
- [ ] Header navigation works
- [ ] Mobile menu opens/closes
- [ ] Active page is highlighted
- [ ] Footer links work
- [ ] Social media links are correct

### Admin Panel Testing
- [ ] Navigate to `/admin-air-airlabalaba`
- [ ] Login page appears
- [ ] Enter password: `AIRLAB_2025`
- [ ] Dashboard loads after login
- [ ] All admin sections accessible:
  - [ ] Projects management
  - [ ] Research management
  - [ ] Team management
  - [ ] News management
- [ ] Logout works correctly

### Projects Page Testing
- [ ] Projects list displays
- [ ] Project cards render correctly
- [ ] Images load
- [ ] Tags display
- [ ] Status badges show correctly

### Research Page Testing
- [ ] Research papers list
- [ ] All data displays correctly
- [ ] Links work

### Team Page Testing
- [ ] Team members display
- [ ] Images load
- [ ] Bios are readable
- [ ] Social links work

### Contact Page Testing
- [ ] Form displays
- [ ] Form validation works
- [ ] Submit functionality (if implemented)

### About Page Testing
- [ ] Content displays
- [ ] Images load
- [ ] Layout is correct

## Step 6: Performance Testing

```bash
# Build for production
npm run build

# Start production server
npm start

# Test with Lighthouse in Chrome DevTools
# Target scores:
# - Performance: > 90
# - Accessibility: > 90
# - Best Practices: > 90
# - SEO: > 90
```

## Step 7: Accessibility Testing

### Manual Checks
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Screen reader compatibility (test with NVDA/JAWS)
- [ ] Color contrast is sufficient
- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Focus indicators are visible

### Automated Tools
```bash
# Install axe DevTools extension in Chrome
# Run accessibility audit on each page
```

## Step 8: Browser Compatibility Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Step 9: Responsive Design Testing

Test breakpoints:
- [ ] Mobile (320px - 640px)
- [ ] Tablet (641px - 1024px)
- [ ] Desktop (1025px+)
- [ ] Large screens (1920px+)

## Common Issues & Solutions

### Issue: "next is not recognized"
**Solution**: Run `npm install --legacy-peer-deps` first

### Issue: Build fails with TypeScript errors
**Solution**: Check `COMPREHENSIVE_ISSUES_AND_FIXES.md` for specific fixes

### Issue: Images not loading
**Solution**: 
- Check if images exist in `/public/images/`
- Verify external image URLs are accessible
- Check `next.config.ts` remote patterns

### Issue: Admin login not working
**Solution**: 
- Clear browser cache and sessionStorage
- Verify password is exactly: `AIRLAB_2025`
- Check browser console for errors

### Issue: Styles not applying
**Solution**:
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind config

## Step 10: Production Deployment Checklist

Before deploying:
- [ ] All tests pass
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Environment variables set (if any)
- [ ] Images optimized
- [ ] Performance scores acceptable
- [ ] Security headers configured
- [ ] Analytics configured (if needed)

## Deployment Commands

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

### Manual Deployment
```bash
# Build
npm run build

# Start production server
npm start
```

## Monitoring After Deployment

- [ ] Check all pages load correctly
- [ ] Test admin panel in production
- [ ] Verify SSL certificate
- [ ] Test from different locations
- [ ] Monitor error logs
- [ ] Check analytics

## Support

If issues persist:
1. Check the browser console for errors
2. Review `COMPREHENSIVE_ISSUES_AND_FIXES.md`
3. Check Next.js documentation
4. Verify all dependencies are installed correctly
