export const GALAXY_IMG = 'https://media.base44.com/images/public/69cafcb4a2756f895662c19b/46de791da_generated_06a78d1c.png';
export const COLORS = ['#00E5FF', '#FF007A', '#7000FF', '#00FFD1', '#FF66C4'];

export interface StatItem {
  readonly value: string;
  readonly label: string;
  readonly color: string;
}

export const GALAXY_STATS: readonly StatItem[] = [
  { value: '∞', label: 'Views per database', color: '#00E5FF' },
  { value: '<50ms', label: 'Query response', color: '#FF007A' },
  { value: '100%', label: 'Real-time sync', color: '#7000FF' },
];

export interface GalaxyNode {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
  glowLevel: number;
  phase: number;
  speed: number;
  connections: number[];
}
