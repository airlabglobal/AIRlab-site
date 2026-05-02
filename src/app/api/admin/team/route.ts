import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { teamMemberSchema } from '@/lib/validations';
import { TeamMember } from '@/types';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('team');

    if (category === 'all') {
      const leading = await collection.find({ category: 'leading' }, { projection: { _id: 0, category: 0 } }).toArray();
      const pioneer = await collection.find({ category: 'pioneer' }, { projection: { _id: 0, category: 0 } }).toArray();
      const volunteers = await collection.find({ category: 'volunteers' }, { projection: { _id: 0, category: 0 } }).toArray();

      const allTeam = { leading, pioneer, volunteers };
      return NextResponse.json({ success: true, data: allTeam });
    }

    const team = await collection.find({ category }, { projection: { _id: 0, category: 0 } }).toArray();
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error('Failed to read team:', error);
    return NextResponse.json({ success: false, error: 'Failed to access database' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { category, ...memberData } = body;

    const validCategories = ['leading', 'pioneer', 'volunteers'];
    if (!category || !validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, error: 'Valid category required (leading, pioneer, volunteers)' },
        { status: 400 }
      );
    }

    const validationResult = teamMemberSchema.safeParse(memberData);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const newMember = validationResult.data as TeamMember;
    newMember.id = Date.now().toString();

    const client = await clientPromise;
    const db = client.db();

    const docToInsert = { ...newMember, category };
    await db.collection('team').insertOne(docToInsert);

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error) {
    console.error('Failed to create team member:', error);
    return NextResponse.json({ success: false, error: 'Failed to insert into database' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { category, ...memberData } = body;

    const validationResult = teamMemberSchema.safeParse(memberData);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updatedMember = validationResult.data as TeamMember;
    const client = await clientPromise;
    const db = client.db();

    const updateObj: any = { ...updatedMember };
    if (category) {
      updateObj.category = category;
    }

    const result = await db.collection('team').updateOne(
      { id: updatedMember.id },
      { $set: updateObj }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedMember });
  } catch (error) {
    console.error('Failed to update team member:', error);
    return NextResponse.json({ success: false, error: 'Failed to update in database' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Team member ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('team').deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete from database' }, { status: 500 });
  }
}
