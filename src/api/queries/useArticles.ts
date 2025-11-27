import { useQuery } from '@tanstack/react-query';
// import apiClient from '../client';
// import { ENDPOINTS } from '../endpoints';
import type { ArticleFilters } from '@/types';

export const useArticles = (filters?: ArticleFilters) => {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: async () => {
      // TEMPORARY MOCK - Remove when backend is ready
      await new Promise(resolve => setTimeout(resolve, 300));

      // Mock articles data
      return {
        articles: [],
        total: 0,
      };

      // REAL API CALL - Uncomment when backend is ready
      // const response = await apiClient.get<{ articles: Article[] }>(
      //   ENDPOINTS.ARTICLES.LIST,
      //   { params: filters }
      // );
      // return response;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      // TEMPORARY MOCK - Remove when backend is ready
      await new Promise(resolve => setTimeout(resolve, 300));

      return {
        totalArticles: 1247,
        totalMatches: 342,
        newArticlesToday: 28,
        categoriesCount: 12,
        sources: [
          { name: 'ישראל היום', count: 245 },
          { name: 'כיכר השבת', count: 198 },
          { name: 'ערוץ 7', count: 176 },
          { name: 'ynet', count: 234 },
          { name: 'וואלה', count: 156 },
        ],
      };

      // REAL API CALL - Uncomment when backend is ready
      // const response = await apiClient.get(ENDPOINTS.STATS);
      // return response;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    // Disabled auto-refetch for mock mode
    // refetchInterval: 1000 * 60 * 5, // Auto-refetch every 5 minutes
  });
};
