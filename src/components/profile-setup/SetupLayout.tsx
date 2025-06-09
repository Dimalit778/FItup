import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";

type SetupLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showNextButton?: boolean;
  onNext?: () => void;
  isNextDisabled?: boolean;
};

export function SetupLayout({
  children,
  title,
  subtitle,
  showBackButton = true,
  showNextButton = true,
  onNext,
  isNextDisabled = false,
}: SetupLayoutProps) {
  const { currentStep, setCurrentStep } = useProfileSetup();

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>{children}</View>

        {/* Navigation */}
        <View style={styles.navigation}>
          {showBackButton && currentStep > 1 && (
            <Pressable
              style={[styles.button, styles.backButton]}
              onPress={handleBack}
            >
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
          )}

          {showNextButton && (
            <Pressable
              style={[
                styles.button,
                styles.nextButton,
                isNextDisabled && styles.disabledButton,
              ]}
              onPress={onNext}
              disabled={isNextDisabled}
            >
              <Text style={[styles.buttonText, styles.nextButtonText]}>
                {currentStep === 4 ? "Finish" : "Next"}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                currentStep >= index + 1 && styles.activeProgressDot,
              ]}
            />
          ))}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#e0e0e0",
  },
  nextButton: {
    backgroundColor: "#007AFF",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  nextButtonText: {
    color: "#fff",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
  },
  activeProgressDot: {
    backgroundColor: "#007AFF",
  },
});
