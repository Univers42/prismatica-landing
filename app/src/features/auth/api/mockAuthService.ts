export type AuthProvider = 'google' | 'github' | '42';

export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  mfa_enabled: boolean;
  status: 'online' | 'offline' | 'busy' | 'away';
}

export interface AuthResponse {
  token: string;
  user: User;
  requiresMfa: boolean;
}

// Temporary Mock Database
const MOCK_USERS: Record<string, User> = {
  'github': {
    id: 'usr_git_123',
    email: 'dev@github.com',
    username: 'git_dev',
    display_name: 'GitHub Developer',
    avatar_url: null,
    is_active: true,
    mfa_enabled: false, // Standard login
    status: 'online',
  },
  'google': {
    id: 'usr_goo_456',
    email: 'user@gmail.com',
    username: 'google_user',
    display_name: 'Google User',
    avatar_url: null,
    is_active: true,
    mfa_enabled: true, // Will trigger AWAITING_MFA state
    status: 'online',
  },
  '42': {
    id: 'usr_42_789',
    email: 'student@42.fr',
    username: 'student42',
    display_name: '42 Student',
    avatar_url: null,
    is_active: true,
    mfa_enabled: false,
    status: 'online',
  }
};

export const mockAuthService = {
  /**
   * Simulates OAuth redirection and callback handling.
   * Returns a mock JWT token and User object based on the provider.
   */
  async loginWithOAuth(provider: AuthProvider): Promise<AuthResponse> {
    // Simulate network latency (800ms to 1500ms)
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    
    // Simulate finding/creating user from oauth_accounts linking
    const user = MOCK_USERS[provider];
    
    if (!user) {
      throw new Error('OAuth Provider not supported');
    }

    // Return mock response matching user_sessions logic
    return {
      token: `mock_jwt_token_${user.id}_${Date.now()}`,
      user,
      requiresMfa: user.mfa_enabled,
    };
  },

  /**
   * Simulates fetching the current user session from the API
   * using a stored token.
   */
  async getUserSession(token: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!token) {
      throw new Error('No active session token');
    }

    // Determine user from mock token format (mock_jwt_token_ID_TIMESTAMP)
    const parts = token.split('_');
    if (parts.length >= 4) {
      const mockId = parts[3] + '_' + parts[4]; // e.g. "usr_git" + "123"
      
      const foundUser = Object.values(MOCK_USERS).find(u => u.id.includes(mockId.slice(0,7))); // Simple mock logic to find user
      if (foundUser) return foundUser;
    }

    return MOCK_USERS['github']; // fallback for testing
  }
};
