import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import DynamicShowcaseCard from "@/components/ui/DynamicShowcaseCard";
import DirectorSection from "@/components/DirectorSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ChevronRight,
  Lightbulb,
  Users,
  Zap,
  Newspaper,
  Handshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { getProjects, getNews } from "@/lib/data-fetchers";
import { formatDate } from "@/lib/utils";

export default async function Home() {
  const [projects, news] = await Promise.all([
    getProjects(),
    getNews(),
  ]);
  const showcaseItems = projects.slice(0, 3);
  const latestNews = news.slice(0, 3);
  const hasProjects = projects.length > 0;
  const hasNews = latestNews.length > 0;

  return (
    <PageWrapper className="!px-0 !py-0">
      {" "}
      {/* Override PageWrapper padding for full-width hero */}
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-background to-muted/30 !py-6 md:!py-8 lg:!py-10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left opacity-0 animate-slide-in-from-left" style={{ animationFillMode: 'both' }}>
              <h1 className="text-balance font-headline text-4xl md:text-5xl font-bold mb-5 max-w-xl mx-auto md:mx-0">
                Pioneering the Future of{' '}
                <span className="text-primary">Intelligent Systems</span>
              </h1>
              <p className="text-pretty font-body text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto md:mx-0">
                AIRLAB is the AI &amp; Robotics Laboratory at the University of
                Lagos, building intelligent systems to solve Africa&apos;s
                most pressing challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <Link href="/projects">Explore Projects</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <Link href="/about">
                    Learn More <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto md:aspect-square opacity-0 animate-slide-in-from-right" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <Image
                src="/images/pexels-agk42-2599244.jpg"
                alt="AI and Robotics research at AIRLAB"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain rounded-lg motion-safe:animate-float motion-reduce:animate-none"
                priority
              />
            </div>
          </div>
        </div>
      </Section>
      {/* Robot Video Showcase Section */}
      <Section
        title={<>Robot Playing <span className="text-primary">Soccer</span></>}
        subtitle="Robot Showcase"
        className="bg-gradient-to-b from-transparent via-muted/30 to-transparent relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[340px] sm:max-w-[360px] md:max-w-[380px] mx-auto rounded-lg overflow-hidden shadow-xl border border-border bg-black relative opacity-0 animate-slide-up hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <video
              src="/robot.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-auto max-h-[680px] object-contain mx-auto block"
            />
          </div>
        </div>
      </Section>
      {/* Lab Highlights Section */}
      <Section title="Our Focus Areas" subtitle="Driving Innovation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-headline text-2xl font-semibold mb-2">
                Pioneering Research
              </h3>
              <p className="font-body text-foreground/70">
                Pushing boundaries in AI, machine learning, and robotics to
                create innovative solutions for real-world challenges.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <Zap className="h-12 w-12 text-primary mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-headline text-2xl font-semibold mb-2">
                Impactful Projects
              </h3>
              <p className="font-body text-foreground/70">
                Building transformative technologies that address healthcare,
                agriculture, education, and urban development needs.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <Users className="h-12 w-12 text-primary mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
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
      <DirectorSection />
      {/* Showcase Section */}
      <Section
        title="Featured Works"
        subtitle="Explore Our Innovations"
        className="bg-muted/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {hasProjects ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {showcaseItems.map((item, index) => (
                  <DynamicShowcaseCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    linkUrl={item.link || '#'}
                    tags={item.tags}
                    imageHint={item.imageHint}
                    priority={index === 0}
                    className="motion-safe:animate-slide-up motion-reduce:animate-none"
                    status={item.status}
                    abstract={item.abstract}
                    paperUrl={item.paperUrl}
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-6">
                No projects available yet. Check back soon for our latest innovations!
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/about">
                  Learn More About AIRLAB <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </Section>
      {/* Latest News Section */}
      <Section title="Latest News & Updates" subtitle="Stay Informed">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {hasNews ? (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {latestNews.map((item, index) => (
                  <Card
                    key={index}
                    className="shadow-lg hover:shadow-xl transition-all opacity-0 animate-slide-up overflow-hidden flex flex-col group relative"
                    style={{ animationDelay: `${0.3 + (index + 1) * 0.15}s` }}
                  >
                    {item.type && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge
                          variant={item.type === 'Event' ? 'event' : 'default'}
                          className="shadow-md"
                        >
                          {item.type}
                        </Badge>
                      </div>
                    )}
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <img
                        src={item.imageUrl || '/images/news-placeholder.jpg'}
                        alt={item.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {item.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-body">
                        {formatDate(item.date)}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      {item.content && (
                        <p className="text-muted-foreground font-body text-sm line-clamp-3 mb-4">
                          {item.content}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                        {item.author ? (
                          <span
                            className="text-xs text-muted-foreground font-medium italic truncate max-w-[60%] mr-2"
                            title={`By ${item.author}`}
                          >
                            By {item.author}
                          </span>
                        ) : <span />}
                        <Button
                          asChild
                          variant="link"
                          className="p-0 text-accent hover:text-primary font-semibold group/btn"
                        >
                          <Link href={`/news/${item.id}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
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
                  <Link href="/news">
                    All News & Events <Newspaper className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                No news updates yet. Stay tuned for exciting announcements!
              </p>
            </div>
          )}
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
            AIRLAB welcomes every stage of the journey into AI and robotics —
            from school children and young adults discovering STEM for the
            first time, to undergraduate and graduate researchers, and the
            organizations who partner with us. There's a place here for you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Community Outreach",
                description:
                  "School visits, robotics demos, and hands-on workshops that introduce children and young adults to AI and robotics.",
                link: "/contact",
                icon: <Sparkles className="h-8 w-8 mb-3 text-primary" />,
              },
              {
                title: "Prospective Students",
                description:
                  "Undergraduate and graduate students can join our research community and contribute to real AI and robotics projects.",
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
