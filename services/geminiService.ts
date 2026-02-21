import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { SymptomLog, AIInsight, MedicationLog } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
const ai = new GoogleGenerativeAI(API_KEY);

// Chat message type for AI Doctor
interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

/**
 * Get AI Doctor response for chat conversations
 * @param userMessage - The user's question
 * @param chatHistory - Previous chat messages
 * @returns AI response string
 */
export const getAIDoctorResponse = async (
  userMessage: string, 
  chatHistory: ChatMessage[]
): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `${SYSTEM_INSTRUCTION} You are Dr. Shield, a friendly AI doctor specializing in asthma and respiratory health. Provide helpful, clear, and concise answers.`
    });

    // Build conversation context from history
    let conversationContext = chatHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'Doctor'}: ${msg.text}`)
      .join('\n');
    
    const prompt = conversationContext 
      ? `${conversationContext}\nUser: ${userMessage}`
      : userMessage;

    const response = await model.generateContent(prompt);
    return response.response.text() || "I couldn't process that. Can you try again?";
  } catch (error) {
    console.error("AI Doctor Error:", error);
    return "Connection error. Please try again.";
  }
};

export const getAsthmaInsights = async (logs: SymptomLog[]): Promise<AIInsight | null> => {
  if (logs.length === 0) return null;

  const dataContext = {
    recentSymptoms: logs.slice(0, 5),
    currentDate: new Date().toISOString()
  };

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            status: { type: SchemaType.STRING },
            wellBeingScore: { type: SchemaType.NUMBER },
            summary: { type: SchemaType.STRING },
            trendAnalysis: { type: SchemaType.STRING },
            recommendations: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
          },
          required: ["status", "wellBeingScore", "summary", "trendAnalysis", "recommendations"]
        }
      }
    });

    const response = await model.generateContent(
      `Analyze asthma symptom logs and provide health insights.
      
      Context: ${JSON.stringify(dataContext)}
      
      Provide:
      - status: Overall health status (Good/Fair/Caution/Warning)
      - wellBeingScore: 0-100 score
      - summary: Brief health summary
      - trendAnalysis: Analysis of symptom trends
      - recommendations: Array of 3-5 actionable health tips`
    );

    return JSON.parse(response.response.text());
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
};

/**
 * Get general health advice for an asthma patient
 * @param prompt - The user's health-related question
 * @returns Health advice string
 */
export const getHealthAdvice = async (prompt: string): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const response = await model.generateContent(prompt);
    return response.response.text() || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Error:", error);
    return "The health assistant is currently experiencing a connection issue. Please try again shortly.";
  }
};

/**
 * Get a pollution summary/health advisory for an asthma patient based on AQI
 * @param aqi - Air Quality Index value
 * @param district - District name in Rwanda
 * @returns Short health advisory string
 */
export const getPollutionSummary = async (aqi: number, district: string): Promise<string> => {
  const prompt = `Given an AQI of ${aqi} in ${district}, Rwanda, provide a short 2-sentence health advisory for an asthma patient.`;
  
  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash'
    });

    const response = await model.generateContent(prompt);
    return response.response.text() || "Air quality is currently acceptable.";
  } catch (error) {
    console.error("Pollution Summary Error:", error);
    return "Air quality data is being processed.";
  }
};

