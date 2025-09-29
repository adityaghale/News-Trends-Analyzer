import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, GroundingChunk, AnalysisData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeNewsTrends = async (topic: string): Promise<AnalysisResult> => {

  const analysisSchema = {
    type: Type.OBJECT,
    properties: {
      summary: {
        type: Type.STRING,
        description: "A brief, neutral summary of the overall news trend, no more than 3 sentences."
      },
      keyThemes: {
        type: Type.ARRAY,
        description: "A list of 3 to 5 key themes or sub-topics discovered in the news. Each theme should be a short, descriptive string.",
        items: { type: Type.STRING }
      },
      sentiment: {
        type: Type.OBJECT,
        properties: {
          positive: { type: Type.NUMBER, description: "A percentage value from 0-100 for positive sentiment."},
          neutral: { type: Type.NUMBER, description: "A percentage value from 0-100 for neutral sentiment."},
          negative: { type: Type.NUMBER, description: "A percentage value from 0-100 for negative sentiment."},
        },
        required: ["positive", "neutral", "negative"],
      },
      keywords: {
        type: Type.ARRAY,
        description: "A list of 5-7 relevant keywords or entities.",
        items: { type: Type.STRING }
      },
    },
    required: ["summary", "keyThemes", "sentiment", "keywords"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on your knowledge, analyze the global news trends related to "${topic}".`,
      config: {
        // Removed `tools: [{ googleSearch: {} }]` because it's incompatible with `responseSchema`.
        // This resolves the API error and ensures reliable, structured output.
        temperature: 0.2, // Lower temperature for more factual, less creative responses
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const analysis = JSON.parse(response.text) as AnalysisData;
    
    // With googleSearch disabled, grounding metadata will not be available.
    // Return an empty array for sources.
    const sources: GroundingChunk[] = [];

    return { analysis, sources };

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from AI service. The service may be temporarily unavailable.");
  }
};
