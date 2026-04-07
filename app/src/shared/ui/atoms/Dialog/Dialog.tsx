import { 
  useEffect, 
  useCallback, 
  useRef, 
  type ReactNode,
} from 'react';
import styles from './Dialog.module.scss';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Dialog({ open, onClose, title, size = 'md', children }: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

return (
    <div className={styles.overlay}>
      <button 
        type="button"
        className={styles.backdropButton}
        onClick={onClose}
        aria-label="Close dialog"
        tabIndex={-1}
      />

      <div
        ref={contentRef}
        className={`${styles.dialog} ${styles[size]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className={styles.header}>
          {title && (
            <h3 id="dialog-title" className={styles.title}>
              {title}
            </h3>
          )}
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}