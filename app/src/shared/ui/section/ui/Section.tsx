import { type ReactNode } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const Section = ({ children, className = '', id, style }: SectionProps) => (
  <section id={id} className={`${styles.section} ${className}`} style={style}>
    {children}
  </section>
);

export const SectionGlow = ({ style }: { style?: React.CSSProperties }) => (
  <div className={styles.glow} style={style} />
);

export const SectionContent = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`${styles.content} ${className}`} style={style}>
    {children}
  </div>
);

export const SectionHeadline = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <h2 className={`${styles.headline} ${className}`} style={style}>
    {children}
  </h2>
);

export const SectionSubtext = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <p className={`${styles.subtext} ${className}`} style={style}>
    {children}
  </p>
);

export const SectionLabel = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <p className={`${styles.label} ${className}`} style={style}>
    {children}
  </p>
);

export const SectionGrid = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`${styles.grid} ${className}`} style={style}>
    {children}
  </div>
);
