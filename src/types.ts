export interface SymptomLog {
  id: string;
  timestamp: number;
  severity: number;
  peakFlow: string;
  notes: string;
  triggers?: string[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  status: 'Stable' | 'At Risk' | 'Critical';
  lastLog: number;
  location: string;
  logs: SymptomLog[];
}

export interface AIInsight {
  summary: string;
  recommendations: string[];
  trendAnalysis: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
}

export interface EnvironmentalData {
  location: string;
  temperature: number;
  pollenLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  airQualityIndex: number;
  airQualityStatus: string;
  humidity: number;
  windSpeed: number;
  healthRiskScore: number;
  highRiskDistricts: Array<{ name: string; risk: 'High' | 'Extreme'; reason: string }>;
  lastUpdated: string;
  summary?: string;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  timestamp: number;
}

export type ViewMode = 'patient' | 'doctor';

// App Status for loading states
export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

// User type for authentication
export interface User {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  createdAt: number;
  dateOfBirth?: string;
  emergencyContact?: EmergencyContact;
  isDoctor?: boolean;
}

// Emergency Contact interface
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// Health Profile interface
export interface HealthProfile {
  userId: string;
  asthmaDiagnosisDate?: string;
  asthmaSeverity: 'Mild' | 'Moderate' | 'Severe';
  controllerMedications: Medication[];
  rescueMedications: Medication[];
  triggers: string[];
  peakFlowBaseline?: number;
  lastUpdated: number;
}

// Medication interface
export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  isActive: boolean;
}

// AI Risk Assessment interface
export interface AIRiskAssessment {
  userId: string;
  overallRiskScore: number; // 1-100
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  environmentalFactors: EnvironmentalFactor[];
  personalizedRecommendations: string[];
  trendAnalysis: string;
  lastAssessment: number;
}

// Environmental Factor for AI assessment
export interface EnvironmentalFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  score: number;
}

// Alert Notification
export interface AlertNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: 'aqi' | 'district' | 'medication' | 'emergency' | 'system';
  read: boolean;
  timestamp: number;
  actionRequired?: string;
  expiresAt?: number;
}

// Dashboard specific types
export interface UserData {
  id: number;
  fullName: string;
  email: string;
  avatar?: string;
}

export interface EnvData {
  name: string;
  temp: number;
  aqi: number;
  humidity: number;
  pollen: number;
  status: 'Normal' | 'Warning' | 'High';
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}
