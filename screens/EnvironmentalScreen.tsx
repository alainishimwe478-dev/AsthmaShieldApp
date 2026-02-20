import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface EnvironmentalData {
  location: string;
  temperature: number;
  pollenLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  airQualityIndex: number;
  airQualityStatus: string;
  humidity: number;
  healthRiskScore: number;
  lastUpdated: string;
}

export default function EnvironmentalScreen() {
  const [envData, setEnvData] = useState<EnvironmentalData | null>(null);

  useEffect(() => {
    loadEnvironmentalData();
  }, []);

  const loadEnvironmentalData = () => {
    setEnvData({
      location: 'New York, NY',
      temperature: 22,
      pollenLevel: 'High',
      airQualityIndex: 85,
      airQualityStatus: 'Moderate',
      humidity: 65,
      healthRiskScore: 72,
      lastUpdated: new Date().toLocaleTimeString()
    });
  };

  const getPollenColor = (level: string) => {
    switch (level) {
      case 'Low': return '#10B981';
      case 'Moderate': return '#F59E0B';
      case 'High': return '#EF4444';
      case 'Very High': return '#DC2626';
      default: return '#64748B';
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10B981';
    if (aqi <= 100) return '#F59E0B';
    if (aqi <= 150) return '#EF4444';
    return '#DC2626';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌍 Environment</Text>
        <Text style={styles.subtitle}>Air quality & conditions</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {envData && (
          <View style={styles.envCard}>
            <Text style={styles.envTitle}>🌍 Environmental Conditions</Text>
            <Text style={styles.envLocation}>{envData.location}</Text>
            
            <View style={styles.envGrid}>
              <View style={styles.envItem}>
                <Text style={styles.envIcon}>🌡️</Text>
                <Text style={styles.envValue}>{envData.temperature}°C</Text>
                <Text style={styles.envLabel}>Temperature</Text>
              </View>
              
              <View style={styles.envItem}>
                <Text style={styles.envIcon}>🌸</Text>
                <View style={[styles.pollenBadge, { backgroundColor: getPollenColor(envData.pollenLevel) }]}>
                  <Text style={styles.pollenText}>{envData.pollenLevel}</Text>
                </View>
                <Text style={styles.envLabel}>Pollen</Text>
              </View>
              
              <View style={styles.envItem}>
                <Text style={styles.envIcon}>💧</Text>
                <Text style={styles.envValue}>{envData.humidity}%</Text>
                <Text style={styles.envLabel}>Humidity</Text>
              </View>
              
              <View style={styles.envItem}>
                <Text style={styles.envIcon}>🏭</Text>
                <View style={[styles.aqiBadge, { backgroundColor: getAQIColor(envData.airQualityIndex) }]}>
                  <Text style={styles.aqiText}>{envData.airQualityIndex}</Text>
                </View>
                <Text style={styles.envLabel}>AQI</Text>
              </View>
            </View>
            
            <View style={styles.riskSection}>
              <Text style={styles.riskLabel}>Health Risk Score</Text>
              <View style={styles.riskBar}>
                <View style={[styles.riskFill, { width: `${envData.healthRiskScore}%`, backgroundColor: getAQIColor(envData.healthRiskScore) }]} />
              </View>
              <Text style={styles.riskScore}>{envData.healthRiskScore}/100</Text>
            </View>
            
            <TouchableOpacity style={styles.refreshButton} onPress={loadEnvironmentalData}>
              <Text style={styles.refreshText}>🔄 Refresh Data</Text>
            </TouchableOpacity>
            
            <Text style={styles.lastUpdated}>Last updated: {envData.lastUpdated}</Text>
          </View>
        )}

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Health Tips</Text>
          <Text style={styles.tip}>• Check air quality before outdoor activities</Text>
          <Text style={styles.tip}>• Use air purifiers on high pollution days</Text>
          <Text style={styles.tip}>• Keep windows closed during high pollen periods</Text>
          <Text style={styles.tip}>• Monitor humidity levels in your home</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#059669',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7F3D0',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  envCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  envTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  envLocation: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  envGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  envItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  envIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  envValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  envLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  pollenBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  pollenText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  aqiBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  aqiText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  riskSection: {
    marginTop: 8,
  },
  riskLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  riskBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  riskFill: {
    height: '100%',
    borderRadius: 4,
  },
  riskScore: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
  },
  refreshButton: {
    backgroundColor: '#059669',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  refreshText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  lastUpdated: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 12,
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  tip: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
});