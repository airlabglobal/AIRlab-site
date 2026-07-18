import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '@/lib/auth';
import { historySchema } from '@/lib/validations';
import clientPromise, { mapDoc } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const rawHistory = await db.collection('history').find({}).toArray();
    const history = rawHistory.map(mapDoc);

    history.sort((a, b) => {
      if (a.year === 'Present' && b.year !== 'Present') return 1;
      if (b.year === 'Present' && a.year !== 'Present') return -1;
      
      const yearA = a.year === 'Present' ? new Date().getFullYear() : parseInt(a.year);
      const yearB = b.year === 'Present' ? new Date().getFullYear() : parseInt(b.year);
      
      const yearDiff = yearA - yearB;
      if (yearDiff !== 0) return yearDiff;
      
      // If years are the same, sort by explicit order
      return (a.order || 0) - (b.order || 0);
    });

    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    console.error('Failed to read history:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch history from database' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = historySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: validationResult.error.issues }, { status: 400 });
    }

    const newItem = validationResult.data;
    const client = await clientPromise;
    const db = client.db();

    const docToInsert = { ...newItem };
    delete (docToInsert as any).id;
    delete (docToInsert as any)._id;

    const result = await db.collection('history').insertOne(docToInsert as any);
    const createdItem = { ...newItem, id: result.insertedId.toString() };

    return NextResponse.json({ success: true, data: createdItem }, { status: 201 });
  } catch (error) {
    console.error('Failed to create history item:', error);
    return NextResponse.json({ success: false, error: 'Failed to create history in database' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = historySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: validationResult.error.issues }, { status: 400 });
    }

    const updatedItem = validationResult.data;
    const id = updatedItem.id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'History ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: id }] }
      : { id: id };

    const { _id, id: _, ...updateFields } = updatedItem as any;

    const result = await db.collection('history').updateOne(
      filter,
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'History item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('Failed to update history item:', error);
    return NextResponse.json({ success: false, error: 'Failed to update history in database' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'History ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: id }] }
      : { id: id };

    const result = await db.collection('history').deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'History item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'History item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete history item:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete history from database' }, { status: 500 });
  }
}