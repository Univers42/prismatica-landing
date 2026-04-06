import React from 'react';
import styles from './LoadingFallback.module.scss';
import { m } from 'framer-motion';

export function LoadingFallback(): React.JSX.Element {
  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.loadingContainer}
    >
      <div className={styles.spinner} />
      <span className={styles.label}>Synchronizing spectrum...</span>
    </m.div>
  );
}
