import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FileText, Calendar, Activity } from "lucide-react";

export default function PatientLogsPage() {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem('symptomLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const getSeverityColor = (severity: number) => {
    if (severity <= 1) return "bg-emerald-100 text-emerald-700";
    if (severity <= 2) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const getSeverityText = (severity: number) => {
    if (severity === 1) return "Mild";
    if (severity === 2) return "Moderate";
    return "Severe";
  };

  return (
    <div className="0f5w8esk space-y-6">
      <h2 className="0gae4qhy text-2xl font-black">Health Logs</h2>

      {/* Add New Log Button */}
      <button className="0jexr5ag px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
        + Add New Log
      </button>

      {/* Logs List */}
      <div className={`0ukdw2lh p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0oo5gaih text-xl font-black mb-4">Recent Logs</h3>
        <div className="0a4zv05u space-y-4">
          {logs.length === 0 ? (
            <p className="09g10s84 text-slate-400 text-center py-8">No logs yet. Start tracking your health!</p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className="09st9gte flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="09gkuv91 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Activity className="06qugnxb text-blue-600" />
                </div>
                <div className="0jf1imd9 flex-1">
                  <div className="0z2vfmb7 flex items-center gap-2 mb-1">
                    <span className={`02qwoyxq px-2 py-0.5 rounded-full text-xs font-bold ${getSeverityColor(log.severity)}`}>
                      {getSeverityText(log.severity)}
                    </span>
                    <span className="0qw8dzbg text-sm text-slate-500">Peak Flow: {log.peakFlow}</span>
                  </div>
                  <p className="0sxz9rtk font-medium">{log.notes}</p>
                  <p className="0uw1zwzu text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Calendar size={12} /> {new Date(log.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
