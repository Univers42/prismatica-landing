/**
 * 🌌 Galaxy Section Data Models
 * 
 * Centralizes the TypeScript interfaces for the Galaxy physics engine.
 */

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface GalaxySectionProps {
  /** Fluid mouse coordinates (x, y) synced from external orchestrators */
  readonly mousePos: MousePosition;
  /** Decimal relative to viewport scroll progress [0.0 - 1.0] */
  readonly scrollProgress: number;
}
