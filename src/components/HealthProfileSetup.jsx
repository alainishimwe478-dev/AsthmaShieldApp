import React, { useState, useEffect } from "react";
import { Save, X, Plus, Trash2, AlertCircle } from "lucide-react";
import { HealthProfile, Medication } from "../types";

const COMMON_TRIGGERS = [
  "Pollen",
  "Dust Mites",
  "Pet Dander",
  "Mold",
  "Smoke",
  "Air Pollution",
  "Cold Air",
  "Exercise",
  "Respiratory Infections",
  "Strong Odors",
  "Chemicals",
  "Stress",
  "Certain Medications",
];

const COMMON_MEDICATIONS = [
  { name: "Ventolin (Salbutamol)", type: "rescue" },
  { name: "Seretide (Fluticasone/Salmeterol)", type: "controller" },
  { name: "Symbicort (Budesonide/Formoterol)", type: "controller" },
  { name: "Flovent (Fluticasone)", type: "controller" },
  { name: "Prednisone", type: "rescue" },
  { name: "Singulair (Montelukast)", type: "controller" },
];

export default function HealthProfileSetup({ userId, onComplete, onSkip }) {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    isActive: true,
  });
  const [medicationType, setMedicationType] = useState("controller");

  // Load existing profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem(`healthProfile_${userId}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const profileData = {
        userId,
        asthmaDiagnosisDate: profile?.asthmaDiagnosisDate || "",
        asthmaSeverity: profile?.asthmaSeverity || "Mild",
        controllerMedications: profile?.controllerMedications || [],
        rescueMedications: profile?.rescueMedications || [],
        triggers: profile?.triggers || [],
        peakFlowBaseline: profile?.peakFlowBaseline || undefined,
        lastUpdated: Date.now(),
      };

      localStorage.setItem(
        `healthProfile_${userId}`,
        JSON.stringify(profileData),
      );

      // Show success notification
      alert("Health profile saved successfully!");
      if (onComplete) onComplete(profileData);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const addMedication = () => {
    if (!newMedication.name) return;

    const medication = {
      ...newMedication,
      name: newMedication.name,
    };

    if (medicationType === "controller") {
      setProfile({
        ...profile,
        controllerMedications: [
          ...(profile?.controllerMedications || []),
          medication,
        ],
      });
    } else {
      setProfile({
        ...profile,
        rescueMedications: [...(profile?.rescueMedications || []), medication],
      });
    }

    setNewMedication({ name: "", dosage: "", frequency: "", isActive: true });
    setShowAddMedication(false);
  };

  const removeMedication = (type, index) => {
    if (type === "controller") {
      const updated = [...(profile?.controllerMedications || [])];
      updated.splice(index, 1);
      setProfile({ ...profile, controllerMedications: updated });
    } else {
      const updated = [...(profile?.rescueMedications || [])];
      updated.splice(index, 1);
      setProfile({ ...profile, rescueMedications: updated });
    }
  };

  const toggleTrigger = (trigger) => {
    const currentTriggers = profile?.triggers || [];
    if (currentTriggers.includes(trigger)) {
      setProfile({
        ...profile,
        triggers: currentTriggers.filter((t) => t !== trigger),
      });
    } else {
      setProfile({
        ...profile,
        triggers: [...currentTriggers, trigger],
      });
    }
  };

  if (!profile) {
    setProfile({
      userId,
      asthmaSeverity: "Mild",
      controllerMedications: [],
      rescueMedications: [],
      triggers: [],
      lastUpdated: Date.now(),
    });
    return null;
  }

  return (
    <div className="09uzru6g health-profile-setup max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="0q6yauq5 pf-header flex justify-between items-center mb-8">
        <div>
          <h2 className="0mduigjm pf-title text-3xl font-black text-slate-900 uppercase tracking-tight">
            Health Profile Setup
          </h2>
          <p className="0bdpnra5 pf-subtitle text-slate-500 mt-1">
            Complete your health profile for personalized asthma management
          </p>
        </div>
        {onSkip && (
          <button
            onClick={onSkip}
            className="0o623kkc pf-skip p-2 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="0ulwwoyi w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>

      {/* Asthma Severity */}
      <div className="023v4cip pf-section bg-white rounded-[3rem] p-8 shadow-lg border border-slate-100 mb-6">
        <h3 className="0iru3tgr pf-section-title text-lg font-black text-slate-900 uppercase mb-4">
          Asthma Severity
        </h3>
        <div className="07lhpa27 pf-severity-grid grid grid-cols-3 gap-4">
          {["Mild", "Moderate", "Severe"].map((severity) => (
            <button
              key={severity}
              onClick={() =>
                setProfile({ ...profile, asthmaSeverity: severity })
              }
              className={`05sl8n69 pf-severity-btn p-4 rounded-2xl font-black uppercase text-sm transition-all ${
                profile.asthmaSeverity !== severity
                  ? "bg-slate-50 text-slate-400 border-2 border-slate-200 hover:border-slate-300"
                  : severity === "Mild"
                    ? "bg-green-100 text-green-700 border-2 border-green-500"
                    : severity === "Moderate"
                      ? "bg-orange-100 text-orange-700 border-2 border-orange-500"
                      : "bg-red-100 text-red-700 border-2 border-red-500"
              }`}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      {/* Diagnosis Date */}
      <div className="0ffwrczx pf-section bg-white rounded-[3rem] p-8 shadow-lg border border-slate-100 mb-6">
        <h3 className="06bim3lu pf-section-title text-lg font-black text-slate-900 uppercase mb-4">
          When were you diagnosed with asthma?
        </h3>
        <input
          type="date"
          value={profile.asthmaDiagnosisDate || ""}
          onChange={(e) =>
            setProfile({ ...profile, asthmaDiagnosisDate: e.target.value })
          }
          className="0bgodflk pf-date-input w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Triggers */}
      <div className="0mmuhvvw pf-section bg-white rounded-[3rem] p-8 shadow-lg border border-slate-100 mb-6">
        <div className="0g4c9bhk pf-section-header flex items-center gap-2 mb-4">
          <AlertCircle className="0g6mcp5f w-5 h-5 text-amber-500" />
          <h3 className="0bw18mpi pf-section-title text-lg font-black text-slate-900 uppercase">
            Known Triggers
          </h3>
        </div>
        <p className="0kgusy2h pf-section-desc text-sm text-slate-500 mb-4">
          Select all triggers that affect your asthma
        </p>
        <div className="0b2dmhsb pf-triggers-grid grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMMON_TRIGGERS.map((trigger) => (
            <button
              key={trigger}
              onClick={() => toggleTrigger(trigger)}
              className={`03xvlbll pf-trigger-btn px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                profile.triggers?.includes(trigger)
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                  : "bg-slate-50 text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              {trigger}
            </button>
          ))}
        </div>
      </div>

      {/* Controller Medications */}
      <div className="0c60x2y5 pf-section bg-white rounded-[3rem] p-8 shadow-lg border border-slate-100 mb-6">
        <h3 className="02cnb4eb pf-section-title text-lg font-black text-slate-900 uppercase mb-4">
          Daily Controller Medications
        </h3>
        <p className="05siom97 pf-section-desc text-sm text-slate-500 mb-4">
          Medications you take regularly to prevent asthma symptoms
        </p>

        <div className="041ufzu9 pf-meds-list space-y-3 mb-4">
          {profile.controllerMedications?.map((med, idx) => (
            <div
              key={idx}
              className="0rhs4cbf pf-med-item flex justify-between items-center p-4 bg-blue-50 rounded-2xl"
            >
              <div>
                <p className="086zyuaf pf-med-name font-bold text-slate-900">
                  {med.name}
                </p>
                <p className="0p1w5kbe pf-med-dosage text-sm text-slate-500">
                  {med.dosage} - {med.frequency}
                </p>
              </div>
              <button
                onClick={() => removeMedication("controller", idx)}
                className="06a7jrav pf-med-remove p-2 hover:bg-red-100 rounded-xl transition"
              >
                <Trash2 className="0w614cs1 w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {!showAddMedication ? (
          <button
            onClick={() => {
              setMedicationType("controller");
              setShowAddMedication(true);
            }}
            className="0vgs386f pf-add-med-btn flex items-center gap-2 px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-xl transition"
          >
            <Plus className="07ubrkbv w-4 h-4" /> Add Controller Medication
          </button>
        ) : (
          <div className="0am6041x pf-add-med-form p-4 bg-slate-50 rounded-2xl">
            <select
              value={newMedication.name}
              onChange={(e) =>
                setNewMedication({ ...newMedication, name: e.target.value })
              }
              className="0bxmine3 pf-med-select w-full px-4 py-3 mb-3 bg-white border border-slate-200 rounded-xl"
            >
              <option value="">Select medication</option>
              {COMMON_MEDICATIONS.filter((m) => m.type === "controller").map(
                (m) => (
                  <option key={m.name} value={m.name}>
                    {m.name}
                  </option>
                ),
              )}
            </select>
            <input
              type="text"
              placeholder="Dosage (e.g., 250mcg)"
              value={newMedication.dosage}
              onChange={(e) =>
                setNewMedication({ ...newMedication, dosage: e.target.value })
              }
              className="0dj8gv5q pf-dosage-input w-full px-4 py-3 mb-3 bg-white border border-slate-200 rounded-xl"
            />
            <input
              type="text"
              placeholder="Frequency (e.g., twice daily)"
              value={newMedication.frequency}
              onChange={(e) =>
                setNewMedication({
                  ...newMedication,
                  frequency: e.target.value,
                })
              }
              className="09nzzt1d pf-freq-input w-full px-4 py-3 mb-3 bg-white border border-slate-200 rounded-xl"
            />
            <div className="0ay9ooq0 pf-form-actions flex gap-2">
              <button
                onClick={addMedication}
                className="0kd83b9q pf-save-med flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddMedication(false)}
                className="0q0gnuty pf-cancel-med px-4 py-2 bg-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rescue Medications */}
      <div className="042l8a6a pf-section bg-white rounded-[3rem] p-8 shadow-lg border border-slate-100 mb-6">
        <h3 className="0py1hy4c pf-section-title text-lg font-black text-slate-900 uppercase mb-4">
          Rescue Medications
        </h3>
        <p className="0u9be885 pf-section-desc text-sm text-slate-500 mb-4">
          Quick-relief medications for asthma attacks
        </p>

        <div className="0dc4lgf0 pf-meds-list space-y-3 mb-4">
          {profile.rescueMedications?.map((med, idx) => (
            <div
              key={idx}
              className="0ruhe6br pf-med-item flex justify-between items-center p-4 bg-red-50 rounded-2xl"
            >
              <div>
                <p className="0nyybn3a pf-med-name font-bold text-slate-900">
                  {med.name}
                </p>
                <p className="0hajvk7y pf-med-dosage text-sm text-slate-500">
                  {med.dosage} - {med.frequency}
                </p>
              </div>
              <button
                onClick={() => removeMedication("rescue", idx)}
                className="0v31eu6h pf-med-remove p-2 hover:bg-red-100 rounded-xl transition"
              >
                <Trash2 className="0p3h8pyr w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setMedicationType("rescue");
            setShowAddMedication(true);
          }}
          className="0ok2bf9s pf-add-med-btn flex items-center gap-2 px-4 py-2 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition"
        >
          <Plus className="0pxaj18y w-4 h-4" /> Add Rescue Medication
        </button>
      </div>

      {/* Peak Flow Baseline */}
      <div className="0ering1w pf-section bg-white rounded-[3rem] p-8 shadow-lg border border-slate-100 mb-6">
        <h3 className="0b5x5zt4 pf-section-title text-lg font-black text-slate-900 uppercase mb-4">
          Peak Flow Baseline (Optional)
        </h3>
        <p className="0yena6fd pf-section-desc text-sm text-slate-500 mb-4">
          Your personal best peak flow reading (L/min)
        </p>
        <input
          type="number"
          placeholder="e.g., 450"
          value={profile.peakFlowBaseline || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              peakFlowBaseline: parseInt(e.target.value),
            })
          }
          className="0pi01f5l pf-peakflow-input w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Save Button */}
      <div className="04k4jysi pf-actions flex gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="0hnw4hyw pf-save-btn flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {saving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="03sdffpt w-5 h-5" /> Save Health Profile
            </>
          )}
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            className="0s592941 pf-skip-btn px-8 py-4 bg-slate-100 text-slate-600 rounded-[2rem] font-black text-sm uppercase hover:bg-slate-200 transition-all"
          >
            Skip for Now
          </button>
        )}
      </div>
    </div>
  );
}
