import { NextRequest, NextResponse } from 'next/server';
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
    
    // Use bulk write for efficient updates
    const bulkOps = updates.map((update: { id: string, order: number }) => ({
      updateOne: {
        filter: { id: update.id },
        update: { $set: { order: update.order } }
      }
    }));

    if (bulkOps.length > 0) {
      await db.collection('history').bulkWrite(bulkOps);
    }

    return NextResponse.json({ success: true, message: 'Reordered successfully' });
  } catch (error) {
    console.error('Failed to reorder history items:', error);
    return NextResponse.json({ success: false, error: 'Failed to reorder in database' }, { status: 500 });
  }
}
