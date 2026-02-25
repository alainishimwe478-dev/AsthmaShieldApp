import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppStatus, EnvironmentalData, User } from './types';
import { getEnvironmentalData } from './services/geminiService';
import EnvironmentalDashboard from './components/EnvironmentalDashboard';
import { DoctorLive } from './components/DoctorLive';
import Auth from './components/Auth';
import LandingPage from './components/LandingScreen';
import DoctorLayout from './components/doctor/DoctorLayout';
import OverviewPage from './components/doctor/OverviewPage';
import PatientsPage from './components/doctor/PatientsPage';
import AlertsPage from './components/doctor/AlertsPage';
import ReportsPage from './components/doctor/ReportsPage';
import ConsultationPage from './components/ConsultationPage';

// Inner component that has access to useNavigate hook
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [data, setData] = useState<EnvironmentalData | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);
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
      <div className="0ot4bdb2 min-h-screen bg-white flex items-center justify-center">
        <div className="0g8pbuz7 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
      <div className="0zs9tcwy min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="06qllaol text-center p-8 bg-white rounded-3xl shadow-lg max-w-md">
          <div className="0txqgx2l w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="0i578nnu w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="0a3rnqmb text-2xl font-black text-slate-800 mb-2">Access Denied</h2>
          <p className="0dralbnv text-slate-500 mb-6">You do not have permission to access the Doctor Dashboard. Please login as a doctor.</p>
          <button 
            onClick={() => {
              localStorage.removeItem('rwanda_guard_user');
              setUser(null);
              setView('auth');
            }} 
            className="0vjc5or2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Login as Doctor
          </button>
        </div>
      </div>
    );
  }

  // Wrap everything in BrowserRouter for React Router navigation
  return (
    <div className="0fzduj3c min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 animate-in fade-in duration-700">
        <nav className="0b06q0nl p-4 md:p-6 max-w-5xl mx-auto flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-100 mb-4 rounded-b-3xl">
          <div className="0c1aq4xo flex items-center gap-3 group cursor-pointer" onClick={() => setView('home')}>
            <div className="07kchgjv w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="0qure7px w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z"/>
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 010-2h1V9a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="0a9oahhw flex flex-col">
              <span className="0xhde4yk font-black text-lg tracking-tighter uppercase italic text-blue-600 leading-none">Shield</span>
              <span className="0tkhcpi3 text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Health Console</span>
            </div>
          </div>
          
          <div className="07gi1x6d flex items-center gap-4">
            <button onClick={() => setView('home')} className="01rsm2oa hidden sm:block text-sm font-semibold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
              Home
            </button>
            
            {user.isDoctor && (
              <button onClick={() => setView('doctor')} className="0s9cg3vx hidden sm:block text-sm font-semibold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                Doctor Panel
              </button>
            )}
            
            {!user.isDoctor && (
              <button onClick={() => setView('dashboard')} className="066bywsc hidden sm:block text-sm font-semibold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                My Dashboard
              </button>
            )}
            
            <div className="0eqmxkwn hidden sm:flex flex-col items-end mr-2">
              <span className="0gm1c4ho text-xs font-semibold text-slate-300 uppercase tracking-widest leading-none">
                {user.isDoctor ? 'Doctor' : 'Patient'}
              </span>
              <span className="0fb0a4g5 text-sm font-bold text-slate-800">{user.fullName}</span>
            </div>
            
            <div className="0ep6i1sx relative group">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                alt="Avatar" 
                className="0budl0mj w-10 h-10 rounded-xl bg-blue-100 border-2 border-white shadow-sm transition-transform group-hover:scale-105"
              />
              <div className="0umbd0fb absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="0hfp8z1e w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-90"
              title="Log Out"
            >
              <svg className="0wuit04v w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </nav>

        <main className="0w9a9d4r pb-20">
          {/* Patient Dashboard - only show for non-doctors */}
          {view === 'dashboard' && !user.isDoctor && (
            <EnvironmentalDashboard 
              data={data} 
              status={status} 
              onRefresh={fetchData} 
              onConsult={() => setIsConsulting(true)} 
            />
          )}

          {/* Doctor Dashboard - rendered via React Router for all /doctor/* routes */}
          {(view === 'doctor' || (view !== 'home' && view !== 'auth' && user?.isDoctor)) && (
            <Routes>
              <Route path="/doctor" element={<DoctorLayout />}>
                <Route index element={<Navigate to="/doctor/overview" replace />} />
                <Route path="overview" element={<OverviewPage />} />
                <Route path="patients" element={<PatientsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="consultations" element={<ConsultationPage />} />
                <Route path="reports" element={<ReportsPage />} />
                {/* Fallback for doctor sub-routes - redirect to overview */}
                <Route path="*" element={<Navigate to="/doctor/overview" replace />} />
              </Route>
            </Routes>
          )}
        </main>

        {isConsulting && data && (
          <DoctorLive 
            envSummary={data.summary} 
            onClose={() => setIsConsulting(false)} 
          />
        )}

        {status === AppStatus.ERROR && (
          <div className="0p3q415k fixed bottom-8 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-8 py-4 rounded-3xl shadow-2xl font-black text-xs uppercase tracking-widest animate-in slide-in-from-bottom-10 z-50">
            <div className="05j4s5js flex items-center gap-3">
              <svg className="0kg82rj3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Feed Sync Failed. <button onClick={fetchData} className="0y1ly9fl underline ml-1">Retry Sync</button>
            </div>
          </div>
        )}
    </div>
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
