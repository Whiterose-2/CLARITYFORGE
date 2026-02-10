
import { GoogleGenAI, Type } from "@google/genai";
import { ClarityAnalysis } from "./types";

const MODEL_NAME = 'gemini-3-pro-preview';

export async function analyzeExplanation(
  topic: string, 
  explanation: string
): Promise<ClarityAnalysis> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Topic: ${topic}\n\nUser Explanation: ${explanation}`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      systemInstruction: `You are ClarityForge, a Cognitive Understanding Analysis Engine.
You are not a tutor or chatbot. You do not answer questions directly.
Your job is to:
- Audit human understanding
- Detect gaps in reasoning
- Expose false confidence
- Reconstruct clarity
- Improve thinking patterns

Always think in terms of:
- Concept dependencies
- Logical flow
- Depth of explanation
- Causal reasoning

Analyze the user's input following these steps:
1. Normalize the explanation (remove filler, extract claims).
2. Diagnose understanding (0-100 score, identify breaks, false confidence).
3. Map knowledge gaps (list missing concepts & dependencies).
4. Reconstruct clarity (rebuild from fundamentals).
5. Provide meta-cognitive feedback.

Output MUST be strictly JSON.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Understanding depth score (0-100)" },
          scoreReasoning: { type: Type.STRING, description: "Brief justification for the score" },
          missingConcepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING },
                dependencyChain: { type: Type.STRING }
              },
              required: ["name", "reason", "dependencyChain"]
            }
          },
          logicalGaps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                gap: { type: Type.STRING },
                evidence: { type: Type.STRING }
              },
              required: ["gap", "evidence"]
            }
          },
          reconstructedExplanation: { type: Type.STRING, description: "Markdown explanation rebuilt from fundamentals" },
          comparison: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                aspect: { type: Type.STRING },
                before: { type: Type.STRING },
                after: { type: Type.STRING }
              },
              required: ["aspect", "before", "after"]
            }
          },
          improvementTips: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tip: { type: Type.STRING },
                thinkingPattern: { type: Type.STRING }
              },
              required: ["tip", "thinkingPattern"]
            }
          }
        },
        required: [
          "score", 
          "scoreReasoning", 
          "missingConcepts", 
          "logicalGaps", 
          "reconstructedExplanation", 
          "comparison", 
          "improvementTips"
        ]
      }
    }
  });

  const result = JSON.parse(response.text || '{}');
  return result;
}
