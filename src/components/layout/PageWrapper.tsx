"use client";

import { motion } from 'framer-motion'; // Assuming framer-motion is allowed for animations. If not, use CSS animations.
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  // Fallback to CSS animation if framer-motion is not desired/available.
  // The 'animate-slide-up' class is defined in tailwind.config.ts & globals.css
  // For a pure CSS approach, you might add a common parent class and trigger animation.
  // For simplicity with App Router and server components, a CSS class approach is more robust.
  // The `motion.div` below can be replaced with a simple `div` and CSS animations.
  
  // Using a simpler CSS animation approach by default via animate-slide-up in tailwind.config.js
  return (
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
}
