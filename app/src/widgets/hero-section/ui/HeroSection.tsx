import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AnimatedPrism } from '@/widgets/animated-prism';

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
  const sectionRef = useRef<HTMLElement>(null);
  const [prismGlow, setPrismGlow] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const prismX = rect.left + rect.width / 2;
    const prismY = rect.top + rect.height / 2;
    const dist = Math.hypot(mousePos.x - prismX, mousePos.y - prismY);
    const glow = Math.max(0, 1 - dist / 400);
    setPrismGlow((prev) => Math.max(prev * 0.96, glow));
  }, [mousePos]);

  const gi = prismGlow;

  return (
    <section ref={sectionRef} className="prisma-section">
      {/* Optical grid background */}
      <div className="optical-grid" />

      {/* Mouse-reactive ambient glow */}
      <div
        className="prisma-section__glow"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x}px ${mousePos.y}px,
            rgba(0,229,255,${(0.04 + gi * 0.08).toFixed(3)}) 0%,
            rgba(112,0,255,${(0.02 + gi * 0.04).toFixed(3)}) 40%,
            transparent 65%)`,
        }}
      />

      <div className="prisma-section__content">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="hero__tagline"
        >
          Polymorphic Data Platform
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="hero__headline chromatic-hover"
        >
          <span>  PRISMATICA </span>
        </motion.h1>

        {/* Prism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="hero__prism-wrapper"
        >
          <AnimatedPrism mousePos={mousePos} glowIntensity={gi} />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="hero__subtext"
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
          className="hero__cta"
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
      </div>
    </section>
  );
}
