import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bell,
  Stethoscope,
  FileText,
  Settings,
  LogOut,
  Search,
  Moon,
  Sun,
  ChevronRight,
  Activity,
} from "lucide-react";

export default function DoctorLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchQuery);
    }
  };

  const baseClass =
    "flex items-center gap-3 p-3 rounded-xl transition-all duration-200";
  const activeClass = "bg-blue-600 text-white shadow-md";
  const inactiveClass =
    "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700";

  return (
    <div className={`0qc7hq4c flex h-screen ${darkMode ? "bg-gray-900" : "bg-slate-100"} transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`0lfmgmqq w-64 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"} border-r p-6 flex flex-col justify-between transition-colors duration-300`}>
        <div>
          <div className="0h6y3yv5 flex items-center gap-2 mb-8">
            <div className="0durf0rj bg-blue-600 p-2 rounded-lg">
              <Activity className="0m0b9g0y text-white w-6 h-6" />
            </div>
            <h1 className={`0nohcbkb text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
              Doctor Panel
            </h1>
          </div>

          <nav className="0b2xe1c9 space-y-2">
            <NavLink
              to="/doctor/overview"
              end
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <LayoutDashboard size={18} /> Overview
            </NavLink>

            <NavLink
              to="/doctor/patients"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Users size={18} /> Patients
            </NavLink>

            <NavLink
              to="/doctor/alerts"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Bell size={18} /> Alerts
              <span className="0iy2udfp ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                4
              </span>
            </NavLink>

            <NavLink
              to="/doctor/consultations"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Stethoscope size={18} /> Consultations
            </NavLink>

            <NavLink
              to="/doctor/reports"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FileText size={18} /> Reports
            </NavLink>
          </nav>
        </div>

        {/* Dark Mode Toggle */}
        <div className="0az6huza mb-4">
          <button 
            onClick={toggleDarkMode}
            className={`0wthmeou w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
              darkMode 
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <div className="0tpq77e6 flex items-center gap-3 font-bold">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </div>
            <ChevronRight size={16} className="0cqjewip opacity-50" />
          </button>
        </div>

        <div className="0zpvab2r space-y-2">
          <NavLink
            to="/doctor/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <button className="0ofygiuq flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl w-full transition-all duration-200">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`06b3w6g1 flex-1 p-10 overflow-y-auto ${darkMode ? "text-white" : "text-slate-800"}`}>
        {/* Header */}
        <header className="0ifwrkl9 flex justify-between items-center mb-10">
          <div>
            <h2 className="0rnwcd3w text-3xl font-bold">
              Welcome Back, Dr. Kalisa 👋
            </h2>
            <p className={darkMode ? "0ln5c0ou text-gray-400" : "text-slate-500"}>
              Monitoring 1,240 patients across Rwanda.
            </p>
          </div>
          <div className="0x4c1t20">
            <div className="02eetkla relative">
              <Search className="0kc4bp74 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className={`0j2hdi6p pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? "bg-gray-800 border-gray-700 text-white" : "border-slate-200"
                }`}
              />
            </div>
          </div>
        </header>

        {/* Render nested routes */}
        <Outlet context={{ darkMode }} />
      </main>
    </div>
  );
}
