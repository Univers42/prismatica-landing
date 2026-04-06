import { useState, useEffect, useRef } from 'react';
import type { MousePosition } from '../model/types';

/**
 * ✨ Hero Glow Physics Hook
 * 
 * Abstracted logic for computing the distance-based glow intensity.
 * We use a detached requestAnimationFrame loop to manage the state decay,
 * completely resolving the ESLint `set-state-in-effect` violations 
 * caused by binding setStates directly to rapidly changing props.
 */
export function useHeroGlow(mousePos: MousePosition): number {
  const [glow, setGlow] = useState(0);
  const mousePosRef = useRef(mousePos);

  // Safely port React prop to mutable ref to avoid breaking the animation loop
  useEffect(() => { 
    mousePosRef.current = mousePos; 
  }, [mousePos]);

  useEffect(() => {
    let animFrame: number;
    
    const tick = () => {
      const { x, y } = mousePosRef.current;
      const prismX = window.innerWidth / 2;
      const prismY = window.innerHeight / 2;
      
      const dist = Math.hypot(x - prismX, y - prismY);
      const targetGlow = Math.max(0, 1 - dist / 400);
      
      setGlow(prev => {
        const next = Math.max(prev * 0.96, targetGlow);
        // Bail out of React rendering if the delta is visually imperceptible
        if (Math.abs(next - prev) < 0.001 && targetGlow === 0 && prev === 0) {
          return prev; 
        }
        return next;
      });
      
      animFrame = requestAnimationFrame(tick);
    };
    
    animFrame = requestAnimationFrame(tick);
    
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return glow;
}
