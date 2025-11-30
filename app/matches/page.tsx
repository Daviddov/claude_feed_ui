'use client';

import { useState } from 'react';
import { useMatches } from '@/hooks/use-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { GitCompare, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function MatchesPage() {
  const [filters] = useState({
    limit: 30,
    minSimilarity: 0.7,
  });

  const { data: matches, isLoading } = useMatches(filters);

  const getSimilarityColor = (score: number) => {
    if (score >= 0.9) return 'bg-green-500';
    if (score >= 0.8) return 'bg-blue-500';
    if (score >= 0.7) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">
            Similar articles found across news sources
          </p>
        </div>
      </div>

      <Separator />

      {/* Matches List */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))
        ) : matches && matches.length > 0 ? (
          // Matches
          matches.map((match) => (
            <Card key={match.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitCompare className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base">
                      Similarity Match
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getSimilarityColor(
                        match.similarity_score
                      )}`}
                    />
                    <Badge variant="secondary">
                      {(match.similarity_score * 100).toFixed(1)}% Similar
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(match.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Article 1 */}
                {match.article1 && (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{match.article1.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {match.article1.source}
                          </Badge>
                          {match.article1.category && (
                            <Badge variant="outline" className="text-xs">
                              {match.article1.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {match.article1.url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={match.article1.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Article 2 */}
                {match.article2 && (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{match.article2.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {match.article2.source}
                          </Badge>
                          {match.article2.category && (
                            <Badge variant="outline" className="text-xs">
                              {match.article2.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {match.article2.url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={match.article2.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex h-32 items-center justify-center text-muted-foreground">
              No matches found
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More */}
      {matches && matches.length >= filters.limit && (
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  );
}
