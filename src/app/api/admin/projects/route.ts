import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '@/lib/auth';
import { projectSchema } from '@/lib/validations';
import { Project } from '@/types';
import clientPromise, { mapDoc } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const rawProjects = await db.collection('projects').find({}).toArray();
    const projects = rawProjects.map(mapDoc);

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

    const projectToInsert = { ...newProject };
    delete (projectToInsert as any).id;
    delete (projectToInsert as any)._id;

    const result = await db.collection('projects').insertOne(projectToInsert as any);
    const createdProject = { ...newProject, id: result.insertedId.toString() };

    return NextResponse.json({ success: true, data: createdProject }, { status: 201 });
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
    const id = updatedProject.id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: id }] }
      : { id: id };

    const { _id, id: _, ...updateFields } = updatedProject as any;

    const result = await db.collection('projects').updateOne(
      filter,
      { $set: updateFields }
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

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: id }] }
      : { id: id };

    const result = await db.collection('projects').deleteOne(filter);

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
