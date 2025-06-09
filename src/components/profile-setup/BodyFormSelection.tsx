import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";
import { SetupLayout } from "./SetupLayout";

const bodyTypes = [
  {
    id: "muscle",
    label: "Muscular",
    image: require("../../assets/profileSetupImages/male_avatar.png"),
  },
  {
    id: "standard",
    label: "Standard",
    image: require("../../assets/profileSetupImages/male_avatar.png"),
  },
  {
    id: "slim",
    label: "Slim",
    image: require("../../assets/profileSetupImages/male_avatar.png"),
  },
  {
    id: "plus",
    label: "Plus",
    image: require("../../assets/profileSetupImages/male_avatar.png"),
  },
] as const;

export function BodyFormSelection() {
  const { updateProfileData, profileData, setCurrentStep } = useProfileSetup();

  const handleSelect = (bodyForm: (typeof bodyTypes)[number]["id"]) => {
    updateProfileData({ bodyForm });
    setCurrentStep(4);
  };

  return (
    <SetupLayout
      title="Your Body Type"
      subtitle="Select the body type that best matches you"
      showNextButton={false}
    >
      <View style={styles.container}>
        <View style={styles.grid}>
          {bodyTypes.map((type) => (
            <Pressable
              key={type.id}
              style={[
                styles.option,
                profileData.bodyForm === type.id && styles.selectedOption,
              ]}
              onPress={() => handleSelect(type.id)}
            >
              <Image source={type.image} style={styles.image} />
              <Text style={styles.label}>{type.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SetupLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  option: {
    width: 150,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedOption: {
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
