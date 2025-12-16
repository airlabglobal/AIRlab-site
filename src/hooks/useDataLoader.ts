import { useState, useEffect, useCallback } from 'react';
import { dataLoader, DataLoadResult } from '@/lib/dataLoader';
import { Project, TeamMember, NewsItem, ResearchPaper } from '@/lib/schemas';

type DataType = 'projects' | 'team' | 'news' | 'research';

interface UseDataLoaderResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  isValid: boolean;
  isFallback: boolean;
  retry: () => void;
}

/**
 * Custom hook for loading and validating data with error handling
 */
export function useDataLoader<T>(
  dataType: DataType
): UseDataLoaderResult<T> {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: string | null;
    isValid: boolean;
    isFallback: boolean;
  }>({
    data: null,
    loading: true,
    error: null,
    isValid: false,
    isFallback: false
  });

  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let result: DataLoadResult<T>;

      switch (dataType) {
        case 'projects':
          result = await dataLoader.loadProjects() as DataLoadResult<T>;
          break;
        case 'team':
          result = await dataLoader.loadTeam() as DataLoadResult<T>;
          break;
        case 'news':
          result = await dataLoader.loadNews() as DataLoadResult<T>;
          break;
        case 'research':
          result = await dataLoader.loadResearch() as DataLoadResult<T>;
          break;
        default:
          throw new Error(`Unknown data type: ${dataType}`);
      }

      setState({
        data: result.data,
        loading: false,
        error: result.errors.length > 0 ? result.errors.join(', ') : null,
        isValid: result.isValid,
        isFallback: result.isFallback
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isValid: false,
        isFallback: true
      });
    }
  }, [dataType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data: state.data as T,
    loading: state.loading,
    error: state.error,
    isValid: state.isValid,
    isFallback: state.isFallback,
    retry: loadData
  };
}

// Specific hooks for each data type
export function useProjects(): UseDataLoaderResult<Project[]> {
  return useDataLoader<Project[]>('projects');
}

export function useTeam(): UseDataLoaderResult<TeamMember[]> {
  return useDataLoader<TeamMember[]>('team');
}

export function useNews(): UseDataLoaderResult<NewsItem[]> {
  return useDataLoader<NewsItem[]>('news');
}

export function useResearch(): UseDataLoaderResult<ResearchPaper[]> {
  return useDataLoader<ResearchPaper[]>('research');
}