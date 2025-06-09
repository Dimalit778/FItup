import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";
import { SetupLayout } from "./SetupLayout";

export function GenderSelection() {
  const { updateProfileData, profileData, setCurrentStep } = useProfileSetup();

  const handleSelect = (gender: "male" | "female") => {
    updateProfileData({ gender });
    setCurrentStep(2);
  };

  return (
    <SetupLayout
      title="Choose Your Gender"
      subtitle="Select the option that best represents you"
      showBackButton={false}
      showNextButton={false}
    >
      <View style={styles.container}>
        <Pressable
          style={[
            styles.option,
            profileData.gender === "male" && styles.selectedOption,
          ]}
          onPress={() => handleSelect("male")}
        >
          <Image
            source={require("../../assets/profileSetupImages/male_avatar.png")}
            style={styles.image}
          />
        </Pressable>

        <Pressable
          style={[
            styles.option,
            profileData.gender === "female" && styles.selectedOption,
          ]}
          onPress={() => handleSelect("female")}
        >
          <Image
            source={require("../../assets/profileSetupImages/female_avatar.jpg")}
            style={styles.image}
          />
        </Pressable>
      </View>
    </SetupLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  option: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});
