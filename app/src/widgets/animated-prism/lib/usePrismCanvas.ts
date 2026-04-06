import { useRef, useEffect } from 'react';
import type { MousePosition } from '../model/types';

/**
 * 🎨 Prism Canvas Rendering Engine
 * 
 * Extracts all the 2D Raytracing, matrix geometry, and requestAnimationFrame 
 * rendering loop from the declaritve UI layer.
 */
export function usePrismCanvas(mousePos: MousePosition, glowIntensity: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const mousePosRef = useRef<MousePosition>(mousePos);

  // Sync latest react-state into a mutable ref to avoid destroying the rAF loop
  useEffect(() => { 
    mousePosRef.current = mousePos; 
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const SIZE = 320;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const cx = SIZE / 2;
    const cy = SIZE / 2 + 20;

    // Prism triangle vertices (equilateral)
    const H = 210;
    const W = H * (2 / Math.sqrt(3));
    const apex = { x: cx, y: cy - H * 0.6 };
    const bl   = { x: cx - W / 2, y: cy + H * 0.4 };
    const br   = { x: cx + W / 2, y: cy + H * 0.4 };

    const draw = () => {
      frameRef.current++;
      const f = frameRef.current;
      ctx.clearRect(0, 0, SIZE, SIZE);

      const t = f * 0.012;
      const gi = glowIntensity || 0;

      // --- Animated refracted rays ---
      const rays = [
        { color: '#00E5FF', angle: 0.38 + Math.sin(t * 0.7) * 0.04, alpha: 0.55 + gi * 0.3 },
        { color: '#00FFD1', angle: 0.46 + Math.sin(t * 0.5 + 1) * 0.03, alpha: 0.4 + gi * 0.25 },
        { color: '#7000FF', angle: 0.54 + Math.sin(t * 0.9 + 2) * 0.04, alpha: 0.45 + gi * 0.28 },
        { color: '#FF007A', angle: 0.63 + Math.sin(t * 0.6 + 3) * 0.035, alpha: 0.38 + gi * 0.22 },
        { color: '#FF66C4', angle: 0.71 + Math.sin(t * 0.8 + 4) * 0.03, alpha: 0.3 + gi * 0.2 },
      ];

      // Entry ray (from left)
      const entryX = bl.x + (br.x - bl.x) * 0.28;
      const entryY = bl.y;
      const internalX = cx - 18 + Math.sin(t * 0.4) * 6;
      const internalY = apex.y + (bl.y - apex.y) * 0.55;

      // Draw entry ray
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, entryY - 30);
      ctx.lineTo(entryX, entryY);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 8]);
      ctx.globalAlpha = 0.4 + gi * 0.3;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Draw exit rays (fan from right face)
      const exitX = br.x - (br.x - cx) * 0.3;
      const exitY = br.y - (br.y - apex.y) * 0.38 + Math.sin(t * 0.3) * 4;

      rays.forEach((ray, i) => {
        const len = 130 + i * 18;
        const dx = Math.cos(ray.angle) * len;
        const dy = -Math.sin(ray.angle) * len * 0.6;

        const grad = ctx.createLinearGradient(exitX, exitY, exitX + dx, exitY + dy);
        grad.addColorStop(0, ray.color);
        grad.addColorStop(1, `${ray.color}00`);

        ctx.beginPath();
        ctx.moveTo(exitX, exitY);
        ctx.lineTo(exitX + dx, exitY + dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5 - i * 0.25;
        ctx.globalAlpha = ray.alpha;
        ctx.stroke();
      });

      // --- Prism fill (glass-like) ---
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(apex.x, apex.y);
      ctx.lineTo(bl.x, bl.y);
      ctx.lineTo(br.x, br.y);
      ctx.closePath();

      const glassGrad = ctx.createLinearGradient(bl.x, bl.y, br.x, apex.y);
      glassGrad.addColorStop(0,   `rgba(0,229,255,${0.04 + gi * 0.06})`);
      glassGrad.addColorStop(0.4, `rgba(112,0,255,${0.03 + gi * 0.05})`);
      glassGrad.addColorStop(1,   `rgba(255,0,122,${0.02 + gi * 0.04})`);
      ctx.fillStyle = glassGrad;
      ctx.globalAlpha = 1;
      ctx.fill();

      // --- Prism edges ---
      const edgeAlpha = 0.25 + gi * 0.45;

      // Left edge
      const leftGrad = ctx.createLinearGradient(apex.x, apex.y, bl.x, bl.y);
      leftGrad.addColorStop(0, `rgba(0,229,255,${edgeAlpha})`);
      leftGrad.addColorStop(1, `rgba(112,0,255,${edgeAlpha * 0.6})`);
      ctx.beginPath();
      ctx.moveTo(apex.x, apex.y);
      ctx.lineTo(bl.x, bl.y);
      ctx.strokeStyle = leftGrad;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 1;
      ctx.stroke();

      // Right edge
      const rightGrad = ctx.createLinearGradient(apex.x, apex.y, br.x, br.y);
      rightGrad.addColorStop(0, `rgba(0,229,255,${edgeAlpha})`);
      rightGrad.addColorStop(1, `rgba(255,0,122,${edgeAlpha * 0.7})`);
      ctx.beginPath();
      ctx.moveTo(apex.x, apex.y);
      ctx.lineTo(br.x, br.y);
      ctx.strokeStyle = rightGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Bottom edge
      const bottomGrad = ctx.createLinearGradient(bl.x, bl.y, br.x, br.y);
      bottomGrad.addColorStop(0,   `rgba(112,0,255,${edgeAlpha * 0.6})`);
      bottomGrad.addColorStop(0.5, `rgba(255,255,255,${edgeAlpha * 0.4})`);
      bottomGrad.addColorStop(1,   `rgba(255,0,122,${edgeAlpha * 0.5})`);
      ctx.beginPath();
      ctx.moveTo(bl.x, bl.y);
      ctx.lineTo(br.x, br.y);
      ctx.strokeStyle = bottomGrad;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // --- Apex glow ---
      const apexGlow = ctx.createRadialGradient(apex.x, apex.y, 0, apex.x, apex.y, 30 + gi * 20);
      apexGlow.addColorStop(0, `rgba(0,229,255,${0.35 + gi * 0.45})`);
      apexGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(apex.x, apex.y, 30 + gi * 20, 0, Math.PI * 2);
      ctx.fillStyle = apexGlow;
      ctx.globalAlpha = 1;
      ctx.fill();

      // Internal shimmer — animated light bounce
      const shimX = internalX;
      const shimY = internalY;
      const shimGlow = ctx.createRadialGradient(shimX, shimY, 0, shimX, shimY, 25 + gi * 15);
      shimGlow.addColorStop(0, `rgba(255,255,255,${0.12 + gi * 0.18})`);
      shimGlow.addColorStop(0.5, `rgba(0,229,255,${0.06 + gi * 0.1})`);
      shimGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(shimX, shimY, 25 + gi * 15, 0, Math.PI * 2);
      ctx.fillStyle = shimGlow;
      ctx.fill();
      
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [glowIntensity]); // Notice mousePos is excluded from deps to prevent recreating the rAF loop

  return canvasRef;
}
