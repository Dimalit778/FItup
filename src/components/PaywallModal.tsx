import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { X, Check, Crown, Sparkles } from 'lucide-react-native';
import { BlurView } from '@react-native-community/blur';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { getOfferings, purchasePackage, restorePurchases } from '@/src/lib/revenuecat';
import { initializeRevenueCat } from '@/src/lib/revenuecat';
import type { PurchasesOfferings, PurchasesPackage } from 'react-native-purchases';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PaywallModal({ visible, onClose }: PaywallModalProps) {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PurchasesPackage | null>(null);

  useEffect(() => {
    if (visible) {
      loadOfferings();
    }
  }, [visible]);

  const loadOfferings = async () => {
    try {
      const offerings = await getOfferings();
      setOfferings(offerings);
      const availablePackages = offerings?.current?.availablePackages;
      if (availablePackages && availablePackages.length > 0) {
        setSelectedPackage(availablePackages[0]);
      }
    } catch (error) {
      console.error('Error loading offerings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    setPurchasing(true);
    try {
      await purchasePackage(selectedPackage);
      Alert.alert('Success', t('paywall.success'));
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
      Alert.alert('Error', t('paywall.error'));
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setPurchasing(true);
    try {
      await restorePurchases();
      Alert.alert('Success', t('paywall.restore_success'));
      onClose();
    } catch (error) {
      console.error('Restore failed:', error);
      Alert.alert('Error', t('paywall.restore_error'));
    } finally {
      setPurchasing(false);
    }
  };

  const features = [
    {
      icon: <Sparkles color="#F59E0B" size={20} />,
      text: t('paywall.features.ai'),
    },
    {
      icon: <Crown color="#F59E0B" size={20} />,
      text: t('paywall.features.nutrition'),
    },
    {
      icon: <Check color="#F59E0B" size={20} />,
      text: t('paywall.features.analytics'),
    },
    {
      icon: <Check color="#F59E0B" size={20} />,
      text: t('paywall.features.support'),
    },
  ];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.overlay}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={10}
        />
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={[styles.container, { maxHeight: height * 0.9 }]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#6B7280" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.heroSection}>
              <Crown color="#F59E0B" size={48} />
              <Text style={styles.title}>{t('paywall.title')}</Text>
              <Text style={styles.subtitle}>{t('paywall.subtitle')}</Text>
            </View>

            <View style={styles.featuresSection}>
              {features.map((feature, index) => (
                <Animated.View
                  key={index}
                  entering={FadeIn.delay(index * 100)}
                  style={styles.featureItem}
                >
                  {feature.icon}
                  <Text style={styles.featureText}>{feature.text}</Text>
                </Animated.View>
              ))}
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
              </View>
            ) : (
              offerings?.current?.availablePackages && (
                <View style={styles.packagesSection}>
                  {offerings.current.availablePackages.map((pkg: any, index: number) => (
                    <Animated.View
                      key={pkg.identifier}
                      entering={FadeIn.delay(200 + index * 100)}
                    >
                      <TouchableOpacity
                        style={[
                          styles.packageCard,
                          selectedPackage?.identifier === pkg.identifier && styles.selectedPackage,
                        ]}
                        onPress={() => setSelectedPackage(pkg)}
                      >
                        <View style={styles.packageHeader}>
                          <Text style={styles.packageTitle}>
                            {pkg.packageType === 'ANNUAL' ? t('paywall.yearly') : t('paywall.monthly')}
                          </Text>
                          {pkg.packageType === 'ANNUAL' && (
                            <View style={styles.saveBadge}>
                              <Text style={styles.saveBadgeText}>{t('paywall.save')}</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.packagePrice}>
                          {pkg.product.priceString}
                          <Text style={styles.packagePeriod}>
                            {pkg.packageType === 'ANNUAL' ? ' / year' : ' / month'}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
              )
            )}

            <Animated.View entering={FadeIn.delay(400)}>
              <TouchableOpacity
                style={[styles.purchaseButton, purchasing && styles.disabledButton]}
                onPress={handlePurchase}
                disabled={purchasing || !selectedPackage}
              >
                {purchasing ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.purchaseButtonText}>{t('paywall.purchase')}</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.restoreButton}
                onPress={handleRestore}
                disabled={purchasing}
              >
                <Text style={styles.restoreButtonText}>{t('paywall.restore')}</Text>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.footer}>
              <TouchableOpacity>
                <Text style={styles.footerLink}>{t('paywall.terms')}</Text>
              </TouchableOpacity>
              <Text style={styles.footerSeparator}>•</Text>
              <TouchableOpacity>
                <Text style={styles.footerLink}>{t('paywall.privacy')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  packagesSection: {
    marginBottom: 24,
  },
  packageCard: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedPackage: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  packageTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  saveBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  saveBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  packagePrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  packagePeriod: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  purchaseButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  restoreButton: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  restoreButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  footerLink: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  footerSeparator: {
    color: '#9CA3AF',
    fontSize: 14,
    marginHorizontal: 8,
  },
});