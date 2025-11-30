/**
 * API Client for RSS Analysis Backend
 * Handles all communication with Express server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface DashboardData {
  overview: {
    totalArticles: number;
    totalMatches: number;
    totalSources: number;
    avgQualityScore: number;
    newArticlesToday: number;
    matchesToday: number;
    percentageChange: {
      articles: number;
      matches: number;
    };
  };
  comparison: Array<{
    source: string;
    articles: number;
    matches: number;
    avgSimilarity: number;
    coverage: number;
  }>;
  timeline: Array<{
    date: string;
    sources: Record<string, number>;
  }>;
  categories: Array<{
    name: string;
    count: number;
    sources: Record<string, number>;
  }>;
  quality: {
    avgWordCount: number;
    avgCharCount: number;
    distribution: Array<{
      range: string;
      count: number;
    }>;
  };
  speed: {
    avgMinutesDiff: number;
    distribution: Array<{
      range: string;
      count: number;
      percentage: number;
    }>;
  };
}

export interface Article {
  id: number;
  title: string;
  source: string;
  category?: string;
  published?: string;
  created_at: string;
  url?: string;
  is_new?: boolean;
  checked?: boolean;
  word_count?: number;
  char_count?: number;
}

export interface Match {
  id: number;
  article_id_1: number;
  article_id_2: number;
  similarity_score: number;
  article1?: Article;
  article2?: Article;
  created_at: string;
}

export interface SystemStats {
  totalArticles: number;
  checkedArticles: number;
  newArticles: number;
  totalMatches: number;
  sources: number;
  categories: number;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }

  // Dashboard Analytics
  async getDashboard(): Promise<DashboardData> {
    return this.fetch<DashboardData>('/api/analytics/dashboard');
  }

  // System Statistics
  async getStats(): Promise<SystemStats> {
    return this.fetch<SystemStats>('/api/stats');
  }

  // Articles
  async getArticles(params?: {
    source?: string | string[];
    category?: string | string[];
    startDate?: string;
    endDate?: string;
    isNew?: boolean;
    checked?: boolean;
    hasMatch?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Article[]> {
    const queryParams = new URLSearchParams();

    if (params?.source) {
      const sources = Array.isArray(params.source) ? params.source : [params.source];
      sources.forEach(s => queryParams.append('source', s));
    }
    if (params?.category) {
      const categories = Array.isArray(params.category) ? params.category : [params.category];
      categories.forEach(c => queryParams.append('category', c));
    }
    if (params?.startDate) queryParams.set('startDate', params.startDate);
    if (params?.endDate) queryParams.set('endDate', params.endDate);
    if (params?.isNew !== undefined) queryParams.set('isNew', String(params.isNew));
    if (params?.checked !== undefined) queryParams.set('checked', String(params.checked));
    if (params?.hasMatch !== undefined) queryParams.set('hasMatch', String(params.hasMatch));
    if (params?.limit) queryParams.set('limit', String(params.limit));
    if (params?.offset) queryParams.set('offset', String(params.offset));

    const query = queryParams.toString();
    return this.fetch<Article[]>(`/api/articles${query ? `?${query}` : ''}`);
  }

  // Matches
  async getMatches(params?: {
    minSimilarity?: number;
    limit?: number;
    offset?: number;
  }): Promise<Match[]> {
    const queryParams = new URLSearchParams();

    if (params?.minSimilarity) queryParams.set('minSimilarity', String(params.minSimilarity));
    if (params?.limit) queryParams.set('limit', String(params.limit));
    if (params?.offset) queryParams.set('offset', String(params.offset));

    const query = queryParams.toString();
    return this.fetch<Match[]>(`/api/matches${query ? `?${query}` : ''}`);
  }

  // Sources list
  async getSources(): Promise<string[]> {
    const stats = await this.getStats();
    // Extract unique sources from articles
    const articles = await this.getArticles({ limit: 1000 });
    return Array.from(new Set(articles.map(a => a.source).filter(Boolean)));
  }

  // Categories list
  async getCategories(): Promise<string[]> {
    const articles = await this.getArticles({ limit: 1000 });
    return Array.from(new Set(articles.map(a => a.category).filter(Boolean) as string[]));
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export class for testing
export default APIClient;
