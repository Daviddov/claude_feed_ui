'use client';

import { useDashboard } from '@/hooks/use-dashboard';
import { MetricCard } from './metric-card';
import {
  FileText,
  GitCompare,
  Radio,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';

export function OverviewMetrics() {
  const { data, isLoading } = useDashboard();

  const metrics = [
    {
      title: 'Total Articles',
      value: data?.overview.totalArticles.toLocaleString() ?? '0',
      change: data?.overview.percentageChange.articles,
      icon: FileText,
    },
    {
      title: 'Total Matches',
      value: data?.overview.totalMatches.toLocaleString() ?? '0',
      change: data?.overview.percentageChange.matches,
      icon: GitCompare,
    },
    {
      title: 'Active Sources',
      value: data?.overview.totalSources ?? 0,
      icon: Radio,
      description: 'news sources',
    },
    {
      title: 'Avg Quality Score',
      value: data?.overview.avgQualityScore
        ? `${(data.overview.avgQualityScore * 100).toFixed(1)}%`
        : 'N/A',
      icon: Star,
      description: 'similarity accuracy',
    },
    {
      title: 'New Today',
      value: data?.overview.newArticlesToday.toLocaleString() ?? '0',
      icon: TrendingUp,
      description: 'articles published',
    },
    {
      title: 'Matches Today',
      value: data?.overview.matchesToday.toLocaleString() ?? '0',
      icon: Zap,
      description: 'found today',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} isLoading={isLoading} />
      ))}
    </div>
  );
}
