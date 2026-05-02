import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { projectSchema } from '@/lib/validations';
import { Project } from '@/types';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const projects = await db.collection('projects').find({}, { projection: { _id: 0 } }).toArray();

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Failed to read projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects database' },
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
    const client = await clientPromise;
    const db = client.db();

    newProject.id = Date.now().toString(); // Consistent simple ID generation

    // insertOne mutates the object by adding _id, so we spread and omit the _id from the response
    const projectToInsert = { ...newProject };
    await db.collection('projects').insertOne(projectToInsert);

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project in database' },
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
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('projects').updateOne(
      { id: updatedProject.id },
      { $set: updatedProject }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project in database' },
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

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('projects').deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully from database' });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project from database' },
      { status: 500 }
    );
  }
}
