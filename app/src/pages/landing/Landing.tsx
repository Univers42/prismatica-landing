import { useRef, useState, useCallback, useEffect } from 'react';

import { StarField } from '@/shared/ui/star-field';
import { LightCursor } from '@/shared/ui/light-cursor';
import { ScrollProgress } from '@/shared/ui/scroll-progress';

import { Navbar } from '@/widgets/navbar';
import { HeroSection } from '@/widgets/hero-section';
import { RefractionSection } from '@/widgets/refraction-section';
import { GalaxySection } from '@/widgets/galaxy-section';
import { SynthesisSection } from '@/widgets/synthesis-section';

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export function Landing(): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: -500, y: -500 });
  const rawMouseRef = useRef<MousePosition>({ x: -500, y: -500 });
  const smoothMouseRef = useRef<MousePosition>({ x: -500, y: -500 });
  const rafRef = useRef<number | null>(null);

  // Smooth mouse tracking with lerp
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      rawMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handle);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const raw = rawMouseRef.current;
      const smooth = smoothMouseRef.current;
      const nx = lerp(smooth.x, raw.x, 0.1);
      const ny = lerp(smooth.y, raw.y, 0.1);
      smoothMouseRef.current = { x: nx, y: ny };
      setMousePos({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handle);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll > 0) setProgress(container.scrollTop / maxScroll);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = useCallback(() => {
    scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  return (
    <div className="landing-container">
      {/* Global persistent layers */}
      <StarField mousePos={mousePos} scrollProgress={progress} />
      <LightCursor pos={mousePos} scrollProgress={progress} />
      <Navbar />

      {/* Vertical scroll container */}
      <div ref={scrollRef} className="landing-scroll">
        <HeroSection onEnter={handleEnter} scrollProgress={progress} mousePos={mousePos} />
        <RefractionSection scrollProgress={progress} />
        <GalaxySection scrollProgress={progress} mousePos={mousePos} />
        <SynthesisSection scrollProgress={progress} />
      </div>

      <ScrollProgress progress={progress} />
    </div>
  );
}
