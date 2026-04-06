import '@/shared/styles/landing.scss';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useAuthActions } from '@/features/auth';
import { LightCursor, ScrollProgress, StarField } from '@/shared/ui';
import { LandingPage } from '@/pages/landing';
import { LoginPage } from '@/pages/login';
import { useMousePosition } from '@/shared/lib/hooks/useMousePosition';
import { useScrollProgress } from '@/shared/lib/hooks/useScrollProgress';

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
        {/* Global UI background & interaction layers */}
        <StarField mousePos={mousePos} scrollProgress={scrollProgress} />
        <LightCursor pos={mousePos} scrollProgress={scrollProgress} />
        <ScrollProgress progress={scrollProgress} />
        
        {/* Toast notifications */}
        <Toaster position="top-center" richColors />

        {/* Routes routing */}
        <Routes>
          <Route path="/" element={<LandingPage scrollProgress={scrollProgress} mousePos={mousePos} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
