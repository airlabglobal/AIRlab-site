import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const projectsPath = path.join(process.cwd(), 'src/data/projects.json');

export async function GET() {
  try {
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(data);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json();
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(data);
    
    // Generate new ID
    const maxId = Math.max(...projects.map((p: any) => parseInt(p.id) || 0));
    newProject.id = (maxId + 1).toString();
    
    projects.push(newProject);
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProject = await request.json();
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(data);
    
    const index = projects.findIndex((p: any) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    projects[index] = updatedProject;
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }
    
    const data = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(data);
    
    const filteredProjects = projects.filter((p: any) => p.id !== id);
    fs.writeFileSync(projectsPath, JSON.stringify(filteredProjects, null, 2));
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}