import { GoogleGenerativeAI } from '@google/generative-ai';

export async function getAsthmaInsights(logs) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('Please add your Gemini API key to .env file');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const logSummary = logs.map(l => 
    `Date: ${new Date(l.timestamp).toLocaleDateString()}, Severity: ${l.severity}/5, Peak Flow: ${l.peakFlow} L/min, Notes: ${l.notes}`
  ).join('\n');

  const prompt = `Analyze these asthma logs and provide JSON response:
${logSummary}

Return JSON with: summary (string), recommendations (array of strings), trendAnalysis (string), riskLevel (Low/Moderate/High/Severe)`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid AI response format');
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

// Mock environmental data for Rwanda
const mockEnvironmentalData = {
  location: 'Kigali',
  temperature: 24,
  pollenLevel: 'High',
  airQualityIndex: 132,
  airQualityStatus: 'Unhealthy for Sensitive Groups',
  humidity: 70,
  windSpeed: 12,
  healthRiskScore: 65,
  highRiskDistricts: [
    { name: 'Nyarugenge', risk: 'High', reason: 'Heavy traffic, vehicle emissions' },
    { name: 'Gikondo', risk: 'Extreme', reason: 'Industrial pollution' }
  ],
  lastUpdated: new Date().toISOString(),
  summary: 'Air quality is unhealthy for sensitive groups. Limit outdoor activities, especially during peak traffic hours.'
};

export async function getEnvironmentalData() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // If no API key, return mock data
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.log('Using mock environmental data (no API key found)');
    return mockEnvironmentalData;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Provide current environmental data for Rwanda (Kigali region) for asthma patients. Include:
- temperature (Celsius)
- pollenLevel (Low/Moderate/High/Very High)
- airQualityIndex (AQI number)
- airQualityStatus (Good/Unhealthy for Sensitive Groups/Unhealthy/Very Unhealthy)
- humidity (percentage)
- windSpeed (km/h)
- healthRiskScore (0-100)
- highRiskDistricts (array of districts with risk level and reason)
- summary (brief health advisory)

Return as JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return {
        ...data,
        lastUpdated: new Date().toISOString()
      };
    }
    
    // Fallback to mock data if parsing fails
    return mockEnvironmentalData;
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Return mock data on error
    return mockEnvironmentalData;
  }
}
