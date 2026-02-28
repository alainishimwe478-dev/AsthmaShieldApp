import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppStatus, EnvironmentalData, User } from './types';
import { getEnvironmentalData } from './services/geminiService';
import EnvironmentalDashboard from './components/EnvironmentalDashboard';
// DoctorLive removed - unused import
import Auth from './components/Auth';
import LandingPage from './components/LandingPageNew';
import DoctorLayout from './components/doctor/DoctorLayout';
import OverviewPage from './components/doctor/OverviewPage';
import PatientsPage from './components/doctor/PatientsPage';
import AlertsPage from './components/doctor/AlertsPage';
import ReportsPage from './components/doctor/ReportsPage';
import ConsultationPage from './components/ConsultationPage';
import DoctorSettings from './components/DoctorSettings';
import PatientDashboard from './components/PatientDashboard';
import PatientDashboardHome from './components/patient/PatientDashboardHome';
import PatientHealthPage from './components/patient/PatientHealthPage';
import PatientMedicationsPage from './components/patient/PatientMedicationsPage';
import PatientLogsPage from './components/patient/PatientLogsPage';
import PatientAppointmentsPage from './components/patient/PatientAppointmentsPage';
import PatientProfilePage from './components/patient/PatientProfilePage';
import PatientSettingsPage from './components/patient/PatientSettingsPage';

