import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useUserProfileStore } from '../../store/userProfileStore';
import { aiService } from '../../services/aiService';
import { Ionicons } from '@expo/vector-icons';
import type { MealPlan } from '../../services/aiService';

export default function NutritionScreen() {
  const { profile } = useUserProfileStore();
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const generateMealPlan = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      const newMealPlan = await aiService.generateMealPlan(profile);
      setMealPlan(newMealPlan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Set up your profile to get personalized meal plans</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Meal Plan</Text>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateMealPlan}
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

        {/* Meal Plan Content */}
        <View style={styles.content}>
          {!mealPlan ? (
            <View style={styles.emptyState}>
              <Ionicons name="restaurant-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No meal plan yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Generate your first meal plan to get started
              </Text>
            </View>
          ) : (
            <>
              {/* Macros Overview */}
              <View style={styles.macrosCard}>
                <Text style={styles.sectionTitle}>Daily Nutrition Goals</Text>
                <Text style={styles.calories}>{mealPlan.calories} calories</Text>
                <View style={styles.macrosGrid}>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroValue}>{mealPlan.macros.protein}g</Text>
                    <Text style={styles.macroLabel}>Protein</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroValue}>{mealPlan.macros.carbs}g</Text>
                    <Text style={styles.macroLabel}>Carbs</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroValue}>{mealPlan.macros.fats}g</Text>
                    <Text style={styles.macroLabel}>Fats</Text>
                  </View>
                </View>
              </View>

              {/* Meals */}
              <View style={styles.mealsSection}>
                <MealSection title="Breakfast" meals={mealPlan.meals.breakfast} />
                <MealSection title="Lunch" meals={mealPlan.meals.lunch} />
                <MealSection title="Dinner" meals={mealPlan.meals.dinner} />
                <MealSection title="Snacks" meals={mealPlan.meals.snacks} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function MealSection({ title, meals }: { title: string; meals: string[] }) {
  return (
    <View style={styles.mealSection}>
      <Text style={styles.mealTitle}>{title}</Text>
      {meals.map((meal, index) => (
        <View key={index} style={styles.mealItem}>
          <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
          <Text style={styles.mealText}>{meal}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  content: {
    padding: 20,
  },
  generateButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  macrosCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 8,
  },
  calories: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  macroLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  mealsSection: {
    gap: 20,
  },
  mealSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  mealTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  mealText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
}); 