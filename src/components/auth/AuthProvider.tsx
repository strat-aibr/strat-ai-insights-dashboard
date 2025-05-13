
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  clientId: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  clientId: null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    // Check for client token in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      // This would be where we validate and decode the client token
      // In a real implementation, verify this token securely
      try {
        const decoded = atob(token);
        const parts = decoded.split('-');
        if (parts[0] === 'client' && parts[1]) {
          setClientId(parts[1]);
        }
      } catch (e) {
        console.error('Invalid token', e);
      }
    }

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      
      // Check if user is admin - in a real app, this would be based on roles
      if (session?.user) {
        // For demo purposes, all authenticated users are considered admins
        setIsAdmin(true);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsAdmin(!!session?.user); // For demo purposes
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, clientId, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
