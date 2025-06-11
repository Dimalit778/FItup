import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const createSupabaseClient = (accessToken: string | null = null) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      ...(accessToken ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } } : {})
    }
  });
};

// Create an anonymous client by default
export const supabase = createSupabaseClient();