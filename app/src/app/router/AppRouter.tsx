import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LoadingFallback } from '@/shared/ui';
import { ProtectedRoute } from './ProtectedRoute';

// Code-Splitted Pages
// Instead of bundling all pages together, Vite will create separate JS chunks
// for each page, significantly decreasing initial load time.
const LandingPage = lazy(() => import('@/pages/landing').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/login').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('@/pages/dashboard').then(m => ({ default: m.DashboardPage })));

export interface AppRouterProps {
  /** Environmental mouse position passed down to the Landing experience */
  readonly mousePos: { x: number; y: number };
  /** Scroll progression state passed down to synchronize internal animations */
  readonly scrollProgress: number;
}

/**
 * 🗺️ App Router
 * 
 * Central routing layer. Handles URL traversal, code-splitting resolution, 
 * and fallback states during chunk loading.
 */
export function AppRouter({ mousePos, scrollProgress }: AppRouterProps): React.JSX.Element {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage scrollProgress={scrollProgress} mousePos={mousePos} />} 
        />
        <Route 
          path="/login" 
          element={<LoginPage mousePos={mousePos} />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

