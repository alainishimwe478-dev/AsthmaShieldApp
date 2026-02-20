import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsthmaInsights, AIInsight } from '../services/aiService';

interface SymptomLog {
  id: string;
  timestamp: number;
  severity: number;
  peakFlow: number;
  notes: string;
  triggers: string[];
}

export default function DashboardScreen() {
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  // Safe AsyncStorage load
  const loadLogs = async () => {
    try {
      const stored = await AsyncStorage.getItem('symptomLogs');
      const parsedLogs: SymptomLog[] = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsedLogs)) {
        setLogs(parsedLogs);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
      setLogs([]);
    }
  };

  const fetchInsights = async () => {
    if (logs.length === 0) return;
    setLoadingInsights(true);
    try {
      const result = await getAsthmaInsights(logs);
      setInsights(result ?? { summary: 'No insights available yet.' });
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
      setInsights({ summary: 'Failed to fetch insights.' });
    } finally {
      setLoadingInsights(false);
    }
  };

  const formatDate = (timestamp: number) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getSeverityColor = (sev: number) => {
    if (sev <= 2) return '#10B981';
    if (sev <= 4) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>🛡️ Dashboard</Text>
        <Text style={styles.subtitle}>Your asthma overview</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { marginRight: 12 }]}>
          <Text style={styles.statNumber}>{logs.length}</Text>
          <Text style={styles.statLabel}>Total Logs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {logs.length > 0 ? Math.round(logs.reduce((sum, log) => sum + log.severity, 0) / logs.length) : 0}
          </Text>
          <Text style={styles.statLabel}>Avg Severity</Text>
        </View>
      </View>

      {insights && (
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>🤖 AI Insights</Text>
          <Text style={styles.insightsSummary}>{insights.summary}</Text>
        </View>
      )}

      {logs.length > 0 && (
        <TouchableOpacity style={styles.aiButton} onPress={fetchInsights} disabled={loadingInsights}>
          {loadingInsights ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.aiButtonText}>Get AI Insights</Text>
          )}
        </TouchableOpacity>
      )}

      {logs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No logs yet. Start tracking!</Text>
        </View>
      ) : (
        <View style={styles.recentLogs}>
          <Text style={styles.sectionTitle}>Recent Logs</Text>
          {logs
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 3)
            .map((log) => (
            <View key={log.id} style={styles.logCard}>
              <View style={styles.logHeader}>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(log.severity) }]}>
                  <Text style={styles.severityText}>Level {log.severity}</Text>
                </View>
                <Text style={styles.timestamp}>{formatDate(log.timestamp)}</Text>
              </View>
              <Text style={styles.peakFlow}>Peak Flow: {log.peakFlow} L/min</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  recentLogs: {
    marginTop: 20,
  },
  logCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10,
  },
  timestamp: {
    color: '#64748B',
    fontSize: 10,
  },
  peakFlow: {
    fontSize: 12,
    color: '#475569',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  insightsCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  insightsSummary: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
  },
  aiButton: {
    backgroundColor: '#8B5CF6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  aiButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});