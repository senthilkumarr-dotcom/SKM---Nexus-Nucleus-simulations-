import { GoogleGenAI } from "@google/genai";

export async function generateLeafImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A realistic, high-definition 3D render of a green leafy plant shoot with a single central stem and several vibrant green leaves. The leaves should have visible veins and a natural texture. The entire shoot should be isolated on a plain white background, suitable for a scientific simulation.',
        },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
