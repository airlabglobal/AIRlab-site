import { getProjects } from '@/lib/data-fetchers';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
    const projects = await getProjects();
    return <ProjectsClient initialProjects={projects} />;
}
