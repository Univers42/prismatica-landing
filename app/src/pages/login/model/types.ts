/**
 * 🗺️ Login Page Data Models
 * 
 * Defines the TypeScript contracts for the Login Page slice.
 */

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface LoginPageProps {
  /** Fluid mouse coordinates (x, y) synchronized from the global Orchestrator */
  readonly mousePos: MousePosition;
}
