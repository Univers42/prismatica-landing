import { supabase } from '@/shared/api/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User, AuthProvider } from './mockAuthService';

export const supabaseAuthService = {
  /**
   * Maps a Supabase User object to the Prismatica User interface.
   * This ensures the rest of the application (FSD) doesn't tightly couple to Supabase types.
   */
  mapUser(sessionUser: SupabaseUser | null): User | null {
    if (!sessionUser) return null;

    // Use user_metadata for OAuth providers
    const { email, user_metadata, id } = sessionUser;
    
    return {
      id,
      email: email || '',
      username: user_metadata?.user_name || user_metadata?.preferred_username || 'user',
      display_name: user_metadata?.full_name || user_metadata?.name || null,
      avatar_url: user_metadata?.avatar_url || null,
      is_active: true,
      mfa_enabled: false, // We'll manage this when implementing real MFA
      status: 'online',
    };
  },

  /**
   * Triggers the OAuth sign in flow. This redirects the browser.
   */
  async signInWithOAuth(provider: AuthProvider) {
    if (provider === '42') {
      throw new Error('42 authentication is not currently supported via Supabase Sandbox.');
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider === 'google' ? 'google' : 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      throw error;
    }
  },

  /**
   * Signs in a user using email and password.
   */
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Signs out the user from Supabase.
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }
};
