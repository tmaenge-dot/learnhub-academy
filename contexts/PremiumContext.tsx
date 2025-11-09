import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Purchases, { 
  CustomerInfo, 
  PurchasesOffering,
  PurchasesPackage,
  LOG_LEVEL 
} from 'react-native-purchases';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// RevenueCat API Keys - prefer environment variables or Expo manifest extras
// Priority: process.env -> Constants.manifest.extra -> placeholder
const REVENUECAT_API_KEY_ANDROID =
  process.env.REVENUECAT_API_KEY_ANDROID ||
  // expo prebuild / EAS: put keys in app.json extra or use EAS secrets
  (Constants.manifest?.extra && (Constants.manifest.extra as any).REVENUECAT_API_KEY_ANDROID) ||
  'your_revenuecat_android_key_here';

const REVENUECAT_API_KEY_IOS =
  process.env.REVENUECAT_API_KEY_IOS ||
  (Constants.manifest?.extra && (Constants.manifest.extra as any).REVENUECAT_API_KEY_IOS) ||
  'your_revenuecat_ios_key_here';

// Premium entitlement identifier - must match your RevenueCat configuration
const PREMIUM_ENTITLEMENT = 'premium';

interface PremiumContextType {
  isPremium: boolean;
  isLoading: boolean;
  offerings: PurchasesOffering | null;
  customerInfo: CustomerInfo | null;
  purchasePackage: (pkg: PurchasesPackage) => Promise<{ success: boolean; error?: string }>;
  restorePurchases: () => Promise<{ success: boolean; error?: string }>;
  checkPremiumStatus: () => Promise<void>;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within PremiumProvider');
  }
  return context;
};

interface PremiumProviderProps {
  children: ReactNode;
}

export const PremiumProvider: React.FC<PremiumProviderProps> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  useEffect(() => {
    initializePurchases();
  }, []);

  const initializePurchases = async () => {
    try {
      // Configure RevenueCat
      if (Platform.OS === 'android') {
        await Purchases.configure({ apiKey: REVENUECAT_API_KEY_ANDROID });
      } else if (Platform.OS === 'ios') {
        await Purchases.configure({ apiKey: REVENUECAT_API_KEY_IOS });
      }

      // Enable debug logs in development
      if (__DEV__) {
        Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      }

      // Set up listener for customer info updates
      Purchases.addCustomerInfoUpdateListener((info) => {
        updateCustomerInfo(info);
      });

      // Load initial customer info and offerings
      await checkPremiumStatus();
      await loadOfferings();
    } catch (error) {
      console.error('Error initializing purchases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomerInfo = (info: CustomerInfo) => {
    setCustomerInfo(info);
    const hasPremium = info.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
    setIsPremium(hasPremium);
  };

  const checkPremiumStatus = async () => {
    try {
      const info = await Purchases.getCustomerInfo();
      updateCustomerInfo(info);
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        setOfferings(offerings.current);
      }
    } catch (error) {
      console.error('Error loading offerings:', error);
    }
  };

  const purchasePackage = async (pkg: PurchasesPackage): Promise<{ success: boolean; error?: string }> => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      updateCustomerInfo(customerInfo);
      
      if (customerInfo.entitlements.active[PREMIUM_ENTITLEMENT]) {
        return { success: true };
      } else {
        return { success: false, error: 'Purchase completed but premium not activated' };
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        console.error('Error purchasing package:', error);
        return { success: false, error: error.message || 'Purchase failed' };
      }
      return { success: false, error: 'Purchase cancelled' };
    }
  };

  const restorePurchases = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const info = await Purchases.restorePurchases();
      updateCustomerInfo(info);
      
      if (info.entitlements.active[PREMIUM_ENTITLEMENT]) {
        return { success: true };
      } else {
        return { success: false, error: 'No purchases to restore' };
      }
    } catch (error: any) {
      console.error('Error restoring purchases:', error);
      return { success: false, error: error.message || 'Restore failed' };
    }
  };

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        isLoading,
        offerings,
        customerInfo,
        purchasePackage,
        restorePurchases,
        checkPremiumStatus,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};
