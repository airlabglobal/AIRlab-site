import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DynamicShowcaseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  tags?: string[];
  imageHint?: string;
  className?: string;
  priority?: boolean;
}

export default function DynamicShowcaseCard({
  title,
  description,
  imageUrl,
  linkUrl,
  tags,
  imageHint,
  className,
  priority = false,
}: DynamicShowcaseCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group",
      "motion-safe:animate-float motion-reduce:animate-none",
      className
      )}>
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            data-ai-hint={imageHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline text-2xl mb-2 text-primary group-hover:text-accent transition-colors">
          {title}
        </CardTitle>
        <p className="text-foreground/80 text-sm mb-4 line-clamp-3 font-body">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-accent/20 text-accent">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="link" className="p-0 text-accent hover:text-primary group-hover:translate-x-1 transition-transform">
          <Link href={linkUrl}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
