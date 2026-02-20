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
  fullName: string;
  avatar?: string;
  createdAt: number;
}
