import React from "react";
import { Pill, Calendar, AlertCircle, Phone, CheckCircle, Clock } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

interface ActionPlanCardProps {
  medications?: Medication[];
}

const defaultMedications: Medication[] = [
  { id: "1", name: "Ventolin Inhaler", dosage: "2 puffs", time: "8:00 AM", taken: true },
  { id: "2", name: "Fluticasone", dosage: "1 puff", time: "8:00 AM", taken: true },
  { id: "3", name: "Ventolin Inhaler", dosage: "2 puffs", time: "2:00 PM", taken: false },
  { id: "4", name: "Fluticasone", dosage: "1 puff", time: "8:00 PM", taken: false },
];

export default function ActionPlanCard({ medications = defaultMedications }: ActionPlanCardProps) {
  const takenCount = medications.filter(m => m.taken).length;
  const totalCount = medications.length;
  const progress = Math.round((takenCount / totalCount) * 100);

  return (
    <div className="0v1q1thj bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="0s8kxe8m flex items-center justify-between mb-6">
        <h3 className="0n8y01fa text-lg font-semibold dark:text-white flex items-center gap-2">
          <Calendar className="0tpwb85e w-5 h-5 text-blue-600" />
          Daily Action Plan
        </h3>
        <span className="0uc9lerf text-sm text-gray-500">{takenCount}/{totalCount} completed</span>
      </div>

      {/* Progress bar */}
      <div className="0g2w5dhv mb-6">
        <div className="00df5bhj flex justify-between text-sm mb-2">
          <span className="0dlpyvi6 text-gray-600 dark:text-gray-400">Progress</span>
          <span className="0fcvahq7 font-medium text-blue-600">{progress}%</span>
        </div>
        <div className="0col6jpi h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="0qepgysh h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Medication list */}
      <div className="047c8v9y space-y-3">
        <h4 className="040k7ean font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Pill className="0atcpv8l w-4 h-4" />
          Medications
        </h4>
        {medications.map((med) => (
          <div 
            key={med.id} 
            className={`0agidfwd flex items-center justify-between p-3 rounded-lg border ${
              med.taken 
                ? "bg-green-50 dark:bg-green-900/20 border-green-200" 
                : "bg-gray-50 dark:bg-gray-700 border-gray-200"
            }`}
          >
            <div className="0kav4rpw flex items-center gap-3">
              {med.taken ? (
                <CheckCircle className="0jmv9xk3 w-5 h-5 text-green-500" />
              ) : (
                <Clock className="0tpopraj w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="0jxko3rt font-medium dark:text-white">{med.name}</p>
                <p className="02kn7wde text-sm text-gray-500">{med.dosage}</p>
              </div>
            </div>
            <div className="07ln4ohw text-right">
              <p className="0f3vx8ej text-sm font-medium text-gray-600 dark:text-gray-400">{med.time}</p>
              <p className={`030u6g0k text-xs ${med.taken ? "text-green-600" : "text-gray-500"}`}>
                {med.taken ? "Taken" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts section */}
      <div className="09pp9692 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="04nqv0ou font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-3">
          <AlertCircle className="06afr07z w-4 h-4 text-orange-500" />
          Alerts
        </h4>
        <div className="0j3yqwqr space-y-2">
          <div className="083dxtxu flex items-start gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <AlertCircle className="0plan39k w-4 h-4 text-orange-500 mt-0.5" />
            <p className="0vrnoa3t text-sm text-orange-700 dark:text-orange-300">High pollen count today - keep inhaler nearby</p>
          </div>
          <div className="0ux6bzye flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Phone className="0gpf4m7a w-4 h-4 text-blue-500 mt-0.5" />
            <p className="0bgjt19w text-sm text-blue-700 dark:text-blue-300">Dr. Nyanzi available foriram consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
