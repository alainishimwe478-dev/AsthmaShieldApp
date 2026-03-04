import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statIcon}>
        <Text style={styles.statIconText}>{icon}</Text>
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

interface AlertItemProps {
  type: string;
  message: string;
  district: string;
}

function AlertItem({ type, message, district }: AlertItemProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'high-risk': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#64748B';
    }
  };

  return (
    <View style={[styles.alertItem, { borderLeftColor: getTypeColor() }]}>
      <View style={styles.alertHeader}>
        <Text style={[styles.alertType, { color: getTypeColor() }]}>{type.toUpperCase()}</Text>
        <Text style={styles.alertDistrict}>{district}</Text>
      </View>
      <Text style={styles.alertMessage}>{message}</Text>
    </View>
  );
}

interface AdminDashboardProps {
  onLogout?: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [userName, setUserName] = useState('Admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name || 'Admin');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      // Call the onLogout callback if provided
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>🛡️ Admin Dashboard</Text>
            <Text style={styles.subtitle}>Welcome, {userName}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>● Online</Text>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>Monitoring AsthmaShield platform across Rwanda</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard label="Total Doctors" value="85" icon="👨‍⚕️" color="#2563EB" />
        <StatCard label="Total Patients" value="1,240" icon="👥" color="#10B981" />
        <StatCard label="Active Alerts" value="12" icon="⚠️" color="#F59E0B" />
        <StatCard label="System Status" value="Operational" icon="✅" color="#10B981" />
      </View>

      {/* District Risk Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏥 District Risk Overview</Text>
        <View style={styles.districtCard}>
          <View style={styles.districtRow}>
            <Text style={styles.districtName}>Nyagatare</Text>
            <View style={[styles.riskBadge, { backgroundColor: '#FEE2E2' }]}>
              <Text style={[styles.riskText, { color: '#DC2626' }]}>High Risk</Text>
            </View>
          </View>
          <View style={styles.districtRow}>
            <Text style={styles.districtName}>Kigali</Text>
            <View style={[styles.riskBadge, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.riskText, { color: '#D97706' }]}>Moderate</Text>
            </View>
          </View>
          <View style={styles.districtRow}>
            <Text style={styles.districtName}>Musanze</Text>
            <View style={[styles.riskBadge, { backgroundColor: '#DCFCE7' }]}>
              <Text style={[styles.riskText, { color: '#16A34A' }]}>Low Risk</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Alerts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚨 Recent Alerts</Text>
        <AlertItem 
          type="high-risk" 
          message="AQI levels exceeded 150 in Nyagatare district" 
          district="Nyagatare" 
        />
        <AlertItem 
          type="warning" 
          message="Increased asthma cases reported today" 
          district="Kigali" 
        />
        <AlertItem 
          type="info" 
          message="System maintenance scheduled for tomorrow" 
          district="All Districts" 
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>View Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionText}>Manage Patients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👨‍⚕️</Text>
            <Text style={styles.actionText}>Manage Doctors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔔</Text>
            <Text style={styles.actionText}>Send Alert</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>LOGOUT</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#1E293B',
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '500',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  statusBadge: {
    backgroundColor: '#10B98120',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    marginTop: -20,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statIconText: {
    fontSize: 20,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 16,
  },
  districtCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  districtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  districtName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '700',
  },
  alertItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertType: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  alertDistrict: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  alertMessage: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  bottomSpacer: {
    height: 40,
  },
});
