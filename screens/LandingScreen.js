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
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function LandingScreen({ onGetStarted, onLogin }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navbar */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.navbar}>
          <Text style={styles.logo}>🛡️ Asthma Shield</Text>
          <TouchableOpacity onPress={onLogin}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Hero Section */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>LIVE ENVIRONMENTAL MONITORING</Text>
          </View>
          
          <Text style={styles.heroTitle}>
            Protect Your Lungs,{"\n"}
            <Text style={styles.heroAccent}>Breathe Rwanda.</Text>
          </Text>
          
          <Text style={styles.heroSubtitle}>
            Asthma Shield uses advanced AI and real-time climate data to protect you from respiratory risks across Rwanda.
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton} onPress={onGetStarted}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Try Demo</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Status Card */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.statusCard}>
          <Text style={styles.cardTitle}>Kigali Air Status</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Temperature</Text>
              <Text style={styles.statValue}>24°C</Text>
            </View>
            <View style={[styles.statBox, styles.statBoxGreen]}>
              <Text style={styles.statLabelGreen}>AQI Index</Text>
              <Text style={styles.statValueGreen}>12 - Good</Text>
            </View>
          </View>

          <LinearGradient colors={["#2563EB", "#1D4ED8"]} style={styles.aiCard}>
            <Text style={styles.aiLabel}>AI Medical Guard</Text>
            <Text style={styles.aiValue}>Online Consultation Available</Text>
          </LinearGradient>
        </Animated.View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Precision Protection</Text>
          <Text style={styles.sectionSubtitle}>
            Built specifically for Rwanda, combining local climate data with AI-powered respiratory health intelligence.
          </Text>

          {[
            { icon: "sunny", title: "Climate Tracking", desc: "Live temperature, humidity, and AQI updates across all districts." },
            { icon: "medical", title: "AI Medical Doctor", desc: "24/7 AI consultations trained on respiratory health protocols." },
            { icon: "notifications", title: "Risk Alerts", desc: "Smart notifications when air quality becomes risky in your area." },
          ].map((feature, index) => (
            <Animated.View 
              key={index} 
              entering={FadeInDown.delay(600 + index * 100).duration(600)} 
              style={styles.featureCard}
            >
              <Ionicons name={feature.icon} size={32} color="#2563EB" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </Animated.View>
          ))}
        </View>

        {/* CTA */}
        <LinearGradient colors={["#2563EB", "#1D4ED8"]} style={styles.cta}>
          <Text style={styles.ctaTitle}>Ready to Protect Your Health?</Text>
          <Text style={styles.ctaSubtitle}>Join thousands of Rwandans breathing safer every day.</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={onGetStarted}>
            <Text style={styles.ctaButtonText}>Start Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>🛡️ Asthma Shield</Text>
          <Text style={styles.footerText}>Smart AI-powered respiratory protection system built for Rwanda.</Text>
          <Text style={styles.footerCopyright}>© {new Date().getFullYear()} Asthma Shield Rwanda. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  navbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 },
  logo: { fontSize: 18, fontWeight: "900", color: "#2563EB" },
  signIn: { fontSize: 14, fontWeight: "600", color: "#64748B" },
  hero: { padding: 20, paddingTop: 40 },
  badge: { backgroundColor: "#EFF6FF", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: "flex-start", marginBottom: 20 },
  badgeText: { fontSize: 10, fontWeight: "700", color: "#2563EB" },
  heroTitle: { fontSize: 36, fontWeight: "900", color: "#1F2937", marginBottom: 16 },
  heroAccent: { color: "#2563EB" },
  heroSubtitle: { fontSize: 16, color: "#64748B", marginBottom: 24, lineHeight: 24 },
  buttonGroup: { flexDirection: "row", gap: 12 },
  primaryButton: { flex: 1, backgroundColor: "#2563EB", paddingVertical: 16, borderRadius: 30, alignItems: "center" },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  secondaryButton: { flex: 1, borderWidth: 2, borderColor: "#2563EB", paddingVertical: 16, borderRadius: 30, alignItems: "center" },
  secondaryButtonText: { color: "#2563EB", fontSize: 16, fontWeight: "700" },
  statusCard: { margin: 20, backgroundColor: "#FFFFFF", padding: 20, borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  statsGrid: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statBox: { flex: 1, backgroundColor: "#F8FAFC", padding: 16, borderRadius: 16 },
  statBoxGreen: { backgroundColor: "#ECFDF5" },
  statLabel: { fontSize: 10, color: "#94A3B8", fontWeight: "600", marginBottom: 4 },
  statLabelGreen: { fontSize: 10, color: "#10B981", fontWeight: "600", marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: "900" },
  statValueGreen: { fontSize: 20, fontWeight: "900", color: "#059669" },
  aiCard: { padding: 16, borderRadius: 16 },
  aiLabel: { fontSize: 12, color: "#FFFFFF", fontWeight: "600", marginBottom: 4 },
  aiValue: { fontSize: 16, color: "#FFFFFF", fontWeight: "700" },
  featuresSection: { padding: 20, backgroundColor: "#F8FAFC" },
  sectionTitle: { fontSize: 28, fontWeight: "900", textAlign: "center", marginBottom: 12 },
  sectionSubtitle: { fontSize: 14, color: "#64748B", textAlign: "center", marginBottom: 24, lineHeight: 20 },
  featureCard: { backgroundColor: "#FFFFFF", padding: 20, borderRadius: 24, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  featureTitle: { fontSize: 18, fontWeight: "700", marginTop: 12, marginBottom: 8 },
  featureDesc: { fontSize: 14, color: "#64748B", lineHeight: 20 },
  cta: { margin: 20, padding: 40, borderRadius: 24, alignItems: "center" },
  ctaTitle: { fontSize: 24, fontWeight: "900", color: "#FFFFFF", marginBottom: 12, textAlign: "center" },
  ctaSubtitle: { fontSize: 14, color: "#BFDBFE", marginBottom: 24, textAlign: "center" },
  ctaButton: { backgroundColor: "#FFFFFF", paddingHorizontal: 32, paddingVertical: 16, borderRadius: 30 },
  ctaButtonText: { color: "#2563EB", fontSize: 16, fontWeight: "700" },
  footer: { backgroundColor: "#0F172A", padding: 40, alignItems: "center" },
  footerBrand: { fontSize: 18, fontWeight: "900", color: "#FFFFFF", marginBottom: 12 },
  footerText: { fontSize: 12, color: "#64748B", textAlign: "center", marginBottom: 24 },
  footerCopyright: { fontSize: 10, color: "#475569", textAlign: "center" },
});