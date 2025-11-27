import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore, useUIStore } from '@/stores';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard,
  FileText,
  GitCompare,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
} from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { usePermissions } from '@/hooks';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { theme, setTheme } = useTheme();
  const { can, hasRole } = usePermissions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    {
      name: 'דשבורד',
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
      show: true,
    },
    {
      name: 'כתבות',
      icon: FileText,
      path: ROUTES.ARTICLES,
      show: can('VIEW_ARTICLES'),
    },
    {
      name: 'התאמות',
      icon: GitCompare,
      path: ROUTES.MATCHES,
      show: can('VIEW_MATCHES'),
    },
    {
      name: 'אנליטיקה',
      icon: BarChart3,
      path: ROUTES.ANALYTICS,
      show: can('VIEW_ANALYTICS'),
    },
    {
      name: 'ניהול',
      icon: Settings,
      path: ROUTES.ADMIN,
      show: hasRole(['admin']),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-card border-l border-border flex flex-col overflow-hidden`}
      >
        {sidebarOpen && (
          <>
            {/* Logo */}
            <div className="p-6 border-b border-border">
              <h1 className="text-xl font-bold">מערכת ניתוח RSS</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems
                .filter((item) => item.show)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-right"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm">
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-muted-foreground">{user?.role}</p>
                </div>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>התנתק</span>
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">לוח בקרה</h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
