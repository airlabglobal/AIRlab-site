# AIRLAB Website - Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Install Dependencies
```bash
npm install jose
npm install --legacy-peer-deps
```

### 2. Environment Variables
Create `.env.local` (already created) and update for production:

```env
# CRITICAL: Change these for production!
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=generate_a_secure_random_32_char_string_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=AIRLAB UNILAG
NEXT_PUBLIC_CONTACT_EMAIL=airol@unilag.edu.ng
```

### 3. Generate Secure JWT Secret
```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

---

## 🔐 Security Features Implemented

### ✅ Authentication & Authorization
- JWT-based authentication with httpOnly cookies
- Secure password verification
- Token expiration (24 hours)
- Protected API routes with middleware
- Automatic token verification

### ✅ Input Validation
- Zod schemas for all data types
- Server-side validation on all API routes
- Type-safe data handling

### ✅ Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Secure cookies in production

### ✅ Error Handling
- Global error boundary
- Graceful error messages
- Error logging
- User-friendly fallbacks

---

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Production ready"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables in Vercel dashboard
- Deploy!

3. **Environment Variables in Vercel**
```
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_32_chars
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=AIRLAB UNILAG
NEXT_PUBLIC_CONTACT_EMAIL=airol@unilag.edu.ng
```

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Add environment variables** in Netlify dashboard

### Option 3: Self-Hosted (VPS/Cloud)

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "airlab" -- start
pm2 save
pm2 startup
```

---

## 🔧 Post-Deployment Tasks

### 1. Test Authentication
- Visit `/admin-air-airlabalaba`
- Test login with your password
- Verify JWT cookie is set
- Test logout functionality

### 2. Test Admin Functions
- Create a new project
- Edit existing content
- Delete test items
- Verify all CRUD operations

### 3. Test Public Pages
- Home page loads
- All navigation works
- Images load properly
- Theme toggle works
- Contact form works

### 4. Security Checks
- Verify admin routes require authentication
- Test API routes without token (should fail)
- Check cookies are httpOnly and secure
- Verify HTTPS is enforced

---

## 🎯 Production Optimizations

### Already Implemented
✅ Image optimization with Next.js Image
✅ Font optimization with display: swap
✅ Code splitting and lazy loading
✅ Security headers
✅ Error boundaries
✅ TypeScript strict mode
✅ Input validation
✅ Authentication with JWT
✅ Secure cookies

### Recommended Additions

#### 1. Analytics (Optional)
Add Google Analytics or Plausible:

```typescript
// In layout.tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
    strategy="afterInteractive"
  />
)}
```

#### 2. Rate Limiting
For production, consider adding rate limiting to API routes:

```bash
npm install @upstash/ratelimit @upstash/redis
```

#### 3. Database (Future)
Currently using JSON files. For scale, consider:
- PostgreSQL with Prisma
- MongoDB
- Supabase
- Firebase

---

## 📊 Monitoring & Maintenance

### Logs
- Check Vercel/Netlify logs for errors
- Monitor authentication failures
- Track API response times

### Backups
- Regularly backup `src/data/*.json` files
- Version control all changes
- Keep environment variables secure

### Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🐛 Troubleshooting

### Issue: Admin login not working
**Solution**: 
- Check `ADMIN_PASSWORD` in environment variables
- Verify JWT_SECRET is set
- Clear browser cookies and try again

### Issue: API routes return 401
**Solution**:
- Check authentication cookie is set
- Verify middleware is working
- Check JWT_SECRET matches

### Issue: Images not loading
**Solution**:
- Verify image URLs are accessible
- Check Next.js image domains in config
- Ensure HTTPS for external images

### Issue: Build fails
**Solution**:
```bash
rm -rf node_modules .next package-lock.json
npm install --legacy-peer-deps
npm run build
```

---

## 📝 Final Checklist

Before going live:

- [ ] Changed ADMIN_PASSWORD from default
- [ ] Generated secure JWT_SECRET
- [ ] Updated NEXT_PUBLIC_SITE_URL
- [ ] Tested all admin functions
- [ ] Tested all public pages
- [ ] Verified authentication works
- [ ] Checked mobile responsiveness
- [ ] Tested in multiple browsers
- [ ] Set up SSL/HTTPS
- [ ] Configured custom domain (if applicable)
- [ ] Set up monitoring/analytics
- [ ] Created backup of data files
- [ ] Documented admin procedures

---

## 🎉 You're Ready!

Your AIRLAB website is now production-ready with:
- ✅ Secure authentication
- ✅ Input validation
- ✅ Error handling
- ✅ Performance optimizations
- ✅ SEO optimization
- ✅ Mobile responsive
- ✅ Dark/Light themes
- ✅ Admin CMS

Deploy with confidence! 🚀
