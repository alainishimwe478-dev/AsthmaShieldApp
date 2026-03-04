import { Hospital } from "./rwandaHospitals";

interface Risk {
  level: string;
  color: string;
  message?: string;
}

export interface HospitalRecommendation {
  hospital: Hospital | undefined;
  reason: string;
}

/**
 * AI-powered hospital recommendation system for AsthmaShield Rwanda
 * Analyzes temperature risk and recommends appropriate hospital level
 * 
 * @param hospitals - Array of available hospitals
 * @param risk - Current temperature risk assessment
 * @returns Recommended hospital with explanation
 */
export function recommendHospital(
  hospitals: Hospital[],
  risk: Risk | null
): HospitalRecommendation | null {
  if (!risk) return null;

  let requiredLevel: "Referral" | "Provincial" | "District";

  // 🔥 AI Decision Logic based on risk color
  if (risk.color === "red") {
    requiredLevel = "Referral";
  } else if (risk.color === "orange") {
    requiredLevel = "Provincial";
  } else {
    // green, blue, indigo - all mild cases go to District
    requiredLevel = "District";
  }

  // Find a hospital matching the required level
  const recommended = hospitals.find(
    (hospital) => hospital.level === requiredLevel
  );

  // Generate contextual reason message
  let reason: string;
  if (risk.color === "red") {
    reason = "🔴 Severe asthma risk detected. Referral hospital required for advanced emergency care and specialized treatment.";
  } else if (risk.color === "orange") {
    reason = "🟠 Moderate asthma risk. Provincial hospital recommended for specialized care and monitoring.";
  } else if (risk.color === "green") {
    reason = "🟢 Normal conditions. District hospital is sufficient for routine checkups and mild symptoms.";
  } else if (risk.color === "blue") {
    reason = "🔵 Cool weather conditions. District hospital recommended for preventive care.";
  } else {
    reason = "🟣 Cold weather alert. District hospital recommended for cold-induced asthma management.";
  }

  return {
    hospital: recommended,
    reason,
  };
}

/**
 * Get all hospitals filtered by level
 * Useful for displaying hospitals by category
 */
export function getHospitalsByLevel(
  hospitals: Hospital[],
  level: "Referral" | "Provincial" | "District"
): Hospital[] {
  return hospitals.filter((hospital) => hospital.level === level);
}
