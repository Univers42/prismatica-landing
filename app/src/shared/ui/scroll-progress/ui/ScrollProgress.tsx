import React from 'react';
import { SECTIONS, SECTION_COLORS, SECTION_COLORS_RGB } from '../model/constants';
import styles from './ScrollProgress.module.css';

export interface ScrollProgressProps {
  readonly progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps): React.JSX.Element {
  const activeSectionIndex = Math.min(3, Math.floor(progress * 4));

  return (
    <div className={styles.container}>
      {/* Section dots */}
      <div className={styles.dotsColumn}>
        {SECTIONS.map((name, i) => {
          const isActive = i === activeSectionIndex;
          const isPast = i < activeSectionIndex;
          return (
            <div key={name} className={styles.dotRow}>
              {isActive && (
                <span
                  className={styles.sectionLabel}
                  style={{ color: SECTION_COLORS[i] }}
                >
                  {name}
                </span>
              )}
              <div
                className={styles.dot}
                style={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  background: isActive
                    ? SECTION_COLORS[i]
                    : isPast
                    ? `rgba(${SECTION_COLORS_RGB[i]},0.4)`
                    : 'rgba(255,255,255,0.15)',
                  boxShadow: isActive
                    ? `0 0 8px 2px ${SECTION_COLORS[i]}80`
                    : 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Progress bar vertical */}
      <div className={styles.progressTrack}>
        <div
          className={`${styles.progressFill} spectrum-line`}
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
