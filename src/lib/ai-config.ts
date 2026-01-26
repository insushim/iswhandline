/**
 * AI 설정 및 프롬프트
 * Gemini Vision: 손바닥 이미지 분석
 * Grok: 손금 해석 생성
 */

// Gemini Vision 분석 프롬프트
export const GEMINI_ANALYSIS_PROMPT = `You are an expert palm analyst AI. Analyze this palm image and extract detailed information about all visible features.

IMPORTANT: Return your analysis as a valid JSON object only, no other text.

Analyze the following:
1. Image Validation: Is this a clear palm image? (true/false)
2. Hand Type: Which hand is shown? (left/right)
3. Hand Shape: Analyze palm and finger proportions to determine element type (fire/earth/air/water)
4. Finger Analysis: Length, proportions, and any notable features

5. Major Lines (for each, provide depth 1-100, length 1-100, clarity 1-100):
   - Life Line (starting from thumb-index area, curving around thumb)
   - Head Line (horizontal line across middle of palm)
   - Heart Line (topmost horizontal line under fingers)
   - Fate Line (vertical line from wrist to middle finger, if visible)
   - Sun Line (vertical line towards ring finger, if visible)

6. Minor Lines (if visible):
   - Marriage Line(s) (short horizontal lines below pinky)
   - Health Line (diagonal from pinky area)
   - Money Line (vertical line between pinky and ring finger)

7. Mounts (development level 1-100 for each visible):
   - Jupiter Mount (below index finger)
   - Saturn Mount (below middle finger)
   - Apollo Mount (below ring finger)
   - Mercury Mount (below pinky)
   - Venus Mount (base of thumb, inside life line)
   - Moon Mount (outer edge of palm, below pinky side)
   - Mars Positive (between Venus and Jupiter)
   - Mars Negative (between Mercury and Moon)

8. Special Marks (list any visible):
   - Stars, Crosses, Triangles, Islands, Chains, Squares, Grilles
   - M Sign, Simian Line, Mystic Cross, Fish Sign

Return JSON in this exact format:
{
  "isValidPalm": boolean,
  "confidence": number (1-100),
  "handType": "left" | "right" | "unknown",
  "handShape": {
    "type": "fire" | "earth" | "air" | "water",
    "palmLength": "long" | "short" | "medium",
    "fingerLength": "long" | "short" | "medium",
    "confidence": number
  },
  "fingerAnalysis": {
    "thumb": { "length": "long" | "medium" | "short", "flexibility": "flexible" | "stiff" | "normal" },
    "index": { "length": "long" | "medium" | "short", "dominance": "dominant" | "normal" | "short" },
    "middle": { "length": "long" | "medium" | "short" },
    "ring": { "length": "long" | "medium" | "short" },
    "pinky": { "length": "long" | "medium" | "short", "straightness": "straight" | "curved" | "normal" }
  },
  "majorLines": {
    "lifeLine": {
      "present": boolean,
      "depth": number,
      "length": number,
      "curve": "wide" | "narrow" | "medium",
      "clarity": number,
      "specialMarks": string[],
      "startPosition": string,
      "breaks": boolean
    },
    "headLine": {
      "present": boolean,
      "depth": number,
      "length": number,
      "shape": "straight" | "curved" | "wavy",
      "clarity": number,
      "specialMarks": string[],
      "startPosition": "attached" | "separated" | "widely_separated",
      "endPosition": string
    },
    "heartLine": {
      "present": boolean,
      "depth": number,
      "length": number,
      "shape": "curved" | "straight" | "wavy",
      "clarity": number,
      "specialMarks": string[],
      "endPosition": "under_index" | "under_middle" | "between" | "other"
    },
    "fateLine": {
      "present": boolean,
      "depth": number,
      "length": number,
      "clarity": number,
      "specialMarks": string[],
      "startPosition": "wrist" | "life_line" | "moon_mount" | "head_line" | "heart_line" | "none"
    },
    "sunLine": {
      "present": boolean,
      "depth": number,
      "length": number,
      "clarity": number,
      "specialMarks": string[],
      "startPosition": "wrist" | "head_line" | "heart_line" | "none"
    }
  },
  "minorLines": {
    "marriageLine": {
      "count": number,
      "lines": [{ "depth": number, "length": number, "direction": "up" | "down" | "straight" }]
    },
    "healthLine": {
      "present": boolean,
      "clarity": number,
      "shape": "straight" | "wavy" | "broken" | "absent"
    },
    "moneyLine": {
      "present": boolean,
      "clarity": number,
      "trianglePresent": boolean
    }
  },
  "mounts": {
    "jupiter": { "development": number },
    "saturn": { "development": number },
    "apollo": { "development": number },
    "mercury": { "development": number },
    "venus": { "development": number },
    "moon": { "development": number },
    "marsPositive": { "development": number },
    "marsNegative": { "development": number }
  },
  "specialMarks": {
    "stars": [{ "location": string }],
    "crosses": [{ "location": string }],
    "triangles": [{ "location": string }],
    "islands": [{ "location": string }],
    "chains": [{ "location": string }],
    "squares": [{ "location": string }],
    "mSign": boolean,
    "simianLine": boolean,
    "mysticCross": boolean,
    "fishSign": [{ "location": string }],
    "trident": [{ "location": string }]
  }
}`;

