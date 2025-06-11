// import { useUser } from "@clerk/clerk-expo";
// import { Redirect, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Text, View } from "react-native";
// import { BodyFormSelection } from "../../components/profile-setup/BodyFormSelection";
// import { BodyMeasurements } from "../../components/profile-setup/BodyMeasurements";
// import { GenderSelection } from "../../components/profile-setup/GenderSelection";
// import { WorkoutExperience } from "../../components/profile-setup/WorkoutExperience";

import { Text, View } from "react-native";

// import { ProfileSetupProvider, useProfileSetup } from "../../contexts/ProfileSetupContext";
export default function ProfileSetupContent() {
  return (
    <View>
      <Text>Profile Setup</Text>
    </View>
  );
}
// function ProfileSetupContent() {
//   const { currentStep } = useProfileSetup();
//   const { user } = useUser();
//   const router = useRouter();
//   const { getProfile } = useSupabase();
//   const [isLoading, setIsLoading] = useState(true);

//   // Redirect if not authenticated
//   if (!isSignedIn) {
//     return <Redirect href="/" />;
//   }

//   // Redirect if profile already completed
//   if (profile?.has_completed_profile) {
//     return <Redirect href="/(app)" />;
//   }
//   useEffect(() => {
//     const checkProfile = async () => {
//       if (!user) return;

//       try {
//         const profile = await getProfile();
//         if (profile?.setup_completed) {
//           router.replace("/(tabs)");
//         }
//       } catch (error) {
//         console.error("Error checking profile:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkProfile();
//   }, [user]);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   switch (currentStep) {
//     case 1:
//       return <GenderSelection />;
//     case 2:
//       return <BodyMeasurements />;
//     case 3:
//       return <BodyFormSelection />;
//     case 4:
//       return <WorkoutExperience />;
//     default:
//       return null;
//   }
// }

// export default function ProfileSetup() {
//   return (
//     <ProfileSetupProvider>
//       <View style={{ flex: 1 }}>
//         <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", padding: 16 }}>
//           Complete Your Profile
//         </Text>
//         <ProfileSetupContent />
//       </View>
//     </ProfileSetupProvider>
//   );
// }
