'use client';
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OptimizedImage, responsiveSizes } from '@/components/ui/OptimizedImage';
import { DataStatus, GridLoadingSkeleton } from '@/components/ui/DataStatus';
import Link from 'next/link';
import { FileText, ExternalLink } from 'lucide-react';
import { useResearch } from '@/hooks/useDataLoader';
import SectionErrorBoundary from '@/components/error/SectionErrorBoundary';
import { errorMonitor } from '@/lib/errorMonitoring';

export default function ResearchPage() {
  const { 
    data: researchPapers, 
    loading, 
    error,
    isValid,
    isFallback,
    retry
  } = useResearch();

  return (
    <PageWrapper>
      <Section title="Research at AIRLAB" subtitle="Exploring the Frontiers of AI & Robotics">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Our research spans diverse topics in Artificial Intelligence, Machine Learning, and Robotics,
          pushing the boundaries of knowledge while addressing real-world challenges in Africa and beyond.
          Explore our latest publications and ongoing research initiatives.
        </p>
        <SectionErrorBoundary 
          sectionName="Research Papers"
          onError={(error, errorInfo) => {
            errorMonitor.logError(error, errorInfo, { 
              context: 'research-page',
              section: 'research-papers'
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
              {researchPapers?.map((paper) => (
                <Card key={paper._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <OptimizedImage
                      src={paper.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"}
                      alt={paper.title}
                      fill
                      sizes={responsiveSizes.card}
                      className="group-hover:scale-105 transition-transform duration-300"
                      objectFit="cover"
                      quality={80}
                      fallbackSrc="https://placehold.co/600x400/e2e8f0/64748b?text=Research+Paper"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {paper.year}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors flex items-start gap-2">
                      <FileText className="h-5 w-5 mt-1 flex-shrink-0" />
                      <span>{paper.title}</span>
                    </CardTitle>
                    <CardDescription className="font-body text-sm text-accent">
                      {paper.authors}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="font-body text-foreground/75 text-sm">{paper.description}</p>
                  </CardContent>
                  <div className="p-4 bg-muted/30 mt-auto">
                    <Button asChild variant="link" className="text-primary hover:text-primary/80 p-0">
                      <Link href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                        Read Full Paper <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </DataStatus>
        </SectionErrorBoundary>
      </Section>

      {/* You can keep the other sections as is */}
    </PageWrapper>
  );
}
