import { m } from 'framer-motion';

// FSD Models
import { GALAXY_IMG, GALAXY_STATS } from '../model/constants';
import type { GalaxySectionProps } from '../model/types';

// FSD Logic
import { useGalaxyCanvas } from '../lib/useGalaxyCanvas';

// Shared UI Elements
import { Section, SectionContent, SectionHeadline, SectionSubtext, SectionLabel } from '@/shared/ui';

// Presentation Styles
import styles from './GalaxySection.module.scss';

/**
 * 🌌 Galaxy Section (Widget)
 * 
 * Strict 'Widget' slice.
 * Declarative wrapper for the Node Physics engine.
 * Renders the canvas background overlaid with statistics and copy.
 */
export function GalaxySection({ mousePos, scrollProgress }: GalaxySectionProps): React.JSX.Element {
  // Delegate all imperative canvas physics to the logic layer
  const canvasRef = useGalaxyCanvas(mousePos);

  return (
    <Section className={styles.sectionContainer}>
      {/* Background image */}
      <div className={styles.backgroundWrapper}>
        <img
          src={GALAXY_IMG}
          alt="Galaxy"
          className={styles.galaxyImage}
          style={{ opacity: 0.08 + scrollProgress * 0.12 }}
        />
        <div className={styles.gradientOverlay} />
      </div>

      {/* Interactive node canvas */}
      <canvas
        ref={canvasRef}
        className={styles.canvasLayer}
      />

      {/* Content overlay */}
      <SectionContent className={styles.contentOverlay}>
        <SectionLabel>
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            The Galaxy
          </m.span>
        </SectionLabel>

        <SectionHeadline className={styles.headline}>
          <m.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            A universe of connections like you<br />never saw before
          </m.span>
        </SectionHeadline>

        <SectionSubtext className={styles.description}>
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            When your raw data passes through the prism of structure, insights illuminate, and what was invisible becomes your competitive advantage.
          </m.span>
        </SectionSubtext>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className={styles.statsContainer}
        >
          {GALAXY_STATS.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <p
                className={styles.statValue}
                style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}60` }}
              >
                {stat.value}
              </p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </m.div>
      </SectionContent>
    </Section>
  );
}
