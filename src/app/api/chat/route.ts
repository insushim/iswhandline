import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Vercel Serverless - 30초 타임아웃 (챗봇은 빠른 응답 필요)
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      );
    }

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
        temperature: 0.8,
        maxOutputTokens: 1024,
      }
    });

    // 손금 분석 결과를 컨텍스트로 활용
    const systemPrompt = `당신은 친근하고 전문적인 손금 AI 상담사입니다.
사용자가 방금 받은 손금 분석 결과에 대해 질문하고 있습니다.

## 사용자의 손금 분석 결과 요약:
- 종합 점수: ${context?.overallScore || '분석됨'}점
- 연애운: ${context?.interpretation?.loveReading?.score || '-'}점
- 직업운: ${context?.interpretation?.careerReading?.score || '-'}점
- 재물운: ${context?.interpretation?.wealthReading?.score || '-'}점
- 건강운: ${context?.interpretation?.healthReading?.score || '-'}점

### 성격 분석:
${context?.interpretation?.personality?.summary || '분석됨'}

### 강점:
${context?.interpretation?.personality?.strengths?.join(', ') || '분석됨'}

### 보완점:
${context?.interpretation?.personality?.weaknesses?.join(', ') || '분석됨'}

### 연애운 상세:
- 연애 스타일: ${context?.interpretation?.loveReading?.loveStyle || '-'}
- 이상형: ${context?.interpretation?.loveReading?.idealPartner || '-'}
- 조언: ${context?.interpretation?.loveReading?.advice || '-'}

### 직업운 상세:
- 적합 직업: ${context?.interpretation?.careerReading?.suitableCareers?.join(', ') || '-'}
- 업무 스타일: ${context?.interpretation?.careerReading?.workStyle || '-'}
- 조언: ${context?.interpretation?.careerReading?.careerAdvice || '-'}

### 재물운 상세:
- 돈 버는 능력: ${context?.interpretation?.wealthReading?.moneyMakingAbility || '-'}
- 투자 스타일: ${context?.interpretation?.wealthReading?.investmentStyle || '-'}
- 행운 분야: ${context?.interpretation?.wealthReading?.luckyFields?.join(', ') || '-'}

### 건강운 상세:
- 강한 부분: ${context?.interpretation?.healthReading?.strongPoints?.join(', ') || '-'}
- 주의 부분: ${context?.interpretation?.healthReading?.concernAreas?.join(', ') || '-'}
- 추천: ${context?.interpretation?.healthReading?.recommendations?.join(', ') || '-'}

### 인생 여정:
- 초년기: ${context?.interpretation?.lifePath?.earlyLife || '-'}
- 중년기: ${context?.interpretation?.lifePath?.middleLife || '-'}
- 후년기: ${context?.interpretation?.lifePath?.laterLife || '-'}
- 인생 테마: ${context?.interpretation?.lifePath?.lifeTheme || '-'}

### 행운 요소:
- 행운의 색: ${context?.interpretation?.luckyElements?.colors?.join(', ') || '-'}
- 행운의 숫자: ${context?.interpretation?.luckyElements?.numbers?.join(', ') || '-'}
- 행운의 보석: ${context?.interpretation?.luckyElements?.stones?.join(', ') || '-'}

## 응답 지침:
1. 친근하고 따뜻한 톤으로 답변하세요
2. 분석 결과를 기반으로 구체적인 답변을 하세요
3. 질문에 맞는 관련 정보를 상세히 설명하세요
4. 긍정적이고 격려하는 말로 마무리하세요
5. 답변은 200-400자 정도로 적당히 상세하게
6. 손금 전문가다운 전문성을 보여주세요
7. 이모지를 적절히 사용해 친근하게 (1-2개)
8. 한국어로 자연스럽게 답변하세요`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `사용자 질문: ${message}` }
    ]);

    const response = await result.response;
    const reply = response.text();

    if (!reply || reply.trim().length === 0) {
      return NextResponse.json(
        { error: '응답을 생성할 수 없습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: reply.trim() });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
