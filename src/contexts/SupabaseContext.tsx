import { createSupabaseClient } from "@/src/lib/supabase";
import { useAuth, useSession } from "@clerk/clerk-expo";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { Profile } from "../utils/supabaseTypes";
interface SupabaseContextType {
  supabase: SupabaseClient;
  profile: () => Promise<Profile | null>;
  createProfile: (userData: any) => Promise<Profile | null>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
}

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const { session } = useSession();
  const [supabase, setSupabase] = useState(() => createSupabaseClient());

  useEffect(() => {
    const setupSupabase = async () => {
      if (session) {
        const token = await session.getToken({ template: "supabase" });
        const newClient = createSupabaseClient(token);
        setSupabase(newClient);
      }
    };

    setupSupabase();
  }, [session]);

  const profile = async () => {
    if (!userId) return null;
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) throw error;
    return data;
  };
  const createProfile = async (userData: Profile) => {
    console.log("createProfile", userData);
    if (!userId) return null;
    console.log("userId", userId);
    const { data, error } = await supabase
      .from("profiles")
      .insert({ ...userData, clerk_user_id: userId })
      .select()
      .single();
    console.log("data", data);
    console.log("error", error);
    if (error) throw error;
    return data;
  };

  const value = { supabase, profile, createProfile };

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};
