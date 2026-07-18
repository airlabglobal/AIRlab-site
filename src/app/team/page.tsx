import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, User } from "lucide-react";
import Link from "next/link";
import { getTeamByCategory } from "@/lib/data-fetchers";
import { FaLinkedin } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function TeamPage() {
  const leadingTeam = await getTeamByCategory('leading');
  const pioneerVolunteers = await getTeamByCategory('pioneer');
  const volunteers = await getTeamByCategory('volunteers');

  const renderMemberCard = (member: any) => (
    <Card
      key={member.id}
      className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col items-center"
    >
      <CardHeader className="p-0 items-center">
        <Avatar className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mt-6 border-4 border-primary/20 group-hover:border-primary transition-all">
          <AvatarImage
            src={member.imageUrl}
            alt={member.name}
            className="object-cover w-full h-full"
            data-ai-hint={member.imageHint}
          />
          <AvatarFallback className="bg-muted text-primary flex flex-col items-center justify-center font-headline text-2xl w-full h-full">
            <User className="w-12 h-12 mb-2 opacity-60" />
            {member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-1 group-hover:text-primary transition-colors">
          {member.name}
        </CardTitle>
        <p className="text-sm text-accent font-semibold mb-2 flex items-center justify-center">
          <Briefcase className="w-4 h-4 mr-2" /> {member.role}
        </p>
        <CardDescription className="font-body text-xs text-foreground/75 line-clamp-3">
          {member.bio}
        </CardDescription>
      </CardContent>
      <CardFooter className="w-full items-center p-4 bg-muted/30 flex justify-center space-x-3">
        {member.social.linkedin && (
          <Link
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn Profile`}
          >
            <FaLinkedin className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <PageWrapper>
      <Section title="Our Team" subtitle="Meet the Minds Behind AIRLAB">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          AIRLAB is powered by a dedicated team of researchers, faculty, and
          students passionate about advancing Artificial Intelligence and
          Robotics to solve real-world challenges.
        </p>
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">Leading Team</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
          {leadingTeam.map(renderMemberCard)}
        </div>
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">Pioneer Volunteers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
          {pioneerVolunteers.map(renderMemberCard)}
        </div>
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">Volunteers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {volunteers.map(renderMemberCard)}
        </div>
      </Section>
    </PageWrapper>
  );
}
