import { useRef, useCallback } from 'react';
import { Navbar } from '@/widgets/navbar';
import { HeroSection } from '@/widgets/hero-section';
import { RefractionSection } from '@/widgets/refraction-section';
import { GalaxySection } from '@/widgets/galaxy-section';
import { SynthesisSection } from '@/widgets/synthesis-section';

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
        <RefractionSection scrollProgress={scrollProgress} />
        <GalaxySection scrollProgress={scrollProgress} mousePos={mousePos} />
        <SynthesisSection scrollProgress={scrollProgress} />
      </div>
    </div>
  );
}
