import { useAuth } from '@/src/contexts/AuthContext';
import { useTheme } from '@/src/contexts/ThemeContext';
import { supabase } from '@/src/lib/supabase';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RegisterScreen() {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();
  const { signUp, signInWithGoogle, signInWithApple } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
  }>({});



  const getGoogleIcon = () => {
    if (Platform.OS === 'ios') {
      return isDark ? require('@/assets/ios/ios_dark_google_full.png') : require('@/assets/ios/ios_light_google_full.png');
        
    }
    return isDark ? require('@/assets/android/android_dark_google_full.png') : require('@/assets/android/android_light_google_full.png');
     
  };

  const validateForm = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      password?: string; 
      confirmPassword?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = t('auth.errors.nameRequired');
    }
    
    if (!email) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }
    
    if (!password) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort');
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordMismatch');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      console.log('signUpWithEmail');
      async function signUpWithEmail() {    setLoading(true)
        const { data: { session },error,} = await supabase.auth.signUp({ email: email,password:       password,})    
        if (error) Alert.alert(error.message)    
        if (!session) Alert.alert('Please check your inbox for email verification!')  
        setLoading(false)  }
      signUpWithEmail();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.errors.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.errors.googleLoginFailed'));
    }
  };
  
  const handleAppleLogin = async () => {
    try {
      await signInWithApple();
    } catch (error:any) {
      if (error.code !== 'ERR_CANCELED') {
        Alert.alert(t('common.error'), t('auth.errors.appleLoginFailed'));
      }
    }
  };

  const styles = createStyles(theme, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={theme.colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('auth.signUp')}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Content */}
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{t('auth.createAccount')}</Text>
              <Text style={styles.subtitle}>{t('auth.signUpSubtitle')}</Text>
            </View>

            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('auth.fullName')}</Text>
                <View style={[styles.inputContainer, errors.name && styles.inputError]}>
                  <User color={theme.colors.textSecondary} size={20} />
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder={t('auth.namePlaceholder')}
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('auth.email')}</Text>
                <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                  <Mail color={theme.colors.textSecondary} size={20} />
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t('auth.emailPlaceholder')}
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('auth.password')}</Text>
                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                  <Lock color={theme.colors.textSecondary} size={20} />
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t('auth.passwordPlaceholder')}
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff color={theme.colors.textSecondary} size={20} />
                    ) : (
                      <Eye color={theme.colors.textSecondary} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('auth.confirmPassword')}</Text>
                <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                  <Lock color={theme.colors.textSecondary} size={20} />
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <EyeOff color={theme.colors.textSecondary} size={20} />
                    ) : (
                      <Eye color={theme.colors.textSecondary} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
              </View>

             

              {/* Register Button */}
              <TouchableOpacity
                style={[styles.registerButton, loading && styles.disabledButton]}
                onPress={handleRegister}
                disabled={loading}
              >
                <LinearGradient
                  colors={[theme.colors.primary, theme.colors.secondary]}
                  style={styles.registerGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.registerButtonText}>{t('auth.signUp')}</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Sign In Link */}
              <View style={styles.signInSection}>
                <Text style={styles.signInText}>{t('auth.haveAccount')}</Text>
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                  <Text style={styles.signInLink}>{t('auth.signIn')}</Text>
                </TouchableOpacity>
              </View>
               {/* Social Login Section */}
               <View style={styles.socialSection}>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>{t('auth.orContinueWith')}</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={handleGoogleLogin}
                  >
                   <Image
                    source={getGoogleIcon()}
                    style={styles.socialIcon}
                    contentFit="contain"
                    contentPosition="center"
                  />
                  </TouchableOpacity>

                  
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  titleSection: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  registerButton: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  disabledButton: {
    opacity: 0.6,
  },
  registerGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  signInSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  signInText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.textSecondary,
  },
  signInLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.primary,
  },
  socialSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  socialButtons: {
    gap: theme.spacing.md,
  },
  socialButton: {
    height: 55,
    width: '100%',

  },
  socialIcon: {
    width: '100%',
    height: '100%',
  },
  
});