import { useSession } from "@clerk/clerk-expo";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import "react-native-url-polyfill/auto";
import { useSupabaseClient } from "../lib/supabase";
import { Database, Profile } from "../types/supabaseTypes";

interface SupabaseContextType {
  supabase: SupabaseClient<Database> | null;
  createProfile: (
    profile: Omit<Profile, "id" | "created_at" | "updated_at" | "clerk_user_id">
  ) => Promise<Profile | null>;
  getProfile: () => Promise<Profile | null>;
  updateProfile: (updates: Partial<Omit<Profile, "id" | "clerk_user_id">>) => Promise<Profile | null>;
  deleteProfile: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  createProfile: async () => null,
  getProfile: async () => null,
  updateProfile: async () => null,
  deleteProfile: async () => {},
  loading: true,
  error: null,
});

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, isLoaded: isClerkLoaded } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!isClerkLoaded) {
      return;
    }
    setLoading(false);
  }, [isClerkLoaded]);

  const createProfile = async (
    profile: Omit<Profile, "id" | "created_at" | "updated_at" | "clerk_user_id">
  ): Promise<Profile | null> => {
    try {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      const { data, error } = await supabase
        .from("profiles")
        .insert({
          ...profile,
          clerk_user_id: session.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create profile");
      console.error("Error creating profile:", error);
      throw error;
    }
  };

  const getProfile = async (): Promise<Profile | null> => {
    try {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      const { data, error } = await supabase.from("profiles").select().eq("clerk_user_id", session.user.id).single();

      if (error) throw error;
      return data || null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch profile");
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Omit<Profile, "id" | "clerk_user_id">>): Promise<Profile | null> => {
    try {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("clerk_user_id", session.user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update profile");
      console.error("Error updating profile:", error);
      throw error;
    }
  };
  const deleteProfile = async (): Promise<void> => {
    console.log("deleteProfile", session?.user?.id);
    try {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }
      const { error } = await supabase.from("profiles").delete().eq("clerk_user_id", session.user.id);
      if (error) throw error;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete profile");
      console.error("Error deleting profile:", error);
      throw error;
    }
  };

  return (
    <SupabaseContext.Provider
      value={{
        supabase,
        createProfile,
        getProfile,
        updateProfile,
        deleteProfile,
        loading,
        error,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
