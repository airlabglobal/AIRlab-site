import { safeJsonParse, ValidationResult } from './dataValidation';
import { 
  Project, 
  TeamMember, 
  NewsItem, 
  ResearchPaper,
  projectsValidator,
  teamMembersValidator,
  newsItemsValidator,
  researchPapersValidator
} from './schemas';
import { errorMonitor } from './errorMonitoring';

// Fallback data for when loading fails
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'fallback-1',
    title: 'Loading Projects...',
    description: 'Project data is currently being loaded. Please check back shortly.',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/64748b?text=Loading...',
    imageHint: 'loading placeholder',
    tags: ['Loading'],
    status: 'Ongoing',
    link: '#'
  }
];

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: 'fallback-1',
    name: 'Loading Team Information...',
    role: 'Please check back shortly',
    imageUrl: 'https://placehold.co/400x400/e2e8f0/64748b?text=Loading...',
    imageHint: 'loading placeholder',
    bio: 'Team information is currently being loaded.',
    social: {}
  }
];

const FALLBACK_NEWS: NewsItem[] = [
  {
    title: 'Loading Latest News...',
    date: 'Loading...',
    link: '#'
  }
];

const FALLBACK_RESEARCH: ResearchPaper[] = [
  {
    _id: 'fallback-1',
    title: 'Loading Research Papers...',
    authors: 'Loading...',
    year: new Date().getFullYear(),
    description: 'Research information is currently being loaded.',
    fileUrl: '#',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/64748b?text=Loading...'
  }
];

interface DataLoadResult<T> {
  data: T;
  isValid: boolean;
  errors: string[];
  isFallback: boolean;
}

class DataLoader {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes - increased for better performance
  private loadingPromises = new Map<string, Promise<any>>(); // Prevent duplicate requests

  /**
   * Load and validate projects data
   */
  async loadProjects(): Promise<DataLoadResult<Project[]>> {
    return this.loadData<Project[]>(
      'projects',
      () => import('@/data/projects.json'),
      projectsValidator,
      FALLBACK_PROJECTS,
      'projects.json'
    );
  }

  /**
   * Load and validate team data
   */
  async loadTeam(): Promise<DataLoadResult<TeamMember[]>> {
    return this.loadData<TeamMember[]>(
      'team',
      () => import('@/data/team.json'),
      teamMembersValidator,
      FALLBACK_TEAM,
      'team.json'
    );
  }

  /**
   * Load and validate news data
   */
  async loadNews(): Promise<DataLoadResult<NewsItem[]>> {
    return this.loadData<NewsItem[]>(
      'news',
      () => import('@/data/news.json'),
      newsItemsValidator,
      FALLBACK_NEWS,
      'news.json'
    );
  }

  /**
   * Load and validate research data
   */
  async loadResearch(): Promise<DataLoadResult<ResearchPaper[]>> {
    return this.loadData<ResearchPaper[]>(
      'research',
      () => import('@/data/research.json'),
      researchPapersValidator,
      FALLBACK_RESEARCH,
      'research.json'
    );
  }

  /**
   * Generic data loading method with caching and validation
   */
  private async loadData<T>(
    cacheKey: string,
    loader: () => Promise<{ default: any }>,
    validator: { isValid: (data: unknown) => boolean; getErrors: (data: unknown) => any[] },
    fallbackData: T,
    fileName: string
  ): Promise<DataLoadResult<T>> {
    try {
      // Check cache first
      const cached = this.getCachedData<T>(cacheKey);
      if (cached) {
        return {
          data: cached,
          isValid: true,
          errors: [],
          isFallback: false
        };
      }

      // Check if already loading to prevent duplicate requests
      const existingPromise = this.loadingPromises.get(cacheKey);
      if (existingPromise) {
        return await existingPromise;
      }

      // Create loading promise
      const loadingPromise = this.performLoad<T>(loader, validator, fallbackData, fileName, cacheKey);
      this.loadingPromises.set(cacheKey, loadingPromise);

      try {
        const result = await loadingPromise;
        return result;
      } finally {
        // Clean up loading promise
        this.loadingPromises.delete(cacheKey);
      }
    } catch (error) {
      // Clean up loading promise on error
      this.loadingPromises.delete(cacheKey);
      
      // Log loading error
      errorMonitor.logError(
        error instanceof Error ? error : new Error(`Failed to load ${fileName}`),
        undefined,
        { fileName, context: 'data-loading' }
      );

      return {
        data: fallbackData,
        isValid: false,
        errors: [error instanceof Error ? error.message : 'Unknown loading error'],
        isFallback: true
      };
    }
  }

  /**
   * Perform the actual data loading
   */
  private async performLoad<T>(
    loader: () => Promise<{ default: any }>,
    validator: { isValid: (data: unknown) => boolean; getErrors: (data: unknown) => any[] },
    fallbackData: T,
    fileName: string,
    cacheKey: string
  ): Promise<DataLoadResult<T>> {
    // Load data
    const module = await loader();
    const rawData = module.default;

    // Validate data
    const isValid = validator.isValid(rawData);
    const errors = validator.getErrors(rawData);

    if (isValid) {
      // Cache valid data
      this.setCachedData(cacheKey, rawData);
      
      return {
        data: rawData,
        isValid: true,
        errors: [],
        isFallback: false
      };
    } else {
      // Log validation errors
      const errorMessages = errors.map(e => e.message || e.toString());
      errorMonitor.logError(
        new Error(`Data validation failed for ${fileName}`),
        undefined,
        { 
          fileName, 
          validationErrors: errorMessages,
          context: 'data-loading'
        }
      );

      return {
        data: fallbackData,
        isValid: false,
        errors: errorMessages,
        isFallback: true
      };
    }
  }

  /**
   * Get cached data if still valid
   */
  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    
    // Remove expired cache
    if (cached) {
      this.cache.delete(key);
    }
    
    return null;
  }

  /**
   * Cache data with TTL
   */
  private setCachedData<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: this.CACHE_TTL
    });
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Validate external API response
   */
  validateApiResponse<T>(
    response: unknown,
    validator: { isValid: (data: unknown) => boolean; getErrors: (data: unknown) => any[] },
    fallbackData: T,
    apiName: string
  ): DataLoadResult<T> {
    try {
      const isValid = validator.isValid(response);
      const errors = validator.getErrors(response);

      if (isValid) {
        return {
          data: response as T,
          isValid: true,
          errors: [],
          isFallback: false
        };
      } else {
        const errorMessages = errors.map(e => e.message || e.toString());
        errorMonitor.logError(
          new Error(`API response validation failed for ${apiName}`),
          undefined,
          { 
            apiName, 
            validationErrors: errorMessages,
            context: 'api-validation'
          }
        );

        return {
          data: fallbackData,
          isValid: false,
          errors: errorMessages,
          isFallback: true
        };
      }
    } catch (error) {
      errorMonitor.logError(
        error instanceof Error ? error : new Error(`API validation error for ${apiName}`),
        undefined,
        { apiName, context: 'api-validation' }
      );

      return {
        data: fallbackData,
        isValid: false,
        errors: [error instanceof Error ? error.message : 'Unknown validation error'],
        isFallback: true
      };
    }
  }
}

// Export singleton instance
export const dataLoader = new DataLoader();

// Export types for use in components
export type { DataLoadResult };