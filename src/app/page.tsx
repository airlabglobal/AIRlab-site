
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import DynamicShowcaseCard from '@/components/ui/DynamicShowcaseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronRight, Lightbulb, Users, Zap, Newspaper, Handshake, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const showcaseItems = [
    {
      title: "Robotic Arm Precision Control",
      description: "Developing advanced algorithms for high-precision control of robotic arms in manufacturing and assembly tasks.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "robotic arm",
      linkUrl: "/projects/robotic-arm",
      tags: ["Robotics", "AI", "Control Systems"],
    },
    {
      title: "AI in Medical Diagnosis",
      description: "Utilizing machine learning models to improve the accuracy and speed of medical image analysis for early disease detection.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "medical AI",
      linkUrl: "/research/medical-ai",
      tags: ["AI", "Healthcare", "Machine Learning"],
    },
    {
      title: "Autonomous Drone Navigation",
      description: "Researching and implementing autonomous navigation systems for drones in complex environments using computer vision and SLAM.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "autonomous drone",
      linkUrl: "/projects/autonomous-drone",
      tags: ["Robotics", "AI", "Autonomous Systems"],
    },
  ];

  const newsItems = [
    { title: "Airlab to host International AI Conference in December", date: "Oct 26, 2023", link: "#" },
    { title: "Our team wins Best Paper Award at Robotics Summit", date: "Sep 15, 2023", link: "#" },
    { title: "New research grant secured for ethical AI development", date: "Aug 01, 2023", link: "#" },
  ];

  return (
    <PageWrapper className="!px-0 !py-0"> {/* Override PageWrapper padding for full-width hero */}
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-background to-muted/30 !py-16 md:!py-24 lg:!py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="block">Innovate. Create.</span>
                <span className="block text-primary">Inspire with AI.</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto md:mx-0">
                Welcome to Airlab, the AI & Robotics Laboratory at the University of Lagos. We are at the forefront of cutting-edge research and development in intelligent systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
                  <Link href="/projects">Explore Projects</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 shadow-lg transform hover:scale-105 transition-transform">
                  <Link href="/about">Learn More <ChevronRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto md:aspect-square">
              <Image 
                src="/images/pexels-agk42-2599244.jpg"  
                alt="AI and Robotics conceptual image"
                layout="fill"
                objectFit="contain"
                className="animate-float "
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Lab Highlights Section */}
      <Section title="Our Focus Areas" subtitle="Driving Innovation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-semibold mb-2">Pioneering Research</h3>
              <p className="font-body text-foreground/70">Exploring new frontiers in artificial intelligence, machine learning, and robotics.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-semibold mb-2">Impactful Projects</h3>
              <p className="font-body text-foreground/70">Developing practical solutions to real-world challenges through innovative projects.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-semibold mb-2">Collaborative Team</h3>
              <p className="font-body text-foreground/70">Fostering a dynamic environment for students and researchers to collaborate and excel.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Meet the Lab Coordinator Section */}
      <Section title="Meet Our Lab Coordinator" subtitle="Guiding Our Research Efforts">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 items-center bg-card p-8 rounded-xl shadow-xl overflow-hidden">
            <div
              className="md:col-span-2 opacity-0 animate-slide-in-from-left"
              style={{ animationDelay: '0.2s' }}
            >
              <Image
                src="/images/image12.jpg"
                alt="Dr. Chika Yinka-Banjo"
                width={400}
                height={400}
                className="rounded-full mx-auto md:mx-0 shadow-lg object-cover w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
                data-ai-hint="female academic"
              />
            </div>
            <div
              className="md:col-span-3 opacity-0 animate-slide-in-from-right"
              style={{ animationDelay: '0.5s' }}
            >
              <h3 className="font-headline text-3xl lg:text-4xl font-semibold text-primary mb-3">Dr. Chika Yinka-Banjo</h3>
              <p className="font-body text-lg text-accent font-medium mb-4">Lab Coordinator & Senior Lecturer</p>
              <p className="font-body text-foreground/80 mb-6 text-base lg:text-lg">
                Dr. Chika Yinka Banjo is an esteemed expert in Artificial Intelligence and Human-Computer Interaction. With over a decade of research experience,
                she leads Airlab's strategic initiatives, mentors young researchers, and champions ethical AI development. Her work focuses on creating intelligent systems
                that are not only technologically advanced but also beneficial and accessible to society.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link href="/team/dr-chika-yinka-banjo">Learn More About Dr. Banjo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Showcase Section */}
      <Section title="Featured Works" subtitle="Explore Our Innovations" className="bg-muted/30">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item, index) => (
              <DynamicShowcaseCard
                key={index}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                linkUrl={item.linkUrl}
                tags={item.tags}
                imageHint={item.imageHint}
                className={`opacity-0 animate-slide-up animate-float-in delay-300`}
                
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
              <Link href="/projects">
                View All Projects <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Latest News Section */}
      <Section title="Latest News & Updates" subtitle="Stay Informed">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-shadow opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.3 + (index + 1) * 0.15}s` }}
              >
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground font-body">{item.date}</p>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0 text-accent hover:text-primary">
                    <Link href={item.link}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/news-archive">
                All News & Events <Newspaper className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Get Involved Section */}
      <Section title="Get Involved" subtitle="Collaborate With Us" className="bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            Airlab is always looking for passionate individuals and organizations to collaborate with.
            Whether you are a prospective student, researcher, or industry partner, we have opportunities for you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Prospective Students", description: "Join our vibrant team of students and contribute to cutting-edge research.", link: "/admissions", icon: <Users className="h-8 w-8 mb-3 text-primary"/> },
              { title: "Research Collaboration", description: "Partner with us on innovative research projects and publications.", link: "/research#collaborate", icon: <Handshake className="h-8 w-8 mb-3 text-primary"/> },
              { title: "Industry Partnerships", description: "Leverage our expertise to solve real-world challenges and drive innovation in your industry.", link: "/partnerships", icon: <Zap className="h-8 w-8 mb-3 text-primary"/> },
            ].map((item, index) => (
              <Card
                key={item.title}
                className="p-6 shadow-lg hover:shadow-xl transition-shadow opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.4 + (index + 1) * 0.2}s` }}
              >
                {item.icon}
                <h4 className="font-headline text-xl font-semibold mb-2">{item.title}</h4>
                <p className="font-body text-sm text-foreground/70 mb-4">{item.description}</p>
                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 w-full">
                  <Link href={item.link}>Learn More</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Section>

    </PageWrapper>
  );
}
