import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import DynamicShowcaseCard from "@/components/ui/DynamicShowcaseCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ChevronRight,
  Lightbulb,
  Users,
  Zap,
  Newspaper,
  Handshake,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import projectsData from "@/data/projects.json";
import newsItems from "@/data/news.json";

export default function Home() {
  const showcaseItems = projectsData.slice(0, 3);

  return (
    <PageWrapper className="!px-0 !py-0">
      {" "}
      {/* Override PageWrapper padding for full-width hero */}
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-background to-muted/30 !py-16 md:!py-24 lg:!py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="block">Pioneering the Future</span>
                <span className="block text-primary">
                  of Intelligent Systems
                </span>
              </h1>
              <p className="font-body text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto md:mx-0">
                Welcome to AIRLAB, the Artificial Intelligence & Robotics
                Laboratory at the University of Lagos. We're advancing the
                frontiers of AI, machine learning, and robotics to solve
                Africa's most pressing challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform"
                >
                  <Link href="/projects">Explore Projects</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 shadow-lg transform hover:scale-105 transition-transform"
                >
                  <Link href="/about">
                    Learn More <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto md:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop"
                alt="AI and Robotics research at AIRLAB"
                layout="fill"
                objectFit="contain"
                className="animate-float rounded-lg"
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
              <h3 className="font-headline text-2xl font-semibold mb-2">
                Pioneering Research
              </h3>
              <p className="font-body text-foreground/70">
                Pushing boundaries in AI, machine learning, and robotics to
                create innovative solutions for real-world challenges.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-semibold mb-2">
                Impactful Projects
              </h3>
              <p className="font-body text-foreground/70">
                Building transformative technologies that address healthcare,
                agriculture, education, and urban development needs.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-semibold mb-2">
                Collaborative Team
              </h3>
              <p className="font-body text-foreground/70">
                Nurturing the next generation of AI and robotics experts through
                mentorship, collaboration, and hands-on research.
              </p>
            </div>
          </div>
        </div>
      </Section>
      {/* Meet the Lab Coordinator Section */}
      <Section
        title="Meet Our Lab Coordinator"
        subtitle="Guiding Our Research Efforts"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 items-center bg-card p-8 rounded-xl shadow-xl overflow-hidden">
            <div
              className="md:col-span-2 opacity-0 animate-slide-in-from-left"
              style={{ animationDelay: "0.2s" }}
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
              style={{ animationDelay: "0.5s" }}
            >
              <h3 className="font-headline text-3xl lg:text-4xl font-semibold text-primary mb-3">
                Dr. Chika Yinka-Banjo
              </h3>
              <p className="font-body text-lg text-accent font-medium mb-4">
                Lab Coordinator & Senior Lecturer
              </p>
              <p className="font-body text-foreground/80 mb-6 text-base lg:text-lg">
                Dr. Chika Yinka-Banjo is a distinguished expert in Artificial
                Intelligence and Human-Computer Interaction with over a decade
                of research excellence. She leads AIRLAB's strategic vision,
                mentors emerging researchers, and champions ethical AI
                development. Her work focuses on creating intelligent systems
                that are technologically advanced, socially beneficial, and
                accessible to underserved communities across Africa.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/team/dr-chika-yinka-banjo">
                  Learn More About Dr. Banjo{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
      {/* Showcase Section */}
      <Section
        title="Featured Works"
        subtitle="Explore Our Innovations"
        className="bg-muted/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item, index) => (
              <DynamicShowcaseCard
                key={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                linkUrl={item.link}
                tags={item.tags}
                imageHint={item.imageHint}
                className={`opacity-0 animate-slide-up animate-float-in delay-300`}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10"
            >
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
                  <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-body">
                    {item.date}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="link"
                    className="p-0 text-accent hover:text-primary"
                  >
                    <Link href={item.link}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/news-archive">
                All News & Events <Newspaper className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
      {/* Get Involved Section */}
      <Section
        title="Get Involved"
        subtitle="Collaborate With Us"
        className="bg-muted/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            AIRLAB welcomes passionate individuals and organizations to join our
            mission of advancing AI and robotics. Whether you're a prospective
            student, researcher, or industry partner, we offer exciting
            opportunities to collaborate and innovate.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Prospective Students",
                description:
                  "Join our dynamic community of researchers and contribute to groundbreaking AI and robotics projects.",
                link: "/contact",
                icon: <Users className="h-8 w-8 mb-3 text-primary" />,
              },
              {
                title: "Research Collaboration",
                description:
                  "Partner with us on innovative research initiatives, publications, and grant applications.",
                link: "/research",
                icon: <Handshake className="h-8 w-8 mb-3 text-primary" />,
              },
              {
                title: "Industry Partnerships",
                description:
                  "Leverage our expertise to develop AI solutions that drive innovation and solve complex business challenges.",
                link: "/contact",
                icon: <Zap className="h-8 w-8 mb-3 text-primary" />,
              },
            ].map((item, index) => (
              <Card
                key={item.title}
                className="p-6 shadow-lg hover:shadow-xl transition-shadow opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.4 + (index + 1) * 0.2}s` }}
              >
                <div className="flex justify-center items-center">
                  {item.icon}
                </div>
                <h4 className="font-headline text-xl font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="font-body text-sm text-foreground/70 mb-4">
                  {item.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 w-full"
                >
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
