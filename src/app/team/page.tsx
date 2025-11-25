import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Linkedin, Mail, Briefcase } from 'lucide-react';
import Link from 'next/link';
import teamData from '@/data/team.json';

export default function TeamPage() {
  const teamMembers = teamData;

  return (
    <PageWrapper>
      <Section title="Our Team" subtitle="Meet the Minds Behind AIRLab">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          AIRLab is powered by a dedicated team of researchers, faculty, and students passionate about
          advancing Artificial Intelligence and Robotics to solve real-world challenges.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col">
              <CardHeader className="p-0 items-center">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mt-6 border-4 border-primary/20 group-hover:border-primary transition-all">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={member.imageHint}
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
      </Section>
    </PageWrapper>
  );
}
