'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hand, Upload, Camera, Sparkles, Heart, Briefcase,
  Coins, Activity, Star, ChevronRight, Info, CheckCircle,
  AlertCircle, Settings, History, X
} from 'lucide-react';
import { useAnalysisStore } from '@/lib/store';
import { analyzeWithGemini, validateImageForPalmReading } from '@/lib/gemini';
import { interpretWithGrok, interpretWithGeminiFallback } from '@/lib/grok';
import { saveReading, generateId, createThumbnail, getReadings, type Reading } from '@/lib/storage';
import ResultView from '@/components/ResultView';
import HistoryView from '@/components/HistoryView';
import ApiKeyModal from '@/components/ApiKeyModal';

export default function HomePage() {
  const [showResult, setShowResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);

  const {
    isAnalyzing,
    progress,
    progressText,
    error,
    currentReadingId,
    interpretation,
    geminiApiKey,
    grokApiKey,
    setAnalyzing,
    setProgress,
    setError,
    setResult,
    setApiKeys,
    reset
  } = useAnalysisStore();

  // 로컬 스토리지에서 API 키 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGemini = localStorage.getItem('gemini_api_key') || '';
      const savedGrok = localStorage.getItem('grok_api_key') || '';
      setApiKeys(savedGemini, savedGrok);
      setReadings(getReadings());
    }
  }, [setApiKeys]);

  const progressSteps = [
    { percent: 10, text: '이미지 확인 중...' },
    { percent: 25, text: '손바닥 인식 중...' },
    { percent: 40, text: '주요 선 분석 중...' },
    { percent: 55, text: '구(Mount) 분석 중...' },
    { percent: 70, text: '특수 기호 탐지 중...' },
    { percent: 85, text: 'AI 해석 생성 중...' },
    { percent: 95, text: '결과 정리 중...' },
  ];

  const simulateProgress = useCallback(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < progressSteps.length) {
        setProgress(progressSteps[step].percent, progressSteps[step].text);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return interval;
  }, [setProgress, progressSteps]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // API 키 확인
    if (!geminiApiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setAnalyzing(true);
    setError(null);
    reset();

    const progressInterval = simulateProgress();

    try {
      // 파일을 Base64로 변환
      const arrayBuffer = await file.arrayBuffer();
      const base64Image = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const mimeType = file.type;
      const fullBase64 = `data:${mimeType};base64,${base64Image}`;

      // 1. Gemini Vision으로 손금 분석
      setProgress(25, '손바닥 이미지 분석 중...');
      const analysis = await analyzeWithGemini(base64Image, mimeType, geminiApiKey);

      // 유효성 검사
      const validation = validateImageForPalmReading(analysis);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // 2. Grok (또는 Gemini)으로 해석 생성
      setProgress(70, 'AI 해석 생성 중...');
      let interpretation;

      if (grokApiKey) {
        try {
          interpretation = await interpretWithGrok(analysis, grokApiKey);
        } catch (grokError) {
          console.warn('Grok failed, falling back to Gemini:', grokError);
          interpretation = await interpretWithGeminiFallback(analysis, geminiApiKey);
        }
      } else {
        interpretation = await interpretWithGeminiFallback(analysis, geminiApiKey);
      }

      // 3. 결과 저장
      const readingId = generateId();
      const thumbnail = await createThumbnail(fullBase64);

      const reading: Reading = {
        id: readingId,
        timestamp: Date.now(),
        imagePreview: thumbnail,
        handType: analysis.handType || 'unknown',
        handShape: analysis.handShape,
        analysis,
        interpretation,
        overallScore: interpretation.overallScore || 70
      };

      saveReading(reading);
      setReadings(getReadings());

      clearInterval(progressInterval);
      setResult(readingId, analysis, interpretation);
      setSelectedReading(reading);
      setShowResult(true);

    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || '분석 중 오류가 발생했습니다.');
      setAnalyzing(false);
    }
  }, [geminiApiKey, grokApiKey, setAnalyzing, setError, setProgress, setResult, reset, simulateProgress]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: isAnalyzing
  });

  const features = [
    { icon: Heart, title: '연애운', desc: '사랑과 관계의 흐름을 읽습니다', color: 'text-pink-400' },
    { icon: Briefcase, title: '직업운', desc: '적성과 성공 가능성을 분석합니다', color: 'text-blue-400' },
    { icon: Coins, title: '재물운', desc: '재정적 운과 투자 성향을 파악합니다', color: 'text-yellow-400' },
    { icon: Activity, title: '건강운', desc: '건강 상태와 주의점을 알려드립니다', color: 'text-green-400' },
  ];

  const tips = [
    '손바닥을 펴고 밝은 조명 아래에서 촬영하세요',
    '카메라를 손바닥 바로 위에서 수직으로 촬영하세요',
    '손금이 선명하게 보이도록 초점을 맞추세요',
    '주로 사용하는 손(오른손잡이는 오른손)을 촬영하세요',
  ];

  const handleViewHistory = (reading: Reading) => {
    setSelectedReading(reading);
    setShowHistory(false);
    setShowResult(true);
  };

  // 결과 화면
  if (showResult && selectedReading) {
    return (
      <ResultView
        reading={selectedReading}
        onBack={() => {
          setShowResult(false);
          setSelectedReading(null);
        }}
      />
    );
  }

  // 히스토리 화면
  if (showHistory) {
    return (
      <HistoryView
        readings={readings}
        onSelect={handleViewHistory}
        onBack={() => setShowHistory(false)}
        onRefresh={() => setReadings(getReadings())}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        geminiKey={geminiApiKey}
        grokKey={grokApiKey}
        onSave={(gemini, grok) => {
          setApiKeys(gemini, grok);
          localStorage.setItem('gemini_api_key', gemini);
          localStorage.setItem('grok_api_key', grok);
          setShowApiKeyModal(false);
        }}
      />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hand className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-white">PalmSeer AI</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition text-purple-200"
              title="분석 기록"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition text-purple-200"
              title="API 설정"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Hand className="w-20 h-20 text-amber-400 animate-float" />
                <Sparkles className="w-8 h-8 text-amber-300 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
              PalmSeer <span className="text-amber-400">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl text-purple-200 mb-2">
              AI가 읽어주는 당신의 손금
            </p>
            <p className="text-purple-300 max-w-2xl mx-auto">
              최첨단 AI 기술로 손금을 분석하여 성격, 연애운, 직업운, 재물운, 건강운을
              전문가 수준으로 해석해 드립니다.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-10 border border-purple-500/20"
        >
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-purple-900"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-amber-400"
                      strokeLinecap="round"
                      strokeDasharray={`${progress * 3.52} 352`}
                      style={{ transition: 'stroke-dasharray 0.5s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{progress}%</span>
                  </div>
                </div>
                <p className="text-lg text-purple-200 mb-2">{progressText}</p>
                <p className="text-sm text-purple-400">잠시만 기다려주세요...</p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
                    transition-all duration-300
                    ${isDragActive
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10'
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="flex justify-center mb-4">
                    {isDragActive ? (
                      <Upload className="w-16 h-16 text-amber-400 animate-bounce" />
                    ) : (
                      <Camera className="w-16 h-16 text-purple-300" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isDragActive ? '여기에 놓으세요!' : '손바닥 사진을 업로드하세요'}
                  </h3>
                  <p className="text-purple-300 mb-4">
                    이미지를 드래그하거나 클릭하여 선택하세요
                  </p>
                  <div className="flex justify-center gap-2 text-sm text-purple-400">
                    <span>JPG, PNG, WebP</span>
                    <span>•</span>
                    <span>최대 10MB</span>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-200">{error}</p>
                  </motion.div>
                )}

                {/* Photo Tips */}
                <div className="mt-6 p-4 rounded-xl bg-purple-500/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h4 className="font-medium text-white">좋은 사진 촬영 팁</h4>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-purple-200">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">AI가 분석하는 4가지 운세</h2>
          <p className="text-purple-300">손금의 선, 구, 특수 기호를 종합 분석합니다</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20
                         hover:border-purple-400/50 transition-all hover:transform hover:scale-105"
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-purple-300 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-3xl p-8 sm:p-12
                     text-center border border-amber-500/30"
        >
          <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            지금 바로 손금을 분석해보세요
          </h2>
          <p className="text-purple-200 mb-6 max-w-xl mx-auto">
            AI가 당신의 손금을 읽고 숨겨진 가능성과 미래의 방향을 알려드립니다.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400
                       text-slate-900 font-bold rounded-xl transition-all hover:scale-105"
          >
            무료로 분석하기
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-purple-400 text-sm">
            2024 PalmSeer AI. 손금 분석은 재미와 자기 성찰을 위한 것입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
