import { useAuthStore } from '@/stores';
import { useStats } from '@/api/queries';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: stats, isLoading } = useStats();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          שלום, {user?.username}!
        </h1>
        <p className="text-muted-foreground">
          ברוך הבא למערכת ניתוח RSS
        </p>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              סה"כ כתבות
            </h3>
            <p className="text-3xl font-bold">
              {stats?.totalArticles?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              סה"כ התאמות
            </h3>
            <p className="text-3xl font-bold">
              {stats?.totalMatches?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              כתבות חדשות היום
            </h3>
            <p className="text-3xl font-bold">
              {stats?.newArticlesToday?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              קטגוריות
            </h3>
            <p className="text-3xl font-bold">
              {stats?.categoriesCount?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold mb-4">מידע על המערכת</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">תפקיד:</span>
            <span className="font-medium">{user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">אימייל:</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">API:</span>
            <span className="font-medium text-green-600 dark:text-green-400">
              ✓ מחובר
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
