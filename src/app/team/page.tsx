import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Linkedin, Mail, Briefcase } from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    id: "1",
    name: "Dr. Chika Yinka-Banjo",
    role: "Director & Principal Investigator",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "female professor",
    bio: "Dr. Nwosu leads AIROL with expertise in machine learning and robotics. Her research focuses on human-robot interaction and AI ethics.",
    social: { linkedin: "#", email: "mailto:adaeze.nwosu@airol.unilag" },
  },
  {
    id: "2",
    name: "Mrs Omokhaba Blessing Yama",
    role: "Senior Researcher",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male professor",
    bio: "Prof. Okeke specializes in computer vision and autonomous systems. He has published extensively in top-tier conferences.",
    social: { linkedin: "#", email: "mailto:chinedu.okeke@airol.unilag" },
  },
  {
    id: "3",
    name: "Ayodeji Atunrase",
    role: "PhD Candidate",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "female student",
    bio: "Bolanle's research is on natural language processing for low-resource languages, developing models for local Nigerian languages.",
    social: { linkedin: "#", email: "mailto:bolanle.adebayo@airol.unilag" },
  },
  {
    id: "4",
    name: "Oluwatobi Anuoluwapo",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "5",
    name: "Oluwatobi Anuoluwapo",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "6",
    name: "Adekunle Abdulazeez",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "7",
    name: "Lawal Giyath",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "8",
    name: "Lukman Abdulsalam",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "9",
    name: "Ifedayo Olowonyo",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "10",
    name: "Aaliyah Omar Jabita",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "11",
    name: "David ",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "12",
    name: "Oluokun Fiyinfoluwa",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "13",
    name: "Tomilola Jaiyeoba",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
  {
    id: "14",
    name: "Jude Tochy",
    role: "Masters Student",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "male student",
    bio: "Musa is working on reinforcement learning algorithms for robotic navigation in unstructured environments.",
    social: { linkedin: "#", email: "mailto:musa.ibrahim@airol.unilag" },
  },
];

export default function TeamPage() {
  return (
    <PageWrapper>
      <Section title="Our Team" subtitle="Meet the Minds Behind AIROL">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          AIROL is powered by a dedicated team of researchers, faculty, and students passionate about
          advancing the fields of Artificial Intelligence and Robotics.
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
