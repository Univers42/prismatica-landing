import { safeRandom } from '@/shared/lib/crypto';

export const COLORS: readonly string[] = ['#00E5FF', '#FF007A', '#7000FF', '#00BFFF', '#FF66C4', '#9933FF', '#00FFD1'];
export const NUM_STARS = 220;

export interface StarNode {
  readonly id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  readonly radius: number;
  readonly color: string;
  readonly alpha: number;
  baseAlpha: number;
  readonly twinkleSpeed: number;
  readonly twinkleOffset: number;
  readonly connections: number[];
}

export function createStar(w: number, h: number, i: number): StarNode {
  return {
    id: i,
    x: safeRandom() * w,
    y: safeRandom() * h,
    baseX: 0,
    baseY: 0,
    vx: 0,
    vy: 0,
    radius: safeRandom() * 1.4 + 0.3,
    color: COLORS[Math.floor(safeRandom() * COLORS.length)],
    alpha: safeRandom() * 0.35 + 0.08,
    baseAlpha: 0,
    twinkleSpeed: safeRandom() * 0.015 + 0.005,
    twinkleOffset: safeRandom() * Math.PI * 2,
    connections: [],
  };
}
