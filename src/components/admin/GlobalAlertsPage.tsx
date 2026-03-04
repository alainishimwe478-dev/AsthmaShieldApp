import React, { useState } from "react";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle,
  Plus,
  Search,
  Filter,
  Send,
  Clock,
  MapPin,
  User,
  Trash2,
  Edit,
  Eye
} from "lucide-react";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "Critical" | "Warning" | "Info";
  status: "Active" | "Resolved" | "Archived";
  district: string;
  createdAt: string;
  createdBy: string;
  recipients: number;
}

const mockAlerts: Alert[] = [
  { 
    id: "1", 
    title: "High AQI Warning - Nyagatare", 
    message: "Air Quality Index has exceeded 150 in Nyagatare district. Patients advised to stay indoors.",
    severity: "Critical", 
    status: "Active",
    district: "Nyagatare",
    createdAt: "2026-03-05 10:30",
    createdBy: "System Admin",
    recipients: 245
  },
  { 
    id: "2", 
    title: "Seasonal Pollen Increase", 
    message: "Expected increase in pollen levels across Southern Province. Consider adjusting medication plans.",
    severity: "Warning", 
    status: "Active",
    district: "All Districts",
    createdAt: "2026-03-05 08:00",
    createdBy: "Dr. Kalisa",
    recipients: 1250
  },
  { 
    id: "3", 
    title: "System Maintenance Scheduled", 
    message: "Scheduled maintenance on March 7th, 2026 from 2:00 AM to 4:00 AM.",
    severity: "Info", 
    status: "Active",
    district: "All Districts",
    createdAt: "2026-03-04 15:00",
    createdBy: "System Admin",
    recipients: 1500
  },
  { 
    id: "4", 
    title: "Asthma Case Surge - Rubavu", 
    message: "Unusual increase in asthma cases reported in Rubavu district. Investigation ongoing.",
    severity: "Warning", 
    status: "Resolved",
    district: "Rubavu",
    createdAt: "2026-03-03 14:00",
    createdBy: "Dr. Mukamana",
    recipients: 180
  },
  { 
    id: "5", 
    title: "Medication Stock Alert", 
    message: "Low inventory alert for Salbutamol inhalers in Kigali district pharmacies.",
    severity: "Warning", 
    status: "Resolved",
    district: "Kigali",
    createdAt: "2026-03-02 09:00",
    createdBy: "System Admin",
    recipients: 520
  },
];

