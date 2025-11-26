'use client';
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, ExternalLink } from 'lucide-react';
import researchData from '@/data/research.json';

export default function ResearchPage() {
  const researchPapers = researchData;

  return (
    <PageWrapper>
      <Section title="Research at AIRLAB" subtitle="Exploring the Frontiers of AI & Robotics">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Our research spans diverse topics in Artificial Intelligence, Machine Learning, and Robotics,
          pushing the boundaries of knowledge while addressing real-world challenges in Africa and beyond.
          Explore our latest publications and ongoing research initiatives.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchPapers.map((paper) => (
            <Card key={paper._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={paper.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"}
                  alt={paper.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
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
      </Section>

      {/* You can keep the other sections as is */}
    </PageWrapper>
  );
}
