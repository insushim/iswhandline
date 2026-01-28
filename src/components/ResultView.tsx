'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hand, Heart, Briefcase, Coins, Activity, Star,
  ArrowLeft, Share2,
  Sparkles, AlertTriangle, MapPin, Gem, Volume2, VolumeX, Pause, Play,
  MessageCircle, Send, Bot, User, Loader2, Clock, Target, TrendingUp, ChevronDown
} from 'lucide-react';
import type { Reading } from '@/lib/storage';

interface ResultViewProps {
  reading: Reading;
  onBack: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ResultView({ reading, onBack }: ResultViewProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 챗봇 상태
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { interpretation, analysis, overallScore } = reading;

  // 음성 합성 정리
  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // 챗봇 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // 챗봇 초기 메시지
  useEffect(() => {
    if (showChatbot && chatMessages.length === 0) {
      setChatMessages([{
        role: 'assistant',
        content: `안녕하세요! 저는 손금 분석 AI 상담사입니다. 🔮\n\n방금 분석한 당신의 손금에 대해 궁금한 점이 있으시면 무엇이든 물어보세요!\n\n예시 질문:\n• "내 연애운이 왜 ${interpretation?.loveReading?.score || 75}점인가요?"\n• "직업 추천 이유가 뭔가요?"\n• "건강에서 주의할 점은?"\n• "재물운을 높이려면?"`
      }]);
    }
  }, [showChatbot]);

  // TTS 기능
  const speak = (text: string, sectionId?: string) => {
    if (!('speechSynthesis' in window)) {
      alert('이 브라우저는 음성 읽기를 지원하지 않습니다.');
      return;
    }

    // 이미 재생 중이면 중지
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      if (currentSection === sectionId) {
        setIsSpeaking(false);
        setCurrentSection(null);
        return;
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // 한국어 음성 찾기
    const voices = speechSynthesis.getVoices();
    const koreanVoice = voices.find(v => v.lang.includes('ko'));
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentSection(sectionId || null);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSection(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSection(null);
    };

    speechRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const pauseResume = () => {
    if (speechSynthesis.speaking) {
      if (isPaused) {
        speechSynthesis.resume();
        setIsPaused(false);
      } else {
        speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentSection(null);
  };

  // 전체 결과 읽기 텍스트 생성 (모든 섹션 포함)
  const generateFullReadingText = () => {
    let text = `손금 분석 결과를 처음부터 끝까지 알려드리겠습니다. `;
    text += `종합 점수는 100점 만점에 ${overallScore}점입니다. `;

    // 1. 성격 분석
    text += `첫 번째, 성격 분석입니다. `;
    if (interpretation?.personality?.summary) {
      text += `${interpretation.personality.summary} `;
    }
    if (interpretation?.personality?.detailedAnalysis) {
      text += `${interpretation.personality.detailedAnalysis} `;
    }
    if (interpretation?.personality?.strengths?.length > 0) {
      text += `당신의 강점은 ${interpretation.personality.strengths.join(', ')} 입니다. `;
    }
    if (interpretation?.personality?.weaknesses?.length > 0) {
      text += `보완할 점은 ${interpretation.personality.weaknesses.join(', ')} 입니다. `;
    }
    if (interpretation?.personality?.hiddenTalents?.length > 0) {
      text += `숨겨진 재능으로는 ${interpretation.personality.hiddenTalents.join(', ')} 이 있습니다. `;
    }

    // 2. 연애운
    text += `두 번째, 연애운입니다. 점수는 ${interpretation?.loveReading?.score || 0}점입니다. `;
    if (interpretation?.loveReading?.currentStatus) {
      text += `현재 연애 상태: ${interpretation.loveReading.currentStatus} `;
    }
    if (interpretation?.loveReading?.loveStyle) {
      text += `${interpretation.loveReading.loveStyle} `;
    }
    if (interpretation?.loveReading?.idealPartner) {
      text += `이상적인 파트너: ${interpretation.loveReading.idealPartner} `;
    }
    if (interpretation?.loveReading?.marriageProspect) {
      text += `결혼 전망: ${interpretation.loveReading.marriageProspect} `;
    }
    if (interpretation?.loveReading?.advice) {
      text += `연애 조언: ${interpretation.loveReading.advice} `;
    }

    // 3. 직업운
    text += `세 번째, 직업운입니다. 점수는 ${interpretation?.careerReading?.score || 0}점입니다. `;
    if (interpretation?.careerReading?.workStyle) {
      text += `${interpretation.careerReading.workStyle} `;
    }
    if (interpretation?.careerReading?.naturalTalents?.length > 0) {
      text += `타고난 재능은 ${interpretation.careerReading.naturalTalents.join(', ')} 입니다. `;
    }
    if (interpretation?.careerReading?.suitableCareers?.length > 0) {
      text += `적합한 직업으로는 ${interpretation.careerReading.suitableCareers.join(', ')} 등이 있습니다. `;
    }
    if (interpretation?.careerReading?.leadershipPotential) {
      text += `리더십 잠재력: ${interpretation.careerReading.leadershipPotential} `;
    }
    if (interpretation?.careerReading?.careerAdvice) {
      text += `커리어 조언: ${interpretation.careerReading.careerAdvice} `;
    }

    // 4. 재물운
    text += `네 번째, 재물운입니다. 점수는 ${interpretation?.wealthReading?.score || 0}점입니다. `;
    if (interpretation?.wealthReading?.moneyMakingAbility) {
      text += `${interpretation.wealthReading.moneyMakingAbility} `;
    }
    if (interpretation?.wealthReading?.savingTendency) {
      text += `저축 성향: ${interpretation.wealthReading.savingTendency} `;
    }
    if (interpretation?.wealthReading?.investmentStyle) {
      text += `투자 스타일: ${interpretation.wealthReading.investmentStyle} `;
    }
    if (interpretation?.wealthReading?.luckyFields?.length > 0) {
      text += `행운의 분야는 ${interpretation.wealthReading.luckyFields.join(', ')} 입니다. `;
    }
    if (interpretation?.wealthReading?.financialAdvice) {
      text += `재정 조언: ${interpretation.wealthReading.financialAdvice} `;
    }

    // 5. 건강운
    text += `다섯 번째, 건강운입니다. 점수는 ${interpretation?.healthReading?.score || 0}점입니다. `;
    if (interpretation?.healthReading?.strongPoints?.length > 0) {
      text += `건강한 부분은 ${interpretation.healthReading.strongPoints.join(', ')} 입니다. `;
    }
    if (interpretation?.healthReading?.concernAreas?.length > 0) {
      text += `주의할 부분은 ${interpretation.healthReading.concernAreas.join(', ')} 입니다. `;
    }
    if (interpretation?.healthReading?.stressManagement) {
      text += `스트레스 관리: ${interpretation.healthReading.stressManagement} `;
    }
    if (interpretation?.healthReading?.recommendations?.length > 0) {
      text += `건강 권장사항: ${interpretation.healthReading.recommendations.join('. ')} `;
    }

    // 6. 인생 여정
    text += `여섯 번째, 인생 여정입니다. `;
    if (interpretation?.lifePath?.earlyLife) {
      text += `초년기: ${interpretation.lifePath.earlyLife} `;
    }
    if (interpretation?.lifePath?.middleLife) {
      text += `중년기: ${interpretation.lifePath.middleLife} `;
    }
    if (interpretation?.lifePath?.laterLife) {
      text += `후년기: ${interpretation.lifePath.laterLife} `;
    }
    if (interpretation?.lifePath?.lifeTheme) {
      text += `인생 테마: ${interpretation.lifePath.lifeTheme} `;
    }

    // 7. 행운의 요소
    text += `일곱 번째, 행운의 요소입니다. `;
    if (interpretation?.luckyElements?.colors?.length > 0) {
      text += `행운의 색상은 ${interpretation.luckyElements.colors.join(', ')} 입니다. `;
    }
    if (interpretation?.luckyElements?.numbers?.length > 0) {
      text += `행운의 숫자는 ${interpretation.luckyElements.numbers.join(', ')} 입니다. `;
    }
    if (interpretation?.luckyElements?.directions?.length > 0) {
      text += `행운의 방향은 ${interpretation.luckyElements.directions.join(', ')} 입니다. `;
    }

    // 8. 조언
    text += `마지막으로, 조언입니다. `;
    if (interpretation?.advice?.immediate) {
      text += `즉시 실천할 것: ${interpretation.advice.immediate} `;
    }
    if (interpretation?.advice?.shortTerm) {
      text += `단기 조언: ${interpretation.advice.shortTerm} `;
    }
    if (interpretation?.advice?.longTerm) {
      text += `장기 조언: ${interpretation.advice.longTerm} `;
    }
    if (interpretation?.advice?.affirmation) {
      text += `오늘의 긍정 확언: ${interpretation.advice.affirmation}`;
    }

    text += ` 이상으로 손금 분석을 마칩니다. 감사합니다.`;

    return text;
  };

  const ScoreCircle = ({ score, size = 'large', label }: { score: number; size?: string; label?: string }) => {
    const getScoreColor = (s: number) => {
      if (s >= 80) return 'text-green-400';
      if (s >= 60) return 'text-amber-400';
      if (s >= 40) return 'text-orange-400';
      return 'text-red-400';
    };

    const isLarge = size === 'large';
    const svgSize = isLarge ? 160 : 80;
    const strokeWidth = isLarge ? 8 : 4;
    const radius = (svgSize / 2) - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const center = svgSize / 2;

    return (
      <div className={`relative ${isLarge ? 'w-40 h-40' : 'w-20 h-20'}`}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="transform -rotate-90"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-purple-900"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className={getScoreColor(score)}
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${isLarge ? 'text-4xl' : 'text-lg'} font-bold text-white`}>
            {score}
          </span>
          {label && <span className="text-xs text-purple-300 mt-1">{label}</span>}
        </div>
      </div>
    );
  };

  // 섹션 카드 컴포넌트 (펼침/접힘 없이 항상 표시)
  const Section = ({
    title,
    icon: Icon,
    children,
    color = 'purple',
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
    color?: string;
  }) => {
    const colorClasses: Record<string, string> = {
      purple: 'border-purple-500/30',
      pink: 'border-pink-500/30',
      blue: 'border-blue-500/30',
      yellow: 'border-yellow-500/30',
      green: 'border-green-500/30',
      amber: 'border-amber-500/30',
    };

    const iconColors: Record<string, string> = {
      purple: 'text-purple-400',
      pink: 'text-pink-400',
      blue: 'text-blue-400',
      yellow: 'text-yellow-400',
      green: 'text-green-400',
      amber: 'text-amber-400',
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/5 backdrop-blur-sm rounded-2xl border ${colorClasses[color]} overflow-hidden`}
      >
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Icon className={`w-6 h-6 ${iconColors[color]}`} />
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <div className="p-4">
          {children}
        </div>
      </motion.div>
    );
  };

  // 챗봇 메시지 전송
  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          context: {
            overallScore,
            interpretation,
            analysis
          }
        })
      });

