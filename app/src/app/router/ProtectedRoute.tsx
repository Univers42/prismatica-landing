import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '@/features/auth';
import { LoadingFallback } from '@/shared/ui';

interface ProtectedRouteProps {
  /** The private content to render when the user is authenticated. */
  readonly children: React.ReactNode;
}

/**
 * 🔐 ProtectedRoute
 *
 * Gate component for private routes. Reads the Zustand auth status and
 * decides what to render:
 *
 * | Status            | Outcome                              |
 * |-------------------|--------------------------------------|
 * | LOADING / IDLE    | Full-screen spinner (session check)  |
 * | AUTHENTICATED     | Renders children                     |
 * | ERROR / other     | Hard redirect to /login              |
 */
export function ProtectedRoute({ children }: ProtectedRouteProps): React.JSX.Element {
  const status = useAuthStatus();

  if (status === 'CHECKING' || status === 'LOADING') {
    // initialize() is still running — avoid a flash redirect.
    return <LoadingFallback />;
  }

  if (status !== 'AUTHENTICATED') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
