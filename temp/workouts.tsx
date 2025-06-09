import { useSupabase } from "@/src/contexts/supabaseProvider";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useWorkoutStore } from "../../store/workoutStore";

export default function WorkoutsScreen() {
  const { user } = useUser();
  const { profile } = useUserProfileStore();
  const { workouts, addWorkout, setCurrentWorkout } = useWorkoutStore();
  const { loading: supabaseLoading } = useSupabase();
  const [loading, setLoading] = useState(false);

  const generateWorkoutPlan = async () => {
    if (!profile || !user) return;
    console.log("Generating workout plan for user:", user.id);
    // setLoading(true);
    // try {
    //   const newWorkouts = await aiService.generateWorkoutPlan(profile);
    //   for (const workout of newWorkouts) {
    //     await addWorkout(user.id, workout);
    //   }
    // } catch (error) {
    //   console.error('Error generating workout plan:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (supabaseLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Set up your profile to get personalized workouts
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Workouts</Text>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateWorkoutPlan}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="refresh" size={20} color="#FFFFFF" />
                <Text style={styles.generateButtonText}>Generate New Plan</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Workouts List */}
        <View style={styles.workoutsList}>
          {workouts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="fitness-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No workouts yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Generate your first workout plan to get started
              </Text>
            </View>
          ) : (
            workouts.map((workout, index) => (
              <TouchableOpacity
                key={workout.id}
                style={styles.workoutCard}
                onPress={() => setCurrentWorkout(workout)}
              >
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.workoutDuration}>
                    {workout.duration} min
                  </Text>
                </View>
                <View style={styles.exercisesList}>
                  {workout.exercises.map((exercise, i) => (
                    <Text key={i} style={styles.exerciseItem}>
                      • {exercise}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#111827",
  },
  generateButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  workoutsList: {
    padding: 20,
  },
  workoutCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#111827",
  },
  workoutDuration: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#6B7280",
  },
  exercisesList: {
    gap: 4,
  },
  exerciseItem: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#4B5563",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#6B7280",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#9CA3AF",
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
});
