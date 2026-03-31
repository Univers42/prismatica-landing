import React from 'react';
import styles from './LightCursor.module.css';

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface LightCursorProps {
  readonly pos: MousePosition;
  readonly scrollProgress: number;
}

export function LightCursor({ pos, scrollProgress }: LightCursorProps): JSX.Element {
  const boost = scrollProgress * 0.7;
  const haloSize = 500 + boost * 300;
  const coreSize = 100 + boost * 60;
  const cyanAlpha = (0.06 + boost * 0.12).toFixed(3);
  const violetAlpha = (0.04 + boost * 0.08).toFixed(3);
  const magentaAlpha = (0.03 + boost * 0.06).toFixed(3);

  return (
    <div
      className={styles.cursorWrapper}
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      {/* Outermost spectral halo */}
      <div
        className={styles.spectralHalo}
        style={{
          width: haloSize,
          height: haloSize,
          left: -haloSize / 2,
          top: -haloSize / 2,
          background: `radial-gradient(circle, 
            rgba(0,229,255,${cyanAlpha}) 0%, 
            rgba(112,0,255,${violetAlpha}) 30%, 
            rgba(255,0,122,${magentaAlpha}) 55%, 
            transparent 70%)`,
        }}
      />
      {/* Mid-glow ring */}
      <div
        className={styles.midGlowRing}
        style={{
          width: coreSize * 2,
          height: coreSize * 2,
          left: -coreSize,
          top: -coreSize,
          background: `radial-gradient(circle, 
            rgba(255,255,255,${(0.1 + boost * 0.1).toFixed(3)}) 0%, 
            rgba(0,229,255,${(0.08 + boost * 0.08).toFixed(3)}) 40%, 
            transparent 70%)`,
        }}
      />
      {/* Bright inner core */}
      <div
        className={styles.innerCore}
        style={{
          width: 14,
          height: 14,
          left: -7,
          top: -7,
          background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(0,229,255,0.4) 60%, transparent 100%)`,
          boxShadow: `0 0 ${8 + boost * 16}px ${2 + boost * 6}px rgba(0,229,255,${(0.4 + boost * 0.4).toFixed(2)})`,
        }}
      />
    </div>
  );
}