      const data = await response.json();

      if (data.error) {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.'
        }]);
      } else {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply
        }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'PalmSeer AI - 내 손금 분석 결과',
      text: `내 손금 점수: ${overallScore}점\n${interpretation?.personality?.summary || ''}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
      alert('결과가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-200 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>새로 분석하기</span>
          </button>
          <div className="flex items-center gap-2">
            {/* TTS 전체 읽기 버튼 */}
            <button
              onClick={() => speak(generateFullReadingText(), 'full')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                currentSection === 'full' && isSpeaking
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-white/10 hover:bg-white/20 text-purple-200'
              }`}
              title="전체 결과 음성으로 듣기"
            >
              <Volume2 className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">전체 읽기</span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-white/10 transition text-purple-200"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* TTS 컨트롤 바 */}
      {isSpeaking && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-[57px] z-40 bg-amber-500 px-4 py-2"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-slate-900 animate-pulse" />
              <span className="text-slate-900 font-medium text-sm">손금 분석을 읽어주는 중...</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={pauseResume}
                className="p-2 rounded-lg bg-slate-900/20 hover:bg-slate-900/30 transition"
              >
                {isPaused ? <Play className="w-4 h-4 text-slate-900" /> : <Pause className="w-4 h-4 text-slate-900" />}
              </button>
              <button
                onClick={stopSpeaking}
                className="p-2 rounded-lg bg-slate-900/20 hover:bg-slate-900/30 transition"
              >
                <VolumeX className="w-4 h-4 text-slate-900" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Score Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-6">당신의 손금 분석 결과</h1>

          <div className="flex justify-center mb-6">
            <ScoreCircle score={overallScore} />
          </div>

          <p className="text-purple-200 mb-8">
            {overallScore >= 80 && '매우 좋은 손금입니다! 많은 행운이 함께합니다.'}
            {overallScore >= 60 && overallScore < 80 && '좋은 손금입니다. 노력하면 좋은 결과가 있을 것입니다.'}
            {overallScore >= 40 && overallScore < 60 && '평균적인 손금입니다. 조언을 참고하세요.'}
            {overallScore < 40 && '도전이 있을 수 있지만, 노력으로 극복할 수 있습니다.'}
          </p>

          {/* Category Scores */}
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <ScoreCircle score={interpretation?.loveReading?.score || 0} size="small" />
              <span className="text-xs text-pink-300 mt-2">연애</span>
            </div>
            <div className="flex flex-col items-center">
              <ScoreCircle score={interpretation?.careerReading?.score || 0} size="small" />
              <span className="text-xs text-blue-300 mt-2">직업</span>
            </div>
            <div className="flex flex-col items-center">
              <ScoreCircle score={interpretation?.wealthReading?.score || 0} size="small" />
              <span className="text-xs text-yellow-300 mt-2">재물</span>
            </div>
            <div className="flex flex-col items-center">
              <ScoreCircle score={interpretation?.healthReading?.score || 0} size="small" />
              <span className="text-xs text-green-300 mt-2">건강</span>
            </div>
          </div>
        </motion.div>

        {/* 1. 손 형태 & 손가락 분석 */}
        <Section title="1. 손 형태 & 손가락 분석" icon={Hand} color="purple">
          <div className="space-y-4">
            {/* 손 형태 */}
            {analysis?.handShape && (
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">
                    {analysis.handShape.type === 'fire' ? '🔥' :
                     analysis.handShape.type === 'earth' ? '🌍' :
                     analysis.handShape.type === 'air' ? '💨' :
                     analysis.handShape.type === 'water' ? '💧' : '✋'}
                  </span>
                  <h4 className="font-bold text-purple-300">
                    {analysis.handShape.type === 'fire' ? '불의 손 (Fire Hand)' :
                     analysis.handShape.type === 'earth' ? '땅의 손 (Earth Hand)' :
                     analysis.handShape.type === 'air' ? '공기의 손 (Air Hand)' :
                     analysis.handShape.type === 'water' ? '물의 손 (Water Hand)' :
                     '손 형태 분석'}
                  </h4>
                </div>
                <p className="text-purple-200 text-sm">{analysis.handShape.description}</p>
              </div>
            )}

            {/* 손가락 종합 */}
            {analysis?.fingers?.overallFingerMeaning && (
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <h4 className="text-sm font-medium text-indigo-400 mb-2">손가락 종합 해석</h4>
                <p className="text-purple-200 text-sm">{analysis.fingers.overallFingerMeaning}</p>
              </div>
            )}

            {/* 개별 손가락 */}
            {analysis?.fingers && (
              <div className="grid gap-3 md:grid-cols-2">
                {analysis.fingers.thumb?.meaning && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">👍</span>
                      <h4 className="text-sm font-medium text-amber-400">엄지 (의지력)</h4>
                      {analysis.fingers.thumb.length && (
                        <span className="text-xs text-purple-400 ml-auto">
                          {analysis.fingers.thumb.length === 'long' ? '긴 편' :
                           analysis.fingers.thumb.length === 'short' ? '짧은 편' : '보통'}
                        </span>
                      )}
                    </div>
                    <p className="text-purple-200 text-xs">{analysis.fingers.thumb.meaning}</p>
                  </div>
                )}
                {analysis.fingers.index?.meaning && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">☝️</span>
                      <h4 className="text-sm font-medium text-blue-400">검지 (야망/리더십)</h4>
                      {analysis.fingers.index.comparedToRing && (
                        <span className="text-xs text-purple-400 ml-auto">
                          약지보다 {analysis.fingers.index.comparedToRing === 'longer' ? '긴' :
                                    analysis.fingers.index.comparedToRing === 'shorter' ? '짧은' : '같은'} 편
                        </span>
                      )}
                    </div>
                    <p className="text-purple-200 text-xs">{analysis.fingers.index.meaning}</p>
                  </div>
                )}
                {analysis.fingers.middle?.meaning && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">🖐️</span>
                      <h4 className="text-sm font-medium text-green-400">중지 (책임/균형)</h4>
                    </div>
                    <p className="text-purple-200 text-xs">{analysis.fingers.middle.meaning}</p>
                  </div>
                )}
                {analysis.fingers.ring?.meaning && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">💍</span>
                      <h4 className="text-sm font-medium text-pink-400">약지 (창의/예술)</h4>
                      {analysis.fingers.ring.comparedToIndex && (
                        <span className="text-xs text-purple-400 ml-auto">
                          검지보다 {analysis.fingers.ring.comparedToIndex === 'longer' ? '긴' :
                                    analysis.fingers.ring.comparedToIndex === 'shorter' ? '짧은' : '같은'} 편
                        </span>
                      )}
                    </div>
                    <p className="text-purple-200 text-xs">{analysis.fingers.ring.meaning}</p>
                  </div>
                )}
                {analysis.fingers.pinky?.meaning && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">🤙</span>
                      <h4 className="text-sm font-medium text-cyan-400">새끼손가락 (소통/사업)</h4>
                      {analysis.fingers.pinky.length && (
                        <span className="text-xs text-purple-400 ml-auto">
                          {analysis.fingers.pinky.length === 'long' ? '긴 편' :
                           analysis.fingers.pinky.length === 'short' ? '짧은 편' : '보통'}
                        </span>
                      )}
                    </div>
                    <p className="text-purple-200 text-xs">{analysis.fingers.pinky.meaning}</p>
                  </div>
                )}
              </div>
            )}

            {/* 손가락 간격 & 마디 */}
            {(analysis?.fingers?.gaps?.meaning || analysis?.fingers?.knuckles) && (
              <div className="grid gap-3 md:grid-cols-2">
                {analysis.fingers.gaps?.meaning && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-medium text-purple-400 mb-1">손가락 간격</h4>
                    <p className="text-purple-200 text-xs">{analysis.fingers.gaps.meaning}</p>
                  </div>
                )}
                {analysis.fingers.knuckles && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-medium text-purple-400 mb-1">손가락 마디</h4>
                    <p className="text-purple-200 text-xs">
                      {analysis.fingers.knuckles === 'prominent' ? '마디가 두드러짐 - 분석적, 논리적 사고' :
                       analysis.fingers.knuckles === 'smooth' ? '매끈한 마디 - 직관적, 감성적 사고' :
                       analysis.fingers.knuckles}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Section>

        {/* 2. 손목선(팔찌선) 분석 */}
        {analysis?.wristLines && analysis.wristLines.count !== 'unknown' && (
          <Section title="2. 손목선 (팔찌선)" icon={Activity} color="green">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-green-400">{analysis.wristLines.count}</span>
                  <span className="text-[10px] text-green-300">줄</span>
                </div>
                <div className="flex-1">
                  <p className="text-purple-200 text-sm">{analysis.wristLines.meaning}</p>
                </div>
              </div>

              {analysis.wristLines.description && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <h4 className="text-sm font-medium text-green-400 mb-1">상세 설명</h4>
                  <p className="text-purple-200 text-sm">{analysis.wristLines.description}</p>
                </div>
              )}

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-medium text-green-400 mb-1">선명도</h4>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(level => (
                      <div
                        key={level}
                        className={`w-8 h-2 rounded-full ${
                          analysis.wristLines.clarity === 'clear' ? 'bg-green-400' :
                          analysis.wristLines.clarity === 'faint' && level <= 1 ? 'bg-yellow-400' :
                          analysis.wristLines.clarity === 'broken' && level <= 2 ? 'bg-orange-400' :
                          level <= (analysis.wristLines.clarity === 'clear' ? 3 :
                                    analysis.wristLines.clarity === 'faint' ? 1 : 2) ? 'bg-green-400' :
                          'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-purple-300">
                    {analysis.wristLines.clarity === 'clear' ? '선명함' :
                     analysis.wristLines.clarity === 'faint' ? '희미함' :
                     analysis.wristLines.clarity === 'broken' ? '끊김 있음' :
                     analysis.wristLines.clarity}
                  </span>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* 3. 성격 분석 */}
        <Section title="3. 성격 분석" icon={Sparkles} color="purple">
          <div className="space-y-4">
            <p className="text-purple-200 leading-relaxed">{interpretation?.personality?.summary || '분석 결과를 불러오는 중입니다.'}</p>

            {interpretation?.personality?.detailedAnalysis && (
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-200 text-sm leading-relaxed">{interpretation.personality.detailedAnalysis}</p>
              </div>
            )}

            {interpretation?.personality?.strengths?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> 강점
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interpretation.personality.strengths.map((s: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {interpretation?.personality?.weaknesses?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-orange-400 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> 보완할 점
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interpretation.personality.weaknesses.map((w: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                      △ {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {interpretation?.personality?.hiddenTalents?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-pink-400 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" /> 숨겨진 재능
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interpretation.personality.hiddenTalents.map((t: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                      ★ {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* 4. 연애운 */}
        <Section title="4. 연애운" icon={Heart} color="pink">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <ScoreCircle score={interpretation?.loveReading?.score || 0} size="small" />
              <div className="flex-1">
                <p className="text-purple-200">{interpretation?.loveReading?.currentStatus || '-'}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-pink-400 mb-1">연애 스타일</h4>
                <p className="text-purple-200 text-sm">{interpretation?.loveReading?.loveStyle || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-pink-400 mb-1">이상적인 파트너</h4>
                <p className="text-purple-200 text-sm">{interpretation?.loveReading?.idealPartner || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-pink-400 mb-1">결혼 전망</h4>
                <p className="text-purple-200 text-sm">{interpretation?.loveReading?.marriageProspect || '-'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
              <h4 className="text-sm font-medium text-pink-400 mb-1">💕 연애 조언</h4>
              <p className="text-purple-200">{interpretation?.loveReading?.advice || '-'}</p>
            </div>
          </div>
        </Section>

        {/* 5. 직업운 */}
        <Section title="5. 직업운" icon={Briefcase} color="blue">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <ScoreCircle score={interpretation?.careerReading?.score || 0} size="small" />
              <div className="flex-1">
                <p className="text-purple-200">{interpretation?.careerReading?.workStyle || '-'}</p>
              </div>
            </div>

            {interpretation?.careerReading?.naturalTalents?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-2">타고난 재능</h4>
                <div className="flex flex-wrap gap-2">
                  {interpretation.careerReading.naturalTalents.map((t: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {interpretation?.careerReading?.suitableCareers?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-2">적합한 직업</h4>
                <div className="flex flex-wrap gap-2">
                  {interpretation.careerReading.suitableCareers.map((c: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-1">리더십 잠재력</h4>
              <p className="text-purple-200 text-sm">{interpretation?.careerReading?.leadershipPotential || '-'}</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <h4 className="text-sm font-medium text-blue-400 mb-1">💼 커리어 조언</h4>
              <p className="text-purple-200">{interpretation?.careerReading?.careerAdvice || '-'}</p>
            </div>
          </div>
        </Section>

        {/* 6. 재물운 */}
        <Section title="6. 재물운" icon={Coins} color="yellow">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <ScoreCircle score={interpretation?.wealthReading?.score || 0} size="small" />
              <div className="flex-1">
                <p className="text-purple-200">{interpretation?.wealthReading?.moneyMakingAbility || '-'}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">저축 성향</h4>
                <p className="text-purple-200 text-sm">{interpretation?.wealthReading?.savingTendency || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">투자 스타일</h4>
                <p className="text-purple-200 text-sm">{interpretation?.wealthReading?.investmentStyle || '-'}</p>
              </div>
            </div>

            {interpretation?.wealthReading?.luckyFields?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-2">행운의 분야</h4>
                <div className="flex flex-wrap gap-2">
                  {interpretation.wealthReading.luckyFields.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <h4 className="text-sm font-medium text-yellow-400 mb-1">💰 재정 조언</h4>
              <p className="text-purple-200">{interpretation?.wealthReading?.financialAdvice || '-'}</p>
            </div>
          </div>
        </Section>

        {/* 7. 건강운 */}
        <Section title="7. 건강운" icon={Activity} color="green">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <ScoreCircle score={interpretation?.healthReading?.score || 0} size="small" />
              <div className="flex-1">
                <p className="text-purple-200">{interpretation?.healthReading?.stressManagement || '-'}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {interpretation?.healthReading?.strongPoints?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">건강한 부분</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation.healthReading.strongPoints.map((p: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {interpretation?.healthReading?.concernAreas?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-orange-400 mb-2">주의할 부분</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation.healthReading.concernAreas.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {interpretation?.healthReading?.recommendations?.length > 0 && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <h4 className="text-sm font-medium text-green-400 mb-2">🏃 건강 권장사항</h4>
                <ul className="space-y-1">
                  {interpretation.healthReading.recommendations.map((r: string, i: number) => (
                    <li key={i} className="text-purple-200 text-sm">• {r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        {/* 8. 인생 여정 */}
        <Section title="8. 인생 여정" icon={Clock} color="blue">
          <div className="space-y-4">
            <div className="relative pl-6 border-l-2 border-blue-500/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <h4 className="text-blue-400 font-medium mb-1">초년기 (10-30대)</h4>
              <p className="text-purple-200 text-sm">{interpretation?.lifePath?.earlyLife || '-'}</p>
            </div>
            <div className="relative pl-6 border-l-2 border-purple-500/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
              <h4 className="text-purple-400 font-medium mb-1">중년기 (30-50대)</h4>
              <p className="text-purple-200 text-sm">{interpretation?.lifePath?.middleLife || '-'}</p>
            </div>
            <div className="relative pl-6 border-l-2 border-amber-500/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500"></div>
              <h4 className="text-amber-400 font-medium mb-1">후년기 (50대 이후)</h4>
              <p className="text-purple-200 text-sm">{interpretation?.lifePath?.laterLife || '-'}</p>
            </div>

            {interpretation?.lifePath?.majorTurningPoints && interpretation.lifePath.majorTurningPoints.length > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-amber-400 font-medium mb-2">주요 전환점</h4>
                <ul className="space-y-1">
                  {interpretation.lifePath.majorTurningPoints.map((point: string, i: number) => (
                    <li key={i} className="text-purple-200 text-sm">• {point}</li>
                  ))}
                </ul>
              </div>
            )}

            {interpretation?.lifePath?.lifeTheme && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <h4 className="text-purple-300 font-medium mb-1">인생 테마</h4>
                <p className="text-white font-medium text-lg">"{interpretation.lifePath.lifeTheme}"</p>
              </div>
            )}
          </div>
        </Section>

        {/* 9. 행운의 요소 */}
        <Section title="9. 행운의 요소" icon={Star} color="amber">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xs">색</span>
              </div>
              <div>
                <p className="text-xs text-purple-400">행운의 색상</p>
                <p className="text-white">{interpretation?.luckyElements?.colors?.join(', ') || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <span className="text-white text-xs">#</span>
              </div>
              <div>
                <p className="text-xs text-purple-400">행운의 숫자</p>
                <p className="text-white">{interpretation?.luckyElements?.numbers?.join(', ') || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-10 h-10 text-blue-400" />
              <div>
                <p className="text-xs text-purple-400">행운의 방향</p>
                <p className="text-white">{interpretation?.luckyElements?.directions?.join(', ') || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gem className="w-10 h-10 text-purple-400" />
              <div>
                <p className="text-xs text-purple-400">행운의 보석</p>
                <p className="text-white">{interpretation?.luckyElements?.stones?.join(', ') || '-'}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 10. 맞춤 조언 */}
        <Section title="10. 맞춤 조언" icon={AlertTriangle} color="amber">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="text-sm font-medium text-amber-400 mb-1">⚡ 즉시 실천</h4>
              <p className="text-purple-200">{interpretation?.advice?.immediate || '-'}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <h4 className="text-sm font-medium text-blue-400 mb-1">📅 단기 조언 (1-3개월)</h4>
              <p className="text-purple-200">{interpretation?.advice?.shortTerm || '-'}</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <h4 className="text-sm font-medium text-purple-400 mb-1">🎯 장기 조언 (1년 이상)</h4>
              <p className="text-purple-200">{interpretation?.advice?.longTerm || '-'}</p>
            </div>
            {interpretation?.advice?.warnings?.length > 0 && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h4 className="text-sm font-medium text-red-400 mb-2">⚠️ 주의사항</h4>
                <ul className="space-y-1">
                  {interpretation.advice.warnings.map((w: string, i: number) => (
                    <li key={i} className="text-red-200 text-sm">• {w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        {/* 11. 특수 손금 분석 */}
        <Section title="11. 특수 손금 분석" icon={Sparkles} color="amber">
          <div className="space-y-4">
            {/* 막진손금/막손금 (Simian Line) */}
            {analysis?.specialMarks?.simianLine && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🐵</span>
                  <h4 className="text-lg font-bold text-red-400">막진손금 (관통선) 발견!</h4>
                  <span className="px-2 py-0.5 bg-red-500/30 text-red-300 text-xs rounded-full">희귀 1-4%</span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  {analysis.specialMarks.simianLineDescription || '두뇌선과 감정선이 하나로 합쳐진 매우 특별한 손금입니다.'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <span className="text-green-400 font-medium">✓ 강점</span>
                    <p className="text-green-200 mt-1">극도의 집중력, 강한 의지력, 전문 분야 성취</p>
                  </div>
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <span className="text-orange-400 font-medium">△ 주의</span>
                    <p className="text-orange-200 mt-1">유연성 부족, 흑백논리, 스트레스 관리</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 시드니선 */}
            {analysis?.specialMarks?.sydneyLine && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🧠</span>
                  <h4 className="font-bold text-blue-400">시드니선 발견</h4>
                  <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 text-xs rounded-full">5-10%</span>
                </div>
                <p className="text-purple-200 text-sm">
                  {analysis.specialMarks.sydneyLineDescription || '두뇌선이 손바닥 끝까지 연장되어 있습니다. 높은 지능과 분석력을 가졌으나 과잉 사고와 완벽주의 경향이 있습니다.'}
                </p>
              </div>
            )}

            {/* M자 손금 */}
            {analysis?.specialMarks?.mSign && (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💰</span>
                  <h4 className="font-bold text-yellow-400">M자 손금 발견</h4>
                  <span className="px-2 py-0.5 bg-yellow-500/30 text-yellow-300 text-xs rounded-full">희귀</span>
                </div>
                <p className="text-purple-200 text-sm">
                  {analysis.specialMarks.mSignDescription || '생명선, 두뇌선, 감정선, 운명선이 M자를 형성합니다. 뛰어난 직관력과 재물운, 자수성가 운이 있습니다.'}
                </p>
              </div>
            )}

            {/* 작가의 포크 */}
            {analysis?.specialMarks?.writersFork && (
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">✍️</span>
                  <h4 className="font-bold text-purple-400">작가의 포크 발견</h4>
                </div>
                <p className="text-purple-200 text-sm">
                  {analysis.specialMarks.writersForkDescription || '두뇌선 끝이 두 갈래로 갈라져 있습니다. 창의력과 논리력의 균형, 글쓰기 재능, 다재다능함을 나타냅니다.'}
                </p>
              </div>
            )}

            {/* 신비의 십자 */}
            {analysis?.specialMarks?.mysticCross && (
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔮</span>
                  <h4 className="font-bold text-indigo-400">신비의 십자 발견</h4>
                  <span className="px-2 py-0.5 bg-indigo-500/30 text-indigo-300 text-xs rounded-full">희귀</span>
                </div>
                <p className="text-purple-200 text-sm">
                  {analysis.specialMarks.mysticCrossDescription || '손바닥 중앙에 X자가 있습니다. 강한 직관력, 영적 능력, 예지력이 있으며 신비로운 경험을 할 가능성이 있습니다.'}
                </p>
              </div>
            )}

            {/* 솔로몬의 반지 */}
            {analysis?.specialMarks?.ringOfSolomon && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">👑</span>
                  <h4 className="font-bold text-amber-400">솔로몬의 반지 발견</h4>
                  <span className="px-2 py-0.5 bg-amber-500/30 text-amber-300 text-xs rounded-full">희귀</span>
                </div>
                <p className="text-purple-200 text-sm">
                  {analysis.specialMarks.ringOfSolomonDescription || '검지 아래 반원형 선이 있습니다. 타고난 지혜, 뛰어난 판단력, 리더십을 나타내며 교육자나 상담가에게 적합합니다.'}
                </p>
              </div>
            )}

            {/* 직감선 */}
            {analysis?.specialMarks?.lineOfIntuition && (
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">✨</span>
                  <h4 className="font-bold text-pink-400">직감선 발견</h4>
                  <span className="px-2 py-0.5 bg-pink-500/30 text-pink-300 text-xs rounded-full">매우 희귀</span>
                </div>
                <p className="text-purple-200 text-sm">
                  {analysis.specialMarks.lineOfIntuitionDescription || '월구에서 수성구 방향 반원형 선이 있습니다. 매우 강한 직관력과 예지력, 심리 분야에 탁월한 재능이 있습니다.'}
                </p>
              </div>
            )}

            {/* 금성대 */}
            {analysis?.specialMarks?.girdleOfVenus && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💕</span>
                  <h4 className="font-bold text-rose-400">금성대 발견</h4>
                  <span className="px-2 py-0.5 bg-rose-500/30 text-rose-300 text-xs rounded-full">드묾</span>
                </div>
                <p className="text-purple-200 text-sm">
                  {analysis.specialMarks.girdleOfVenusDescription || '감정선 위 반원형 선이 있습니다. 극도의 감수성과 예술적 기질, 깊은 감정을 나타내며 로맨틱하고 창의적입니다.'}
                </p>
              </div>
            )}

            {/* 특수 기호들 */}
            {(analysis?.specialMarks?.stars?.length > 0 ||
              analysis?.specialMarks?.crosses?.length > 0 ||
              analysis?.specialMarks?.triangles?.length > 0 ||
              analysis?.specialMarks?.squares?.length > 0) && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white mb-3">발견된 특수 기호</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  {analysis?.specialMarks?.stars?.length > 0 && (
                    <div className="p-2 bg-yellow-500/10 rounded-lg text-center">
                      <span className="text-xl">⭐</span>
                      <p className="text-yellow-300 text-xs mt-1">별 ({analysis.specialMarks.stars.length}개)</p>
                      <p className="text-purple-300 text-xs">행운/성공</p>
                    </div>
                  )}
                  {analysis?.specialMarks?.crosses?.length > 0 && (
                    <div className="p-2 bg-blue-500/10 rounded-lg text-center">
                      <span className="text-xl">✚</span>
                      <p className="text-blue-300 text-xs mt-1">십자 ({analysis.specialMarks.crosses.length}개)</p>
                      <p className="text-purple-300 text-xs">변화/시련</p>
                    </div>
                  )}
                  {analysis?.specialMarks?.triangles?.length > 0 && (
                    <div className="p-2 bg-green-500/10 rounded-lg text-center">
                      <span className="text-xl">△</span>
                      <p className="text-green-300 text-xs mt-1">삼각형 ({analysis.specialMarks.triangles.length}개)</p>
                      <p className="text-purple-300 text-xs">재능/성공</p>
                    </div>
                  )}
                  {analysis?.specialMarks?.squares?.length > 0 && (
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-center">
                      <span className="text-xl">□</span>
                      <p className="text-cyan-300 text-xs mt-1">사각형 ({analysis.specialMarks.squares.length}개)</p>
                      <p className="text-purple-300 text-xs">보호 표시</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 특수 손금 없음 */}
            {!analysis?.specialMarks?.simianLine &&
             !analysis?.specialMarks?.sydneyLine &&
             !analysis?.specialMarks?.mSign &&
             !analysis?.specialMarks?.writersFork &&
             !analysis?.specialMarks?.mysticCross &&
             !analysis?.specialMarks?.ringOfSolomon &&
             !analysis?.specialMarks?.lineOfIntuition &&
             !analysis?.specialMarks?.girdleOfVenus &&
             !(analysis?.specialMarks?.stars?.length > 0) &&
             !(analysis?.specialMarks?.crosses?.length > 0) &&
             !(analysis?.specialMarks?.triangles?.length > 0) &&
             !(analysis?.specialMarks?.squares?.length > 0) && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-purple-300">특수 손금이나 특별한 기호가 발견되지 않았습니다.</p>
                <p className="text-purple-400 text-sm mt-1">일반적인 손금 패턴을 가지고 있으며, 이것이 나쁜 것은 아닙니다.</p>
              </div>
            )}
          </div>
        </Section>

        {/* 특별 주목 */}
        {interpretation?.specialNotes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-bold text-amber-400">특별 주목</h3>
            </div>
            <p className="text-purple-200">{interpretation.specialNotes}</p>
          </motion.div>
        )}

        {/* 긍정 확언 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 text-center"
        >
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white mb-2">오늘의 긍정 확언</h4>
          <p className="text-amber-200 italic text-lg">"{interpretation?.advice?.affirmation || '나는 무한한 가능성을 가지고 있습니다.'}"</p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 text-center">
          <p className="text-xs text-purple-400">
            손금 분석은 재미와 자기 성찰을 위한 것입니다.
            이 분석은 과학적 근거가 없으며, 의학적, 법적, 재정적 조언을 대체할 수 없습니다.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center pb-24">
          <button
            onClick={onBack}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900
                       font-bold rounded-xl transition-all hover:scale-105"
          >
            다시 분석하기
          </button>
        </div>
      </div>

      {/* 챗봇 버튼 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
            showChatbot ? 'bg-red-500 hover:bg-red-400' : 'bg-amber-500 hover:bg-amber-400'
          }`}
        >
          {showChatbot ? (
            <ChevronDown className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-slate-900" />
          )}
        </button>
      </div>

      {/* 챗봇 패널 */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-4 left-4 md:left-auto md:w-96 z-50
                       bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-purple-500/30
                       shadow-2xl overflow-hidden"
            style={{ maxHeight: '60vh' }}
          >
            {/* 챗봇 헤더 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">손금 AI 상담사</h3>
                  <p className="text-xs text-purple-200">분석 결과에 대해 물어보세요</p>
                </div>
              </div>
            </div>

            {/* 채팅 메시지 영역 */}
            <div className="h-72 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-purple-400" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-white/10 text-purple-100'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-amber-400" />
                    </div>
                  )}
                </div>
              ))}
              {isChatLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="bg-white/10 rounded-2xl px-4 py-2">
                    <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-4 border-t border-purple-500/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="궁금한 점을 물어보세요..."
                  className="flex-1 bg-white/10 border border-purple-500/30 rounded-xl px-4 py-2
                             text-white placeholder-purple-400 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={sendChatMessage}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-gray-600
                             flex items-center justify-center transition"
                >
                  <Send className="w-5 h-5 text-slate-900" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
