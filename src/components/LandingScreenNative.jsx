import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LandingScreen({ onGetStarted, onLogin }) {
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({ users: 0, alerts: 0, cities: 0 });

  // Animated counters
  useEffect(() => {
    const targets = { users: 15000, alerts: 50000, cities: 30 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        users: Math.floor(targets.users * progress),
        alerts: Math.floor(targets.alerts * progress),
        cities: Math.floor(targets.cities * progress)
      });
      
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  const theme = darkMode ? darkStyles : lightStyles;

  return (
    <ScrollView style={[styles.container, theme.container]}>
      {/* Header */}
      <View style={[styles.header, theme.header]}>
        <Text style={[styles.logo, theme.text]}>🛡️ Asthma Shield</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
            <Text style={theme.text}>{darkMode ? '☀️ Light' : '🌙 Dark'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogin}>
            <Text style={[theme.text, styles.signIn]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={[styles.heroTitle, theme.text]}>
          Protect Your Lungs{'\n'}
          <Text style={styles.heroAccent}>Breathe Rwanda.</Text>
        </Text>
        
        <Text style={[styles.heroSubtitle, theme.subtitle]}>
          AI-powered respiratory protection with real-time climate tracking across Rwanda.
        </Text>

        <View style={styles.heroButtons}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={onGetStarted}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.secondaryButton, theme.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>Try Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weather Card */}
      <View style={[styles.weatherCard, theme.card]}>
        <Text style={[styles.cardTitle, theme.text]}>Kigali Live Weather</Text>
        
        <View style={styles.weatherGrid}>
          <View style={[styles.weatherItem, theme.weatherItem]}>
            <Text style={[styles.weatherLabel, theme.subtitle]}>Temperature</Text>
            <Text style={[styles.weatherValue, theme.text]}>24°C</Text>
          </View>
          
          <View style={[styles.weatherItem, styles.aqiGood]}>
            <Text style={styles.aqiLabel}>Air Quality</Text>
            <Text style={styles.aqiValue}>12 - Good</Text>
          </View>
        </View>

        <View style={styles.aiGuard}>
          <Text style={styles.aiGuardText}>AI Medical Guard Online</Text>
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>Protecting Rwanda Together</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.users.toLocaleString()}+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.alerts.toLocaleString()}+</Text>
            <Text style={styles.statLabel}>Health Alerts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.cities}+</Text>
            <Text style={styles.statLabel}>Cities Covered</Text>
          </View>
        </View>
      </View>

      {/* Emergency Guide */}
      <View style={[styles.emergencySection, theme.card]}>
        <Text style={[styles.emergencyTitle, theme.text]}>
          What To Do During an Asthma Attack
        </Text>
        
        <View style={styles.emergencySteps}>
          <View style={styles.emergencyStep}>
            <Text style={[styles.stepTitle, theme.text]}>1. Stay Calm</Text>
            <Text style={[styles.stepText, theme.subtitle]}>
              Sit upright and breathe slowly. Panic can worsen symptoms.
            </Text>
          </View>
          
          <View style={styles.emergencyStep}>
            <Text style={[styles.stepTitle, theme.text]}>2. Use Inhaler</Text>
            <Text style={[styles.stepText, theme.subtitle]}>
              Take 1–2 puffs of your rescue inhaler and wait 1 minute between doses.
            </Text>
          </View>
        </View>

        <View style={styles.emergencyAlert}>
          <Text style={styles.emergencyAlertTitle}>🚨 Call Emergency: 112</Text>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Breathe Safer?</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={onGetStarted}>
          <Text style={styles.ctaButtonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  signIn: {
    marginLeft: 15,
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 42,
  },
  heroAccent: {
    color: '#2563eb',
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 24,
  },
  heroButtons: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  weatherCard: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  weatherGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  weatherItem: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
  },
  weatherLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  weatherValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  aqiGood: {
    backgroundColor: '#dcfce7',
  },
  aqiLabel: {
    fontSize: 12,
    color: '#16a34a',
    marginBottom: 5,
  },
  aqiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  aiGuard: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  aiGuardText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statsSection: {
    backgroundColor: '#2563eb',
    padding: 30,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    color: '#bfdbfe',
    fontSize: 14,
  },
  emergencySection: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
  emergencyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emergencySteps: {
    gap: 15,
    marginBottom: 20,
  },
  emergencyStep: {
    padding: 15,
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emergencyAlert: {
    backgroundColor: '#fef2f2',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fecaca',
    alignItems: 'center',
  },
  emergencyAlertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  ctaSection: {
    backgroundColor: '#2563eb',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  text: {
    color: '#1e293b',
  },
  subtitle: {
    color: '#64748b',
  },
  card: {
    backgroundColor: 'white',
  },
  weatherItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
  },
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  text: {
    color: 'white',
  },
  subtitle: {
    color: '#94a3b8',
  },
  card: {
    backgroundColor: '#1e293b',
  },
  weatherItem: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
  },
  secondaryButton: {
    backgroundColor: 'rgba(51, 65, 85, 0.3)',
  },
});