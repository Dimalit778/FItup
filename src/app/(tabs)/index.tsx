import { useSupabase } from "@/src/contexts/SupabaseContext";
import { Profile } from "@/src/utils/supabaseTypes";
import { useAuth, useUser } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  console.log("HomeScreen");
  const { t } = useTranslation();
  const { profile, createProfile } = useSupabase();
  const { user } = useUser();
  const { signOut } = useAuth();
  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await profile();
      if (data) {
        setProfileData(data);
      }
    };
    loadProfile();
  }, [profile]);
  const handleCreateProfile = async () => {
    const data = await createProfile({
      clerk_user_id: user?.id,
      name: user?.firstName,
      age: 20,
      gender: "male",
      height: 180,
      weight: 70,
      body_form: "skinny",
      activity_level: "active",
      fitness_goal: "lose_weight",
      setup_completed: true,
      avatar_url: "https://via.placeholder.com/150",
    });
    setProfileData(data);
  };
  return (
    <ScrollView style={styles.container}>
      {/* User Overview */}
      <View style={styles.section}>
        <Text style={styles.greeting}>Hello, {user?.primaryEmailAddress?.emailAddress}! 👋</Text>
        <Text style={styles.goalText}>Goal: {profileData?.fitness_goal} </Text>
        <Text style={styles.goalText}>Age: {profileData?.age} </Text>
        <Text style={styles.goalText}>Height: {profileData?.height} </Text>
        <Text style={styles.goalText}>Weight: {profileData?.weight} </Text>
        <Text style={styles.goalText}>Activity Level: {profileData?.activity_level} </Text>
        <Button title="Create Profile" onPress={handleCreateProfile} />
        <Button title="logout" onPress={() => signOut()} />
        {/* <Button title="Delete Profile" onPress={deleteProfile} /> */}
      </View>

      {/* Today's Workout */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        {currentWorkout ? (
          <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{currentWorkout.name}</Text>
            <Text style={styles.workoutDuration}>{currentWorkout.duration} minutes</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.generateButton}>
            <Ionicons name="add-circle-outline" size={24} color="#3B82F6" />
            <Text style={styles.generateButtonText}>Generate Workout Plan</Text>
          </TouchableOpacity>
        )}
      </View> */}

      {/* Progress Overview */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{workouts.length}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.workoutDaysPerWeek}</Text>
            <Text style={styles.statLabel}>Days/Week</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {profile.subscriptionStatus === "premium" ? "PRO" : "FREE"}
            </Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  section: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#111827",
    marginBottom: 8,
  },
  goalText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#6B7280",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#111827",
    marginBottom: 16,
  },
  workoutCard: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
  },
  workoutName: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#1E40AF",
    marginBottom: 8,
  },
  workoutDuration: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#3B82F6",
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#3B82F6",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#111827",
  },
  statLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#6B7280",
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#6B7280",
    textAlign: "center",
  },
});
