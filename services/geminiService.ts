
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIFitnessAdvice = async (workoutData: any, userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Você é um Personal Trainer e Coach de Musculação altamente experiente.
        Contexto do Treino Atual do Usuário: ${JSON.stringify(workoutData)}
        
        Pergunta do usuário: "${userPrompt}"
        
        Por favor, responda de forma motivadora, técnica e direta. 
        Sugira ajustes de carga ou técnica se notar estagnação. 
        Mantenha a resposta em Português do Brasil.
      `,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Desculpe, tive um problema ao analisar seus dados agora. Tente novamente em breve!";
  }
};
