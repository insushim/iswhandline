'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  geminiKey: string;
  grokKey: string;
  onSave: (gemini: string, grok: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, geminiKey, grokKey, onSave }: ApiKeyModalProps) {
  const [gemini, setGemini] = useState(geminiKey);
  const [grok, setGrok] = useState(grokKey);

  const handleSave = () => {
    onSave(gemini.trim(), grok.trim());
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-slate-900 rounded-2xl border border-purple-500/30 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">API 키 설정</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 transition text-purple-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Notice */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-amber-200 font-medium mb-1">API 키가 필요합니다</p>
                <p className="text-amber-200/80">
                  손금 분석을 위해 Gemini API 키가 필요합니다.
                  Grok API 키는 선택사항이며, 없으면 Gemini가 해석도 담당합니다.
                </p>
              </div>
            </div>

            {/* Gemini API Key */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Gemini API 키 <span className="text-red-400">*필수</span>
              </label>
              <input
                type="password"
                value={gemini}
                onChange={(e) => setGemini(e.target.value)}
                placeholder="AIza..."
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl
                         text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
              />
              <div className="mt-2 flex items-center gap-2">
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  API 키 발급받기
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {gemini && (
                <div className="mt-2 flex items-center gap-1 text-green-400 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  입력됨
                </div>
              )}
            </div>

            {/* Grok API Key */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Grok API 키 <span className="text-purple-400">(선택)</span>
              </label>
              <input
                type="password"
                value={grok}
                onChange={(e) => setGrok(e.target.value)}
                placeholder="xai-..."
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl
                         text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
              />
              <div className="mt-2 flex items-center gap-2">
                <a
                  href="https://x.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  xAI 콘솔
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-xs text-purple-500">|</span>
                <span className="text-xs text-purple-400">해석 품질 향상에 사용됩니다</span>
              </div>
              {grok && (
                <div className="mt-2 flex items-center gap-1 text-green-400 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  입력됨
                </div>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="text-xs text-purple-400">
              <p>* API 키는 브라우저에만 저장되며 서버로 전송되지 않습니다.</p>
              <p>* 분석은 클라이언트에서 직접 AI API를 호출합니다.</p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-purple-500/20 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-purple-200 hover:bg-white/10 transition"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={!gemini.trim()}
              className="px-6 py-2 rounded-xl bg-amber-500 text-slate-900 font-bold
                       hover:bg-amber-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              저장
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
