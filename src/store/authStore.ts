import { makeRedirectUri } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { create } from "zustand";

interface AuthState {
  isSignedIn: boolean;
  isLoading: boolean;
  user: any;

  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  initialize: () => Promise<void>;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
}

WebBrowser.maybeCompleteAuthSession();

const redirectUri = makeRedirectUri({
  scheme: "fitup",
});

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  isLoading: true,
  user: null,
  signUp: async (email, password) => {
    set({ isLoading: true });
    try {
      // Clerk auth is handled in the login screen
      set({ isSignedIn: true });
    } finally {
      set({ isLoading: false });
    }
  },
  signInWithGoogle: async () => {
    set({ isLoading: true });
    try {
      // Clerk auth is handled in the login screen
      set({ isSignedIn: true });
    } finally {
      set({ isLoading: false });
    }
  },
  signInWithApple: async () => {
    set({ isLoading: true });
    try {
      // Clerk auth is handled in the login screen
      set({ isSignedIn: true });
    } finally {
      set({ isLoading: false });
    }
  },
  initialize: async () => {
    set({ isLoading: true });
    try {
      // Clerk auth is handled in the login screen
      set({ isSignedIn: true });
    } finally {
      set({ isLoading: false });
    }
  },
  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      // Clerk auth is handled in the login screen
      set({ isSignedIn: true });
    } finally {
      set({ isLoading: false });
    }
  },
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  setIsLoading: (isLoading) => set({ isLoading }),
  signOut: async () => set({ isSignedIn: false, user: null }),
}));

// Token cache helpers for Clerk
export const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
