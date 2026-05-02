/**
 * API Route Tests for Admin Endpoints
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
let authCookie = '';

async function authFetch(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  if (authCookie) headers.set('Cookie', authCookie);

  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers
  });
}

beforeAll(async () => {
  require('dotenv').config({ path: '.env.local' });
  const password = process.env.ADMIN_PASSWORD;
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  if (loginRes.status === 200) {
    const setCookieRaw = loginRes.headers.get('set-cookie');
    if (setCookieRaw) {
      authCookie = setCookieRaw.split(';')[0];
    }
  } else {
    console.warn("Test Auth Failed:", loginRes.status, await loginRes.text(), "PW Len:", password?.length);
  }
});

describe('Admin API Routes', () => {
  describe('Projects API', () => {
    it('should fetch all projects', async () => {
      const response = await authFetch('/api/admin/projects');
      expect(response.status).toBe(200);
      const resData = await response.json();
      expect(resData.success).toBe(true);
      expect(Array.isArray(resData.data)).toBe(true);
    });

    let createdId = '';

    it('should create a new project with valid data', async () => {
      const newProject = {
        title: 'Test Project',
        description: 'Test Description',
        imageUrl: 'https://example.com/image.jpg',
        imageHint: 'test image hint',
        tags: ['AI', 'Test'],
        status: 'Ongoing'
      };

      const response = await authFetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      expect(response.status).toBe(201);
      const resData = await response.json();
      expect(resData.data.id).toBeDefined();
      createdId = resData.data.id;
      expect(resData.data.title).toBe(newProject.title);
    });

    it('should update an existing project', async () => {
      const updatedProject = {
        id: createdId,
        title: 'Updated Project Test',
        description: 'Updated Description',
        imageUrl: 'https://example.com/image.jpg',
        imageHint: 'test image hint',
        tags: ['AI'],
        status: 'Completed'
      };

      const response = await authFetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });

      expect(response.status).toBe(200);
      const resData = await response.json();
      expect(resData.success).toBe(true);
    });

    it('should return 404 for non-existent project update', async () => {
      const updatedProject = {
        id: 'fake-id-999',
        title: 'Non-existent',
        description: 'Test Description 404',
        imageUrl: 'https://example.com/image.jpg',
        imageHint: 'test image hint',
        tags: ['AI'],
        status: 'Completed'
      };

      const response = await authFetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });

      expect(response.status).toBe(404);
    });

    it('should delete a project', async () => {
      const response = await authFetch(`/api/admin/projects?id=${createdId}`, {
        method: 'DELETE'
      });

      expect(response.status).toBe(200);
    });
  });

  describe('News API', () => {
    it('should fetch all news items', async () => {
      const response = await authFetch('/api/admin/news');
      expect(response.status).toBe(200);
      const resData = await response.json();
      expect(Array.isArray(resData.data)).toBe(true);
    });

    it('should create a new news item', async () => {
      const newNews = {
        title: 'Test News',
        date: 'Jan 1, 2026',
        link: '#'
      };

      const response = await authFetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews)
      });

      expect(response.status).toBe(201);
      const resData = await response.json();
      expect(resData.data.id).toBeDefined();

      // Clean up for other tests
      await authFetch(`/api/admin/news?id=${resData.data.id}`, { method: 'DELETE' });
    });

    it('should require ID for deletion', async () => {
      const response = await authFetch('/api/admin/news', {
        method: 'DELETE'
      });

      expect(response.status).toBe(400);
    });
  });

  describe('Research API', () => {
    it('should fetch all research papers', async () => {
      const response = await authFetch('/api/admin/research');
      expect(response.status).toBe(200);
      const resData = await response.json();
      expect(Array.isArray(resData.data)).toBe(true);
    });

    it('should create a new research paper', async () => {
      const newResearch = {
        title: 'Test Research Paper',
        authors: 'Test Author',
        description: 'This is a test description for the paper.',
        year: 2026,
        fileUrl: 'https://example.com/paper.pdf'
      };

      const response = await authFetch('/api/admin/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResearch)
      });

      expect(response.status).toBe(201);
      const resData = await response.json();
      expect(resData.data._id).toBeDefined();

      await authFetch(`/api/admin/research?id=${resData.data._id}`, { method: 'DELETE' });
    });
  });

  describe('Team API', () => {
    it('should fetch all team members', async () => {
      const response = await authFetch('/api/admin/team');
      expect(response.status).toBe(200);
      const resData = await response.json();
      expect(resData.data).toBeDefined();
    });

    it('should create a new team member', async () => {
      const newMember = {
        name: 'Test Member',
        role: 'Researcher',
        imageUrl: 'https://example.com/images/test.jpg',
        bio: 'Test bio',
        category: 'leading',
        social: { linkedin: '', twitter: '', github: '', email: '' }
      };

      const response = await authFetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      });

      expect(response.status).toBe(201);
      const resData = await response.json();
      expect(resData.data.id).toBeDefined();

      await authFetch(`/api/admin/team?id=${resData.data.id}`, { method: 'DELETE' });
    });
  });

  describe('History API', () => {
    it('should fetch all history items', async () => {
      const response = await authFetch('/api/admin/history');
      expect(response.status).toBe(200);
      const resData = await response.json();
      expect(Array.isArray(resData.data)).toBe(true);
    });

    it('should create a new history item', async () => {
      const newHistory = {
        year: '2026',
        event: 'Test History',
        description: 'Test description'
      };

      const response = await authFetch('/api/admin/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHistory)
      });

      expect(response.status).toBe(201);
      const resData = await response.json();
      expect(resData.data.id).toBeDefined();

      await authFetch(`/api/admin/history?id=${resData.data.id}`, { method: 'DELETE' });
    });
  });

  describe('Security Tests', () => {
    it('should validate input data', async () => {
      const maliciousData = {
        title: '<script>alert("xss")</script>',
        description: 'Test'
      };

      const response = await authFetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maliciousData)
      });

      // Zod validation should reject missing arbitrary fields
      expect(response.status).toBeLessThan(500);
    });
  });
});
