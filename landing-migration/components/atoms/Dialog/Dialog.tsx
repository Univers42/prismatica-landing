import { useEffect, useCallback, useRef, type ReactNode } from 'react';

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

  // Close on backdrop click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div className="prisma-dialog-overlay" onClick={handleOverlayClick}>
      <div
        ref={contentRef}
        className={`prisma-dialog prisma-dialog--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="prisma-dialog__header">
          {title && <h3 className="prisma-dialog__title">{title}</h3>}
          <button
            className="prisma-dialog__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <div className="prisma-dialog__body">{children}</div>
      </div>
    </div>
  );
}
