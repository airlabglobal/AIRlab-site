# AIRLAB Website - Production Deployment Guide for UNILAG Servers

## 🎯 Pre-Deployment Checklist

### ✅ Completed
- [x] All TypeScript errors resolved (0 errors)
- [x] Production build successful
- [x] Security features implemented
- [x] Authentication system tested
- [x] API routes protected
- [x] Input validation configured
- [x] Error handling implemented

### 📋 Before Deployment
- [ ] Update environment variables for production
- [ ] Change default admin password
- [ ] Configure production database (if needed)
- [ ] Set up SSL/HTTPS
- [ ] Configure domain name
- [ ] Set up monitoring

---

## 🚀 Deployment Steps

### Step 1: Prepare Production Environment Variables

Create a `.env.production` file with the following:

```bash
# Admin Authentication - CHANGE THIS!
ADMIN_PASSWORD=YOUR_SECURE_PASSWORD_HERE

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://airlab.unilag.edu.ng
NEXT_PUBLIC_SITE_NAME=AIRLAB UNILAG

# Contact Form
NEXT_PUBLIC_CONTACT_EMAIL=airol@unilag.edu.ng

# Security - Generate a secure random string (minimum 32 characters)
JWT_SECRET=YOUR_SECURE_JWT_SECRET_HERE_MIN_32_CHARS

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important:** Generate secure values for:
- `ADMIN_PASSWORD`: Use a strong password (minimum 12 characters, mix of letters, numbers, symbols)
- `JWT_SECRET`: Generate using: `openssl rand -base64 32`

### Step 2: Build for Production

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build the application
npm run build

# Test the production build locally
npm start
```

### Step 3: Deploy to UNILAG Server

#### Option A: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "airlab-website" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

#### Option B: Using systemd

Create `/etc/systemd/system/airlab-website.service`:

```ini
[Unit]
Description=AIRLAB Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/AIRlab-site
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable airlab-website
sudo systemctl start airlab-website
```

#### Option C: Using Docker

```bash
# Build Docker image
docker build -t airlab-website .

# Run container
docker run -d \
  --name airlab-website \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  airlab-website
```

### Step 4: Configure Nginx Reverse Proxy

Create `/etc/nginx/sites-available/airlab`:

```nginx
server {
    listen 80;
    server_name airlab.unilag.edu.ng;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name airlab.unilag.edu.ng;

    # SSL Configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # Images caching
    location /images {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/airlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Set Up SSL Certificate

#### Using Let's Encrypt (Free):

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d airlab.unilag.edu.ng

# Auto-renewal is set up automatically
```

---

## 🔒 Security Configuration

### 1. File Permissions

```bash
# Set proper ownership
sudo chown -R www-data:www-data /path/to/AIRlab-site

# Set proper permissions
sudo chmod -R 755 /path/to/AIRlab-site
sudo chmod 600 /path/to/AIRlab-site/.env.production
```

### 2. Firewall Configuration

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH (if needed)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

### 3. Rate Limiting (Optional)

Add to Nginx configuration:

```nginx
limit_req_zone $binary_remote_addr zone=admin:10m rate=5r/m;

location /admin-air-airlabalaba {
    limit_req zone=admin burst=10 nodelay;
    proxy_pass http://localhost:3000;
}
```

---

## 📊 Monitoring and Logging

### 1. Application Logs

```bash
# PM2 logs
pm2 logs airlab-website

# systemd logs
sudo journalctl -u airlab-website -f

# Docker logs
docker logs -f airlab-website
```

### 2. Set Up Log Rotation

Create `/etc/logrotate.d/airlab-website`:

```
/var/log/airlab-website/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

### 3. Monitoring Tools (Optional)

- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Analytics**: Google Analytics, Plausible

---

## 🧪 Post-Deployment Testing

### 1. Verify Website Access

```bash
# Test HTTP redirect
curl -I http://airlab.unilag.edu.ng

# Test HTTPS
curl -I https://airlab.unilag.edu.ng

# Test admin login
curl -X POST https://airlab.unilag.edu.ng/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"YOUR_PASSWORD"}'
```

### 2. Test Admin Panel

1. Navigate to `https://airlab.unilag.edu.ng/admin-air-airlabalaba`
2. Log in with admin password
3. Test CRUD operations:
   - Create a news item
   - Edit a project
   - Delete a test entry
   - Add a team member

