import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  const sources = [
    { name: 'ישראל היום', articles: 245, percentage: 19.6, color: 'bg-blue-500' },
    { name: 'ynet', articles: 234, percentage: 18.8, color: 'bg-red-500' },
    { name: 'כיכר השבת', articles: 198, percentage: 15.9, color: 'bg-purple-500' },
    { name: 'ערוץ 7', articles: 176, percentage: 14.1, color: 'bg-orange-500' },
    { name: 'וואלה', articles: 156, percentage: 12.5, color: 'bg-green-500' },
    { name: 'אחרים', articles: 238, percentage: 19.1, color: 'bg-gray-500' },
  ];

  const categories = [
    { name: 'פוליטיקה', count: 342, trend: '+12%' },
    { name: 'כלכלה', count: 287, trend: '+8%' },
    { name: 'ביטחון', count: 234, trend: '-3%' },
    { name: 'בריאות', count: 156, trend: '+15%' },
    { name: 'ספורט', count: 128, trend: '+5%' },
    { name: 'טכנולוגיה', count: 100, trend: '+22%' },
  ];

  const timeData = [
    { hour: '00:00', articles: 12 },
    { hour: '02:00', articles: 8 },
    { hour: '04:00', articles: 5 },
    { hour: '06:00', articles: 18 },
    { hour: '08:00', articles: 45 },
    { hour: '10:00', articles: 67 },
    { hour: '12:00', articles: 82 },
    { hour: '14:00', articles: 75 },
    { hour: '16:00', articles: 58 },
    { hour: '18:00', articles: 42 },
    { hour: '20:00', articles: 38 },
    { hour: '22:00', articles: 25 },
  ];

  const maxArticles = Math.max(...timeData.map((d) => d.articles));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">אנליטיקה</h1>
        <p className="text-muted-foreground mt-1">
          תובנות וסטטיסטיקות מעמיקות על הכתבות והמקורות
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm">סך כתבות</span>
          </div>
          <div className="text-3xl font-bold">1,247</div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            +18% מהחודש שעבר
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">ממוצע יומי</span>
          </div>
          <div className="text-3xl font-bold">42</div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            +5% מהשבוע שעבר
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Activity className="h-4 w-4" />
            <span className="text-sm">ציון איכות ממוצע</span>
          </div>
          <div className="text-3xl font-bold">8.2</div>
          <div className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
            -0.3 מהחודש שעבר
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <PieChart className="h-4 w-4" />
            <span className="text-sm">מקורות פעילים</span>
          </div>
          <div className="text-3xl font-bold">13</div>
          <div className="text-sm text-muted-foreground mt-2">ללא שינוי</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sources Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-6">התפלגות לפי מקורות</h3>
          <div className="space-y-4">
            {sources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{source.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {source.articles}
                    </span>
                    <span className="text-sm font-bold">{source.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 bg-accent rounded-full overflow-hidden">
                  <div
                    className={`h-full ${source.color} transition-all`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Stats */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-6">קטגוריות מובילות</h3>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{category.count}</span>
                  <span
                    className={`text-sm ${
                      category.trend.startsWith('+')
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {category.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">התפלגות כתבות לפי שעות</h3>
        <div className="space-y-2">
          {timeData.map((item) => (
            <div key={item.hour} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">{item.hour}</span>
              <div className="flex-1 h-8 bg-accent rounded overflow-hidden">
                <div
                  className="h-full bg-primary transition-all flex items-center justify-end pr-2"
                  style={{ width: `${(item.articles / maxArticles) * 100}%` }}
                >
                  {item.articles > 10 && (
                    <span className="text-xs text-primary-foreground font-medium">
                      {item.articles}
                    </span>
                  )}
                </div>
              </div>
              {item.articles <= 10 && (
                <span className="text-sm font-medium w-8">{item.articles}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quality Analysis */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-6">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            איכות גבוהה (8-10)
          </h4>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            456
          </div>
          <div className="text-sm text-muted-foreground mt-1">36.6% מהכתבות</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-lg p-6">
          <h4 className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
            איכות בינונית (6-8)
          </h4>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            623
          </div>
          <div className="text-sm text-muted-foreground mt-1">50.0% מהכתבות</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-lg p-6">
          <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">
            איכות נמוכה (0-6)
          </h4>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">168</div>
          <div className="text-sm text-muted-foreground mt-1">13.4% מהכתבות</div>
        </div>
      </div>
    </div>
  );
}
