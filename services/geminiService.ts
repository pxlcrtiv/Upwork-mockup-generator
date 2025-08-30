
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedTitle } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateTitles = async (base64Image: string, mimeType: string): Promise<GeneratedTitle[]> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }

  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: `Analyze this application screenshot. Generate 5 creative and catchy title/subtitle pairs for a marketing mockup. The tone should be professional but exciting. The title should be short and impactful, and the subtitle should be a brief, compelling description.`,
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                },
                required: ["title", "subtitle"]
              }
            }
          },
          required: ["suggestions"]
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (result.suggestions && Array.isArray(result.suggestions)) {
        return result.suggestions.slice(0, 5); // Ensure we only return up to 5
    }

    return [];
  } catch (error) {
    console.error("Error generating titles with Gemini:", error);
    throw new Error("Failed to generate AI suggestions. Please check the console for details.");
  }
};
