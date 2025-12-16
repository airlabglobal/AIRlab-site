/**
 * Performance optimization utilities
 */

// Cache for storing computed values
const performanceCache = new Map<string, { value: any; timestamp: number; ttl: number }>();

/**
 * Memoize expensive computations with TTL
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cached = performanceCache.get(key);
    
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.value;
    }
    
    const result = fn(...args);
    performanceCache.set(key, {
      value: result,
      timestamp: Date.now(),
      ttl
    });
    
    return result;
  }) as T;
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy load components with intersection observer
 */
export function createLazyLoader(
  threshold: number = 0.1,
  rootMargin: string = '50px'
) {
  if (typeof window === 'undefined') {
    return { observe: () => {}, unobserve: () => {} };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const onVisible = element.dataset.onVisible;
          if (onVisible) {
            // Trigger lazy loading
            element.dispatchEvent(new CustomEvent('visible'));
          }
        }
      });
    },
    { threshold, rootMargin }
  );

  return {
    observe: (element: Element) => observer.observe(element),
    unobserve: (element: Element) => observer.unobserve(element)
  };
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, type?: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
}

/**
 * Optimize animations for performance
 */
export function optimizeAnimation(element: HTMLElement) {
  // Use transform and opacity for better performance
  element.style.willChange = 'transform, opacity';
  
  // Clean up after animation
  const cleanup = () => {
    element.style.willChange = 'auto';
    element.removeEventListener('animationend', cleanup);
    element.removeEventListener('transitionend', cleanup);
  };
  
  element.addEventListener('animationend', cleanup);
  element.addEventListener('transitionend', cleanup);
}

/**
 * Measure and log performance metrics
 */
export class PerformanceTracker {
  private marks = new Map<string, number>();
  
  mark(name: string) {
    this.marks.set(name, performance.now());
  }
  
  measure(name: string, startMark: string, endMark?: string): number {
    const start = this.marks.get(startMark);
    const end = endMark ? this.marks.get(endMark) : performance.now();
    
    if (start === undefined) {
      console.warn(`Start mark "${startMark}" not found`);
      return 0;
    }
    
    const duration = (end || performance.now()) - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }
  
  clear() {
    this.marks.clear();
  }
}

/**
 * Bundle size optimization helpers
 */
export const dynamicImport = {
  /**
   * Lazy load a component with loading state
   */
  component: <T>(importFn: () => Promise<{ default: T }>) => {
    return React.lazy(importFn);
  },
  
  /**
   * Preload a module without executing it
   */
  preload: (importFn: () => Promise<any>) => {
    // Webpack magic comment for preloading
    importFn();
  }
};

/**
 * Memory management utilities
 */
export const memoryManager = {
  /**
   * Clean up event listeners and observers
   */
  cleanup: (cleanupFns: (() => void)[]) => {
    return () => {
      cleanupFns.forEach(fn => {
        try {
          fn();
        } catch (error) {
          console.warn('Cleanup function failed:', error);
        }
      });
    };
  },
  
  /**
   * Create a weak reference for large objects
   */
  weakRef: <T extends object>(obj: T): WeakRef<T> => {
    return new WeakRef(obj);
  }
};

// Global performance tracker instance
export const performanceTracker = new PerformanceTracker();

// React import for lazy loading
import React from 'react';