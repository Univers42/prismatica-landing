import React, { useRef, useEffect, useCallback } from 'react';
import { NUM_STARS, createStar } from '../model/constants';
import type { StarNode } from '../model/constants';
import styles from './StarField.module.css';

export interface MousePosition {
  readonly x: number;
  readonly y: number;
}

export interface StarFieldProps {
  readonly mousePos: MousePosition;
  readonly scrollProgress: number;
  readonly className?: string;
}

export function StarField({ mousePos, scrollProgress, className }: StarFieldProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarNode[]>([]);
  const animRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const mousePosRef = useRef<MousePosition>(mousePos);
  const scrollRef = useRef<number>(scrollProgress);

  // Keep refs in sync
  useEffect(() => { mousePosRef.current = mousePos; }, [mousePos]);
  useEffect(() => { scrollRef.current = scrollProgress; }, [scrollProgress]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const w = canvas.offsetWidth || window.innerWidth;
    const h = canvas.offsetHeight || window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const stars = Array.from({ length: NUM_STARS }, (_, i) => {
      const s = createStar(w, h, i);
      s.baseX = s.x;
      s.baseY = s.y;
      s.baseAlpha = s.alpha;
      return s;
    });

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
        if (dist < 140) {
          stars[i].connections.push(j);
        }
      }
    }

    starsRef.current = stars;
  }, []);

  useEffect(() => {
    init();
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [init]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      frameRef.current++;
      const frame = frameRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const rect = canvas.getBoundingClientRect();
      const localMx = mousePosRef.current.x - rect.left;
      const localMy = mousePosRef.current.y - rect.top;
      const sp = scrollRef.current;

      const globalBoost = sp * 0.6;
      ctx.clearRect(0, 0, w, h);

      const stars = starsRef.current;
      const WAVE_RADIUS = 180;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const dx = s.baseX - localMx;
        const dy = s.baseY - localMy;
        const dist = Math.hypot(dx, dy);

        if (dist < WAVE_RADIUS) {
          const force = (1 - dist / WAVE_RADIUS);
          const angle = Math.atan2(dy, dx);
          const pushStr = force * force * 30;
          s.vx += Math.cos(angle) * pushStr * 0.08;
          s.vy += Math.sin(angle) * pushStr * 0.08;
        }

        s.vx += (s.baseX - s.x) * 0.04;
        s.vy += (s.baseY - s.y) * 0.04;
        s.vx *= 0.82;
        s.vy *= 0.82;
        s.x += s.vx;
        s.y += s.vy;

        const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
        let alphaBoost = 0;
        if (dist < WAVE_RADIUS) {
          alphaBoost = (1 - dist / WAVE_RADIUS) * 0.6;
        }
        const finalAlpha = Math.min(1, s.baseAlpha + twinkle * 0.15 + alphaBoost + globalBoost * 0.4);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius + (dist < WAVE_RADIUS ? (1 - dist / WAVE_RADIUS) * 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();

        if (dist < WAVE_RADIUS * 0.6) {
          const glowStr = (1 - dist / (WAVE_RADIUS * 0.6));
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 6 + glowStr * 8);
          grad.addColorStop(0, s.color);
          grad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 6 + glowStr * 8, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.globalAlpha = glowStr * 0.25;
          ctx.fill();
        }
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        for (const j of s.connections) {
          const t = stars[j];
          const midX = (s.x + t.x) / 2;
          const midY = (s.y + t.y) / 2;
          const distToMouse = Math.hypot(midX - localMx, midY - localMy);
          const connDist = Math.hypot(s.x - t.x, s.y - t.y);
          const baseFade = 1 - connDist / 140;
          const mouseBoost = distToMouse < 200 ? (1 - distToMouse / 200) * 0.5 : 0;
          const lineAlpha = Math.min(0.35, baseFade * 0.08 + mouseBoost + globalBoost * 0.15);

          if (lineAlpha < 0.005) continue;

          const grad = ctx.createLinearGradient(s.x, s.y, t.x, t.y);
          grad.addColorStop(0, s.color);
          grad.addColorStop(1, t.color);

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = lineAlpha;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvasLayer} ${className || ''}`}
    />
  );
}
