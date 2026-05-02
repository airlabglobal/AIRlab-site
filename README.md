

# 🌐 AIRLAB UNILAG Website

A modern, responsive website built for **AIRLAB** (Artificial Intelligence & Robotics Laboratory) at the **University of Lagos (UNILAG)**. This project serves as the primary online platform for showcasing our research focus, lab members, projects, and recent publications.

## 📖 Overview

This repository contains the full source code for the official AIRLAB UNILAG website. Built with **Next.js** and focused on a sleek, mobile-first design, the website is engineered for speed and maintainability.

The structure is currently set up as a **pure frontend application**, ready for static deployment or integration with a dedicated backend service (if needed later for dynamic content).

## ⚡ Features

  * **Responsive Design:** Optimized for seamless viewing on desktop, tablet, and mobile devices.
  * **Modular Frontend:** Built using React components (in the `components/` directory) for maximum reusability and maintainability.
  * **Clean Structure:** Uses modern Next.js conventions (`app/` directory) for intuitive routing and co-located logic.
  * **Code Quality:** Custom React hooks (`hooks/`) and utility functions (`lib/`) ensure clean, efficient client-side logic.
  * **Easy Deployment:** Configured for rapid deployment to hosting platforms like Vercel, Netlify, or Firebase Hosting.

## 🛠 Project Structure (Frontend Focus)

The project follows a standard Next.js (App Router) structure. Note that all backend-specific files (e.g., `middleware.ts`, `prisma`, `api` routes) have been removed to keep this codebase strictly frontend.

```
src/
├── app/          # Core Next.js routing (pages, layouts, etc.)
├── components/   # Reusable React components (UI building blocks)
├── hooks/        # Custom React hooks for client-side state/logic
├── lib/          # Frontend utility functions (e.g., data formatting)
└── ...
public/           # Static assets (images, logos, favicons)
package.json      # Dependencies and scripts
next.config.ts    # Next.js specific configuration
tailwind.config.ts # Styling configuration
```

## 🚀 Getting Started

Follow these steps to clone the repository and run the website locally for development.

### Prerequisites

You must have the following installed on your system:

  * **Node.js** (LTS version recommended)
  * **npm** or **Yarn** (npm is used in the examples below)

### 1\. Clone the repository

```bash
git clone https://github.com/airlabglobal/AIRlab-site.git
cd AIRlab-site
```

### 2\. Install dependencies

```bash
npm install
# OR yarn install
```

### 3\. Run the development server

```bash
npm run dev
# OR yarn dev
```

The website will now be running locally. Open your browser and navigate to:

**http://localhost:9002** (or the port specified in your terminal)

-----

### 📦 Deployment

This project is a static-friendly Next.js application, making deployment straightforward:

  * **Vercel / Netlify:** Simply connect the repository. The hosting service will automatically detect the Next.js framework and build the site.
  * **Static Hosting:** Run `npm run build` and export the output if needed for custom static hosting.

## 📊 Data Management

All content (projects, team members, research papers) is managed through JSON files in the `src/data/` directory:
- `projects.json` - Project listings
- `team-*.json` - Team member profiles
- `research.json` - Research publications
- `news.json` - News and events

To update content, simply edit these JSON files and the changes will be reflected across the site.

## 🧪 Testing

### Quick Test
```bash
npm run build        # Test production build
npm run typecheck    # Check TypeScript
npm run lint         # Run linter
```

### Run Tests
```bash
npm test             # Run automated tests (after setup)
```
---

Made with ❤️ by the AIRLAB Team
