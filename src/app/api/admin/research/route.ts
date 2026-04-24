import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { researchSchema } from '@/lib/validations';
import { ResearchPaper } from '@/types';
import fs from 'fs';
import path from 'path';

const researchPath = path.join(process.cwd(), 'src/data/research.json');

export async function GET() {
  try {
    const data = fs.readFileSync(researchPath, 'utf8');
    const research = JSON.parse(data);
    return NextResponse.json({ success: true, data: research });
  } catch (error) {
    console.error('Failed to read research:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read research' },
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
    const validationResult = researchSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const newPaper = validationResult.data as ResearchPaper;
    const data = fs.readFileSync(researchPath, 'utf8');
    const research: ResearchPaper[] = JSON.parse(data);
    
    const maxId = Math.max(...research.map((r) => parseInt(r._id) || 0), 0);
    newPaper._id = (maxId + 1).toString();
    
    research.unshift(newPaper);
    fs.writeFileSync(researchPath, JSON.stringify(research, null, 2));
    
    return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
  } catch (error) {
    console.error('Failed to create research:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create research' },
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
    const validationResult = researchSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updatedPaper = validationResult.data as ResearchPaper;
    const data = fs.readFileSync(researchPath, 'utf8');
    const research: ResearchPaper[] = JSON.parse(data);
    
    const index = research.findIndex((r) => r._id === updatedPaper._id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Research paper not found' },
        { status: 404 }
      );
    }
    
    research[index] = updatedPaper;
    fs.writeFileSync(researchPath, JSON.stringify(research, null, 2));
    
    return NextResponse.json({ success: true, data: updatedPaper });
  } catch (error) {
    console.error('Failed to update research:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update research' },
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
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Research ID required' },
        { status: 400 }
      );
    }
    
    const data = fs.readFileSync(researchPath, 'utf8');
    const research: ResearchPaper[] = JSON.parse(data);
    
    const filteredResearch = research.filter((r) => r._id !== id);
    
    if (filteredResearch.length === research.length) {
      return NextResponse.json(
        { success: false, error: 'Research paper not found' },
        { status: 404 }
      );
    }
    
    fs.writeFileSync(researchPath, JSON.stringify(filteredResearch, null, 2));
    
    return NextResponse.json({ success: true, message: 'Research deleted successfully' });
  } catch (error) {
    console.error('Failed to delete research:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete research' },
      { status: 500 }
    );
  }
}
