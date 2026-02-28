import React from "react";
import { useOutletContext } from "react-router-dom";
import { Bell, Moon, Shield, HelpCircle, Info } from "lucide-react";

export default function PatientSettingsPage() {
  const { darkMode, setDarkMode } = useOutletContext<{ darkMode: boolean; setDarkMode?: (val: boolean) => void }>();

  return (
    <div className="023eem37 space-y-6">
      <h2 className="02qd5j28 text-2xl font-black">Settings</h2>

      {/* Notification Settings */}
      <div className={`0xqmweba p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0nt76orl text-xl font-black mb-4 flex items-center gap-2">
          <Bell className="0el16166 text-blue-600" /> Notifications
        </h3>
        <div className="0zxlkt5y space-y-4">
          <div className="04qpsnhh flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="0i4tslnz font-medium">Push Notifications</p>
              <p className="0c4nz8yk text-sm text-slate-500">Receive alerts for medications and appointments</p>
            </div>
            <label className="0jvl89ks relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="0l3zskur sr-only peer" />
              <div className="0h4azmae w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="0z3yhgbz flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="0o3j22zs font-medium">Email Notifications</p>
              <p className="0eht7kh7 text-sm text-slate-500">Receive weekly health summaries</p>
            </div>
            <label className="09ubh0pr relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="04vxg7fq sr-only peer" />
              <div className="0906ac72 w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="06fwfuq4 flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="0mp5bcdd font-medium">Medication Reminders</p>
              <p className="0yveyxmr text-sm text-slate-500">Daily reminders for controller medications</p>
            </div>
            <label className="0czsvp1o relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="0foi5ll7 sr-only peer" />
              <div className="0pc3ulbs w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className={`0wl4s6bd p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0lg4ufth text-xl font-black mb-4 flex items-center gap-2">
          <Shield className="089eijph text-blue-600" /> Privacy & Security
        </h3>
        <div className="0osg5xyv space-y-3">
          <button className="0cvsgbc4 w-full text-left p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
            <p className="00g11vlq font-medium">Change Password</p>
          </button>
          <button className="0dhhhtrq w-full text-left p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
            <p className="0ljewrgy font-medium">Two-Factor Authentication</p>
          </button>
          <button className="0eiqepo7 w-full text-left p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
            <p className="04eafqsj font-medium">Data Export</p>
          </button>
        </div>
      </div>

      {/* About */}
      <div className={`00yt3ued p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0v0w33cw text-xl font-black mb-4 flex items-center gap-2">
          <Info className="0vxkmjqz text-blue-600" /> About
        </h3>
        <div className="0izlv3vo space-y-3 text-sm text-slate-500">
          <p>Version: 1.0.0</p>
          <p>AsthmaShield - Rwanda's Premier Asthma Management Platform</p>
        </div>
      </div>
    </div>
  );
}
