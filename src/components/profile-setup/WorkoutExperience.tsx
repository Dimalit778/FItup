import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";
import { SetupLayout } from "./SetupLayout";

const workoutOptions = [
  { id: "never", label: "Never worked out" },
  { id: "rarely", label: "Rarely (few times a month)" },
  { id: "1-2_times", label: "1-2 times per week" },
  { id: "3-4_times", label: "3-4 times per week" },
  { id: "5+_times", label: "5+ times per week" },
] as const;

export function WorkoutExperience() {
  const { updateProfileData, profileData, saveProfile } = useProfileSetup();
  const router = useRouter();

  const handleSelect = async (
    workoutExperience: (typeof workoutOptions)[number]["id"]
  ) => {
    try {
      updateProfileData({ workoutExperience });
      await saveProfile();
      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error saving profile:", error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <SetupLayout
      title="Workout Experience"
      subtitle="How often do you work out?"
      showNextButton={false}
    >
      <View style={styles.container}>
        {workoutOptions.map((option) => (
          <Pressable
            key={option.id}
            style={[
              styles.option,
              profileData.workoutExperience === option.id &&
                styles.selectedOption,
            ]}
            onPress={() => handleSelect(option.id)}
          >
            <Text
              style={[
                styles.optionText,
                profileData.workoutExperience === option.id &&
                  styles.selectedText,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SetupLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  option: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: "#007AFF",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
});
