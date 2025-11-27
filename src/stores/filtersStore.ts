import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ArticleFilters, MatchFilters } from '@/types';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface FiltersState {
  articles: ArticleFilters;
  matches: MatchFilters;
  dateRange: DateRange;

  // Actions
  setArticleFilters: (filters: Partial<ArticleFilters>) => void;
  setMatchFilters: (filters: Partial<MatchFilters>) => void;
  setDateRange: (range: DateRange) => void;
  resetArticleFilters: () => void;
  resetMatchFilters: () => void;
  resetAllFilters: () => void;
}

const defaultArticleFilters: ArticleFilters = {
  limit: 50,
  offset: 0,
};

const defaultMatchFilters: MatchFilters = {
  limit: 50,
  offset: 0,
};

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      articles: defaultArticleFilters,
      matches: defaultMatchFilters,
      dateRange: { from: null, to: null },

      setArticleFilters: (filters: Partial<ArticleFilters>) => {
        set((state) => ({
          articles: { ...state.articles, ...filters },
        }));
      },

      setMatchFilters: (filters: Partial<MatchFilters>) => {
        set((state) => ({
          matches: { ...state.matches, ...filters },
        }));
      },

      setDateRange: (range: DateRange) => {
        set({ dateRange: range });
      },

      resetArticleFilters: () => {
        set({ articles: defaultArticleFilters });
      },

      resetMatchFilters: () => {
        set({ matches: defaultMatchFilters });
      },

      resetAllFilters: () => {
        set({
          articles: defaultArticleFilters,
          matches: defaultMatchFilters,
          dateRange: { from: null, to: null },
        });
      },
    }),
    {
      name: 'filters-storage',
    }
  )
);
