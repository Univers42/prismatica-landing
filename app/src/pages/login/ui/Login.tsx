import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarField } from '@/shared/ui/star-field';
import { LightCursor } from '@/shared/ui/light-cursor';
import { AuthForm } from '@/features/auth';
import styles from './Login.module.scss';

interface MousePosition {
  x: number;
  y: number;
}

export function Login(): React.JSX.Element {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: -500, y: -500 });
  const rawMouseRef = useRef<MousePosition>({ x: -500, y: -500 });
  const smoothMouseRef = useRef<MousePosition>({ x: -500, y: -500 });
  const rafRef = useRef<number | null>(null);

  // Smooth mouse tracking (same as landing for consistency)
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

  return (
    <div className={styles.loginPage}>
      {/* Global Background Layers */}
      <StarField 
        mousePos={mousePos} 
        scrollProgress={0} 
        density={0.4} 
        className={styles.loginStarField} 
      />
      <LightCursor pos={mousePos} scrollProgress={0} />

      {/* Left side: Content & Form */}
      <div className={styles.leftSide}>
        <motion.div 
          className={styles.logoContainer}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon} />
            <span>Prismatica</span>
          </Link>
        </motion.div>

        <div className={styles.formWrapper}>
          <AuthForm />
        </div>

        <div className={styles.footer}>
          <span>&copy; 2026 Prismatica Engineering. All rights reserved.</span>
        </div>
      </div>

      {/* Right side: Visual Panel (now transparent to show global stars) */}
      <div className={styles.rightSide}>
        <div className={styles.visualContainer}>
          <div className={styles.vignette} />
          
          <motion.div 
            className={styles.centerGlow}
            style={{
              background: `radial-gradient(circle at ${mousePos.x - (window.innerWidth / 2)}px ${mousePos.y}px, 
                rgba(0, 229, 255, 0.08) 0%, 
                rgba(112, 0, 255, 0.03) 45%, 
                transparent 70%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
