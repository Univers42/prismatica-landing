// FSD Models
import type { AnimatedPrismProps } from '../model/types';

// FSD Logic
import { usePrismCanvas } from '../lib/usePrismCanvas';

// Presentation Styles
import styles from './AnimatedPrism.module.scss';

/**
 * 🏔️ Animated Prism (Widget)
 * 
 * Strict 'Widget' slice.
 * Purely declarative presentation of the Prism 2D Canvas.
 * All requestAnimationFrame loops and raytracing mathematics are 
 * aggressively abstracted into `usePrismCanvas`.
 */
export function AnimatedPrism({ mousePos, glowIntensity }: AnimatedPrismProps): React.JSX.Element {
  // Delegate all imperative canvas rendering logic to the dedicated hook
  const canvasRef = usePrismCanvas(mousePos, glowIntensity);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvasLayer}
    />
  );
}
