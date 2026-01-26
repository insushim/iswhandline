'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Hand, Heart, Briefcase, Coins, Activity, Star,
  ChevronDown, ChevronUp, ArrowLeft, Share2,
  Sparkles, AlertTriangle, MapPin, Gem, Calendar
} from 'lucide-react';
import type { Reading } from '@/lib/storage';

interface ResultViewProps {
  reading: Reading;
  onBack: () => void;
}

export default function ResultView({ reading, onBack }: ResultViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['personality']);

  const { interpretation, analysis, overallScore } = reading;

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
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

    const dimensions = size === 'large' ? 'w-40 h-40' : 'w-20 h-20';
    const strokeWidth = size === 'large' ? 8 : 4;
    const radius = size === 'large' ? 64 : 32;
    const circumference = 2 * Math.PI * (radius - strokeWidth);

    return (
      <div className="relative">
        <svg className={`${dimensions} transform -rotate-90`}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-purple-900"
          />
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className={getScoreColor(score)}
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${size === 'large' ? 'text-4xl' : 'text-lg'} font-bold text-white`}>
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
    color = 'purple'
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
    id: string;
    color?: string;
  }) => {
    const isExpanded = expandedSections.includes(id);
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
        <button
          onClick={() => toggleSection(id)}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-6 h-6 text-${color}-400`} />
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-purple-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-purple-300" />
          )}
        </button>
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
      // Copy to clipboard
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
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-white/10 transition text-purple-200"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

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
              <SectionCard title="성격 분석" icon={Sparkles} id="personality" color="purple">
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

              <SectionCard title="행운의 요소" icon={Star} id="lucky" color="yellow">
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
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-amber-400" />
                    <h4 className="font-medium text-amber-400">특별 주목</h4>
                  </div>
                  <p className="text-purple-200 text-sm">{interpretation.specialNotes}</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'love' && (
            <SectionCard title="연애운 상세" icon={Heart} id="love-detail" color="pink">
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
            <SectionCard title="직업운 상세" icon={Briefcase} id="career-detail" color="blue">
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
            <SectionCard title="재물운 상세" icon={Coins} id="wealth-detail" color="yellow">
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
            <SectionCard title="건강운 상세" icon={Activity} id="health-detail" color="green">
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

          {activeTab === 'advice' && (
            <>
              <SectionCard title="맞춤 조언" icon={AlertTriangle} id="advice-detail" color="purple">
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
      </div>
    </div>
  );
}
