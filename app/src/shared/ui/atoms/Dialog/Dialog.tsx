import { 
  useEffect, 
  useCallback, 
  useRef, 
  type ReactNode, 
  type MouseEvent as ReactMouseEvent, 
  type KeyboardEvent as ReactKeyboardEvent 
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

  // Unified backdrop logic (closes when clicking/pressing Enter/Space outside the content)
  const handleBackdropAction = useCallback(
    (e: ReactMouseEvent | ReactKeyboardEvent) => {
      // For keyboard, only trigger on Enter or Space
      if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;

      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={handleBackdropAction}
      onKeyDown={handleBackdropAction}
      role="button"
      tabIndex={-1}
      aria-label="Close dialog overlay"
    >
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
