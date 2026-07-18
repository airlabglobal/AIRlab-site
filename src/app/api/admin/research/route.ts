import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '@/lib/auth';
import { researchSchema } from '@/lib/validations';
import { ResearchPaper } from '@/types';
import clientPromise, { mapDoc } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const rawResearch = await db.collection('research').find({}).toArray();
    const research = rawResearch.map(mapDoc);

    return NextResponse.json({ success: true, data: research });
  } catch (error) {
    console.error('Failed to read research:', error);
    return NextResponse.json({ success: false, error: 'Failed to read research from database' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = researchSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const newPaper = validationResult.data as ResearchPaper;
    const client = await clientPromise;
    const db = client.db();

    const docToInsert = { ...newPaper };
    delete (docToInsert as any)._id;
    delete (docToInsert as any).id;

    const result = await db.collection('research').insertOne(docToInsert as any);
    const createdPaper = { ...newPaper, id: result.insertedId.toString() };

    return NextResponse.json({ success: true, data: createdPaper }, { status: 201 });
  } catch (error) {
    console.error('Failed to create research:', error);
    return NextResponse.json({ success: false, error: 'Failed to create research in database' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = researchSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: validationResult.error.issues }, { status: 400 });
    }

    const updatedPaper = validationResult.data as ResearchPaper;
    const idToFind = updatedPaper.id;
    if (!idToFind) {
      return NextResponse.json({ success: false, error: 'Research ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const filter = ObjectId.isValid(idToFind)
      ? { $or: [{ _id: new ObjectId(idToFind) }, { id: idToFind }] }
      : { id: idToFind };

    const { _id, id: _, ...updateFields } = updatedPaper as any;

    const result = await db.collection('research').updateOne(
      filter,
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Research paper not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPaper });
  } catch (error) {
    console.error('Failed to update research:', error);
    return NextResponse.json({ success: false, error: 'Failed to update research in database' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Research ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: id }] }
      : { id: id };

    const result = await db.collection('research').deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Research paper not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Research deleted successfully' });
  } catch (error) {
    console.error('Failed to delete research:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete research from database' }, { status: 500 });
  }
}
