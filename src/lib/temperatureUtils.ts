/**
 * Temperature utility functions for tracking historical temperatures
 * and finding hottest/coldest days
 */

export interface TemperatureRecord {
  date: string;
  temperature: number;
}

/**
 * Get the hottest and coldest temperature records from history
 * @param history - Array of temperature records
 * @returns Object containing hottest and coldest records
 */
export function getHottestAndColdest(
  history: TemperatureRecord[]
): { hottest: TemperatureRecord | null; coldest: TemperatureRecord | null } {
  if (!history || history.length === 0) {
    return { hottest: null, coldest: null };
  }

  let hottest = history[0];
  let coldest = history[0];

  history.forEach((record) => {
    if (record.temperature > hottest.temperature) {
      hottest = record;
    }
    if (record.temperature < coldest.temperature) {
      coldest = record;
    }
  });

  return { hottest, coldest };
}

/**
 * Update temperature history in localStorage
 * Keeps only the last 7 days of records
 * @param temperature - Current temperature reading
 */
export function updateTemperatureHistory(temperature: number): TemperatureRecord[] {
  const today = new Date().toISOString().split('T')[0];
  
  // Get existing history from localStorage
  const historyData = localStorage.getItem('temperature_history');
  let history: TemperatureRecord[] = historyData ? JSON.parse(historyData) : [];

  // Remove today's existing record if any (to avoid duplicates)
  history = history.filter((h: TemperatureRecord) => h.date !== today);

  // Add today's record
  const todayRecord: TemperatureRecord = { date: today, temperature };
  history.push(todayRecord);

  // Keep only last 7 days
  if (history.length > 7) {
    history = history.slice(-7);
  }

  // Save back to localStorage
  localStorage.setItem('temperature_history', JSON.stringify(history));

  return history;
}

/**
 * Get temperature history from localStorage
 * @returns Array of temperature records
 */
export function getTemperatureHistory(): TemperatureRecord[] {
  const historyData = localStorage.getItem('temperature_history');
  return historyData ? JSON.parse(historyData) : [];
}

/**
 * Get temperature risk level based on current temperature
 * @param temperature - Current temperature in Celsius
 * @returns Risk level string
 */
export function getTemperatureRisk(temperature: number): { level: string; message: string; color: string } {
  if (temperature >= 35) {
    return { level: 'Hot', message: 'Extreme heat! Stay hydrated and avoid outdoor activities.', color: 'red' };
  } else if (temperature >= 30) {
    return { level: 'Warm', message: 'Hot weather. Keep cool and stay hydrated.', color: 'orange' };
  } else if (temperature >= 20) {
    return { level: 'Normal', message: 'Comfortable temperature.', color: 'green' };
  } else if (temperature >= 10) {
    return { level: 'Cool', message: 'Cool weather. Dress warmly.', color: 'blue' };
  } else {
    return { level: 'Cold', message: 'Very cold! Protect yourself from cold air.', color: 'indigo' };
  }
}
