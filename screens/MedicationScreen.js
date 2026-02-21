import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function MedicationScreen() {
  const [medications] = useState([
    {
      id: 1,
      name: "Albuterol Inhaler",
      dosage: "2 puffs",
      times: ["8:00 AM", "8:00 PM"],
      taken: [true, false],
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Montelukast",
      dosage: "10mg tablet",
      times: ["9:00 PM"],
      taken: [false],
      color: "#8B5CF6",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#F0FDF4", "#ECFDF5"]} style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
            <Text style={styles.title}>Medication Tracker</Text>
            <Text style={styles.subtitle}>Stay on top of your treatment</Text>
          </Animated.View>

          {/* Today's Progress */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Ionicons name="checkmark-circle" size={32} color="#22C55E" />
                <View style={styles.progressText}>
                  <Text style={styles.progressTitle}>2 of 3 doses taken</Text>
                  <Text style={styles.progressSubtitle}>Great job! Keep it up</Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "67%" }]} />
              </View>
            </View>
          </Animated.View>

          {/* Medications List */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Your Medications</Text>
            {medications.map((med, index) => (
              <View key={med.id} style={styles.medicationCard}>
                <View style={styles.medicationHeader}>
                  <View style={[styles.medicationIcon, { backgroundColor: med.color }]}>
                    <Ionicons name="medical" size={20} color="white" />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{med.name}</Text>
                    <Text style={styles.medicationDosage}>{med.dosage}</Text>
                  </View>
                </View>

                {med.times.map((time, timeIndex) => (
                  <View key={timeIndex} style={styles.doseItem}>
                    <View style={styles.doseTime}>
                      <Ionicons name="time-outline" size={16} color="#64748B" />
                      <Text style={styles.doseTimeText}>{time}</Text>
                    </View>
                    <View style={styles.doseStatus}>
                      {med.taken[timeIndex] ? (
                        <View style={styles.takenBadge}>
                          <Ionicons name="checkmark" size={16} color="white" />
                          <Text style={styles.takenText}>Taken</Text>
                        </View>
                      ) : (
                        <TouchableOpacity style={styles.takeButton}>
                          <Text style={styles.takeButtonText}>Mark as Taken</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard}>
                <Ionicons name="add-circle-outline" size={32} color="#3B82F6" />
                <Text style={styles.actionText}>Add Medication</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <Ionicons name="notifications-outline" size={32} color="#F59E0B" />
                <Text style={styles.actionText}>Set Reminders</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Emergency Inhaler */}
          <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.section}>
            <View style={styles.emergencyCard}>
              <View style={styles.emergencyHeader}>
                <Ionicons name="warning" size={24} color="#EF4444" />
                <Text style={styles.emergencyTitle}>Emergency Inhaler</Text>
              </View>
              <Text style={styles.emergencyText}>
                Always carry your rescue inhaler. Tap below if you need to use it.
              </Text>
              <TouchableOpacity style={styles.emergencyButton}>
                <Ionicons name="medical" size={20} color="white" />
                <Text style={styles.emergencyButtonText}>Used Emergency Inhaler</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  progressCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressText: {
    marginLeft: 12,
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  progressSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 4,
  },
  medicationCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  medicationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  medicationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  medicationDosage: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  doseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  doseTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  doseTimeText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 6,
  },
  doseStatus: {
    alignItems: "flex-end",
  },
  takenBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22C55E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  takenText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    marginLeft: 4,
  },
  takeButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  takeButtonText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginTop: 8,
    textAlign: "center",
  },
  emergencyCard: {
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  emergencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC2626",
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: "#DC2626",
    marginBottom: 12,
    lineHeight: 20,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
});