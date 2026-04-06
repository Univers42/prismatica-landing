import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

// FSD Models
import type { LoginPageProps } from '../model/types';

// Features (FSD layer below Pages)
import { AuthForm } from '@/features/auth';

// Presentation Styles
import styles from './Login.module.scss';

/**
 * 🏔️ Login Page (View)
 * 
 * Strict 'Page' slice orchestrator for authentication.
 * Uses global interactions (mousePos) from the App Orchestrator.
 */
export function LoginPage({ mousePos }: LoginPageProps): React.JSX.Element {
  return (
    <div className={styles.loginPage}>
      {/* 
        Note: Global Background Layers (StarField, LightCursor) 
        are deliberately omitted here. They are rendered globally by 
        <GlobalUI /> in the root App.tsx orchestrator to avoid duplication.
      */}

      {/* Left side: Content & Form */}
      <div className={styles.leftSide}>
        <m.div 
          className={styles.logoContainer}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon} />
            <span>Prismatica</span>
          </Link>
        </m.div>

        <div className={styles.formWrapper}>
          <AuthForm />
        </div>

        <div className={styles.footer}>
          <span>&copy; 2026 Prismatica Engineering. All rights reserved.</span>
        </div>
      </div>

      {/* Right side: Visual Panel */}
      <div className={styles.rightSide}>
        <div className={styles.visualContainer}>
          <div className={styles.vignette} />
          
          <m.div 
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
