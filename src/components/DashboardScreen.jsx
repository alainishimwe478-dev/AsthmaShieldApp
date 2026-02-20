import React, { useState, useEffect } from 'react';

export default function DashboardScreen() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    try {
      const stored = localStorage.getItem('symptomLogs');
      const parsedLogs = stored ? JSON.parse(stored) : [];
      setLogs(Array.isArray(parsedLogs) ? parsedLogs : []);
    } catch (error) {
      console.error('Failed to load logs:', error);
      setLogs([]);
    }
  };

  const formatDate = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getSeverityColor = (sev) => {
    if (sev <= 2) return 'bg-emerald-500';
    if (sev <= 4) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 mb-1">🛡️ Dashboard</h1>
        <p className="text-slate-500">Your asthma overview</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
          <p className="text-2xl font-black text-blue-600">{logs.length}</p>
          <p className="text-xs text-slate-500 mt-1">Total Logs</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
          <p className="text-2xl font-black text-blue-600">
            {logs.length > 0 ? Math.round(logs.reduce((sum, log) => sum + log.severity, 0) / logs.length) : 0}
          </p>
          <p className="text-xs text-slate-500 mt-1">Avg Severity</p>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-slate-400">No logs yet. Start tracking!</p>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-black text-slate-800 mb-3">Recent Logs</h2>
          {logs
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 3)
            .map((log) => (
              <div key={log.id} className="bg-white rounded-xl p-3 mb-2 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className={`${getSeverityColor(log.severity)} text-white text-[10px] font-bold px-2 py-1 rounded-lg`}>
                    Level {log.severity}
                  </span>
                  <span className="text-[10px] text-slate-500">{formatDate(log.timestamp)}</span>
                </div>
                <p className="text-xs text-slate-600">Peak Flow: {log.peakFlow} L/min</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
