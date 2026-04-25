# 🚀 AIRLAB Website - Quick Reference Card

## 📍 Current Status
**✅ SITE IS RUNNING**
- Local: http://localhost:9002
- Network: http://213.255.135.41:9002

---

## 🔐 Admin Access
**URL:** http://localhost:9002/admin-air-airlabalaba  
**Password:** `AIRLAB_2025`

---

## 📱 Quick Links

### Public Pages
- Home: http://localhost:9002/
- About: http://localhost:9002/about
- Projects: http://localhost:9002/projects
- Research: http://localhost:9002/research
- Team: http://localhost:9002/team
- News: http://localhost:9002/news
- Contact: http://localhost:9002/contact

### Admin Pages
- Dashboard: http://localhost:9002/admin-air-airlabalaba
- Projects: http://localhost:9002/admin-air-airlabalaba/projects
- Research: http://localhost:9002/admin-air-airlabalaba/research
- Team: http://localhost:9002/admin-air-airlabalaba/team
- News: http://localhost:9002/admin-air-airlabalaba/news
- History: http://localhost:9002/admin-air-airlabalaba/history

---

## ⚡ Quick Commands

```bash
# Development
npm run dev              # Start dev server (port 9002)

# Production
npm run build            # Build for production
npm start                # Start production server

# Testing
npm run typecheck        # Check TypeScript
npm run lint             # Lint code

# PM2 (Production)
pm2 start ecosystem.config.js    # Start with PM2
pm2 logs airlab-website          # View logs
pm2 restart airlab-website       # Restart
pm2 stop airlab-website          # Stop
```

---

## 📊 Project Stats
- **TypeScript Errors:** 0 ✅
- **Build Status:** PASSED ✅
- **Security:** IMPLEMENTED ✅
- **Admin Panel:** WORKING ✅
- **All Features:** COMPLETE ✅

---

## 🔧 Important Files

### Configuration
- `.env.local` - Development environment
- `.env.production` - Production environment (create from template)
- `next.config.ts` - Next.js configuration
- `ecosystem.config.js` - PM2 configuration

### Data Files (src/data/)
- `projects.json` - Projects data
- `news.json` - News items
- `research.json` - Research papers
- `team-leading.json` - Leading team members
- `team-pioneer.json` - Pioneer team members
- `team-volunteers.json` - Volunteer team members
- `history.json` - History timeline

### Documentation
- `PRODUCTION_DEPLOYMENT_GUIDE.md` - Full deployment guide
- `SITE_ACCESS_INFO.md` - Access information
- `FINAL_DEPLOYMENT_SUMMARY.md` - Complete summary

---

## ⚠️ Before Production

1. **Change Password**
   - Edit `.env.production`
   - Set strong `ADMIN_PASSWORD`

2. **Generate JWT Secret**
   ```bash
   openssl rand -base64 32
   ```
   - Add to `.env.production` as `JWT_SECRET`

3. **Update URLs**
   - Set `NEXT_PUBLIC_SITE_URL=https://airlab.unilag.edu.ng`

4. **Test Build**
   ```bash
   npm run build
   npm start
   ```

---

## 🆘 Troubleshooting

### Site won't start?
```bash
# Check if port is in use
netstat -ano | findstr :9002

# Kill process if needed
taskkill /PID <PID> /F

# Restart
npm run dev
```

### Admin login fails?
- Password is case-sensitive: `AIRLAB_2025`
- Clear browser cookies
- Try incognito mode

### Changes not saving?
- Check you're logged in
- Verify file permissions on `src/data/`
- Check browser console for errors

---

## 📞 Quick Help

**Can't access admin?**
→ Go to http://localhost:9002/admin-air-airlabalaba

**Forgot password?**
→ Check `.env.local` file (default: `AIRLAB_2025`)

**Need to add content?**
→ Login to admin panel and use the forms

**Ready to deploy?**
→ Read `PRODUCTION_DEPLOYMENT_GUIDE.md`

---

## ✅ Deployment Checklist

- [ ] Change admin password
- [ ] Generate JWT secret
- [ ] Update environment variables
- [ ] Test production build
- [ ] Backup data files
- [ ] Configure Nginx
- [ ] Set up SSL
- [ ] Deploy and test

---

**Status:** ✅ READY  
**Version:** 1.0.0  
**Last Updated:** March 13, 2026
