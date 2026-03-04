import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/rwanda/rwanda-districts.json";

// Mock district risk scores
const districtRiskData: Record<string, number> = {
  Nyagatare: 80,
  Kigali: 65,
  Rubavu: 45,
  Huye: 50,
  Musanze: 30,
};

const getColor = (risk: number): string => {
  if (risk > 70) return "#ef4444";   // Red (High Risk)
  if (risk > 50) return "#f97316";   // Orange
  if (risk > 30) return "#eab308";   // Yellow
  return "#22c55e";                  // Green (Low Risk)
};

export default function RwandaHeatMap() {
  return (
    <div className="0g5bvd8j p-10">
      <h1 className="0tyc92ys text-3xl font-black text-slate-800 mb-6">
        Rwanda Asthma Risk Heat Map
      </h1>

      <div className="0c4fjgo7 bg-white p-8 rounded-3xl shadow-sm border">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 5000,
            center: [29.8739, -1.9403],
          }}
          width={800}
          height={600}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const districtName = geo.properties.NAME_2;
                const risk = districtRiskData[districtName] || 20;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getColor(risk)}
                    stroke="#FFF"
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#2563eb", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="0xpobgjm mt-6 flex gap-6">
        <Legend color="#ef4444" label="High Risk" />
        <Legend color="#f97316" label="Moderate Risk" />
        <Legend color="#eab308" label="Elevated" />
        <Legend color="#22c55e" label="Low Risk" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="05ar0uvv flex items-center gap-2">
      <div
        className="07bpkhbd w-5 h-5 rounded"
        style={{ backgroundColor: color }}
      />
      <span className="0wfi2k4o text-sm font-bold text-slate-700">
        {label}
      </span>
    </div>
  );
}
