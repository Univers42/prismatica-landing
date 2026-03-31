import React from 'react';
import { motion } from 'framer-motion';
import { features } from '../model/features';
import PrismCard from './PrismCard';
import styles from './RefractionSection.module.css';

export interface RefractionSectionProps {
  readonly scrollProgress: number;
}

export function RefractionSection({ scrollProgress }: RefractionSectionProps): JSX.Element {
  const brightness = Math.min(1, Math.max(0, (scrollProgress - 0.2) * 2));

  return (
    <section className={styles.sectionContainer}>
      <div
        className={styles.ambientGlow}
        style={{
          background: `radial-gradient(ellipse at 50% 50%, 
            rgba(0,229,255,${brightness * 0.04}) 0%, 
            rgba(112,0,255,${brightness * 0.025}) 40%, 
            transparent 70%)`,
        }}
      />

      {/* Section header */}
      <div className={styles.headerContainer}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={styles.subtitle}
        >
          The Refraction
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`${styles.headline} chromatic-hover`}
        >
          Data through the prism
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className={styles.description}
        >
          Each facet of Prismatica transforms your raw data into a distinct, actionable spectrum.
        </motion.p>
      </div>

      {/* Feature cards grid */}
      <div className={styles.gridContainer}>
        {features.map((feature, i) => (
          <PrismCard key={i} {...feature} index={i} />
        ))}
      </div>
    </section>
  );
}
