import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * 📡 Global Query Client
 * Configures the data fetching behavior for the entire application.
 * 
 * - `staleTime: 5 mins`: Data is considered fresh for 5 minutes, preventing 
 *   unnecessary network requests on rapid component re-mounts.
 * - `refetchOnWindowFocus: false`: Prevents jarring UI states when users 
 *   switch browser tabs (especially during Auth flows).
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  /** The child components (usually the Router and Global UI) to be wrapped by these providers. */
  readonly children: React.ReactNode;
}

/**
 * 🏗️ AppProviders
 * 
 * The foundational Context layer of the application.
 * This component's sole responsibility is to inject global context 
 * (State Management & Animation Engine) into the React tree.
 * 
 * @param {AppProvidersProps} props - Standard React children.
 */
export function AppProviders({ children }: AppProvidersProps): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 
        LazyMotion is injected at the root to ensure all descendant <m.div> 
        components can access the optimized domAnimation feature set.
        The 'strict' flag throws errors if standard <motion.div> is used, 
        preventing accidental bundle bloat.
      */}
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </QueryClientProvider>
  );
}
