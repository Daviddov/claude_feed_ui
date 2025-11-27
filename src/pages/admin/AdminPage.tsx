import { useState } from 'react';
import {
  Settings,
  Users,
  Rss,
  Database,
  Play,
  Pause,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'feeds' | 'users' | 'scheduler' | 'system'>(
    'feeds'
  );

  const feeds = [
    {
      id: 1,
      name: 'ישראל היום',
      url: 'https://www.israelhayom.co.il/feed',
      status: 'active',
      lastFetch: '2025-11-26T12:30:00',
      articlesCount: 245,
    },
    {
      id: 2,
      name: 'ynet',
      url: 'https://www.ynet.co.il/integration/StoryRss2.xml',
      status: 'active',
      lastFetch: '2025-11-26T12:28:00',
      articlesCount: 234,
    },
    {
      id: 3,
      name: 'כיכר השבת',
      url: 'https://www.kikar.co.il/feed',
      status: 'active',
      lastFetch: '2025-11-26T12:25:00',
      articlesCount: 198,
    },
    {
      id: 4,
      name: 'ערוץ 7',
      url: 'https://www.inn.co.il/Rss.aspx',
      status: 'error',
      lastFetch: '2025-11-26T11:00:00',
      articlesCount: 176,
      error: 'Connection timeout',
    },
  ];

  const users = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@rss.local',
      role: 'admin',
      is_active: 1,
      last_login: '2025-11-26T12:00:00',
    },
    {
      id: 2,
      username: 'editor1',
      email: 'editor@rss.local',
      role: 'editor',
      is_active: 1,
      last_login: '2025-11-26T10:30:00',
    },
    {
      id: 3,
      username: 'analyst1',
      email: 'analyst@rss.local',
      role: 'analyst',
      is_active: 1,
      last_login: '2025-11-25T16:45:00',
    },
    {
      id: 4,
      username: 'user1',
      email: 'user@rss.local',
      role: 'user',
      is_active: 0,
      last_login: null,
    },
  ];

  const schedulers = [
    {
      name: 'fetch',
      displayName: 'איסוף כתבות',
      interval: '*/30 * * * *',
      enabled: true,
      lastRun: '2025-11-26T12:30:00',
      nextRun: '2025-11-26T13:00:00',
    },
    {
      name: 'compare',
      displayName: 'מציאת התאמות',
      interval: '*/60 * * * *',
      enabled: true,
      lastRun: '2025-11-26T12:00:00',
      nextRun: '2025-11-26T13:00:00',
    },
    {
      name: 'quality',
      displayName: 'בדיקת איכות',
      interval: '0 */6 * * *',
      enabled: false,
      lastRun: '2025-11-26T06:00:00',
      nextRun: null,
    },
    {
      name: 'cleanup',
      displayName: 'ניקוי embeddings',
      interval: '0 2 * * *',
      enabled: true,
      lastRun: '2025-11-26T02:00:00',
      nextRun: '2025-11-27T02:00:00',
    },
  ];

  const systemStats = {
    uptime: '15d 8h 42m',
    memory: { used: 342, total: 512, percentage: 66.8 },
    database: { size: '2.4 GB', connections: 12, maxConnections: 100 },
    api: { requests24h: 15234, avgResponseTime: '85ms', errors24h: 23 },
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'אף פעם';
    const date = new Date(dateString);
    return date.toLocaleString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'editor':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'analyst':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">פאנל ניהול</h1>
        <p className="text-muted-foreground mt-1">
          ניהול מערכת, משתמשים, מקורות ומתזמנים
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('feeds')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'feeds'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Rss className="h-4 w-4 inline ml-2" />
          מקורות RSS
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'users'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-4 w-4 inline ml-2" />
          משתמשים
        </button>
        <button
          onClick={() => setActiveTab('scheduler')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'scheduler'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Clock className="h-4 w-4 inline ml-2" />
          מתזמנים
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'system'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings className="h-4 w-4 inline ml-2" />
          מערכת
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Feeds Tab */}
        {activeTab === 'feeds' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">מקורות RSS</h2>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                הוסף מקור חדש
              </button>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-accent/30 border-b border-border">
                  <tr>
                    <th className="text-right px-6 py-3 text-sm font-medium">שם</th>
                    <th className="text-right px-6 py-3 text-sm font-medium">URL</th>
                    <th className="text-right px-6 py-3 text-sm font-medium">סטטוס</th>
                    <th className="text-right px-6 py-3 text-sm font-medium">
                      איסוף אחרון
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium">כתבות</th>
                    <th className="text-right px-6 py-3 text-sm font-medium">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {feeds.map((feed) => (
                    <tr key={feed.id} className="border-b border-border last:border-0">
                      <td className="px-6 py-4 font-medium">{feed.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                        {feed.url}
                      </td>
                      <td className="px-6 py-4">
                        {feed.status === 'active' ? (
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                            <CheckCircle className="h-4 w-4" />
                            פעיל
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            שגיאה
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">{formatDate(feed.lastFetch)}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {feed.articlesCount}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-accent rounded">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                          <button className="p-1 hover:bg-accent rounded">
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">משתמשים</h2>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                הוסף משתמש
              </button>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-accent/30 border-b border-border">
                  <tr>
                    <th className="text-right px-6 py-3 text-sm font-medium">
                      שם משתמש
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium">אימייל</th>
                    <th className="text-right px-6 py-3 text-sm font-medium">תפקיד</th>
                    <th className="text-right px-6 py-3 text-sm font-medium">סטטוס</th>
                    <th className="text-right px-6 py-3 text-sm font-medium">
                      התחברות אחרונה
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0">
                      <td className="px-6 py-4 font-medium">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.is_active ? (
                          <span className="text-green-600 dark:text-green-400 text-sm">
                            פעיל
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400 text-sm">
                            לא פעיל
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {formatDate(user.last_login)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="px-2 py-1 text-xs border border-border rounded hover:bg-accent">
                            ערוך
                          </button>
                          <button className="px-2 py-1 text-xs border border-border rounded hover:bg-accent text-red-600">
                            מחק
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Scheduler Tab */}
        {activeTab === 'scheduler' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">מתזמנים</h2>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent">
                עצור הכל
              </button>
            </div>

            <div className="grid gap-4">
              {schedulers.map((scheduler) => (
                <div
                  key={scheduler.name}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {scheduler.displayName}
                        </h3>
                        {scheduler.enabled ? (
                          <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            פעיל
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-500/10 text-gray-600 dark:text-gray-400 text-xs rounded flex items-center gap-1">
                            <Pause className="h-3 w-3" />
                            מושהה
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">תדירות:</span>
                          <span className="font-mono mr-2">{scheduler.interval}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ריצה אחרונה:</span>
                          <span className="mr-2">{formatDate(scheduler.lastRun)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ריצה הבאה:</span>
                          <span className="mr-2">
                            {scheduler.nextRun ? formatDate(scheduler.nextRun) : 'לא מתוזמן'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {scheduler.enabled ? (
                        <button className="px-3 py-1 border border-border rounded hover:bg-accent flex items-center gap-1 text-sm">
                          <Pause className="h-3 w-3" />
                          עצור
                        </button>
                      ) : (
                        <button className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 flex items-center gap-1 text-sm">
                          <Play className="h-3 w-3" />
                          הפעל
                        </button>
                      )}
                      <button className="px-3 py-1 border border-border rounded hover:bg-accent text-sm">
                        הגדרות
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">מצב המערכת</h2>

            {/* System Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Server */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  שרת
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">זמן פעילות:</span>
                    <span className="font-medium">{systemStats.uptime}</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">שימוש בזיכרון:</span>
                      <span className="font-medium">
                        {systemStats.memory.used}MB / {systemStats.memory.total}MB
                      </span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${systemStats.memory.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-secondary" />
                  בסיס נתונים
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">גודל DB:</span>
                    <span className="font-medium">{systemStats.database.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">חיבורים פעילים:</span>
                    <span className="font-medium">
                      {systemStats.database.connections} /{' '}
                      {systemStats.database.maxConnections}
                    </span>
                  </div>
                </div>
              </div>

              {/* API */}
              <div className="bg-card border border-border rounded-lg p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  API
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-muted-foreground">בקשות (24 שעות):</span>
                    <div className="text-2xl font-bold mt-1">
                      {systemStats.api.requests24h.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">זמן תגובה ממוצע:</span>
                    <div className="text-2xl font-bold mt-1">
                      {systemStats.api.avgResponseTime}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">שגיאות (24 שעות):</span>
                    <div className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                      {systemStats.api.errors24h}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">פעולות מערכת</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                  ייצא נתונים
                </button>
                <button className="px-4 py-2 border border-border rounded hover:bg-accent">
                  נקה זיכרון מטמון
                </button>
                <button className="px-4 py-2 border border-border rounded hover:bg-accent">
                  רענן אינדקסים
                </button>
                <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-500/10">
                  אתחל שרת
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
