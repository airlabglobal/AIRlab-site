"use client";

import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 opacity-0 animate-slide-up",
        className
      )}
      style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}
