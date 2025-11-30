'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  GitCompare,
  TrendingUp,
  BarChart3,
  Tags,
  Settings,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Articles',
    href: '/articles',
    icon: FileText,
  },
  {
    title: 'Matches',
    href: '/matches',
    icon: GitCompare,
  },
  {
    title: 'Timeline',
    href: '/timeline',
    icon: TrendingUp,
  },
  {
    title: 'Sources',
    href: '/sources',
    icon: BarChart3,
  },
  {
    title: 'Categories',
    href: '/categories',
    icon: Tags,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Logo/Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">RSS Analytics</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          <p>Real-time updates</p>
          <p className="mt-1 flex items-center gap-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Connected
          </p>
        </div>
      </div>
    </div>
  );
}
