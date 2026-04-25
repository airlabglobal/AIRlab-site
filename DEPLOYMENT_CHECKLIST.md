# ✅ AIRLAB Website - Final Deployment Checklist

## 🎯 Pre-Deployment (Complete These First)

### 1. Environment Configuration
- [ ] Copy `.env.production.template` to `.env.production`
- [ ] Change `ADMIN_PASSWORD` to a strong password (12+ characters)
- [ ] Generate secure `JWT_SECRET` using: `openssl rand -base64 32`
- [ ] Update `NEXT_PUBLIC_SITE_URL` to `https://airlab.unilag.edu.ng`
- [ ] Verify `NEXT_PUBLIC_CONTACT_EMAIL` is correct

### 2. Code Verification
- [ ] Run `npm run typecheck` - Should show 0 errors
- [ ] Run `npm run lint` - Should pass
- [ ] Run `npm run build` - Should complete successfully
- [ ] Test production build locally with `npm start`

### 3. Content Review
- [ ] Review all projects in `src/data/projects.json`
- [ ] Review all research papers in `src/data/research.json`
- [ ] Review all team members in `src/data/team-*.json`
- [ ] Review all news items in `src/data/news.json`
- [ ] Review history timeline in `src/data/history.json`
- [ ] Verify all images are accessible
- [ ] Test all external links

### 4. Security Audit
- [ ] Admin password changed from default
- [ ] JWT secret is 32+ characters
- [ ] No sensitive data in code
- [ ] `.env.production` not in version control
- [ ] Security headers configured
- [ ] HTTPS will be enabled

---

## 🚀 Deployment Steps

### Step 1: Server Preparation
- [ ] Server has Node.js 18+ installed
- [ ] Server has npm installed
- [ ] Server has PM2 installed globally (`npm install -g pm2`)
- [ ] Server has Nginx installed
- [ ] Firewall configured (ports 80, 443, 22)
- [ ] Domain DNS points to server IP

### Step 2: Upload Files
```bash
# On your local machine
git clone <repository-url>
cd airlab-website

# Upload to server (choose one method)
# Method 1: Git
git push origin main

# Method 2: SCP
scp -r . user@server:/var/www/airlab-website

# Method 3: FTP/SFTP
# Use FileZilla or similar
```

### Step 3: Install Dependencies
```bash
# On the server
cd /var/www/airlab-website
npm install --legacy-peer-deps
```

### Step 4: Build Application
```bash
npm run build
```

### Step 5: Configure Environment
```bash
# Copy and edit production environment
cp .env.production.template .env.production
nano .env.production
# Update all values
```

### Step 6: Start with PM2
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
# Follow the command it gives you
```

### Step 7: Configure Nginx
```bash
# Copy nginx configuration
sudo nano /etc/nginx/sites-available/airlab

# Paste the configuration from docs/deployment/nginx.conf
# Update server_name to your domain

# Enable site
sudo ln -s /etc/nginx/sites-available/airlab /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 8: Set Up SSL
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d airlab.unilag.edu.ng

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🧪 Post-Deployment Testing

### 1. Website Access
- [ ] Visit https://airlab.unilag.edu.ng
- [ ] HTTP redirects to HTTPS
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Theme toggle works
- [ ] Contact form works

### 2. Admin Panel
- [ ] Access https://airlab.unilag.edu.ng/admin-air-airlabalaba
- [ ] Login with new password
- [ ] Dashboard loads with correct statistics
- [ ] Can create a test project
- [ ] Can edit the test project
- [ ] Can delete the test project
- [ ] Repeat for News, Research, Team, History
- [ ] Logout works

### 3. Performance
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Check page load times (< 3 seconds)
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify images are optimized

### 4. Security
- [ ] HTTPS is working
- [ ] Security headers present (check with securityheaders.com)
- [ ] Admin panel requires authentication
- [ ] API routes are protected
- [ ] No sensitive data exposed

---

## 📊 Monitoring Setup

### 1. Application Monitoring
```bash
# View PM2 status
pm2 status

# View logs
pm2 logs airlab-website

# Monitor resources
pm2 monit
```

### 2. Set Up Log Rotation
```bash
# Create logrotate configuration
sudo nano /etc/logrotate.d/airlab-website

# Add configuration (see docs/deployment/)
```

### 3. Set Up Backups
```bash
# Create backup script
sudo nano /usr/local/bin/backup-airlab.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-airlab.sh
```

### 4. Set Up Monitoring (Optional)
- [ ] Configure UptimeRobot or similar
- [ ] Set up error tracking (Sentry)
- [ ] Configure Google Analytics
- [ ] Set up email alerts

---

## 📝 Documentation

### 1. Update Documentation
- [ ] Update README.md with production URL
- [ ] Document any custom configurations
- [ ] Create admin user guide
- [ ] Document backup procedures

### 2. Train Administrators
- [ ] Show how to login
- [ ] Demonstrate CRUD operations
- [ ] Explain best practices
- [ ] Provide contact for support

---

## 🔄 Maintenance Tasks

### Daily
- [ ] Check PM2 status
- [ ] Review error logs
- [ ] Monitor disk space

### Weekly
- [ ] Review content updates
- [ ] Check for broken links
- [ ] Review analytics

### Monthly
- [ ] Update dependencies (`npm update`)
- [ ] Review and rotate logs
- [ ] Test backup restoration
- [ ] Security audit
- [ ] Performance review

---

## 🆘 Troubleshooting

### Site Not Loading
1. Check PM2 status: `pm2 status`
2. Check Nginx status: `sudo systemctl status nginx`
3. Check logs: `pm2 logs airlab-website`
4. Verify DNS settings
5. Check firewall rules

### Admin Login Not Working
1. Verify password in `.env.production`
2. Check JWT_SECRET is set
3. Clear browser cookies
4. Check API logs for errors

### Changes Not Saving
1. Check file permissions: `ls -la src/data/`
2. Verify PM2 is running
3. Check disk space: `df -h`
4. Review error logs

---

## ✅ Final Verification

Before marking as complete:

- [ ] All checklist items above completed
- [ ] Website accessible via HTTPS
- [ ] Admin panel working
- [ ] All features tested
- [ ] Monitoring configured
- [ ] Backups set up
- [ ] Documentation updated
- [ ] Team trained
- [ ] Support contacts documented

---

## 📞 Support Contacts

**Technical Issues:**
- System Administrator: [contact info]
- Developer: [contact info]

**Content Management:**
- AIRLAB Team: airol@unilag.edu.ng
- Phone: +(234) 809 058 2025

---

## 🎉 Deployment Complete!

Once all items are checked:

1. Announce the launch
2. Share the URL with stakeholders
3. Monitor for the first 24-48 hours
4. Gather feedback
5. Make improvements as needed

**Congratulations on deploying the AIRLAB website! 🚀**

---

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Production URL:** https://airlab.unilag.edu.ng  
**Status:** ✅ LIVE
