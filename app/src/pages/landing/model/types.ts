/**
 * 🗺️ Landing Page Data Models
 * 
 * Defines the TypeScript contracts for the Landing Page slice.
 * Following strictly FSD, all domain-specific interfaces live in the `model/` layer.
 */

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface LandingPageProps {
  /** Scroll progress ratio (0 to 1) synchronized from the global Orchestrator */
  readonly scrollProgress: number;
  /** Fluid mouse coordinates (x, y) synchronized from the global Orchestrator */
  readonly mousePos: MousePosition;
}
