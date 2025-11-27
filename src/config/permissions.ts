export const PERMISSIONS = {
  // Articles
  VIEW_ARTICLES: ['user', 'editor', 'admin', 'analyst'],
  EDIT_ARTICLES: ['editor', 'admin'],
  DELETE_ARTICLES: ['admin'],
  SCRAPE_ARTICLES: ['editor', 'admin'],

  // Matches
  VIEW_MATCHES: ['user', 'editor', 'admin', 'analyst'],
  SUBMIT_FEEDBACK: ['editor', 'admin'],
  DELETE_MATCHES: ['admin'],

  // Analytics
  VIEW_ANALYTICS: ['editor', 'admin', 'analyst'],
  EXPORT_REPORTS: ['editor', 'admin', 'analyst'],

  // Admin
  MANAGE_FEEDS: ['admin'],
  MANAGE_USERS: ['admin'],
  MANAGE_CATEGORIES: ['admin', 'editor'],
  CONTROL_SCHEDULER: ['admin', 'editor'],
  VIEW_LOGS: ['admin'],
  MANAGE_BACKUPS: ['admin'],
} as const;

export type Permission = keyof typeof PERMISSIONS;
