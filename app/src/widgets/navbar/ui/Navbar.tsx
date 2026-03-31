import React from 'react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

export function Navbar(): JSX.Element {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={styles.navbarContainer}
    >
      {/* Logo */}
      <div className={styles.logoWrapper}>
        <div className={styles.logoIcon}>
          <div className={styles.logoOuterBorder} />
          <div className={styles.logoInnerFill} />
        </div>
        <span className={styles.logoText}>
          Prismatica
        </span>
      </div>

      {/* Nav links */}
      <div className={styles.navLinks}>
        {['Platform', 'Features', 'Docs'].map((item) => (
          <span
            key={item}
            className={styles.navLinkItem}
          >
            {item}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button className={styles.ctaButton}>
        Get Access
      </button>
    </motion.nav>
  );
}