// Inner component that has access to useNavigate hook
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [data, setData] = useState<EnvironmentalData | null>(null);
const [_isConsulting, setIsConsulting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  
  // 'home' is the mandatory default view to ensure LandingPage is shown first.
  const [view, setView] = useState<'home' | 'dashboard' | 'auth' | 'doctor'>('home');

  // Initialize demo users on mount
  useEffect(() => {
    // Create demo patient in patients storage
    const patientsData = localStorage.getItem('rwanda_guard_users');
    const patients = patientsData ? JSON.parse(patientsData) : [];
    
    const demoEmail = 'demo@asthma-shield.rw';
    let demoUser = patients.find((u: any) => u.email === demoEmail);
    
    if (!demoUser) {
      demoUser = {
        id: 'demo-user-001',
        email: demoEmail,
        password: 'demo123',
        fullName: 'Demo User',
        phone: '+250 789 123 456',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${demoEmail}`,
        createdAt: Date.now()
      };
      patients.push(demoUser);
      
      const sampleLogs = [
        { id: '1', timestamp: Date.now() - 86400000, severity: 2, peakFlow: 420, notes: 'Morning check - breathing normal' },
        { id: '2', timestamp: Date.now() - 172800000, severity: 3, peakFlow: 380, notes: 'Slight discomfort in the evening' },
        { id: '3', timestamp: Date.now() - 259200000, severity: 1, peakFlow: 450, notes: 'Good day, no issues' }
      ];
      localStorage.setItem('symptomLogs', JSON.stringify(sampleLogs));
    }
    
    localStorage.setItem('rwanda_guard_users', JSON.stringify(patients));
    
    // Create demo doctor in doctors storage (separate from patients)
    const doctorsData = localStorage.getItem('rwanda_guard_doctors');
    const doctors = doctorsData ? JSON.parse(doctorsData) : [];
    
    const doctorEmail = 'doctor@asthma-shield.rw';
    let doctorUser = doctors.find((u: any) => u.email === doctorEmail);
    
    if (!doctorUser) {
      doctorUser = {
        id: 'doctor-001',
        email: doctorEmail,
        password: 'doctor123',
        fullName: 'Dr. Kalisa',
        phone: '+250 789 000 111',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor',
        createdAt: Date.now(),
        isDoctor: true,
        licenseNumber: 'MD-2020-12345',
        specialization: 'pulmonologist'
      };
      doctors.push(doctorUser);
    }
    
    localStorage.setItem('rwanda_guard_doctors', JSON.stringify(doctors));
    
    // Load user session
    const savedUser = localStorage.getItem('rwanda_guard_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('rwanda_guard_user');
      }
    }
    setInitialized(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setStatus(AppStatus.LOADING);
    try {
      const result = await getEnvironmentalData();
      setData(result);
      setStatus(AppStatus.IDLE);
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus(AppStatus.ERROR);
    }
  }, [user]);

  useEffect(() => {
    if (user && view === 'dashboard') {
      fetchData();
    }
  }, [user, view, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('rwanda_guard_user');
    setUser(null);
    setData(null);
    setView('home');
    navigate('/');
  };

  const handleGoToAuth = () => {
    if (user) {
      const targetView = user.isDoctor ? 'doctor' : 'dashboard';
      setView(targetView);
      // Navigate to the correct URL for doctor
      if (user.isDoctor) {
        navigate('/doctor/overview');
      }
    } else {
      setView('auth');
    }
  };

  if (!initialized) {
    return (
      <div className="07v8mk4b min-h-screen bg-white flex items-center justify-center">
        <div className="0igl5sey w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Authentication View
  if (view === 'auth' && !user) {
    return <Auth onAuthComplete={(u: User) => { 
      setUser(u); 
      const targetView = u.isDoctor ? 'doctor' : 'dashboard';
      setView(targetView);
      // Navigate to doctor dashboard URL after doctor login
      if (u.isDoctor) {
        navigate('/doctor/overview');
      }
    }} />;
  }

// Home View - Landing Page
  if (view === 'home') {
    return (
      <LandingPage 
        onGetStarted={() => handleGoToAuth()} 
        onLogin={() => handleGoToAuth()}
      />
    );
  }

  // Require user session
  if (!user) {
    setView('home');
    return null;
  }

  // Protected Route: Doctor Dashboard
  if (view === 'doctor' && !user.isDoctor) {
    return (
      <div className="0xgvx1ar min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="0i9iwpld text-center p-8 bg-white rounded-3xl shadow-lg max-w-md">
          <div className="0hfgh8nh w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="08rxxvvi w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="0k7pmwzx text-2xl font-black text-slate-800 mb-2">Access Denied</h2>
          <p className="0wzln0dk text-slate-500 mb-6">You do not have permission to access the Doctor Dashboard. Please login as a doctor.</p>
          <button 
            onClick={() => {
              localStorage.removeItem('rwanda_guard_user');
              setUser(null);
              setView('auth');
            }} 
            className="0688ftvi px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Login as Doctor
          </button>
        </div>
      </div>
    );
  }

  // Wrap everything in BrowserRouter for React Router navigation
  return (
    <Routes>
      <Route path="/" element={
        <LandingPage
          onGetStarted={() => navigate('/auth')}
          onLogin={() => navigate('/auth')}
        />
      } />
      <Route path="/auth" element={
        <Auth onAuthComplete={(u: User) => {
          setUser(u);
          if (u.isDoctor) {
            navigate('/doctor/overview');
          } else {
            navigate('/patient-dashboard');
          }
        }} />
      } />
      <Route path="/dashboard" element={
        user && !user.isDoctor ? (
          <PatientDashboard>
            <EnvironmentalDashboard
              data={data}
              status={status}
              onRefresh={fetchData}
              onConsult={() => setIsConsulting(true)}
            />
          </PatientDashboard>
        ) : <Navigate to="/auth" replace />
      } />
      <Route path="/doctor/*" element={
        user && user.isDoctor ? (
          <Routes>
            <Route path="/" element={<DoctorLayout />}>
              <Route index element={<Navigate to="/doctor/overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="patients" element={<PatientsPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="consultations" element={<ConsultationPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<DoctorSettings />} />
              <Route path="*" element={<Navigate to="/doctor/overview" replace />} />
            </Route>
          </Routes>
        ) : <Navigate to="/auth" replace />
      } />
      <Route path="/patient-dashboard" element={
        user && !user.isDoctor ? (
          <PatientDashboard />
        ) : <Navigate to="/auth" replace />
      } >
        <Route index element={<PatientDashboardHome />} />
        <Route path="health" element={<PatientHealthPage />} />
        <Route path="medications" element={<PatientMedicationsPage />} />
        <Route path="logs" element={<PatientLogsPage />} />
        <Route path="appointments" element={<PatientAppointmentsPage />} />
        <Route path="profile" element={<PatientProfilePage />} />
        <Route path="settings" element={<PatientSettingsPage />} />
        <Route path="*" element={<PatientDashboardHome />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App component that wraps everything in BrowserRouter
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
