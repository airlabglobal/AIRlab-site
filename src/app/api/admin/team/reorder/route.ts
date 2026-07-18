import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { updates } = body;

    if (!Array.isArray(updates)) {
      return NextResponse.json({ success: false, error: 'Expected an array of updates' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const bulkOps = updates.map((update: { id: string, order: number }) => {
      const filter = ObjectId.isValid(update.id) ? { _id: new ObjectId(update.id) } : { id: update.id };
      return {
        updateOne: {
          filter,
          update: { $set: { order: update.order } }
        }
      };
    });

    if (bulkOps.length > 0) {
      await db.collection('team').bulkWrite(bulkOps);
    }

    return NextResponse.json({ success: true, message: 'Team reordered successfully' });
  } catch (error) {
    console.error('Failed to reorder team items:', error);
    return NextResponse.json({ success: false, error: 'Failed to reorder in database' }, { status: 500 });
  }
}
