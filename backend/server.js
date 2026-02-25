const express = require('express');
const { GoogleGenAI, Type } = require('@google/genai');

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/insights', async (req, res) => {
  try {
    const { logs, envData } = req.body;

    if (!logs || logs.length === 0) {
      return res.status(400).json({ error: 'No logs provided' });
    }

    const logsSummary = logs.slice(0, 10).map(log => ({
      date: new Date(log.timestamp).toLocaleDateString(),
      severity: log.severity,
      peakFlow: log.peakFlow,
      notes: log.notes,
      triggers: log.triggers
    }));

    const envSummary = envData ? {
      location: envData.location,
      temp: envData.temperature,
      aqi: envData.airQualityIndex,
      pollen: envData.pollenLevel,
      riskScore: envData.healthRiskScore,
      highRiskDistricts: envData.highRiskDistricts.map(d => d.name).join(", ")
    } : "No environmental data available.";

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Analyze these asthma logs: ${JSON.stringify(logsSummary)}. 
      Current Rwanda Environmental Context: ${JSON.stringify(envSummary)}. 
      Provide personalized asthma insights.`,
      config: {
        systemInstruction: `You are an expert asthma management assistant. Analyze logs and environmental conditions. Provide summary, recommendations, and trend analysis.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            trendAnalysis: { type: Type.STRING }
          },
          required: ["summary", "recommendations", "trendAnalysis"]
        }
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