### 3. Test Public Pages

- [ ] Home page loads correctly
- [ ] Projects page displays data
- [ ] Research page displays papers
- [ ] Team page shows members
- [ ] News page shows updates
- [ ] Contact form works
- [ ] About page loads
- [ ] Theme toggle works

### 4. Performance Testing

```bash
# Test page load speed
curl -w "@curl-format.txt" -o /dev/null -s https://airlab.unilag.edu.ng

# Run Lighthouse audit
npx lighthouse https://airlab.unilag.edu.ng --view
```

---

## 🔄 Backup and Recovery

### 1. Backup Data Files

```bash
# Create backup script
cat > /usr/local/bin/backup-airlab.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/airlab"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup data files
tar -czf $BACKUP_DIR/data_$DATE.tar.gz \
  /path/to/AIRlab-site/src/data/*.json

# Keep only last 30 days of backups
find $BACKUP_DIR -name "data_*.tar.gz" -mtime +30 -delete
EOF

chmod +x /usr/local/bin/backup-airlab.sh

# Add to crontab (daily at 2 AM)
echo "0 2 * * * /usr/local/bin/backup-airlab.sh" | crontab -
```

### 2. Recovery Procedure

```bash
# Stop the application
pm2 stop airlab-website

# Restore data files
tar -xzf /backups/airlab/data_YYYYMMDD_HHMMSS.tar.gz -C /

# Restart the application
pm2 start airlab-website
```

---

## 🚨 Troubleshooting

### Issue: Application won't start

```bash
# Check logs
pm2 logs airlab-website --lines 100

# Check port availability
sudo netstat -tulpn | grep :3000

# Verify environment variables
pm2 env 0
```

### Issue: Admin login fails

1. Verify `ADMIN_PASSWORD` in `.env.production`
2. Check JWT_SECRET is set correctly
3. Clear browser cookies
4. Check API logs for errors

### Issue: Data not persisting

1. Check file permissions on `src/data/` directory
2. Verify write permissions for www-data user
3. Check disk space: `df -h`

### Issue: 502 Bad Gateway

1. Verify Next.js is running: `pm2 status`
2. Check Nginx configuration: `sudo nginx -t`
3. Verify proxy_pass URL is correct
4. Check firewall rules

---

## 📞 Support and Maintenance

### Regular Maintenance Tasks

**Daily:**
- Monitor application logs
- Check error rates
- Verify backups completed

**Weekly:**
- Review security logs
- Check disk space
- Update content as needed

**Monthly:**
- Update dependencies: `npm update`
- Review and rotate logs
- Test backup restoration
- Security audit

### Update Procedure

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install --legacy-peer-deps

# Build new version
npm run build

# Restart application
pm2 restart airlab-website
```

---

## 📋 Quick Reference

### Useful Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs airlab-website

# Restart application
pm2 restart airlab-website

# Check Nginx status
sudo systemctl status nginx

# Reload Nginx
sudo systemctl reload nginx

# Check SSL certificate
sudo certbot certificates

# Renew SSL certificate
sudo certbot renew
```

### Important Paths

- Application: `/path/to/AIRlab-site`
- Data files: `/path/to/AIRlab-site/src/data/`
- Logs: `/var/log/airlab-website/`
- Backups: `/backups/airlab/`
- Nginx config: `/etc/nginx/sites-available/airlab`

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Update `.env.production` with secure values
- [ ] Change default admin password
- [ ] Generate secure JWT secret
- [ ] Test build locally
- [ ] Backup existing data (if upgrading)

### Deployment
- [ ] Upload files to server
- [ ] Install dependencies
- [ ] Build application
- [ ] Configure environment variables
- [ ] Set up process manager (PM2/systemd)
- [ ] Configure Nginx reverse proxy
- [ ] Set up SSL certificate
- [ ] Configure firewall

### Post-Deployment
- [ ] Test website access
- [ ] Test admin panel
- [ ] Verify all pages load
- [ ] Test CRUD operations
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Document credentials securely

---

**Deployment Status:** Ready for Production ✅  
**Last Updated:** March 13, 2026  
**Version:** 1.0.0
