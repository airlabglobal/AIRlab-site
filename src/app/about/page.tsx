"use client";

import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage, responsiveSizes } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Lightbulb, 
  Globe, 
  Award,
  ArrowRight,
  BookOpen,
  Zap
} from 'lucide-react';
import SectionErrorBoundary from '@/components/error/SectionErrorBoundary';
import { errorMonitor } from '@/lib/errorMonitoring';

export default function AboutPage() {
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "We push the boundaries of what's possible in AI and robotics, constantly exploring new frontiers."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Impact",
      description: "Our research is driven by the desire to create meaningful solutions for real-world challenges."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and interdisciplinary collaboration to achieve breakthrough results."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Perspective",
      description: "While rooted in Africa, our vision extends globally, contributing to the worldwide AI community."
    }
  ];

  const achievements = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Research Excellence",
      description: "Over 50 peer-reviewed publications in top-tier conferences and journals"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Student Success",
      description: "Graduated 25+ Masters and PhD students who are now leaders in industry and academia"
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Innovation Impact",
      description: "Developed 10+ AI solutions deployed in healthcare, agriculture, and smart cities"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Knowledge Sharing",
      description: "Organized 15+ workshops and conferences to advance AI education in Africa"
    }
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">AIRLAB</span>
          </h1>
          <p className="font-body text-xl text-foreground/80 mb-8 leading-relaxed">
            The Artificial Intelligence & Robotics Laboratory at the University of Lagos is a premier 
            research center dedicated to advancing the frontiers of AI and robotics while addressing 
            Africa's unique challenges and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/team">Meet Our Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/research">Our Research</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="font-headline text-3xl font-semibold">Our Mission</h2>
              </div>
              <p className="font-body text-lg text-foreground/80 leading-relaxed">
                To conduct world-class research in Artificial Intelligence and Robotics that addresses 
                real-world challenges, particularly those relevant to Africa and developing regions. 
                We strive to train the next generation of AI researchers and practitioners while fostering 
                innovation that benefits society.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="font-headline text-3xl font-semibold">Our Vision</h2>
              </div>
              <p className="font-body text-lg text-foreground/80 leading-relaxed">
                To be a leading center of excellence in AI and robotics research in Africa, recognized 
                globally for our innovative solutions, ethical approach to AI development, and commitment 
                to using technology for social good and sustainable development.
              </p>
            </div>
          </div>

          <div className="relative">
            <SectionErrorBoundary 
              sectionName="About Image"
              onError={(error, errorInfo) => {
                errorMonitor.logError(error, errorInfo, { 
                  context: 'about-page',
                  section: 'hero-image'
                });
              }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop"
                  alt="AIRLAB Research Laboratory"
                  fill
                  sizes={responsiveSizes.hero}
                  className="object-cover"
                  quality={85}
                  priority={true}
                  fallbackSrc="https://placehold.co/600x600/e2e8f0/64748b?text=AIRLAB+Lab"
                />
              </div>
            </SectionErrorBoundary>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section title="Our Values" subtitle="What Drives Us">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={value.title} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="font-headline text-xl font-semibold">{value.title}</h3>
                <p className="font-body text-sm text-foreground/75">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* History & Achievements */}
      <Section title="Our Journey" subtitle="Milestones & Achievements" className="bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-headline text-2xl font-semibold mb-6">Our Story</h3>
            <div className="space-y-6 font-body text-foreground/80">
              <p>
                AIRLAB was established in 2018 as part of the University of Lagos's commitment to 
                advancing cutting-edge research in emerging technologies. Under the leadership of 
                Dr. Chika Yinka-Banjo, the laboratory has grown from a small research group to a 
                thriving center of excellence.
              </p>
              <p>
                Our journey began with a focus on human-computer interaction and has expanded to 
                encompass diverse areas including machine learning, robotics, natural language 
                processing, and computer vision. We have consistently maintained our commitment to 
                addressing local challenges while contributing to global knowledge.
              </p>
              <p>
                Today, AIRLAB is recognized as one of Africa's leading AI research centers, with 
                collaborations spanning across continents and impact reaching communities throughout 
                Nigeria and beyond.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-2xl font-semibold mb-6">Key Achievements</h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={achievement.title} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-sm text-foreground/75">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Research Areas */}
      <Section title="Research Focus Areas" subtitle="Where We Make Impact">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Machine Learning & AI",
              description: "Developing advanced algorithms for pattern recognition, predictive analytics, and intelligent decision-making systems.",
              areas: ["Deep Learning", "Reinforcement Learning", "Computer Vision", "Natural Language Processing"]
            },
            {
              title: "Robotics & Automation",
              description: "Creating intelligent robotic systems for healthcare, agriculture, and industrial applications.",
              areas: ["Autonomous Navigation", "Human-Robot Interaction", "Medical Robotics", "Agricultural Automation"]
            },
            {
              title: "Ethical AI & Society",
              description: "Ensuring AI development is responsible, fair, and beneficial for all members of society.",
              areas: ["Bias Detection", "Explainable AI", "Privacy Protection", "AI Governance"]
            }
          ].map((area, index) => (
            <Card key={area.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/75">{area.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.areas.map((subArea) => (
                      <span 
                        key={subArea}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {subArea}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="text-center bg-primary/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-semibold mb-6">Join Our Mission</h2>
          <p className="font-body text-lg text-foreground/80 mb-8">
            Whether you're a student, researcher, or industry partner, there are many ways to 
            get involved with AIRLAB and contribute to the future of AI in Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Get Involved <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                Explore Projects
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}