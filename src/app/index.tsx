import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";

import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Dumbbell, Moon, Star, Sun, Target, TrendingUp, Users } from "lucide-react-native";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

export default function LandingScreen() {
  const { t } = useTranslation();
  const { theme, isDark, toggleTheme } = useTheme();

  const router = useRouter();

  const features = [
    {
      icon: <Dumbbell color={theme.colors.primary} size={32} />,
      title: t("landing.features.workouts.title"),
      description: t("landing.features.workouts.description"),
    },
    {
      icon: <Target color={theme.colors.secondary} size={32} />,
      title: t("landing.features.goals.title"),
      description: t("landing.features.goals.description"),
    },
    {
      icon: <TrendingUp color={theme.colors.accent} size={32} />,
      title: t("landing.features.progress.title"),
      description: t("landing.features.progress.description"),
    },
    {
      icon: <Users color={theme.colors.success} size={32} />,
      title: t("landing.features.community.title"),
      description: t("landing.features.community.description"),
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "FitFlow transformed my fitness journey. The AI workouts are incredible!",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "Best fitness app I've ever used. The progress tracking is amazing.",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
    {
      name: "Emma Davis",
      rating: 5,
      text: "Love the personalized nutrition plans. Finally seeing real results!",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
  ];

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>FitFlow</Text>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            {isDark ? <Sun color={theme.colors.text} size={24} /> : <Moon color={theme.colors.text} size={24} />}
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{t("landing.hero.title")}</Text>
              <Text style={styles.heroSubtitle}>{t("landing.hero.subtitle")}</Text>

              <View style={styles.heroButtons}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/sign-up")}>
                  <Text style={styles.primaryButtonText}>{t("landing.getStarted")}</Text>
                  <ArrowRight color="#FFFFFF" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/login")}>
                  <Text style={styles.secondaryButtonText}>{t("landing.signIn")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          <Image
            source={{
              uri: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("landing.features.title")}</Text>
          <Text style={styles.sectionSubtitle}>{t("landing.features.subtitle")}</Text>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>{feature.icon}</View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <LinearGradient
            colors={[theme.colors.accent + "20", theme.colors.primary + "20"]}
            style={styles.statsGradient}
          >
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50K+</Text>
                <Text style={styles.statLabel}>{t("landing.stats.users")}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1M+</Text>
                <Text style={styles.statLabel}>{t("landing.stats.workouts")}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>{t("landing.stats.satisfaction")}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("landing.testimonials.title")}</Text>
          <Text style={styles.sectionSubtitle}>{t("landing.testimonials.subtitle")}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialsScroll}>
            {testimonials.map((testimonial, index) => (
              <View key={index} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Image source={{ uri: testimonial.image }} style={styles.testimonialAvatar} />
                  <View style={styles.testimonialInfo}>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <View style={styles.testimonialRating}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} color={theme.colors.warning} size={16} fill={theme.colors.warning} />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.testimonialText}>{testimonial.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaTitle}>{t("landing.cta.title")}</Text>
            <Text style={styles.ctaSubtitle}>{t("landing.cta.subtitle")}</Text>

            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/sign-up")}>
              <Text style={styles.ctaButtonText}>{t("landing.cta.button")}</Text>
              <ArrowRight color={theme.colors.primary} size={20} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 FitFlow. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    logo: {
      fontSize: 28,
      fontFamily: "Inter-Bold",
      color: theme.colors.primary,
    },
    themeToggle: {
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.surface,
    },
    heroSection: {
      marginHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.xxl,
      borderRadius: theme.borderRadius.xl,
      overflow: "hidden",
      ...theme.shadows.lg,
    },
    heroGradient: {
      padding: theme.spacing.xl,
    },
    heroContent: {
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    heroTitle: {
      fontSize: 32,
      fontFamily: "Inter-Bold",
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: theme.spacing.md,
    },
    heroSubtitle: {
      fontSize: 18,
      fontFamily: "Inter-Regular",
      color: "#FFFFFF",
      textAlign: "center",
      opacity: 0.9,
      marginBottom: theme.spacing.xl,
    },
    heroButtons: {
      flexDirection: "row",
      gap: theme.spacing.md,
      flexWrap: "wrap",
      justifyContent: "center",
    },
    primaryButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      gap: theme.spacing.sm,
    },
    primaryButtonText: {
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
      color: theme.colors.primary,
    },
    secondaryButton: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
    secondaryButtonText: {
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
      color: "#FFFFFF",
    },
    heroImage: {
      width: "100%",
      height: 200,
    },
    section: {
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.xxl,
    },
    sectionTitle: {
      fontSize: 28,
      fontFamily: "Inter-Bold",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: theme.spacing.sm,
    },
    sectionSubtitle: {
      fontSize: 16,
      fontFamily: "Inter-Regular",
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
    },
    featuresGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: theme.spacing.md,
    },
    featureCard: {
      width: (width - theme.spacing.lg * 2 - theme.spacing.md) / 2,
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      alignItems: "center",
      ...theme.shadows.md,
    },
    featureIcon: {
      marginBottom: theme.spacing.md,
    },
    featureTitle: {
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: theme.spacing.sm,
    },
    featureDescription: {
      fontSize: 14,
      fontFamily: "Inter-Regular",
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
    statsSection: {
      marginHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.xxl,
      borderRadius: theme.borderRadius.xl,
      overflow: "hidden",
    },
    statsGradient: {
      padding: theme.spacing.xl,
    },
    statsGrid: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 32,
      fontFamily: "Inter-Bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    statLabel: {
      fontSize: 14,
      fontFamily: "Inter-Medium",
      color: theme.colors.textSecondary,
    },
    testimonialsScroll: {
      marginHorizontal: -theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
    },
    testimonialCard: {
      width: 280,
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      marginRight: theme.spacing.md,
      ...theme.shadows.md,
    },
    testimonialHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },
    testimonialAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: theme.spacing.md,
    },
    testimonialInfo: {
      flex: 1,
    },
    testimonialName: {
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    testimonialRating: {
      flexDirection: "row",
      gap: 2,
    },
    testimonialText: {
      fontSize: 14,
      fontFamily: "Inter-Regular",
      color: theme.colors.textSecondary,
      lineHeight: 20,
    },
    ctaSection: {
      marginHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.xxl,
      borderRadius: theme.borderRadius.xl,
      overflow: "hidden",
      ...theme.shadows.lg,
    },
    ctaGradient: {
      padding: theme.spacing.xl,
      alignItems: "center",
    },
    ctaTitle: {
      fontSize: 24,
      fontFamily: "Inter-Bold",
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: theme.spacing.sm,
    },
    ctaSubtitle: {
      fontSize: 16,
      fontFamily: "Inter-Regular",
      color: "#FFFFFF",
      textAlign: "center",
      opacity: 0.9,
      marginBottom: theme.spacing.xl,
    },
    ctaButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      gap: theme.spacing.sm,
    },
    ctaButtonText: {
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
      color: theme.colors.primary,
    },
    footer: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
      alignItems: "center",
    },
    footerText: {
      fontSize: 14,
      fontFamily: "Inter-Regular",
      color: theme.colors.textSecondary,
    },
  });
