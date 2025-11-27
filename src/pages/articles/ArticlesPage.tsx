import { useState } from 'react';
import { useArticles } from '@/api/queries';
import { useFiltersStore } from '@/stores';
import { Search, Calendar, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ArticlesPage() {
  const { articles: filters, setArticleFilters, resetArticleFilters } = useFiltersStore();
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, refetch } = useArticles(filters);

  const handleRefresh = () => {
    refetch();
    toast.success('מרענן כתבות...');
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setArticleFilters({ search: value });
  };

  const handleViewArticle = (id: number) => {
    toast.success(`פתיחת כתבה #${id}`);
  };

  const handleFindMatches = (id: number) => {
    toast.success(`מחפש התאמות לכתבה #${id}...`);
  };

  const handleEditArticle = (id: number) => {
    toast.success(`עורך כתבה #${id}`);
  };

  const mockArticles = [
    {
      id: 1,
      title: 'ראש הממשלה נפגש עם שר החוץ האמריקאי',
      source: 'ישראל היום',
      category: 'פוליטיקה',
      published_at: '2025-11-26T10:30:00',
      summary: 'בפגישה נדונו נושאים אסטרטגיים בינלאומיים...',
      quality_score: 8.5,
      matches_count: 3,
    },
    {
      id: 2,
      title: 'פריצת דרך במחקר הסרטן בישראל',
      source: 'ynet',
      category: 'בריאות',
      published_at: '2025-11-26T09:15:00',
      summary: 'חוקרים ישראלים מצאו שיטה חדשנית לטיפול...',
      quality_score: 9.2,
      matches_count: 2,
    },
    {
      id: 3,
      title: 'עליה חדה במחירי הדיור ברבעון האחרון',
      source: 'כלכליסט',
      category: 'כלכלה',
      published_at: '2025-11-26T08:45:00',
      summary: 'נתוני הלשכה המרכזית לסטטיסטיקה מראים...',
      quality_score: 7.8,
      matches_count: 1,
    },
    {
      id: 4,
      title: 'הפועל תל אביב ניצחה את מכבי חיפה 2-1',
      source: 'ספורט 1',
      category: 'ספורט',
      published_at: '2025-11-25T22:00:00',
      summary: 'במשחק מרתק באצטדיון בלומפילד...',
      quality_score: 6.5,
      matches_count: 0, // ללא התאמה
    },
    {
      id: 5,
      title: 'גלי שלג כבדים צפויים בהרמון',
      source: 'וואלה',
      category: 'מזג אוויר',
      published_at: '2025-11-25T20:30:00',
      summary: 'שירות המטאורולוגי מזהיר מגשמים עזים...',
      quality_score: 7.2,
      matches_count: 0, // ללא התאמה
    },
  ];

  const getQualityColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `לפני ${diffMins} דקות`;
    if (diffHours < 24) return `לפני ${diffHours} שעות`;
    return date.toLocaleDateString('he-IL');
  };

  // Filter articles based on selected filters
  const filteredArticles = mockArticles.filter((article) => {
    // Filter by onlyUnmatched
    if (filters.onlyUnmatched && article.matches_count > 0) {
      return false;
    }
    // Add more filters as needed when backend is ready
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">כתבות</h1>
          <p className="text-muted-foreground mt-1">
            ניהול וצפייה בכל הכתבות מהמקורות השונים
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          רענן
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="חיפוש כתבות..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Source Filter */}
          <select
            value={filters.source || ''}
            onChange={(e) => setArticleFilters({ source: e.target.value || undefined })}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">כל המקורות</option>
            <option value="ישראל היום">ישראל היום</option>
            <option value="ynet">ynet</option>
            <option value="וואלה">וואלה</option>
            <option value="כלכליסט">כלכליסט</option>
            <option value="ספורט 1">ספורט 1</option>
          </select>

          {/* Category Filter */}
          <select
            value={filters.category || ''}
            onChange={(e) => setArticleFilters({ category: e.target.value || undefined })}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">כל הקטגוריות</option>
            <option value="פוליטיקה">פוליטיקה</option>
            <option value="כלכלה">כלכלה</option>
            <option value="בריאות">בריאות</option>
            <option value="ספורט">ספורט</option>
            <option value="מזג אוויר">מזג אוויר</option>
          </select>
        </div>

        {/* Toggle Filters */}
        <div className="mt-4 flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyUnmatched || false}
              onChange={(e) => setArticleFilters({ onlyUnmatched: e.target.checked || undefined })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm">רק כתבות ללא התאמה</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyNew || false}
              onChange={(e) => setArticleFilters({ onlyNew: e.target.checked || undefined })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm">רק כתבות חדשות</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyChecked || false}
              onChange={(e) => setArticleFilters({ onlyChecked: e.target.checked || undefined })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm">רק כתבות שנבדקו</span>
          </label>
        </div>

        {/* Active Filters */}
        {(filters.source || filters.category || searchTerm || filters.onlyUnmatched || filters.onlyNew || filters.onlyChecked) && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">פילטרים פעילים:</span>
            {filters.source && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                מקור: {filters.source}
              </span>
            )}
            {filters.category && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                קטגוריה: {filters.category}
              </span>
            )}
            {searchTerm && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                חיפוש: {searchTerm}
              </span>
            )}
            {filters.onlyUnmatched && (
              <span className="px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm rounded">
                ללא התאמה
              </span>
            )}
            {filters.onlyNew && (
              <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm rounded">
                חדשות
              </span>
            )}
            {filters.onlyChecked && (
              <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm rounded">
                נבדקו
              </span>
            )}
            <button
              onClick={() => {
                resetArticleFilters();
                setSearchTerm('');
              }}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              נקה הכל
            </button>
          </div>
        )}
      </div>

      {/* Articles List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">לא נמצאו כתבות התואמות לפילטרים</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.summary}</p>

                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{article.source}</span>
                    </span>
                    <span className="px-2 py-1 bg-accent rounded text-xs">
                      {article.category}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.published_at)}
                    </span>
                    {/* Matches Badge */}
                    {article.matches_count > 0 ? (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded flex items-center gap-1">
                        <span className="font-bold">{article.matches_count}</span>
                        התאמות
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs rounded">
                        ללא התאמה
                      </span>
                    )}
                  </div>
                </div>

                {/* Quality Score */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`text-2xl font-bold ${getQualityColor(article.quality_score)}`}>
                    {article.quality_score}
                  </div>
                  <span className="text-xs text-muted-foreground">ציון איכות</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <button
                  onClick={() => handleViewArticle(article.id)}
                  className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                  צפייה מלאה
                </button>
                <button
                  onClick={() => handleFindMatches(article.id)}
                  className="px-3 py-1 text-sm border border-border rounded hover:bg-accent"
                >
                  מצא התאמות
                </button>
                <button
                  onClick={() => handleEditArticle(article.id)}
                  className="px-3 py-1 text-sm border border-border rounded hover:bg-accent"
                >
                  ערוך
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">
          מציג 1-{filteredArticles.length} מתוך {filteredArticles.length} כתבות
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-border rounded hover:bg-accent disabled:opacity-50" disabled>
            הקודם
          </button>
          <button className="px-3 py-1 bg-primary text-primary-foreground rounded">
            1
          </button>
          <button className="px-3 py-1 border border-border rounded hover:bg-accent">
            2
          </button>
          <button className="px-3 py-1 border border-border rounded hover:bg-accent">
            3
          </button>
          <button className="px-3 py-1 border border-border rounded hover:bg-accent">
            הבא
          </button>
        </div>
      </div>
    </div>
  );
}
