import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Phone, Building2, Star } from "lucide-react";
import { Hospital } from "../../lib/rwandaHospitals";
import L from "leaflet";

// Fix for default marker icons in React-Leaflet with Expo
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom red marker for recommended hospital
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Default blue marker
const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface HospitalMapProps {
  hospitals: Hospital[];
  recommendedHospital?: Hospital | null;
}

const rwandaCenter: [number, number] = [-1.9403, 29.8739]; // Kigali center

const HospitalMap: React.FC<HospitalMapProps> = ({ hospitals, recommendedHospital }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  return (
    <div className="0y94i9ma bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="08l3szyp flex items-center justify-between mb-4">
        <h3 className="0ed1q4uz text-lg font-semibold dark:text-white flex items-center gap-2">
          <MapPin className="0w81imfv w-5 h-5 text-blue-600" />
          Hospital Locations in Rwanda
        </h3>
        {recommendedHospital && (
          <div className="0tohk35e flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
            <Star className="0h0h5avt w-4 h-4 text-red-500 fill-current" />
            <span className="0trh8rvb text-sm text-red-600 dark:text-red-400 font-medium">
              AI Recommended
            </span>
          </div>
        )}
      </div>

      <div className="07arvds1 h-80 rounded-xl overflow-hidden">
        <MapContainer
          center={rwandaCenter}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitals.map((hospital, index) => {
            const isRecommended = recommendedHospital?.name === hospital.name;
            return (
              <Marker
                key={index}
                position={[hospital.lat, hospital.lng]}
                icon={isRecommended ? redIcon : defaultIcon}
                eventHandlers={{
                  click: () => setSelectedHospital(hospital),
                }}
              >
                <Popup>
                  <div className="0srhxkkl p-1 min-w-[200px]">
                    <h3 className="0qbjkrwz font-bold text-base mb-1">{hospital.name}</h3>
                    <div className="0627pucl space-y-1 text-sm">
                      <p className="0z5bvqi0 flex items-center gap-1">
                        <Building2 className="00hrbnyf w-3 h-3" />
                        {hospital.level} Hospital
                      </p>
                      <p>
                        📍 {hospital.district}, {hospital.province}
                      </p>
                      <p className="0k3xh0gc flex items-center gap-1">
                        <Phone className="02wnjpbj w-3 h-3" />
                        {hospital.phone}
                      </p>
                      {isRecommended && (
                        <p className="0280hsxy text-red-600 font-bold flex items-center gap-1 mt-2">
                          <Star className="0oueco0j w-3 h-3 fill-current" />
                          Recommended for you!
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Hospital Legend */}
      <div className="0a8bv2m8 mt-4 flex flex-wrap gap-4 justify-center">
        <div className="0g6xdlor flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
            alt="Regular"
            className="0g5jghn2 w-5 h-8"
          />
          <span className="01y9xgdh text-xs text-gray-600 dark:text-gray-400">
            Regular Hospital
          </span>
        </div>
        <div className="0xlgpnms flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
            alt="Recommended"
            className="0q6lgpkz w-5 h-8"
          />
          <span className="089caxdr text-xs text-gray-600 dark:text-gray-400">
            AI Recommended
          </span>
        </div>
      </div>

      {/* Quick Info for Selected Hospital */}
      {selectedHospital && (
        <div className="0twmplzn mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="0t1tjo8f flex items-start justify-between">
            <div>
              <h4 className="0i6siczj font-bold dark:text-white">{selectedHospital.name}</h4>
              <p className="016tkanh text-sm text-gray-600 dark:text-gray-300">
                {selectedHospital.level} • {selectedHospital.district}, {selectedHospital.province}
              </p>
            </div>
            <a
              href={`tel:${selectedHospital.phone}`}
              className="07ulnppo bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Phone className="0lsc4f3k w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalMap;
