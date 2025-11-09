import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { usePremium } from '@/contexts/PremiumContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';

export default function PaywallScreen() {
  const { isPremium, offerings, purchasePackage, restorePurchases, isLoading } = usePremium();
  const [purchasing, setPurchasing] = useState(false);

  // If already premium, redirect back
  if (isPremium) {
    router.back();
    return null;
  }

  const handlePurchase = async (pkg: any) => {
    setPurchasing(true);
    try {
      const result = await purchasePackage(pkg);
      if (result.success) {
        Alert.alert(
          '🎉 Welcome to Premium!',
          'You now have access to all features. Enjoy learning!',
          [{ text: 'Start Learning', onPress: () => router.back() }]
        );
      } else if (!result.error?.includes('cancelled')) {
        Alert.alert('Purchase Error', result.error || 'Something went wrong');
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setPurchasing(true);
    try {
      const result = await restorePurchases();
      if (result.success) {
        Alert.alert(
          '✅ Purchases Restored!',
          'Your premium access has been restored.',
          [{ text: 'Continue', onPress: () => router.back() }]
        );
      } else {
        Alert.alert('No Purchases Found', 'We could not find any previous purchases to restore.');
      }
    } finally {
      setPurchasing(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading offers...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <IconSymbol name="crown.fill" size={64} color="#FFD700" />
        <Text style={styles.headerTitle}>Unlock Premium</Text>
        <Text style={styles.headerSubtitle}>Master Shorthand Faster</Text>
      </LinearGradient>

      {/* Feature Comparison */}
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>What You Get</Text>

        {/* Free Features */}
        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <Text style={styles.featureTitle}>Free Features</Text>
            <Text style={styles.featureBadge}>Always Free</Text>
          </View>
          <FeatureItem icon="checkmark.circle" text="Basic Strokes Library" free />
          <FeatureItem icon="checkmark.circle" text="Q&A Section" free />
          <FeatureItem icon="checkmark.circle" text="Learning Resources" free />
          <FeatureItem icon="checkmark.circle" text="Basic Exploration" free />
        </View>

        {/* Premium Features */}
        <View style={[styles.featureCard, styles.premiumCard]}>
          <View style={styles.featureHeader}>
            <IconSymbol name="crown.fill" size={20} color="#FFD700" />
            <Text style={styles.featureTitlePremium}>Premium Features</Text>
          </View>
          <FeatureItem icon="star.fill" text="Complete Shortforms Library" premium />
          <FeatureItem icon="star.fill" text="Phrases & Combinations" premium />
          <FeatureItem icon="star.fill" text="Full Outlines Database" premium />
          <FeatureItem icon="star.fill" text="Intersections Guide" premium />
          <FeatureItem icon="star.fill" text="Professional Comparison Tools" premium />
          <FeatureItem icon="star.fill" text="Advanced Stroke Recognition" premium />
          <FeatureItem icon="star.fill" text="No Ads, Forever" premium />
          <FeatureItem icon="star.fill" text="Lifetime Updates" premium />
        </View>
      </View>

      {/* Pricing Options */}
      <View style={styles.pricingSection}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>

        {offerings?.availablePackages && offerings.availablePackages.length > 0 ? (
          offerings.availablePackages.map((pkg) => (
            <TouchableOpacity
              key={pkg.identifier}
              style={styles.pricingCard}
              onPress={() => handlePurchase(pkg)}
              disabled={purchasing}
            >
              <View style={styles.pricingHeader}>
                <Text style={styles.pricingTitle}>{pkg.product.title}</Text>
                {pkg.packageType === 'ANNUAL' && (
                  <View style={styles.saveBadge}>
                    <Text style={styles.saveBadgeText}>BEST VALUE</Text>
                  </View>
                )}
              </View>
              <Text style={styles.pricingPrice}>{pkg.product.priceString}</Text>
              <Text style={styles.pricingDescription}>{pkg.product.description}</Text>
              <View style={styles.buyButton}>
                <Text style={styles.buyButtonText}>
                  {purchasing ? 'Processing...' : 'Get Premium'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          // Fallback pricing if RevenueCat not configured yet
          <>
            <View style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <Text style={styles.pricingTitle}>Monthly Subscription</Text>
              </View>
              <Text style={styles.pricingPrice}>$4.99/month</Text>
              <Text style={styles.pricingDescription}>Cancel anytime</Text>
              <View style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Coming Soon</Text>
              </View>
            </View>

            <View style={[styles.pricingCard, styles.recommendedCard]}>
              <View style={styles.pricingHeader}>
                <Text style={styles.pricingTitle}>Annual Subscription</Text>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveBadgeText}>SAVE 50%</Text>
                </View>
              </View>
              <Text style={styles.pricingPrice}>$29.99/year</Text>
              <Text style={styles.pricingDescription}>Best value - only $2.50/month</Text>
              <View style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Coming Soon</Text>
              </View>
            </View>

            <View style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <Text style={styles.pricingTitle}>Lifetime Access</Text>
              </View>
              <Text style={styles.pricingPrice}>$49.99</Text>
              <Text style={styles.pricingDescription}>One-time payment, yours forever</Text>
              <View style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Coming Soon</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Benefits */}
      <View style={styles.benefitsSection}>
        <View style={styles.benefitItem}>
          <IconSymbol name="checkmark.shield.fill" size={32} color="#4caf50" />
          <Text style={styles.benefitText}>Secure Payment via Google Play</Text>
        </View>
        <View style={styles.benefitItem}>
          <IconSymbol name="arrow.clockwise.circle.fill" size={32} color="#2196f3" />
          <Text style={styles.benefitText}>Cancel Anytime (Subscriptions)</Text>
        </View>
        <View style={styles.benefitItem}>
          <IconSymbol name="iphone" size={32} color="#ff9800" />
          <Text style={styles.benefitText}>Works on All Your Devices</Text>
        </View>
      </View>

      {/* Restore & Close */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleRestore} disabled={purchasing}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <Text style={styles.legalText}>
        Payment will be charged to your Google Play account. Subscriptions automatically renew
        unless cancelled at least 24 hours before the end of the current period.
      </Text>
    </ScrollView>
  );
}

interface FeatureItemProps {
  icon: string;
  text: string;
  free?: boolean;
  premium?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, free, premium }) => (
  <View style={styles.featureItem}>
    <IconSymbol
      name={icon as any}
      size={20}
      color={premium ? '#FFD700' : '#4caf50'}
    />
    <Text style={[styles.featureText, premium && styles.featureTextPremium]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 40,
    paddingTop: 80,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
  },
  comparisonSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  premiumCard: {
    borderColor: '#FFD700',
    backgroundColor: '#fffef5',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  featureTitlePremium: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff9800',
    flex: 1,
  },
  featureBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  featureTextPremium: {
    fontWeight: '600',
  },
  pricingSection: {
    padding: 20,
    paddingTop: 0,
  },
  pricingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  recommendedCard: {
    borderColor: '#667eea',
    borderWidth: 3,
    backgroundColor: '#f3f4ff',
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pricingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  saveBadge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  saveBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  pricingPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
  },
  pricingDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  benefitsSection: {
    padding: 20,
    paddingTop: 0,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  benefitText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  restoreText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  closeText: {
    fontSize: 16,
    color: '#999',
  },
  legalText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    paddingTop: 0,
    lineHeight: 16,
  },
});
