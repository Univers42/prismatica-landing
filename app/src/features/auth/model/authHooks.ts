import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { supabaseAuthService } from '../api/supabaseAuthService';
import type { AuthProvider } from '../api/mockAuthService'; // Reusing the type, or we could copy it
import { useAuthActions, useAuthUser } from './authStore';

// query keys
export const AUTH_KEYS = {
  user: ['user'] as const,
};

export function useLogin() {
  return useMutation<void, Error, AuthProvider>({
    mutationFn: async (provider) => {
      toast.loading('Redirecting to secure provider...', { id: 'oauth-redirect' });
      await supabaseAuthService.signInWithOAuth(provider);
    },
    onError: (error) => {
      toast.dismiss('oauth-redirect');
      toast.error('❌ Authentication Failed', {
        description: error.message
      });
    }
  });
}

export function useEmailLogin() {
  const navigate = useNavigate();

  return useMutation<any, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      return supabaseAuthService.signInWithEmail(email, password);
    },
    onSuccess: (data) => {
      const name = data.user?.user_metadata?.full_name || data.user?.email;
      toast.success(`🚀 Welcome back, ${name}!`, {
        description: 'Manual login successful. Accessing workspace...'
      });
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error('❌ Login Failed', {
        description: error.message
      });
    }
  });
}

export function useUser() {
  const user = useAuthUser();
  // Returning it wrapped in a similar query shape if needed, 
  // but since we are using Zustand now as the single source of truth,
  // we can just return a fake query result or simply use `useAuthUser` directly in components.
  // We'll keep this hook for compatibility with any existing components.
  return {
    data: user,
    isLoading: false,
    error: null
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuthActions();

  return () => {
    logout();
    navigate('/', { replace: true });
    toast.info('👋 You have been successfully signed out.');
  };
}

