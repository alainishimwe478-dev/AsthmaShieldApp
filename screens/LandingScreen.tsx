import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Props {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function LandingScreen({ onGetStarted, onLogin }: Props) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Language Switcher */}
      <View style={styles.languageSwitcher}>
        <TouchableOpacity 
          style={[styles.langButton, i18n.language === 'en' && styles.langButtonActive]} 
          onPress={() => changeLanguage('en')}
        >
          <Text style={[styles.langText, i18n.language === 'en' && styles.langTextActive]}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.langButton, i18n.language === 'fr' && styles.langButtonActive]} 
          onPress={() => changeLanguage('fr')}
        >
          <Text style={[styles.langText, i18n.language === 'fr' && styles.langTextActive]}>FR</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.langButton, i18n.language === 'rw' && styles.langButtonActive]} 
          onPress={() => changeLanguage('rw')}
        >
          <Text style={[styles.langText, i18n.language === 'rw' && styles.langTextActive]}>RW</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <View style={styles.dot} />
          <Text style={styles.badgeText}>{t('landing.liveMonitoring')}</Text>
        </View>
        
        <Text style={styles.title}>
          {t('landing.title')}{'\n'}
          <Text style={styles.titleGradient}>{t('landing.titleGradient')}</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          {t('landing.subtitle')}
        </Text>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} onPress={onGetStarted}>
            <Text style={styles.primaryButtonText}>{t('landing.joinShield')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onLogin}>
            <Text style={styles.secondaryButtonText}>{t('landing.signIn')}</Text>
          </TouchableOpacity>
        </View>

        {/* Feature Card */}
        <View style={styles.featureCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>{t('landing.kigaliSector')}</Text>
              <Text style={styles.cardTitle}>{t('landing.clearAir')}</Text>
            </View>
            <View style={styles.checkIcon}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>{t('landing.temperature')}</Text>
              <Text style={styles.statValue}>24°C</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>{t('landing.aqiIndex')}</Text>
              <Text style={[styles.statValue, { color: '#10B981' }]}>12</Text>
            </View>
          </View>
          
          <View style={styles.aiCard}>
            <View>
              <Text style={styles.aiLabel}>{t('landing.aiMedicalGuard')}</Text>
              <Text style={styles.aiTitle}>{t('landing.onlineConsultations')}</Text>
            </View>
            <View style={styles.videoIcon}>
              <Text style={styles.videoText}>📹</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>{t('landing.featuresTitle')}</Text>
        <Text style={styles.featuresSubtitle}>
          {t('landing.featuresSubtitle')}
        </Text>
        
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>☀️</Text>
          </View>
          <Text style={styles.featureTitle}>{t('landing.climateTracking')}</Text>
          <Text style={styles.featureDesc}>
            {t('landing.climateTrackingDesc')}
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#D1FAE5' }]}>
            <Text style={styles.iconText}>👨‍⚕️</Text>
          </View>
          <Text style={styles.featureTitle}>{t('landing.aiDoctor')}</Text>
          <Text style={styles.featureDesc}>
            {t('landing.aiDoctorDesc')}
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#FEE2E2' }]}>
            <Text style={styles.iconText}>🔔</Text>
          </View>
          <Text style={styles.featureTitle}>{t('landing.riskAlerts')}</Text>
          <Text style={styles.featureDesc}>
            {t('landing.riskAlertsDesc')}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>{t('landing.footerBrand')}</Text>
        <Text style={styles.footerText}>{t('landing.footerText')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  languageSwitcher: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 50,
    gap: 8,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  langButtonActive: {
    backgroundColor: '#2563EB',
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  langTextActive: {
    color: 'white',
  },
  hero: {
    padding: 24,
    paddingTop: 10,
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
