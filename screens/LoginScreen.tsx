import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  onLoginSuccess: (userData: { email: string; name: string }) => void;
  onNavigateToRegister: () => void;
}

// Tailwind-like styles using StyleSheet
const tw = StyleSheet.create({
  // Container styles
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  
  // Header styles  
  header: { alignItems: 'center', marginBottom: 48 },
  iconContainer: { 
    width: 80, height: 80, backgroundColor: '#EFF6FF', borderRadius: 24, 
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 
  },
  icon: { fontSize: 40 },
  title: { fontSize: 32, fontWeight: '900', color: '#1E293B', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', fontWeight: '500' },
  
  // Form styles
  form: { width: '100%' },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 10, fontWeight: '900', color: '#64748B', marginBottom: 8, letterSpacing: 1 },
  input: { 
    backgroundColor: 'white', borderRadius: 16, padding: 18, fontSize: 16, 
    color: '#1E293B', borderWidth: 2, borderColor: '#E2E8F0', fontWeight: '500' 
  },
  
  // Button styles
  button: { 
    backgroundColor: '#1E293B', borderRadius: 16, padding: 18, 
    alignItems: 'center', marginTop: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 
  },
  buttonText: { color: 'white', fontSize: 13, fontWeight: '900', letterSpacing: 2 },
  
  // Footer styles
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, alignItems: 'center' },
  footerText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  link: { fontSize: 14, color: '#2563EB', fontWeight: '900' },
});

export default function LoginScreen({ onLoginSuccess, onNavigateToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        await AsyncStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }));
        onLoginSuccess({ email: user.email, name: user.name });
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <ScrollView style={tw.container} contentContainerStyle={tw.content}>
      <View style={tw.header}>
        <View style={tw.iconContainer}>
          <Text style={tw.icon}>🛡️</Text>
        </View>
        <Text style={tw.title}>Welcome Back</Text>
        <Text style={tw.subtitle}>Sign in to continue protecting your health</Text>
      </View>

      <View style={tw.form}>
        <View style={tw.inputGroup}>
          <Text style={tw.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={tw.input}
            placeholder="your.email@example.com"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={tw.inputGroup}>
          <Text style={tw.label}>PASSWORD</Text>
          <TextInput
            style={tw.input}
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={tw.button} onPress={handleLogin}>
          <Text style={tw.buttonText}>SIGN IN</Text>
        </TouchableOpacity>

        <View style={tw.footer}>
          <Text style={tw.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={tw.link}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
