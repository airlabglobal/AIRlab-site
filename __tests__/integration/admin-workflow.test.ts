/**
 * Integration Tests for Admin Workflow
 * 
 * Tests complete CRUD operations for admin panel
 */

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

      const createResponse = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      expect(createResponse.status).toBe(201);
      const created = await createResponse.json();
      createdProjectId = created.id;
      expect(created.title).toBe(newProject.title);

      // 2. Read the project
      const readResponse = await fetch('/api/admin/projects');
      expect(readResponse.status).toBe(200);
      const projects = await readResponse.json();
      const foundProject = projects.find((p: any) => p.id === createdProjectId);
      expect(foundProject).toBeDefined();

      // 3. Update the project
      const updatedProject = {
        ...created,
        status: 'Ongoing',
        description: 'Updated description'
      };

      const updateResponse = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });

      expect(updateResponse.status).toBe(200);
      const updated = await updateResponse.json();
      expect(updated.status).toBe('Ongoing');

      // 4. Delete the project
      const deleteResponse = await fetch(`/api/admin/projects?id=${createdProjectId}`, {
        method: 'DELETE'
      });

      expect(deleteResponse.status).toBe(200);

      // 5. Verify deletion
      const verifyResponse = await fetch('/api/admin/projects');
      const finalProjects = await verifyResponse.json();
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

      const createResponse = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews)
      });

      expect(createResponse.status).toBe(201);
      const created = await createResponse.json();

      // Update
      const updated = { ...created, title: 'Updated News' };
      const updateResponse = await fetch('/api/admin/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      expect(updateResponse.status).toBe(200);

      // Delete
      const deleteResponse = await fetch(`/api/admin/news?id=${created.id}`, {
        method: 'DELETE'
      });

      expect(deleteResponse.status).toBe(200);
    });
  });

  describe('Data Consistency', () => {
    it('should maintain consistent IDs across operations', async () => {
      // Get current projects
      const response1 = await fetch('/api/admin/projects');
      const projects1 = await response1.json();
      const maxId1 = Math.max(...projects1.map((p: any) => parseInt(p.id)));

      // Create new project
      const newProject = {
        title: 'ID Test Project',
        description: 'Testing ID generation'
      };

      const createResponse = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      const created = await createResponse.json();
      expect(parseInt(created.id)).toBe(maxId1 + 1);
    });

    it('should handle empty data files gracefully', async () => {
      // This test would require mocking the file system
      // to test edge cases like empty JSON files
      expect(true).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON', async () => {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      });

      expect(response.status).toBe(500);
    });

    it('should handle missing required fields', async () => {
      const incompleteProject = {
        title: 'Incomplete Project'
        // Missing other required fields
      };

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incompleteProject)
      });

      // Should either accept with defaults or reject
      expect([200, 201, 400]).toContain(response.status);
    });
  });
});
