/**
 * 🏔️ Hero Section Data Models
 * 
 * Defines the public interfaces for the main entry point widget.
 */

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface HeroSectionProps {
  /** Fluid mouse coordinates (x, y) synced from the global App Orchestrator */
  readonly mousePos: MousePosition;
  /** Decimal relative to viewport scroll progress [0.0 - 1.0] */
  readonly scrollProgress?: number;
  /** Callback fired when navigating or interacting heavily */
  readonly onEnter: () => void;
}
