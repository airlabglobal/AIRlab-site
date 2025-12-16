import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Loading spinner component
 */
export function LoadingSpinner({ 
  size = 'default',
  className 
}: { 
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-primary',
        sizeClasses[size],
        className
      )} 
    />
  );
}

/**
 * Page loading overlay
 */
export function PageLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

/**
 * Inline loading state
 */
export function InlineLoader({ 
  message = 'Loading...',
  className 
}: { 
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2 text-muted-foreground', className)}>
      <LoadingSpinner size="sm" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

/**
 * Button with loading state
 */
export function LoadingButton({
  loading = false,
  children,
  className,
  disabled,
  size,
  variant,
  ...props
}: {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={className}
      disabled={disabled || loading}
      size={size}
      variant={variant}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </Button>
  );
}

/**
 * Card loading skeleton
 */
export function CardLoadingSkeleton() {
  return (
    <div className="space-y-3 p-6 border rounded-lg">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
    </div>
  );
}

/**
 * List loading skeleton
 */
export function ListLoadingSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

/**
 * Grid loading skeleton
 */
export function GridLoadingSkeleton({ 
  items = 6,
  columns = 3 
}: { 
  items?: number;
  columns?: number;
}) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={cn('grid gap-6', gridClasses[columns as keyof typeof gridClasses] || gridClasses[3])}>
      {Array.from({ length: items }).map((_, i) => (
        <CardLoadingSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Progressive loading component
 */
export function ProgressiveLoader({
  stages,
  currentStage = 0,
  className
}: {
  stages: string[];
  currentStage?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <LoadingSpinner size="sm" />
        <span className="text-sm font-medium">
          {stages[currentStage] || 'Loading...'}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
        />
      </div>
      
      {/* Stage indicators */}
      <div className="flex justify-between text-xs text-muted-foreground">
        {stages.map((stage, index) => (
          <span 
            key={stage}
            className={cn(
              'transition-colors',
              index <= currentStage ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Error state with retry
 */
export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again',
  onRetry,
  className
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn('text-center py-8', className)}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-destructive">{title}</h3>
        <p className="text-muted-foreground">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Empty state component
 */
export function EmptyState({
  title = 'No data available',
  message = 'There is nothing to show here yet.',
  action,
  className
}: {
  title?: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}