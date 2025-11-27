export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },

  // Articles
  ARTICLES: {
    LIST: '/articles',
    NEW: '/articles/new',
    UNMATCHED: '/articles/unmatched',
    MARK_CHECKED: '/articles/mark-checked',
    MARK_NEW: '/articles/mark-new',
    MARK_OLD: '/articles/mark-old',
    SCRAPE: (id: number) => `/articles/${id}/scrape`,
    SCRAPE_MULTIPLE: '/articles/scrape-multiple',
  },

  // Matches
  MATCHES: {
    LIST: '/matches',
    BREAKDOWN: (id: number) => `/matches/${id}/breakdown`,
    BREAKDOWNS: '/matches/breakdowns',
    CONNECT: '/matches/connect',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    EXPORT: '/analytics/export',
  },

  // Stats
  STATS: '/stats',

  // Scheduler
  SCHEDULER: {
    STATUS: '/scheduler',
    START_FETCH: '/scheduler/fetch/start',
    STOP_FETCH: '/scheduler/fetch/stop',
    START_COMPARE: '/scheduler/compare/start',
    STOP_COMPARE: '/scheduler/compare/stop',
    START_QUALITY: '/scheduler/quality/start',
    STOP_QUALITY: '/scheduler/quality/stop',
  },

  // Feeds
  FEEDS: {
    LIST: '/feeds',
    CREATE: '/feeds',
    UPDATE: (id: number) => `/feeds/${id}`,
    DELETE: (id: number) => `/feeds/${id}`,
  },

  // Categories
  CATEGORIES: {
    LIST: '/categories',
    ALL: '/categories/all',
    APPROVED: '/categories/approved',
    DEFAULT_FILTERED: '/categories/default-filtered',
    MATCHING_ENABLED: '/categories/matching-enabled',
    ADD_APPROVED: '/categories/approved',
  },

  // Users
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
  },

  // Feedback
  FEEDBACK: {
    SUBMIT: '/feedback/match',
    CHECK: '/feedback/check',
    LIST: '/feedback/list',
    REPORT: '/feedback/report',
    ACCURACY: '/feedback/accuracy',
  },

  // Sources
  SOURCES: '/sources',
} as const;
