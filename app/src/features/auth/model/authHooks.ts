import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mockAuthService } from '../api/mockAuthService';
import type { AuthProvider, AuthResponse } from '../api/mockAuthService';
import { useAuth } from './AuthContext';

// query keys
export const AUTH_KEYS = {
  user: ['user'] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();
  const { loginState } = useAuth();

  return useMutation<AuthResponse, Error, AuthProvider>({
    mutationFn: (provider) => mockAuthService.loginWithOAuth(provider),
    onSuccess: (data) => {
      // 1. Update the AuthContext
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
  const { token } = useAuth();

  return useQuery({
    queryKey: AUTH_KEYS.user,
    queryFn: () => {
      if (!token) throw new Error('No token found');
      return mockAuthService.getUserSession(token);
    },
    enabled: !!token, // Only fetch if we have a token from localStorage/Context
    retry: 1,
    // Note: React Query v5 doesn't use onError in useQuery configuration directly. 
    // We can handle global errors via QueryClient or inside the component accessing this query.
  });
}
