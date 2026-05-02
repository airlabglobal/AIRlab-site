import { notFound } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import Section from '@/components/ui/Section';
import { getNewsById } from '@/lib/data-fetchers';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const newsItem = await getNewsById(resolvedParams.id);

  if (!newsItem) {
    notFound();
  }

  return (
    <PageWrapper>
      <Section className="max-w-4xl mx-auto pt-8">
        <Button asChild variant="ghost" className="mb-8 hover:bg-muted/50 transition-colors">
          <Link href="/news">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News & Events
          </Link>
        </Button>

        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-xl animate-fade-in">
          <img 
            src={newsItem.imageUrl || '/images/news-placeholder.jpg'} 
            alt={newsItem.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="flex items-center gap-4 flex-wrap">
            {newsItem.type && (
              <Badge 
                variant={newsItem.type === 'Event' ? 'secondary' : 'default'} 
                className={`text-sm py-1 px-4 shadow-sm ${newsItem.type === 'Event' ? 'bg-purple-500 hover:bg-purple-600 text-white' : ''}`}
              >
                {newsItem.type}
              </Badge>
            )}
            <div className="flex items-center gap-2 text-muted-foreground font-body font-medium">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(newsItem.date)}</span>
            </div>
          </div>

          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            {newsItem.title}
          </h1>

          {newsItem.content && (
            <div className="prose prose-lg dark:prose-invert max-w-none font-body text-foreground/80 whitespace-pre-wrap mt-8">
              {newsItem.content}
            </div>
          )}

          {newsItem.author && (
            <div className="pt-8 mt-8 border-t border-border/50">
              <p className="font-body text-foreground/90 font-medium italic">
                Written by <span className="text-primary font-semibold">{newsItem.author}</span>
              </p>
            </div>
          )}

          {newsItem.link && (
            <div className="pt-10 mt-10 border-t border-border">
              <p className="text-muted-foreground font-body mb-4">
                For more details, please visit the original source or external resource:
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
                <Link href={newsItem.link} target="_blank" rel="noopener noreferrer">
                  Visit External Link <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </Section>
    </PageWrapper>
  );
}
