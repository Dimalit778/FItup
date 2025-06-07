import { useSession } from "@clerk/clerk-expo";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import "react-native-url-polyfill/auto";

interface SupabaseContextType {
  supabase: SupabaseClient | null;
  loading: boolean;
  error: Error | null;
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  loading: true,
  error: null,
});

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { session, isLoaded: isClerkLoaded } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isClerkLoaded) return; // Wait for Clerk to load

    async function initializeSupabase() {
      try {
        setLoading(true);
        const clerkToken = await session?.getToken({ template: "supabase" });

        const client = createClient(
          process.env.EXPO_PUBLIC_SUPABASE_URL!,
          process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
          {
            auth: {
              storage: ExpoSecureStoreAdapter,
              autoRefreshToken: true,
              persistSession: true,
              detectSessionInUrl: false,
            },
            global: {
              fetch: async (url, options = {}) => {
                const headers = new Headers(options?.headers);
                if (clerkToken) {
                  headers.set("Authorization", `Bearer ${clerkToken}`);
                }
                return fetch(url, { ...options, headers });
              },
            },
          }
        );
        setSupabase(client);
      } catch (err: any) {
        setError(err);
        console.error("Error initializing Supabase client:", err);
      } finally {
        setLoading(false);
      }
    }

    initializeSupabase();
  }, [session, isClerkLoaded]); // Re-initialize if session changes or Clerk loads

  return (
    <SupabaseContext.Provider value={{ supabase, loading, error }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
