import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { useUserProfileStore } from '../store/userProfileStore';

const REVENUE_CAT_API_KEY = process.env.EXPO_PUBLIC_REVENUE_CAT_API_KEY || '';

export const subscriptionService = {
  async initialize() {
    Purchases.configure({ apiKey: REVENUE_CAT_API_KEY });
  },

  async getOfferings(): Promise<PurchasesPackage[]> {
    try {
      const offerings = await Purchases.getOfferings();
      return offerings.current?.availablePackages || [];
    } catch (error) {
      console.error('Error fetching offerings:', error);
      return [];
    }
  },

  async purchasePackage(package_: PurchasesPackage) {
    try {
      const { customerInfo } = await Purchases.purchasePackage(package_);
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
      
      // Update user profile subscription status
      const { updateProfile } = useUserProfileStore.getState();
      updateProfile({ subscriptionStatus: isPremium ? 'premium' : 'free' });
      
      return isPremium;
    } catch (error) {
      console.error('Error purchasing package:', error);
      throw error;
    }
  },

  async restorePurchases() {
    try {
      const { customerInfo } = await Purchases.restorePurchases();
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
      
      const { updateProfile } = useUserProfileStore.getState();
      updateProfile({ subscriptionStatus: isPremium ? 'premium' : 'free' });
      
      return isPremium;
    } catch (error) {
      console.error('Error restoring purchases:', error);
      throw error;
    }
  },

  async checkSubscriptionStatus(): Promise<boolean> {
    try {
      const { customerInfo } = await Purchases.getCustomerInfo();
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
      
      const { updateProfile } = useUserProfileStore.getState();
      updateProfile({ subscriptionStatus: isPremium ? 'premium' : 'free' });
      
      return isPremium;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  },
}; 