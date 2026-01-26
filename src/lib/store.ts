/**
 * Zustand 상태 관리
 */

import { create } from 'zustand';

interface AnalysisState {
  // 분석 상태
  isAnalyzing: boolean;
  progress: number;
  progressText: string;
  error: string | null;

  // 결과
  currentReadingId: string | null;
  analysis: any | null;
  interpretation: any | null;

  // API 키 (세션 저장)
  geminiApiKey: string;
  grokApiKey: string;

  // Actions
  setAnalyzing: (isAnalyzing: boolean) => void;
  setProgress: (progress: number, text: string) => void;
  setError: (error: string | null) => void;
  setResult: (readingId: string, analysis: any, interpretation: any) => void;
  clearResult: () => void;
  setApiKeys: (gemini: string, grok: string) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  // 초기 상태
  isAnalyzing: false,
  progress: 0,
  progressText: '',
  error: null,
  currentReadingId: null,
  analysis: null,
  interpretation: null,
  geminiApiKey: '',
  grokApiKey: '',

  // Actions
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),

  setProgress: (progress, progressText) => set({ progress, progressText }),

  setError: (error) => set({ error, isAnalyzing: false }),

  setResult: (readingId, analysis, interpretation) => set({
    currentReadingId: readingId,
    analysis,
    interpretation,
    isAnalyzing: false,
    progress: 100,
    progressText: '분석 완료!'
  }),

  clearResult: () => set({
    currentReadingId: null,
    analysis: null,
    interpretation: null
  }),

  setApiKeys: (gemini, grok) => set({
    geminiApiKey: gemini,
    grokApiKey: grok
  }),

  reset: () => set({
    isAnalyzing: false,
    progress: 0,
    progressText: '',
    error: null
  })
}));
