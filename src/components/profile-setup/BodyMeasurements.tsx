import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";
import { SetupLayout } from "./SetupLayout";

export function BodyMeasurements() {
  const { updateProfileData, profileData, setCurrentStep } = useProfileSetup();
  const [height, setHeight] = useState(profileData.height?.toString() || "");
  const [weight, setWeight] = useState(profileData.weight?.toString() || "");

  const handleNext = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (heightNum && weightNum) {
      updateProfileData({ height: heightNum, weight: weightNum });
      setCurrentStep(3);
    }
  };

  const isValid =
    height &&
    weight &&
    !isNaN(parseFloat(height)) &&
    !isNaN(parseFloat(weight));

  return (
    <SetupLayout
      title="Your Measurements"
      subtitle="Enter your height and weight"
      onNext={handleNext}
      isNextDisabled={!isValid}
    >
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="decimal-pad"
              placeholder="175"
              maxLength={5}
            />
            <Text style={styles.unit}>cm</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              placeholder="70"
              maxLength={5}
            />
            <Text style={styles.unit}>kg</Text>
          </View>
        </View>
      </View>
    </SetupLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 50,
  },
  unit: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
});
