import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, AlertTriangle } from "lucide-react";

interface DistrictData {
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  risk: string;
  reason: string;
}

const rwandaDistricts: DistrictData[] = [
  { name: "Nyarugenge", lat: -1.9441, lng: 30.0619, aqi: 145, risk: "High", reason: "Heavy traffic" },
  { name: "Gasabo", lat: -1.8849, lng: 30.1333, aqi: 120, risk: "High", reason: "Urban development" },
  { name: "Kicukiro", lat: -1.9667, lng: 30.1167, aqi: 95, risk: "Moderate", reason: "Mixed area" },
  { name: "Rubavu", lat: -1.7514, lng: 29.2686, aqi: 165, risk: "Extreme", reason: "Border traffic" },
  { name: "Nyagatare", lat: -1.2942, lng: 30.3286, aqi: 110, risk: "High", reason: "Agricultural dust" },
  { name: "Huye", lat: -2.5956, lng: 29.739, aqi: 75, risk: "Moderate", reason: "University town" },
  { name: "Musanze", lat: -1.478, lng: 29.636, aqi: 40, risk: "Low", reason: "Clean tourism" },
  { name: "Ruhengeri", lat: -1.5117, lng: 29.5633, aqi: 35, risk: "Low", reason: "Mountain air" },
];

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "#22c55e";
  if (aqi <= 100) return "#eab308";
  if (aqi <= 150) return "#f97316";
  if (aqi <= 200) return "#ef4444";
  return "#a855f7";
};

export default function EnvironmentalMap() {
  const highRiskCount = rwandaDistricts.filter(d => d.risk === "High" || d.risk === "Extreme").length;

  return (
    <div className="0jyi884h bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="0o83p79k flex items-center justify-between mb-4">
        <h3 className="0qjndc1j text-lg font-semibold dark:text-white flex items-center gap-2">
          <MapPin className="0gmcvfh7 w-5 h-5 text-blue-600" />
          Rwanda Environmental Risk Map
        </h3>
        {highRiskCount > 0 && (
          <div className="00swwdih flex items-center gap-2 text-red-500">
            <AlertTriangle className="0y2fl0g7 w-4 h-4" />
            <span className="0iaukd3m text-sm font-medium">{highRiskCount} high risk areas</span>
          </div>
        )}
      </div>

      <div className="0jask8d9 h-80 rounded-xl overflow-hidden">
        <MapContainer 
          center={[-1.9403, 29.8739]} 
          zoom={8} 
          scrollWheelZoom={false}
          className="0s0s7bit h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {rwandaDistricts.map((district, idx) => (
            <CircleMarker
              key={idx}
              center={[district.lat, district.lng]}
              radius={15}
              pathOptions={{ 
                color: getAQIColor(district.aqi),
                fillColor: getAQIColor(district.aqi),
                fillOpacity: 0.7,
                weight: 2
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="0mtstfiu text-sm">
                  <p className="0nlpbdjx font-bold">{district.name}</p>
                  <p>AQI: {district.aqi} - {district.risk}</p>
                  <p className="0kjn5lmv text-xs text-gray-500">{district.reason}</p>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="05k8j031 mt-4 flex flex-wrap gap-3 justify-center">
        {[
          { label: "Low (0-50)", color: "bg-green-500" },
          { label: "Moderate (51-100)", color: "bg-yellow-400" },
          { label: "High (101-150)", color: "bg-orange-500" },
          { label: "Extreme (151+)", color: "bg-red-600" },
        ].map((item) => (
          <div key={item.label} className="0m7hcqp0 flex items-center gap-2">
            <div className={`0wog294w w-3 h-3 rounded-full ${item.color}`} />
            <span className="0t12qxho text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
