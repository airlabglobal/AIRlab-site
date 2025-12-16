"use client";

import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage, responsiveSizes } from '@/components/ui/OptimizedImage';
import { DataStatus, GridLoadingSkeleton } from '@/components/ui/DataStatus';
import { Linkedin, Mail, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useTeam } from '@/hooks/useDataLoader';
import SectionErrorBoundary from '@/components/error/SectionErrorBoundary';
import { errorMonitor } from '@/lib/errorMonitoring';

export default function TeamPage() {
  const { 
    data: teamMembers, 
    loading, 
    error,
    isValid,
    isFallback,
    retry
  } = useTeam();

  return (
    <PageWrapper>
      <Section title="Our Team" subtitle="Meet the Minds Behind AIRLAB">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          AIRLAB is powered by a dedicated team of researchers, faculty, and students passionate about
          advancing Artificial Intelligence and Robotics to solve real-world challenges.
        </p>
        <SectionErrorBoundary 
          sectionName="Team Members"
          onError={(error, errorInfo) => {
            errorMonitor.logError(error, errorInfo, { 
              context: 'team-page',
              section: 'team-members'
            });
          }}
        >
          <DataStatus
            loading={loading}
            error={error}
            isValid={isValid}
            isFallback={isFallback}
            onRetry={retry}
            loadingComponent={<GridLoadingSkeleton items={8} columns={4} />}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers?.map((member) => (
                <Card key={member.id} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                  <CardHeader className="p-0 items-center">
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mt-6 border-4 border-primary/20 group-hover:border-primary transition-all">
                      <OptimizedImage
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes={responsiveSizes.thumbnail}
                        className="rounded-full"
                        objectFit="cover"
                        quality={85}
                        fallbackSrc="https://placehold.co/400x400/e2e8f0/64748b?text=Team+Member"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="font-headline text-xl mb-1 group-hover:text-primary transition-colors">{member.name}</CardTitle>
                    <p className="text-sm text-accent font-semibold mb-2 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 mr-2" /> {member.role}
                    </p>
                    <CardDescription className="font-body text-xs text-foreground/75 line-clamp-3">{member.bio}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 bg-muted/30 flex justify-center space-x-3">
                    {member.social.linkedin && (
                      <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn Profile`}>
                        <Linkedin className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
                      </Link>
                    )}
                    {member.social.email && (
                      <Link href={member.social.email} aria-label={`Email ${member.name}`}>
                        <Mail className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
                      </Link>
                    )}
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
