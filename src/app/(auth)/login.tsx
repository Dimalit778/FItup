import { useTheme } from "@/src/contexts/ThemeContext";
import { useAuthStore } from "@/src/store/authStore";
import { syncUserWithSupabase } from "@/src/utils/supabase";
import { useSignIn, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { user } = useUser();
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setIsSignedIn = useAuthStore((state) => state.setIsSignedIn);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
      setIsSignedIn(true);

      // Sync user with Supabase
      if (user) {
        await syncUserWithSupabase(user);
      }

      router.replace("/(tabs)");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onGooglePress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/(tabs)",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/")}
      >
        <ArrowLeft size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={onSignInPress}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.googleButton, loading && styles.buttonDisabled]}
            onPress={onGooglePress}
            disabled={loading}
          >
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push("/sign-up")}
          >
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backButton: {
      position: "absolute",
      top: 60,
      left: 20,
      zIndex: 1,
      padding: 8,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
      justifyContent: "center",
    },
    title: {
      fontSize: 32,
      fontFamily: "Inter-Bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: "Inter-Regular",
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xl,
    },
    form: {
      gap: theme.spacing.md,
    },
    input: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      fontSize: 16,
      fontFamily: "Inter-Regular",
      color: theme.colors.text,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      alignItems: "center",
      marginTop: theme.spacing.md,
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: theme.spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      marginHorizontal: theme.spacing.md,
      color: theme.colors.textSecondary,
      fontFamily: "Inter-Medium",
    },
    googleButton: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    googleButtonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
    },
    linkButton: {
      alignItems: "center",
      marginTop: theme.spacing.md,
    },
    linkText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontFamily: "Inter-Medium",
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      fontFamily: "Inter-Regular",
      textAlign: "center",
    },
  });
