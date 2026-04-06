import { useEffect } from 'react';
import { useAuthActions } from '@/features/auth';
import { useMousePosition } from '@/shared/lib/hooks/useMousePosition';
import { useScrollProgress } from '@/shared/lib/hooks/useScrollProgress';

// Fragmented Structural Layers
import { AppProviders } from './providers/AppProviders';
import { GlobalUI } from './ui/GlobalUI';
import { AppRouter } from './router/AppRouter';

/**
 * 💠 Prismatica Orchestrator (App.tsx)
 * 
 * This is the beating heart of the application structure.
 * Following Feature-Sliced Design (FSD) and SOLID principles, this file 
 * does NO heavy lifting. It acts purely as a macro-orchestrator linking 
 * Contexts, Global Visuals, and Routing logic together.
 */
function App(): React.JSX.Element {
  // 1. Bootstrapping Logic initialization (e.g., checking active sessions)
  const { initialize } = useAuthActions();
  
  // 2. Global Environmental State
  const mousePos = useMousePosition();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AppProviders>
      {/* Visual background layers & toasts isolated from DOM routing */}
      <GlobalUI mousePos={mousePos} scrollProgress={scrollProgress} />
      
      {/* Route traversal and lazy-loading boundaries */}
      <AppRouter mousePos={mousePos} scrollProgress={scrollProgress} />
    </AppProviders>
  );
}

export default App;
