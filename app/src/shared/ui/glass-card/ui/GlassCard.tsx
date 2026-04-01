import React, { type ReactNode } from 'react';
import styles from './GlassCard.module.scss';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  variant?: 'ios' | 'default';
}

export function GlassCard({ 
  children, 
  className = '', 
  variant = 'ios',
  ...props 
}: GlassCardProps): React.JSX.Element {
  const cardClasses = [
    styles.glassCard,
    variant === 'ios' ? styles.glassCardIos : '',
    className
  ].join(' ').trim();

  return (
    <motion.div 
      className={cardClasses}
      {...props}
    >
      <div className={styles.glassReflection} />
      {children}
    </motion.div>
  );
}
