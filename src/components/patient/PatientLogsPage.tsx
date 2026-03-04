import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Activity, TrendingUp, AlertTriangle, Download } from "lucide-react";
import jsPDF from "jspdf";

export default function PatientLogsPage() {
  const { t } = useTranslation();
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  
  const [logs, setLogs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [severity, setSeverity] = useState(1);
  const [peakFlow, setPeakFlow] = useState("");
  const [notes, setNotes] = useState("");
  
  // 📅 Date picker
  const [logDate, setLogDate] = useState("");
  // 💊 Medication taken checkbox
  const [medicationTaken, setMedicationTaken] = useState(false);
  // 🌬️ Trigger selection
  const [triggers, setTriggers] = useState<string[]>([]);
  // 🫁 Symptoms checklist
  const [symptoms, setSymptoms] = useState<string[]>([]);

  // Trigger & Symptom Options
  const triggerOptions = ["Dust", "Smoke", "Cold Air", "Exercise"];
  const symptomOptions = ["Coughing", "Wheezing", "Chest Tightness", "Shortness of Breath"];

  // Toggle function for multi-select
  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  useEffect(() => {
    const savedLogs = localStorage.getItem('symptomLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveLogsToStorage = (updatedLogs: any[]) => {
    localStorage.setItem("symptomLogs", JSON.stringify(updatedLogs));
  };

  // 🤖 Smart Severity Prediction - Auto-calculate severity based on peak flow
  const predictSeverity = (peak: number) => {
    if (peak >= 350) return 1; // Mild - Good breathing
    if (peak >= 250) return 2; // Moderate - Below average
    return 3; // Severe - Critical
  };

  // 🔔 Automatic Danger Alert - Check peak flow levels
  const checkDangerLevel = (peak: number) => {
    if (peak < 200) {
      alert(t("danger_critical"));
    } else if (peak < 300) {
      alert(t("warning_below_normal"));
    }
  };

  const handleAddLog = () => {
    if (!peakFlow || !notes) {
      alert(t("fill_all_fields"));
      return;
    }

    const peakFlowValue = Number(peakFlow);
    
    // 🤖 Auto-calculate severity using AI logic
    const autoSeverity = predictSeverity(peakFlowValue);

    const newLog = {
      severity: autoSeverity,
      peakFlow: peakFlowValue,
      notes,
      date: logDate || new Date().toISOString(),
      medicationTaken,
      triggers,
      symptoms,
      timestamp: new Date().toISOString(),
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveLogsToStorage(updatedLogs);

    // 🔔 Check for danger after adding log
    checkDangerLevel(peakFlowValue);

    // Reset form
    setSeverity(1);
    setPeakFlow("");
    setNotes("");
    setLogDate("");
    setMedicationTaken(false);
    setTriggers([]);
    setSymptoms([]);
    setShowForm(false);
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 1) return "bg-emerald-100 text-emerald-700";
    if (severity <= 2) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const getSeverityText = (severity: number) => {
    if (severity === 1) return t("severity_mild");
    if (severity === 2) return t("severity_moderate");
    return t("severity_severe");
  };

  // 📊 Admin Analytics - Calculate statistics
  const averagePeakFlow = logs.length > 0
    ? Math.round(logs.reduce((sum, log) => sum + Number(log.peakFlow), 0) / logs.length)
    : 0;

  const severeCases = logs.filter(log => log.severity === 3).length;
  const moderateCases = logs.filter(log => log.severity === 2).length;
  const mildCases = logs.filter(log => log.severity === 1).length;

  // 📊 Trigger Frequency Analytics
  const triggerCount: Record<string, number> = {};
  logs.forEach(log => {
    log.triggers?.forEach((trigger: string) => {
      triggerCount[trigger] = (triggerCount[trigger] || 0) + 1;
    });
  });

  // 📄 Generate PDF Report
  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("AsthmaShield Health Report", 20, 20);

    let y = 40;

    logs.forEach((log, index) => {
      doc.setFontSize(12);
      doc.text(`Log ${index + 1}`, 20, y);
      y += 8;

      doc.text(`Peak Flow: ${log.peakFlow}`, 20, y);
      y += 8;

      doc.text(`Severity: ${getSeverityText(log.severity)}`, 20, y);
      y += 8;

      doc.text(`Symptoms: ${log.symptoms?.join(", ") || "None"}`, 20, y);
      y += 8;

      doc.text(`Triggers: ${log.triggers?.join(", ") || "None"}`, 20, y);
      y += 12;
    });

    doc.save("AsthmaShield_Report.pdf");
  };

  return (
    <div className="0c19yz73 space-y-6">
      <h2 className="07r44tfg text-2xl font-black">{t("health_logs")}</h2>

      {/* Add New Log Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="0phtrgoj px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
      >
        + {t("add_new_log")}
      </button>

      {/* Add Log Form */}
      {showForm && (
        <div className={`0ui9h5fm p-6 rounded-3xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="06ewblg7 text-lg font-bold mb-4">{t("new_symptom_log")}</h3>

          <div className="0jbf564g space-y-4">
            {/* Peak Flow - Severity is now auto-calculated */}
            <div>
              <label className="0ht2ee90 block text-sm font-semibold mb-1">
                {t("peak_flow")} 🤖
              </label>
              <input
                type="number"
                value={peakFlow}
                onChange={(e) => setPeakFlow(e.target.value)}
                placeholder={t("peak_flow_placeholder")}
                className="09d6rpo1 w-full p-2 rounded-xl border"
              />
              <p className="0ctn7rfh text-xs text-slate-500 mt-1">
                🤖 {t("severity")}: {t("severity_mild")} (≥350), {t("severity_moderate")} (250-349), {t("severity_severe")} ({"<"}250)
              </p>
            </div>

            {/* 📅 Date Picker */}
            <div>
              <label className="0m1rabqy block text-sm font-semibold mb-1">Date</label>
              <input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className="0q40ilax w-full p-2 rounded-xl border"
              />
            </div>

            {/* 💊 Medication Checkbox */}
            <div className="0htepter flex items-center gap-2">
              <input
                type="checkbox"
                checked={medicationTaken}
                onChange={() => setMedicationTaken(!medicationTaken)}
                className="0cvk3ue6 w-5 h-5"
              />
              <label className="0ycbbp6q text-sm font-semibold">
                Took medication today
              </label>
            </div>

            {/* 🌬️ Trigger Selection */}
            <div>
              <label className="03r0sv85 block text-sm font-semibold mb-2">Triggers</label>
              <div className="0pmhcglw flex flex-wrap gap-2">
                {triggerOptions.map(trigger => (
                  <button
                    key={trigger}
                    type="button"
                    onClick={() => toggleItem(trigger, triggers, setTriggers)}
                    className={`0wkir27e px-3 py-1 rounded-full text-sm ${
                      triggers.includes(trigger)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            {/* 🫁 Symptoms Selection */}
            <div>
              <label className="0z8cck9w block text-sm font-semibold mb-2">Symptoms</label>
              <div className="01xpeq27 flex flex-wrap gap-2">
                {symptomOptions.map(symptom => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleItem(symptom, symptoms, setSymptoms)}
                    className={`0jz5802k px-3 py-1 rounded-full text-sm ${
                      symptoms.includes(symptom)
                        ? "bg-red-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="0wy0zv5w block text-sm font-semibold mb-1">{t("notes")}</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("notes_placeholder")}
                className="0iwzu89o w-full p-2 rounded-xl border"
              />
            </div>

            <button
              onClick={handleAddLog}
              className="06xbfb9j w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition"
            >
              {t("save_log")}
            </button>
          </div>
        </div>
      )}

      {/* 📊 Statistics Section - Admin Analytics Preparation */}
      {logs.length > 0 && (
        <div className={`06fqrpua p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
          <h3 className="05tbscbs text-xl font-black mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            {t("statistics")}
          </h3>

          <div className="0xnjycpu grid grid-cols-2 gap-4">
            {/* Average Peak Flow */}
            <div className="0pvv5kiq p-4 bg-blue-100 rounded-xl">
              <p className="02o9ciho text-sm text-slate-600">{t("average_peak_flow")}</p>
              <p className="0fzz46px text-2xl font-bold">{averagePeakFlow}</p>
              <p className="08rkhtro text-xs text-slate-500">L/min</p>
            </div>

            {/* Severe Episodes */}
            <div className="0dzv0z3g p-4 bg-red-100 rounded-xl">
              <p className="0scbve5s text-sm text-slate-600">{t("severe_episodes")}</p>
              <p className="0c6857h0 text-2xl font-bold text-red-600">{severeCases}</p>
              <p className="0fdah5ny text-xs text-slate-500">⚠️ {t("severity_severe")}</p>
            </div>

            {/* Mild Cases */}
            <div className="09u3i65g p-4 bg-emerald-100 rounded-xl">
              <p className="08auj34x text-sm text-slate-600">{t("severity_mild")}</p>
              <p className="0voiuaii text-2xl font-bold text-emerald-600">{mildCases}</p>
            </div>

            {/* Moderate Cases */}
            <div className="0k82ye9g p-4 bg-amber-100 rounded-xl">
              <p className="09t8rqig text-sm text-slate-600">{t("severity_moderate")}</p>
              <p className="02q5gusj text-2xl font-bold text-amber-600">{moderateCases}</p>
            </div>
          </div>

          {/* Total Logs */}
          <div className="079gplem mt-4 p-4 bg-slate-100 rounded-xl flex items-center justify-between">
            <span className="0zqqqemb font-semibold">Total Logs</span>
            <span className="0ii3ms57 text-2xl font-bold">{logs.length}</span>
          </div>
        </div>
      )}

      {/* Logs List */}
      <div className={`0sfh3z81 p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0eb8klr5 text-xl font-black mb-4">{t("recent_logs")}</h3>

        <div className="065vdcxf space-y-4">
          {logs.length === 0 ? (
            <p className="0uqu2xr7 text-slate-400 text-center py-8">
              {t("no_logs_yet")}
            </p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className="0f1if064 flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="052iz6f9 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Activity className="06o6hg9o text-blue-600" />
                </div>

                <div className="0oz66vke flex-1">
                  <div className="0did3olt flex items-center gap-2 mb-1">
                    <span
                      className={`0j7kvps3 px-2 py-0.5 rounded-full text-xs font-bold ${getSeverityColor(
                        log.severity
                      )}`}
                    >
                      {getSeverityText(log.severity)}
                    </span>
                    <span className="0qyhflma text-sm text-slate-500">
                      {t("peak_flow")}: {log.peakFlow}
                    </span>
                  </div>

                  <p className="0t55aum3 font-medium">{log.notes}</p>

                  <p className="0gl8dxyp text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Calendar size={12} />
                    {new Date(log.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

