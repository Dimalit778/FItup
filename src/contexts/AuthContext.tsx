import React, { createContext, useContext } from 'react';
import { useAuthStore } from '@/src/store/authStore';

type AuthContextType = {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
    loading,
    initialize,
  } = useAuthStore();

  React.useEffect(() => {
    initialize();
  }, []);

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}