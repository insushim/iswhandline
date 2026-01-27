import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Vercel Serverless (Edge보다 타임아웃 길음 - 60초)
export const maxDuration = 60;

const COMBINED_PROMPT = `당신은 세계적인 손금 전문가입니다.

이 손바닥 이미지를 분석하고 해석을 제공해주세요.

**반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 반환:**

{
  "isValidPalm": true,
  "confidence": 85,
  "handType": "right",
  "handShape": {
    "type": "earth",
    "description": "손 형태 설명"
  },
  "lines": {
    "lifeLine": "생명선 특징",
    "headLine": "두뇌선 특징",
    "heartLine": "감정선 특징",
    "fateLine": "운명선 특징 (없으면 null)",
    "sunLine": "태양선 특징 (없으면 null)"
  },
  "personality": {
    "title": "성격 분석",
    "summary": "성격 한 줄 요약",
    "details": ["성격 특징 1", "성격 특징 2", "성격 특징 3"],
    "strengths": ["강점 1", "강점 2"],
    "weaknesses": ["약점 1", "약점 2"]
  },
  "love": {
    "title": "연애운",
    "score": 75,
    "summary": "연애운 요약",
    "details": ["연애 특징 1", "연애 특징 2"],
    "advice": "연애 조언"
  },
  "career": {
    "title": "직업운",
    "score": 80,
    "summary": "직업운 요약",
    "details": ["직업 특징 1", "직업 특징 2"],
    "suitableJobs": ["적합 직업 1", "적합 직업 2", "적합 직업 3"],
    "advice": "커리어 조언"
  },
  "wealth": {
    "title": "재물운",
    "score": 70,
    "summary": "재물운 요약",
    "details": ["재물 특징 1", "재물 특징 2"],
    "advice": "재물 조언"
  },
  "health": {
    "title": "건강운",
    "score": 75,
    "summary": "건강운 요약",
    "details": ["건강 특징 1", "건강 특징 2"],
    "cautions": ["주의사항 1"],
    "advice": "건강 조언"
  },
  "overallScore": 76,
  "luckyElements": {
    "color": "파란색",
    "number": "7",
    "direction": "동쪽"
  },
  "yearlyFortune": "올해 운세 요약 (2-3문장)",
  "finalAdvice": "종합 조언 (2-3문장)"
}

**중요 지침:**
1. 손바닥이 아니면 isValidPalm: false, confidence: 0 반환
2. 모든 텍스트는 한국어로 작성
3. 점수는 60-90 사이로 현실적으로
4. 긍정적이고 따뜻한 톤 유지
5. JSON만 반환 (마크다운 코드블록 없이)`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, mimeType, action, analysis: inputAnalysis } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    });

    // JSON 파싱 헬퍼 함수
    const parseJsonResponse = (text: string): any => {
      // 마크다운 코드 블록 제거
      let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      // JSON 객체 추출
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('JSON 형식을 찾을 수 없습니다.');
      }

      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        // JSON 파싱 실패 시 일반적인 문제 수정 시도
        let fixedJson = jsonMatch[0]
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/'/g, '"');
        return JSON.parse(fixedJson);
      }
    };

    // 단일 API 호출로 분석 + 해석 동시 수행
    if (action === 'analyze') {
      const result = await model.generateContent([
        { text: COMBINED_PROMPT },
        {
          inlineData: {
            mimeType: mimeType,
            data: image,
          },
        },
      ]);

      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        return NextResponse.json(
          { error: '분석 결과가 비어있습니다. 다시 시도해주세요.' },
          { status: 500 }
        );
      }

      const combined = parseJsonResponse(text);

      // 분석과 해석을 분리하여 반환
      const analysis = {
        isValidPalm: combined.isValidPalm,
        confidence: combined.confidence || 80,
        handType: combined.handType,
        handShape: combined.handShape,
        lines: combined.lines
      };

      return NextResponse.json({
        analysis,
        // 해석도 같이 반환 (2단계 호출 불필요)
        interpretation: {
          personality: combined.personality,
          love: combined.love,
          career: combined.career,
          wealth: combined.wealth,
          health: combined.health,
          overallScore: combined.overallScore,
          luckyElements: combined.luckyElements,
          yearlyFortune: combined.yearlyFortune,
          finalAdvice: combined.finalAdvice
        }
      });

    } else if (action === 'interpret') {
      // 이미 analyze에서 interpretation을 받았으면 이 호출은 스킵됨
      // 혹시 호출되면 빈 해석 반환 방지
      if (inputAnalysis?.interpretation) {
        return NextResponse.json({ interpretation: inputAnalysis.interpretation });
      }

      // fallback - 해석만 요청된 경우
      const prompt = `다음 손금 분석을 바탕으로 해석을 JSON으로 제공해주세요:
${JSON.stringify(inputAnalysis, null, 2)}

JSON 형식:
{
  "personality": { "title": "성격", "summary": "요약", "details": [], "strengths": [], "weaknesses": [] },
  "love": { "title": "연애운", "score": 75, "summary": "", "details": [], "advice": "" },
  "career": { "title": "직업운", "score": 75, "summary": "", "details": [], "suitableJobs": [], "advice": "" },
  "wealth": { "title": "재물운", "score": 75, "summary": "", "details": [], "advice": "" },
  "health": { "title": "건강운", "score": 75, "summary": "", "details": [], "cautions": [], "advice": "" },
  "overallScore": 75,
  "luckyElements": { "color": "", "number": "", "direction": "" },
  "yearlyFortune": "",
  "finalAdvice": ""
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const interpretation = parseJsonResponse(text);
      return NextResponse.json({ interpretation });
    }

    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
