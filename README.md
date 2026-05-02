# AIRLAB UNILAG Website

A modern, responsive website built for **AIRLAB** (Artificial Intelligence & Robotics Laboratory) at the **University of Lagos (UNILAG)**. This project serves as the primary online platform for showcasing our research focus, lab members, projects, and recent publications.

## Overview

This repository contains the full source code for the official AIRLAB UNILAG website. Built with **Next.js**, it features a sleek, mobile-first frontend and a robust **serverless backend** architecture powered by Next.js API routes and MongoDB.

## Features

  * **Responsive Design:** Optimized for seamless viewing on desktop, tablet, and mobile devices.
  * **Serverless Architecture:** Utilizes Next.js API routes for scalable, serverless backend operations.
  * **Admin Dashboard:** Secure authentication system using JWTs and Bcrypt hashing for managing lab content dynamically.
  * **Database Integration:** MongoDB integration for persistent storage with custom manual reordering capabilities for timelines.
  * **Interactive UI:** Features rich, dynamic modals for project viewing and automated image fallbacks.
  * **Contact Form:** Integrated with FormSubmit AJAX for seamless, direct-from-page messaging.
  * **Clean Structure:** Uses modern Next.js conventions (`app/` directory) for intuitive routing and co-located logic.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, API Routes)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **Authentication:** JWT & Bcrypt
* **Testing:** [Jest](https://jestjs.io/) & React Testing Library

## Project Structure

The project follows a standard Next.js (App Router) full-stack structure:

```
src/
├── app/          # Core Next.js routing, pages, layouts, and API routes
├── components/   # Reusable React components (UI building blocks)
├── lib/          # Utility functions (e.g., db connections, auth helpers)
├── middleware.ts # Edge middleware for route protection
└── ...
__tests__/        # API and Integration tests
public/           # Static assets (images, logos, favicons)
package.json      # Dependencies and scripts
next.config.ts    # Next.js specific configuration
```

## Getting Started

Follow these steps to clone the repository and run the website locally for development.

### Prerequisites

You must have the following installed on your system:

  * **Node.js** (v18+ recommended)
  * **npm** or **Yarn**
  * **MongoDB** (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository

```bash
git clone https://github.com/airlabglobal/AIRlab-site.git
cd AIRlab-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your database and authentication secrets:

```bash
cp .env.example .env.local
```

Make sure to fill in your `MONGODB_URI`, `JWT_SECRET`, and `ADMIN_PASSWORD` in the `.env.local` file.

### 4. Run the development server

```bash
npm run dev
```

The website will now be running locally. Open your browser and navigate to **http://localhost:9002** (or the port specified in your terminal).

---

## Testing

The project includes an integration and API testing suite located in the `__tests__` directory to verify the backend serverless routes and administrative workflows.

### Running the Tests

Because the tests are integration tests that perform real HTTP requests against the API, **your development server must be running** before you execute them.

1. Start your development server in one terminal:
   ```bash
   npm run dev
   ```

2. Open a new terminal and run the test suite, specifying the base URL (if your server is running on a port other than 3000):
   ```bash
   TEST_BASE_URL=http://localhost:9002 npm test
   ```

*Note: If your local development server is running on the default port `3000`, you can simply run `npm test`.*

### Additional Checks
```bash
npm run build        # Test production build
npm run typecheck    # Check TypeScript
npm run lint         # Run linter
```

---

Made with ❤️ by the AIRLAB Team
