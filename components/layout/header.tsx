'use client';

import { useStats } from '@/hooks/use-dashboard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';

export function Header() {
  const { data: stats, isLoading } = useStats();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
          </>
        ) : (
          <>
            <Badge variant="secondary" className="text-sm">
              {stats?.totalArticles.toLocaleString()} Articles
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {stats?.totalMatches.toLocaleString()} Matches
            </Badge>
            <Badge variant="outline" className="text-sm">
              {stats?.sources} Sources
            </Badge>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
    </header>
  );
}
