import React, { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  MapPin,
  Wind,
  Pill,
} from "lucide-react";

export default function NotificationCenter({
  userId,
  environmentalData,
  onClose,
}) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Load existing notifications
    const savedNotifications = localStorage.getItem(`notifications_${userId}`);
    const existingNotifications = savedNotifications
      ? JSON.parse(savedNotifications)
      : [];

    // Generate new notifications based on environmental data
    const newNotifications = generateNotifications(environmentalData);

    // Combine and save
    const allNotifications = [
      ...newNotifications,
      ...existingNotifications,
    ].slice(0, 50);
    setNotifications(allNotifications);
    localStorage.setItem(
      `notifications_${userId}`,
      JSON.stringify(allNotifications),
    );
  }, [userId, environmentalData]);

  const generateNotifications = (envData) => {
    const newNotifs = [];
    const now = Date.now();

    if (envData) {
      // AQI alerts
      if (envData.airQualityIndex > 150) {
        newNotifs.push({
          id: `aqi-${now}`,
          title: "Very Unhealthy Air Quality",
          message: `AQI is ${envData.airQualityIndex}. Stay indoors and avoid outdoor activities.`,
          type: "danger",
          priority: "high",
          source: "aqi",
          read: false,
          timestamp: now,
          actionRequired: "Stay indoors",
        });
      } else if (envData.airQualityIndex > 100) {
        newNotifs.push({
          id: `aqi-${now}`,
          title: "Unhealthy Air Quality",
          message: `AQI is ${envData.airQualityIndex}. Sensitive groups should limit outdoor exposure.`,
          type: "warning",
          priority: "medium",
          source: "aqi",
          read: false,
          timestamp: now,
          actionRequired: "Limit outdoor activities",
        });
      }

      // High risk districts
      if (envData.highRiskDistricts && envData.highRiskDistricts.length > 0) {
        newNotifs.push({
          id: `district-${now}`,
          title: "High Risk District Alert",
          message: `${envData.highRiskDistricts.length} district(s) reported high risk. Check the dashboard for details.`,
          type: "warning",
          priority: "high",
          source: "district",
          read: false,
          timestamp: now,
          actionRequired: "View details",
        });
      }

      // Pollen alerts
      if (
        envData.pollenLevel === "High" ||
        envData.pollenLevel === "Very High"
      ) {
        newNotifs.push({
          id: `pollen-${now}`,
          title: "High Pollen Alert",
          message: `Pollen level is ${envData.pollenLevel}. Keep windows closed and take allergy medication if prescribed.`,
          type: "warning",
          priority: "medium",
          source: "aqi",
          read: false,
          timestamp: now,
          actionRequired: "Take precautions",
        });
      }
    }

    return newNotifs;
  };

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    setNotifications(updated);
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem(`notifications_${userId}`, JSON.stringify([]));
  };

  const getFilteredNotifications = () => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.source === filter);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "danger":
        return <AlertTriangle className="0o0jrp38 w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="01g8q8a6 w-5 h-5 text-orange-500" />;
      case "success":
        return <CheckCircle className="0val1hwy w-5 h-5 text-green-500" />;
      default:
        return <Info className="0y44m14s w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "danger":
        return "border-l-red-500 bg-red-50";
      case "warning":
        return "border-l-orange-500 bg-orange-50";
      case "success":
        return "border-l-green-500 bg-green-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="05rlt28c notif-container bg-white rounded-[3rem] p-8 shadow-xl max-w-2xl mx-auto">
      {/* Header */}
      <div className="0lm5boqh notif-header flex justify-between items-start mb-6">
        <div>
          <div className="02qpisj6 notif-title-section flex items-center gap-3 mb-1">
            <div className="0g9rhyis notif-icon w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Bell className="03q26oe7 w-6 h-6 text-blue-600" />
            </div>
            <h2 className="0hc1cvj5 notif-title text-2xl font-black text-slate-900 uppercase tracking-tight">
              Alerts
            </h2>
          </div>
          <p className="0dgscax1 notif-subtitle text-slate-500 text-sm">
            {unreadCount > 0
              ? `${unreadCount} unread notifications`
              : "All caught up!"}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="0nvc06l5 notif-close p-2 hover:bg-slate-100 rounded-xl transition"
          >
            <XCircle className="03rpjd0v w-6 h-6 text-slate-400" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="0kb0kw0b notif-filters flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: "all", label: "All", icon: Bell },
          { key: "unread", label: "Unread", icon: AlertTriangle },
          { key: "aqi", label: "Air Quality", icon: Wind },
          { key: "district", label: "Districts", icon: MapPin },
          { key: "medication", label: "Medications", icon: Pill },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`0s9qx76o notif-filter-btn flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
              filter === tab.key
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <tab.icon className="0ant219o w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="09uftjv0 notif-actions flex gap-2 mb-4">
          <button
            onClick={markAllAsRead}
            className="06jttudr notif-mark-all text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Mark all as read
          </button>
          <span className="01qdg171 text-slate-300">|</span>
          <button
            onClick={clearAll}
            className="09rh4yrh notif-clear text-xs font-semibold text-red-600 hover:text-red-700"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="0il3co8q notif-list space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="0ndi2gug notif-empty flex flex-col items-center justify-center py-12 text-slate-400">
            <Bell className="01kmri3m w-12 h-12 mb-3 opacity-50" />
            <p className="0wgz94gu font-semibold">No notifications</p>
            <p className="0hty1nya text-sm">You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`0egu965z notif-item flex gap-4 p-4 rounded-2xl border-l-4 ${getNotificationColor(notif.type)} cursor-pointer hover:shadow-md transition-all ${
                !notif.read ? "ring-2 ring-blue-200" : ""
              }`}
            >
              <div className="0z1f5t7w notif-icon-wrapper mt-1">
                {getNotificationIcon(notif.type)}
              </div>
              <div className="0tm3s6gu notif-content flex-1">
                <div className="05jclr9n notif-header flex justify-between items-start mb-1">
                  <h4 className="09d8lvtc notif-item-title font-bold text-slate-900">
                    {notif.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    className="0c18u7k7 notif-delete p-1 hover:bg-slate-200 rounded transition"
                  >
                    <Trash2 className="0z9fna8s w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <p className="0ep9iyqd notif-message text-sm text-slate-600 mb-2">
                  {notif.message}
                </p>
                <div className="02rqsyvb notif-meta flex items-center gap-4 text-xs text-slate-400">
                  <span className="07phnas6 notif-time flex items-center gap-1">
                    <Clock className="0d5kca76 w-3 h-3" />
                    {new Date(notif.timestamp).toLocaleTimeString()}
                  </span>
                  {notif.actionRequired && (
                    <span className="0lsrk0z5 notif-action font-semibold text-blue-600">
                      → {notif.actionRequired}
                    </span>
                  )}
                </div>
              </div>
              {!notif.read && (
                <div className="0af39i0k notif-unread-dot w-3 h-3 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
