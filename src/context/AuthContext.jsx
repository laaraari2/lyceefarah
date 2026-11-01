import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginAdmin, 
  logoutAdmin, 
  getCachedAdminSession, 
  supabase, 
  isSupabaseConfigured 
} from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check cached session first
    const cached = getCachedAdminSession();
    if (cached?.user) {
      setUser(cached.user);
    }

    // 2. If Supabase configured, subscribe to auth state changes
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
        }
        setLoading(false);
      }).catch(err => {
        console.warn('Auth session check error:', err);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      });

      return () => subscription?.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await loginAdmin(email, password);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await logoutAdmin();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: Boolean(user), loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
