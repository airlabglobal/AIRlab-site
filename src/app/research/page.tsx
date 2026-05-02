import { getResearch } from '@/lib/data-fetchers';
import ResearchClient from './ResearchClient';

export default async function ResearchPage() {
    const research = await getResearch();
    return <ResearchClient initialResearch={research} />;
}
