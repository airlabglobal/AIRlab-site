import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage, responsiveSizes, imageDimensions } from '@/components/ui/OptimizedImage';
import { cn } from '@/lib/utils';

interface DynamicShowcaseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  tags?: string[];
  imageHint?: string;
  className?: string;
}

export default function DynamicShowcaseCard({
  title,
  description,
  imageUrl,
  linkUrl,
  tags,
  imageHint,
  className,
}: DynamicShowcaseCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group animate-float",
      className
      )}>
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            fill
            sizes={responsiveSizes.card}
            className="group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
            objectFit="cover"
            quality={80}
            priority={false}
            fallbackSrc="https://placehold.co/600x400/e2e8f0/64748b?text=Project+Image"
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
