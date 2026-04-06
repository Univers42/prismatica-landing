import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AnimatedPrism } from '@/widgets/animated-prism';
import { Section, SectionGlow, SectionContent } from '@/shared/ui';
import styles from './HeroSection.module.scss';

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface HeroSectionProps {
  readonly onEnter: () => void;
  readonly mousePos: MousePosition;
  readonly scrollProgress?: number;
}

export function HeroSection({ mousePos }: HeroSectionProps): React.JSX.Element {
  const navigate = useNavigate();
  const [prismGlow, setPrismGlow] = useState(0);

  useEffect(() => {
    // Logic for glow distance calculation
    const prismX = window.innerWidth / 2;
    const prismY = window.innerHeight / 2;
    const dist = Math.hypot(mousePos.x - prismX, mousePos.y - prismY);
    const glow = Math.max(0, 1 - dist / 400);
    setPrismGlow((prev) => Math.max(prev * 0.96, glow));
  }, [mousePos]);

  const gi = prismGlow;

  return (
    <Section id="hero">
      {/* Optical grid background - kept as global or could be componentized */}
      <div className="optical-grid" />

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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className={styles.tagline}
        >
          Polymorphic Data Platform
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className={`${styles.headline} chromatic-hover`}
        >
          <span>  PRISMATICA </span>
        </motion.h1>

        {/* Prism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className={styles.prismWrapper}
        >
          <AnimatedPrism mousePos={mousePos} glowIntensity={gi} />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className={styles.subtext}
        >
          Prism your ideas:
          watch the whole spectrum unfold at will
          and reveal the power of your light
        </motion.p>

        {/* CTA */}
        <motion.button
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
        </motion.button>

        {/* Spectrum line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="spectrum-line"
        />
      </SectionContent>
    </Section>
  );
}
