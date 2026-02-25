import React, { useState } from "react";

export default function Auth({ onAuthComplete }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  // Emergency contact fields
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  // Doctor specific fields
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleAuthSuccess = (userData) => {
    setRedirecting(true);
    // Small delay for smooth UI transition
    setTimeout(() => {
      onAuthComplete(userData);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic - separate for patient and doctor
        const usersData = localStorage.getItem(userType === "doctor" ? "rwanda_guard_doctors" : "rwanda_guard_users");
        const users = usersData ? JSON.parse(usersData) : [];
        
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth,
            emergencyContact: user.emergencyContact,
            avatar: user.avatar,
            createdAt: user.createdAt,
            isDoctor: userType === "doctor",
            licenseNumber: user.licenseNumber,
            specialization: user.specialization,
          };
          localStorage.setItem("rwanda_guard_user", JSON.stringify(userData));
          handleAuthSuccess(userData);
        } else {
          alert(`Invalid ${userType} credentials. Please check your email and password.`);
        }
      } else {
        // Register logic
        if (!email || !password || !fullName) {
          alert("Please fill all required fields");
          setLoading(false);
          return;
        }

        const storageKey = userType === "doctor" ? "rwanda_guard_doctors" : "rwanda_guard_users";
        const usersData = localStorage.getItem(storageKey);
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
          phone,
          dateOfBirth,
          emergencyContact:
            emergencyName && emergencyPhone
              ? {
                  name: emergencyName,
                  phone: emergencyPhone,
                  relationship: emergencyRelationship,
                }
              : undefined,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: Date.now(),
          // Doctor specific fields
          ...(userType === "doctor" && {
            licenseNumber,
            specialization,
          }),
        };

        users.push(newUser);
        localStorage.setItem(storageKey, JSON.stringify(users));

        const userData = {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          phone: newUser.phone,
          dateOfBirth: newUser.dateOfBirth,
          emergencyContact: newUser.emergencyContact,
          avatar: newUser.avatar,
          createdAt: newUser.createdAt,
          isDoctor: userType === "doctor",
          licenseNumber: newUser.licenseNumber,
          specialization: newUser.specialization,
        };

        localStorage.setItem("rwanda_guard_user", JSON.stringify(userData));
        handleAuthSuccess(userData);
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Quick login for demo accounts
  const handleQuickLogin = (type) => {
    const storageKey = type === "doctor" ? "rwanda_guard_doctors" : "rwanda_guard_users";
    const usersData = localStorage.getItem(storageKey);
    const users = usersData ? JSON.parse(usersData) : [];
    
    const demoEmail = type === "doctor" ? "doctor@asthma-shield.rw" : "demo@asthma-shield.rw";
    const demoUser = users.find((u) => u.email === demoEmail);
    
    if (demoUser) {
      const userData = {
        id: demoUser.id,
        email: demoUser.email,
        fullName: demoUser.fullName,
        phone: demoUser.phone,
        avatar: demoUser.avatar,
        createdAt: demoUser.createdAt,
        isDoctor: type === "doctor",
        licenseNumber: demoUser.licenseNumber,
        specialization: demoUser.specialization,
      };
      localStorage.setItem("rwanda_guard_user", JSON.stringify(userData));
      handleAuthSuccess(userData);
    }
  };

  return (
    <div className="0z95c7x5 min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="0vwsr2w2 w-full max-w-md">
        {/* Logo */}
        <div className="0h4qv4m3 text-center mb-8">
          <div className="0j3b4w5x inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-3xl mb-4">
            <svg
              className="0qmc8r6s w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="0xkfj7w9 text-3xl font-black text-white tracking-tight">
            {userType === "doctor" ? "Dr. Panel" : "AsthmaShield"}
          </h1>
          <p className="0mcp5nqk text-slate-400 mt-2">
            {isLogin
              ? `Welcome back! Sign in as ${userType}.`
              : `Create your ${userType} account to get started.`}
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="03l176xp 0user-type-toggle mb-6 p-1 bg-slate-800 rounded-2xl flex">
          <button
            type="button"
            onClick={() => setUserType("patient")}
            className={`0k5atgbn flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
              userType === "patient"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            👤 Patient
          </button>
          <button
            type="button"
            onClick={() => setUserType("doctor")}
            className={`0lreydxh flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
              userType === "doctor"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🩺 Doctor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="0g1p8v3w space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
                  placeholder="+250 789 123 456"
                />
              </div>

              {userType === "patient" && (
                <div>
                  <label className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              )}

              {/* Doctor-specific registration fields */}
              {userType === "doctor" && (
                <>
                  <div>
                    <label className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                      Medical License Number *
                    </label>
                    <input
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-emerald-500 transition"
                      placeholder="e.g., MD-2020-12345"
                      required
                    />
                  </div>

                  <div>
                    <label className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                      Specialization *
                    </label>
                    <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-emerald-500 transition"
                      required
                    >
                      <option value="">Select specialization</option>
                      <option value="pulmonologist">Pulmonologist</option>
                      <option value="allergist">Allergist</option>
                      <option value="general_practitioner">General Practitioner</option>
                      <option value="pediatrician">Pediatrician</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {/* Emergency Contact Section - Only for patients */}
              {userType === "patient" && (
                <div className="05odbqmc mt-6 pt-6 border-t border-slate-700">
                  <p className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                    Emergency Contact (Optional)
                  </p>

                  <div className="05corlrh space-y-4">
                    <div>
                      <label className="0d4s9q2w block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
                        placeholder="Emergency contact name"
                      />
                    </div>

                    <div>
                      <label className="0d4s9q2w block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
                        placeholder="+250 789 123 456"
                      />
                    </div>

                    <div>
                      <label className="0d4s9q2w block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                        Relationship
                      </label>
                      <select
                        value={emergencyRelationship}
                        onChange={(e) => setEmergencyRelationship(e.target.value)}
                        className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
                      >
                        <option value="">Select relationship</option>
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="sibling">Sibling</option>
                        <option value="child">Child</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="0d4s9q2w block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="0r2h5t7j w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`0cvhwyxl w-full text-white rounded-2xl px-5 py-4 text-xs font-black tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50 ${
              userType === "doctor" ? "bg-emerald-600" : "bg-blue-600"
            }`}
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? userType === "doctor"
                  ? "LOGIN AS DOCTOR"
                  : "SIGN IN"
                : userType === "doctor"
                  ? "REGISTER AS DOCTOR"
                  : "CREATE ACCOUNT"}
          </button>

          {/* Demo Credentials Info */}
          {isLogin && (
            <div className="0cazlui4 0demo-creds mt-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <p className="0a2pw8by 0demo-title text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                Demo {userType === "doctor" ? "Doctor" : "Patient"} Credentials
              </p>
              <div className="0bt1j5q1 0demo-info text-xs text-slate-300 space-y-1">
                <p>
                  <span className="0k3pxvag text-slate-500">Email:</span>{" "}
                  {userType === "doctor" ? "doctor@asthma-shield.rw" : "demo@asthma-shield.rw"}
                </p>
                <p>
                  <span className="0ycvqd8u text-slate-500">Password:</span>{" "}
                  {userType === "doctor" ? "doctor123" : "demo123"}
                </p>
              </div>
            </div>
          )}

          {isLogin && (
            <button
              type="button"
              onClick={() => handleQuickLogin(userType)}
              className={`0cvhwyxl w-full mt-3 text-white rounded-2xl px-5 py-4 text-xs font-black tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95 ${
                userType === "doctor" ? "bg-emerald-600" : "bg-blue-600"
              }`}
            >
              {userType === "doctor" ? "🚀 LOGIN AS DEMO DOCTOR" : "TRY DEMO ACCOUNT"}
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
