# Image Recommendations for AIRLAB Website

## Current Status
The website currently uses placeholder images from Unsplash. For a more authentic and professional look, you should replace these with actual photos from AIRLAB.

## Recommended Photos to Take

### 1. Hero Section (Homepage)
- **Current**: Generic AI/robotics stock photo
- **Recommended**: 
  - Wide shot of the lab space showing equipment and workstations
  - Team members collaborating on a robotics project
  - Close-up of robotic arms or AI hardware in action
  - **Dimensions**: 800x800px or larger, landscape orientation

### 2. Lab Coordinator Section (Homepage)
- **Current**: `/images/image12.jpg` (Dr. Chika Yinka-Banjo)
- **Status**: ✅ Already using actual photo
- **Recommended**: Ensure high-quality professional headshot

### 3. About Page - Lab Photo
- **Current**: Generic research lab stock photo
- **Recommended**:
  - Interior shot of AIRLAB showing the workspace
  - Team members working together
  - Lab equipment and technology setup
  - **Dimensions**: 600x400px, landscape

### 4. Team Member Photos
- **Current**: Stock photos from Unsplash
- **Recommended**:
  - Professional headshots of each team member
  - Consistent lighting and background
  - Square format (400x400px minimum)
  - Casual professional attire
  - Friendly, approachable expressions

### 5. Project Images
- **Current**: Generic stock photos
- **Recommended**:
  - Actual photos of projects in development
  - Demonstrations of working prototypes
  - Field testing of AI/robotics systems
  - Screenshots of software interfaces
  - **Dimensions**: 600x400px, landscape

### 6. Research Paper Images
- **Current**: Generic academic/tech stock photos
- **Recommended**:
  - Visualizations from the research
  - Lab equipment used in the research
  - Data visualizations or results
  - Team members conducting research
  - **Dimensions**: 600x400px, landscape

## Photography Tips

### For Team Photos:
- Use natural lighting or soft studio lighting
- Plain, neutral background (white, gray, or lab background)
- Consistent framing for all team members
- Eye-level camera angle
- Ensure everyone is smiling and looking professional

### For Lab/Project Photos:
- Good lighting is essential - avoid harsh shadows
- Show people actively working when possible
- Capture both wide shots and detail shots
- Include AIRLAB branding where visible
- Show diversity of projects and activities

### For Action Shots:
- Capture team members collaborating
- Show robots/systems in operation
- Document workshops and events
- Include students learning and engaging

## Image Specifications

### File Formats:
- Use `.jpg` for photos (smaller file size)
- Use `.png` for logos or graphics with transparency
- Optimize images before uploading (use tools like TinyPNG)

### Recommended Sizes:
- Hero images: 1200x800px minimum
- Team photos: 400x400px (square)
- Project/Research cards: 600x400px
- Thumbnails: 300x200px

### File Naming:
- Use descriptive names: `team-john-doe.jpg`, `project-traffic-system.jpg`
- Avoid spaces, use hyphens: `lab-interior-view.jpg`
- Keep names lowercase

## Where to Place Images

Once you have the photos:

1. **Team photos**: Place in `/public/images/team/`
2. **Project photos**: Place in `/public/images/projects/`
3. **Research photos**: Place in `/public/images/research/`
4. **Lab photos**: Place in `/public/images/lab/`

Then update the JSON files in `src/data/` with the correct paths:
- `src/data/team.json` - Update `imageUrl` fields
- `src/data/projects.json` - Update `imageUrl` fields
- `src/data/research.json` - Update `imageUrl` fields

## Priority Order

1. **High Priority** (Do First):
   - Team member headshots (13 photos needed)
   - Lab interior shots (2-3 different angles)
   - Dr. Yinka-Banjo professional photo (if current one needs updating)

2. **Medium Priority**:
   - Project photos (4 projects)
   - Research visualization images (6 papers)

3. **Low Priority**:
   - Additional lab photos for variety
   - Event/workshop photos
   - Student activity photos

## Notes

- All current placeholder images are from Unsplash and are free to use
- However, using actual AIRLAB photos will make the site more authentic
- Consider organizing a photo session with all team members
- Take multiple shots of each subject to have options
- Get permission from team members before using their photos publicly
