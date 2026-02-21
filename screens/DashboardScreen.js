import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#F0FDF4", "#ECFDF5"]} style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.location}>📍 Kigali, Rwanda</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={32} color="#0F766E" />
            </TouchableOpacity>
          </Animated.View>

          {/* Air Quality Status */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Air Quality Status</Text>
            <View style={styles.aqiCard}>
              <View style={styles.aqiHeader}>
                <Ionicons name="leaf" size={24} color="#22C55E" />
                <Text style={styles.aqiTitle}>Current AQI</Text>
              </View>
              <Text style={styles.aqiValue}>45</Text>
              <Text style={styles.aqiStatus}>Moderate - Safe for outdoor activity</Text>
              
              <View style={styles.aqiDetails}>
                <View style={styles.aqiDetailItem}>
                  <Text style={styles.aqiDetailLabel}>Pollen</Text>
                  <Text style={[styles.aqiDetailValue, { color: "#EF4444" }]}>High</Text>
                </View>
                <View style={styles.aqiDetailItem}>
                  <Text style={styles.aqiDetailLabel}>Temperature</Text>
                  <Text style={styles.aqiDetailValue}>24°C</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Risk Alert */}
          <Animated.View entering={FadeInRight.delay(400).duration(600)} style={styles.section}>
            <View style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <Ionicons name="warning" size={24} color="#F59E0B" />
                <Text style={styles.alertTitle}>District Risk Alert</Text>
              </View>
              <Text style={styles.alertMessage}>
                High pollen levels detected in your area. Consider staying indoors if you're sensitive.
              </Text>
              <TouchableOpacity style={styles.alertButton}>
                <Text style={styles.alertButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Prevention Tips */}
          <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Prevention Tips</Text>
            <View style={styles.tipsCard}>
              {[
                { icon: "home", text: "Stay indoors during high pollen hours" },
                { icon: "medical", text: "Keep your inhaler nearby" },
                { icon: "water", text: "Stay hydrated throughout the day" },
                { icon: "fitness", text: "Avoid outdoor exercise today" },
              ].map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Ionicons name={tip.icon} size={20} color="#0F766E" />
                  <Text style={styles.tipText}>{tip.text}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard}>
                <Ionicons name="add-circle" size={32} color="#22C55E" />
                <Text style={styles.actionText}>Log Symptoms</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <Ionicons name="analytics" size={32} color="#3B82F6" />
                <Text style={styles.actionText}>View Reports</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  location: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  profileButton: {
    padding: 8,
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
  aqiCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  aqiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  aqiTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
  },
  aqiValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#22C55E",
    textAlign: "center",
  },
  aqiStatus: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 16,
  },
  aqiDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
  },
  aqiDetailItem: {
    alignItems: "center",
  },
  aqiDetailLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  aqiDetailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  alertCard: {
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#92400E",
    marginLeft: 8,
  },
  alertMessage: {
    fontSize: 14,
    color: "#92400E",
    marginBottom: 12,
    lineHeight: 20,
  },
  alertButton: {
    alignSelf: "flex-start",
  },
  alertButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D97706",
  },
  tipsCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 12,
    flex: 1,
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
});