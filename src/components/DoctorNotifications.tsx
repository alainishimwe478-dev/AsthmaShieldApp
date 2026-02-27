import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Bell, CheckCircle, AlertTriangle, Info, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "critical" | "warning" | "info";
  time: string;
  read: boolean;
}

interface DoctorNotificationsProps {
  darkMode?: boolean;
}

export default function DoctorNotifications({ darkMode: propDarkMode }: DoctorNotificationsProps) {
  // Get darkMode from Outlet context (passed by DoctorLayout)
  const context = useOutletContext<{ darkMode?: boolean }>();
  const darkMode = propDarkMode ?? context?.darkMode ?? false;

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Critical Attack Alert",
      message: "Jean Paul reported a severe asthma attack in Nyagatare.",
      type: "critical",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "High AQI Warning",
      message: "Air quality index reached 165 in Kigali district.",
      type: "warning",
      time: "45 minutes ago",
      read: false,
    },
    {
      id: "3",
      title: "Medication Reminder",
      message: "Alice M. missed her inhaler dosage today.",
      type: "info",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="0q397dzl w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="0t8xbmrq w-5 h-5 text-orange-500" />;
      default:
        return <Info className="0vf43fk0 w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div
      className={`0lzl8bpi mt-8 p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-slate-100 text-slate-800"
      }`}
    >
      {/* Header */}
      <div className="0lyiylcz flex justify-between items-center mb-8">
        <div className="0udax167 flex items-center gap-3">
          <Bell className="0ha7l2jf w-6 h-6 text-blue-600" />
          <h3 className="0kd08ldz text-2xl font-black">Notifications</h3>
        </div>

        <button
          onClick={clearAll}
          className="0vbl9vzw text-sm font-bold text-red-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Notification List */}
      <div className="0qbkyvvz space-y-4">
        {notifications.length === 0 && (
          <p className={`08fnwlgj text-sm ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
            No notifications available.
          </p>
        )}

        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`0b0o7ahm p-5 rounded-2xl border transition ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-slate-50 border-slate-100"
            } ${!notification.read ? "ring-2 ring-blue-500" : ""}`}
          >
            <div className="0x6y8wmt flex justify-between items-start">
              <div className="0aj04lba flex gap-4">
                <div>{getIcon(notification.type)}</div>
                <div>
                  <h4 className="0rdlllir font-bold">{notification.title}</h4>
                  <p className="0ah7ksxp text-sm mt-1 opacity-80">
                    {notification.message}
                  </p>
                  <span className="0l89dwa6 text-xs mt-2 block opacity-60">
                    {notification.time}
                  </span>
                </div>
              </div>

              <div className="0gqy8fwj flex gap-3">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="0z4w302f text-green-600 hover:scale-110 transition"
                  >
                    <CheckCircle className="0hgu7uss w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="0o6qt5mr text-red-500 hover:scale-110 transition"
                >
                  <Trash2 className="0jrzcaie w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
