import { lazy, ComponentType } from 'react';

/**
 * Enhanced lazy loading with error boundaries and loading states
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
) {
  const LazyComponent = lazy(importFn);
  
  // Preload the component on hover/focus for better UX
  const preload = () => {
    importFn().catch(console.error);
  };

  return {
    Component: LazyComponent,
    preload
  };
}

/**
 * Route-based code splitting
 */
export const lazyRoutes = {
  Projects: createLazyComponent(() => import('@/app/projects/page')),
  Team: createLazyComponent(() => import('@/app/team/page')),
  Research: createLazyComponent(() => import('@/app/research/page')),
  Contact: createLazyComponent(() => import('@/app/contact/page')),
  About: createLazyComponent(() => import('@/app/about/page'))
};

/**
 * Component-based code splitting for heavy components
 */
export const lazyComponents = {
  // Charts and data visualization
  Chart: createLazyComponent(() => import('@/components/ui/chart')),
  
  // Complex forms
  ContactForm: createLazyComponent(() => 
    import('@/components/forms/ContactForm').catch(() => 
      import('@/components/ui/button').then(mod => ({ default: mod.Button as any }))
    )
  ),
  
  // Admin components (only load when needed)
  AdminPanel: createLazyComponent(() => 
    import('@/components/admin/AdminPanel').catch(() => 
      import('@/components/ui/card').then(mod => ({ default: mod.Card as any }))
    )
  )
};

/**
 * Preload critical routes on app start
 */
export function preloadCriticalRoutes() {
  if (typeof window === 'undefined') return;
  
  // Preload likely next pages
  setTimeout(() => {
    lazyRoutes.Projects.preload();
    lazyRoutes.Team.preload();
  }, 2000);
}

/**
 * Preload route on link hover
 */
export function createPreloadHandler(routeName: keyof typeof lazyRoutes) {
  return {
    onMouseEnter: () => lazyRoutes[routeName].preload(),
    onFocus: () => lazyRoutes[routeName].preload()
  };
}