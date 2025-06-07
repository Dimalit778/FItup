import i18n from "@/i18n";
import { SupabaseProvider } from "@/src/contexts/supabaseProvider";
import { ThemeProvider, useTheme } from "@/src/contexts/ThemeContext";
import { tokenCache } from "@/src/store/authStore";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SupabaseProvider>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <AppWithTheme />
          </ThemeProvider>
        </I18nextProvider>
      </SupabaseProvider>
    </ClerkProvider>
  );
}

function AppWithTheme() {
  const { isDark } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(auth)"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="(tabs)"
          redirect={!isSignedIn}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
