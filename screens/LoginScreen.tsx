import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

interface LoginScreenProps {
  onLoginSuccess: (userData: { email: string; name: string; role: string }) => void;
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
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock Admin credentials
  const admin = { email: 'admin@hospital.rw', password: 'admin123', name: 'Admin' };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', t('login.errorFillAll'));
      return;
    }

    try {
      // Check if admin credentials
      if (email === admin.email && password === admin.password) {
        await AsyncStorage.setItem('currentUser', JSON.stringify({ 
          email: admin.email, 
          name: admin.name, 
          role: 'admin' 
        }));
        onLoginSuccess({ email: admin.email, name: admin.name, role: 'admin' });
        return;
      }

      // Check normal users
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        await AsyncStorage.setItem('currentUser', JSON.stringify({ 
          email: user.email, 
          name: user.name,
          role: 'user' 
        }));
        onLoginSuccess({ email: user.email, name: user.name, role: 'user' });
      } else {
        Alert.alert('Error', t('login.errorInvalid'));
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <ScrollView style={tw.container} contentContainerStyle={tw.content}>
      {/* Language Switcher */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginBottom: 20 }}>
        <TouchableOpacity 
          style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: i18n.language === 'en' ? '#2563EB' : '#E2E8F0' }} 
          onPress={() => changeLanguage('en')}
        >
          <Text style={{ fontSize: 12, fontWeight: '700', color: i18n.language === 'en' ? 'white' : '#64748B' }}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: i18n.language === 'fr' ? '#2563EB' : '#E2E8F0' }} 
          onPress={() => changeLanguage('fr')}
        >
          <Text style={{ fontSize: 12, fontWeight: '700', color: i18n.language === 'fr' ? 'white' : '#64748B' }}>FR</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: i18n.language === 'rw' ? '#2563EB' : '#E2E8F0' }} 
          onPress={() => changeLanguage('rw')}
        >
          <Text style={{ fontSize: 12, fontWeight: '700', color: i18n.language === 'rw' ? 'white' : '#64748B' }}>RW</Text>
        </TouchableOpacity>
      </View>

      <View style={tw.header}>
        <View style={tw.iconContainer}>
          <Text style={tw.icon}>🛡️</Text>
        </View>
        <Text style={tw.title}>{t('login.welcomeBack')}</Text>
        <Text style={tw.subtitle}>{t('login.subtitle')}</Text>
      </View>

      <View style={tw.form}>
        <View style={tw.inputGroup}>
          <Text style={tw.label}>{t('login.emailLabel')}</Text>
          <TextInput
            style={tw.input}
            placeholder={t('login.emailPlaceholder')}
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={tw.inputGroup}>
          <Text style={tw.label}>{t('login.passwordLabel')}</Text>
          <TextInput
            style={tw.input}
            placeholder={t('login.passwordPlaceholder')}
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={tw.button} onPress={handleLogin}>
          <Text style={tw.buttonText}>{t('login.signIn')}</Text>
        </TouchableOpacity>

        <View style={tw.footer}>
          <Text style={tw.footerText}>{t('login.noAccount')} </Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={tw.link}>{t('login.joinNow')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
