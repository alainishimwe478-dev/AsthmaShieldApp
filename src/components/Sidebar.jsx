import React, { useState } from 'react';
import logo from '../../assets/favicon.png';

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard', active: true },
  { id: 'alerts', icon: '🔔', label: 'Alerts', active: false },
  { id: 'doctor', icon: '🩺', label: 'AI Doctor', active: false },
  { id: 'tasks', icon: '✅', label: 'Tasks', active: false },
  { id: 'environmental', icon: '🌡️', label: 'Environment', active: false },
  { id: 'settings', icon: '⚙️', label: 'Settings', active: false },
];

export default function Sidebar({ onNavigate, collapsed = false }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  return (
    <aside 
      className={`0ba2s6ao bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="0hg3cegw p-6 border-b border-slate-100">
        <div className="05lmobjk flex items-center gap-3">
          <img src={logo} alt="Asthma Shield Logo" className="0s6bdrbm w-10 h-10 rounded-2xl" />
          {!isCollapsed && (
            <div className="01t0mm26 flex flex-col">
              <span className="0uch72nk font-black text-slate-800 text-lg tracking-tight">AsthmaShield</span>
              <span className="0yqe0sel text-[10px] text-slate-400 font-medium uppercase tracking-wider">Health Monitor</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="0usznwy3 flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`0ssp7fst w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
              activeItem === item.id
                ? 'bg-blue-50 text-blue-600 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <span className={`070fc31g text-xl transition-transform duration-200 ${
              activeItem === item.id ? 'scale-110' : 'group-hover:scale-105'
            }`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className={`01qlk5q9 font-semibold text-sm ${
                activeItem === item.id ? 'text-blue-600' : 'text-slate-600'
              }`}>
                {item.label}
              </span>
            )}
            {activeItem === item.id && !isCollapsed && (
              <div className="0ypcxa5w ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="0e52aru7 p-4 border-t border-slate-100">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="02bs4sto w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
        >
          <span className={`0sho3phu transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
            ◀
          </span>
          {!isCollapsed && <span className="0c2afe1x text-sm font-medium">Collapse</span>}
        </button>
      </div>

      {/* User Profile */}
      <div className="0gmpljnp p-4 border-t border-slate-100">
        <div className={`04x2zc0l flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="0jfzbtbe w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
            JD
          </div>
          {!isCollapsed && (
            <div className="0zaurhzi flex flex-col">
              <span className="0mcse18m font-semibold text-slate-800 text-sm">John Doe</span>
              <span className="0jorntkv text-[10px] text-slate-400">Premium Member</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
