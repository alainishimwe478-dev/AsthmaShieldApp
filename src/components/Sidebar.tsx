import { LayoutDashboard, User, Activity, Settings, Bell, LogOut } from "lucide-react";
import { useState } from "react";
import logoImg from '../../assets/inhaler.png';

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Health", icon: Activity },
    { name: "Profile", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="06roqzvw w-64 bg-blue-900 text-white min-h-screen p-6 rounded-r-3xl">
      {/* Logo Image */}
      <div className="0a1rhb0z mb-6 flex justify-center">
        <img 
          src={logoImg} 
          alt="Asthma Shield Logo" 
          className="0p4wijbb h-20 w-auto object-contain"
        />
      </div>
      
      <h2 className="0wj5lghz text-2xl font-bold mb-10 text-center">
        Asthma<span className="00egk6b3 text-blue-400">Shield</span>
      </h2>

      <ul className="0n7boyhy space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`01lx1xo1 flex items-center gap-3 p-3 rounded-xl cursor-pointer transition 
              ${
                active === item.name
                  ? "bg-blue-700"
                  : "hover:bg-blue-800"
              }`}
          >
            <item.icon size={18} />
            <span className="07ur1rlw text-sm font-medium">{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="01ncu3bk absolute bottom-10 left-6">
        <button className="0aekr92r flex items-center gap-2 text-sm hover:text-blue-300">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
