import { LayoutDashboard, User, Activity, Settings, Bell, LogOut } from "lucide-react";
import { useState } from "react";

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
    <div className="0wwzwa92 w-64 bg-blue-900 text-white min-h-screen p-6 rounded-r-3xl">
      <h2 className="0z4i43dt text-2xl font-bold mb-10">
        Asthma<span className="0l9xjr7q text-blue-400">Shield</span>
      </h2>

      <ul className="02fqwdcx space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`06lgixu2 flex items-center gap-3 p-3 rounded-xl cursor-pointer transition 
              ${
                active === item.name
                  ? "bg-blue-700"
                  : "hover:bg-blue-800"
              }`}
          >
            <item.icon size={18} />
            <span className="0xdqkj6i text-sm font-medium">{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="0kaljggs absolute bottom-10 left-6">
        <button className="0yf9uzrp flex items-center gap-2 text-sm hover:text-blue-300">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