// Grok 해석 프롬프트 생성 함수
export const getGrokPrompt = (analysis: any) => `당신은 전문 손금 분석가입니다. 아래 손금 분석 데이터를 기반으로 상세하고 통찰력 있는 해석을 제공해주세요.

## 손금 분석 데이터
${JSON.stringify(analysis, null, 2)}

## 해석 지침
1. 모든 해석은 한국어로 작성하세요.
2. 긍정적인 측면을 먼저 언급하세요.
3. 부정적인 측면은 조언의 형태로 완화해서 전달하세요.
4. "~일 수 있습니다", "~경향이 있습니다" 등 조심스러운 표현을 사용하세요.
5. 구체적이고 개인화된 해석을 제공하세요.
6. 손 형태(element)에 따른 성격 특성을 반영하세요.
7. 각 선의 깊이, 길이, 선명도를 종합적으로 고려하세요.

## 반환 형식 (JSON)
다음 형식의 JSON만 반환하세요. 다른 텍스트 없이 JSON만 반환해야 합니다:
{
  "personality": {
    "summary": "성격 요약 (2-3문장)",
    "strengths": ["강점1", "강점2", "강점3"],
    "challenges": ["개선점1", "개선점2"],
    "hiddenTalents": ["숨겨진 재능1", "숨겨진 재능2"],
    "detailedAnalysis": "상세 성격 분석 (3-4문장)"
  },
  "loveReading": {
    "currentStatus": "현재 연애운 상태",
    "loveStyle": "사랑 스타일 설명",
    "idealPartner": "이상적인 파트너 유형",
    "marriageProspect": "결혼 전망",
    "timing": "좋은 시기 예측",
    "advice": "연애 조언",
    "score": 1-100
  },
  "careerReading": {
    "naturalTalents": ["재능1", "재능2", "재능3"],
    "suitableCareers": ["직업1", "직업2", "직업3", "직업4", "직업5"],
    "workStyle": "업무 스타일 설명",
    "leadershipPotential": "리더십 잠재력",
    "businessAbility": "사업 능력",
    "careerAdvice": "커리어 조언",
    "score": 1-100
  },
  "wealthReading": {
    "moneyMakingAbility": "돈 버는 능력 설명",
    "savingTendency": "저축 성향",
    "investmentStyle": "투자 스타일",
    "luckyFields": ["행운의 분야1", "행운의 분야2"],
    "financialAdvice": "재정 조언",
    "wealthPotential": "부의 잠재력",
    "score": 1-100
  },
  "healthReading": {
    "strongPoints": ["건강한 부분1", "건강한 부분2"],
    "concernAreas": ["주의할 부분1", "주의할 부분2"],
    "stressManagement": "스트레스 관리 능력",
    "recommendations": ["건강 권장사항1", "건강 권장사항2", "건강 권장사항3"],
    "score": 1-100
  },
  "lifePath": {
    "earlyLife": "초년운 (0-30세) 설명",
    "middleLife": "중년운 (30-50세) 설명",
    "laterLife": "말년운 (50세 이후) 설명",
    "majorTurningPoints": ["전환점1", "전환점2"],
    "lifeTheme": "인생의 주요 테마"
  },
  "advice": {
    "immediate": "즉시 실천할 조언",
    "shortTerm": "단기적 조언 (1-3개월)",
    "longTerm": "장기적 조언 (1년 이상)",
    "warnings": ["주의사항1", "주의사항2"],
    "affirmation": "오늘의 긍정 확언"
  },
  "luckyElements": {
    "colors": ["행운의 색1", "행운의 색2"],
    "numbers": [숫자1, 숫자2, 숫자3],
    "directions": ["행운의 방향1", "행운의 방향2"],
    "stones": ["행운의 보석1", "행운의 보석2"],
    "days": ["행운의 요일1", "행운의 요일2"]
  },
  "overallScore": 1-100,
  "specialNotes": "특별히 주목할 점 (M자 손금, 특수 기호 등이 있다면 언급)"
}`;

// API 키 검증 함수
export function validateApiKey(key: string | undefined, name: string): boolean {
  if (!key || key.trim() === '') {
    console.warn(`${name} API key is not configured`);
    return false;
  }
  return true;
}
