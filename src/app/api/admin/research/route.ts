import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const researchPath = path.join(process.cwd(), 'src/data/research.json');

export async function GET() {
  try {
    const data = fs.readFileSync(researchPath, 'utf8');
    const research = JSON.parse(data);
    return NextResponse.json(research);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read research' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newResearch = await request.json();
    const data = fs.readFileSync(researchPath, 'utf8');
    const research = JSON.parse(data);
    
    // Generate new ID
    const maxId = Math.max(...research.map((r: any) => parseInt(r._id) || 0));
    newResearch._id = (maxId + 1).toString();
    
    research.push(newResearch);
    fs.writeFileSync(researchPath, JSON.stringify(research, null, 2));
    
    return NextResponse.json(newResearch, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create research' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedResearch = await request.json();
    const data = fs.readFileSync(researchPath, 'utf8');
    const research = JSON.parse(data);
    
    const index = research.findIndex((r: any) => r._id === updatedResearch._id);
    if (index === -1) {
      return NextResponse.json({ error: 'Research not found' }, { status: 404 });
    }
    
    research[index] = updatedResearch;
    fs.writeFileSync(researchPath, JSON.stringify(research, null, 2));
    
    return NextResponse.json(updatedResearch);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update research' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Research ID required' }, { status: 400 });
    }
    
    const data = fs.readFileSync(researchPath, 'utf8');
    const research = JSON.parse(data);
    
    const filteredResearch = research.filter((r: any) => r._id !== id);
    fs.writeFileSync(researchPath, JSON.stringify(filteredResearch, null, 2));
    
    return NextResponse.json({ message: 'Research deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete research' }, { status: 500 });
  }
}