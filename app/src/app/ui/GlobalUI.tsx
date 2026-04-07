import React from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LightCursor, ScrollProgress, StarField } from '@/shared/ui';

export interface GlobalUIProps {
  /** The current global mouse position tracked by the environment */
  readonly mousePos: { x: number; y: number };
  /** The current page scroll progress (0 to 1) */
  readonly scrollProgress: number;
}

// Routes that use the immersive landing experience
const LANDING_ROUTES: readonly string[] = ['/', '/login'];

/**
 * 🌌 Global UI Layer
 *
 * Orchestrates visual elements that exist globally and independently
 * of the core document flow or route structure.
 *
 * Landing-only effects (StarField, LightCursor, ScrollProgress) are
 * suppressed on dashboard/app routes so the workspace feels clean.
 */
export function GlobalUI({ mousePos, scrollProgress }: GlobalUIProps): React.JSX.Element {
  const { pathname } = useLocation();
  const isLandingRoute = LANDING_ROUTES.includes(pathname);

  return (
    <>
      {/* Immersive background & cursor — landing experience only */}
      {isLandingRoute && (
        <>
          <StarField mousePos={mousePos} scrollProgress={scrollProgress} />
          <LightCursor pos={mousePos} scrollProgress={scrollProgress} />
          <ScrollProgress progress={scrollProgress} />
        </>
      )}

      {/* Toast notifications — always available */}
      <Toaster position="top-center" richColors />
    </>
  );
}

