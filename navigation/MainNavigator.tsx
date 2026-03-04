import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AdminDashboard from '../screens/AdminDashboard';

export default function MainNavigator() {
  const [screen, setScreen] = useState<'loading' | 'landing' | 'login' | 'register' | 'dashboard' | 'adminDashboard'>('landing');
  const [userData, setUserData] = useState<{ email: string; name: string; role: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        // Route based on role
        if (parsedUser.role === 'admin') {
          setScreen('adminDashboard');
        } else {
          setScreen('dashboard');
        }
      } else {
        // Always show landing page first
        setScreen('landing');
      }
    } catch {
      setScreen('landing');
    }
  };

  const handleLoginSuccess = (user: { email: string; name: string; role: string }) => {
    setUserData(user);
    // Route based on role
    if (user.role === 'admin') {
      setScreen('adminDashboard');
    } else {
      setScreen('dashboard');
    }
  };

const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUserData(null);
    setScreen('landing');
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
        onGetStarted={() => {
          setScreen('register');
        }}
        onLogin={() => {
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

if (screen === 'adminDashboard') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <DashboardScreen onLogout={handleLogout} />;
}
