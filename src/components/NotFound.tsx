"use client";

import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NotFoundProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function NotFound({
  title = 'Page not found',
  message = 'The page you are looking for does not exist or has been removed.',
  actionLabel = 'Go back',
  actionHref,
}: NotFoundProps) {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <FileQuestion className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{message}</p>
        <Button
          onClick={() => {
            if (actionHref) {
              router.push(actionHref);
            } else {
              router.back();
            }
          }}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
