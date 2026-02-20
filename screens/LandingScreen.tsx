import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function LandingScreen({ onGetStarted, onLogin }: Props) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <View style={styles.dot} />
          <Text style={styles.badgeText}>LIVE ENVIRONMENTAL MONITORING</Text>
        </View>
        
        <Text style={styles.title}>
          Protect Your Lungs,{'\n'}
          <Text style={styles.titleGradient}>Breathe Rwanda.</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          Asthma Shield uses advanced AI and real-time climate data to protect you from respiratory risks across Rwanda.
        </Text>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} onPress={onGetStarted}>
            <Text style={styles.primaryButtonText}>JOIN THE SHIELD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onLogin}>
            <Text style={styles.secondaryButtonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        {/* Feature Card */}
        <View style={styles.featureCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>KIGALI SECTOR</Text>
              <Text style={styles.cardTitle}>Clear Air Quality</Text>
            </View>
            <View style={styles.checkIcon}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>TEMPERATURE</Text>
              <Text style={styles.statValue}>24°C</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>AQI INDEX</Text>
              <Text style={[styles.statValue, { color: '#10B981' }]}>12</Text>
            </View>
          </View>
          
          <View style={styles.aiCard}>
            <View>
              <Text style={styles.aiLabel}>AI MEDICAL GUARD</Text>
              <Text style={styles.aiTitle}>Online Consultations</Text>
            </View>
            <View style={styles.videoIcon}>
              <Text style={styles.videoText}>📹</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Precision Protection</Text>
        <Text style={styles.featuresSubtitle}>
          Built specifically for the Rwandan landscape, combining local climate data with global AI excellence.
        </Text>
        
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>☀️</Text>
          </View>
          <Text style={styles.featureTitle}>Climate Tracking</Text>
          <Text style={styles.featureDesc}>
            Live temperature, humidity, and AQI updates from across all provinces in Rwanda.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#D1FAE5' }]}>
            <Text style={styles.iconText}>👨‍⚕️</Text>
          </View>
          <Text style={styles.featureTitle}>AI Medical Doctor</Text>
          <Text style={styles.featureDesc}>
            24/7 video and voice consultations with an AI doctor trained on respiratory health protocols.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#FEE2E2' }]}>
            <Text style={styles.iconText}>🔔</Text>
          </View>
          <Text style={styles.featureTitle}>Risk Alerts</Text>
          <Text style={styles.featureDesc}>
            Intelligent notifications when air quality or pollen levels in your district reach risky levels.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>🛡️ ASTHMA SHIELD</Text>
        <Text style={styles.footerText}>© 2024 Asthma Shield Rwanda</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  hero: {
    padding: 24,
    paddingTop: 60,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
    marginRight: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#2563EB',
    letterSpacing: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 16,
    lineHeight: 42,
  },
  titleGradient: {
    color: '#2563EB',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E293B',
  },
  checkIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 20,
    color: '#10B981',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  aiCard: {
    backgroundColor: '#2563EB',
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: 'white',
  },
  videoIcon: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoText: {
    fontSize: 18,
  },
  features: {
    padding: 24,
    backgroundColor: 'white',
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  featuresSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  featureItem: {
    marginBottom: 32,
  },
  featureIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  footer: {
    padding: 40,
    backgroundColor: '#1E293B',
    alignItems: 'center',
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: '900',
    color: 'white',
    marginBottom: 12,
    letterSpacing: 1,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 2,
  },
});
