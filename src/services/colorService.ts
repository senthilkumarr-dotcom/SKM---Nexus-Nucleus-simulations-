import { GoogleGenAI } from "@google/genai";

export async function getRealisticTitrationColors() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Provide realistic CSS hex colors for phenolphthalein indicator during an acid-base titration: 1. Colorless (acidic), 2. Very pale pink (exact end point), 3. Pale pink (slight excess), 4. Vibrant magenta (over-titrated). Return only a JSON object with these keys: acidic, endPoint, slightExcess, overTitrated.",
    config: {
      responseMimeType: "application/json",
    }
  });
  return JSON.parse(response.text);
}
