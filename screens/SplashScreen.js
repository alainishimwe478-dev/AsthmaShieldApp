import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace("Landing"), 2500);
  }, []);

  return (
    <LinearGradient colors={["#0F766E", "#22C55E"]} style={styles.container}>
      <Animated.View entering={SlideInUp.duration(1000)} style={styles.logoContainer}>
        <Ionicons name="shield-checkmark" size={80} color="white" />
        <Animated.Text entering={FadeIn.delay(500).duration(1000)} style={styles.logo}>
          AsthmaShield
        </Animated.Text>
        <Animated.Text entering={FadeIn.delay(800).duration(1000)} style={styles.subtitle}>
          Smart Asthma Monitoring
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.9,
  },
});