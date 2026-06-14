import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoute';
import ProtectedLayout from '../components/layout/ProtectedLayout';

const Auth = lazy(() => import('../pages/Auth'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));

interface AppRoutesProps {
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
}

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      px: 4,
    }}
  >
    <Typography variant="h4" sx={{ color: '#c9d1d9', mb: 2 }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ color: '#8b949e' }}>
      This page is under construction
    </Typography>
  </Box>
);

const AppRoutes: React.FC<AppRoutesProps> = ({ sidebarCollapsed, onToggleCollapse }) => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <Dashboard />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Search" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Create" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/flags"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Flags" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/overview"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Organization Overview" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/users"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Users" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/environments"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Environments" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/settings"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Organization Settings" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics/dashboard"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Analytics Dashboard" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics/usage-reports"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Usage Reports" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics/performance-metrics"
            element={
              <ProtectedRoute>
                <ProtectedLayout
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleCollapse={onToggleCollapse}
                >
                  <PlaceholderPage title="Performance Metrics" />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/search" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
