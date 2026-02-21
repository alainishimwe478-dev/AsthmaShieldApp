import React, { useState } from "react";

export default function Auth({ onAuthComplete }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const usersData = localStorage.getItem("rwanda_guard_users");
        const users = usersData ? JSON.parse(usersData) : [];
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            avatar: user.avatar,
            createdAt: user.createdAt,
          };
          localStorage.setItem("rwanda_guard_user", JSON.stringify(userData));
          onAuthComplete(userData);
        } else {
          alert("Invalid credentials. Please check your email and password.");
        }
      } else {
        // Register logic
        if (!email || !password || !fullName) {
          alert("Please fill all fields");
          setLoading(false);
          return;
        }

        const usersData = localStorage.getItem("rwanda_guard_users");
        const users = usersData ? JSON.parse(usersData) : [];

        // Check if user already exists
        if (users.find((u) => u.email === email)) {
          alert("An account with this email already exists");
          setLoading(false);
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          email,
          password,
          fullName,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: Date.now(),
        };

        users.push(newUser);
        localStorage.setItem("rwanda_guard_users", JSON.stringify(users));

        const userData = {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          avatar: newUser.avatar,
          createdAt: newUser.createdAt,
        };

        localStorage.setItem("rwanda_guard_user", JSON.stringify(userData));
        onAuthComplete(userData);
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="0eou3opz min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="0rbmjixp w-full max-w-md">
        {/* Logo */}
        <div className="0xcznr7z text-center mb-10">
          <div
            className="010igr2s w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <svg
              className="0m0p60lf w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 7H7v6h6V7z" />
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 010-2h1V9a2 2 0 012-2h2V2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="04nd0pvl text-3xl font-black text-slate-800 tracking-tight">
            {isLogin ? "Welcome Back" : "Join the Shield"}
          </h1>
          <p className="0btig0ov text-slate-500 font-medium mt-2">
            {isLogin
              ? "Sign in to protect your health"
              : "Create your health account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="0da58brd space-y-5">
          {!isLogin && (
            <div>
              <label className="0u540dcc block text-xs font-black text-slate-500 mb-2 tracking-wider">
                FULL NAME
              </label>
              <input
                type="text"
                className="0qmfzxe7 w-full bg-white rounded-2xl px-5 py-4 text-slate-800 border-2 border-slate-200 font-medium focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="07v7nln5 block text-xs font-black text-slate-500 mb-2 tracking-wider">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              className="0ajbdrr6 w-full bg-white rounded-2xl px-5 py-4 text-slate-800 border-2 border-slate-200 font-medium focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="03sq1ml3 block text-xs font-black text-slate-500 mb-2 tracking-wider">
              PASSWORD
            </label>
            <input
              type="password"
              className="0qvo3jbm w-full bg-white rounded-2xl px-5 py-4 text-slate-800 border-2 border-slate-200 font-medium focus:outline-none focus:border-blue-600 transition-colors"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="04af5wn2 w-full bg-slate-800 text-white rounded-2xl px-5 py-4 text-xs font-black tracking-widest hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "SIGN IN"
                : "CREATE ACCOUNT"}
          </button>

          {isLogin && (
            <button
              type="button"
              onClick={() => {
                const usersData = localStorage.getItem("rwanda_guard_users");
                const users = usersData ? JSON.parse(usersData) : [];
                const demoUser = users.find(
                  (u) => u.email === "demo@asthma-shield.rw",
                );
                if (demoUser) {
                  const userData = {
                    id: demoUser.id,
                    email: demoUser.email,
                    fullName: demoUser.fullName,
                    phone: demoUser.phone,
                    avatar: demoUser.avatar,
                    createdAt: demoUser.createdAt,
                  };
                  localStorage.setItem(
                    "rwanda_guard_user",
                    JSON.stringify(userData),
                  );
                  onAuthComplete(userData);
                }
              }}
              className="0cvhwyxl w-full mt-3 bg-blue-600 text-white rounded-2xl px-5 py-4 text-xs font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              TRY DEMO ACCOUNT
            </button>
          )}
        </form>

        {/* Toggle */}
        <div className="0xqb6uxt text-center mt-8">
          <span className="03e7oskn text-slate-500 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="08atrqn7 text-blue-600 font-black hover:text-blue-700"
          >
            {isLogin ? "Join Now" : "Sign In"}
          </button>
        </div>

        {/* Back to Home */}
        <div className="0esdbxz6 text-center mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="0zp3hdiw text-slate-400 text-xs font-black uppercase tracking-wider hover:text-slate-600"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
