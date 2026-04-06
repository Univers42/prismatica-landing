import { useRef, useEffect } from 'react';
import { COLORS } from '../model/constants';
import type { GalaxyNode } from '../model/constants';
import type { MousePosition } from '../model/types';

/**
 * 🌌 Galaxy Canvas Physics Engine
 * 
 * Aggressively extracts the 60 FPS gravitational requestAnimationFrame 
 * rendering loop to preserve the purity of the React UI tree.
 */
export function useGalaxyCanvas(mousePos: MousePosition) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const mousePosRef = useRef<MousePosition>(mousePos);
  const nodesRef = useRef<GalaxyNode[]>([]);

  // Safely sync React props to mutable refs without breaking rAF
  useEffect(() => { 
    mousePosRef.current = mousePos; 
  }, [mousePos]);

  // Phase 1: Initialize the particle network matrix
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const nodes: GalaxyNode[] = Array.from({ length: 80 }, (_, i) => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        id: i,
        x, y,
        baseX: x, baseY: y,
        vx: 0, vy: 0,
        r: Math.random() * 3 + 1.5,
        color: COLORS[i % COLORS.length],
        alpha: Math.random() * 0.5 + 0.3,
        glowLevel: 0,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.003,
        connections: []
      };
    });

    // Build neural connection constraints
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].baseX - nodes[j].baseX, nodes[i].baseY - nodes[j].baseY);
        if (d < 160) nodes[i].connections.push(j);
      }
    }

    nodesRef.current = nodes;
  }, []);

  // Phase 2: The gravitational 60 FPS update loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let frame = 0;

    const draw = () => {
      frame++;
      const { x: mx, y: my } = mousePosRef.current;
      
      // Convert external mouse to canvas-local coordinates
      const rect = canvas.getBoundingClientRect();
      const lmx = mx - rect.left;
      const lmy = my - rect.top;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = n.baseX - lmx;
        const dy = n.baseY - lmy;
        const dist = Math.hypot(dx, dy);

        // Wave ripple repulsion based on inverse square
        if (dist < 200) {
          const force = Math.pow(1 - dist / 200, 2);
          const angle = Math.atan2(dy, dx);
          n.vx += Math.cos(angle) * force * 4;
          n.vy += Math.sin(angle) * force * 4;
        }

        // Hooke's Law spring back towards origin + kinetic dampening
        n.vx += (n.baseX - n.x) * 0.06;
        n.vy += (n.baseY - n.y) * 0.06;
        n.vx *= 0.78;
        n.vy *= 0.78;
        n.x += n.vx;
        n.y += n.vy;

        // Glow intensity accelerates logarithmically near mouse
        const targetGlow = dist < 180 ? (1 - dist / 180) : 0;
        n.glowLevel += (targetGlow - n.glowLevel) * 0.08;
        n.glowLevel = Math.max(n.glowLevel * 0.995, targetGlow);

        // Sinusoidal twinkling logic
        const twinkle = (Math.sin(frame * n.speed + n.phase) + 1) / 2;
        const finalAlpha = Math.min(1, n.alpha + twinkle * 0.2 + n.glowLevel * 0.5);
        const finalR = n.r + n.glowLevel * 3;

        // Draw radial glow aura
        if (n.glowLevel > 0.05) {
          const aura = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, finalR * 6 + n.glowLevel * 15);
          aura.addColorStop(0, n.color);
          aura.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(n.x, n.y, finalR * 6 + n.glowLevel * 15, 0, Math.PI * 2);
          ctx.fillStyle = aura;
          ctx.globalAlpha = n.glowLevel * 0.35;
          ctx.fill();
        }

        // Draw solid core
        ctx.beginPath();
        ctx.arc(n.x, n.y, finalR, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();
      }

      // Draw active interconnections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (const j of n.connections) {
          const t = nodes[j];
          const midDist = Math.hypot((n.x + t.x) / 2 - lmx, (n.y + t.y) / 2 - lmy);
          const connGlow = Math.max(n.glowLevel, t.glowLevel);
          const baseAlpha = 0.04 + connGlow * 0.35;
          
          // Boost alpha explicitly near the mouse epicenter
          const mouseBoost = midDist < 200 ? (1 - midDist / 200) * 0.2 : 0;
          const lineAlpha = Math.min(0.6, baseAlpha + mouseBoost);

          const grad = ctx.createLinearGradient(n.x, n.y, t.x, t.y);
          grad.addColorStop(0, n.color);
          grad.addColorStop(1, t.color);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.7 + connGlow * 1.5;
          ctx.globalAlpha = lineAlpha;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, []);

  return canvasRef;
}
