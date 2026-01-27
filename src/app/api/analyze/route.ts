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
- 불의 손: 긴 손바닥 + 짧은 손가락 → 열정적, 리더십, 행동파
- 땅의 손: 네모 손바닥 + 짧은 손가락 → 실용적, 안정, 신뢰
- 공기의 손: 네모 손바닥 + 긴 손가락 → 지적, 분석적, 커뮤니케이션
- 물의 손: 긴 손바닥 + 긴 손가락 → 감수성, 예술적, 직관력

### 3. 주요 선 분석 (상세히)
- 생명선: 체력, 활력, 생활환경 (길이/깊이/곡선/분기선/끊김 여부)
- 두뇌선: 지능, 사고방식 (직선=논리적, 곡선=창의적, 길이, 시작점)
- 감정선: 감정, 사랑, 대인관계 (끝점 위치, 곡선도, 분기)
- 운명선: 직업운, 사회적 성공 (시작점, 선명도, 끝점)
- 태양선: 명예, 예술적 재능, 인기, 재물운

### 4. 구(Mount) 분석
- 목성구(검지 아래): 야망, 리더십, 자신감
- 토성구(중지 아래): 책임감, 성실, 지혜
- 태양구(약지 아래): 창의력, 매력, 성공운
- 수성구(새끼손가락 아래): 의사소통, 사업, 재정
- 금성구(엄지 아래): 사랑, 열정, 생명력
- 월구(손바닥 하단): 상상력, 직관, 여행운

### 5. 특수 기호 (유심히 관찰)
- M자 손금: 행운, 직관력, 재물운 (드묾)
- 별: 갑작스러운 성공, 재능
- 십자: 변화, 결정의 순간
- 삼각형: 재능, 보호, 성공
- 섬: 스트레스 시기, 건강 주의
- 사슬: 에너지 분산, 변동
- 격자: 과민함, 불안

