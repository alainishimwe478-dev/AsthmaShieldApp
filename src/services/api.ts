// API Service for fetching consultations and managing doctor actions
// Using native fetch API (no axios needed for React Native/Expo)

const API_BASE_URL = 'http://localhost:4000/api';

export interface Consultation {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'completed';
  lastMsg: string;
  unread: boolean;
  risk: 'High' | 'At Risk' | 'Stable';
  location: string;
  aqi: number;
  age?: number;
  asthmaSeverity?: string;
  peakFlow?: number;
  lastAttack?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  status: 'Critical' | 'At Risk' | 'Stable';
  district: string;
  lastLog: string;
}

export interface Alert {
  id: string;
  name: string;
  district: string;
  time: string;
  type: string;
}

// Fetch all consultations
export async function fetchConsultations(): Promise<Consultation[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/consultations`);
    if (!response.ok) {
      throw new Error('Failed to fetch consultations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching consultations:', error);
    // Return mock data as fallback for development
    return getMockConsultations();
  }
}

// Accept a consultation
export async function acceptConsultation(id: string): Promise<Consultation> {
  try {
    const response = await fetch(`${API_BASE_URL}/consultations/${id}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to accept consultation');
    }
    return await response.json();
  } catch (error) {
    console.error('Error accepting consultation:', error);
    throw error;
  }
}

// Complete a consultation
export async function completeConsultation(id: string): Promise<Consultation> {
  try {
    const response = await fetch(`${API_BASE_URL}/consultations/${id}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to complete consultation');
    }
    return await response.json();
  } catch (error) {
    console.error('Error completing consultation:', error);
    throw error;
  }
}

// Fetch all patients
export async function fetchPatients(): Promise<Patient[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`);
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching patients:', error);
    return getMockPatients();
  }
}

// Fetch all alerts
export async function fetchAlerts(): Promise<Alert[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    if (!response.ok) {
      throw new Error('Failed to fetch alerts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return getMockAlerts();
  }
}

// Mock data for development (when backend is not available)
function getMockConsultations(): Consultation[] {
  return [
    { id: "1", patientName: "Jean Paul", patientId: "p1", date: "Today", time: "2m ago", status: "pending", lastMsg: "I'm feeling tight-chested", unread: true, risk: "High", location: "Nyagatare", aqi: 160, age: 34, asthmaSeverity: "Moderate", peakFlow: 380, lastAttack: "3 days ago" },
    { id: "2", patientName: "Alice M.", patientId: "p2", date: "Today", time: "1h ago", status: "accepted", lastMsg: "Should I increase dosage?", unread: false, risk: "Stable", location: "Kigali", aqi: 45, age: 28, asthmaSeverity: "Mild", peakFlow: 420, lastAttack: "2 weeks ago" },
    { id: "3", patientName: "Eric S.", patientId: "p3", date: "Yesterday", time: "Yesterday", status: "completed", lastMsg: "Thanks, doctor!", unread: false, risk: "Stable", location: "Rubavu", aqi: 52, age: 45, asthmaSeverity: "Mild", peakFlow: 450, lastAttack: "1 month ago" },
    { id: "4", patientName: "Marie C.", patientId: "p4", date: "Today", time: "3h ago", status: "pending", lastMsg: "The pollen is really bad today", unread: false, risk: "At Risk", location: "Huye", aqi: 95, age: 22, asthmaSeverity: "Severe", peakFlow: 320, lastAttack: "1 week ago" },
  ];
}

function getMockPatients(): Patient[] {
  return [
    { id: "1", name: "Jean Paul", age: 34, status: "Critical", district: "Nyagatare", lastLog: "12 min ago" },
    { id: "2", name: "Alice M.", age: 28, status: "At Risk", district: "Kigali", lastLog: "45 min ago" },
    { id: "3", name: "Eric S.", age: 45, status: "Stable", district: "Rubavu", lastLog: "2 hours ago" },
    { id: "4", name: "Marie C.", age: 22, status: "At Risk", district: "Huye", lastLog: "3 hours ago" },
    { id: "5", name: "Paul K.", age: 51, status: "Stable", district: "Musanze", lastLog: "5 hours ago" },
  ];
}

function getMockAlerts(): Alert[] {
  return [
    { id: "1", name: "Jean Paul", district: "Nyagatare", time: "12 min ago", type: "Attack Reported" },
    { id: "2", name: "Alice M.", district: "Kigali", time: "45 min ago", type: "High AQI Exposure" },
    { id: "3", name: "Eric S.", district: "Rubavu", time: "2 hours ago", type: "Low Medication" },
    { id: "4", name: "Marie C.", district: "Huye", time: "3 hours ago", type: "Irregular Peak Flow" },
    { id: "5", name: "Paul K.", district: "Musanze", time: "5 hours ago", type: "Missed Medication" },
  ];
}

export default {
  fetchConsultations,
  acceptConsultation,
  completeConsultation,
  fetchPatients,
  fetchAlerts,
};
