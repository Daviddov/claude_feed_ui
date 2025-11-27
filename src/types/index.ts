// Domain Models
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'editor' | 'admin' | 'analyst';
  is_active: number;
  created_at: string;
  last_login?: string | null;
}

export interface Article {
  id?: number;
  source: string;
  title: string;
  link: string;
  summary: string;
  content?: string;
  categories?: string;
  published?: Date | string | null;
  checked?: number;
  checked_at?: Date | string | null;
  is_new?: number;
  created_at?: Date | string;
  higher_quality?: boolean;
  embedding?: string;
}

export interface Match {
  id?: number;
  article_id_1?: number;
  article_id_2?: number;
  article1?: Article;
  article2?: Article;
  better_article_id?: number | null;
  first_published_id?: number;
  published_diff_seconds?: number | null;
  similarity_score?: number | null;
  title_similarity?: number | null;
  summary_similarity?: number | null;
  content_similarity?: number | null;
  weighted_score?: number | null;
  entity_overlap?: number | null;
  reason?: string;
  quality_checked?: number;
  ai_verified?: number | null;
  created_at?: Date | string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filter Types
export interface ArticleFilters {
  source?: string;
  sources?: string[];
  category?: string;
  categories?: string[];
  publishedAfter?: string;
  publishedBefore?: string;
  onlyNew?: boolean;
  onlyChecked?: boolean;
  onlyUnmatched?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface MatchFilters {
  source?: string;
  sources?: string[];
  category?: string;
  categories?: string[];
  minSimilarity?: number;
  maxSimilarity?: number;
  publishedAfter?: string;
  publishedBefore?: string;
  onlyUnchecked?: boolean;
  limit?: number;
  offset?: number;
}
