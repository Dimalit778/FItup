import { useTheme } from "@/src/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
// import { supabase } from "../../lib/supabase";

export default function TabsLayout() {
  const { theme } = useTheme();

  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchProfile = async () => {
  //     try {
  //       const profile = await getProfile();
  //       if (isMounted) {
  //         setProfile(profile);
  //         setError(null);
  //       }
  //     } catch (error) {
  //       if (isMounted) {
  //         console.error("Error fetching profile:", error);
  //         setError(error as Error);
  //       }
  //     } finally {
  //       if (isMounted) {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   fetchProfile();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [getProfile]);

  // // Show nothing while loading to prevent flash
  // if (isLoading) {
  //   return null;
  // }
  // if (!profile) {
  //   return <Redirect href="/profile-setup" />;
  // }

  // Show error state
  // if (error) {
  //   return (
  //     <View
  //       style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}
  //     >
  //       <Text style={{ color: theme.colors.error, marginBottom: 10 }}>Failed to load profile</Text>
  //       <Text style={{ color: theme.colors.text }}>Please try again later</Text>
  //     </View>
  //   );
  // }

  // // Redirect to profile setup if no profile exists
  // if (!profile?.setup_completed) {
  //   return <Redirect href="/profile-setup" />;
  // }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile-setup"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
