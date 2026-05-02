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

export async function getResearch(): Promise<ResearchPaper[]> {
    const client = await clientPromise;
    const data = await client.db().collection('research').find({}).toArray();
    return JSON.parse(JSON.stringify(data));
}

export async function getHistory(): Promise<HistoryItem[]> {
    const client = await clientPromise;
    const data = await client.db().collection('history').find({}, { projection: { _id: 0 } }).toArray();
    data.sort((a, b) => {
        if (a.year === 'Present') return -1;
        if (b.year === 'Present') return 1;
        return parseInt(b.year) - parseInt(a.year);
    });
    return JSON.parse(JSON.stringify(data));
}

export async function getTeamByCategory(category: string): Promise<TeamMember[]> {
    const client = await clientPromise;
    const data = await client.db().collection('team').find({ category }, { projection: { _id: 0, category: 0 } }).toArray();
    return JSON.parse(JSON.stringify(data));
}
