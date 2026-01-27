import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Vercel Serverless - 60초 타임아웃
export const maxDuration = 60;

// 손금 DB 기반 상세 프롬프트
const PALM_ANALYSIS_PROMPT = `당신은 100년 경력의 세계적인 손금 전문가입니다. 동양(마의상법)과 서양 손금학을 모두 통달했습니다.

이 손바닥 이미지를 분석하고 **반드시 아래 JSON 형식으로만** 응답하세요.

## 핵심 원칙: 근거 기반 해석
**모든 해석에는 반드시 "어떤 선/구가 어떻게 보이기 때문에"라는 근거를 포함해야 합니다.**

예시:
- ❌ "리더십이 있습니다"
- ✅ "검지 아래 목성구가 볼록하게 발달해 있어 리더십이 있습니다"
- ❌ "창의적인 성격입니다"
- ✅ "두뇌선이 월구 방향으로 완만하게 곡선을 그리고 있어 창의적이고 상상력이 풍부합니다"

## 손금 분석 가이드 (손바닥만 보여도 분석 가능)

### 이미지 요구사항
- 손바닥이 선명하게 보이면 분석 가능
- 손가락이 일부 잘려도 손바닥 선이 보이면 OK
- 손목은 필수 아님 (생명선 끝이 보이면 더 좋음)

### 1. 손 형태 (4원소) - 손바닥 비율로 판단
- 불의 손: 긴 손바닥 + 짧은 손가락 → 열정적, 리더십, 행동파
- 땅의 손: 네모 손바닥 + 짧은 손가락 → 실용적, 안정, 신뢰
- 공기의 손: 네모 손바닥 + 긴 손가락 → 지적, 분석적, 커뮤니케이션
- 물의 손: 긴 손바닥 + 긴 손가락 → 감수성, 예술적, 직관력

### 2. 3대 주요선 (반드시 분석)
- **생명선**: 엄지를 감싸는 곡선. 길이/깊이/곡률/끊김/섬 확인
- **두뇌선**: 검지-엄지 사이에서 시작해 손바닥 가로지름. 직선/곡선/길이/끝점
- **감정선**: 손바닥 상단 가로선. 끝점 위치(검지/중지 아래)/곡선도/분기

### 3. 부가선 (있으면 분석)
- **운명선**: 손바닥 중앙 세로선. 시작점/선명도/끊김
- **태양선**: 약지 아래로 뻗는 선. 명예/재물운
- **결혼선**: 새끼손가락 아래 옆면 가로선

### 4. 구(Mount) - 손바닥의 볼록한 부분
- 목성구(검지 아래): 리더십, 야망
- 토성구(중지 아래): 책임감, 지혜
- 태양구(약지 아래): 창의력, 성공
- 수성구(새끼손가락 아래): 소통, 사업
- 금성구(엄지 아래): 사랑, 생명력
- 월구(손바닥 하단 새끼손가락 쪽): 상상력, 직관

### 5. 특수 기호
- M자 손금: 생명선+두뇌선+감정선+운명선이 M형성 (매우 드묾)
- 별/십자/삼각형/섬/격자 등

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
    "summary": "손바닥이 네모나고 손가락이 짧은 '땅의 손'을 가지고 있어 실용적이고 안정을 추구하는 성격입니다. 생명선이 엄지를 크게 감싸며 깊게 새겨져 있어 가정과 가족을 중시하고 책임감이 강합니다. 두뇌선이 완만한 곡선을 그리고 있어 논리와 창의성을 균형 있게 갖추고 있습니다.",
    "strengths": ["생명선이 깊고 선명하여 강한 책임감과 성실함을 보여줍니다", "목성구가 적당히 발달해 신뢰할 수 있는 리더십이 있습니다", "두뇌선의 곡선이 창의적 사고력을 나타냅니다", "금성구가 풍만하여 따뜻한 마음씨를 가졌습니다", "생명선이 길어 끈기와 인내심이 뛰어납니다"],
    "weaknesses": ["손가락이 짧아 때때로 완고한 면이 있을 수 있습니다", "땅의 손 특성상 변화에 대한 저항감이 있습니다", "감정선에 작은 분기가 있어 가끔 걱정이 많습니다"],
    "hiddenTalents": ["태양구가 발달해 예술적 감각과 미적 안목이 있습니다", "목성구와 두뇌선의 조합으로 사람을 이끄는 리더십이 잠재되어 있습니다", "두뇌선이 길어 복잡한 문제 해결 능력이 있습니다", "감정선이 깊어 타인에 대한 공감 능력이 뛰어납니다"],
    "detailedAnalysis": "손바닥이 네모나고 손가락이 상대적으로 짧은 '땅의 손'을 가지고 있어 기본적으로 현실적이고 꾸준한 성격입니다. 생명선이 엄지를 넓게 감싸며 깊이 새겨져 있어 생명력이 강하고 가정을 중시합니다. 두뇌선이 생명선과 약간 떨어져 시작하여 손바닥 중앙을 향해 완만한 곡선을 그리는데, 이는 독립적 사고와 창의성을 균형 있게 갖추고 있음을 의미합니다. 감정선이 검지와 중지 사이까지 뻗어있어 이상과 현실을 조화롭게 추구하는 연애관을 가졌습니다. 목성구가 적당히 볼록하여 자신감이 있으면서도 겸손함을 유지하고, 금성구가 풍만하여 애정이 깊고 따뜻합니다. 태양구도 발달해 있어 창의적 재능이 숨어 있습니다."
  },

  "loveReading": {
    "currentStatus": "감정선이 선명하고 끊김 없이 이어져 있어 현재 안정적인 감정 상태를 유지하고 있습니다. 감정선 위에 작은 분기선들이 보이면 감수성이 풍부함을 의미합니다.",
    "loveStyle": "감정선이 검지 아래까지 길게 뻗어있어 이상적인 사랑을 추구하는 경향이 있습니다. 감정선의 깊이가 깊어 한 번 사랑에 빠지면 매우 헌신적이며, 진지한 관계를 선호합니다. 감정선이 곡선을 그리며 올라가 감정 표현이 풍부합니다.",
    "idealPartner": "금성구가 풍만하고 감정선이 길어 따뜻하고 지적인 파트너가 잘 맞습니다. 수성구의 발달로 대화가 통하는 사람, 태양구의 영향으로 창의성을 존중해주는 파트너가 이상적입니다.",
    "marriageProspect": "금성구가 볼록하게 발달해 있어 25-35세 사이에 좋은 인연을 만날 가능성이 높습니다. 생명선이 넓게 곡선을 그려 가정운이 좋고, 결혼 후에도 따뜻한 가정을 꾸릴 운세입니다.",
    "timing": "감정선에서 위로 뻗는 작은 선이 보이면 좋은 인연의 시기를 나타냅니다. 특히 사교적인 모임이나 취미 활동에서 인연을 만날 확률이 높습니다.",
    "advice": "감정선이 검지까지 뻗어 높은 이상을 가졌으나, 너무 높은 기준을 고집하지 말고 열린 마음으로 사람을 만나보세요. 소통을 두려워하지 말고 자신의 감정을 솔직히 표현하세요.",
    "score": 75
  },

  "careerReading": {
    "naturalTalents": ["두뇌선이 길어 분석력과 논리적 사고가 뛰어납니다", "두뇌선의 곡선으로 창의적 문제해결 능력이 있습니다", "목성구 발달로 팀을 이끄는 리더십이 있습니다", "토성구가 적당해 꼼꼼한 계획 능력이 있습니다", "수성구 발달로 의사소통 능력이 좋습니다"],
    "suitableCareers": ["전략 기획자", "UX/UI 디자이너", "프로젝트 관리자", "교육자/강사", "비즈니스 컨설턴트", "콘텐츠 크리에이터"],
    "workStyle": "두뇌선이 직선과 곡선의 중간 형태라 체계적으로 일하면서도 창의적인 아이디어를 내는 타입입니다. 토성구가 안정적이라 목표가 명확할 때 최고의 성과를 냅니다.",
    "leadershipPotential": "목성구(검지 아래)가 적당히 볼록하게 발달해 있어 팀을 이끌 수 있는 잠재력이 있습니다. 운명선이 선명하여 카리스마보다는 신뢰와 실력으로 인정받는 리더 타입입니다.",
    "businessAbility": "수성구(새끼손가락 아래)가 적당히 발달해 사업에 대한 감각이 있습니다. 그러나 땅의 손 특성상 안정을 선호하므로 파트너와 함께하는 사업이 혼자 하는 것보다 적합합니다.",
    "careerAdvice": "운명선이 손목에서 시작해 중지 방향으로 뻗어있어 30대 중반 이후 본격적인 성과가 예상됩니다. 현재 분야에서 전문성을 쌓고, 네트워킹을 통해 경쟁력을 키우세요.",
    "score": 80
  },

  "wealthReading": {
    "moneyMakingAbility": "운명선이 선명하고 태양선이 있어 꾸준히 돈을 벌 수 있는 능력이 있습니다. 생명선 안쪽(금성구)의 잔선들이 재물선 역할을 하여 일확천금보다 꾸준한 축적형입니다.",
    "savingTendency": "손바닥이 네모난 땅의 손이라 저축을 잘 하는 편입니다. 손가락이 짧아 충동적 소비보다 계획적 지출을 선호합니다.",
    "investmentStyle": "토성구가 안정적이라 고수익 고위험보다 안정적인 수익을 추구합니다. 부동산이나 적금 같은 안전자산이 적합합니다.",
    "luckyFields": ["부동산 및 인테리어", "교육 및 컨설팅", "IT 및 테크", "콘텐츠 및 미디어"],
    "financialAdvice": "재물선(생명선 안쪽 세로선)이 있다면 재테크 운이 있습니다. 무리한 투자보다 꾸준한 저축이 적합하고, 30대 중반 이후에는 적극적 투자도 고려해보세요.",
    "wealthPotential": "태양선이 희미하여 큰 부자보다는 안정적인 재정을 유지할 타입입니다. 하지만 운명선이 선명하여 꾸준한 노력으로 노후 걱정 없는 삶을 살 수 있습니다.",
    "score": 72
  },

  "healthReading": {
    "strongPoints": ["생명선이 길고 깊어 기초 체력이 좋습니다", "생명선이 끊김 없이 이어져 면역력이 좋습니다", "금성구가 풍만하여 회복력이 빠릅니다"],
    "concernAreas": ["두뇌선에 작은 섬이 있으면 스트레스성 두통 주의", "감정선의 사슬 모양은 감정 기복 주의", "생명선 중간의 가는 선은 컨디션 저하 시기"],
    "stressManagement": "감정선의 깊이로 볼 때 스트레스를 내면에 쌓아두는 경향이 있습니다. 두뇌선이 길어 생각이 많으므로 정기적인 휴식과 취미 활동으로 스트레스를 해소하세요.",
    "recommendations": ["생명선 강화를 위한 규칙적인 운동", "두뇌선 건강을 위한 명상이나 요가", "충분한 수면 (7-8시간)", "정기적인 건강검진", "눈 휴식과 스트레칭"],
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
7. **'손금'이라는 용어 사용 (관상 X, 손금 O)**
8. 손바닥만 보여도 분석 가능 (손가락/손목 필수 아님)

## 필수: 근거 기반 상세 분석
- **모든 해석에 "~선이/~구가 ~하기 때문에"라는 근거를 반드시 포함**
- personality.summary: 최소 100자, "어떤 손 형태"와 "주요 선의 특징" 언급
- personality.detailedAnalysis: 최소 200자, 각 선과 구를 연결한 근거 있는 분석
- personality.strengths: 5개, 각각 어떤 선/구 때문인지 명시
- personality.weaknesses: 3개, 손금적 근거와 함께
- personality.hiddenTalents: 4개, 잠재력의 손금적 근거
- 각 운세 항목: 해당 선이나 구의 특징을 언급하며 해석
- advice: 손금 특성에 맞는 구체적 실천 방법`;

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
