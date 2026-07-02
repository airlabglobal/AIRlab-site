import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { directorSchema } from '@/lib/validations';
import { Director } from '@/types';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const data = await client.db().collection('director').findOne({}, { projection: { _id: 0 } });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to read director:', error);
    return NextResponse.json({ success: false, error: 'Failed to access database' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = directorSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const directorData = validationResult.data as Director;
    const client = await clientPromise;
    const collection = client.db().collection('director');

    const existing = await collection.findOne({});
    if (existing) {
      await collection.updateOne({}, { $set: directorData });
    } else {
      await collection.insertOne(directorData);
    }

    return NextResponse.json({ success: true, data: directorData });
  } catch (error) {
    console.error('Failed to update director:', error);
    return NextResponse.json({ success: false, error: 'Failed to update in database' }, { status: 500 });
  }
}
