'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Hand, Calendar, Trash2, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { deleteReading, type Reading } from '@/lib/storage';

interface HistoryViewProps {
  readings: Reading[];
  onSelect: (reading: Reading) => void;
  onBack: () => void;
  onRefresh: () => void;
}

export default function HistoryView({ readings, onSelect, onBack, onRefresh }: HistoryViewProps) {
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('이 분석 결과를 삭제하시겠습니까?')) {
      deleteReading(id);
      onRefresh();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20';
    if (score >= 60) return 'text-amber-400 bg-amber-500/20';
    if (score >= 40) return 'text-orange-400 bg-orange-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getHandTypeLabel = (type: string) => {
    switch (type) {
      case 'left': return '왼손';
      case 'right': return '오른손';
      default: return '손';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-200 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          홈으로 돌아가기
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">분석 히스토리</h1>
          <p className="text-purple-300">이전 손금 분석 결과를 확인하세요</p>
        </motion.div>

        {readings.length === 0 ? (
          <div className="text-center py-12">
            <Hand className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-purple-200 mb-4">아직 분석 기록이 없습니다</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-xl
                         hover:bg-amber-400 transition"
            >
              첫 분석하기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {readings.map((reading, index) => (
              <motion.div
                key={reading.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelect(reading)}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/20
                           overflow-hidden hover:border-purple-400/50 transition cursor-pointer"
              >
                <div className="p-4 flex items-center gap-4">
                  {/* Score */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center
                                  ${getScoreColor(reading.overallScore)}`}>
                    <span className="text-xl font-bold">{reading.overallScore}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-purple-300 mb-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(reading.timestamp), 'yyyy년 M월 d일 HH:mm', { locale: ko })}
                    </div>
                    <p className="text-white text-sm truncate">
                      {reading.interpretation?.personality?.summary || '손금 분석 결과'}
                    </p>
                    <p className="text-purple-400 text-xs mt-1">
                      {getHandTypeLabel(reading.handType)} 분석
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(reading.id, e)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-purple-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {readings.length > 0 && (
          <p className="text-center text-purple-400 text-sm mt-8">
            최근 {readings.length}개의 분석 결과 (최대 20개 저장)
          </p>
        )}
      </div>
    </div>
  );
}
