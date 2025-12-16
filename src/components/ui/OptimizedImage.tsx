"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImageIcon, AlertTriangle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  fallbackSrc?: string;
  showErrorIcon?: boolean;
}

/**
 * Optimized Image component with error handling, progressive loading, and fallbacks
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  objectFit = 'cover',
  quality = 75,
  onLoad,
  onError,
  fallbackSrc,
  showErrorIcon = true,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(width || 400, height || 300);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    const error = new Error(`Failed to load image: ${currentSrc}`);
    
    // Try fallback image first
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    // If fallback also fails or no fallback provided, show error state
    setImageError(true);
    setIsLoading(false);
    onError?.(error);
  }, [currentSrc, fallbackSrc, onError]);

  // Error state
  if (imageError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          "border border-border rounded-md",
          fill ? "absolute inset-0" : "",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          {showErrorIcon && <AlertTriangle className="h-8 w-8" />}
          <span className="text-sm">Failed to load image</span>
          {alt && <span className="text-xs opacity-70">{alt}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", fill ? "w-full h-full" : "", className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-muted animate-pulse rounded-md"
          )}
        >
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      
      <Image
        src={currentSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
        sizes={sizes || (fill ? "100vw" : undefined)}
        quality={quality}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          fill ? `object-${objectFit}` : "",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

/**
 * Generate a simple blur data URL for placeholder
 */
function generateBlurDataURL(width: number, height: number): string {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Fallback for SSR
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  }
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f1f5f9');
  gradient.addColorStop(1, '#e2e8f0');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Responsive image sizes for common breakpoints
 */
export const responsiveSizes = {
  card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  hero: "(max-width: 768px) 100vw, 50vw",
  full: "100vw",
  thumbnail: "(max-width: 768px) 25vw, 15vw"
};

/**
 * Common image dimensions for consistent sizing
 */
export const imageDimensions = {
  card: { width: 600, height: 400 },
  hero: { width: 800, height: 600 },
  thumbnail: { width: 200, height: 200 },
  avatar: { width: 400, height: 400 }
};