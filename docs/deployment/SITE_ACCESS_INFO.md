# 🚀 AIRLAB Website - Access Information

## ✅ Site is Running!

The development server is up and running successfully.

---

## 🌐 Access URLs

### Local Access
- **URL:** http://localhost:9002
- **Network:** http://213.255.135.41:9002

### Public Pages
- **Home:** http://localhost:9002/
- **About:** http://localhost:9002/about
- **Projects:** http://localhost:9002/projects
- **Research:** http://localhost:9002/research
- **Team:** http://localhost:9002/team
- **News:** http://localhost:9002/news
- **Contact:** http://localhost:9002/contact

---

## 🔐 Admin Panel Access

### Admin Dashboard
- **URL:** http://localhost:9002/admin-air-airlabalaba
- **Password:** `AIRLAB_2025`

### Admin Sections
- **Dashboard:** http://localhost:9002/admin-air-airlabalaba
- **Projects Management:** http://localhost:9002/admin-air-airlabalaba/projects
- **Research Management:** http://localhost:9002/admin-air-airlabalaba/research
- **Team Management:** http://localhost:9002/admin-air-airlabalaba/team
- **News Management:** http://localhost:9002/admin-air-airlabalaba/news
- **History Management:** http://localhost:9002/admin-air-airlabalaba/history

---

## 📝 How to Use the Admin Panel

### 1. Login
1. Navigate to http://localhost:9002/admin-air-airlabalaba
2. Enter password: `AIRLAB_2025`
3. Click "Login"

### 2. Manage Content

#### Projects
- **View All:** Click "View all" on Projects card
- **Add New:** Click "Add New Project" button
- **Edit:** Click "Edit" button on any project
- **Delete:** Click "Delete" button on any project

#### News
- **View All:** Click "View all" on News card
- **Add New:** Click "Create News/Event" button
- **Edit:** Click "Edit" button on any news item
- **Delete:** Click "Delete" button on any news item

#### Research Papers
- **View All:** Click "View all" on Research card
- **Add New:** Click "Upload Research Paper" button
- **Edit:** Click "Edit" button on any paper
- **Delete:** Click "Delete" button on any paper

#### Team Members
- **View All:** Click "View all" on Team card
- **Add New:** Click "Add Team Member" button
- **Edit:** Click "Edit" button on any member
- **Delete:** Click "Delete" button on any member

#### History
- **View All:** Click "View all" on History card
- **Add New:** Click "Add History Item" button
- **Edit:** Click "Edit" button on any history item
- **Delete:** Click "Delete" button on any history item

### 3. Logout
- Click the "Logout" button in the top right corner

---

## 🧪 Testing the Site

### Quick Manual Tests

1. **Test Public Pages**
   - Visit each public page and verify content loads
   - Test navigation between pages
   - Try the theme toggle (light/dark mode)

2. **Test Admin Login**
   - Go to admin panel
   - Enter password
   - Verify you can access the dashboard

3. **Test CRUD Operations**
   - Create a test project
   - Edit the project
   - Delete the project
   - Repeat for other content types

### Automated Testing

Run the test script:
```powershell
# Simple test
.\test-deployment.ps1

# Or specify custom URL
.\test-deployment.ps1 -BaseUrl "http://localhost:9002"
```

---

## 🎨 Features to Test

### Public Site Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme toggle
- ✅ Smooth animations
- ✅ Image optimization
- ✅ Contact form
- ✅ Navigation menu
- ✅ Footer with social links

### Admin Panel Features
- ✅ Secure authentication
- ✅ Dashboard with statistics
- ✅ CRUD operations for all content types
- ✅ Form validation
- ✅ Success/Error notifications
- ✅ Loading states
- ✅ Responsive admin interface

---

## 📊 Current Data Status

### Projects
- Location: `src/data/projects.json`
- Current count: Check admin dashboard

### News
- Location: `src/data/news.json`
- Current count: Check admin dashboard

### Research Papers
- Location: `src/data/research.json`
- Current count: Check admin dashboard

### Team Members
- Leading: `src/data/team-leading.json`
- Pioneer: `src/data/team-pioneer.json`
- Volunteers: `src/data/team-volunteers.json`

### History
- Location: `src/data/history.json`
- Current count: 26 items

---

## 🔧 Development Commands

```bash
# Start development server (already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run typecheck

# Lint code
npm run lint
```

---

## 🚨 Important Notes

### Security
- **Change the admin password** before deploying to production
- Current password is for development only: `AIRLAB_2025`
- Update `.env.production` with secure credentials

### Data Persistence
- All data is stored in JSON files in `src/data/`
- Changes made through admin panel are immediately saved
- Backup these files regularly

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers supported
- JavaScript must be enabled

---

## 📞 Need Help?

### Common Issues

**Can't access the site?**
- Check if the server is running
- Verify the port 9002 is not blocked
- Try http://localhost:9002 instead of 127.0.0.1

**Admin login not working?**
- Verify password is exactly: `AIRLAB_2025`
- Clear browser cookies
- Try in incognito/private mode

**Changes not saving?**
- Check file permissions on `src/data/` folder
- Verify you're logged in as admin
- Check browser console for errors

---

## ✅ Production Deployment Checklist

Before deploying to UNILAG servers:

- [ ] Change admin password in `.env.production`
- [ ] Generate secure JWT secret
- [ ] Update site URL to production domain
- [ ] Test all features thoroughly
- [ ] Backup all data files
- [ ] Run production build: `npm run build`
- [ ] Set up SSL certificate
- [ ] Configure Nginx reverse proxy
- [ ] Set up monitoring and logging

See `PRODUCTION_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

**Status:** ✅ RUNNING  
**Environment:** Development  
**Port:** 9002  
**Ready for Testing:** YES
