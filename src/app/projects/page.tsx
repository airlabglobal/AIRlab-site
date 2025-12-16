"use client";

import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage, responsiveSizes } from '@/components/ui/OptimizedImage';
import { DataStatus, GridLoadingSkeleton } from '@/components/ui/DataStatus';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '@/hooks/useDataLoader';
import SectionErrorBoundary from '@/components/error/SectionErrorBoundary';
import { errorMonitor } from '@/lib/errorMonitoring';

export default function ProjectsPage() {
  const { 
    data: projects, 
    loading, 
    error,
    isValid,
    isFallback,
    retry
  } = useProjects();

  return (
    <PageWrapper>
      <Section title="Our Projects" subtitle="Innovations in Action">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Discover the diverse range of projects undertaken at AIRLAB. Our work spans various applications
          of Artificial Intelligence and Robotics, addressing critical challenges in healthcare, agriculture, urban development, and more.
        </p>
        <SectionErrorBoundary 
          sectionName="Projects List"
          onError={(error, errorInfo) => {
            errorMonitor.logError(error, errorInfo, { 
              context: 'projects-page',
              section: 'projects-list'
            });
          }}
        >
          <DataStatus
            loading={loading}
            error={error}
            isValid={isValid}
            isFallback={isFallback}
            onRetry={retry}
            loadingComponent={<GridLoadingSkeleton items={6} columns={3} />}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video">
                      <OptimizedImage
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes={responsiveSizes.card}
                        className="group-hover:scale-105 transition-transform duration-500"
                        objectFit="cover"
                        quality={80}
                        fallbackSrc="https://placehold.co/600x400/e2e8f0/64748b?text=Project+Image"
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
          </DataStatus>
        </SectionErrorBoundary>
      </Section>
    </PageWrapper>
  );
}
