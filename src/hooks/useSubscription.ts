import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

// Only import Purchases on native platforms
let Purchases: any = null;
let CustomerInfo: any = null;

if (Platform.OS === 'ios' || Platform.OS === 'android') {
  try {
    const PurchasesModule = require('react-native-purchases');
    Purchases = PurchasesModule.default;
    CustomerInfo = PurchasesModule.CustomerInfo;
  } catch (error) {
    console.warn('RevenueCat not available on this platform');
  }
}

export const useSubscription = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
    
    if (Purchases && (Platform.OS === 'ios' || Platform.OS === 'android')) {
      const listener = Purchases.addCustomerInfoUpdateListener((info: any) => {
        setCustomerInfo(info);
        setIsPremium(info.entitlements.active['premium'] !== undefined);
      });

      return () => {
        listener.remove();
      };
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      if (Purchases && (Platform.OS === 'ios' || Platform.OS === 'android')) {
        const info = await Purchases.getCustomerInfo();
        setCustomerInfo(info);
        setIsPremium(info.entitlements.active['premium'] !== undefined);
      } else {
        // For web platform, set default values
        setIsPremium(false);
        setCustomerInfo(null);
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      // Set default values on error
      setIsPremium(false);
      setCustomerInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return { isPremium, customerInfo, loading, checkSubscriptionStatus };
};