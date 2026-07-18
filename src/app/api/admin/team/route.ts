import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '@/lib/auth';
import { teamMemberSchema } from '@/lib/validations';
import { TeamMember } from '@/types';
import clientPromise, { mapDoc } from '@/lib/mongodb';

const mapAndSortDocs = (docs: any[]) => {
  return docs
    .map(mapDoc)
    .sort((a, b) => (a.order !== undefined && b.order !== undefined ? a.order - b.order : (a.order || 0) - (b.order || 0)));
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('team');

    if (category === 'all') {
      const leadingRaw = await collection.find({ category: 'leading' }, { projection: { category: 0 } }).toArray();
      const pioneerRaw = await collection.find({ category: 'pioneer' }, { projection: { category: 0 } }).toArray();
      const volunteersRaw = await collection.find({ category: 'volunteers' }, { projection: { category: 0 } }).toArray();

      const allTeam = {
        leading: mapAndSortDocs(leadingRaw),
        pioneer: mapAndSortDocs(pioneerRaw),
        volunteers: mapAndSortDocs(volunteersRaw),
      };
      return NextResponse.json({ success: true, data: allTeam });
    }

    const teamRaw = await collection.find({ category }, { projection: { category: 0 } }).toArray();
    return NextResponse.json({ success: true, data: mapAndSortDocs(teamRaw) });
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
    const client = await clientPromise;
    const db = client.db();

    const docToInsert = { ...newMember, category };
    delete (docToInsert as any).id;
    const insertResult = await db.collection('team').insertOne(docToInsert);

    newMember.id = insertResult.insertedId.toString();
    await db.collection('team').updateOne(
      { _id: insertResult.insertedId },
      { $set: { id: newMember.id } }
    );

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

    let query: any;
    if (updatedMember.id && ObjectId.isValid(updatedMember.id)) {
      query = { _id: new ObjectId(updatedMember.id) };
    } else if (category && updatedMember.id) {
      query = { id: updatedMember.id, category };
    } else {
      query = { id: updatedMember.id };
    }

    const result = await db.collection('team').updateOne(
      query,
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
    const category = searchParams.get('category');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Team member ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    let query: any;
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else if (category && id) {
      query = { id, category };
    } else {
      query = { id };
    }

    const result = await db.collection('team').deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete from database' }, { status: 500 });
  }
}
