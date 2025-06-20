'use client';
import { useEffect, useState } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import axios from 'axios';

export default function ResearchPage() {
  const [researchPapers, setResearchPapers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch research papers from the API
    const fetchResearch = async () => {
      try {
        const response = await axios.get('/api/research');
        setResearchPapers(response.data); // Assuming the response contains an array of research papers
      } catch (error) {
        console.error('Error fetching research papers:', error);
      }
    };

    fetchResearch();
  }, []);

  return (
    <PageWrapper>
      <Section title="Research at AIROL" subtitle="Exploring the Frontiers of AI & Robotics">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Our research spans a wide range of topics within Artificial Intelligence and Robotics,
          aiming to push the boundaries of knowledge and create impactful technologies.
          Below are some of our key research areas.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {researchPapers.map((paper) => (
            <Card key={paper._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={paper.imageUrl || "https://placehold.co/600x400.png"}
                  alt={paper.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-primary-foreground">
                  {/* You can add an icon for each research paper */}
                  <CardTitle className="font-headline text-2xl text-white drop-shadow-md">{paper.title}</CardTitle>
                </div>
              </div>
              <CardContent className="p-6">
                <CardDescription className="font-body text-foreground/75">{paper.description}</CardDescription>
              </CardContent>
              <div className="p-4 bg-muted/30">
                <a href={paper.fileUrl} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Read Full Paper
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* You can keep the other sections as is */}
    </PageWrapper>
  );
}
