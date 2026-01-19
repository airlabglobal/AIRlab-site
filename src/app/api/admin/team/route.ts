import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const teamPaths = {
  leading: path.join(process.cwd(), 'src/data/team-leading.json'),
  pioneer: path.join(process.cwd(), 'src/data/team-pioneer.json'),
  volunteers: path.join(process.cwd(), 'src/data/team-volunteers.json'),
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as keyof typeof teamPaths;
    
    if (!category || !teamPaths[category]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    
    const data = fs.readFileSync(teamPaths[category], 'utf8');
    const team = JSON.parse(data);
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read team data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { category, ...newMember } = await request.json();
    
    if (!category || !teamPaths[category as keyof typeof teamPaths]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    
    const filePath = teamPaths[category as keyof typeof teamPaths];
    const data = fs.readFileSync(filePath, 'utf8');
    const team = JSON.parse(data);
    
    // Generate new ID
    const maxId = Math.max(...team.map((m: any) => parseInt(m.id) || 0));
    newMember.id = (maxId + 1).toString();
    
    team.push(newMember);
    fs.writeFileSync(filePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { category, ...updatedMember } = await request.json();
    
    if (!category || !teamPaths[category as keyof typeof teamPaths]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    
    const filePath = teamPaths[category as keyof typeof teamPaths];
    const data = fs.readFileSync(filePath, 'utf8');
    const team = JSON.parse(data);
    
    const index = team.findIndex((m: any) => m.id === updatedMember.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    team[index] = updatedMember;
    fs.writeFileSync(filePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category') as keyof typeof teamPaths;
    
    if (!id || !category || !teamPaths[category]) {
      return NextResponse.json({ error: 'ID and valid category required' }, { status: 400 });
    }
    
    const filePath = teamPaths[category];
    const data = fs.readFileSync(filePath, 'utf8');
    const team = JSON.parse(data);
    
    const filteredTeam = team.filter((m: any) => m.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(filteredTeam, null, 2));
    
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}