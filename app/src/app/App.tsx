import '@/shared/styles/landing.scss';
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useAuthActions } from '@/features/auth';
import { LightCursor, ScrollProgress, StarField, LoadingFallback } from '@/shared/ui';
import { useMousePosition } from '@/shared/lib/hooks/useMousePosition';
import { useScrollProgress } from '@/shared/lib/hooks/useScrollProgress';

// Lazy load pages for code-splitting
const LandingPage = lazy(() => import('@/pages/landing').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/login').then(m => ({ default: m.LoginPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App(): React.JSX.Element {
  const { initialize } = useAuthActions();
  const mousePos = useMousePosition();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LazyMotion features={domAnimation} strict>
          {/* Global UI background & interaction layers */}
          <StarField mousePos={mousePos} scrollProgress={scrollProgress} />
          <LightCursor pos={mousePos} scrollProgress={scrollProgress} />
          <ScrollProgress progress={scrollProgress} />
          
          {/* Toast notifications */}
          <Toaster position="top-center" richColors />

          {/* Routes routing with Suspense for lazy loading */}
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage scrollProgress={scrollProgress} mousePos={mousePos} />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Suspense>
        </LazyMotion>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
