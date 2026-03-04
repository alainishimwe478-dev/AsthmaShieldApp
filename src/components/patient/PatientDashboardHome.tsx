import React, { useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import TemperatureAlertCard from "./TemperatureAlertCard";
import PatientOverviewCard from "./PatientOverviewCard";
import TemperatureGauge from "./TemperatureGauge";
import PeakFlowChart from "./PeakFlowChart";
import ActionPlanCard from "./ActionPlanCard";
import HistoricalDataCard from "./HistoricalDataCard";
import NotificationToast from "./NotificationToast";
import { getHottestAndColdest, getTemperatureHistory, getTemperatureRisk, TemperatureRecord } from "../../lib/temperatureUtils";
import { rwandaHospitals } from "../../lib/rwandaHospitals";
import { recommendHospital, HospitalRecommendation } from "../../lib/hospitalAI";
import EnvironmentalMap from "./EnvironmentalMap";

interface PatientDashboardHomeProps {
}

interface User {
  province?: string;
  name?: string;
}

interface OutletContext {
  darkMode?: boolean;
  user?: User;
}

const PatientDashboardHome: React.FC<PatientDashboardHomeProps> = () => {
  const context = useOutletContext<OutletContext | null>();
  const [history, setHistory] = useState<TemperatureRecord[]>([]);
  const [hottest, setHottest] = useState<TemperatureRecord | null>(null);
  const [coldest, setColdest] = useState<TemperatureRecord | null>(null);
  const [_currentTempRisk, setCurrentTempRisk] = useState<{ level: string; message: string; color: string } | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<HospitalRecommendation | null>(null);

  const patientProvince = context?.user?.province ?? "Kigali";

  const nearbyHospitals = useMemo(() => {
    return rwandaHospitals.filter(
      (hospital) => hospital.province === patientProvince
    );
  }, [patientProvince]);

  const hospitalsForAI = useMemo(() => {
    return nearbyHospitals.length > 0 ? nearbyHospitals : rwandaHospitals;
  }, [nearbyHospitals]);

  useEffect(() => {
    const storedHistory = getTemperatureHistory();
    setHistory(storedHistory);

    const { hottest: hot, coldest: cold } = getHottestAndColdest(storedHistory);
    setHottest(hot);
    setColdest(cold);

    if (storedHistory.length > 0) {
      const latestTemp = storedHistory[storedHistory.length - 1].temperature;
      const tempRisk = getTemperatureRisk(latestTemp);
      setCurrentTempRisk(tempRisk);
      const aiRecommendation = recommendHospital(hospitalsForAI, tempRisk);
      setRecommendation(aiRecommendation);
    }

    const timer = setTimeout(() => {
      setNotifications([
        "⚠️ High temperature risk detected in your area!",
        "📅 Don't forget to take your medication at 2:00 PM"
      ]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hospitalsForAI]);

  const _darkMode = context?.darkMode ?? false;
  const currentTemp = history.length > 0 ? history[history.length - 1].temperature : 32;

  return (
    <div className="0ak1p5xu patient-dashboard space-y-6 p-4">
      <PatientOverviewCard />

      {notifications.map((notification: string, idx: number) => (
        <NotificationToast 
          key={idx} 
          message={notification} 
          type={notification.includes("⚠️") ? "warning" : "info"} 
        />
      ))}

      <div className="02c33zw0 charts-grid grid md:grid-cols-2 gap-6">
        <TemperatureGauge temperature={currentTemp} />
        <PeakFlowChart />
      </div>

      <EnvironmentalMap />

      {/* Nearby Hospitals Card */}
      <div className="0uz36mi6 hospitals-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h3 className="01dvhhnw hospital-title text-lg font-semibold mb-4 dark:text-white">
          Nearby Hospitals in {patientProvince}
        </h3>

        {nearbyHospitals.length > 0 ? (
          <div className="09ojol6p hospital-list space-y-3">
            {nearbyHospitals.map((hospital, index) => (
              <div
                key={index}
                className="0ceg1bhk hospital-item p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <p className="0e4ll4du hospital-name font-bold dark:text-white">{hospital.name}</p>
                <p className="0qmjbtjx hospital-details text-sm text-gray-600 dark:text-gray-300">
                  District: {hospital.district} • Level: {hospital.level}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="0by4xkkh all-hospitals space-y-3 mt-3">
            {rwandaHospitals.map((hospital, index) => (
              <div
                key={index}
                className="02q1u22n hospital-item p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <p className="0bmhhbx2 hospital-name font-bold dark:text-white">{hospital.name}</p>
                <p className="0bvd17eo hospital-details text-sm text-gray-600 dark:text-gray-300">
                  District: {hospital.district}, Province: {hospital.province} • Level: {hospital.level}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🤖 AI Recommendation Card */}
      {recommendation?.hospital && (
        <div className="06g2beeb ai-recommendation bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">
          <h3 className="0ye1lp6h ai-title text-xl font-bold mb-2 flex items-center gap-2">
            🤖 AI Recommended Hospital
          </h3>

          <div className="0vcpo9zr ai-content space-y-2">
            <h4 className="0dq50ijo ai-hospital-name text-lg font-semibold">
              {recommendation.hospital.name}
            </h4>
            
            <p className="0t6ugoif ai-location text-sm opacity-90">
              📍 {recommendation.hospital.district}, {recommendation.hospital.province}
            </p>
            
            <p className="0a3lswe3 ai-level text-sm opacity-90">
              🏥 Level: {recommendation.hospital.level}
            </p>

            <p className="0ab88kct ai-reason text-sm opacity-90 mt-2">
              {recommendation.reason}
            </p>

            <a
              href={`tel:${recommendation.hospital.phone}`}
              className="0ks0k3px call-btn inline-block mt-3 bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              📞 Call Hospital
            </a>
          </div>
        </div>
      )}

      <div className="0z9n20ub action-cards grid md:grid-cols-2 gap-6">
        <ActionPlanCard />
        <HistoricalDataCard />
      </div>

      <div>
        <h3 className="00x6tfm3 temp-history-title text-lg font-semibold mb-4 dark:text-white">Temperature History (Last 7 Days)</h3>
        <TemperatureAlertCard hottest={hottest} coldest={coldest} />
      </div>

      {history.length > 0 && (
        <div className="0kpaj41h daily-records bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="0m3jb5gh records-title text-lg font-semibold mb-4 dark:text-white">Daily Temperature Records</h3>
          <div className="0ftauzuk records-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.slice().reverse().map((record: TemperatureRecord, index: number) => {
              const risk = getTemperatureRisk(record.temperature);
              return (
                <div key={index} className={`0teza9b1 record-card p-4 rounded-lg border-l-4 ${
                  risk.color === 'red' ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' :
                  risk.color === 'orange' ? 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                  risk.color === 'green' ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' :
                  risk.color === 'blue' ? 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  'border-l-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                }`}>
                  <p className="0074nxuh record-date font-semibold dark:text-white">{record.date}</p>
                  <p className="0bafs8z6 record-temp text-2xl font-bold">{record.temperature}°C</p>
                  <p className={`0dnuiiqn record-risk text-sm ${
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
