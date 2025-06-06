export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type UserGoal = 'weightLoss' | 'muscleGain' | 'maintenance' | 'generalFitness';
export type WorkoutPreference = 'home' | 'gym';
export type SubscriptionStatus = 'free' | 'premium';

export interface UserProfile {
  height: number;
  weight: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  dietaryRestrictions: string[];
  goal: UserGoal;
  workoutPreference: WorkoutPreference;
  workoutDaysPerWeek: number;
  subscriptionStatus: SubscriptionStatus;
} 