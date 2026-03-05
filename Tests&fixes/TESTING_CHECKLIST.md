# AIRLAB Website - Manual Testing Checklist

## 🔍 Pre-Testing Setup
- [ ] Install dependencies: `npm install`
- [ ] Run development server: `npm run dev`
- [ ] Open browser to http://localhost:9002
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)

## 🏠 Homepage Tests

### Visual & Layout
- [ ] Hero section displays correctly
- [ ] All images load properly
- [ ] Animations work smoothly (float, slide-up)
- [ ] Text is readable in both light and dark modes
- [ ] Responsive layout works on mobile, tablet, desktop

### Functionality
- [ ] "Explore Projects" button navigates to /projects
- [ ] "Learn More" button navigates to /about
- [ ] Featured projects display correctly (3 items)
- [ ] News section shows 3 latest items
- [ ] All links are clickable and work
- [ ] Social media icons in footer work

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images are optimized (WebP/AVIF)
- [ ] No console errors
- [ ] Smooth scrolling

## 🧭 Navigation Tests

### Header
- [ ] Logo links to homepage
- [ ] All nav items are visible on desktop
- [ ] Active page is highlighted
- [ ] Mobile menu opens/closes correctly
- [ ] Theme toggle switches between light/dark
- [ ] Header becomes sticky on scroll
- [ ] Backdrop blur effect on scroll

### Footer
- [ ] All social media links work
- [ ] Email link opens mail client
- [ ] Phone link works on mobile
- [ ] Copyright year is current
- [ ] Address is correct

## 📄 Page-Specific Tests

### About Page
- [ ] Content loads correctly
- [ ] Images display properly
- [ ] Timeline/history section works
- [ ] Team section links to /team

### Projects Page
- [ ] All projects display
- [ ] Project cards are clickable
- [ ] Tags display correctly
- [ ] Status badges show proper colors
- [ ] Filter/search works (if implemented)
- [ ] Images load with proper aspect ratio

### Research Page
- [ ] Research papers list correctly
- [ ] Links to papers work
- [ ] Authors display properly
- [ ] Publication dates are formatted

### Team Page
- [ ] All team members display
- [ ] Photos load correctly
- [ ] LinkedIn links work
- [ ] Bio information is readable
- [ ] Dr. Chika's detailed page works

### Contact Page
- [ ] Form fields are accessible
- [ ] Required field validation works
- [ ] Email validation works
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Google Maps embed loads
- [ ] Contact information is correct

## 🔐 Admin Panel Tests

### Access
- [ ] /admin redirects to /admin-air-airlabalaba
- [ ] Admin panel loads correctly
- [ ] Dashboard shows correct statistics
- [ ] Quick action buttons work

### Projects Management
- [ ] View all projects
- [ ] Create new project
  - [ ] All fields save correctly
  - [ ] Image URL validation
  - [ ] Tags can be added
  - [ ] Status dropdown works
- [ ] Edit existing project
  - [ ] Form pre-fills with data
  - [ ] Changes save correctly
  - [ ] Cancel button works
- [ ] Delete project
  - [ ] Confirmation dialog appears
  - [ ] Project is removed from list
  - [ ] Data file updates

### News Management
- [ ] View all news items
- [ ] Create new news
  - [ ] Title, date, link save
  - [ ] Date picker works
- [ ] Edit news item
- [ ] Delete news item

### Research Management
- [ ] View all research papers
- [ ] Add new paper
- [ ] Edit paper details
- [ ] Delete paper

### Team Management
- [ ] View all team members
- [ ] Add new member
- [ ] Edit member info
- [ ] Delete member
- [ ] Upload/change photo

## 🎨 Theme & Styling Tests

### Light Mode
- [ ] Background is light
- [ ] Text is readable
- [ ] Primary color (green) displays correctly
- [ ] Accent color (teal) displays correctly
- [ ] Cards have proper shadows
- [ ] Buttons have correct colors

