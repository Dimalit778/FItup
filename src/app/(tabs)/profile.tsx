import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, ActivityIndicator } from 'react-native';
import { useUserProfileStore } from '../../store/userProfileStore';
import { subscriptionService } from '../../services/subscriptionService';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import type { UserProfile, Gender, ActivityLevel, UserGoal } from '../../types/user';

export default function ProfileScreen() {
  const { profile, updateProfile } = useUserProfileStore();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile || {
    height: 0,
    weight: 0,
    age: 0,
    gender: 'male',
    activityLevel: 'moderate',
    dietaryRestrictions: [],
    goal: 'maintenance',
    workoutPreference: 'home',
    workoutDaysPerWeek: 3,
    subscriptionStatus: 'free'
  });

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const packages = await subscriptionService.getOfferings();
      if (packages.length > 0) {
        await subscriptionService.purchasePackage(packages[0]);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = () => {
    console.log('Saving profile:', localProfile);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email?.[0].toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      {/* Subscription Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionStatus}>
              {localProfile.subscriptionStatus === 'premium' ? 'Premium' : 'Free Plan'}
            </Text>
            <Text style={styles.subscriptionDescription}>
              {localProfile.subscriptionStatus === 'premium'
                ? 'You have access to all premium features'
                : 'Upgrade to unlock all features'}
            </Text>
          </View>
          {localProfile.subscriptionStatus !== 'premium' && (
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleSubscribe}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Profile Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={String(localProfile.age)}
            onChangeText={(text) => setLocalProfile({ ...localProfile, age: parseInt(text) || 0 })}
            keyboardType="numeric"
            placeholder="Enter your age"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={localProfile.gender}
              onValueChange={(value: Gender) => setLocalProfile({ ...localProfile, gender: value })}
              style={styles.picker}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={String(localProfile.height)}
              onChangeText={(text) => setLocalProfile({ ...localProfile, height: parseInt(text) || 0 })}
              keyboardType="numeric"
              placeholder="Height"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={String(localProfile.weight)}
              onChangeText={(text) => setLocalProfile({ ...localProfile, weight: parseInt(text) || 0 })}
              keyboardType="numeric"
              placeholder="Weight"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Activity Level</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={localProfile.activityLevel}
              onValueChange={(value: ActivityLevel) => setLocalProfile({ ...localProfile, activityLevel: value })}
              style={styles.picker}
            >
              <Picker.Item label="Sedentary" value="sedentary" />
              <Picker.Item label="Light" value="light" />
              <Picker.Item label="Moderate" value="moderate" />
              <Picker.Item label="Active" value="active" />
              <Picker.Item label="Very Active" value="veryActive" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fitness Goal</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={localProfile.goal}
              onValueChange={(value: UserGoal) => setLocalProfile({ ...localProfile, goal: value })}
              style={styles.picker}
            >
              <Picker.Item label="Weight Loss" value="weightLoss" />
              <Picker.Item label="Muscle Gain" value="muscleGain" />
              <Picker.Item label="Maintenance" value="maintenance" />
              <Picker.Item label="General Fitness" value="generalFitness" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  subscriptionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionStatus: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  subscriptionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  upgradeButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  pickerContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    marginVertical: 20,
  },
  signOutButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
}); 