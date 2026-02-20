import React, { useState } from 'react';

export default function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }));
        onLoginSuccess({ email: user.email, name: user.name });
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/10">
            <span className="text-4xl">🛡️</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Sign in to continue protecting your health</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-500 mb-2 tracking-wider">EMAIL ADDRESS</label>
            <input
              type="email"
              className="w-full bg-white rounded-2xl px-5 py-4 text-slate-800 border-2 border-slate-200 font-medium focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 mb-2 tracking-wider">PASSWORD</label>
            <input
              type="password"
              className="w-full bg-white rounded-2xl px-5 py-4 text-slate-800 border-2 border-slate-200 font-medium focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-slate-800 text-white rounded-2xl px-5 py-4 text-xs font-black tracking-widest hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            SIGN IN
          </button>

          <div className="text-center mt-6">
            <span className="text-slate-500 font-medium">Don't have an account? </span>
            <button onClick={onNavigateToRegister} className="text-blue-600 font-black hover:text-blue-700">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
