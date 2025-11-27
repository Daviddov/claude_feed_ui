import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ROUTES } from './config/routes';
import { useAuthStore } from './stores';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ArticlesPage from './pages/articles/ArticlesPage';
import MatchesPage from './pages/matches/MatchesPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import AdminPage from './pages/admin/AdminPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />

      <Routes>
        {/* Public Route - Login */}
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirect root to dashboard */}
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />

          {/* Dashboard */}
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          {/* Articles */}
          <Route path={ROUTES.ARTICLES} element={<ArticlesPage />} />

          {/* Matches */}
          <Route path={ROUTES.MATCHES} element={<MatchesPage />} />

          {/* Analytics - Protected for editor, admin, analyst */}
          <Route
            path={ROUTES.ANALYTICS}
            element={
              <ProtectedRoute requiredRoles={['editor', 'admin', 'analyst']}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin - Protected for admin only */}
          <Route
            path={ROUTES.ADMIN}
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Unauthorized */}
        <Route
          path={ROUTES.UNAUTHORIZED}
          element={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">403</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  אין לך הרשאה לצפות בדף זה
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  חזור אחורה
                </button>
              </div>
            </div>
          }
        />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  הדף לא נמצא
                </p>
                <a
                  href={ROUTES.DASHBOARD}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 inline-block"
                >
                  חזור לדף הבית
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
