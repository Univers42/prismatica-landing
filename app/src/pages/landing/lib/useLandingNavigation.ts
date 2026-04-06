import { useCallback } from 'react';

/**
 * 🧭 Landing Navigation Logic
 * 
 * Extracts the imperative DOM manipulation (scrolling to next sections)
 * out of the purely declarative UI components.
 */
export function useLandingNavigation() {
  /**
   * Action triggered visually by the Hero component's "Enter" CTA.
   * Smooth scrolls the payload exactly one viewport height down.
   */
  const handleEnter = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  return { handleEnter };
}
