import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { projectSchema } from '@/lib/validations';
import { Project } from '@/types';
import fs from 'fs';
import path from 'path';

const projectsPath = path.join(process.cwd(), 'src/data/projects.json');

export async function GET() {
  try {
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(data);
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Failed to read projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validationResult = projectSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const newProject = validationResult.data as Project;
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects: Project[] = JSON.parse(data);
    
    const maxId = Math.max(...projects.map((p) => parseInt(p.id) || 0), 0);
    newProject.id = (maxId + 1).toString();
    
    projects.push(newProject);
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validationResult = projectSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updatedProject = validationResult.data as Project;
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects: Project[] = JSON.parse(data);
    
    const index = projects.findIndex((p) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    projects[index] = updatedProject;
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID required' },
        { status: 400 }
      );
    }
    
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects: Project[] = JSON.parse(data);
    
    const filteredProjects = projects.filter((p) => p.id !== id);
    
    if (filteredProjects.length === projects.length) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    fs.writeFileSync(projectsPath, JSON.stringify(filteredProjects, null, 2));
    
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
