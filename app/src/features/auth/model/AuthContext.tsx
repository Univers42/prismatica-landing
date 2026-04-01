import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../api/mockAuthService';

export type AuthStatus = 'IDLE' | 'LOADING' | 'AUTHENTICATED' | 'AWAITING_MFA' | 'ERROR';

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  token: string | null;
  loginState: (user: User, token: string, requiresMfa: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>('IDLE');

  // Typically, here we would read the token from localStorage/cookies to restore session
  // Since we use TanStack Query, the actual fetching will be managed by useUser hook, 
  // but context retains the global application shape.
  
  useEffect(() => {
    const savedToken = localStorage.getItem('prisma_auth_token');
    if (savedToken) {
      setToken(savedToken);
      // We will let TanStack Query (via useUser hook) populate the User object and set status
    }
  }, []);

  const loginState = (newUser: User, newToken: string, requiresMfa: boolean) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('prisma_auth_token', newToken);

    if (requiresMfa) {
        setStatus('AWAITING_MFA');
    } else {
        setStatus('AUTHENTICATED');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setStatus('IDLE');
    localStorage.removeItem('prisma_auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, status, token, loginState, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
