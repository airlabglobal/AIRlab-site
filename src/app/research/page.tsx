'use client';
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, ExternalLink, ArrowRight } from 'lucide-react';
import researchData from '@/data/research.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function ResearchPage() {
  const researchPapers = researchData;
  const hasResearch = researchPapers.length > 0;
  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  return (
    <PageWrapper>
      <Section title="Research at AIRLAB" subtitle="Exploring the Frontiers of AI & Robotics">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Our research spans diverse topics in Artificial Intelligence, Machine Learning, and Robotics,
          pushing the boundaries of knowledge while addressing real-world challenges in Africa and beyond.
          Explore our latest publications and ongoing research initiatives.
        </p>
        {hasResearch ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchPapers.map((paper) => (
            <Card key={paper._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={paper.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"}
                  alt={paper.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                <p className="font-body text-foreground/75 text-sm line-clamp-3">{paper.description}</p>
              </CardContent>
              <div className="p-4 bg-muted/30 mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0" onClick={() => setSelectedPaper(paper)}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-headline">{paper.title}</DialogTitle>
                      <DialogDescription>
                        <span className="text-accent font-semibold">{paper.authors}</span> • {paper.year}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={paper.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"}
                          alt={paper.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-foreground/80">{paper.description}</p>
                      </div>

                      {paper.abstract && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Abstract</h3>
                          <p className="text-foreground/80 whitespace-pre-line">{paper.abstract}</p>
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <Button asChild variant="default">
                          <Link href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-4 w-4" />
                            Read Full Paper
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-headline font-semibold mb-4">No Research Publications Yet</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
              Our research team is actively working on groundbreaking projects. Publications will be available soon!
            </p>
            <Button asChild variant="outline">
              <Link href="/about">
                Learn About Our Research Focus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Section>

      {/* You can keep the other sections as is */}
    </PageWrapper>
  );
}
