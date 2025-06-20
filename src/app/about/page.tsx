import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Users, Target, Telescope, CheckCircle } from 'lucide-react';
import React from 'react';


export default function AboutPage() {
  return (
    <PageWrapper>
      <Section title="About Airlab" subtitle="Pioneering the Future of Intelligence">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h3 className="font-headline text-3xl font-semibold text-primary mb-4">Our Mission</h3>
            <p className="font-body text-lg text-foreground/80 mb-6">
              To be a center of excellence in Artificial Intelligence and Robotics research, fostering innovation,
              nurturing talent, and developing cutting-edge solutions that address local and global challenges.
              We aim to advance the frontiers of knowledge and contribute significantly to technological advancements.
            </p>
            <h3 className="font-headline text-3xl font-semibold text-primary mb-4">Our Vision</h3>
            <p className="font-body text-lg text-foreground/80">
              To transform society through groundbreaking AI and Robotics research, education, and a commitment to ethical innovation,
              making a tangible impact on industries, communities, and everyday life. We envision a future where intelligent systems
              work harmoniously with humans to solve complex problems.
            </p>
          </div>
          <div className="md:col-span-2">
            <Card className="overflow-hidden shadow-xl">
              <Image 
                src="/images/image69.jpg" 
                alt="Airlab Team" 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover"
                data-ai-hint="research lab" 
              />
            </Card>
          </div>
        </div>
      </Section>

      <Section title="Our Values" subtitle="Guiding Principles" className="bg-muted/30">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Lightbulb className="h-10 w-10 text-accent mb-3" />, title: "Innovation", description: "Continuously exploring new ideas and pushing technological boundaries." },
            { icon: <Users className="h-10 w-10 text-accent mb-3" />, title: "Collaboration", description: "Fostering teamwork and partnerships to achieve shared goals." },
            { icon: <CheckCircle className="h-10 w-10 text-accent mb-3" />, title: "Excellence", description: "Striving for the highest standards in research and education." },
            { icon: <Target className="h-10 w-10 text-accent mb-3" />, title: "Impact", description: "Creating solutions that make a meaningful difference in the world." },
          ].map(value => (
            <Card key={value.title} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
              {value.icon}
              <h4 className="font-headline text-xl font-semibold mb-2">{value.title}</h4>
              <p className="font-body text-sm text-foreground/70">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Our History" subtitle="Journey of Airlab">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {[
            { year: "2018", event: "Foundation of Airlab", description: "The Artificial Intelligence and Robotics Laboratory was established at the University of Lagos with a vision to foster AI research." },
            { year: "2020", event: "First Fll Participation", description: "The first team of high school students trained in the lab for coding in 2019 were later trained on robotics to represent AIRol UNILAG at the 2020 FLL competition in Abuja." },
            { year: "2022", event: "Launch of Robotics summer school Program", description: "Introduced a dedicated robotics program, attracting top talent and initiating several key projects in autonomous systems." },
            { year: "Present", event: "Expanding Horizons", description: "Continuously growing our team, research areas, and collaborations to tackle new challenges in AI and Robotics." },
          ].map((item, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-card shadow-md md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Telescope className="w-5 h-5 text-primary" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h4 className="font-headline text-lg font-semibold text-primary">{item.event}</h4>
                  <time className="font-body text-xs text-accent">{item.year}</time>
                </div>
                <p className="font-body text-sm text-foreground/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageWrapper>
  );
}

// Dummy Lightbulb icon if not already imported. 
// Assuming lucide-react is used for all icons.
const Lightbulb = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
  </svg>
);
