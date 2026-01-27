'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hand, Heart, Briefcase, Coins, Activity, Star,
  ChevronDown, ChevronUp, ArrowLeft, Share2,
  Sparkles, AlertTriangle, MapPin, Gem, Volume2, VolumeX, Pause, Play,
  MessageCircle, Send, Bot, User, Loader2, Clock, Target, TrendingUp
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
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['personality']);
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

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

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

  // 전체 결과 읽기 텍스트 생성 (상세 버전)
  const generateFullReadingText = () => {
    let text = `손금 분석 결과를 알려드리겠습니다. `;
    text += `종합 점수는 100점 만점에 ${overallScore}점입니다. `;

    // 성격 분석
    if (interpretation?.personality?.summary) {
      text += `먼저 성격 분석입니다. ${interpretation.personality.summary} `;
    }

    if (interpretation?.personality?.strengths?.length > 0) {
      text += `당신의 강점은 ${interpretation.personality.strengths.slice(0, 3).join(', ')} 등이 있습니다. `;
    }

    // 연애운
    if (interpretation?.loveReading) {
      text += `연애운은 ${interpretation.loveReading.score}점입니다. `;
      if (interpretation.loveReading.loveStyle) {
        text += `${interpretation.loveReading.loveStyle} `;
      }
      if (interpretation.loveReading.advice) {
        text += `연애 조언: ${interpretation.loveReading.advice} `;
      }
    }

    // 직업운
    if (interpretation?.careerReading) {
      text += `직업운은 ${interpretation.careerReading.score}점입니다. `;
      if (interpretation.careerReading.workStyle) {
        text += `${interpretation.careerReading.workStyle} `;
      }
      if (interpretation.careerReading.suitableCareers?.length > 0) {
        text += `적합한 직업으로는 ${interpretation.careerReading.suitableCareers.slice(0, 3).join(', ')} 등이 있습니다. `;
      }
    }

    // 재물운
    if (interpretation?.wealthReading) {
      text += `재물운은 ${interpretation.wealthReading.score}점입니다. `;
      if (interpretation.wealthReading.moneyMakingAbility) {
        text += `${interpretation.wealthReading.moneyMakingAbility} `;
      }
    }

    // 건강운
    if (interpretation?.healthReading) {
      text += `건강운은 ${interpretation.healthReading.score}점입니다. `;
      if (interpretation.healthReading.stressManagement) {
        text += `${interpretation.healthReading.stressManagement} `;
      }
    }

    // 인생 여정
    if (interpretation?.lifePath?.lifeTheme) {
      text += `당신의 인생 테마는 "${interpretation.lifePath.lifeTheme}" 입니다. `;
    }

    // 조언
    if (interpretation?.advice?.immediate) {
      text += `마지막으로 조언입니다. ${interpretation.advice.immediate} `;
    }

    if (interpretation?.advice?.affirmation) {
      text += `오늘의 확언: ${interpretation.advice.affirmation}`;
    }

    return text;
  };

  const tabs = [
    { id: 'overview', label: '종합', icon: Star },
    { id: 'personality', label: '성격', icon: Sparkles },
    { id: 'love', label: '연애', icon: Heart },
    { id: 'career', label: '직업', icon: Briefcase },
    { id: 'wealth', label: '재물', icon: Coins },
    { id: 'health', label: '건강', icon: Activity },
    { id: 'advice', label: '조언', icon: AlertTriangle },
  ];

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

  const SectionCard = ({
    title,
    icon: Icon,
    children,
    id,
    color = 'purple',
    speakText
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
    id: string;
    color?: string;
    speakText?: string;
  }) => {
    const isExpanded = expandedSections.includes(id);
    const isCurrentlySpeaking = currentSection === id && isSpeaking;
    const colorClasses: Record<string, string> = {
      purple: 'border-purple-500/30 hover:border-purple-400/50',
      pink: 'border-pink-500/30 hover:border-pink-400/50',
      blue: 'border-blue-500/30 hover:border-blue-400/50',
      yellow: 'border-yellow-500/30 hover:border-yellow-400/50',
      green: 'border-green-500/30 hover:border-green-400/50',
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/5 backdrop-blur-sm rounded-2xl border ${colorClasses[color]} overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => toggleSection(id)}
            className="flex items-center gap-3 flex-1 hover:bg-white/5 transition"
          >
            <Icon className={`w-6 h-6 text-${color}-400`} />
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </button>
          <div className="flex items-center gap-2">
            {speakText && (
              <button
                onClick={() => speak(speakText, id)}
                className={`p-2 rounded-lg transition ${
                  isCurrentlySpeaking
                    ? 'bg-amber-500 text-slate-900'
                    : 'hover:bg-white/10 text-purple-300'
                }`}
                title={isCurrentlySpeaking ? '읽기 중지' : '음성으로 듣기'}
              >
                {isCurrentlySpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            )}
            <button onClick={() => toggleSection(id)} className="p-2">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-purple-300" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-300" />
              )}
            </button>
          </div>
        </div>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            {children}
          </motion.div>
        )}
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
              className={`p-2 rounded-lg transition ${
                currentSection === 'full' && isSpeaking
                  ? 'bg-amber-500 text-slate-900'
                  : 'hover:bg-white/10 text-purple-200'
              }`}
              title="전체 결과 음성으로 듣기"
            >
              <Volume2 className="w-5 h-5" />
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
              <span className="text-slate-900 font-medium text-sm">음성으로 읽어주는 중...</span>
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

      {/* Score Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
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

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition
                ${activeTab === tab.id
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {activeTab === 'overview' && (
            <>
              <SectionCard
                title="성격 분석"
                icon={Sparkles}
                id="personality"
                color="purple"
                speakText={`성격 분석입니다. ${interpretation?.personality?.summary || ''} 강점은 ${interpretation?.personality?.strengths?.join(', ') || '분석 중'}입니다.`}
              >
                <div className="space-y-4">
                  <p className="text-purple-200">{interpretation?.personality?.summary}</p>
                  <div>
                    <h4 className="text-sm font-medium text-amber-400 mb-2">강점</h4>
                    <div className="flex flex-wrap gap-2">
                      {interpretation?.personality?.strengths?.map((s: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {interpretation?.personality?.detailedAnalysis && (
                    <p className="text-purple-300 text-sm">{interpretation.personality.detailedAnalysis}</p>
                  )}
                </div>
              </SectionCard>

              <SectionCard
                title="행운의 요소"
                icon={Star}
                id="lucky"
                color="yellow"
                speakText={`행운의 요소입니다. 행운의 색상은 ${interpretation?.luckyElements?.colors?.join(', ') || '분석 중'}이고, 행운의 숫자는 ${interpretation?.luckyElements?.numbers?.join(', ') || '분석 중'}입니다.`}
              >
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
              </SectionCard>

              {/* Special Notes */}
              {interpretation?.specialNotes && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400" />
                      <h4 className="font-medium text-amber-400">특별 주목</h4>
                    </div>
                    <button
                      onClick={() => speak(interpretation.specialNotes, 'special')}
                      className={`p-2 rounded-lg transition ${
                        currentSection === 'special' && isSpeaking
                          ? 'bg-amber-500 text-slate-900'
                          : 'hover:bg-white/10 text-amber-400'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-purple-200 text-sm">{interpretation.specialNotes}</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'love' && (
            <SectionCard
              title="연애운 상세"
              icon={Heart}
              id="love-detail"
              color="pink"
              speakText={`연애운입니다. ${interpretation?.loveReading?.loveStyle || ''} ${interpretation?.loveReading?.idealPartner || ''} ${interpretation?.loveReading?.advice || ''}`}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-pink-400 mb-1">현재 연애 상태</h4>
                  <p className="text-purple-200">{interpretation?.loveReading?.currentStatus || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-pink-400 mb-1">연애 스타일</h4>
                  <p className="text-purple-200">{interpretation?.loveReading?.loveStyle || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-pink-400 mb-1">이상적인 파트너</h4>
                  <p className="text-purple-200">{interpretation?.loveReading?.idealPartner || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-pink-400 mb-1">결혼 전망</h4>
                  <p className="text-purple-200">{interpretation?.loveReading?.marriageProspect || '-'}</p>
                </div>
                <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                  <h4 className="text-sm font-medium text-pink-400 mb-1">연애 조언</h4>
                  <p className="text-purple-200">{interpretation?.loveReading?.advice || '-'}</p>
                </div>
              </div>
            </SectionCard>
          )}

          {activeTab === 'career' && (
            <SectionCard
              title="직업운 상세"
              icon={Briefcase}
              id="career-detail"
              color="blue"
              speakText={`직업운입니다. ${interpretation?.careerReading?.workStyle || ''} 적합한 직업은 ${interpretation?.careerReading?.suitableCareers?.join(', ') || '분석 중'}입니다. ${interpretation?.careerReading?.careerAdvice || ''}`}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">타고난 재능</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.careerReading?.naturalTalents?.map((t: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">적합한 직업</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.careerReading?.suitableCareers?.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-1">업무 스타일</h4>
                  <p className="text-purple-200">{interpretation?.careerReading?.workStyle || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-1">리더십 잠재력</h4>
                  <p className="text-purple-200">{interpretation?.careerReading?.leadershipPotential || '-'}</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="text-sm font-medium text-blue-400 mb-1">커리어 조언</h4>
                  <p className="text-purple-200">{interpretation?.careerReading?.careerAdvice || '-'}</p>
                </div>
              </div>
            </SectionCard>
          )}

          {activeTab === 'wealth' && (
            <SectionCard
              title="재물운 상세"
              icon={Coins}
              id="wealth-detail"
              color="yellow"
              speakText={`재물운입니다. ${interpretation?.wealthReading?.moneyMakingAbility || ''} ${interpretation?.wealthReading?.investmentStyle || ''} ${interpretation?.wealthReading?.financialAdvice || ''}`}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-yellow-400 mb-1">돈 버는 능력</h4>
                  <p className="text-purple-200">{interpretation?.wealthReading?.moneyMakingAbility || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-yellow-400 mb-1">저축 성향</h4>
                  <p className="text-purple-200">{interpretation?.wealthReading?.savingTendency || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-yellow-400 mb-1">투자 스타일</h4>
                  <p className="text-purple-200">{interpretation?.wealthReading?.investmentStyle || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-yellow-400 mb-2">행운의 분야</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.wealthReading?.luckyFields?.map((f: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <h4 className="text-sm font-medium text-yellow-400 mb-1">재정 조언</h4>
                  <p className="text-purple-200">{interpretation?.wealthReading?.financialAdvice || '-'}</p>
                </div>
              </div>
            </SectionCard>
          )}

          {activeTab === 'health' && (
            <SectionCard
              title="건강운 상세"
              icon={Activity}
              id="health-detail"
              color="green"
              speakText={`건강운입니다. ${interpretation?.healthReading?.stressManagement || ''} 주의할 부분은 ${interpretation?.healthReading?.concernAreas?.join(', ') || '없습니다'}.`}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">건강한 부분</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.healthReading?.strongPoints?.map((p: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-orange-400 mb-2">주의할 부분</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.healthReading?.concernAreas?.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-1">스트레스 관리</h4>
                  <p className="text-purple-200">{interpretation?.healthReading?.stressManagement || '-'}</p>
                </div>
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <h4 className="text-sm font-medium text-green-400 mb-2">건강 권장사항</h4>
                  <ul className="space-y-1">
                    {interpretation?.healthReading?.recommendations?.map((r: string, i: number) => (
                      <li key={i} className="text-purple-200 text-sm">• {r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionCard>
          )}

          {activeTab === 'personality' && (
            <>
              <SectionCard
                title="성격 종합 분석"
                icon={Sparkles}
                id="personality-main"
                color="purple"
                speakText={`성격 분석입니다. ${interpretation?.personality?.summary || ''} ${interpretation?.personality?.detailedAnalysis || ''}`}
              >
                <div className="space-y-4">
                  <p className="text-purple-200 leading-relaxed">{interpretation?.personality?.summary || '분석 결과를 불러오는 중입니다.'}</p>
                  {interpretation?.personality?.detailedAnalysis && (
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <p className="text-purple-200 text-sm leading-relaxed">{interpretation.personality.detailedAnalysis}</p>
                    </div>
                  )}
                </div>
              </SectionCard>

              <SectionCard
                title="나의 강점"
                icon={TrendingUp}
                id="strengths"
                color="green"
                speakText={`당신의 강점입니다. ${interpretation?.personality?.strengths?.join(', ') || '분석 중'}`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.personality?.strengths?.map((s: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-purple-300 text-sm">
                    이러한 강점을 활용하여 더 큰 성공을 이룰 수 있습니다. 자신의 장점을 인식하고 발전시켜 나가세요.
                  </p>
                </div>
              </SectionCard>

              <SectionCard
                title="보완할 점"
                icon={Target}
                id="weaknesses"
                color="yellow"
                speakText={`보완할 점입니다. ${interpretation?.personality?.weaknesses?.join(', ') || '분석 중'}`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.personality?.weaknesses?.map((w: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium">
                        △ {w}
                      </span>
                    ))}
                  </div>
                  <p className="text-purple-300 text-sm">
                    이러한 점들을 인식하고 개선해 나가면 더욱 균형 잡힌 성장을 이룰 수 있습니다.
                  </p>
                </div>
              </SectionCard>

              <SectionCard
                title="숨겨진 재능"
                icon={Sparkles}
                id="talents"
                color="pink"
                speakText={`숨겨진 재능입니다. ${interpretation?.personality?.hiddenTalents?.join(', ') || '분석 중'}`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {interpretation?.personality?.hiddenTalents?.map((t: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">
                        ★ {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-purple-300 text-sm">
                    아직 발현되지 않은 재능이 있습니다. 새로운 도전을 통해 이러한 잠재력을 깨워보세요.
                  </p>
                </div>
              </SectionCard>

              {/* 인생 여정 */}
              <SectionCard
                title="인생 여정"
                icon={Clock}
                id="lifepath"
                color="blue"
                speakText={`인생 여정입니다. ${interpretation?.lifePath?.earlyLife || ''} ${interpretation?.lifePath?.middleLife || ''} ${interpretation?.lifePath?.laterLife || ''}`}
              >
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
                      <p className="text-white font-medium">"{interpretation.lifePath.lifeTheme}"</p>
                    </div>
                  )}
                </div>
              </SectionCard>
            </>
          )}

          {activeTab === 'advice' && (
            <>
              <SectionCard
                title="맞춤 조언"
                icon={AlertTriangle}
                id="advice-detail"
                color="purple"
                speakText={`맞춤 조언입니다. ${interpretation?.advice?.immediate || ''} 장기적으로는, ${interpretation?.advice?.longTerm || ''}`}
              >
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <h4 className="text-sm font-medium text-amber-400 mb-1">즉시 실천</h4>
                    <p className="text-purple-200">{interpretation?.advice?.immediate || '-'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h4 className="text-sm font-medium text-blue-400 mb-1">단기 조언 (1-3개월)</h4>
                    <p className="text-purple-200">{interpretation?.advice?.shortTerm || '-'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <h4 className="text-sm font-medium text-purple-400 mb-1">장기 조언 (1년 이상)</h4>
                    <p className="text-purple-200">{interpretation?.advice?.longTerm || '-'}</p>
                  </div>
                  {interpretation?.advice?.warnings?.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <h4 className="text-sm font-medium text-red-400 mb-2">주의사항</h4>
                      <ul className="space-y-1">
                        {interpretation.advice.warnings.map((w: string, i: number) => (
                          <li key={i} className="text-red-200 text-sm">• {w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </SectionCard>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 to-purple-500/20
                              border border-amber-500/30 text-center">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">오늘의 긍정 확언</h4>
                <p className="text-amber-200 italic">"{interpretation?.advice?.affirmation || '나는 무한한 가능성을 가지고 있습니다.'}"</p>
                <button
                  onClick={() => speak(interpretation?.advice?.affirmation || '나는 무한한 가능성을 가지고 있습니다.', 'affirmation')}
                  className={`mt-3 px-4 py-2 rounded-full transition inline-flex items-center gap-2 ${
                    currentSection === 'affirmation' && isSpeaking
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-white/10 text-amber-200 hover:bg-white/20'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  음성으로 듣기
                </button>
              </div>
            </>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 text-center">
          <p className="text-xs text-purple-400">
            손금 분석은 재미와 자기 성찰을 위한 것입니다.
            이 분석은 과학적 근거가 없으며, 의학적, 법적, 재정적 조언을 대체할 수 없습니다.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900
                       font-bold rounded-xl transition-all hover:scale-105"
          >
            다시 분석하기
          </button>
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
    </div>
  );
}
