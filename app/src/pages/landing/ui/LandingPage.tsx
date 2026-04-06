import { useRef, lazy, Suspense } from 'react';

// Domain Logic & Data Models (FSD layer internals)
import { useLandingNavigation } from '../lib/useLandingNavigation';
import type { LandingPageProps } from '../model/types';

// Widgets (FSD layer below Pages)
import { Navbar } from '@/widgets/navbar';
import { HeroSection } from '@/widgets/hero-section';

// Lazy load widgets that are below the fold or resource-heavy
const RefractionSection = lazy(() => import('@/widgets/refraction-section').then(m => ({ default: m.RefractionSection })));
const GalaxySection = lazy(() => import('@/widgets/galaxy-section').then(m => ({ default: m.GalaxySection })));
const SynthesisSection = lazy(() => import('@/widgets/synthesis-section').then(m => ({ default: m.SynthesisSection })));

/**
 * 🏔️ Landing Page (View)
 * 
 * Strict 'Page' slice orchestrator. 
 * Relies entirely on external widgets for rendering and internal hooks for logic.
 */
export function LandingPage({ scrollProgress, mousePos }: LandingPageProps): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Custom Hook: Encapsulated navigation behaviors
  const { handleEnter } = useLandingNavigation();

  return (
    <div className="landing-container">
      <Navbar />

      <div ref={scrollRef} className="landing-scroll">
        <HeroSection onEnter={handleEnter} scrollProgress={scrollProgress} mousePos={mousePos} />
        
        {/* Wrap below-the-fold sections in Suspense */}
        <Suspense fallback={<div style={{ height: '100vh' }} />}>
          <RefractionSection scrollProgress={scrollProgress} />
          <GalaxySection scrollProgress={scrollProgress} mousePos={mousePos} />
          <SynthesisSection scrollProgress={scrollProgress} />
        </Suspense>
      </div>
    </div>
  );
}
