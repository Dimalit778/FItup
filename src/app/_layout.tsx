import "@/i18n"; // Import i18n configuration
import { SupabaseProvider } from "@/src/contexts/supabaseProvider";
import { ThemeProvider, useTheme } from "@/src/contexts/ThemeContext";
import { tokenCache } from "@/src/store/authStore";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable");
}

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const useFontLoader = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError };
};

const AppContent = () => {
  const { isSignedIn } = useAuth();
  const { isDark } = useTheme();

  return (
    <SupabaseProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn ?? false}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SupabaseProvider>
  );
};

const RootLayout = () => {
  const { fontsLoaded, fontError } = useFontLoader();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
