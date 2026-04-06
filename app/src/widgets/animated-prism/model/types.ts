/**
 * 🗺️ Animated Prism Data Models
 * 
 * Centralizes the TypeScript interfaces for the animated canvas capabilities.
 */

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface AnimatedPrismProps {
  /** Fluid mouse coordinates (x, y) synced from external orchestrators */
  readonly mousePos: MousePosition;
  /** Opacity/Glow scalar (0 to 1) applied to the dynamic lights */
  readonly glowIntensity: number;
}
