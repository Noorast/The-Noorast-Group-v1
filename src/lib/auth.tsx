import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from './supabase';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  project_description: string | null;
  is_admin: boolean;
  subscription_status: 'free' | 'active' | 'cancelled' | 'past_due';
  created_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  hasFullAccess: boolean; // true if admin OR active subscriber
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null, user: null, profile: null,
  isAdmin: false, hasFullAccess: false, loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

async function fetchProfile(userId: string): Promise<UserProfile | null> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error && error.code !== 'PGRST116') {
      console.warn('Profile fetch error:', error.message);
      return null;
    }
    return data as UserProfile | null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    const p = await fetchProfile(userId);
    setProfile(p);
  };

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    getSupabase().then(supabase => {
      supabase.auth.getSession().then(async ({ data }) => {
        setSession(data.session);
        if (data.session?.user) {
          await loadProfile(data.session.user.id);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
      });
      unsubscribe = () => subscription.unsubscribe();
    }).catch(err => {
      console.error('Auth init failed:', err);
      setLoading(false);
    });

    return () => { unsubscribe?.(); };
  }, []);

  const refreshProfile = async () => {
    if (session?.user) await loadProfile(session.user.id);
  };

  const signUp = async (email: string, password: string) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signUp({ email, password });
      if (!error) {
        fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'welcome', to: email, data: {} }),
        }).catch(() => {});
      }
      return { error: error?.message || null };
    } catch (err: any) {
      return { error: err.message || 'Sign up failed' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message || null };
    } catch (err: any) {
      return { error: err.message || 'Sign in failed' };
    }
  };

  const signOut = async () => {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
    setProfile(null);
  };

  const isAdmin = profile?.is_admin === true;
  const hasFullAccess = isAdmin || profile?.subscription_status === 'active';

  return (
    <AuthContext.Provider value={{
      session, user: session?.user ?? null, profile,
      isAdmin, hasFullAccess, loading,
      signUp, signIn, signOut, refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
