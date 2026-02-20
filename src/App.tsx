import React, { useState, useEffect, useCallback } from 'react';
import { AppStatus, EnvironmentalData, User } from './types';
import { getEnvironmentalData } from './services/geminiService';
import EnvironmentalDashboard from './components/EnvironmentalDashboard';
import { DoctorLive } from './components/DoctorLive';
import Auth from './components/Auth';
import LandingPage from './components/LandingScreen';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [data, setData] = useState<EnvironmentalData | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  
  // 'home' is the mandatory default view to ensure LandingPage is shown first.
  const [view, setView] = useState<'home' | 'dashboard' | 'auth'>('home');

// Initialize demo user on mount
  useEffect(() => {
    // Check if demo user already exists, if not create it
    const usersData = localStorage.getItem('rwanda_guard_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const demoEmail = 'demo@asthma-shield.rw';
    let demoUser = users.find((u) => u.email === demoEmail);
    
if (!demoUser) {
      // Create demo user
      demoUser = {
        id: 'demo-user-001',
        email: demoEmail,
        password: 'demo123',
        fullName: 'Demo User',
        phone: '+250 789 123 456',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${demoEmail}`,
        createdAt: Date.now()
      };
      users.push(demoUser);
      localStorage.setItem('rwanda_guard_users', JSON.stringify(users));
      
      // Create sample symptom logs for demo user
      const sampleLogs = [
        { id: '1', timestamp: Date.now() - 86400000, severity: 2, peakFlow: 420, notes: 'Morning check - breathing normal' },
        { id: '2', timestamp: Date.now() - 172800000, severity: 3, peakFlow: 380, notes: 'Slight discomfort in the evening' },
        { id: '3', timestamp: Date.now() - 259200000, severity: 1, peakFlow: 450, notes: 'Good day, no issues' }
      ];
      localStorage.setItem('symptomLogs', JSON.stringify(sampleLogs));
    }
    
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

  // Fetch dashboard data only when the dashboard view is active
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
  };

  const handleGoToAuth = () => {
    // If the user is already logged in, skip auth and go to dashboard
    if (user) {
      setView('dashboard');
    } else {
      setView('auth');
    }
  };

  if (!initialized) {
    return (
      <div className="0xjkg6it min-h-screen bg-white flex items-center justify-center">
        <div className="0n40k6va w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Authentication View
  if (view === 'auth' && !user) {
    return <Auth onAuthComplete={(u) => { setUser(u); setView('dashboard'); }} />;
  }

  // Home View - THIS IS THE LANDING PAGE
  if (view === 'home') {
    return (
      <LandingPage 
        onGetStarted={() => handleGoToAuth()} 
        onLogin={() => handleGoToAuth()}
      />
    );
  }

  // Dashboard View - Requires User Session
  if (!user) {
    setView('home');
    return null;
  }

  return (
    <div className="073ydvtx min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 animate-in fade-in duration-700">
      <nav className="0yfxinic p-4 md:p-6 max-w-5xl mx-auto flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-100 mb-4 rounded-b-3xl">
        <div 
          className="0jljib3n flex items-center gap-3 group cursor-pointer" 
          onClick={() => setView('home')}
          title="Return to Home Screen"
        >
          <div className="0u0nlj3t w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all group-hover:scale-110 group-active:scale-95">
            <svg className="0f6campq w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 7H7v6h6V7z"/>
              <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 010-2h1V9a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="0gowpcby flex flex-col">
            <span className="0da71gug font-black text-lg tracking-tighter uppercase italic text-blue-600 leading-none">Shield</span>
            <span className="0yhoap6h text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Health Console</span>
          </div>
        </div>
        
        <div className="01otfupt flex items-center gap-4">
          <button 
            onClick={() => setView('home')}
            className="0yqs8hxj hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mr-2"
          >
            Home
          </button>
          <div className="0sdkudnu hidden sm:flex flex-col items-end mr-2">
            <span className="03kz2ath text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Active</span>
            <span className="0q9gtugz text-sm font-bold text-slate-800">{user.fullName}</span>
          </div>
          <div className="0bho6ffg relative group">
            <img 
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
              alt="Avatar" 
              className="0793zn1o w-10 h-10 rounded-xl bg-blue-100 border-2 border-white shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="08qyhq32 absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <button 
            onClick={handleLogout}
            className="0ftsykge w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-90"
            title="Log Out"
          >
            <svg className="076bewif w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </nav>

      <main className="0489kx0l pb-20">
        <EnvironmentalDashboard 
          data={data} 
          status={status} 
          onRefresh={fetchData} 
          onConsult={() => setIsConsulting(true)} 
        />
      </main>

      {isConsulting && data && (
        <DoctorLive 
          envSummary={data.summary} 
          onClose={() => setIsConsulting(false)} 
        />
      )}

      {status === AppStatus.ERROR && (
        <div className="0yroz3f6 fixed bottom-8 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-8 py-4 rounded-3xl shadow-2xl shadow-rose-900/20 font-black text-xs uppercase tracking-widest animate-in slide-in-from-bottom-10 z-50">
          <div className="0ki5b8k0 flex items-center gap-3">
            <svg className="0vch962j w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Feed Sync Failed. <button onClick={fetchData} className="0a72ud2n underline ml-1">Retry Sync</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
