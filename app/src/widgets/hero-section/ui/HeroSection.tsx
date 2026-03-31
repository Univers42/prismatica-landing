import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { AnimatedPrism } from '@/widgets/animated-prism';
import styles from './HeroSection.module.css';

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface HeroSectionProps {
  readonly onEnter: () => void;
  readonly mousePos: MousePosition;
  readonly scrollProgress?: number;
}

export function HeroSection({ onEnter, mousePos, scrollProgress }: HeroSectionProps): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [prismGlow, setPrismGlow] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const prismX = rect.left + rect.width / 2;
    const prismY = rect.top + rect.height / 2;
    const dist = Math.hypot(mousePos.x - prismX, mousePos.y - prismY);
    const maxDist = 400;
    const glow = Math.max(0, 1 - dist / maxDist);
    setPrismGlow(prev => Math.max(prev * 0.96, glow)); // persist + decay slowly
  }, [mousePos]);

  const glowIntensity = prismGlow;

  return (
    <section
      ref={sectionRef}
      className={styles.sectionContainer}
    >
      {/* Optical grid */}
      <div className={`${styles.opticalGrid} optical-grid`} />

      {/* Mouse-reactive ambient glow */}
      <div
        className={styles.ambientGlow}
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x}px ${mousePos.y}px, 
            rgba(0,229,255,${(0.04 + glowIntensity * 0.08).toFixed(3)}) 0%, 
            rgba(112,0,255,${(0.02 + glowIntensity * 0.04).toFixed(3)}) 40%, 
            transparent 65%)`,
        }}
      />

      <div className={styles.contentWrapper}>
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className={styles.tagline}
        >
          Polymorphic Data Platform
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className={`${styles.headline} chromatic-hover`}
        >
          <span className={styles.textForeground}>From the</span>
          <br />
          <span
            style={{
              color: `rgba(242,242,242,${0.25 + glowIntensity * 0.75})`,
              textShadow: glowIntensity > 0.1
                ? `0 0 ${40 * glowIntensity}px rgba(0,229,255,${glowIntensity * 0.6}), 0 0 ${80 * glowIntensity}px rgba(112,0,255,${glowIntensity * 0.3})`
                : 'none',
              transition: 'color 0.3s, text-shadow 0.3s',
            }}
          >
            darkness
          </span>
          <span className={styles.textForeground}> of raw data</span>
        </motion.h1>

        {/* Animated Prism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className={styles.prismWrapper}
        >
          <AnimatedPrism mousePos={mousePos} glowIntensity={glowIntensity} />
        </motion.div>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className={styles.subText}
        >
          A prism that refracts your raw ideas into a manageable spectrum — revealing connections you never knew existed.
        </motion.p>

        {/* Enter CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          onClick={onEnter}
          whileHover={{ scale: 1.04 }}
          className={`group ${styles.ctaButton}`}
          style={{
            borderColor: `rgba(0,229,255,${0.1 + glowIntensity * 0.4})`,
            boxShadow: `0 0 ${20 + glowIntensity * 40}px rgba(0,229,255,${0.03 + glowIntensity * 0.12})`,
          }}
        >
          <span className={styles.ctaText}>
            Enter the spectrum
          </span>
          <ChevronRight className={styles.ctaIcon} />
        </motion.button>

        {/* Spectrum line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className={`${styles.spectrumLine} spectrum-line`}
        />
      </div>
    </section>
  );
}
