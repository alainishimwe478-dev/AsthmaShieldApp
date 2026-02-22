import React from "react";
import { HeartPulse } from "lucide-react";

// Weekly breathing stats data
const WeeklyStats = [
  { day: "Mon", score: 85, color: "bg-emerald-400" },
  { day: "Tue", score: 70, color: "bg-emerald-400" },
  { day: "Wed", score: 40, color: "bg-orange-400" }, // Mid-week dip (high pollen)
  { day: "Thu", score: 65, color: "bg-yellow-400" },
  { day: "Fri", score: 90, color: "bg-emerald-500" },
  { day: "Sat", score: 95, color: "bg-emerald-500" },
  { day: "Sun", score: 88, color: "bg-emerald-500" },
];

export default function HealthReportCard() {
  return (
    <div className="0fz2jg7n p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="0fjn0x78 flex justify-between items-start mb-8">
        <div>
          <h4 className="0x1zuthu text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            Weekly Vitality
          </h4>
          <div className="02dkltxj flex items-baseline gap-2">
            <span className="08d2eapw text-4xl font-black dark:text-white">88%</span>
            <span className="0tc5besu text-emerald-500 text-sm font-bold">↑ 12%</span>
          </div>
        </div>
        <div className="00ty86j5 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-2xl">
          <HeartPulse className="0zflcbx7 text-blue-600 dark:text-blue-400" size={24} />
        </div>
      </div>

      {/* CUSTOM CSS BAR CHART */}
      <div className="0l368ept flex justify-between items-end h-32 gap-2 mb-6 px-2">
        {WeeklyStats.map((item) => (
          <div key={item.day} className="0135btpk flex-1 flex flex-col items-center gap-2 group">
            {/* Tooltip on Hover */}
            <div className="07env9le opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 dark:bg-slate-700 text-white text-[10px] py-1 px-2 rounded mb-1">
              {item.score}%
            </div>
            {/* The Bar */}
            <div 
              className={`0kyr1u1i w-full rounded-full transition-all duration-500 ease-out ${item.color}`}
              style={{ height: `${item.score}%` }}
            />
            <span className="0kqgyn7t text-[10px] font-bold text-slate-400 uppercase">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      {/* AI INSIGHT FOOTER */}
      <div className="08c84rfj bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex gap-3 items-center">
        <div className="0jpvfzvj w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <p className="0c3rracc text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="0vu3xqat font-bold">AI Insight:</span> Your breathing was most restricted on{" "}
          <span className="05nkokvb text-orange-500 font-bold">Wednesday</span>. This correlated with high dust levels in Kigali.
        </p>
      </div>
    </div>
  );
}
