import { create } from 'zustand';
import { supabase } from '@/src/lib/supabase';
import type { UserProfile } from '@/src/types/user';

interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<UserProfile>) => Promise<void>;
  setProfile: (profile: UserProfile | null) => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      set({ profile: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (userId: string, updates: Partial<UserProfile>) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId);

      if (error) throw error;
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  setProfile: (profile) => set({ profile }),
})); 