// import Purchases from 'react-native-purchases';
// import { Platform } from 'react-native';

// // Initialize RevenueCat with your API keys
// export const initializeRevenueCat = () => {
//   if (Platform.OS === 'ios') {
//     Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY || '' });
//   } else if (Platform.OS === 'android') {
//     Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY || '' });
//   }
// };

// // Get available packages
// export const getOfferings = async () => {
//   try {
//     const offerings = await Purchases.getOfferings();
//     return offerings;
//   } catch (error) {
//     console.error('Error fetching offerings:', error);
//     throw error;
//   }
// };

// // Purchase a package
// export const purchasePackage = async (packageToPurchase: any) => {
//   try {
//     const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
//     return customerInfo;
//   } catch (error) {
//     console.error('Error purchasing package:', error);
//     throw error;
//   }
// };

// // Restore purchases
// export const restorePurchases = async () => {
//   try {
//     const { customerInfo } = await Purchases.restorePurchases();
//     return customerInfo;
//   } catch (error) {
//     console.error('Error restoring purchases:', error);
//     throw error;
//   }
// };

// // Check subscription status
// export const checkSubscriptionStatus = async () => {
//   try {
//     const customerInfo = await Purchases.getCustomerInfo();
//     return customerInfo.entitlements.active['premium'] !== undefined;
//   } catch (error) {
//     console.error('Error checking subscription status:', error);
//     return false;
//   }
// };