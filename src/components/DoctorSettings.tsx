import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User, Lock, Bell, ShieldCheck, Save } from "lucide-react";

interface DoctorSettingsProps {
  darkMode?: boolean;
}

export default function DoctorSettings({ darkMode: propDarkMode }: DoctorSettingsProps) {
  // Get darkMode from Outlet context (passed by DoctorLayout)
  const context = useOutletContext<{ darkMode?: boolean }>();
  const darkMode = propDarkMode ?? context?.darkMode ?? false;
  const [formData, setFormData] = useState({
    fullName: "Dr. Kalisa",
    email: "kalisa@hospital.rw",
    phone: "+250 788 000 000",
    password: "",
    notifications: true,
    twoFactor: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Saved Settings:", formData);
    alert("Settings updated successfully!");
  };

  return (
    <div
      className={`061k2gfu mt-8 p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-slate-100 text-slate-800"
      }`}
    >
      <h3 className="01shvvcs text-2xl font-black mb-8">Account Settings</h3>

      <div className="0gwgf7c4 grid md:grid-cols-2 gap-8">

        {/* ================= PROFILE SETTINGS ================= */}
        <div
          className={`04hdogmy p-6 rounded-2xl ${
            darkMode ? "bg-gray-700" : "bg-slate-50"
          }`}
        >
          <div className="0wlw3lfv flex items-center gap-2 mb-6">
            <User className="087e0f4q w-5 h-5 text-blue-600" />
            <h4 className="046zlgz3 font-bold text-lg">Profile Information</h4>
          </div>

          <div className="0xh2l91m space-y-4">
            <div>
              <label className="0f2dao5e text-sm font-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`0ws7cx1s w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "border-slate-200"
                }`}
              />
            </div>

            <div>
              <label className="0uo0td7r text-sm font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`0dqtnfao w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "border-slate-200"
                }`}
              />
            </div>

            <div>
              <label className="07yydnx1 text-sm font-semibold">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`0gzic8l8 w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "border-slate-200"
                }`}
              />
            </div>
          </div>
        </div>

        {/* ================= SECURITY SETTINGS ================= */}
        <div
          className={`0bzk3f6k p-6 rounded-2xl ${
            darkMode ? "bg-gray-700" : "bg-slate-50"
          }`}
        >
          <div className="0sgcz33f flex items-center gap-2 mb-6">
            <Lock className="0kh5v8gt w-5 h-5 text-blue-600" />
            <h4 className="0cdt1d5r font-bold text-lg">Security</h4>
          </div>

          <div className="04dcg3sr space-y-4">
            <div>
              <label className="0iajbfue text-sm font-semibold">Change Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className={`0hbhysud w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "border-slate-200"
                }`}
              />
            </div>

            <div className="0gcrcg4b flex items-center justify-between">
              <span className="00arajxh text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="0f9tez5i w-4 h-4 text-blue-600" />
                Enable Two-Factor Authentication
              </span>
              <input
                type="checkbox"
                name="twoFactor"
                checked={formData.twoFactor}
                onChange={handleChange}
                className="0793uada w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* ================= NOTIFICATION SETTINGS ================= */}
        <div
          className={`0xbvmj5i p-6 rounded-2xl ${
            darkMode ? "bg-gray-700" : "bg-slate-50"
          }`}
        >
          <div className="0zkbfd23 flex items-center gap-2 mb-6">
            <Bell className="0mweulk7 w-5 h-5 text-blue-600" />
            <h4 className="0uv3arpe font-bold text-lg">Notifications</h4>
          </div>

          <div className="0b1pyalv flex items-center justify-between">
            <span className="05wib9rf text-sm font-semibold">
              Receive email alerts for critical patients
            </span>
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="0xjpjhbj w-4 h-4"
            />
          </div>
        </div>

      </div>

      {/* ================= SAVE BUTTON ================= */}
      <div className="0efgui9s mt-10 flex justify-end">
        <button
          onClick={handleSave}
          className="0ss81pq3 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          <Save className="0r9jtijl w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
