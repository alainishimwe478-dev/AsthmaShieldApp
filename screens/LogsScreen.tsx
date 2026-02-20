import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SymptomLog {
  id: string;
  timestamp: number;
  severity: number;
  peakFlow: number;
  notes: string;
  triggers: string[];
}

export default function LogsScreen() {
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [severity, setSeverity] = useState(1);
  const [peakFlow, setPeakFlow] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const stored = await AsyncStorage.getItem('symptomLogs');
      if (stored) setLogs(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to load logs', error);
    }
  };

  const saveLogs = async (newLogs: SymptomLog[]) => {
    try {
      await AsyncStorage.setItem('symptomLogs', JSON.stringify(newLogs));
      setLogs(newLogs);
    } catch (error) {
      console.error('Failed to save logs', error);
    }
  };

  const addLog = () => {
    if (!peakFlow) {
      Alert.alert('Error', 'Please enter peak flow value');
      return;
    }

    const newLog: SymptomLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      severity,
      peakFlow: parseInt(peakFlow),
      notes,
      triggers: []
    };

    const updatedLogs = [newLog, ...logs];
    saveLogs(updatedLogs);
    
    setIsModalOpen(false);
    setPeakFlow('');
    setNotes('');
    setSeverity(1);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (sev: number) => {
    if (sev <= 2) return '#10B981';
    if (sev <= 4) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Symptom Logs</Text>
        <Text style={styles.subtitle}>Track your asthma symptoms</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {logs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No logs yet. Add your first entry!</Text>
          </View>
        ) : (
          logs.map(log => (
            <View key={log.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(log.severity) }]}>
                  <Text style={styles.severityText}>Level {log.severity}</Text>
                </View>
                <Text style={styles.timestamp}>{formatDate(log.timestamp)}</Text>
              </View>
              
              <View style={styles.cardBody}>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Peak Flow</Text>
                  <Text style={styles.metricValue}>{log.peakFlow} L/min</Text>
                </View>
                {log.notes && (
                  <View style={styles.notesSection}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notesText}>{log.notes}</Text>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Symptom Log</Text>

            <Text style={styles.label}>Severity Level: {severity}</Text>
            <View style={styles.severityButtons}>
              {[1, 2, 3, 4, 5].map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.severityButton,
                    severity === level && styles.severityButtonActive
                  ]}
                  onPress={() => setSeverity(level)}
                >
                  <Text style={[
                    styles.severityButtonText,
                    severity === level && styles.severityButtonTextActive
                  ]}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Peak Flow (L/min)</Text>
            <TextInput
              style={styles.input}
              value={peakFlow}
              onChangeText={setPeakFlow}
              keyboardType="numeric"
              placeholder="e.g., 400"
            />

            <Text style={styles.label}>Notes (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="How are you feeling?"
              multiline
              numberOfLines={3}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => setIsModalOpen(false)}
              >
                <Text style={styles.buttonSecondaryText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={addLog}
              >
                <Text style={styles.buttonPrimaryText}>Save Log</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#2563EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  severityText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  timestamp: {
    color: '#64748B',
    fontSize: 12,
  },
  cardBody: {
    gap: 12,
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  notesSection: {
    marginTop: 8,
  },
  notesLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#334155',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: 'white',
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 500,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1E293B',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
    marginTop: 16,
  },
  severityButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  severityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  severityButtonActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  severityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  severityButtonTextActive: {
    color: '#2563EB',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2563EB',
  },
  buttonSecondary: {
    backgroundColor: '#F1F5F9',
  },
  buttonPrimaryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSecondaryText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 16,
  },
});