import { useUser } from "@clerk/clerk-expo";
import React, { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabase";

type ProfileData = {
  gender: "male" | "female";
  height: number;
  weight: number;
  bodyForm: "muscle" | "standard" | "slim" | "plus";
  workoutExperience:
    | "never"
    | "rarely"
    | "1-2_times"
    | "3-4_times"
    | "5+_times";
};

type ProfileSetupContextType = {
  currentStep: number;
  profileData: Partial<ProfileData>;
  setCurrentStep: (step: number) => void;
  updateProfileData: (data: Partial<ProfileData>) => void;
  saveProfile: () => Promise<void>;
  isProfileComplete: boolean;
};

const ProfileSetupContext = createContext<ProfileSetupContextType | undefined>(
  undefined
);

export function ProfileSetupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<Partial<ProfileData>>({});
  const { user } = useUser();

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  };

  const isProfileComplete = async () => {
    if (!user) return false;

    const { data, error } = await supabase
      .from("profiles")
      .select("setup_completed")
      .eq("id", user.id)
      .single();

    return data?.setup_completed ?? false;
  };

  const saveProfile = async () => {
    if (
      !user ||
      !profileData.gender ||
      !profileData.height ||
      !profileData.weight ||
      !profileData.bodyForm ||
      !profileData.workoutExperience
    ) {
      throw new Error("Missing required profile data");
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      gender: profileData.gender,
      height: profileData.height,
      weight: profileData.weight,
      body_form: profileData.bodyForm,
      workout_experience: profileData.workoutExperience,
      setup_completed: true,
    });

    if (error) throw error;
  };

  return (
    <ProfileSetupContext.Provider
      value={{
        currentStep,
        profileData,
        setCurrentStep,
        updateProfileData,
        saveProfile,
        isProfileComplete: Boolean(
          profileData.gender &&
            profileData.height &&
            profileData.weight &&
            profileData.bodyForm &&
            profileData.workoutExperience
        ),
      }}
    >
      {children}
    </ProfileSetupContext.Provider>
  );
}

export function useProfileSetup() {
  const context = useContext(ProfileSetupContext);
  if (context === undefined) {
    throw new Error(
      "useProfileSetup must be used within a ProfileSetupProvider"
    );
  }
  return context;
}
