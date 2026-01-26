/**
 * Grok API 클라이언트 (xAI)
 * 손금 해석 생성을 담당합니다.
 */

import { getGrokPrompt } from './ai-config';

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

export async function interpretWithGrok(
  palmAnalysis: any,
  apiKey: string
): Promise<any> {
  try {
    const prompt = getGrokPrompt(palmAnalysis);

    const response = await fetch(GROK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'grok-2-latest',
        messages: [
          {
            role: 'system',
            content: '당신은 전문 손금 분석가입니다. 사용자에게 통찰력 있고 긍정적인 손금 해석을 제공합니다. 항상 JSON 형식으로만 응답하세요.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Grok API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from Grok');
    }

    // JSON 파싱
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON not found in Grok response');
    }

    const interpretation = JSON.parse(jsonMatch[0]);
    return interpretation;
  } catch (error: any) {
    console.error('Grok interpretation error:', error);
    throw new Error(`해석 생성 실패: ${error.message}`);
  }
}

// Grok 대신 Gemini로 해석 (백업)
export async function interpretWithGeminiFallback(
  palmAnalysis: any,
  apiKey: string
): Promise<any> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const prompt = getGrokPrompt(palmAnalysis);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON not found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error('Gemini fallback error:', error);
    throw new Error(`해석 생성 실패: ${error.message}`);
  }
}
