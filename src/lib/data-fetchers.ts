import clientPromise from './mongodb';
import { Project, NewsItem, ResearchPaper, HistoryItem, TeamMember } from '@/types';

export async function getProjects(): Promise<Project[]> {
    const client = await clientPromise;
    const data = await client.db().collection('projects').find({}, { projection: { _id: 0 } }).toArray();
    return JSON.parse(JSON.stringify(data));
}

export async function getNews(): Promise<NewsItem[]> {
    const client = await clientPromise;
    const data = await client.db().collection('news').find({}, { projection: { _id: 0 } }).sort({ date: -1 }).toArray();
    return JSON.parse(JSON.stringify(data));
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
    const client = await clientPromise;
    const data = await client.db().collection('news').findOne({ id }, { projection: { _id: 0 } });
    if (!data) return null;
    return JSON.parse(JSON.stringify(data));
}

export async function getResearch(): Promise<ResearchPaper[]> {
    const client = await clientPromise;
    const data = await client.db().collection('research').find({}).toArray();
    return JSON.parse(JSON.stringify(data));
}

export async function getHistory(): Promise<HistoryItem[]> {
    const client = await clientPromise;
    const data = await client.db().collection('history').find({}, { projection: { _id: 0 } }).toArray();
    data.sort((a, b) => {
        if (a.year === 'Present' && b.year !== 'Present') return -1;
        if (b.year === 'Present' && a.year !== 'Present') return 1;
        
        const yearA = a.year === 'Present' ? new Date().getFullYear() : parseInt(a.year);
        const yearB = b.year === 'Present' ? new Date().getFullYear() : parseInt(b.year);
        
        const yearDiff = yearB - yearA;
        if (yearDiff !== 0) return yearDiff;
        
        // If years are the same, sort by explicit order
        return (a.order || 0) - (b.order || 0);
    });
    return JSON.parse(JSON.stringify(data));
}

export async function getTeamByCategory(category: string): Promise<TeamMember[]> {
    const client = await clientPromise;
    const data = await client.db().collection('team').find({ category }, { projection: { _id: 0, category: 0 } }).toArray();
    return JSON.parse(JSON.stringify(data));
}
