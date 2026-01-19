import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const newsPath = path.join(process.cwd(), 'src/data/news.json');

export async function GET() {
  try {
    const data = fs.readFileSync(newsPath, 'utf8');
    const news = JSON.parse(data);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read news' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newNews = await request.json();
    const data = fs.readFileSync(newsPath, 'utf8');
    const news = JSON.parse(data);
    
    // Generate new ID based on array length
    newNews.id = news.length + 1;
    
    news.push(newNews);
    fs.writeFileSync(newsPath, JSON.stringify(news, null, 2));
    
    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedNews = await request.json();
    const data = fs.readFileSync(newsPath, 'utf8');
    const news = JSON.parse(data);
    
    const index = news.findIndex((n: any) => n.id === updatedNews.id);
    if (index === -1) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }
    
    news[index] = updatedNews;
    fs.writeFileSync(newsPath, JSON.stringify(news, null, 2));
    
    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'News ID required' }, { status: 400 });
    }
    
    const data = fs.readFileSync(newsPath, 'utf8');
    const news = JSON.parse(data);
    
    const filteredNews = news.filter((n: any) => n.id !== parseInt(id));
    fs.writeFileSync(newsPath, JSON.stringify(filteredNews, null, 2));
    
    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}