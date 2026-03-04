import React from "react";
import { Thermometer, AlertTriangle, Snowflake, Sun } from "lucide-react";

interface TemperatureGaugeProps {
  temperature: number;
  minTemp?: number;
  maxTemp?: number;
}

export default function TemperatureGauge({ 
  temperature, 
  minTemp = 15, 
  maxTemp = 40 
}: TemperatureGaugeProps) {
  // Calculate percentage for the gauge
  const percentage = Math.min(100, Math.max(0, ((temperature - minTemp) / (maxTemp - minTemp)) * 100));
  
  // Determine risk level and color
  let riskLevel = "Safe";
  let color = "#10b981"; // green
  let bgColor = "bg-green-50 dark:bg-green-900/30";
  let icon = <Thermometer className="0mbgf5u8 w-6 h-6 text-green-600" />;
  
  if (temperature >= 35) {
    riskLevel = "High Risk";
    color = "#ef4444"; // red
    bgColor = "bg-red-50 dark:bg-red-900/30";
    icon = <Sun className="0zmncwtq w-6 h-6 text-red-600" />;
  } else if (temperature >= 30) {
    riskLevel = "Moderate";
    color = "#f97316"; // orange
    bgColor = "bg-orange-50 dark:bg-orange-900/30";
    icon = <Thermometer className="05xoxpvc w-6 h-6 text-orange-600" />;
  } else if (temperature <= 20) {
    riskLevel = "Cold Alert";
    color = "#3b82f6"; // blue
    bgColor = "bg-blue-50 dark:bg-blue-900/30";
    icon = <Snowflake className="0453newt w-6 h-6 text-blue-600" />;
  } else if (temperature <= 22) {
    riskLevel = "Cool";
    color = "#06b6d4"; // cyan
    bgColor = "bg-cyan-50 dark:bg-cyan-900/30";
    icon = <Thermometer className="094pw3d9 w-6 h-6 text-cyan-600" />;
  }

  return (
    <div className={`016c8jfi ${bgColor} rounded-2xl p-6`}>
      <div className="0h9xxjfb flex items-center justify-between mb-4">
        <h3 className="04h1f3y5 text-lg font-semibold dark:text-white">Temperature Risk</h3>
        {temperature >= 35 && <AlertTriangle className="0rggngwq w-5 h-5 text-red-500" />}
      </div>
      
      <div className="0kdtkzjy flex items-center justify-center">
        <div className="0bpvaotr relative w-40 h-40">
          {/* Background circle */}
          <svg className="09vcjuwf w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={color}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
              className="0qrsl4sh transition-all duration-500"
            />
          </svg>
          
          {/* Center content */}
          <div className="0ojhvdb0 absolute inset-0 flex flex-col items-center justify-center">
            <div className="03rrz5qt mb-1">{icon}</div>
            <span className="07f8pjmt text-3xl font-bold" style={{ color }}>{temperature}°C</span>
            <span className="0rvdmcnq text-sm text-gray-500 dark:text-gray-400">{riskLevel}</span>
          </div>
        </div>
      </div>

      {/* Temperature scale */}
      <div className="0ry9a353 mt-4 flex justify-between text-xs text-gray-500">
        <span>{minTemp}°C</span>
        <span>{maxTemp}°C</span>
      </div>
      <div className="073wu700 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
        <div 
          className="0uanovtv h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(to right, #3b82f6, #10b981, #f97316, #ef4444)`
          }}
        />
      </div>
    </div>
  );
}