### 6. 중요: 상세하고 풍부한 분석
- 모든 해석은 **최소 2-3문장**으로 구체적으로 작성
- personality의 summary는 **최소 100자 이상** 상세히
- personality의 detailedAnalysis는 **최소 200자 이상** 매우 상세히
- 각 운세 항목(연애, 직업, 재물, 건강)도 **구체적인 조언** 포함
- 강점, 약점, 숨겨진 재능은 각각 **3-5개** 제시
- 인생 조언은 **실질적이고 구체적**으로

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
    "summary": "당신은 땅의 손을 가진 실용적이고 안정을 추구하는 성격입니다. 한번 시작한 일은 끝까지 해내는 끈기가 있으며, 주변 사람들에게 신뢰를 주는 타입입니다. 겉으로는 차분해 보이지만 내면에는 창의적인 열정이 숨어 있습니다.",
    "strengths": ["강한 책임감과 성실함", "신뢰할 수 있는 성격", "뛰어난 창의력", "따뜻한 마음씨", "끈기와 인내심"],
    "weaknesses": ["때때로 완고한 면", "변화에 대한 저항감", "과도한 걱정 성향"],
    "hiddenTalents": ["예술적 감각과 미적 안목", "사람을 이끄는 리더십", "문제 해결 능력", "공감 능력"],
    "detailedAnalysis": "당신은 땅의 손을 가지고 있어 기본적으로 현실적이고 꾸준한 성격입니다. 네모난 손바닥과 짧은 손가락은 안정을 추구하고 실용적인 접근을 선호함을 나타냅니다. 그러나 발달된 태양구와 금성구는 창의적이고 따뜻한 내면을 보여줍니다. 두뇌선의 곡선은 논리적 사고와 창의성을 균형있게 갖추고 있음을 나타내며, 이는 예술적 감각과 분석 능력을 함께 발휘할 수 있는 잠재력을 의미합니다. 감정선의 깊이는 진지한 사랑을 추구하며 한번 마음을 주면 헌신적인 성격임을 보여줍니다. 생명선의 곡선은 가정과 가족을 중시하는 가치관을 나타냅니다."
  },

  "loveReading": {
    "currentStatus": "현재 감정선의 상태로 볼 때 안정적인 감정 상태를 유지하고 있습니다. 지금은 자신을 돌아보고 진정으로 원하는 것이 무엇인지 생각해볼 좋은 시기입니다.",
    "loveStyle": "감정선이 검지 아래까지 뻗어있어 이상적인 파트너를 찾는 경향이 있습니다. 한 번 사랑에 빠지면 매우 헌신적이며, 진지한 관계를 선호합니다. 가벼운 만남보다는 깊은 유대감을 중시합니다.",
    "idealPartner": "지적이면서도 따뜻한 마음을 가진 사람이 좋은 인연이 될 수 있습니다. 안정적이고 신뢰할 수 있으며, 당신의 창의성을 존중해주는 파트너가 이상적입니다.",
    "marriageProspect": "금성구의 발달도를 볼 때 25-35세 사이에 좋은 인연을 만날 가능성이 높습니다. 결혼 후에도 안정적이고 따뜻한 가정을 꾸릴 운세입니다.",
    "timing": "올해 하반기에 좋은 기회가 올 수 있습니다. 특히 사교적인 모임이나 취미 활동에서 인연을 만날 확률이 높습니다.",
    "advice": "너무 높은 기준을 고집하지 말고 열린 마음으로 사람을 만나보세요. 첫인상보다 시간이 지나면서 깊어지는 관계에 주목하세요. 소통을 두려워하지 말고 자신의 감정을 솔직히 표현하는 것이 좋습니다.",
    "score": 75
  },

  "careerReading": {
    "naturalTalents": ["분석력과 논리적 사고", "창의적 문제해결 능력", "팀을 이끄는 리더십", "꼼꼼한 계획 능력", "의사소통 능력"],
    "suitableCareers": ["전략 기획자", "UX/UI 디자이너", "프로젝트 관리자", "교육자/강사", "비즈니스 컨설턴트", "콘텐츠 크리에이터"],
    "workStyle": "체계적으로 일하면서도 창의적인 아이디어를 내는 타입입니다. 혼자 집중하는 시간과 팀과 협업하는 시간의 균형이 중요합니다. 목표가 명확할 때 최고의 성과를 냅니다.",
    "leadershipPotential": "목성구의 발달로 볼 때 팀을 이끌 수 있는 잠재력이 있습니다. 카리스마보다는 신뢰와 실력으로 인정받는 리더 타입입니다.",
    "businessAbility": "수성구가 적당히 발달해 사업에 대한 감각이 있으나, 기본적으로 안정을 선호합니다. 파트너와 함께하는 사업이 혼자 하는 것보다 적합합니다.",
    "careerAdvice": "현재 분야에서 전문성을 더 쌓으면 35세 이후 큰 성과가 있을 것입니다. 네트워킹을 소홀히 하지 마세요. 멘토를 찾고, 지속적인 학습을 통해 경쟁력을 키우세요.",
    "score": 80
  },

  "wealthReading": {
    "moneyMakingAbility": "운명선과 태양선의 조합으로 볼 때 꾸준히 돈을 벌 수 있는 능력이 있습니다. 일확천금보다는 꾸준한 노력으로 자산을 축적하는 타입입니다.",
    "savingTendency": "땅의 손 특성상 저축을 잘 하는 편입니다. 충동적인 소비보다 계획적인 지출을 선호하며, 미래를 위한 준비를 철저히 합니다.",
    "investmentStyle": "안정적인 투자를 선호합니다. 고수익 고위험보다는 안정적인 수익을 추구합니다. 부동산이나 적금 같은 안전자산이 적합합니다.",
    "luckyFields": ["부동산 및 인테리어", "교육 및 컨설팅", "IT 및 테크", "콘텐츠 및 미디어"],
    "financialAdvice": "무리한 투자보다 꾸준한 저축과 안정적 투자가 적합합니다. 30대 중반 이후에는 적극적인 투자도 고려해볼 만합니다. 전문가의 조언을 구하고, 분산 투자로 리스크를 관리하세요.",
    "wealthPotential": "큰 부자보다는 안정적인 재정 상태를 유지할 타입입니다. 하지만 꾸준한 노력과 현명한 재테크로 노후 걱정 없는 삶을 살 수 있습니다.",
    "score": 72
  },

  "healthReading": {
    "strongPoints": ["소화기 계통이 튼튼함", "기본적인 면역력이 좋음", "회복력이 빠른 편"],
    "concernAreas": ["어깨와 목의 긴장", "스트레스로 인한 두통", "눈의 피로"],
    "stressManagement": "스트레스를 내면에 쌓아두는 경향이 있습니다. 감정을 표현하는 것이 서툴러 몸으로 스트레스가 나타날 수 있습니다. 정기적인 휴식과 취미 활동으로 스트레스를 해소하세요.",
    "recommendations": ["규칙적인 운동 (특히 유산소)", "명상이나 요가로 마음 챙김", "충분한 수면 (7-8시간)", "정기적인 건강검진", "눈 휴식과 스트레칭"],
    "score": 70
  },

  "lifePath": {
    "earlyLife": "안정적인 환경에서 성장하며 기초를 다지는 시기입니다. 20대에는 다양한 경험을 통해 자신이 진정으로 원하는 것을 찾아가는 과정을 겪습니다. 이 시기의 노력이 훗날 큰 자산이 됩니다.",
    "middleLife": "30대 중반부터 본격적인 성과를 거두기 시작합니다. 커리어에서 인정받고, 안정적인 재정 기반을 마련하게 됩니다. 40대에는 리더십을 발휘하며 주변에 영향력을 미치게 됩니다.",
    "laterLife": "안정적이고 풍요로운 노후가 예상됩니다. 가족과 함께하는 시간을 소중히 여기며, 취미와 봉사활동에서 보람을 찾습니다. 건강 관리만 잘 하면 활기찬 노년을 보낼 수 있습니다.",
    "majorTurningPoints": ["28-30세: 커리어의 중요한 전환점, 새로운 기회", "35-37세: 재정적 안정의 시작", "40세 전후: 큰 성취와 인정", "50대: 인생의 황금기"],
    "lifeTheme": "꾸준함과 성실함으로 성공을 이루는 인생. 화려하지 않지만 단단한 삶을 살아갑니다."
  },

  "advice": {
    "immediate": "오늘은 새로운 것을 배우기 좋은 날입니다. 관심 있던 분야의 책을 읽거나 온라인 강의를 들어보세요. 작은 시작이 큰 변화를 만듭니다.",
    "shortTerm": "다음 3개월간 인간관계에 신경쓰세요. 오래된 친구와 연락하고, 새로운 인연에도 열린 마음을 가지세요. 네트워킹이 예상치 못한 기회를 가져다 줄 수 있습니다.",
    "longTerm": "5년 내에 큰 결정을 할 때는 직감을 믿으세요. 당신의 내면은 이미 답을 알고 있습니다. 자기 계발에 투자하고, 건강을 최우선으로 생각하세요.",
    "warnings": ["과로에 주의하세요, 건강이 최고의 재산입니다", "급한 결정은 자제하고 충분히 생각한 후 행동하세요", "남과 비교하지 말고 자신만의 속도를 유지하세요"],
    "affirmation": "나는 꾸준한 노력으로 원하는 것을 이룰 수 있습니다. 오늘의 작은 한 걸음이 내일의 큰 성과로 이어집니다."
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
2. 모든 텍스트는 한국어로 자연스럽게, 상세하고 풍부하게
3. 점수는 60-88 사이로 현실적으로 (90점 이상은 매우 드묾)
4. 긍정적이고 따뜻한 톤 유지, 부정적인 것도 조언 형태로
5. 실제로 보이는 것만 분석, 추측하지 말 것
6. JSON만 반환 (마크다운 코드블록 없이)

## 필수: 상세한 분석
- personality.summary: 최소 100자 이상, 손의 형태와 주요 선을 종합한 성격 분석
- personality.detailedAnalysis: 최소 200자 이상, 각 요소를 연결한 깊이 있는 분석
- personality.strengths: 5개 이상, 구체적으로
- personality.weaknesses: 3개 이상, 개선 가능한 관점으로
- personality.hiddenTalents: 4개 이상, 잠재력 관점
- 각 운세 항목의 모든 필드는 2문장 이상으로 상세하게
- advice의 각 항목도 구체적인 실천 방법 포함`;

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
      model: 'gemini-3-flash-preview',
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
