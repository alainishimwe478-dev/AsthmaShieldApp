import { EnvironmentalData } from '../types';

export const fetchRwandaEnvironmentalData = async (): Promise<EnvironmentalData> => {
  // Mock data for Rwanda environmental conditions
  return {
    location: 'Kigali, Rwanda',
    temperature: 22,
    pollenLevel: 'Moderate',
    airQualityIndex: 65,
    airQualityStatus: 'Moderate',
    humidity: 68,
    windSpeed: 10,
    healthRiskScore: 45,
    highRiskDistricts: [
      { name: 'Nyabugogo', reason: 'High traffic congestion' },
      { name: 'Kimironko Market', reason: 'Dust and crowds' }
    ],
    sources: [
      { title: 'Rwanda Environment Authority', web: 'https://rema.gov.rw' }
    ],
    lastUpdated: new Date().toLocaleTimeString()
  };
};
