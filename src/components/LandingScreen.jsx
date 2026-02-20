import React from 'react';

export default function LandingScreen({ onGetStarted, onLogin }) {
  return (
    <div className="0v8sbleb min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="00voprv9 px-6 pt-6 pb-24">
        {/* Sign In button in top right */}
        <div className="05147ait flex justify-end mb-6">
          <button 
            onClick={onLogin} 
            className="05t6rin8 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            SIGN IN
          </button>
        </div>
        
        <div className="0c2mp30m inline-flex items-center gap-3 px-3 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6">
          <div className="03rw3tdh w-1.5 h-1.5 rounded-full bg-blue-600"></div>
          <span className="062ig0a0 text-[10px] font-black text-blue-600 tracking-wider">LIVE ENVIRONMENTAL MONITORING</span>
        </div>
        
        <h1 className="05244ahc text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">
          Protect Your Lungs,<br />
          <span className="064y8dx4 text-blue-600">Breathe Rwanda.</span>
        </h1>
        
        <p className="0lhpfsym text-slate-500 text-base leading-relaxed mb-8 max-w-xl">
          Asthma Shield uses advanced AI and real-time climate data to protect you from respiratory risks across Rwanda.
        </p>
        
<div className="0oozc5id space-y-3 mb-10">
          <button 
            onClick={onGetStarted} 
            className="039ief1a w-full bg-blue-600 text-white py-5 rounded-full text-xs font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            JOIN THE SHIELD
          </button>
          <button 
onClick={() => {
              const usersData = localStorage.getItem('rwanda_guard_users');
              const users = usersData ? JSON.parse(usersData) : [];
              const demoUser = users.find((u) => u.email === 'demo@asthma-shield.rw');
              if (demoUser) {
                const userData = {
                  id: demoUser.id,
                  email: demoUser.email,
                  fullName: demoUser.fullName,
                  phone: demoUser.phone,
                  avatar: demoUser.avatar,
                  createdAt: demoUser.createdAt
                };
                localStorage.setItem('rwanda_guard_user', JSON.stringify(userData));
                window.location.href = '/?demo=true';
              }
            }}
            className="039ief1a w-full bg-white text-blue-600 py-4 rounded-full text-xs font-black tracking-widest hover:bg-blue-50 transition-all border-2 border-blue-200"
          >
            TRY DEMO
          </button>
        </div>

        {/* Feature Card */}
        <div className="0brpkakx bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100">
          <div className="0dnxlvyl flex justify-between items-start mb-5">
            <div>
              <p className="0cjz4tk8 text-[9px] font-black text-slate-400 tracking-wider mb-1">KIGALI SECTOR</p>
              <h3 className="08kagwsq text-xl font-black text-slate-800">Clear Air Quality</h3>
            </div>
            <div className="0jgcd4vn w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <span className="0ov15qfz text-xl text-emerald-600">✓</span>
            </div>
          </div>
          
          <div className="04rdugni grid grid-cols-2 gap-3 mb-3">
            <div className="08fsnf9n bg-slate-50 p-4 rounded-2xl">
              <p className="0duhh2wd text-[8px] font-bold text-slate-400 tracking-wider mb-1">TEMPERATURE</p>
              <p className="0iyceedn text-lg font-black text-slate-800">24°C</p>
            </div>
            <div className="0asxamz0 bg-slate-50 p-4 rounded-2xl">
              <p className="06ooa5ht text-[8px] font-bold text-slate-400 tracking-wider mb-1">AQI INDEX</p>
              <p className="025ymw5y text-lg font-black text-emerald-500">12</p>
            </div>
          </div>
          
          <div className="0csf1k58 bg-blue-600 p-5 rounded-3xl flex justify-between items-center">
            <div>
              <p className="0e3n62rv text-[9px] font-bold text-blue-100 tracking-wider mb-1">AI MEDICAL GUARD</p>
              <p className="0yq7guqg text-base font-black text-white">Online Consultations</p>
            </div>
            <div className="0sg35ahv w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="0tml3rkt text-lg">📹</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="0mecr1fu bg-white px-6 py-12">
        <h2 className="0w6p71kt text-3xl font-black text-slate-800 text-center mb-3">Precision Protection</h2>
        <p className="0ywo41xe text-sm text-slate-500 text-center mb-8 leading-relaxed">
          Built specifically for the Rwandan landscape, combining local climate data with global AI excellence.
        </p>
        
        <div className="0n7c2bm9 space-y-8">
          <div className="0yazdbp2 flex gap-4">
            <div className="0yrt3ef1 w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="03gj0lvv text-3xl">☀️</span>
            </div>
            <div>
              <h3 className="0mcsibo8 text-lg font-black text-slate-800 mb-2">Climate Tracking</h3>
              <p className="09hqv6e3 text-sm text-slate-500 leading-relaxed">
                Live temperature, humidity, and AQI updates from across all provinces in Rwanda.
              </p>
            </div>
          </div>

          <div className="0gnoohda flex gap-4">
            <div className="0843cd77 w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="0z9s5e6i text-3xl">👨⚕️</span>
            </div>
            <div>
              <h3 className="0imjbchv text-lg font-black text-slate-800 mb-2">AI Medical Doctor</h3>
              <p className="0iirdj85 text-sm text-slate-500 leading-relaxed">
                24/7 video and voice consultations with an AI doctor trained on respiratory health protocols.
              </p>
            </div>
          </div>

          <div className="0e87tare flex gap-4">
            <div className="09bmkyeq w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="0diuidpi text-3xl">🔔</span>
            </div>
            <div>
              <h3 className="0mws1v27 text-lg font-black text-slate-800 mb-2">Risk Alerts</h3>
              <p className="02yooecd text-sm text-slate-500 leading-relaxed">
                Intelligent notifications when air quality or pollen levels in your district reach risky levels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="0ou5uzix bg-slate-900 px-6 py-12">
        <div className="0q7e1x64 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="0o6vbcxb text-3xl font-black text-white mb-1">30+</p>
            <p className="0hywl5f8 text-[10px] font-black text-slate-400 uppercase tracking-wider">Districts</p>
          </div>
          <div>
            <p className="0a94xklw text-3xl font-black text-white mb-1">24/7</p>
            <p className="0kift3fc text-[10px] font-black text-slate-400 uppercase tracking-wider">Monitoring</p>
          </div>
          <div>
            <p className="0i83lfjm text-3xl font-black text-white mb-1">AI</p>
            <p className="0fji5yr4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Protection</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="0qlexfjz bg-blue-600 px-6 py-12 text-center">
        <h2 className="0u2albcr text-2xl font-black text-white mb-3">Ready to Protect Your Health?</h2>
        <p className="0rdyfaj3 text-blue-100 text-sm mb-6">Join thousands of Rwandans breathing easier with Asthma Shield.</p>
        <button 
          onClick={onGetStarted} 
          className="0q86dthx bg-white text-blue-600 px-8 py-4 rounded-full text-xs font-black tracking-widest hover:bg-blue-50 transition-all shadow-lg"
        >
          GET STARTED NOW
        </button>
      </div>

      {/* Footer */}
      <div className="0iqgz22w bg-slate-800 py-10 text-center">
        <p className="0p28nset text-base font-black text-white mb-3 tracking-wider">🛡️ ASTHMA SHIELD</p>
        <p className="0xjpecfy text-[10px] font-black text-slate-500 tracking-widest">© 2024 Asthma Shield Rwanda</p>
      </div>
    </div>
  );
}
