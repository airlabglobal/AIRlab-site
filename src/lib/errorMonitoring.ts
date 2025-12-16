import { ErrorInfo } from 'react';

export interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  buildVersion?: string;
}

export interface PerformanceMetrics {
  pageLoadTime?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

export class ErrorMonitor {
  private static instance: ErrorMonitor;
  private errorQueue: ErrorDetails[] = [];
  private performanceMetrics: PerformanceMetrics = {};

  private constructor() {
    // Initialize performance monitoring
    this.initPerformanceMonitoring();
  }

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  /**
   * Log an error with detailed context
   */
  logError(error: Error, errorInfo?: ErrorInfo, context?: Record<string, any>): void {
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      timestamp: Date.now(),
      ...context,
    };

    // Add to queue for batch processing
    this.errorQueue.push(errorDetails);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Logged');
      console.error('Error:', error);
      console.log('Context:', context);
      console.log('Error Info:', errorInfo);
      console.groupEnd();
    }

    // In production, you would send to your monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorDetails);
    }
  }

  /**
   * Log performance metrics
   */
  logPerformanceMetric(metric: keyof PerformanceMetrics, value: number): void {
    this.performanceMetrics[metric] = value;

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance Metric - ${metric}:`, value);
    }

    // Check if metric exceeds thresholds
    this.checkPerformanceThresholds(metric, value);
  }

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics };
  }

  /**
   * Clear error queue (useful for testing)
   */
  clearErrorQueue(): void {
    this.errorQueue = [];
  }

  /**
   * Get queued errors (useful for testing)
   */
  getQueuedErrors(): ErrorDetails[] {
    return [...this.errorQueue];
  }

  private initPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.logPerformanceMetric('pageLoadTime', loadTime);
    });

    // Monitor Web Vitals if available
    if ('PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcp) {
            this.logPerformanceMetric('firstContentfulPaint', fcp.startTime);
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            this.logPerformanceMetric('largestContentfulPaint', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.logPerformanceMetric('cumulativeLayoutShift', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstInput = entries[0];
          if (firstInput) {
            const fid = firstInput.processingStart - firstInput.startTime;
            this.logPerformanceMetric('firstInputDelay', fid);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }
  }

  private checkPerformanceThresholds(metric: keyof PerformanceMetrics, value: number): void {
    const thresholds = {
      pageLoadTime: 2000, // 2 seconds
      firstContentfulPaint: 1800, // 1.8 seconds
      largestContentfulPaint: 2500, // 2.5 seconds
      cumulativeLayoutShift: 0.1, // 0.1 CLS score
      firstInputDelay: 100, // 100ms
    };

    const threshold = thresholds[metric];
    if (threshold && value > threshold) {
      console.warn(`⚠️ Performance threshold exceeded for ${metric}: ${value} > ${threshold}`);
      
      // In production, you might want to alert or take action
      if (process.env.NODE_ENV === 'production') {
        this.logError(
          new Error(`Performance threshold exceeded: ${metric}`),
          undefined,
          { metric, value, threshold }
        );
      }
    }
  }

  private async sendToMonitoringService(errorDetails: ErrorDetails): Promise<void> {
    try {
      // This is where you would integrate with your error monitoring service
      // Examples: Sentry, LogRocket, Bugsnag, etc.
      
      // For now, we'll just log it
      console.log('Would send to monitoring service:', errorDetails);
      
      // Example implementation:
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorDetails),
      // });
    } catch (error) {
      console.error('Failed to send error to monitoring service:', error);
    }
  }
}

// Export singleton instance
export const errorMonitor = ErrorMonitor.getInstance();

// Global error handler for unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    errorMonitor.logError(
      new Error(`Unhandled Promise Rejection: ${event.reason}`),
      undefined,
      { type: 'unhandledrejection', reason: event.reason }
    );
  });

  // Global error handler for uncaught errors
  window.addEventListener('error', (event) => {
    errorMonitor.logError(
      new Error(event.message),
      undefined,
      { 
        type: 'uncaughtError',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }
    );
  });
}