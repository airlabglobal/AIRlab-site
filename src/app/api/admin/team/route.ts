import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { teamMemberSchema } from '@/lib/validations';
import { TeamMember } from '@/types';
import fs from 'fs';
import path from 'path';

// Support multiple team files
const teamFiles = {
  leading: path.join(process.cwd(), 'src/data/team-leading.json'),
  pioneer: path.join(process.cwd(), 'src/data/team-pioneer.json'),
  volunteers: path.join(process.cwd(), 'src/data/team-volunteers.json'),
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';

    if (category === 'all') {
      const allTeam = {
        leading: JSON.parse(fs.readFileSync(teamFiles.leading, 'utf8')),
        pioneer: JSON.parse(fs.readFileSync(teamFiles.pioneer, 'utf8')),
        volunteers: JSON.parse(fs.readFileSync(teamFiles.volunteers, 'utf8')),
      };
      return NextResponse.json({ success: true, data: allTeam });
    }

    const filePath = teamFiles[category as keyof typeof teamFiles];
    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      );
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const team = JSON.parse(data);
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error('Failed to read team:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read team' },
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
    const { category, ...memberData } = body;

    if (!category || !teamFiles[category as keyof typeof teamFiles]) {
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
    const filePath = teamFiles[category as keyof typeof teamFiles];
    const data = fs.readFileSync(filePath, 'utf8');
    const team: TeamMember[] = JSON.parse(data);
    
    const maxId = Math.max(...team.map((m) => parseInt(m.id) || 0), 0);
    newMember.id = (maxId + 1).toString();
    
    team.push(newMember);
    fs.writeFileSync(filePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error) {
    console.error('Failed to create team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create team member' },
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
    const { category, ...memberData } = body;

    if (!category || !teamFiles[category as keyof typeof teamFiles]) {
      return NextResponse.json(
        { success: false, error: 'Valid category required' },
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

    const updatedMember = validationResult.data as TeamMember;
    const filePath = teamFiles[category as keyof typeof teamFiles];
    const data = fs.readFileSync(filePath, 'utf8');
    const team: TeamMember[] = JSON.parse(data);
    
    const index = team.findIndex((m) => m.id === updatedMember.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    team[index] = updatedMember;
    fs.writeFileSync(filePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json({ success: true, data: updatedMember });
  } catch (error) {
    console.error('Failed to update team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update team member' },
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
    const category = searchParams.get('category');
    
    if (!id || !category) {
      return NextResponse.json(
        { success: false, error: 'Team member ID and category required' },
        { status: 400 }
      );
    }

    const filePath = teamFiles[category as keyof typeof teamFiles];
    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      );
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const team: TeamMember[] = JSON.parse(data);
    
    const filteredTeam = team.filter((m) => m.id !== id);
    
    if (filteredTeam.length === team.length) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    fs.writeFileSync(filePath, JSON.stringify(filteredTeam, null, 2));
    
    return NextResponse.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
