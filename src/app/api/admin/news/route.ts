import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '@/lib/auth';
import { newsSchema } from '@/lib/validations';
import { NewsItem } from '@/types';
import clientPromise, { mapDoc } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const rawNews = await db.collection('news').find({})
      .sort({ date: -1 })
      .toArray();
    const news = rawNews.map(mapDoc);

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error('Failed to read news:', error);
    return NextResponse.json({ success: false, error: 'Failed to read news from database' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = newsSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const newItem = validationResult.data as NewsItem;
    const client = await clientPromise;
    const db = client.db();

    const docToInsert = { ...newItem };
    delete (docToInsert as any).id;
    delete (docToInsert as any)._id;

    const result = await db.collection('news').insertOne(docToInsert as any);
    const createdItem = { ...newItem, id: result.insertedId.toString() };

    return NextResponse.json({ success: true, data: createdItem }, { status: 201 });
  } catch (error) {
    console.error('Failed to create news:', error);
    return NextResponse.json({ success: false, error: 'Failed to create news in database' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = newsSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: validationResult.error.issues }, { status: 400 });
    }

    const updatedItem = validationResult.data as NewsItem;
    const id = updatedItem.id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'News ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: id }] }
      : { id: id };

    const { _id, id: _, ...updateFields } = updatedItem as any;

    const result = await db.collection('news').updateOne(
      filter,
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('Failed to update news:', error);
    return NextResponse.json({ success: false, error: 'Failed to update news in database' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'News ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: id }] }
      : { id: id };

    const result = await db.collection('news').deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    console.error('Failed to delete news:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete news from database' }, { status: 500 });
  }
}
