import { lazy, Suspense } from 'react';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// FSD Models
import type { HeroSectionProps } from '../model/types';

// FSD Logic
import { useHeroGlow } from '../lib/useHeroGlow';

// Shared UI Elements
import { Section, SectionGlow, SectionContent } from '@/shared/ui';

// Presentation Styles
import styles from './HeroSection.module.scss';

// Lazy load the prism canvas widget
const AnimatedPrism = lazy(() => import('@/widgets/animated-prism').then(m => ({ default: m.AnimatedPrism })));

/**
 * 🏔️ Hero Section (Widget)
 * 
 * Strict 'Widget' slice.
 * The primary entry view of the application.
 */
export function HeroSection({ mousePos }: HeroSectionProps): React.JSX.Element {
  const navigate = useNavigate();
  const gi = useHeroGlow(mousePos);

  return (
    <Section id="hero">
      {/* Optical grid background - Extracted from Global CSS */}
      <div className={styles.opticalGrid} />

      {/* Mouse-reactive ambient glow */}
      <SectionGlow
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x}px ${mousePos.y}px,
            rgba(0,229,255,${(0.04 + gi * 0.08).toFixed(3)}) 0%,
            rgba(112,0,255,${(0.02 + gi * 0.04).toFixed(3)}) 40%,
            transparent 65%)`,
        }}
      />

      <SectionContent className={styles.heroContainer}>
        {/* Tagline */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className={styles.tagline}
        >
          Polymorphic Data Platform
        </m.p>

        {/* Headline */}
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className={`${styles.headline} ${styles.chromaticHover}`}
        >
          <span>  PRISMATICA </span>
        </m.h1>

        {/* Prism Layer with Suspense */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className={styles.prismWrapper}
        >
          <Suspense fallback={<div className={styles.prismPlaceholder} />}>
            <AnimatedPrism mousePos={mousePos} glowIntensity={gi} />
          </Suspense>
        </m.div>

        {/* Subtext */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className={styles.subtext}
        >
          Prism your ideas:
          watch the whole spectrum unfold at will
          and reveal the power of your light
        </m.p>

        {/* CTA */}
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          onClick={() => navigate('/login')}
          whileHover={{ scale: 1.04 }}
          className={styles.cta}
          style={{
            borderColor: `rgba(0,229,255,${0.1 + gi * 0.4})`,
            boxShadow: `0 0 ${20 + gi * 40}px rgba(0,229,255,${0.03 + gi * 0.12})`,
          }}
        >
          Enter the spectrum
          <ChevronRight size={16} />
        </m.button>

        {/* Spectrum line - Restored from Global CSS */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className={styles.spectrumLine}
        />
      </SectionContent>
    </Section>
  );
}
