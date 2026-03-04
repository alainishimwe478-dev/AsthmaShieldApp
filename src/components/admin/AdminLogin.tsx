import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check against stored admins
    const adminsData = localStorage.getItem("rwanda_guard_admins");
    const admins = adminsData ? JSON.parse(adminsData) : [];
    
    const admin = admins.find((a: any) => 
      a.email === email && a.password === password
    );

    if (admin) {
      // Store session
      localStorage.setItem("rwanda_guard_user", JSON.stringify({
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        isAdmin: true,
        role: 'admin'
      }));
      navigate("/admin");
    } else {
      setError("Invalid credentials. Try admin@asthma-shield.rw / admin123");
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="0exqc0nf min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="0ies46i6 absolute inset-0 opacity-20">
        <div className="0uoqf2bt absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="0vow3gch relative w-full max-w-md">
        {/* Logo & Header */}
        <div className="0zbcqmlb text-center mb-8">
          <div className="0po5p2yh inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <Shield className="0wz90l3f w-8 h-8 text-white" />
          </div>
          <h1 className="0lmvbbbk text-3xl font-black text-white">AsthmaShield</h1>
          <p className="00fjj4qs text-slate-400 mt-2">Admin Dashboard Access</p>
        </div>

        {/* Login Card */}
        <div className="0qu4zrji bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
          <h2 className="0cdry9gi text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
          
          {error && (
            <div className="0u5kqvx9 mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="0d78n5xm space-y-4">
            {/* Email Input */}
            <div>
              <label className="0djrrw6f block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="admin@asthma-shield.rw"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="02fyxw1g w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="0gtgb35s block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <div className="0hcs684e relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="0lpoiwqe w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="0etm2yqq absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="05v89xgz w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="0avba1c9 w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Demo Credentials Hint */}
          <div className="0rvbwsmt mt-6 p-4 bg-slate-800/50 rounded-xl">
            <p className="0d7zfbrg text-xs text-slate-400 text-center">
              <span className="0bn58lcc font-semibold text-slate-300">Demo Credentials:</span>
              <br />
              Email: admin@asthma-shield.rw
              <br />
              Password: admin123
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="0tknz4vn text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="01dlcqa8 text-slate-400 hover:text-white text-sm transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

