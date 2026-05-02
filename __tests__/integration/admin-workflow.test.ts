/**
 * Integration Tests for Admin Workflow
 * 
 * Tests complete CRUD operations for admin panel
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

describe('Admin Workflow Integration', () => {
  describe('Project Management Workflow', () => {
    let createdProjectId: string;

    it('should complete full project lifecycle', async () => {
      // 1. Create a project
      const newProject = {
        title: 'Integration Test Project',
        description: 'Testing full workflow',
        imageUrl: 'https://example.com/test.jpg',
        imageHint: 'test image',
        tags: ['Test', 'Integration'],
        status: 'Research Phase',
        link: '/projects/test'
      };

      const createResponse = await authFetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      expect(createResponse.status).toBe(201);
      const createdRes = await createResponse.json();
      const created = createdRes.data;
      createdProjectId = created.id;
      expect(created.title).toBe(newProject.title);

      // 2. Read the project
      const readResponse = await authFetch('/api/admin/projects');
      expect(readResponse.status).toBe(200);
      const projectsRes = await readResponse.json();
      const projects = projectsRes.data;
      const foundProject = projects.find((p: any) => p.id === createdProjectId);
      expect(foundProject).toBeDefined();

      // 3. Update the project
      const updatedProject = {
        ...created,
        status: 'Ongoing',
        description: 'Updated description'
      };

      const updateResponse = await authFetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });

      expect(updateResponse.status).toBe(200);
      const updatedRes = await updateResponse.json();
      expect(updatedRes.data.status).toBe('Ongoing');

      // 4. Delete the project
      const deleteResponse = await authFetch(`/api/admin/projects?id=${createdProjectId}`, {
        method: 'DELETE'
      });

      expect(deleteResponse.status).toBe(200);

      // 5. Verify deletion
      const verifyResponse = await authFetch('/api/admin/projects');
      const finalProjectsRes = await verifyResponse.json();
      const finalProjects = finalProjectsRes.data;
      const deletedProject = finalProjects.find((p: any) => p.id === createdProjectId);
      expect(deletedProject).toBeUndefined();
    });
  });

  describe('News Management Workflow', () => {
    it('should handle news CRUD operations', async () => {
      // Create
      const newNews = {
        title: 'Test News Item',
        date: 'Feb 27, 2026',
        link: '#test'
      };

      const createResponse = await authFetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews)
      });

      expect(createResponse.status).toBe(201);
      const createdRes = await createResponse.json();
      const created = createdRes.data;

      // Update
      const updated = { ...created, title: 'Updated News' };
      const updateResponse = await authFetch('/api/admin/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      expect(updateResponse.status).toBe(200);

      // Delete
      const deleteResponse = await authFetch(`/api/admin/news?id=${created.id}`, {
        method: 'DELETE'
      });

      expect(deleteResponse.status).toBe(200);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON', async () => {
      const response = await authFetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      });

      // Depending on body parsing limit/setup could be 500 or 400
      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should handle missing required fields', async () => {
      const incompleteProject = {
        title: 'Incomplete Project'
      };

      const response = await authFetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incompleteProject)
      });

      expect([400, 500]).toContain(response.status);
    });
  });
});
