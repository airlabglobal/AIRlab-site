import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { newsSchema } from '@/lib/validations';
import { NewsItem } from '@/types';
import fs from 'fs';
import path from 'path';

const newsPath = path.join(process.cwd(), 'src/data/news.json');

export async function GET() {
  try {
    const data = fs.readFileSync(newsPath, 'utf8');
    const news = JSON.parse(data);
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error('Failed to read news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read news' },
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
    const validationResult = newsSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const newItem = validationResult.data as NewsItem;
    const data = fs.readFileSync(newsPath, 'utf8');
    const news: NewsItem[] = JSON.parse(data);
    
    const maxId = Math.max(...news.map((n) => parseInt(n.id) || 0), 0);
    newItem.id = (maxId + 1).toString();
    
    news.unshift(newItem); // Add to beginning
    fs.writeFileSync(newsPath, JSON.stringify(news, null, 2));
    
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error('Failed to create news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create news' },
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
    const validationResult = newsSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updatedItem = validationResult.data as NewsItem;
    const data = fs.readFileSync(newsPath, 'utf8');
    const news: NewsItem[] = JSON.parse(data);
    
    const index = news.findIndex((n) => n.id === updatedItem.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'News item not found' },
        { status: 404 }
      );
    }
    
    news[index] = updatedItem;
    fs.writeFileSync(newsPath, JSON.stringify(news, null, 2));
    
    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('Failed to update news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update news' },
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
        { success: false, error: 'News ID required' },
        { status: 400 }
      );
    }
    
    const data = fs.readFileSync(newsPath, 'utf8');
    const news: NewsItem[] = JSON.parse(data);
    
    const filteredNews = news.filter((n) => n.id !== id);
    
    if (filteredNews.length === news.length) {
      return NextResponse.json(
        { success: false, error: 'News item not found' },
        { status: 404 }
      );
    }
    
    fs.writeFileSync(newsPath, JSON.stringify(filteredNews, null, 2));
    
    return NextResponse.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    console.error('Failed to delete news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}
