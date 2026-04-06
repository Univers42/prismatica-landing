import { useRef, useCallback, lazy, Suspense } from 'react';
import { Navbar } from '@/widgets/navbar';
import { HeroSection } from '@/widgets/hero-section';

// Lazy load widgets that are below the fold or resource-heavy
const RefractionSection = lazy(() => import('@/widgets/refraction-section').then(m => ({ default: m.RefractionSection })));
const GalaxySection = lazy(() => import('@/widgets/galaxy-section').then(m => ({ default: m.GalaxySection })));
const SynthesisSection = lazy(() => import('@/widgets/synthesis-section').then(m => ({ default: m.SynthesisSection })));

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface LandingPageProps {
  readonly scrollProgress: number;
  readonly mousePos: MousePosition;
}

export function LandingPage({ scrollProgress, mousePos }: LandingPageProps): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

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
