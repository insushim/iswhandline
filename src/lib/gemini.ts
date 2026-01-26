/**
 * Gemini Vision API 클라이언트
 * 손바닥 이미지 분석을 담당합니다.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_ANALYSIS_PROMPT } from './ai-config';

export async function analyzeWithGemini(
  imageBase64: string,
  mimeType: string,
  apiKey: string
): Promise<any> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      GEMINI_ANALYSIS_PROMPT,
      {
        inlineData: {
          mimeType,
          data: imageBase64
        }
      }
    ]);

    const responseText = result.response.text();

    // JSON 파싱
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON not found in Gemini response');
    }

    const palmAnalysis = JSON.parse(jsonMatch[0]);
    return palmAnalysis;
  } catch (error: any) {
    console.error('Gemini analysis error:', error);
    throw new Error(`이미지 분석 실패: ${error.message}`);
  }
}

// 이미지 유효성 사전 검사
export function validateImageForPalmReading(analysis: any): { valid: boolean; message?: string } {
  if (!analysis.isValidPalm) {
    return {
      valid: false,
      message: '손바닥 이미지가 아니거나 너무 흐립니다. 손바닥이 잘 보이는 사진을 업로드해주세요.'
    };
  }

  if (analysis.confidence < 30) {
    return {
      valid: false,
      message: '이미지 품질이 낮습니다. 더 밝고 선명한 사진을 업로드해주세요.'
    };
  }

  return { valid: true };
}
