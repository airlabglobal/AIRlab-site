# AIRLAB Website - Quick Start Guide

## 🚀 Getting Started

### Run the Development Server
```bash
npm run dev
```
Visit: http://localhost:9002

### Admin Access
- URL: http://localhost:9002/admin
- Password: `AIRLAB_2025`

## 📝 Updating Content

### 1. Team Members
**File**: `src/data/team.json`

```json
{
  "id": "14",
  "name": "New Member Name",
  "role": "Masters Student",
  "imageUrl": "/images/team/new-member.jpg",
  "imageHint": "description for AI",
  "bio": "Brief bio about the member's research focus.",
  "social": {
    "linkedin": "https://linkedin.com/in/username",
    "email": "mailto:email@unilag.edu.ng"
  }
}
```

### 2. Projects
**File**: `src/data/projects.json`

```json
{
  "id": "5",
  "title": "Project Name",
  "description": "Detailed description of the project.",
  "imageUrl": "/images/projects/project-name.jpg",
  "imageHint": "description",
  "tags": ["AI", "Robotics", "IoT"],
  "status": "Ongoing",
  "link": "/projects/project-slug"
}
```

### 3. Research Papers
**File**: `src/data/research.json`

```json
{
  "_id": "7",
  "title": "Research Paper Title",
  "authors": "Author Names",
  "year": 2025,
  "description": "Brief description of the research.",
  "fileUrl": "/papers/paper-name.pdf",
  "imageUrl": "/images/research/paper-image.jpg"
}
```

## 📁 File Structure

```
src/
├── data/              # JSON data files
│   ├── team.json
│   ├── projects.json
│   └── research.json
├── app/               # Pages
│   ├── page.tsx       # Homepage
│   ├── about/
│   ├── team/
│   ├── projects/
│   ├── research/
│   └── admin/         # Admin panel
└── components/        # Reusable components

public/
├── images/            # Image files
│   ├── team/
│   ├── projects/
│   └── research/
└── papers/            # PDF files
```

## 🖼️ Adding Images

### Step 1: Add Image File
Place your image in the appropriate folder:
- Team photos: `/public/images/team/`
- Project images: `/public/images/projects/`
- Research images: `/public/images/research/`

### Step 2: Update JSON
Update the `imageUrl` in the relevant JSON file:
```json
"imageUrl": "/images/team/john-doe.jpg"
```

### Image Requirements:
- **Team photos**: 400x400px (square)
- **Project/Research**: 600x400px (landscape)
- **Format**: JPG or PNG
- **Size**: Optimize to < 500KB

## 🔧 Common Tasks

### Change Admin Password
**File**: `src/app/admin/layout.tsx`
```typescript
const ADMIN_PASSWORD = 'YourNewPassword';
```

### Update Site Title
**File**: `src/app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: 'Your New Title',
  description: 'Your new description',
};
```

### Add a News Item (Homepage)
**File**: `src/app/page.tsx`
```typescript
const newsItems = [
  { 
    title: "News Title", 
    date: "Nov 25, 2025", 
    link: "#" 
  },
  // ... more items
];
```

## 🐛 Troubleshooting

### Images Not Showing
- Check file path is correct (case-sensitive)
- Ensure image is in `/public/` folder
- Verify image file extension matches JSON

### Changes Not Appearing
- Save the file
- Refresh browser (Ctrl+R or Cmd+R)
- Check browser console for errors

### Admin Panel Not Working
- Verify password is correct
- Clear browser cache
- Check browser console for errors

## 📚 Additional Resources

- **Full Changelog**: `docs/changelog.md`
- **Image Guide**: `docs/image-recommendations.md`
- **Next.js Docs**: https://nextjs.org/docs

## 💡 Tips

1. **Always backup** JSON files before making changes
2. **Test locally** before deploying
3. **Optimize images** before uploading
4. **Use consistent naming** for files
5. **Keep descriptions concise** (2-3 sentences)

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Build for Production
```bash
npm run build
npm start
```

## 📞 Need Help?

- Check the documentation in `/docs/`
- Review the code comments
- Contact the development team

---

**Last Updated**: November 25, 2025
