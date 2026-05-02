import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Newspaper, ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import type { NewsItem } from '@/types';
import { getNews } from '@/lib/data-fetchers';
import { formatDate } from '@/lib/utils';

export default async function NewsPage() {
  const newsItems = await getNews();
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
                className="shadow-lg hover:shadow-xl transition-all opacity-0 animate-slide-up overflow-hidden flex flex-col group relative"
                style={{ animationDelay: `${0.1 + (index + 1) * 0.15}s` }}
              >
                {item.type && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge 
                      variant={item.type === 'Event' ? 'secondary' : 'default'} 
                      className={`shadow-md ${item.type === 'Event' ? 'bg-purple-500 hover:bg-purple-600 text-white' : ''}`}
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
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
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
