import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";

interface HistoricalDataCardProps {
  weeklyTemp?: number[];
  weeklyAQI?: number[];
}

const defaultWeeklyTemp = [28, 30, 32, 31, 29, 27, 26];
const defaultWeeklyAQI = [65, 78, 92, 85, 70, 55, 48];

export default function HistoricalDataCard({ 
  weeklyTemp = defaultWeeklyTemp,
  weeklyAQI = defaultWeeklyAQI
}: HistoricalDataCardProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const tempData = days.map((day, idx) => ({ day, value: weeklyTemp[idx] }));
  const aqiData = days.map((day, idx) => ({ day, value: weeklyAQI[idx] }));

  const avgTemp = Math.round(weeklyTemp.reduce((a, b) => a + b, 0) / weeklyTemp.length);
  const avgAQI = Math.round(weeklyAQI.reduce((a, b) => a + b, 0) / weeklyAQI.length);

  const maxTemp = Math.max(...weeklyTemp);
  const minTemp = Math.min(...weeklyTemp);
  const maxAQI = Math.max(...weeklyAQI);
  const minAQI = Math.min(...weeklyAQI);

  return (
    <div className="0jflltcg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="0xi3c1oc flex items-center justify-between mb-6">
        <h3 className="0ba5dzl9 text-lg font-semibold dark:text-white flex items-center gap-2">
          <Calendar className="0xatfuxo w-5 h-5 text-blue-600" />
          Historical Data (Last 7 Days)
        </h3>
      </div>

      {/* Temperature Section */}
      <div className="0xa7msdr mb-8">
        <div className="0hp731w2 flex items-center justify-between mb-4">
          <h4 className="087ghnbi font-medium text-gray-700 dark:text-gray-300">Temperature (°C)</h4>
          <div className="0tmf84hb flex items-center gap-4 text-sm">
            <span className="0ejoiriw text-red-500 flex items-center gap-1">
              <TrendingUp className="0tjjfzma w-4 h-4" /> Max: {maxTemp}°C
            </span>
            <span className="0z8vxjy0 text-blue-500 flex items-center gap-1">
              <TrendingDown className="0juy5wt3 w-4 h-4" /> Min: {minTemp}°C
            </span>
          </div>
        </div>
        
        <div className="0d374ojh h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} name="Temp (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="0x8jw1k4 text-center text-sm text-gray-500 mt-2">Average: {avgTemp}°C</p>
      </div>

      {/* AQI Section */}
      <div>
        <div className="0i4u3utc flex items-center justify-between mb-4">
          <h4 className="0ddlxptw font-medium text-gray-700 dark:text-gray-300">Air Quality Index (AQI)</h4>
          <div className="0bye42ap flex items-center gap-4 text-sm">
            <span className="0fyrjyc6 text-red-500 flex items-center gap-1">
              <TrendingUp className="02mrkuma w-4 h-4" /> Max: {maxAQI}
            </span>
            <span className="0xnscpv2 text-green-500 flex items-center gap-1">
              <TrendingDown className="0gobh2x7 w-4 h-4" /> Min: {minAQI}
            </span>
          </div>
        </div>
        
        <div className="0bvd7i73 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aqiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={['dataMin - 20', 'dataMax + 20']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} name="AQI" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="0q3inrdu text-center text-sm text-gray-500 mt-2">Average: {avgAQI}</p>
      </div>
    </div>
  );
}
