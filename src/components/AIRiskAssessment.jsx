import React, { useState, useEffect } from "react";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

export default function AIRiskAssessment({
  userId,
  environmentalData,
  onClose,
}) {
  const [riskScore, setRiskScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState("Low");
  const [factors, setFactors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load health profile
    const healthProfile = localStorage.getItem(`healthProfile_${userId}`);
    const profile = healthProfile ? JSON.parse(healthProfile) : null;

    // Calculate AI risk assessment
    setTimeout(() => {
      const assessment = calculateRiskAssessment(environmentalData, profile);
      setRiskScore(assessment.score);
      setRiskLevel(assessment.level);
      setFactors(assessment.factors);
      setRecommendations(assessment.recommendations);
      setLoading(false);
    }, 1000);
  }, [userId, environmentalData]);

  const calculateRiskAssessment = (envData, profile) => {
    let score = 0;
    const factorsList = [];
    const recs = [];

    // Environmental factors
    if (envData) {
      // AQI impact
      if (envData.airQualityIndex > 150) {
        score += 30;
        factorsList.push({
          factor: "Air Quality Index",
          impact: "negative",
          description: `AQI is ${envData.airQualityIndex} - Very Unhealthy`,
          score: 30,
        });
      } else if (envData.airQualityIndex > 100) {
        score += 20;
        factorsList.push({
          factor: "Air Quality Index",
          impact: "negative",
          description: `AQI is ${envData.airQualityIndex} - Unhealthy for Sensitive Groups`,
          score: 20,
        });
      } else if (envData.airQualityIndex > 50) {
        score += 10;
        factorsList.push({
          factor: "Air Quality Index",
          impact: "neutral",
          description: `AQI is ${envData.airQualityIndex} - Moderate`,
          score: 10,
        });
      } else {
        factorsList.push({
          factor: "Air Quality Index",
          impact: "positive",
          description: `AQI is ${envData.airQualityIndex} - Good`,
          score: 0,
        });
      }

      // Pollen impact
      if (
        envData.pollenLevel === "Very High" ||
        envData.pollenLevel === "High"
      ) {
        score += 25;
        factorsList.push({
          factor: "Pollen Level",
          impact: "negative",
          description: `Pollen level is ${envData.pollenLevel}`,
          score: 25,
        });
        recs.push("Keep windows closed and use air conditioning");
      } else if (envData.pollenLevel === "Moderate") {
        score += 10;
        factorsList.push({
          factor: "Pollen Level",
          impact: "neutral",
          description: `Pollen level is ${envData.pollenLevel}`,
          score: 10,
        });
      }

      // Humidity impact
      if (envData.humidity < 30 || envData.humidity > 60) {
        score += 15;
        factorsList.push({
          factor: "Humidity",
          impact: "negative",
          description: `Humidity is ${envData.humidity}% - Outside optimal range (30-60%)`,
          score: 15,
        });
        recs.push(
          "Use a humidifier or dehumidifier to maintain optimal humidity",
        );
      }

      // Temperature impact
      if (envData.temperature < 10 || envData.temperature > 30) {
        score += 10;
        factorsList.push({
          factor: "Temperature",
          impact: "negative",
          description: `Temperature is ${envData.temperature}°C - May trigger symptoms`,
          score: 10,
        });
        recs.push("Protect airways from extreme temperatures");
      }
    }

    // Health profile factors
    if (profile) {
      // Asthma severity
      if (profile.asthmaSeverity === "Severe") {
        score += 20;
        factorsList.push({
          factor: "Asthma Severity",
          impact: "negative",
          description: "You have severe asthma - higher risk of complications",
          score: 20,
        });
      } else if (profile.asthmaSeverity === "Moderate") {
        score += 10;
        factorsList.push({
          factor: "Asthma Severity",
          impact: "negative",
          description: "You have moderate asthma",
          score: 10,
        });
      }

      // Trigger exposure
      if (profile.triggers && profile.triggers.length > 0) {
        const triggerMatches = [];
        if (envData) {
          if (
            profile.triggers.includes("Pollen") &&
            (envData.pollenLevel === "High" ||
              envData.pollenLevel === "Very High")
          ) {
            triggerMatches.push("Pollen");
          }
          if (
            profile.triggers.includes("Air Pollution") &&
            envData.airQualityIndex > 100
          ) {
            triggerMatches.push("Air Pollution");
          }
          if (
            profile.triggers.includes("Cold Air") &&
            envData.temperature < 15
          ) {
            triggerMatches.push("Cold Air");
          }
        }

        if (triggerMatches.length > 0) {
          score += 15;
          factorsList.push({
            factor: "Trigger Exposure",
            impact: "negative",
            description: `Your triggers (${triggerMatches.join(", ")}) are currently active`,
            score: 15,
          });
          recs.push(
            "Your known triggers are currently present - keep rescue inhaler handy",
          );
        }
      }

      // Medication adherence (simulated)
      if (
        profile.controllerMedications &&
        profile.controllerMedications.length > 0
      ) {
        factorsList.push({
          factor: "Medication Status",
          impact: "positive",
          description: "You have controller medications - continue regular use",
          score: -5,
        });
        recs.push("Take your controller medication as prescribed");
      }
    }

    // Cap score at 100
    score = Math.min(score, 100);

    // Determine risk level
    let level = "Low";
    if (score >= 75) level = "Severe";
    else if (score >= 50) level = "High";
    else if (score >= 25) level = "Moderate";

    // Add general recommendations
    if (recs.length < 3) {
      recs.push("Monitor your peak flow regularly");
      recs.push("Keep your rescue inhaler with you at all times");
    }
    if (score < 25) {
      recs.push("Great job managing your asthma! Maintain current practices");
    }

    return {
      score,
      level,
      factors: factorsList,
      recommendations: recs.slice(0, 5),
    };
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "Severe":
        return "text-red-600 bg-red-50";
      case "High":
        return "text-orange-600 bg-orange-50";
      case "Moderate":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-green-600 bg-green-50";
    }
  };

  const getRiskGlow = (level) => {
    switch (level) {
      case "Severe":
        return "shadow-red-500/30";
      case "High":
        return "shadow-orange-500/30";
      case "Moderate":
        return "shadow-yellow-500/30";
      default:
        return "shadow-green-500/30";
    }
  };

  if (loading) {
    return (
      <div className="0zno8eq3 ai-risk-container bg-white rounded-[3rem] p-8 shadow-xl max-w-4xl mx-auto">
        <div className="02bicdc4 ai-loading flex flex-col items-center justify-center py-12">
          <div className="0rvfhu14 risk-spinner w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="04m2jfaj ai-loading-text text-slate-600 font-semibold">
            Analyzing your risk factors...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="0mg1kw9t ai-risk-container bg-white rounded-[3rem] p-8 shadow-xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="083en3yu ai-header flex justify-between items-start mb-8">
        <div className="0sb8dsry ai-title-section">
          <div className="0lbrjgig ai-icon-badge flex items-center gap-3 mb-2">
            <div className="0d2f4282 ai-icon w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Brain className="0srbpovc w-6 h-6 text-blue-600" />
            </div>
            <span className="0jlley9g ai-badge-text text-xs font-black text-blue-600 uppercase tracking-wider">
              AI Powered
            </span>
          </div>
          <h2 className="0lktd43z ai-title text-3xl font-black text-slate-900 uppercase tracking-tight">
            Risk Assessment
          </h2>
          <p className="0wzj212t ai-subtitle text-slate-500 mt-1">
            Personalized analysis based on your profile and environmental
            conditions
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="0pnlbbwi ai-close p-2 hover:bg-slate-100 rounded-xl transition"
          >
            <XCircle className="0qdqe2kc w-6 h-6 text-slate-400" />
          </button>
        )}
      </div>

      {/* Risk Score Circle */}
      <div className="05uxlm1k ai-score-section flex flex-col items-center mb-8">
        <div
          className={`0hq26q0f ai-score-circle relative w-40 h-40 rounded-full flex items-center justify-center ${getRiskColor(riskLevel)} shadow-lg ${getRiskGlow(riskLevel)}`}
        >
          <div className="0cgfp3j7 ai-score-inner text-center">
            <span className="0aqlwrjr ai-score-number text-5xl font-black">
              {riskScore}
            </span>
            <span className="00rwvlep ai-score-label block text-xs font-bold uppercase tracking-wider mt-1">
              Risk Score
            </span>
          </div>
          {/* Ring indicator */}
          <svg
            className="090rmn9p ai-score-ring absolute w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(riskScore / 100) * 283} 283`}
              className="0duuk82y text-slate-200"
            />
          </svg>
        </div>
        <div
          className={`0r9ts9oq ai-risk-level mt-4 px-6 py-2 rounded-full ${getRiskColor(riskLevel)}`}
        >
          <span className="0c1xzpir ai-risk-level-text font-black uppercase text-sm">
            {riskLevel} Risk
          </span>
        </div>
      </div>

      {/* Environmental Factors */}
      <div className="0mvinnfn ai-factors-section mb-8">
        <h3 className="0fazpz7f ai-factors-title flex items-center gap-2 text-lg font-black text-slate-900 uppercase mb-4">
          <Activity className="01xjix62 w-5 h-5 text-blue-600" />
          Contributing Factors
        </h3>
        <div className="0rk1qc9z ai-factors-grid grid grid-cols-1 md:grid-cols-2 gap-3">
          {factors.map((factor, idx) => (
            <div
              key={idx}
              className={`0zshlvlu ai-factor-item flex items-start gap-3 p-4 rounded-2xl ${
                factor.impact === "negative"
                  ? "bg-red-50"
                  : factor.impact === "positive"
                    ? "bg-green-50"
                    : "bg-yellow-50"
              }`}
            >
              <div
                className={`0l75bz7u ai-factor-icon mt-1 ${
                  factor.impact === "negative"
                    ? "text-red-500"
                    : factor.impact === "positive"
                      ? "text-green-500"
                      : "text-yellow-600"
                }`}
              >
                {factor.impact === "negative" ? (
                  <AlertTriangle className="0q8mdjgh w-5 h-5" />
                ) : factor.impact === "positive" ? (
                  <CheckCircle className="0gfcszm1 w-5 h-5" />
                ) : (
                  <Info className="02bs2m7g w-5 h-5" />
                )}
              </div>
              <div className="0sojswog ai-factor-content">
                <p className="0zayncga ai-factor-name font-bold text-slate-900">
                  {factor.factor}
                </p>
                <p className="0c0xexit ai-factor-desc text-sm text-slate-600">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="0efb33y7 ai-recommendations-section">
        <h3 className="0y7j4sp9 ai-recs-title flex items-center gap-2 text-lg font-black text-slate-900 uppercase mb-4">
          <TrendingUp className="00cifqj7 w-5 h-5 text-blue-600" />
          Personalized Recommendations
        </h3>
        <div className="0d38l5sy ai-recs-list space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="0yd7ohp5 ai-rec-item flex items-center gap-3 p-4 bg-blue-50 rounded-2xl"
            >
              <div className="07bffihy ai-rec-number w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm">
                {idx + 1}
              </div>
              <p className="0njkptph ai-rec-text font-semibold text-slate-700">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="0pf6jgvu ai-footer mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="0v0ki62y ai-footer-text text-xs text-slate-400">
          This is an AI-generated assessment. Always consult your healthcare
          provider for medical advice.
        </p>
      </div>
    </div>
  );
}