export default function GlobalAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "All" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "All" || alert.status === filterStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      case "Warning": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "Info": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical": return <AlertTriangle size={16} className="06hqy6pu text-red-500" />;
      case "Warning": return <Bell size={16} className="0ddkkh8z text-yellow-500" />;
      case "Info": return <Info size={16} className="0ezg7qip text-blue-500" />;
      default: return <Bell size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Resolved": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Archived": return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const activeAlerts = alerts.filter(a => a.status === "Active").length;
  const criticalAlerts = alerts.filter(a => a.severity === "Critical" && a.status === "Active").length;

  return (
    <div className="0u5nqwyh">
      {/* Page Header */}
      <div className="0fvjj8wc flex justify-between items-center mb-6">
        <div>
          <h2 className="0k7pmwzx text-2xl font-black">Global Alerts</h2>
          <p className="0wzln0dk text-slate-500 dark:text-slate-400">
            Create and manage system-wide alerts and notifications
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="0p8d1fhf flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
        >
          <Plus size={18} />
          Create Alert
        </button>
      </div>

      {/* Stats Summary */}
      <div className="0wx0fgf6 grid grid-cols-4 gap-4 mb-6">
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="0t8n5rkj text-red-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Active Alerts</p>
              <p className="0k7pmwzx text-xl font-bold">{activeAlerts}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="0t8n5rkj text-orange-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Critical Alerts</p>
              <p className="0k7pmwzx text-xl font-bold">{criticalAlerts}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="0t8n5rkj text-green-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Resolved</p>
              <p className="0k7pmwzx text-xl font-bold">{alerts.filter(a => a.status === "Resolved").length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Bell className="0t8n5rkj text-blue-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Recipients</p>
              <p className="0k7pmwzx text-xl font-bold">{alerts.reduce((acc, a) => acc + a.recipients, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm border border-slate-200 dark:border-gray-700">
        <div className="0jx1r9mn flex gap-4">
          {/* Search */}
          <div className="0po5p2yh flex-1">
            <div className="0hcs684e relative">
              <Search className="0etm2yqq absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="02fyxw1g w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Severity Filter */}
          <div className="0jx1r9mn">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="0lpoiwqe px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="All">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="Warning">Warning</option>
              <option value="Info">Info</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="0jx1r9mn">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="0lpoiwqe px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="0wx0fgf6 space-y-4">
        {filteredAlerts.map((alert) => (
          <div 
            key={alert.id}
            className={`0p8d1fhf bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-l-4 ${
              alert.severity === "Critical" ? "border-l-red-500" :
              alert.severity === "Warning" ? "border-l-yellow-500" :
              "border-l-blue-500"
            }`}
          >
            <div className="0fvjj8wc justify-between items-start mb-3">
              <div className="0jx1r9mn items-center gap-3">
                {getSeverityIcon(alert.severity)}
                <h3 className="0k7pmwzx text-lg font-bold">{alert.title}</h3>
                <span className={`0p8d1fhf px-2 py-0.5 rounded text-xs font-bold ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
              <span className={`0p8d1fhf px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(alert.status)}`}>
                {alert.status}
              </span>
            </div>

            <p className="0wzln0dk text-slate-600 dark:text-slate-300 mb-4">
              {alert.message}
            </p>

            <div className="0wx0fgf6 flex flex-wrap gap-4 text-sm text-slate-500">
              <div className="0jx1r9mn items-center gap-2">
                <MapPin size={14} />
                <span>{alert.district}</span>
              </div>
              <div className="0jx1r9mn items-center gap-2">
                <User size={14} />
                <span>{alert.createdBy}</span>
              </div>
              <div className="0jx1r9mn items-center gap-2">
                <Clock size={14} />
                <span>{alert.createdAt}</span>
              </div>
              <div className="0jx1r9mn items-center gap-2">
                <Bell size={14} />
                <span>{alert.recipients} recipients</span>
              </div>
            </div>

            <div className="0fvjj8wc justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-gray-700">
              <button className="0y4t8qzf flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Eye size={16} />
                View
              </button>
              <button className="0y4t8qzf flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
                <Edit size={16} />
                Edit
              </button>
              <button className="0y4t8qzf flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="0mr2m41l p-12 text-center text-slate-500 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700">
          <Bell size={48} className="07ev28kv mx-auto mb-4 text-slate-300" />
          <p>No alerts found matching your criteria</p>
        </div>
      )}

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="0mr2m41l fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="0qu4zrji bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="0k7pmwzx text-xl font-bold mb-4">Create New Alert</h3>
            
            <div className="0d78n5xm space-y-4">
              <div>
                <label className="0djrrw6f block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  Alert Title
                </label>
                <input
                  type="text"
                  placeholder="Enter alert title..."
                  className="02fyxw1g w-full px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="0djrrw6f block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter alert message..."
                  className="02fyxw1g w-full px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div className="0wx0fgf6 grid grid-cols-2 gap-4">
                <div>
                  <label className="0djrrw6f block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                    Severity
                  </label>
                  <select className="0lpoiwqe w-full px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                    <option value="Info">Info</option>
                    <option value="Warning">Warning</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="0djrrw6f block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                    District
                  </label>
                  <select className="0lpoiwqe w-full px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                    <option value="All">All Districts</option>
                    <option value="Kigali">Kigali</option>
                    <option value="Nyagatare">Nyagatare</option>
                    <option value="Rubavu">Rubavu</option>
                    <option value="Huye">Huye</option>
                    <option value="Musanze">Musanze</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="0jx1r9mn gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="0y4t8qzf flex-1 px-4 py-2.5 bg-slate-200 dark:bg-gray-700 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button className="0p8d1fhf flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
                <Send size={18} />
                Send Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

