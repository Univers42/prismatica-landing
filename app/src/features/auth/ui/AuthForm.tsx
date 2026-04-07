import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/shared/ui/glass-card';
import { useLogin } from '@/features/auth/model/authHooks';
import { useAuthStatus, useAuthUser, useAuthActions } from '@/features/auth/model/authStore';
import type { AuthProvider } from '../api/mockAuthService';
import styles from './AuthForm.module.scss';


export function AuthForm(): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const status = useAuthStatus();
  const user = useAuthUser();
  const { loginState, logout } = useAuthActions();
  const loginMutation = useLogin();
  const [otp, setOtp] = useState('');

  const toggleMode = () => setIsLogin(!isLogin);

  const handleOAuthLogin = (provider: AuthProvider) => {
    loginMutation.mutate(provider);
  };

  const handleVerifyMfa = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && user) {
      // Simulate MFA verification success
      loginState(user, 'final_session_token', false);
    }
  };

  // 1. MFA View
  if (status === 'AWAITING_MFA') {
    return (
      <GlassCard className={styles.authCard}>
        <div className={styles.header}>
          <ShieldCheck className={styles.mfaIcon} size={48} color="var(--prisma-spectral-cyan)" style={{ margin: '0 auto 1rem' }} />
          <h2 className={styles.title}>Verify Identity</h2>
          <p className={styles.subtitle}>
            Enter the 6-digit code from your authenticator app to secure your access to <strong>{user?.email}</strong>.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleVerifyMfa}>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={18} />
            <input 
              type="text" 
              placeholder="000 000" 
              maxLength={6} 
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              required 
              autoComplete="one-time-code"
              style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' }}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            <span>Verify & Access</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.footer}>
          <button onClick={logout} className={styles.toggleButton}>
            Cancel and Return
          </button>
        </div>
      </GlassCard>
    );
  }

  // 2. Authenticated → redirect handled by LoginPage (FSD: Page layer owns navigation)

  return (
    <div className={styles.authContainer}>
      <AnimatePresence mode="wait">
        <GlassCard 
          key={isLogin ? 'login' : 'signup'}
          className={styles.authCard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className={styles.subtitle}>
              {isLogin 
                ? 'Enter your credentials to access the spectrum' 
                : 'Join Prismatica and start your journey'}
            </p>
          </div>

          <div className={styles.socialButtons}>
            <button 
              className={styles.socialButton} 
              onClick={() => handleOAuthLogin('github')}
              disabled={loginMutation.isPending}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </button>
            <button 
              className={styles.socialButton}
              onClick={() => handleOAuthLogin('google')}
              disabled={loginMutation.isPending}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.808 4.056-1.144 1.144-2.936 2.4-6.032 2.4-4.864 0-8.544-3.936-8.544-8.8s3.68-8.8 8.544-8.8c2.624 0 4.568 1.032 5.968 2.344l2.32-2.32c-1.976-1.888-4.544-3.344-8.288-3.344-6.864 0-12.704 5.48-12.704 12.32s5.84 12.32 12.704 12.32c3.576 0 6.384-1.216 8.784-3.832 2.456-2.456 3.24-5.832 3.24-8.504 0-.712-.064-1.408-.184-2.04h-11.832z"/>
              </svg>
              <span>Google</span>
            </button>
            <button 
              className={styles.socialButton}
              onClick={() => handleOAuthLogin('42')}
              disabled={loginMutation.isPending}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 17h2v-6h4v-2h-4v-2h-4v-4h-2v4h-4v2h4v6zm-9-5c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm10-8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"/>
              </svg>
              <span>Intra 42</span>
            </button>
          </div>

          <div className={styles.divider}>
            <span>or continue with email</span>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className={styles.inputGroup}>
                <User className={styles.inputIcon} size={18} />
                <input type="text" placeholder="Full Name" required autoComplete="name" />
              </div>
            )}
            
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={18} />
              <input type="email" placeholder="Email Address" required autoComplete="email" />
            </div>

            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                required 
                autoComplete={isLogin ? "current-password" : "new-password"} 
              />
            </div>

            {isLogin && (
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className={styles.submitButton}>
              <span>{isLogin ? 'Sign In' : 'Get Started'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={toggleMode} className={styles.toggleButton}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </GlassCard>
      </AnimatePresence>
    </div>
  );
}
