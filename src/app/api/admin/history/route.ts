import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { historySchema } from '@/lib/validations';
import { HistoryItem } from '@/types';
import fs from 'fs';
import path from 'path';

const historyPath = path.join(process.cwd(), 'src/data/history.json');

export async function GET() {
  try {
    const data = fs.readFileSync(historyPath, 'utf8');
    const history = JSON.parse(data);
    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    console.error('Failed to read history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read history' },
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
    const validationResult = historySchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const newItem = validationResult.data;
    const data = fs.readFileSync(historyPath, 'utf8');
    const history: HistoryItem[] = JSON.parse(data);
    
    // Generate ID based on year and event
    const id = `${newItem.year}-${newItem.event.toLowerCase().replace(/\s+/g, '-')}`;
    const itemWithId = { ...newItem, id };
    
    history.push(itemWithId);
    
    // Sort by year (descending)
    history.sort((a, b) => {
      if (a.year === 'Present') return 1;
      if (b.year === 'Present') return -1;
      return parseInt(b.year) - parseInt(a.year);
    });
    
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
    
    return NextResponse.json({ success: true, data: itemWithId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create history item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create history item' },
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
    const validationResult = historySchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updatedItem = validationResult.data;
    const data = fs.readFileSync(historyPath, 'utf8');
    const history: HistoryItem[] = JSON.parse(data);
    
    const index = history.findIndex((h) => h.id === updatedItem.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'History item not found' },
        { status: 404 }
      );
    }
    
    history[index] = updatedItem;
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
    
    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('Failed to update history item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update history item' },
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
        { success: false, error: 'History ID required' },
        { status: 400 }
      );
    }
    
    const data = fs.readFileSync(historyPath, 'utf8');
    const history: HistoryItem[] = JSON.parse(data);
    
    const filteredHistory = history.filter((h) => h.id !== id);
    
    if (filteredHistory.length === history.length) {
      return NextResponse.json(
        { success: false, error: 'History item not found' },
        { status: 404 }
      );
    }
    
    fs.writeFileSync(historyPath, JSON.stringify(filteredHistory, null, 2));
    
    return NextResponse.json({ success: true, message: 'History item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete history item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete history item' },
      { status: 500 }
    );
  }
}