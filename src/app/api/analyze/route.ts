import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

const PALM_ANALYSIS_PROMPT = `당신은 100년 이상의 경험을 가진 세계적인 손금 전문가입니다.
수십 개의 손금학 문헌과 동서양의 손금 이론을 완벽하게 통달했습니다.

이 손바닥 이미지를 분석하여 다음 정보를 JSON 형식으로 반환해주세요:

{
  "isValidPalm": true/false,
  "handType": "left" 또는 "right",
  "handShape": "earth/fire/air/water 중 하나",
  "skinTexture": "부드러움/보통/거침",
  "fingerLength": "짧음/보통/김",

  "lines": {
    "lifeLine": {
      "length": "짧음/보통/김",
      "depth": "얕음/보통/깊음",
      "curve": "직선/완만/곡선",
      "breaks": 0,
      "branches": 0,
      "startPoint": "설명",
      "endPoint": "설명",
      "specialMarks": ["섬무늬", "별무늬", "십자" 등]
    },
    "headLine": { /* 같은 구조 */ },
    "heartLine": { /* 같은 구조 */ },
    "fateLine": { /* 같은 구조, 없으면 null */ },
    "sunLine": { /* 같은 구조, 없으면 null */ },
    "marriageLine": {
      "count": 0,
      "mainLine": { /* 위와 같은 구조 */ }
    }
  },

  "mounts": {
    "jupiter": { "development": "평평/보통/발달", "meaning": "설명" },
    "saturn": { /* 같은 구조 */ },
    "apollo": { /* 같은 구조 */ },
    "mercury": { /* 같은 구조 */ },
    "venus": { /* 같은 구조 */ },
    "luna": { /* 같은 구조 */ },
    "mars": { /* 같은 구조 */ }
  },

  "specialSigns": [
    { "type": "별", "location": "위치", "meaning": "의미" }
  ],

  "fingers": {
    "thumb": { "length": "보통", "flexibility": "유연/보통/뻣뻣", "shape": "설명" },
    "index": { /* 같은 구조 */ },
    "middle": { /* 같은 구조 */ },
    "ring": { /* 같은 구조 */ },
    "pinky": { /* 같은 구조 */ }
  }
}

중요:
1. 손바닥 이미지가 아니면 isValidPalm: false를 반환
2. 모든 분석은 실제로 보이는 것만 기반으로
3. JSON만 반환 (다른 텍스트 없이)`;

const INTERPRETATION_PROMPT = `당신은 따뜻하고 지혜로운 손금 해석 전문가입니다.
다음 손금 분석 데이터를 바탕으로 사용자에게 도움이 되는 상세한 해석을 제공해주세요.

분석 데이터:
{analysis}

다음 형식의 JSON으로 응답해주세요:

{
  "personality": {
    "title": "성격 분석",
    "summary": "한 줄 요약",
    "details": ["상세 설명 1", "상세 설명 2", ...],
    "strengths": ["강점 1", "강점 2"],
    "weaknesses": ["약점 1", "약점 2"]
  },
  "love": {
    "title": "연애운",
    "score": 85,
    "summary": "한 줄 요약",
    "details": ["상세 설명 1", ...],
    "advice": "조언"
  },
  "career": {
    "title": "직업운",
    "score": 80,
    "summary": "한 줄 요약",
    "details": ["상세 설명 1", ...],
    "suitableJobs": ["적합 직업 1", "적합 직업 2"],
    "advice": "조언"
  },
  "wealth": {
    "title": "재물운",
    "score": 75,
    "summary": "한 줄 요약",
    "details": ["상세 설명 1", ...],
    "advice": "조언"
  },
  "health": {
    "title": "건강운",
    "score": 70,
    "summary": "한 줄 요약",
    "details": ["상세 설명 1", ...],
    "cautions": ["주의사항 1"],
    "advice": "조언"
  },
  "overallScore": 78,
  "luckyElements": {
    "color": "행운의 색",
    "number": "행운의 숫자",
    "direction": "행운의 방향"
  },
  "yearlyFortune": "올해의 운세 요약",
  "finalAdvice": "종합 조언"
}

지침:
1. 긍정적이고 희망적인 톤 유지
2. 구체적이고 실용적인 조언 제공
3. 점수는 60-95 사이로 현실적으로
4. 한국어로 자연스럽게 작성`;

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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (action === 'analyze') {
      // 손금 분석
      const result = await model.generateContent([
        { text: PALM_ANALYSIS_PROMPT },
        {
          inlineData: {
            mimeType: mimeType,
            data: image,
          },
        },
      ]);

      const response = await result.response;
      const text = response.text();

      // JSON 파싱
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json(
          { error: '분석 결과를 파싱할 수 없습니다.' },
          { status: 500 }
        );
      }

      const analysis = JSON.parse(jsonMatch[0]);
      return NextResponse.json({ analysis });

    } else if (action === 'interpret') {
      // 해석 생성
      const prompt = INTERPRETATION_PROMPT.replace('{analysis}', JSON.stringify(inputAnalysis, null, 2));

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json(
          { error: '해석 결과를 파싱할 수 없습니다.' },
          { status: 500 }
        );
      }

      const interpretation = JSON.parse(jsonMatch[0]);
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
