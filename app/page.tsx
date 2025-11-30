'use client';

import { OverviewMetrics } from '@/components/dashboard/overview-metrics';
import { TimelineChart } from '@/components/charts/timeline-chart';
import { SourceComparisonChart } from '@/components/charts/source-comparison-chart';
import { CategoryChart } from '@/components/charts/category-chart';
import { Separator } from '@/components/ui/separator';
import { useDashboard } from '@/hooks/use-dashboard';

export default function Home() {
  const { data, isLoading } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time analytics and insights for your RSS articles
        </p>
      </div>

      <Separator />

      {/* Metrics Overview */}
      <OverviewMetrics />

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TimelineChart data={data?.timeline} isLoading={isLoading} />
        <SourceComparisonChart data={data?.comparison} isLoading={isLoading} />
      </div>

      <CategoryChart data={data?.categories} isLoading={isLoading} />
    </div>
  );
}
