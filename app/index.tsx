import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import LandingScreen from '../screens/LandingScreen';

interface SymptomLog {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: number;
  severity: number;
  peakFlow: string;
  notes: string;
  location: string;
}

export default function App() {
  const [userRole, setUserRole] = useState<'landing' | 'login' | 'patient' | 'admin'>('landing');
  const [patientName, setPatientName] = useState('');
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'record' | 'history'>('dashboard');
  const [severity, setSeverity] = useState(3);
  const [peakFlow, setPeakFlow] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem('symptomLogs');
      if (stored) setLogs(JSON.parse(stored));
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const saveLog = async () => {
    if (!peakFlow) {
      Alert.alert('Error', 'Please enter peak flow');
      return;
    }
    const newLog: SymptomLog = {
      id: Date.now().toString(),
      patientId: '001',
      patientName: patientName || 'Patient',
      timestamp: Date.now(),
      severity,
      peakFlow,
      notes,
      location: 'Kigali'
    };
    const updated = [newLog, ...logs];
    setLogs(updated);
    await AsyncStorage.setItem('symptomLogs', JSON.stringify(updated));
    setPeakFlow('');
    setNotes('');
    setSeverity(3);
    setActiveTab('history');
    Alert.alert('Success', 'Symptom logged successfully');
  };

  // LANDING SCREEN
  if (userRole === 'landing') {
    return (
      <LandingScreen 
        onGetStarted={() => setUserRole('login')} 
        onLogin={() => setUserRole('login')} 
      />
    );
  }

  // LOGIN SCREEN
  if (userRole === 'login') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.gradient}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginLogo}>🛡️</Text>
            <Text style={styles.loginTitle}>AsthmaShield</Text>
            <Text style={styles.loginSubtitle}>Rwanda Health Guardian</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={patientName}
              onChangeText={setPatientName}
            />

            <TouchableOpacity onPress={() => setUserRole('patient')}>
              <LinearGradient colors={['#00b4db', '#0083b0']} style={styles.loginBtn}>
                <Text style={styles.loginBtnText}>🫀 Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // ADMIN DASHBOARD
  if (userRole === 'admin') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient colors={['#fc4a1a', '#f7b733']} style={styles.gradient}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>👨⚕️ Doctor Dashboard</Text>
            <TouchableOpacity onPress={() => setUserRole('login')} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{new Set(logs.map(l => l.patientId)).size}</Text>
                <Text style={styles.statLabel}>Patients</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{logs.length}</Text>
                <Text style={styles.statLabel}>Total Logs</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{logs.filter(l => l.severity >= 4).length}</Text>
                <Text style={styles.statLabel}>Critical</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>📝 Recent Patient Logs</Text>
            {logs.slice(0, 10).map((log) => (
              <View key={log.id} style={styles.logCard}>
                <View style={styles.logHeader}>
                  <Text style={styles.logPatient}>{log.patientName}</Text>
                  <Text style={styles.logDate}>{new Date(log.timestamp).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.logDetail}>Severity: {log.severity}/5 | Peak Flow: {log.peakFlow} L/min</Text>
                {log.notes && <Text style={styles.logNotes}>{log.notes}</Text>}
              </View>
            ))}
            {logs.length === 0 && <Text style={styles.emptyText}>No patient data yet</Text>}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }

  // PATIENT APP WITH BOTTOM NAVIGATION
  const weatherData = { temp: 22, aqi: 132, humidity: 68 };
  const riskZones = [
    { name: 'Nyarugenge', risk: 'Extreme', aqi: 165 },
    { name: 'Gikondo', risk: 'Extreme', aqi: 178 },
    { name: 'Kacyiru', risk: 'Safe', aqi: 45 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.userName}>{patientName || 'Patient'}</Text>
              </View>
              <TouchableOpacity onPress={() => setUserRole('login')} style={styles.logoutBtn}>
                <Text style={styles.logoutText}>⎋</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
              <View style={styles.quickStats}>
                <View style={styles.quickStatItem}>
                  <Text style={styles.quickStatValue}>{weatherData.temp}°</Text>
                  <Text style={styles.quickStatLabel}>Temp</Text>
                </View>
                <View style={styles.quickStatItem}>
                  <Text style={styles.quickStatValue}>{weatherData.aqi}</Text>
                  <Text style={styles.quickStatLabel}>AQI</Text>
                </View>
                <View style={styles.quickStatItem}>
                  <Text style={styles.quickStatValue}>{logs.length}</Text>
                  <Text style={styles.quickStatLabel}>Logs</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>🗺️ Risk Zones</Text>
              {riskZones.map((zone, idx) => (
                <View key={idx} style={[styles.zoneCard, zone.risk === 'Extreme' ? styles.zoneExtreme : styles.zoneSafe]}>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                  <Text style={styles.zoneRisk}>{zone.risk} - AQI: {zone.aqi}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {/* RECORD TAB */}
        {activeTab === 'record' && (
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>📝 Record Symptoms</Text>
            </View>

            <ScrollView style={styles.content}>
              <View style={styles.formCard}>
                <Text style={styles.formLabel}>Severity Level</Text>
                <View style={styles.severityRow}>
                  {[1, 2, 3, 4, 5].map(level => (
                    <TouchableOpacity key={level} onPress={() => setSeverity(level)} style={[styles.severityBtn, severity === level && styles.severityBtnActive]}>
                      <Text style={[styles.severityText, severity === level && styles.severityTextActive]}>{level}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.formLabel}>Peak Flow (L/min)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., 350"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                  value={peakFlow}
                  onChangeText={setPeakFlow}
                />

                <Text style={styles.formLabel}>Notes (Optional)</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Any additional notes..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  multiline
                  numberOfLines={4}
                  value={notes}
                  onChangeText={setNotes}
                />

                <TouchableOpacity onPress={saveLog}>
                  <LinearGradient colors={['#00b4db', '#0083b0']} style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Save Log</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>📋 Medical History</Text>
            </View>

            <ScrollView style={styles.content}>
              {logs.map((log) => (
                <View key={log.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyDate}>{new Date(log.timestamp).toLocaleDateString()}</Text>
                    <Text style={styles.historySeverity}>Severity: {log.severity}/5</Text>
                  </View>
                  <Text style={styles.historyDetail}>Peak Flow: {log.peakFlow} L/min</Text>
                  <Text style={styles.historyDetail}>Location: {log.location}</Text>
                  {log.notes && <Text style={styles.historyNotes}>Notes: {log.notes}</Text>}
                </View>
              ))}
              {logs.length === 0 && <Text style={styles.emptyText}>No medical history yet</Text>}
            </ScrollView>
          </>
        )}

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.navItem}>
            <Text style={styles.navIcon}>📊</Text>
            <Text style={[styles.navLabel, activeTab === 'dashboard' && styles.navLabelActive]}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('record')} style={styles.navItem}>
            <Text style={styles.navIcon}>➕</Text>
            <Text style={[styles.navLabel, activeTab === 'record' && styles.navLabelActive]}>Record</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('history')} style={styles.navItem}>
            <Text style={styles.navIcon}>📋</Text>
            <Text style={[styles.navLabel, activeTab === 'history' && styles.navLabelActive]}>History</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  gradient: { flex: 1 },
  header: { paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: 24, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  greeting: { fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: '500' },
  userName: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginTop: 4, letterSpacing: -0.5 },
  logoutBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  logoutText: { fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 24 },
  quickStats: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 24, padding: 24, marginBottom: 28, justifyContent: 'space-around', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  quickStatItem: { alignItems: 'center' },
  quickStatValue: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  quickStatLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: '600' },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 20, letterSpacing: 0.3 },
  zoneCard: { padding: 20, borderRadius: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, borderWidth: 1.5 },
  zoneExtreme: { backgroundColor: 'rgba(239,68,68,0.35)', borderColor: '#ef4444' },
  zoneSafe: { backgroundColor: 'rgba(34,197,94,0.35)', borderColor: '#22c55e' },
  zoneName: { fontSize: 19, fontWeight: '800', color: '#FFFFFF', marginBottom: 6, letterSpacing: 0.2 },
  zoneRisk: { fontSize: 15, color: 'rgba(255,255,255,0.95)', fontWeight: '600' },
  loginContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  loginLogo: { fontSize: 96, marginBottom: 24 },
  loginTitle: { fontSize: 42, fontWeight: '900', color: '#FFFFFF', marginBottom: 12, letterSpacing: -1 },
  loginSubtitle: { fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 48, fontWeight: '500' },
  input: { width: '100%', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 16, padding: 18, fontSize: 17, color: '#FFFFFF', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', fontWeight: '500' },
  loginBtn: { width: 320, paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12 },
  loginBtnText: { fontSize: 19, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  statsRow: { flexDirection: 'row', gap: 14, marginBottom: 28 },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: 22, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  statValue: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 },
  statLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: '700' },
  logCard: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  logPatient: { fontSize: 19, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.2 },
  logDate: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  logDetail: { fontSize: 15, color: 'rgba(255,255,255,0.95)', marginBottom: 6, fontWeight: '600' },
  logNotes: { fontSize: 14, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', marginTop: 8, lineHeight: 20 },
  emptyText: { fontSize: 16, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 40, fontWeight: '600' },
  formCard: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 24, padding: 28, marginBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  formLabel: { fontSize: 17, fontWeight: '800', color: '#FFFFFF', marginBottom: 14, letterSpacing: 0.3 },
  severityRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  severityBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.3)', paddingVertical: 18, borderRadius: 14, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  severityBtnActive: { backgroundColor: '#FFFFFF', borderColor: '#00b4db', shadowColor: '#00b4db', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
  severityText: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  severityTextActive: { color: '#0083b0' },
  textInput: { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 14, padding: 18, fontSize: 17, color: '#FFFFFF', marginBottom: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', fontWeight: '500' },
  textArea: { height: 120, textAlignVertical: 'top' },
  submitBtn: { paddingVertical: 18, borderRadius: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12 },
  submitBtnText: { fontSize: 19, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  historyCard: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  historyDate: { fontSize: 17, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.2 },
  historySeverity: { fontSize: 15, color: '#FFFFFF', fontWeight: '800', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  historyDetail: { fontSize: 15, color: 'rgba(255,255,255,0.95)', marginBottom: 6, fontWeight: '600' },
  historyNotes: { fontSize: 14, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', marginTop: 8, lineHeight: 20 },
  bottomNav: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.4)', paddingVertical: 14, paddingBottom: Platform.OS === 'ios' ? 28 : 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { fontSize: 26, marginBottom: 6 },
  navLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '700', letterSpacing: 0.5 },
  navLabelActive: { color: '#FFFFFF', fontWeight: '800' },
});
