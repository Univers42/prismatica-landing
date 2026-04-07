import { create } from 'zustand';
import { supabase } from '@/shared/api/supabase';
import { supabaseAuthService } from '../api/supabaseAuthService';
import type { User } from '../api/mockAuthService';

export type AuthStatus = 'IDLE' | 'CHECKING' | 'LOADING' | 'AUTHENTICATED' | 'AWAITING_MFA' | 'ERROR';

interface AuthState {
  user: User | null;
  status: AuthStatus;
  token: string | null;
  actions: {
    initializeSupabase: () => void;
    // We keep loginState around temporarily for potential manual overrides, 
    // but the main driver is now initializeSupabase
    loginState: (user: User, token: string, requiresMfa: boolean) => void;
    logout: () => void;
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'CHECKING', // Start in CHECKING so ProtectedRoute knows init is in progress
  token: null,
  actions: {
    initializeSupabase: () => {
      set({ status: 'CHECKING' });
      
      // 1. Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          const user = supabaseAuthService.mapUser(session.user);
          set({ user, token: session.access_token, status: 'AUTHENTICATED' });
        } else {
          set({ status: 'IDLE' });
        }
      });

      // 2. Set up listener for changes (login, logout, token refresh)
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          const user = supabaseAuthService.mapUser(session.user);
          set({ user, token: session.access_token, status: 'AUTHENTICATED' });
        } else {
          set({ user: null, token: null, status: 'IDLE' });
        }
      });
    },
    loginState: (user, token, requiresMfa) => {
      set({
        user,
        token,
        status: requiresMfa ? 'AWAITING_MFA' : 'AUTHENTICATED',
      });
    },
    logout: async () => {
      await supabaseAuthService.signOut();
      set({
        user: null,
        token: null,
        status: 'IDLE',
      });
    },
  },
}));

// Selectors for convenience
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthStatus = () => useAuthStore((state) => state.status);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useIsAuthenticated = () => useAuthStore((state) => state.status === 'AUTHENTICATED');
