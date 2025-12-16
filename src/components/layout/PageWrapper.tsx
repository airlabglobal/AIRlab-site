"use client";

import { cn } from '@/lib/utils';
import SectionErrorBoundary from '@/components/error/SectionErrorBoundary';
import { errorMonitor } from '@/lib/errorMonitoring';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  enableErrorBoundary?: boolean;
  sectionName?: string;
}

export default function PageWrapper({ 
  children, 
  className, 
  enableErrorBoundary = true,
  sectionName = 'Page Content'
}: PageWrapperProps) {
  const content = (
    <div
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 opacity-0 animate-slide-up",
        "animation-delay-200 animation-fill-forwards", // Custom utility classes if needed
        className
      )}
      style={{ animationDelay: '0.2s', animationFillMode: 'forwards' } as React.CSSProperties} // Inline for clarity
    >
      {children}
    </div>
  );

  if (enableErrorBoundary) {
    return (
      <SectionErrorBoundary
        sectionName={sectionName}
        onError={(error, errorInfo, sectionName) => {
          errorMonitor.logError(error, errorInfo, { 
            context: 'page-wrapper',
            sectionName 
          });
        }}
      >
        {content}
      </SectionErrorBoundary>
    );
  }

  return content;
}
