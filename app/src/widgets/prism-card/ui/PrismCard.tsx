import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { COLOR_VALUES } from '../model/constants';
import styles from './PrismCard.module.css';

export interface FeatureSpec {
  readonly label: string;
  readonly detail: string;
}

export interface PrismCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly specs: readonly FeatureSpec[];
  readonly index: number;
}

export function PrismCard({ title, subtitle, description, icon: Icon, color, specs, index }: PrismCardProps): JSX.Element {
  const [showSpecs, setShowSpecs] = useState(false);
  const [glowLevel, setGlowLevel] = useState(0);
  const glowRef = useRef<number>(0);
  const decayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const c = COLOR_VALUES[color] || COLOR_VALUES.cyan;
  const { r, g, b, hex } = c;

  const startDecay = () => {
    if (decayRef.current) clearInterval(decayRef.current);
    decayRef.current = setInterval(() => {
      glowRef.current = Math.max(0, glowRef.current - 0.008);
      setGlowLevel(glowRef.current);
      if (glowRef.current <= 0 && decayRef.current) clearInterval(decayRef.current);
    }, 30);
  };

  const handleMouseEnter = () => {
    if (decayRef.current) clearInterval(decayRef.current);
    glowRef.current = Math.min(1, glowRef.current + 0.35);
    setGlowLevel(glowRef.current);
  };

  const handleMouseMove = () => {
    if (decayRef.current) clearInterval(decayRef.current);
    glowRef.current = Math.min(1, glowRef.current + 0.015);
    setGlowLevel(glowRef.current);
  };

  const handleMouseLeave = () => {
    startDecay();
  };

  const glow = glowLevel;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: index * 0.12 }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={styles.cardContainer}
        style={{
          background: `rgba(${r}, ${g}, ${b}, ${0.02 + glow * 0.06})`,
          border: `1px solid rgba(${r}, ${g}, ${b}, ${0.08 + glow * 0.35})`,
          boxShadow: glow > 0.05
            ? `0 0 ${20 + glow * 60}px rgba(${r}, ${g}, ${b}, ${glow * 0.2}), 
               0 0 ${60 + glow * 120}px rgba(${r}, ${g}, ${b}, ${glow * 0.08}),
               inset 0 0 ${30 + glow * 60}px rgba(${r}, ${g}, ${b}, ${glow * 0.04})`
            : 'none',
        }}
      >
        {/* Top inner glow strip */}
        <div
          className={styles.topGlowStrip}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},${0.2 + glow * 0.8}), transparent)`,
          }}
        />

        {/* Index marker + Icon */}
        <div className={styles.headerRow}>
          <span className={styles.indexMarker} style={{ color: `rgba(242,242,242,${0.2 + glow * 0.4})` }}>
            0{index + 1}
          </span>
          <div
            className={styles.iconWrapper}
            style={{
              background: `rgba(${r},${g},${b},${0.08 + glow * 0.18})`,
              boxShadow: glow > 0.1 ? `0 0 ${10 + glow * 20}px rgba(${r},${g},${b},${glow * 0.4})` : 'none',
            }}
          >
            <Icon
              className={styles.iconElement}
              style={{
                color: hex,
                filter: glow > 0.1 ? `drop-shadow(0 0 ${4 + glow * 8}px ${hex})` : 'none',
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentBody}>
          <p
            className={styles.subtitleText}
            style={{ color: `rgba(${r},${g},${b},${0.6 + glow * 0.4})` }}
          >
            {subtitle}
          </p>
          <h3
            className={styles.titleText}
            style={{
              color: `rgba(242,242,242,${0.75 + glow * 0.25})`,
              textShadow: glow > 0.2
                ? `-1px 0 rgba(${r},${g},${b},${glow * 0.3}), 1px 0 rgba(255,0,122,${glow * 0.2})`
                : 'none',
            }}
          >
            {title}
          </h3>
          <p
            className={styles.descriptionText}
            style={{ color: `rgba(160,160,180,${0.6 + glow * 0.4})` }}
          >
            {description}
          </p>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <div
            className={styles.dividerLine}
            style={{
              background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},${0.15 + glow * 0.6}), transparent)`,
            }}
          />
          <button
            onClick={() => setShowSpecs(true)}
            className={styles.specsButton}
            style={{ color: `rgba(${r},${g},${b},${0.4 + glow * 0.6})` }}
          >
            Technical Specs →
          </button>
        </div>
      </motion.div>

      <Dialog open={showSpecs} onOpenChange={setShowSpecs}>
        <DialogContent className="bg-card border-border/50 max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-inter text-xl text-foreground flex items-center gap-3">
              <Icon style={{ color: hex }} className={styles.iconElement} />
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {specs?.map((spec, i) => (
              <div key={i} className={styles.specRow}>
                <span className={styles.specBullet} style={{ color: hex }}>▸</span>
                <div>
                  <p className={styles.specLabel}>{spec.label}</p>
                  <p className={styles.specDetail}>{spec.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
