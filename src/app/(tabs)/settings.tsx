import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { useSubscription } from '@/src/hooks/useSubscription';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { ChevronRight, Crown, Globe, CreditCard, Moon, Sun, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const { isPremium } = useSubscription();
  const { theme, isDark, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const router = useRouter();

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    await i18n.changeLanguage(newLang);
    
    if (newLang === 'he') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('settings.logout'),
      t('settings.logoutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('settings.logout'), 
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/');
          }
        },
      ]
    );
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.appearance')}</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              {isDark ? (
                <Moon color={theme.colors.textSecondary} size={20} />
              ) : (
                <Sun color={theme.colors.textSecondary} size={20} />
              )}
              <Text style={styles.settingLabel}>{t('settings.darkMode')}</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={toggleLanguage}>
            <View style={styles.settingLeft}>
              <Globe color={theme.colors.textSecondary} size={20} />
              <Text style={styles.settingLabel}>{t('settings.language')}</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>
                {i18n.language === 'en' ? 'English' : 'עברית'}
              </Text>
              <ChevronRight color={theme.colors.textSecondary} size={16} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Subscription Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.subscription')}</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Crown color={isPremium ? theme.colors.warning : theme.colors.textSecondary} size={20} />
              <View>
                <Text style={styles.settingLabel}>{t('settings.subscription')}</Text>
                <Text style={styles.settingSubtitle}>
                  {isPremium ? 'Premium Active' : 'Free Plan'}
                </Text>
              </View>
            </View>
            <View style={[styles.premiumBadge, isPremium && styles.premiumBadgeActive]}>
              <Text style={[styles.premiumBadgeText, isPremium && styles.premiumBadgeTextActive]}>
                {isPremium ? 'PRO' : 'FREE'}
              </Text>
            </View>
          </View>

          {isPremium && (
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <CreditCard color={theme.colors.textSecondary} size={20} />
                <Text style={styles.settingLabel}>{t('settings.managePlan')}</Text>
              </View>
              <ChevronRight color={theme.colors.textSecondary} size={16} />
            </TouchableOpacity>
          )}
        </View>

        {/* Premium Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.premium')}</Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>AI-Generated Workout Plans</Text>
              <View style={[styles.featureStatus, isPremium && styles.featureActive]}>
                <Text style={[styles.featureStatusText, isPremium && styles.featureActiveText]}>
                  {isPremium ? 'Active' : 'Locked'}
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>Personalized Nutrition Plans</Text>
              <View style={[styles.featureStatus, isPremium && styles.featureActive]}>
                <Text style={[styles.featureStatusText, isPremium && styles.featureActiveText]}>
                  {isPremium ? 'Active' : 'Locked'}
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>Advanced Progress Analytics</Text>
              <View style={[styles.featureStatus, isPremium && styles.featureActive]}>
                <Text style={[styles.featureStatusText, isPremium && styles.featureActiveText]}>
                  {isPremium ? 'Active' : 'Locked'}
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>Priority Support</Text>
              <View style={[styles.featureStatus, isPremium && styles.featureActive]}>
                <Text style={[styles.featureStatusText, isPremium && styles.featureActiveText]}>
                  {isPremium ? 'Active' : 'Locked'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.account')}</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut color={theme.colors.error} size={20} />
              <Text style={[styles.settingLabel, styles.logoutText]}>{t('settings.logout')}</Text>
            </View>
            <ChevronRight color={theme.colors.textSecondary} size={16} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.textSecondary,
  },
  premiumBadge: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  premiumBadgeActive: {
    backgroundColor: theme.colors.warning,
  },
  premiumBadgeText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  premiumBadgeTextActive: {
    color: '#FFFFFF',
  },
  featureList: {
    padding: 0,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
    flex: 1,
  },
  featureStatus: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  featureActive: {
    backgroundColor: theme.colors.success + '20',
  },
  featureStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.textSecondary,
  },
  featureActiveText: {
    color: theme.colors.success,
  },
  logoutText: {
    color: theme.colors.error,
  },
});