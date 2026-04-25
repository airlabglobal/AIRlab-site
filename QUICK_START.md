# 🚀 AIRLAB Website - Quick Start Guide

## For Developers

### 1. Clone & Install
```bash
git clone <repository-url>
cd airlab-website
npm install --legacy-peer-deps
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: **http://localhost:9002**

---

## For Administrators

### Access Admin Panel
1. Go to: **http://localhost:9002/admin-air-airlabalaba**
2. Password: `AIRLAB_2025`
3. Start managing content!

### Quick Actions
- **Add Project:** Dashboard → "Add New Project"
- **Add News:** Dashboard → "Create News/Event"
- **Add Team Member:** Dashboard → "Add Team Member"

---

## For Deployment

### Quick Deploy (Production)
```bash
# 1. Build
npm run build

# 2. Start with PM2
pm2 start ecosystem.config.js --env production

# 3. Done!
```

See **DEPLOYMENT_CHECKLIST.md** for detailed steps.

---

## 📚 Documentation

- **README.md** - Full documentation
- **DEPLOYMENT_CHECKLIST.md** - Deployment guide
- **docs/guides/ADMIN_GUIDE.md** - Admin manual
- **FINAL_STATUS.md** - Project summary

---

## 🆘 Need Help?

- **Email:** airol@unilag.edu.ng
- **Phone:** +(234) 809 058 2025

---

**Status:** ✅ Ready to Use!
