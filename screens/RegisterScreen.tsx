import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }: RegisterScreenProps) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', t('register.errorFillAll'));
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', t('register.errorPassword'));
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      if (users.find((u: any) => u.email === email)) {
        Alert.alert('Error', t('register.errorEmailExists'));
        return;
      }

      users.push({ name, email, password });
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Success', t('register.success'));
      onRegisterSuccess();
    } catch (error) {
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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

      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🛡️</Text>
        </View>
        <Text style={styles.title}>{t('register.joinShield')}</Text>
        <Text style={styles.subtitle}>{t('register.subtitle')}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('register.nameLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('register.namePlaceholder')}
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('register.emailLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('register.emailPlaceholder')}
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('register.passwordLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('register.passwordPlaceholder')}
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t('register.createAccount')}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('register.alreadyAccount')} </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.link}>{t('register.signIn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 48 },
  iconContainer: { width: 80, height: 80, backgroundColor: '#EFF6FF', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 24, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  icon: { fontSize: 40 },
  title: { fontSize: 32, fontWeight: '900', color: '#1E293B', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', fontWeight: '500', paddingHorizontal: 20 },
  form: { width: '100%' },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 10, fontWeight: '900', color: '#64748B', marginBottom: 8, letterSpacing: 1 },
  input: { backgroundColor: 'white', borderRadius: 16, padding: 18, fontSize: 16, color: '#1E293B', borderWidth: 2, borderColor: '#E2E8F0', fontWeight: '500' },
  button: { backgroundColor: '#1E293B', borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  buttonText: { color: 'white', fontSize: 13, fontWeight: '900', letterSpacing: 2 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, alignItems: 'center' },
  footerText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  link: { fontSize: 14, color: '#2563EB', fontWeight: '900' },
});
