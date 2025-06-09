import { Database } from '@/src/types/supabaseTypes';
import { useSession } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Create a custom hook to get the Supabase client with auth
export const useSupabaseClient = () => {
  const { session } = useSession();

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    global: {
      fetch: async (url, options = {}) => {
        const token = await session?.getToken({ template: 'supabase' });
        const headers = new Headers(options?.headers);
        headers.set('Authorization', `Bearer ${token}`);
        
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });
};

// Export a default client for cases where we don't need auth
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 