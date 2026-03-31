import { LucideIcon } from 'lucide-react';

export interface ColorValue {
  readonly hex: string;
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export const COLOR_VALUES: Readonly<Record<string, ColorValue>> = {
  cyan: { hex: '#00E5FF', r: 0, g: 229, b: 255 },
  magenta: { hex: '#FF007A', r: 255, g: 0, b: 122 },
  violet: { hex: '#7000FF', r: 112, g: 0, b: 255 },
};
