import { useTheme } from "@/src/contexts/ThemeContext";
import { useSignUp, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { user } = useUser();
  const { theme } = useTheme();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });
      // await completeSignUp.prepareEmailAddressVerification();
      await setActive({ session: completeSignUp.createdSessionId });
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
      await signUp.authenticateWithRedirect({
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      {/* <SafeAreaView style={styles.container}> */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
        <ArrowLeft size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <View style={styles.form}>
          <View style={styles.nameContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              autoComplete="off"
              textContentType="givenName"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              autoComplete="off"
              textContentType="familyName"
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="off"
            textContentType="username"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="off"
            textContentType="oneTimeCode"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={theme.colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoComplete="off"
            textContentType="oneTimeCode"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={onSignUpPress}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Creating account..." : "Create Account"}</Text>
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

          <TouchableOpacity style={styles.linkButton} onPress={() => router.navigate("/login")}>
            <Text style={styles.linkText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
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
    nameContainer: {
      flexDirection: "row",
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
    halfInput: {
      flex: 1,
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
