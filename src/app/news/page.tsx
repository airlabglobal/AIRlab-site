'use client';
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Newspaper, ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import newsData from '@/data/news.json';

export default function NewsPage() {
  const newsItems = newsData;
  const hasNews = newsItems.length > 0;

  return (
    <PageWrapper>
      <Section title="News & Events" subtitle="Stay Updated with AIRLAB">
        <p className="font-body text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
          Keep up with the latest news, events, achievements, and announcements from AIRLAB. 
          Discover our recent breakthroughs, collaborations, and community engagements.
        </p>
        {hasNews ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-shadow group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <Newspaper className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="link"
                    className="p-0 text-accent hover:text-primary"
                  >
                    <Link href={item.link} target="_blank" rel="noopener noreferrer">
                      Read More <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Newspaper className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-headline font-semibold mb-4">No News Yet</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
              Stay tuned for exciting announcements and updates from AIRLAB!
            </p>
            <Button asChild variant="outline">
              <Link href="/about">
                Learn More About AIRLAB <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Section>
    </PageWrapper>
  );
}
