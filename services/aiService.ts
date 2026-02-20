export interface AIInsight {
  summary: string;
}

export const getAsthmaInsights = async (logs: any[]): Promise<AIInsight> => {
  return {
    summary: "No major insights yet. Keep tracking your symptoms."
  };
};