### Dark Mode
- [ ] Background is dark grey (#2B302D)
- [ ] Text is light/white
- [ ] Colors maintain good contrast
- [ ] Images don't look washed out
- [ ] Transitions are smooth

### Responsive Design
- [ ] Mobile (< 768px)
  - [ ] Navigation collapses to hamburger
  - [ ] Content stacks vertically
  - [ ] Images scale properly
  - [ ] Touch targets are large enough
- [ ] Tablet (768px - 1024px)
  - [ ] Layout adjusts appropriately
  - [ ] Grid columns reduce
- [ ] Desktop (> 1024px)
  - [ ] Full navigation visible
  - [ ] Multi-column layouts work
  - [ ] Max-width container centers content

## 🚀 Performance Tests

### Lighthouse Scores (Target)
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Load Times
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

### Network
- [ ] Works on slow 3G
- [ ] Images lazy load
- [ ] Fonts load efficiently
- [ ] No unnecessary requests

## ♿ Accessibility Tests

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Skip to main content link
- [ ] Modal/dialog traps focus
- [ ] Escape key closes modals

### Screen Reader
- [ ] All images have alt text
- [ ] Headings are hierarchical
- [ ] Form labels are associated
- [ ] ARIA labels where needed
- [ ] Landmarks are defined

### Color Contrast
- [ ] Text meets WCAG AA (4.5:1)
- [ ] Large text meets WCAG AA (3:1)
- [ ] Interactive elements are distinguishable
- [ ] Focus indicators are visible

## 🔒 Security Tests

### Input Validation
- [ ] XSS protection in forms
- [ ] SQL injection prevention (if using DB)
- [ ] File upload restrictions
- [ ] URL validation

### API Security
- [ ] CORS configured correctly
- [ ] Rate limiting (if implemented)
- [ ] Authentication required for admin
- [ ] Input sanitization

### Data Protection
- [ ] No sensitive data in client code
- [ ] Environment variables used correctly
- [ ] API keys not exposed
- [ ] HTTPS enforced in production

## 🐛 Error Handling Tests

### Network Errors
- [ ] Offline mode shows message
- [ ] Failed API calls show error
- [ ] Retry mechanism works
- [ ] Graceful degradation

### User Errors
- [ ] Invalid form input shows message
- [ ] 404 page for missing routes
- [ ] Error boundaries catch crashes
- [ ] Helpful error messages

### Edge Cases
- [ ] Empty data arrays
- [ ] Very long text content
- [ ] Special characters in input
- [ ] Concurrent operations

## 📱 Cross-Browser Tests

### Chrome
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### Firefox
- [ ] Layout consistent
- [ ] Forms work correctly
- [ ] Theme toggle works

### Safari
- [ ] iOS compatibility
- [ ] Touch gestures work
- [ ] Date pickers work

### Edge
- [ ] Windows compatibility
- [ ] All features functional

## 🔄 Data Integrity Tests

### JSON Files
- [ ] projects.json is valid
- [ ] news.json is valid
- [ ] team-*.json files are valid
- [ ] research.json is valid
- [ ] No duplicate IDs

### CRUD Operations
- [ ] Create doesn't corrupt data
- [ ] Update preserves other fields
- [ ] Delete removes only target
- [ ] Concurrent edits handled

## ✅ Final Checks

### Before Deployment
- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] TypeScript compiles without errors
- [ ] Build succeeds: `npm run build`
- [ ] Production build works: `npm start`
- [ ] Environment variables set
- [ ] Analytics configured (if using)
- [ ] SEO meta tags complete
- [ ] Sitemap generated
- [ ] robots.txt configured

### Post-Deployment
- [ ] Production URL works
- [ ] SSL certificate valid
- [ ] DNS configured correctly
- [ ] CDN serving assets
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Backup system in place

## 📊 Test Results Template

```
Test Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

Passed: ___ / ___
Failed: ___ / ___
Blocked: ___ / ___

Critical Issues:
1. 
2. 
3. 

Minor Issues:
1. 
2. 
3. 

Notes:
```
