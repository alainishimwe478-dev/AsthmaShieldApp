import React, { useState } from 'react';

export default function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      if (users.find((u) => u.email === email)) {
        alert('Email already registered');
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      onRegisterSuccess();
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/10">
            <span className="text-4xl">🛡️</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Join the Shield</h1>
          <p className="text-slate-500 font-medium px-4">Create your account to start protecting your health</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-500 mb-2 tracking-wider">FULL NAME</label>
            <input
              type="text"
              className="w-full bg-white rounded-2xl px-5 py-4 text-slate-800 border-2 border-slate-200 font-medium focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-slate-800 text-white rounded-2xl px-5 py-4 text-xs font-black tracking-widest hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            CREATE ACCOUNT
          </button>

          <div className="text-center mt-6">
            <span className="text-slate-500 font-medium">Already have an account? </span>
            <button onClick={onNavigateToLogin} className="text-blue-600 font-black hover:text-blue-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
