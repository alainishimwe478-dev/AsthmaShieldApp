import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Activity,
  Shield,
  Bell,
  Settings,
  LogOut,
  LayoutDashboard,
  Stethoscope,
  MapPin,
  FileText,
  BarChart3,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLogout?: () => void;
}

export default function AdminSidebar({ darkMode, toggleDarkMode, onLogout }: AdminSidebarProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('rwanda_guard_user');
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <aside className={`0t9jbqw4 w-72 border-r flex flex-col ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"
    }`}>
      {/* Logo */}
      <div className="0kx02o1p p-8 flex items-center gap-3">
        <div className="09zc6le2 bg-blue-600 p-2 rounded-xl">
          <Shield className="07v0ogal text-white w-6 h-6" />
        </div>
        <h1 className={`0nl2g45d text-xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="00qrzgbq flex-1 px-4 space-y-2">
        <NavItem to="/admin/overview" icon={<LayoutDashboard />} label="Overview" darkMode={darkMode} />
        <NavItem to="/admin/doctors" icon={<Stethoscope />} label="Manage Doctors" darkMode={darkMode} />
        <NavItem to="/admin/patients" icon={<Users />} label="Manage Patients" darkMode={darkMode} />
        <NavItem to="/admin/analytics" icon={<BarChart3 />} label="System Analytics" darkMode={darkMode} />
        <NavItem to="/admin/districts" icon={<MapPin />} label="District Monitoring" darkMode={darkMode} />
        <NavItem to="/admin/reports" icon={<FileText />} label="Reports" darkMode={darkMode} />
        <NavItem to="/admin/alerts" icon={<Bell />} label="Global Alerts" darkMode={darkMode} />
      </nav>

      {/* Dark Mode Toggle */}
      <div className="020lyky7 p-4">
        <button
          onClick={toggleDarkMode}
          className={`0ud5pcv3 w-full flex items-center justify-between p-3 rounded-xl ${
            darkMode ? "bg-gray-700 text-yellow-400" : "bg-slate-100 text-slate-600"
          }`}
        >
          <div className="0z9riiks flex items-center gap-2 font-bold">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </div>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Bottom - Settings & Logout */}
      <div className="0jy0gyxz p-6 border-t dark:border-gray-700">
        <NavItem to="/admin/settings" icon={<Settings />} label="Settings" darkMode={darkMode} />
        <button 
          onClick={handleLogout}
          className={`0y4t8qzf w-full flex items-center gap-3 p-3 rounded-xl font-bold transition hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 ${darkMode ? "dark:text-gray-200" : ""}`}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  color?: string;
  darkMode: boolean;
}

function NavItem({ to, icon, label, color = "text-slate-600", darkMode }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl font-bold transition ${
          isActive
            ? "bg-blue-600 text-white shadow-lg"
            : `hover:bg-blue-50 dark:hover:bg-gray-700 ${color} ${darkMode ? "dark:text-gray-200" : ""}`
        }`
      }
    >
      {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      {label}
    </NavLink>
  );
}
