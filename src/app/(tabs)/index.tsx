import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Picker } from '@react-native-picker/picker';
import { useUserProfileStore } from '../../store/userProfileStore';
import { useWorkoutStore } from '../../store/workoutStore';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
  activityLevel: string;
  fitnessGoal: string;
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const { profile } = useUserProfileStore();
  const { workouts, currentWorkout } = useWorkoutStore();
  const { user } = useAuth();

  if (!profile || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to FitUp!</Text>
        <Text style={styles.subtitle}>Please complete your profile to get started</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* User Overview */}
      <View style={styles.section}>
        <Text style={styles.greeting}>Hello, {user.email}! 👋</Text>
        <Text style={styles.goalText}>Goal: {profile.goal}</Text>
      </View>

      {/* Today's Workout */}
      <View style={styles.section}>
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
      </View>

      {/* Progress Overview */}
      <View style={styles.section}>
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
            <Text style={styles.statValue}>{profile.subscriptionStatus === 'premium' ? 'PRO' : 'FREE'}</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  goalText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  workoutCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
  },
  workoutName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  workoutDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
});