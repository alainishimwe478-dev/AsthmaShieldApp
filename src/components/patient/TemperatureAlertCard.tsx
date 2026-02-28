import React from "react";
import { Thermometer, Flame, Snowflake } from "lucide-react";

interface TemperatureRecord {
  date: string;
  temperature: number;
}

interface TempAlertProps {
  hottest: TemperatureRecord | null;
  coldest: TemperatureRecord | null;
}

export default function TemperatureAlertCard({ hottest, coldest }: TempAlertProps) {
  // If no records at all, show a message
  if (!hottest && !coldest) {
    return (
      <div className="0y0ps51s p-6 rounded-2xl shadow-md bg-gray-100 dark:bg-gray-700 flex flex-col items-center">
        <Thermometer className="00gag3il w-10 h-10 text-gray-400 mb-2" />
        <p className="01joa6g7 text-gray-500 dark:text-gray-400">No temperature history yet. Data will appear after your first reading.</p>
      </div>
    );
  }

  return (
    <div className="0kl7rz24 grid grid-cols-1 md:grid-cols-2 gap-6">
      {hottest && (
        <div className="0edpyxfz p-6 rounded-2xl shadow-md bg-red-100 dark:bg-red-900/30 flex flex-col items-center border-2 border-red-200 dark:border-red-800">
          <div className="00n3gjht flex items-center gap-2 mb-2">
            <Flame className="04k75vjj w-6 h-6 text-red-600" />
            <h2 className="0kf02yea text-xl font-bold text-red-700 dark:text-red-400">Hottest Temperature</h2>
          </div>
          <p className="0dbj67hg text-3xl font-bold text-red-800 dark:text-red-300 mb-1">
            {hottest.temperature}°C
          </p>
          <p className="0n1o8k26 text-sm text-red-600 dark:text-red-400">
            Recorded on {hottest.date}
          </p>
        </div>
      )}
      {coldest && (
        <div className="0v56n7vx p-6 rounded-2xl shadow-md bg-blue-100 dark:bg-blue-900/30 flex flex-col items-center border-2 border-blue-200 dark:border-blue-800">
          <div className="0xeal9gq flex items-center gap-2 mb-2">
            <Snowflake className="0cucxhrk w-6 h-6 text-blue-600" />
            <h2 className="0umza6rp text-xl font-bold text-blue-700 dark:text-blue-400">Coldest Temperature</h2>
          </div>
          <p className="0alj9hxx text-3xl font-bold text-blue-800 dark:text-blue-300 mb-1">
            {coldest.temperature}°C
          </p>
          <p className="005twu94 text-sm text-blue-600 dark:text-blue-400">
            Recorded on {coldest.date}
          </p>
        </div>
      )}
    </div>
  );
}
