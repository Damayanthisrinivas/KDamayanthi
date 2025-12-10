import { GoogleGenAI } from "@google/genai";
import { AppState } from "../types";

// Initialize Gemini Client
// In a real app, strict error handling for missing keys is needed.
const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("Gemini API Key is missing.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
}

export const generateWeeklyRefection = async (state: AppState): Promise<string> => {
    const client = getClient();
    if (!client) return "Unable to connect to AI Coach. Please check API configuration.";

    const habitSummary = state.habits.map(h => 
        `- ${h.title}: Streak ${h.streak}, Completed Today: ${h.completedToday ? 'Yes' : 'No'}`
    ).join('\n');

    const recentJournal = state.journal.slice(0, 3).map(j => 
        `Date: ${j.date}, Mood: ${j.mood}, Note: ${j.text}`
    ).join('\n');

    const prompt = `
        Act as a supportive, encouraging life coach for a student/young professional.
        Analyze their recent data:
        
        Habits:
        ${habitSummary}

        Recent Journal Entries:
        ${recentJournal}

        Provide a brief (max 100 words) encouraging reflection. 
        Highlight one win, one area to improve without being judgmental, and a small actionable tip for tomorrow.
        Use a calm, warm tone.
    `;

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Keep going! You're doing great.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble thinking right now, but remember: consistency is key!";
    }
};

export const suggestHabitAdjustments = async (failingHabitTitle: string): Promise<string> => {
     const client = getClient();
     if (!client) return "Try reducing the duration slightly.";

     const prompt = `
        The user is struggling with the habit: "${failingHabitTitle}".
        Suggest 3 very specific, micro-adjustments to make this habit easier to achieve.
        Keep it extremely brief (bullet points).
     `;

     try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Try doing it for just 2 minutes.";
    } catch (error) {
        return "Start smaller. Try just 5 minutes.";
    }
}
