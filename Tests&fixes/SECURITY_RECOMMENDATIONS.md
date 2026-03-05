# Security Recommendations for AIRLAB Website

## 🚨 Critical Security Issues

### 1. No Authentication on Admin API Routes
**Current State:** Anyone can access `/api/admin/*` endpoints and modify data.

**Risk Level:** CRITICAL

**Recommendation:**
```typescript
// Create middleware for authentication
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !isValidAuth(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/admin/:path*',
};
```

### 2. No Input Validation
**Current State:** API routes accept any data without validation.

**Risk Level:** HIGH

**Recommendation:**
```typescript
// Install zod for validation
// npm install zod

import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  imageUrl: z.string().url(),
  tags: z.array(z.string()).max(10),
  status: z.enum(['Research Phase', 'Ongoing', 'Completed']),
  link: z.string().optional(),
});

// In API route
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = projectSchema.parse(body); // Throws if invalid
    // ... rest of code
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
  }
}
```

### 3. Race Conditions in File Operations
**Current State:** Multiple concurrent requests can corrupt JSON files.

**Risk Level:** HIGH

**Recommendation:**
```typescript
// Use a simple file lock mechanism
import fs from 'fs/promises';
import { promisify } from 'util';

class FileLocker {
  private locks = new Map<string, Promise<void>>();

  async withLock<T>(path: string, fn: () => Promise<T>): Promise<T> {
    while (this.locks.has(path)) {
      await this.locks.get(path);
    }

    const lockPromise = (async () => {
      try {
        return await fn();
      } finally {
        this.locks.delete(path);
      }
    })();

    this.locks.set(path, lockPromise.then(() => {}));
    return lockPromise;
  }
}

const fileLocker = new FileLocker();

// Usage in API route
export async function POST(request: NextRequest) {
  return fileLocker.withLock(projectsPath, async () => {
    // Read, modify, write operations here
  });
}
```

### 4. No Rate Limiting
**Current State:** API can be spammed with requests.

**Risk Level:** MEDIUM

**Recommendation:**
```typescript
// Install rate limiting library
// npm install express-rate-limit

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Apply to admin routes
```

### 5. XSS Vulnerabilities
**Current State:** User input is not sanitized before storage/display.

**Risk Level:** MEDIUM

**Recommendation:**
```typescript
// Install DOMPurify for sanitization
// npm install isomorphic-dompurify

import DOMPurify from 'isomorphic-dompurify';

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
  });
}

// Use in API routes
const sanitizedTitle = sanitizeInput(body.title);
```

## 🔐 Authentication Implementation

### Option 1: Simple Password Protection (Current Setup)
```typescript
// src/app/admin-air-airlabalaba/layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'AIRLAB_2025';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="max-w-md w-full p-8">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-primary text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
```

### Option 2: NextAuth.js (Recommended for Production)
```bash
npm install next-auth
```

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check against environment variables or database
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: '1', name: 'Admin', email: 'admin@airlab.com' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
```

## 🛡️ Additional Security Measures

### 1. Environment Variables
```bash
# .env.local (DO NOT COMMIT)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### 2. Content Security Policy
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### 3. HTTPS Enforcement
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Redirect HTTP to HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }
}
```

### 4. API Key for External Services
```typescript
// For FormSubmit or other services
// Use environment variables instead of hardcoding
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
```

### 5. Audit Logging
```typescript
// src/lib/audit-log.ts
export function logAdminAction(action: string, userId: string, details: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    details,
    ip: request.headers.get('x-forwarded-for'),
  };
  
  // Write to log file or database
  fs.appendFileSync(
    'logs/admin-audit.log',
    JSON.stringify(logEntry) + '\n'
  );
}

// Use in API routes
logAdminAction('CREATE_PROJECT', userId, { projectId: newProject.id });
```

## 📋 Security Checklist

- [ ] Implement authentication on admin routes
- [ ] Add input validation with Zod
- [ ] Implement file locking for concurrent requests
- [ ] Add rate limiting
- [ ] Sanitize user input
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Add Content Security Policy headers
- [ ] Implement audit logging
- [ ] Regular security updates: `npm audit fix`
- [ ] Use HTTPS for all external resources
- [ ] Validate file uploads (if implemented)
- [ ] Implement CSRF protection
- [ ] Add session timeout
- [ ] Use secure cookies
- [ ] Implement backup system
- [ ] Monitor for suspicious activity
- [ ] Regular penetration testing
- [ ] Keep dependencies updated
- [ ] Use security headers

## 🚀 Quick Wins (Implement First)

1. Add password protection to admin layout (30 minutes)
2. Add input validation with Zod (1 hour)
3. Move secrets to environment variables (15 minutes)
4. Add rate limiting (30 minutes)
5. Implement file locking (1 hour)

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Zod Validation](https://zod.dev/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
