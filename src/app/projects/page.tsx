import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Layers } from 'lucide-react';
import projectsData from '@/data/projects.json';

export default function ProjectsPage() {
  const projects = projectsData;

  return (
    <PageWrapper>
      <Section title="Our Projects" subtitle="Innovations in Action">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Discover the diverse range of projects undertaken at AIRLAB. Our work spans various applications
          of Artificial Intelligence and Robotics, addressing critical challenges in healthcare, agriculture, urban development, and more.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={project.imageHint}
                  />
                   <div className="absolute top-2 right-2">
                     <Badge variant={project.status === "Completed" ? "default" : "secondary"} className={project.status === "Completed" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                       {project.status}
                     </Badge>
                   </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="font-body text-sm text-foreground/75 mb-4 line-clamp-3">{project.description}</CardDescription>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="text-accent p-0 hover:text-primary">
                  <Link href={project.link}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </PageWrapper>
  );
}
