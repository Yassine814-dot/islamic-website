import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Clé API manquante!");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Utiliser gemini-1.5-pro (le modèle le plus récent)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  },
});

console.log("✅ Modèle configuré: gemini-1.5-pro");

export const askGemini = async (question, conversationHistory = []) => {
  try {
    console.log("📤 Question à Gemini:", question);

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    console.log("📥 Réponse reçue");

    return {
      id: Date.now(),
      text: text,
      sender: "ai",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("❌ Erreur Gemini:", error);

    return {
      id: Date.now(),
      text: `Désolé, erreur: ${error.message}`,
      sender: "ai",
      timestamp: new Date().toISOString(),
      error: true,
    };
  }
};
