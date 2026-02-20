export interface SymptomLog {
  id: string;
  timestamp: number;
  severity: number;
  peakFlow: string;
  notes: string;
  triggers?: string[];
}

export interface AIInsight {
  status: string;
  wellBeingScore: number;
  summary: string;
  recommendations: string[];
  trendAnalysis: string;
  riskLevel: string;
}

export interface EnvironmentalData {
  location: string;
  temperature: number;
  airQualityIndex: number;
  airQualityStatus: string;
  pollenLevel: string;
  humidity: number;
  windSpeed: number;
  healthRiskScore: number;
  highRiskDistricts: Array<{ name: string; reason: string; risk: string }>;
  lastUpdated: string;
  sources: Array<{ title: string; web: string }>;
}

export enum AppStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error'
}

export enum ModalType {
  NONE = 'none',
  ADD_LOG = 'add_log',
  INSIGHTS = 'insights',
  EMERGENCY = 'emergency',
  NOTIFICATIONS = 'notifications'
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  timestamp: number;
}

export interface LocalProvider {
  name: string;
  phone: string;
  type: string;
  location: string;
}