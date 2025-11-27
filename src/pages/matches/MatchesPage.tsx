import { useState } from 'react';
import { GitCompare, TrendingUp, Calendar, ExternalLink } from 'lucide-react';

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  const mockMatches = [
    {
      id: 1,
      article1: {
        id: 1,
        title: 'ראש הממשלה נפגש עם שר החוץ האמריקאי',
        source: 'ישראל היום',
        published_at: '2025-11-26T10:30:00',
        content: 'ראש הממשלה בנימין נתניהו נפגש היום עם שר החוץ האמריקאי אנתוני בלינקן. בפגישה נדונו נושאים אסטרטגיים חשובים...',
      },
      article2: {
        id: 2,
        title: 'נתניהו בפגישה עם בלינקן: דנו בסוגיות אזוריות',
        source: 'ynet',
        published_at: '2025-11-26T11:00:00',
        content: 'ראש הממשלה נתניהו קיים פגישה עם מזכיר המדינה האמריקאי. על סדר היום עמדו נושאים אזוריים והסכמי הגנה...',
      },
      similarity_score: 94.5,
      title_similarity: 88.0,
      content_similarity: 96.0,
      weighted_score: 92.8,
      ai_verified: 1,
    },
    {
      id: 2,
      article1: {
        id: 3,
        title: 'פריצת דרך במחקר הסרטן',
        source: 'הארץ',
        published_at: '2025-11-26T09:15:00',
        content: 'חוקרים ישראלים פיתחו שיטה חדשנית לזיהוי תאי סרטן בשלב מוקדם...',
      },
      article2: {
        id: 4,
        title: 'מדענים ישראלים: גילינו דרך חדשה לגילוי סרטן',
        source: 'מעריב',
        published_at: '2025-11-26T10:00:00',
        content: 'מדענים מהטכניון פיתחו טכנולוגיה פורצת דרך לזיהוי מוקדם של גידולים סרטניים...',
      },
      similarity_score: 91.2,
      title_similarity: 85.5,
      content_similarity: 93.8,
      weighted_score: 90.2,
      ai_verified: 1,
    },
    {
      id: 3,
      article1: {
        id: 5,
        title: 'מחירי הדיור ממשיכים לעלות',
        source: 'כלכליסט',
        published_at: '2025-11-26T08:45:00',
        content: 'נתוני הלשכה המרכזית לסטטיסטיקה מראים עלייה של 3.2% במחירי הדיור...',
      },
      article2: {
        id: 6,
        title: 'הלמ"ס: עליה חדה בשוק הנדל"ן',
        source: 'גלובס',
        published_at: '2025-11-26T09:30:00',
        content: 'הלשכה המרכזית לסטטיסטיקה פרסמה נתונים על שוק הדיור. העלייה במחירים מגיעה ל-3.2%...',
      },
      similarity_score: 88.7,
      title_similarity: 82.0,
      content_similarity: 90.5,
      weighted_score: 87.1,
      ai_verified: 0,
    },
  ];

  const getSimilarityColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">התאמות</h1>
        <p className="text-muted-foreground mt-1">
          כתבות דומות שזוהו ממקורות שונים
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">סך התאמות</span>
          </div>
          <div className="text-2xl font-bold mt-2">342</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">דיוק ממוצע</span>
          </div>
          <div className="text-2xl font-bold mt-2 text-green-600 dark:text-green-400">91.3%</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-green-500"></span>
            <span className="text-sm text-muted-foreground">מאומתות AI</span>
          </div>
          <div className="text-2xl font-bold mt-2">287</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">היום</span>
          </div>
          <div className="text-2xl font-bold mt-2">24</div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {mockMatches.map((match) => (
          <div
            key={match.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Match Header */}
            <div className="bg-accent/30 px-6 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">התאמה #{match.id}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-24 rounded-full ${getSimilarityColor(
                        match.similarity_score
                      )}`}
                    ></div>
                    <span className="text-sm font-bold">
                      {match.similarity_score.toFixed(1)}%
                    </span>
                  </div>
                  {match.ai_verified === 1 && (
                    <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded">
                      ✓ מאומת AI
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    setSelectedMatch(selectedMatch === match.id ? null : match.id)
                  }
                  className="text-sm text-primary hover:underline"
                >
                  {selectedMatch === match.id ? 'הסתר פרטים' : 'הצג פרטים'}
                </button>
              </div>
            </div>

            {/* Articles Comparison */}
            <div className="grid md:grid-cols-2 divide-x divide-border rtl:divide-x-reverse">
              {/* Article 1 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
                    {match.article1.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(match.article1.published_at)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{match.article1.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {match.article1.content}
                </p>
                <button className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline">
                  <ExternalLink className="h-3 w-3" />
                  קרא עוד
                </button>
              </div>

              {/* Article 2 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded font-medium">
                    {match.article2.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(match.article2.published_at)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{match.article2.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {match.article2.content}
                </p>
                <button className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline">
                  <ExternalLink className="h-3 w-3" />
                  קרא עוד
                </button>
              </div>
            </div>

            {/* Detailed Scores */}
            {selectedMatch === match.id && (
              <div className="px-6 py-4 bg-accent/10 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">ניתוח מפורט:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">דמיון כותרת</span>
                    <div className="text-lg font-bold text-primary">
                      {match.title_similarity.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">דמיון תוכן</span>
                    <div className="text-lg font-bold text-secondary">
                      {match.content_similarity.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">ציון משוקלל</span>
                    <div className="text-lg font-bold text-accent">
                      {match.weighted_score.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">ציון סופי</span>
                    <div className="text-lg font-bold">
                      {match.similarity_score.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
