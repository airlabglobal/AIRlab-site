"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  sectionName?: string;
  fallback?: React.ComponentType<SectionErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo, sectionName?: string) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export interface SectionErrorFallbackProps {
  error: Error;
  resetError: () => void;
  sectionName?: string;
}

class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error with section context
    console.error(`Section Error Boundary (${this.props.sectionName || 'Unknown'}) caught an error:`, error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo, this.props.sectionName);
    }

    // In production, you would send this to your error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error monitoring service with section context
      // errorMonitoringService.captureException(error, { 
      //   extra: { ...errorInfo, sectionName: this.props.sectionName } 
      // });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback component if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent 
            error={this.state.error!} 
            resetError={this.resetError}
            sectionName={this.props.sectionName}
          />
        );
      }

      // Default fallback UI for section
      return (
        <Card className="w-full border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg">
                {this.props.sectionName ? `${this.props.sectionName} Error` : 'Section Error'}
              </CardTitle>
            </div>
            <CardDescription>
              This section encountered an error and couldn't load properly. 
              The rest of the page should still work normally.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="rounded-md bg-muted p-3 mb-4">
                <p className="text-sm font-medium text-destructive mb-2">
                  Error Details (Development Only):
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <Button onClick={this.resetError} size="sm" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Section
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;