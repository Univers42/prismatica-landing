import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './Landing.module.css';

// Using FSD shared logic paths
import StarField from '@/shared/ui/star-field';
import LightCursor from '@/shared/ui/light-cursor';
import ScrollProgress from '@/shared/ui/scroll-progress';

// Using FSD widget paths
import { Navbar } from '@/widgets/navbar';
import { HeroSection } from '@/widgets/hero-section';
import RefractionSection from '@/widgets/landing-sections/refraction-section';
import GalaxySection from '@/widgets/landing-sections/galaxy-section';
import SynthesisSection from '@/widgets/landing-sections/synthesis-section';

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export function Landing(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: -500, y: -500 });
  const rawMouseRef = useRef<MousePosition>({ x: -500, y: -500 });
  const smoothMouseRef = useRef<MousePosition>({ x: -500, y: -500 });
  const rafRef = useRef<number | null>(null);

  // Track mouse globally with smooth lerp
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
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Track scroll progress
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll > 0) setProgress(container.scrollTop / maxScroll);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = useCallback(() => {
    const container = scrollRef.current;
    if (container) container.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  return (
    <div className={styles.landingContainer}>
      {/* Global persistent layers */}
      <StarField mousePos={mousePos} scrollProgress={progress} />
      <LightCursor pos={mousePos} scrollProgress={progress} />
      <Navbar />

      {/* Vertical scroll container */}
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
      >
        <HeroSection onEnter={handleEnter} scrollProgress={progress} mousePos={mousePos} />
        <RefractionSection scrollProgress={progress} />
        <GalaxySection scrollProgress={progress} mousePos={mousePos} />
        <SynthesisSection scrollProgress={progress} />
      </div>

      <ScrollProgress progress={progress} />
    </div>
  );
}
