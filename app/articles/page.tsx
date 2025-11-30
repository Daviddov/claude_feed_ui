'use client';

import { useState } from 'react';
import { useArticles } from '@/hooks/use-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ExternalLink, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ArticlesPage() {
  const [filters] = useState({
    limit: 50,
  });

  const { data: articles, isLoading } = useArticles(filters);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">
            Browse and search through all RSS articles
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Separator />

      {/* Articles List */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))
        ) : articles && articles.length > 0 ? (
          // Articles
          articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary">{article.source}</Badge>
                      {article.category && (
                        <Badge variant="outline">{article.category}</Badge>
                      )}
                      {article.is_new && (
                        <Badge variant="default">New</Badge>
                      )}
                      <span>•</span>
                      <span>
                        {article.published
                          ? formatDistanceToNow(new Date(article.published), {
                              addSuffix: true,
                            })
                          : formatDistanceToNow(new Date(article.created_at), {
                              addSuffix: true,
                            })}
                      </span>
                      {article.word_count && (
                        <>
                          <span>•</span>
                          <span>{article.word_count} words</span>
                        </>
                      )}
                    </div>
                  </div>
                  {article.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="shrink-0"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex h-32 items-center justify-center text-muted-foreground">
              No articles found
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More */}
      {articles && articles.length >= filters.limit && (
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  );
}
