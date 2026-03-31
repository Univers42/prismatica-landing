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
    x: Math.random() * w,
    y: Math.random() * h,
    baseX: 0,
    baseY: 0,
    vx: 0,
    vy: 0,
    radius: Math.random() * 1.4 + 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.35 + 0.08,
    baseAlpha: 0,
    twinkleSpeed: Math.random() * 0.015 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
    connections: [],
  };
}
