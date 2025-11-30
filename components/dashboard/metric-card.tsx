import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  isLoading?: boolean;
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  isLoading,
  description,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-3 w-20" />
        </CardContent>
      </Card>
    );
  }

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change !== undefined || description) && (
          <p className="mt-1 text-xs text-muted-foreground">
            {change !== undefined ? (
              <span
                className={cn(
                  'font-medium',
                  isPositive && 'text-green-600',
                  isNegative && 'text-red-600'
                )}
              >
                {isPositive && '+'}
                {change.toFixed(1)}%
              </span>
            ) : null}
            {description && (
              <span className={change !== undefined ? 'ml-1' : ''}>
                {description}
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
