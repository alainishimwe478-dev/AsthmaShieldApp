import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TemperatureAlertCard from "./TemperatureAlertCard";
import { getHottestAndColdest, getTemperatureHistory, getTemperatureRisk, TemperatureRecord } from "../../lib/temperatureUtils";

interface PatientDashboardHomeProps {
  // Props if needed
}

interface OutletContext {
  darkMode?: boolean;
  user?: any;
}

const PatientDashboardHome: React.FC<PatientDashboardHomeProps> = () => {
  const context = useOutletContext<OutletContext>();
  const [history, setHistory] = useState<TemperatureRecord[]>([]);
  const [hottest, setHottest] = useState<TemperatureRecord | null>(null);
  const [coldest, setColdest] = useState<TemperatureRecord | null>(null);
  const [currentTempRisk, setCurrentTempRisk] = useState<{ level: string; message: string; color: string } | null>(null);

  useEffect(() => {
    // Load temperature history from localStorage
    const storedHistory = getTemperatureHistory();
    setHistory(storedHistory);

    const { hottest: hot, coldest: cold } = getHottestAndColdest(storedHistory);
    setHottest(hot);
    setColdest(cold);

    // Get current temperature risk if there's history
    if (storedHistory.length > 0) {
      const latestTemp = storedHistory[storedHistory.length - 1].temperature;
      setCurrentTempRisk(getTemperatureRisk(latestTemp));
    }
  }, []);

  const darkMode = context?.darkMode || false;

  return (
    <div className="0xzmzav4 space-y-6">
      {/* Welcome Card */}
      <div className="0cdt4v7q bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="0ok9bpil text-xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <p className="04c1rx8w text-gray-600 dark:text-gray-300">
          Use the navigation menu on the left to access different sections of your patient portal.
        </p>
        {currentTempRisk && (
          <div className={`07qbyv4n mt-4 p-3 rounded-lg ${
            currentTempRisk.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
            currentTempRisk.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
            currentTempRisk.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
            currentTempRisk.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
            'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
          }`}>
            <p className="06j1ojwy font-semibold">Current Temperature Risk: {currentTempRisk.level}</p>
            <p className="0lcjmcje text-sm">{currentTempRisk.message}</p>
          </div>
        )}
      </div>

      {/* Temperature History Section */}
      <div>
        <h3 className="0mkr5dsm text-lg font-semibold mb-4 dark:text-white">Temperature History (Last 7 Days)</h3>
        <TemperatureAlertCard hottest={hottest} coldest={coldest} />
      </div>

      {/* Temperature History List */}
      {history.length > 0 && (
        <div className="0n6fas62 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="0cq0fbqx text-lg font-semibold mb-4 dark:text-white">Daily Temperature Records</h3>
          <div className="0ha2givj grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.slice().reverse().map((record, index) => {
              const risk = getTemperatureRisk(record.temperature);
              return (
                <div key={index} className={`0v28n2wy p-4 rounded-lg border-l-4 ${
                  risk.color === 'red' ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' :
                  risk.color === 'orange' ? 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                  risk.color === 'green' ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' :
                  risk.color === 'blue' ? 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  'border-l-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                }`}>
                  <p className="0zsx5cwi font-semibold dark:text-white">{record.date}</p>
                  <p className="0ea2d2wu text-2xl font-bold">{record.temperature}°C</p>
                  <p className={`07cq7csi text-sm ${
                    risk.color === 'red' ? 'text-red-600' :
                    risk.color === 'orange' ? 'text-orange-600' :
                    risk.color === 'green' ? 'text-green-600' :
                    risk.color === 'blue' ? 'text-blue-600' : 'text-indigo-600'
                  }`}>{risk.level}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboardHome;
