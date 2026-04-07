import { create } from 'zustand';
import type { User } from '../api/mockAuthService';

export type AuthStatus = 'IDLE' | 'CHECKING' | 'LOADING' | 'AUTHENTICATED' | 'AWAITING_MFA' | 'ERROR';

interface AuthState {
  user: User | null;
  status: AuthStatus;
  token: string | null;
  actions: {
    loginState: (user: User, token: string, requiresMfa: boolean) => void;
    logout: () => void;
    initialize: () => void;
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'CHECKING', // Start in CHECKING so ProtectedRoute knows init is in progress
  token: null,
  actions: {
    initialize: () => {
      set({ status: 'CHECKING' });
      const savedToken = localStorage.getItem('prisma_auth_token');
      if (savedToken) {
        // Token found: restore session optimistically.
        // The useUser() TanStack Query hook will validate it async.
        set({ token: savedToken, status: 'AUTHENTICATED' });
      } else {
        // No token: confirmed not authenticated.
        set({ status: 'IDLE' });
      }
    },
    loginState: (user, token, requiresMfa) => {
      localStorage.setItem('prisma_auth_token', token);
      set({
        user,
        token,
        status: requiresMfa ? 'AWAITING_MFA' : 'AUTHENTICATED',
      });
    },
    logout: () => {
      localStorage.removeItem('prisma_auth_token');
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
