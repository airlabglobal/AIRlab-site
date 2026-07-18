import { unstable_noStore as noStore } from 'next/cache';
import { ObjectId } from 'mongodb';
import clientPromise, { mapDoc } from './mongodb';
import { Project, NewsItem, ResearchPaper, HistoryItem, TeamMember, Director } from '@/types';

export async function getProjects(): Promise<Project[]> {
    noStore();
    const client = await clientPromise;
    const data = await client.db().collection('projects').find({}).toArray();
    const mapped = data.map(mapDoc);
    mapped.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    return JSON.parse(JSON.stringify(mapped));
}

export async function getNews(): Promise<NewsItem[]> {
    noStore();
    const client = await clientPromise;
    const data = await client.db().collection('news').find({}).sort({ date: -1 }).toArray();
    const mapped = data.map(mapDoc);
    return JSON.parse(JSON.stringify(mapped));
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
    noStore();
    const client = await clientPromise;
    const filter = ObjectId.isValid(id)
        ? { $or: [{ _id: new ObjectId(id) }, { id }] }
        : { id };
    const data = await client.db().collection('news').findOne(filter);
    if (!data) return null;
    return JSON.parse(JSON.stringify(mapDoc(data)));
}

export async function getResearch(): Promise<ResearchPaper[]> {
    noStore();
    const client = await clientPromise;
    const data = await client.db().collection('research').find({}).toArray();
    const mapped = data.map(mapDoc);
    return JSON.parse(JSON.stringify(mapped));
}

export async function getHistory(): Promise<HistoryItem[]> {
    noStore();
    const client = await clientPromise;
    const data = await client.db().collection('history').find({}).toArray();
    const mapped = data.map(mapDoc);
    mapped.sort((a, b) => {
        if (a.year === 'Present' && b.year !== 'Present') return 1;
        if (b.year === 'Present' && a.year !== 'Present') return -1;

        const yearA = a.year === 'Present' ? new Date().getFullYear() : parseInt(a.year);
        const yearB = b.year === 'Present' ? new Date().getFullYear() : parseInt(b.year);

        const yearDiff = yearA - yearB;
        if (yearDiff !== 0) return yearDiff;

        // If years are the same, sort by explicit order
        return (a.order || 0) - (b.order || 0);
    });
    return JSON.parse(JSON.stringify(mapped));
}

export async function getTeamByCategory(category: string): Promise<TeamMember[]> {
    noStore();
    const client = await clientPromise;
    const data = await client.db().collection('team').find({ category }, { projection: { category: 0 } }).toArray();
    const mapped = data.map(doc => {
        const { _id, ...rest } = doc;
        return {
            ...rest,
            id: _id ? _id.toString() : rest.id,
        };
    });
    (mapped as any[]).sort((a, b) => (a.order !== undefined && b.order !== undefined ? a.order - b.order : (a.order || 0) - (b.order || 0)));
    return JSON.parse(JSON.stringify(mapped));
}

export async function getDirector(): Promise<Director | null> {
    noStore();
    const client = await clientPromise;
    const data = await client.db().collection('director').findOne({}, { projection: { _id: 0 } });
    if (!data) return null;
    return JSON.parse(JSON.stringify(data));
}
