import React, { type ReactNode } from 'react';
import styles from './GlassCard.module.scss';
import { m, type HTMLMotionProps } from 'framer-motion';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  glowColor?: string;
  rays?: { angle: number; color: string; height: number }[];
  className?: string;
  variant?: 'ios' | 'default';
}

export function GlassCard({ 
  children, 
  title,
  subtitle,
  description,
  glowColor,
  rays = [],
  className = '', 
  variant = 'ios',
  ...props 
}: GlassCardProps): React.JSX.Element {
  const cardClasses = `${styles.glassCard} ${variant === 'ios' ? styles.glassCardIos : ''} ${className}`.trim();

  return (
    <m.div 
      className={cardClasses}
      style={{
        ...props.style,
        '--glow-color': glowColor || 'rgba(0,229,255,0.2)',
      } as React.CSSProperties}
      {...props}
    >
      <div className={styles.glassReflection} />
      
      {/* Rays */}
      <div className={styles.raysContainer}>
        {rays.map((ray, i) => (
          <m.div
            key={i}
            className={styles.ray}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: ray.height }}
            transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
            style={{
              transform: `rotate(${ray.angle}deg)`,
              backgroundColor: ray.color,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </m.div>
  );
}
