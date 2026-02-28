import React from "react";
import { useOutletContext } from "react-router-dom";

export default function PatientHealthPage() {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();

  return (
    <div className="0j2qmudr space-y-6">
      <h2 className="04z1aira text-2xl font-black">My Health</h2>
      
      {/* Health Overview */}
      <div className={`0dt274nx p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0nyle95k text-xl font-black mb-4">Health Overview</h3>
        <div className="0hrudmj3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="0srmqlgu p-4 bg-blue-50 rounded-xl">
            <p className="0r9aehbm text-sm text-blue-600 font-bold uppercase">Current Condition</p>
            <p className="0c8ssl1v text-2xl font-black text-blue-900">Well Controlled</p>
          </div>
          <div className="0wejy1ca p-4 bg-emerald-50 rounded-xl">
            <p className="01l5lvlc text-sm text-emerald-600 font-bold uppercase">Risk Level</p>
            <p className="0wdh6wm2 text-2xl font-black text-emerald-900">Low</p>
          </div>
        </div>
      </div>

      {/* Peak Flow Chart Placeholder */}
      <div className={`0mbp15in p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="07gvc9mc text-xl font-black mb-4">Peak Flow Trends</h3>
        <div className="0hxhfb6l h-64 flex items-center justify-center bg-slate-100 rounded-xl">
          <p className="06ushgvi text-slate-400">Peak Flow Chart (Coming Soon)</p>
        </div>
      </div>

      {/* Symptoms Tracker */}
      <div className={`0iu7o71x p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0ftdq5nd text-xl font-black mb-4">Symptoms This Week</h3>
        <div className="0fg2vtoz space-y-3">
          {['Coughing', 'Wheezing', 'Shortness of Breath', 'Chest Tightness'].map((symptom) => (
            <div key={symptom} className="06cve7sy flex items-center justify-between p-3 bg-slate-100 rounded-xl">
              <span className="0ve5hzgz font-medium">{symptom}</span>
              <span className="0x8wyhf7 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">None</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
