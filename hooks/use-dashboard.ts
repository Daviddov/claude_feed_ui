import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiClient.getDashboard(),
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => apiClient.getStats(),
  });
}

export function useArticles(params?: Parameters<typeof apiClient.getArticles>[0]) {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => apiClient.getArticles(params),
  });
}

export function useMatches(params?: Parameters<typeof apiClient.getMatches>[0]) {
  return useQuery({
    queryKey: ['matches', params],
    queryFn: () => apiClient.getMatches(params),
  });
}
