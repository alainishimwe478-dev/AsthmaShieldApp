import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';

export default function MainNavigator() {
  const [screen, setScreen] = useState<'loading' | 'landing' | 'login' | 'register' | 'dashboard'>('loading');
  const [userData, setUserData] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const hasSeenLanding = await AsyncStorage.getItem('hasSeenLanding');
      const user = await AsyncStorage.getItem('currentUser');
      
      if (user) {
        setUserData(JSON.parse(user));
        setScreen('dashboard');
      } else if (hasSeenLanding) {
        setScreen('login');
      } else {
        setScreen('landing');
      }
    } catch {
      setScreen('landing');
    }
  };

  const handleLoginSuccess = (user: { email: string; name: string }) => {
    setUserData(user);
    setScreen('dashboard');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUserData(null);
    setScreen('login');
  };

  if (screen === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (screen === 'landing') {
    return (
      <LandingScreen
        onGetStarted={async () => {
          await AsyncStorage.setItem('hasSeenLanding', 'true');
          setScreen('register');
        }}
        onLogin={async () => {
          await AsyncStorage.setItem('hasSeenLanding', 'true');
          setScreen('login');
        }}
      />
    );
  }

  if (screen === 'login') {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setScreen('register')} />;
  }

  if (screen === 'register') {
    return <RegisterScreen onRegisterSuccess={() => setScreen('login')} onNavigateToLogin={() => setScreen('login')} />;
  }

  return <DashboardScreen />;
}
