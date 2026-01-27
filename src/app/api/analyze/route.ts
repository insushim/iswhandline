import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Vercel Serverless - 60초 타임아웃
export const maxDuration = 60;

// 손금 DB 기반 상세 프롬프트
const PALM_ANALYSIS_PROMPT = `당신은 100년 경력의 세계적인 손금 전문가입니다. 동양(마의상법)과 서양 손금학을 모두 통달했습니다.

이 손바닥 이미지를 분석하고 **반드시 아래 JSON 형식으로만** 응답하세요.

## 분석 항목

### 1. 이미지 유효성
- 손바닥이 보이는지, 선명한지 확인

### 2. 손 형태 (4원소)
- 불의 손: 긴 손바닥 + 짧은 손가락 → 열정적, 리더십
- 땅의 손: 네모 손바닥 + 짧은 손가락 → 실용적, 안정
- 공기의 손: 네모 손바닥 + 긴 손가락 → 지적, 분석적
- 물의 손: 긴 손바닥 + 긴 손가락 → 감수성, 예술적

### 3. 주요 선 분석
- 생명선: 체력, 활력, 생활환경 (길이/깊이/곡선)
- 두뇌선: 지능, 사고방식 (직선=논리적, 곡선=창의적)
- 감정선: 감정, 사랑, 대인관계
- 운명선: 직업운, 사회적 성공 (있으면 목표 지향적)
- 태양선: 명예, 예술적 재능, 인기

### 4. 구(Mount) 분석
- 목성구(검지 아래): 야망, 리더십
- 토성구(중지 아래): 책임감, 성실
- 태양구(약지 아래): 창의력, 매력
- 수성구(새끼손가락 아래): 의사소통, 사업
- 금성구(엄지 아래): 사랑, 열정
- 월구(손바닥 하단): 상상력, 직관

### 5. 특수 기호
- M자 손금: 행운, 직관력 (드묾)
- 별: 갑작스러운 성공
- 십자: 변화, 결정의 순간
- 삼각형: 재능, 보호
- 섬: 스트레스 시기

## 응답 JSON 형식 (반드시 이 구조로):

{
  "isValidPalm": true,
  "confidence": 85,
  "handType": "right",

  "handShape": {
    "type": "earth",
    "description": "네모난 손바닥과 짧은 손가락으로 땅의 손입니다. 실용적이고 안정을 추구하는 성격입니다."
  },

  "lines": {
    "lifeLine": {
      "description": "생명선이 길고 선명하게 나타납니다.",
      "length": "long",
      "depth": "deep",
      "meaning": "강한 체력과 활력을 가지고 있습니다."
    },
    "headLine": {
      "description": "두뇌선이 약간 곡선을 그리며 손바닥을 가로지릅니다.",
      "shape": "curved",
      "meaning": "창의적이고 직관적인 사고를 합니다."
    },
    "heartLine": {
      "description": "감정선이 검지 아래까지 뻗어있습니다.",
      "endPosition": "underIndex",
      "meaning": "이상적인 사랑을 추구하고 높은 기준을 가집니다."
    },
    "fateLine": {
      "present": true,
      "description": "운명선이 손목에서 시작하여 중지로 향합니다.",
      "meaning": "어린 시절부터 명확한 목표가 있습니다."
    },
    "sunLine": {
      "present": false,
      "description": "태양선이 희미합니다.",
      "meaning": "명예보다 실질적 성취를 추구합니다."
    }
  },

  "mounts": {
    "jupiter": { "development": "developed", "meaning": "리더십이 있고 야망이 큽니다." },
    "saturn": { "development": "normal", "meaning": "책임감이 있고 성실합니다." },
    "apollo": { "development": "developed", "meaning": "창의력과 매력이 있습니다." },
    "mercury": { "development": "normal", "meaning": "의사소통 능력이 양호합니다." },
    "venus": { "development": "developed", "meaning": "애정이 풍부하고 따뜻합니다." },
    "moon": { "development": "normal", "meaning": "적당한 상상력을 가지고 있습니다." }
  },

  "specialMarks": {
    "mSign": false,
    "stars": [],
    "crosses": [],
    "triangles": ["palmCenter"],
    "islands": []
  },

  "personality": {
    "summary": "실용적이고 안정을 추구하면서도 창의적인 면이 있는 성격입니다.",
    "strengths": ["책임감", "성실함", "창의력", "따뜻한 마음"],
    "weaknesses": ["완고함", "변화에 대한 저항"],
    "hiddenTalents": ["예술적 감각", "사람을 이끄는 능력"],
    "detailedAnalysis": "당신은 땅의 손을 가지고 있어 기본적으로 현실적이고 꾸준한 성격입니다. 그러나 발달된 태양구와 금성구는 창의적이고 따뜻한 내면을 보여줍니다. 두뇌선의 곡선은 논리적 사고와 창의성을 균형있게 갖추고 있음을 나타냅니다."
  },

  "loveReading": {
    "currentStatus": "안정적인 감정 상태를 유지하고 있습니다.",
    "loveStyle": "이상적인 파트너를 찾으며, 한 번 사랑에 빠지면 헌신적입니다.",
    "idealPartner": "지적이면서도 따뜻한 마음을 가진 사람",
    "marriageProspect": "25-35세 사이에 좋은 인연을 만날 가능성이 높습니다.",
    "timing": "올해 하반기에 좋은 기회가 올 수 있습니다.",
    "advice": "너무 높은 기준을 고집하지 말고 열린 마음으로 사람을 만나보세요.",
    "score": 75
  },

  "careerReading": {
    "naturalTalents": ["분석력", "창의성", "리더십"],
    "suitableCareers": ["기획자", "디자이너", "관리자", "교육자", "컨설턴트"],
    "workStyle": "체계적으로 일하면서도 창의적인 아이디어를 내는 타입입니다.",
    "leadershipPotential": "팀을 이끌 수 있는 잠재력이 있습니다.",
    "businessAbility": "사업에 대한 감각이 있으나 안정을 선호합니다.",
    "careerAdvice": "현재 분야에서 전문성을 더 쌓으면 35세 이후 큰 성과가 있을 것입니다.",
    "score": 80
  },

  "wealthReading": {
    "moneyMakingAbility": "꾸준히 돈을 벌 수 있는 능력이 있습니다.",
    "savingTendency": "저축을 잘 하는 편입니다.",
    "investmentStyle": "안정적인 투자를 선호합니다.",
    "luckyFields": ["부동산", "교육", "IT"],
    "financialAdvice": "무리한 투자보다 꾸준한 저축과 안정적 투자가 적합합니다.",
    "wealthPotential": "큰 부자보다는 안정적인 재정 상태를 유지할 타입입니다.",
    "score": 72
  },

  "healthReading": {
    "strongPoints": ["소화기", "면역력"],
    "concernAreas": ["어깨/목", "스트레스 관리"],
    "stressManagement": "스트레스를 내면에 쌓아두는 경향이 있습니다.",
    "recommendations": ["규칙적인 운동", "명상이나 요가", "충분한 수면"],
    "score": 70
  },

  "lifePath": {
    "earlyLife": "안정적인 환경에서 성장하며 기초를 다집니다.",
    "middleLife": "30대 중반부터 본격적인 성과를 거둡니다.",
    "laterLife": "안정적이고 풍요로운 노후가 예상됩니다.",
    "majorTurningPoints": ["28-30세: 커리어 전환점", "40세 전후: 큰 성취"],
    "lifeTheme": "꾸준함과 성실함으로 성공을 이루는 인생"
  },

  "advice": {
    "immediate": "오늘은 새로운 것을 배우기 좋은 날입니다.",
    "shortTerm": "다음 3개월간 인간관계에 신경쓰세요.",
    "longTerm": "5년 내에 큰 결정을 할 때는 직감을 믿으세요.",
    "warnings": ["과로 주의", "급한 결정 자제"],
    "affirmation": "나는 꾸준한 노력으로 원하는 것을 이룰 수 있습니다."
  },

  "luckyElements": {
    "colors": ["파란색", "녹색"],
    "numbers": [3, 7, 8],
    "directions": ["동쪽", "남동쪽"],
    "stones": ["사파이어", "에메랄드"],
    "days": ["수요일", "금요일"]
  },

  "overallScore": 76,
  "specialNotes": "손바닥 중앙에 삼각형이 있어 재물운이 좋은 편입니다. 꾸준한 노력이 성과로 이어질 것입니다."
}

## 중요 지침
1. 손바닥이 아니거나 흐리면 isValidPalm: false, confidence: 0
2. 모든 텍스트는 한국어로 자연스럽게
3. 점수는 60-88 사이로 현실적으로 (90점 이상은 매우 드묾)
4. 긍정적이고 따뜻한 톤 유지, 부정적인 것도 조언 형태로
5. 실제로 보이는 것만 분석, 추측하지 말 것
6. JSON만 반환 (마크다운 코드블록 없이)`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, mimeType, action } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      }
    });

    // JSON 파싱 헬퍼 함수
    const parseJsonResponse = (text: string): any => {
      // 마크다운 코드 블록 제거
      let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      // JSON 객체 추출
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('JSON not found in response:', text.substring(0, 500));
        throw new Error('AI 응답에서 JSON을 찾을 수 없습니다.');
      }

      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        // JSON 파싱 실패 시 일반적인 문제 수정 시도
        let fixedJson = jsonMatch[0]
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/'/g, '"')
          .replace(/\n/g, ' ');

        try {
          return JSON.parse(fixedJson);
        } catch (e2) {
          console.error('JSON parse error:', e2, 'Text:', fixedJson.substring(0, 500));
          throw new Error('AI 응답을 파싱할 수 없습니다. 다시 시도해주세요.');
        }
      }
    };

    // 분석 요청
    if (action === 'analyze') {
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

      if (!text || text.trim().length === 0) {
        return NextResponse.json(
          { error: '분석 결과가 비어있습니다. 다시 시도해주세요.' },
          { status: 500 }
        );
      }

      const combined = parseJsonResponse(text);

      // 분석 데이터 구조화
      const analysis = {
        isValidPalm: combined.isValidPalm ?? true,
        confidence: combined.confidence ?? 75,
        handType: combined.handType ?? 'unknown',
        handShape: combined.handShape ?? { type: 'earth', description: '분석 중' },
        lines: combined.lines ?? {},
        mounts: combined.mounts ?? {},
        specialMarks: combined.specialMarks ?? {}
      };

      // 해석 데이터 구조화
      const interpretation = {
        personality: combined.personality ?? {
          summary: '분석 결과를 확인하세요.',
          strengths: [],
          weaknesses: [],
          hiddenTalents: [],
          detailedAnalysis: ''
        },
        loveReading: combined.loveReading ?? {
          currentStatus: '-',
          loveStyle: '-',
          idealPartner: '-',
          marriageProspect: '-',
          timing: '-',
          advice: '-',
          score: 70
        },
        careerReading: combined.careerReading ?? {
          naturalTalents: [],
          suitableCareers: [],
          workStyle: '-',
          leadershipPotential: '-',
          businessAbility: '-',
          careerAdvice: '-',
          score: 70
        },
        wealthReading: combined.wealthReading ?? {
          moneyMakingAbility: '-',
          savingTendency: '-',
          investmentStyle: '-',
          luckyFields: [],
          financialAdvice: '-',
          wealthPotential: '-',
          score: 70
        },
        healthReading: combined.healthReading ?? {
          strongPoints: [],
          concernAreas: [],
          stressManagement: '-',
          recommendations: [],
          score: 70
        },
        lifePath: combined.lifePath ?? {
          earlyLife: '-',
          middleLife: '-',
          laterLife: '-',
          majorTurningPoints: [],
          lifeTheme: '-'
        },
        advice: combined.advice ?? {
          immediate: '-',
          shortTerm: '-',
          longTerm: '-',
          warnings: [],
          affirmation: '나는 무한한 가능성을 가지고 있습니다.'
        },
        luckyElements: combined.luckyElements ?? {
          colors: [],
          numbers: [],
          directions: [],
          stones: [],
          days: []
        },
        overallScore: combined.overallScore ?? 70,
        specialNotes: combined.specialNotes ?? ''
      };

      return NextResponse.json({ analysis, interpretation });
    }

    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
