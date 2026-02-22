import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, X, Bell, MapPin, Wind, 
  Thermometer, Clock, CheckCircle, Info 
} from "lucide-react";

interface AlertNotification {
  id: string;
  type: "danger" | "warning" | "info" | "success";
  title: string;
  message: string;
  district: string;
  aqi?: number;
  timestamp: Date;
  read: boolean;
}

// Sample alerts for different districts
const sampleAlerts: AlertNotification[] = [
  {
    id: "1",
    type: "danger",
    title: "Critical AQI Alert",
    message: "Air quality has reached dangerous levels. Avoid outdoor activities.",
    district: "Rubavu",
    aqi: 165,
    timestamp: new Date(),
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "High Pollen Warning",
    message: "Pollen levels are elevated. Take your antihistamine medication.",
    district: "Kigali",
    aqi: 78,
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Medication Reminder",
    message: "Time to take your evening controller inhaler.",
    district: "Huye",
    timestamp: new Date(Date.now() - 7200000),
    read: true,
  },
];

export default function SmartAlertNotification() {
  const [alerts, setAlerts] = useState<AlertNotification[]>(sampleAlerts);
  const [visibleAlerts, setVisibleAlerts] = useState<AlertNotification[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Show alerts sequentially with animation
  useEffect(() => {
    const showNextAlert = (index: number) => {
      if (index < alerts.length) {
        setVisibleAlerts((prev) => [...prev, alerts[index]]);
        setTimeout(() => showNextAlert(index + 1), 500);
      }
    };
    showNextAlert(0);
  }, []);

  const dismissAlert = (id: string) => {
    setVisibleAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const markAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    );
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800",
          icon: "text-red-500",
          badge: "bg-red-500",
        };
      case "warning":
        return {
          bg: "bg-orange-50 dark:bg-orange-900/20",
          border: "border-orange-200 dark:border-orange-800",
          icon: "text-orange-500",
          badge: "bg-orange-500",
        };
      case "success":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
          border: "border-emerald-200 dark:border-emerald-800",
          icon: "text-emerald-500",
          badge: "bg-emerald-500",
        };
      default:
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          icon: "text-blue-500",
          badge: "bg-blue-500",
        };
    }
  };

  return (
    <div className="0i3ywcve fixed top-20 right-4 z-50 w-96">
      {/* Header */}
      <div 
        className="0zew143n flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="0w7fe6bw flex items-center gap-2">
          <Bell className="0r44k321 text-slate-700 dark:text-white" size={20} />
          <span className="0jxeyfme font-bold text-slate-700 dark:text-white">
            District Alerts
          </span>
          {unreadCount > 0 && (
            <span className="0i44u14w bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="08mbywb7 text-xs text-slate-400">
          {isExpanded ? "Hide" : "Show"} {alerts.length} alerts
        </span>
      </div>

      {/* Alert List */}
      {isExpanded && (
        <div className="03h7f7k4 space-y-3 max-h-96 overflow-y-auto">
          {visibleAlerts.map((alert) => {
            const styles = getAlertStyles(alert.type);
            return (
              <div
                key={alert.id}
                className={`0ed5gwti 
                  relative p-4 rounded-2xl border ${styles.bg} ${styles.border}
                  shadow-lg transform transition-all duration-300 animate-in slide-in-from-right
                  ${!alert.read ? "ring-2 ring-offset-2 ring-blue-500" : ""}
                `}
                onClick={() => markAsRead(alert.id)}
              >
                {/* Alert Icon */}
                <div className={`0f79vzy2 ${styles.icon} mb-2`}>
                  {alert.type === "danger" && <AlertTriangle size={20} />}
                  {alert.type === "warning" && <Wind size={20} />}
                  {alert.type === "success" && <CheckCircle size={20} />}
                  {alert.type === "info" && <Info size={20} />}
                </div>

                {/* Alert Content */}
                <div className="0jnfyejn flex items-start justify-between gap-2">
                  <div className="0i4tgb05 flex-1">
                    <div className="0gmvin12 flex items-center gap-2 mb-1">
                      <span className={`03t7j52v text-xs font-bold px-2 py-0.5 rounded-full text-white ${styles.badge}`}>
                        {alert.type.toUpperCase()}
                      </span>
                      {alert.aqi && (
                        <span className="0cksuncf text-xs font-bold text-slate-500">
                          AQI: {alert.aqi}
                        </span>
                      )}
                    </div>
                    <h4 className="0hmc62z7 font-bold text-slate-800 dark:text-white text-sm">
                      {alert.title}
                    </h4>
                    <p className="0q5zxgnl text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {alert.message}
                    </p>
                    <div className="0iv7iz3v flex items-center gap-1 mt-2 text-xs text-slate-400">
                      <MapPin size={12} />
                      <span>{alert.district}</span>
                      <Clock size={12} className="0imtr9jl ml-2" />
                      <span>{alert.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>

                  {/* Dismiss Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissAlert(alert.id);
                    }}
                    className="0gpg6sjs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Unread Indicator */}
                {!alert.read && (
                  <div className="0da35u03 absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Collapsed View - Show latest alert */}
      {!isExpanded && visibleAlerts.length > 0 && (
        <div className="02yvb5c7 space-y-2">
          {visibleAlerts.slice(0, 2).map((alert) => {
            const styles = getAlertStyles(alert.type);
            return (
              <div
                key={alert.id}
                className={`0ic4tgpi 
                  relative p-3 rounded-xl border ${styles.bg} ${styles.border}
                  shadow-md cursor-pointer transform transition-all hover:scale-105
                `}
                onClick={() => setIsExpanded(true)}
              >
                <div className="0o07fc77 flex items-center gap-2">
                  <div className={styles.icon}>
                    {alert.type === "danger" && <AlertTriangle size={16} />}
                    {alert.type === "warning" && <Wind size={16} />}
                    {alert.type === "success" && <CheckCircle size={16} />}
                    {alert.type === "info" && <Info size={16} />}
                  </div>
                  <div className="0pe99rxa flex-1 min-w-0">
                    <p className="02hxsj13 text-sm font-bold text-slate-800 dark:text-white truncate">
                      {alert.title}
                    </p>
                    <p className="0g6cq5cs text-xs text-slate-500 truncate">
                      {alert.district} • AQI: {alert.aqi || "N/A"}
                    </p>
                  </div>
                  {!alert.read && (
                    <div className="09ngpozm w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {visibleAlerts.length === 0 && isExpanded && (
        <div className="0fvui9a0 text-center py-8">
          <CheckCircle className="0xkedemt mx-auto text-emerald-500 mb-2" size={32} />
          <p className="0kbrevk8 text-slate-600 dark:text-slate-400">All clear! No alerts.</p>
        </div>
      )}
    </div>
  );
}
