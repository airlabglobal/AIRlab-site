# Quick Test & Build Guide

## Prerequisites
Ensure you have Node.js installed and dependencies are up to date:
```bash
npm install
```

## Run Tests

### 1. Development Server
```bash
npm run dev
```
Visit: http://localhost:9002

### 2. Production Build
```bash
npm run build
```

### 3. Type Checking
```bash
npm run typecheck
```

### 4. Linting
```bash
npm run lint
```

## Manual Testing Checklist

### Public Pages
- [ ] Home page loads (`/`)
- [ ] About page loads (`/about`)
- [ ] Projects page loads (`/projects`)
- [ ] Research page loads (`/research`)
- [ ] Team page loads (`/team`)
- [ ] Contact page loads (`/contact`)

### Admin Panel
- [ ] Admin login page loads (`/admin-air-airlabalaba`)
- [ ] Login with password: `AIRLAB_2025`
- [ ] Projects management works
- [ ] News management works
- [ ] Research management works
- [ ] Team management works
- [ ] CRUD operations work (Create, Read, Update, Delete)

### Responsive Design
- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)

### Theme Toggle
- [ ] Light mode works
- [ ] Dark mode works
- [ ] Theme persists on reload

### Performance
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Fast page transitions

## Common Issues & Solutions

### Issue: npm not recognized
**Solution**: Ensure Node.js is installed and added to PATH

### Issue: Port 9002 already in use
**Solution**: 
```bash
# Kill the process using port 9002
# Windows:
netstat -ano | findstr :9002
taskkill /PID <PID> /F

# Or change port in package.json
```

### Issue: Build fails
**Solution**: 
```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### Issue: Images not loading
**Solution**: Check internet connection (external images) or verify files exist in `/public/images/`

## Expected Results

### Development Server
- Should start without errors
- Should be accessible at http://localhost:9002
- Hot reload should work

### Production Build
- Should complete without errors
- Should generate `.next` folder
- Should show build statistics

### Type Checking
- May show warnings (ignoreBuildErrors is enabled)
- Should not fail the build

## Performance Metrics

Expected Lighthouse scores:
- Performance: 85+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+
