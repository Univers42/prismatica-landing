import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { mockAuthService } from '@/features/auth/api/mockAuthService';
import type { AuthProvider, AuthResponse } from '../api/mockAuthService';
import { useAuthActions, useAuthToken } from './authStore';

// query keys
export const AUTH_KEYS = {
  user: ['user'] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();
  const { loginState } = useAuthActions();

  return useMutation<AuthResponse, Error, AuthProvider>({
    mutationFn: (provider) => mockAuthService.loginWithOAuth(provider),
    onSuccess: (data) => {
      // 1. Update the Zustand store
      loginState(data.user, data.token, data.requiresMfa);
      
      // 2. Pre-populate the user cache
      queryClient.setQueryData(AUTH_KEYS.user, data.user);

      // 3. Visual feedback
      if (data.requiresMfa) {
        toast.info('🔐 2-Factor Authentication Required', {
          description: `Please enter the code sent to your device associated with ${data.user.email}`
        });
      } else {
        toast.success(`🚀 Welcome back, ${data.user.display_name || data.user.username}!`, {
          description: 'Login successful. Access granted to the spectrum.'
        });
      }
    },
    onError: (error) => {
      toast.error('❌ Authentication Failed', {
        description: error.message
      });
    }
  });
}

export function useUser() {
  const token = useAuthToken();

  return useQuery({
    queryKey: AUTH_KEYS.user,
    queryFn: () => {
      if (!token) throw new Error('No token found');
      return mockAuthService.getUserSession(token);
    },
    enabled: !!token, // Only fetch if we have a token from localStorage/Store
    retry: 1,
  });
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

