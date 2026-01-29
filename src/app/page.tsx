'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hand, Upload, Camera, Sparkles, Heart, Briefcase,
  Coins, Activity, Star, ChevronRight, Info, CheckCircle,
  AlertCircle, History, X, Image, Lightbulb, Sun, Focus,
  User, Calendar, ArrowRight, ArrowLeft, Plus, Check
} from 'lucide-react';
import { useAnalysisStore } from '@/lib/store';
import { saveReading, generateId, createThumbnail, getReadings, type Reading, type UserInfo, type HandImages } from '@/lib/storage';

// 이미지 유효성 검사 (인라인)
function validateImageForPalmReading(analysis: any): { valid: boolean; message?: string } {
  if (!analysis.isValidPalm) {
    return {
      valid: false,
      message: '손바닥 이미지가 아니거나 너무 흐립니다. 손바닥이 잘 보이는 사진을 업로드해주세요.'
    };
  }

  if (analysis.confidence < 30) {
    return {
      valid: false,
      message: '이미지 품질이 낮습니다. 더 밝고 선명한 사진을 업로드해주세요.'
    };
  }

  return { valid: true };
}
import ResultView from '@/components/ResultView';
import HistoryView from '@/components/HistoryView';

// 분석 단계 타입
type AnalysisStep = 'userInfo' | 'upload' | 'analyzing' | 'result';

export default function HomePage() {
  const [showResult, setShowResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showPhotoTips, setShowPhotoTips] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // 새로운 상태들
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    gender: 'male',
    age: 30,
    dominantHand: 'right'
  });
  const [handImages, setHandImages] = useState<HandImages>({
    dominant: '',
    nonDominant: ''
  });
  const [currentHandType, setCurrentHandType] = useState<'dominant' | 'nonDominant'>('dominant');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    isAnalyzing,
    progress,
    progressText,
    error,
    setAnalyzing,
    setProgress,
    setError,
    setResult,
    reset
  } = useAnalysisStore();

  // 히스토리 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReadings(getReadings());
    }
  }, []);

  // 카메라 정리
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // showCamera가 true가 되고 stream이 있으면 비디오에 연결
  useEffect(() => {
    if (showCamera && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

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
  }, [setProgress]);

  // 카메라 시작
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // 후면 카메라
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setStream(mediaStream);
      setShowCamera(true);

    } catch (err: any) {
      console.error('Camera error:', err);
      setShowCamera(false);
      if (err.name === 'NotAllowedError') {
        setError('카메라 접근 권한이 필요합니다. 브라우저 설정에서 허용해주세요.');
      } else if (err.name === 'NotFoundError') {
        setError('카메라를 찾을 수 없습니다.');
      } else {
        setError(`카메라 오류: ${err.message}`);
      }
    }
  };


  // 카메라 중지
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  // 사진 촬영
  const capturePhoto = async () => {
    try {
      if (!videoRef.current || !canvasRef.current) {
        setError('카메라가 준비되지 않았습니다.');
        stopCamera();
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // 비디오 크기 확인
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setError('카메라 영상을 가져올 수 없습니다. 다시 시도해주세요.');
        stopCamera();
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('캔버스 오류가 발생했습니다.');
        stopCamera();
        return;
      }

      ctx.drawImage(video, 0, 0);

      // base64로 변환
      const base64Image = canvas.toDataURL('image/jpeg', 0.9);

      // 카메라 닫기
      stopCamera();

      // 현재 촬영 중인 손에 따라 이미지 저장
      if (currentHandType === 'dominant') {
        setHandImages(prev => ({ ...prev, dominant: base64Image }));
      } else {
        setHandImages(prev => ({ ...prev, nonDominant: base64Image }));
      }

    } catch (err: any) {
      console.error('촬영 오류:', err);
      setError(`촬영 오류: ${err.message || '알 수 없는 오류'}`);
      stopCamera();
    }
  };

  // 이미지를 Base64로 변환하는 헬퍼 함수
  const fileToBase64 = async (file: File): Promise<{ base64: string; mimeType: string; fullBase64: string }> => {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const mimeType = file.type;
    const fullBase64 = `data:${mimeType};base64,${base64}`;
    return { base64, mimeType, fullBase64 };
  };

  // 단일 손 이미지 추가 (양손 촬영용)
  const addHandImage = async (file: File) => {
    const { fullBase64 } = await fileToBase64(file);

    if (currentHandType === 'dominant') {
      setHandImages(prev => ({ ...prev, dominant: fullBase64 }));
    } else {
      setHandImages(prev => ({ ...prev, nonDominant: fullBase64 }));
    }
  };

  // 이미지 처리 - 서버 API 호출 (단일 호출로 분석+해석 동시 수행)
  const processImage = async (file: File) => {
    // 먼저 에러와 결과 초기화
    setError(null);

    // 분석 시작
    setAnalyzing(true);
    setCurrentStep('analyzing');
    setProgress(5, '이미지 준비 중...');

    const progressInterval = simulateProgress();

    try {
      // 파일을 Base64로 변환
      const { base64: base64Image, mimeType, fullBase64 } = await fileToBase64(file);

      // 단일 API 호출로 분석 + 해석 동시 수행
      setProgress(30, 'AI가 손금을 분석하고 있습니다...');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          mimeType: mimeType,
          action: 'analyze',
          // 사용자 정보 추가
          userInfo: userInfo,
          // 양손 이미지 정보 (있으면)
          hasNonDominantHand: !!handImages.nonDominant
        })
      });

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error('서버 응답 시간이 초과되었습니다. 다시 시도해주세요.');
        }
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || '분석 중 오류가 발생했습니다.');
        } catch (e: any) {
          if (e.message.includes('서버')) throw e;
          throw new Error(`서버 오류 (${response.status}): 다시 시도해주세요.`);
        }
      }

      setProgress(70, '결과를 정리하고 있습니다...');
      const data = await response.json();
      const { analysis, interpretation } = data;

      // 유효성 검사
      const validation = validateImageForPalmReading(analysis);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      setProgress(90, '거의 완료되었습니다...');

      // 결과 저장
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
        overallScore: interpretation?.overallScore || 70,
        // 새로 추가된 필드
        userInfo: userInfo,
        handImages: {
          dominant: fullBase64,
          nonDominant: handImages.nonDominant || undefined
        }
      };

      saveReading(reading);
      setReadings(getReadings());

      clearInterval(progressInterval);
      setResult(readingId, analysis, interpretation);
      setSelectedReading(reading);
      setShowResult(true);
      setCurrentStep('result');

    } catch (err: any) {
      clearInterval(progressInterval);
      console.error('분석 오류:', err);
      const errorMessage = err.message || '분석 중 오류가 발생했습니다.';
      setError(`오류: ${errorMessage}`);
      setAnalyzing(false);
      setCurrentStep('upload');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // 업로드 단계에서만 이미지 저장 (주사용 손)
    if (currentStep === 'upload') {
      const { fullBase64 } = await fileToBase64(file);
      setHandImages(prev => ({ ...prev, dominant: fullBase64 }));
    }
  }, [currentStep]);

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

  const photoTips = [
    {
      icon: Sun,
      title: '밝은 조명',
      desc: '자연광이나 밝은 조명 아래에서 촬영하세요. 그림자가 지면 손금이 잘 안 보여요.'
    },
    {
      icon: Hand,
      title: '손 전체 촬영',
      desc: '손바닥 + 손가락까지 전체가 나오면 더 정확해요! 손가락 길이/간격도 분석해요.'
    },
    {
      icon: Focus,
      title: '초점 맞추기',
      desc: '손금이 선명하게 보이도록 카메라 초점을 맞추세요. 흔들리지 않게 고정!'
    },
    {
      icon: Camera,
      title: '수직 촬영',
      desc: '카메라를 손바닥 바로 위에서 수직으로 내려다보며 촬영하세요.'
    },
  ];

  const detailedTips = [
    '✋ 주로 사용하는 손을 촬영하세요 (오른손잡이는 오른손)',
    '🖐️ 손가락 끝까지 전체가 나오면 더 정확한 분석 가능!',
    '👆 손가락을 쫙 펴세요 (손가락 길이, 간격, 마디도 분석해요)',
    '📏 손 전체가 화면의 80% 이상 차지하도록 가까이',
    '🧴 손이 너무 건조하면 손금이 잘 안 보여요, 약간 촉촉하게',
    '🚫 반지나 액세서리는 빼고 촬영하면 더 정확해요',
    '📱 후면 카메라가 화질이 더 좋으니 추천드려요',
    '🔍 지문까지 보이면 피부문양학 분석도 가능해요!'
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
      {/* 카메라 모달 */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <div className="flex items-center justify-between p-4 bg-black/50">
              <h2 className="text-white font-bold">
                {currentHandType === 'dominant'
                  ? `${userInfo.dominantHand === 'right' ? '오른손' : '왼손'} (주사용 손) 촬영`
                  : `${userInfo.dominantHand === 'right' ? '왼손' : '오른손'} (보조 손) 촬영`
                }
              </h2>
              <button
                onClick={stopCamera}
                className="p-2 rounded-full bg-white/10 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 relative overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* 가이드 오버레이 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-96 border-2 border-amber-400/50 rounded-3xl flex items-center justify-center">
                  <Hand className={`w-24 h-24 text-amber-400/30 ${
                    (currentHandType === 'dominant' && userInfo.dominantHand === 'left') ||
                    (currentHandType === 'nonDominant' && userInfo.dominantHand === 'right')
                      ? 'scale-x-[-1]' : ''
                  }`} />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center space-y-2">
                <p className="text-white text-base font-bold bg-amber-600/80 rounded-lg px-3 py-2">
                  {currentHandType === 'dominant'
                    ? `👋 ${userInfo.dominantHand === 'right' ? '오른손' : '왼손'}을 촬영해주세요 (현재/미래)`
                    : `👋 ${userInfo.dominantHand === 'right' ? '왼손' : '오른손'}을 촬영해주세요 (타고난 성향)`
                  }
                </p>
                <p className="text-amber-200 text-sm bg-black/50 rounded-lg px-3 py-2">
                  손바닥을 가이드 안에 맞추고 촬영하세요
                </p>
              </div>
            </div>

            <div className="p-6 pb-10 bg-black/50 flex justify-center safe-area-bottom">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  capturePhoto();
                }}
                className="w-24 h-24 rounded-full bg-white flex items-center justify-center
                         active:scale-95 transition-transform shadow-lg touch-manipulation"
              >
                <div className="w-20 h-20 rounded-full border-4 border-slate-800" />
              </button>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 촬영 팁 모달 */}
      <AnimatePresence>
        {showPhotoTips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPhotoTips(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-slate-900 rounded-2xl border border-purple-500/30 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-purple-500/20 sticky top-0 bg-slate-900">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold text-white">손바닥 촬영 가이드</h2>
                </div>
                <button
                  onClick={() => setShowPhotoTips(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition text-purple-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* 핵심 팁 */}
                <div className="grid grid-cols-2 gap-3">
                  {photoTips.map((tip, index) => (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20"
                    >
                      <tip.icon className="w-8 h-8 text-amber-400 mb-2" />
                      <h3 className="font-bold text-white text-sm mb-1">{tip.title}</h3>
                      <p className="text-purple-200 text-xs">{tip.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* 좋은 예시 vs 나쁜 예시 */}
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                  <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    좋은 사진 예시
                  </h3>
                  <ul className="text-green-200 text-sm space-y-1">
                    <li>✅ 손바닥 + 손가락 전체가 선명하게 보이는 사진</li>
                    <li>✅ 밝은 조명에서 손금이 또렷하게 보이는 사진</li>
                    <li>✅ 손가락을 쫙 펴고 찍은 사진</li>
                    <li>✅ 최소 손바닥만 나와도 기본 분석 가능!</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    피해야 할 사진
                  </h3>
                  <ul className="text-red-200 text-sm space-y-1">
                    <li>• 어둡거나 그림자가 진 사진</li>
                    <li>• 흔들려서 흐릿한 사진</li>
                    <li>• 손가락이 잘린 사진 (손가락 분석 불가)</li>
                    <li>• 손을 쥐거나 구부린 사진</li>
                    <li>• 손가락을 붙이고 찍은 사진 (간격 분석 불가)</li>
                  </ul>
                </div>

                {/* 추가 팁 */}
                <div>
                  <h3 className="font-bold text-white mb-3">💡 추가 팁</h3>
                  <ul className="space-y-2">
                    {detailedTips.map((tip, index) => (
                      <li key={index} className="text-purple-200 text-sm">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 border-t border-purple-500/20">
                <button
                  onClick={() => setShowPhotoTips(false)}
                  className="w-full py-3 rounded-xl bg-amber-500 text-slate-900 font-bold
                           hover:bg-amber-400 transition"
                >
                  확인했어요!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
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
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/20 to-transparent" />
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

      {/* Main Section - 단계별 UI */}
      <div className="max-w-4xl mx-auto px-4 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-10 border border-purple-500/20"
        >
          {/* 단계 표시 */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              currentStep === 'userInfo' ? 'bg-amber-500 text-slate-900' : 'bg-purple-500/20 text-purple-300'
            }`}>
              <User className="w-4 h-4" />
              <span>1. 정보 입력</span>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-500" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              currentStep === 'upload' ? 'bg-amber-500 text-slate-900' : 'bg-purple-500/20 text-purple-300'
            }`}>
              <Camera className="w-4 h-4" />
              <span>2. 손금 촬영</span>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-500" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              currentStep === 'analyzing' ? 'bg-amber-500 text-slate-900' : 'bg-purple-500/20 text-purple-300'
            }`}>
              <Sparkles className="w-4 h-4" />
              <span>3. AI 분석</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: 사용자 정보 입력 */}
            {currentStep === 'userInfo' && (
              <motion.div
                key="userInfo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">기본 정보 입력</h2>
                  <p className="text-purple-300 text-sm">더 정확한 손금 분석을 위해 정보를 입력해주세요</p>
                </div>

                {/* 성별 선택 */}
                <div>
                  <label className="block text-purple-200 mb-3 font-medium">성별</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'male', label: '남성', icon: '👨' },
                      { value: 'female', label: '여성', icon: '👩' },
                      { value: 'other', label: '기타', icon: '🧑' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setUserInfo(prev => ({ ...prev, gender: option.value as UserInfo['gender'] }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          userInfo.gender === option.value
                            ? 'border-amber-400 bg-amber-400/20 text-white'
                            : 'border-purple-500/30 bg-purple-500/10 text-purple-200 hover:border-purple-400'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 나이 입력 */}
                <div>
                  <label className="block text-purple-200 mb-3 font-medium">나이</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={userInfo.age}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                      className="flex-1 h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="w-20 text-center">
                      <span className="text-3xl font-bold text-amber-400">{userInfo.age}</span>
                      <span className="text-purple-300 text-sm ml-1">세</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-purple-400 mt-1">
                    <span>10세</span>
                    <span>80세</span>
                  </div>
                </div>

                {/* 주사용 손 선택 */}
                <div>
                  <label className="block text-purple-200 mb-3 font-medium">주로 사용하는 손</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'right', label: '오른손잡이', icon: '🤚', desc: '오른손이 주사용 손' },
                      { value: 'left', label: '왼손잡이', icon: '✋', desc: '왼손이 주사용 손' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setUserInfo(prev => ({ ...prev, dominantHand: option.value as UserInfo['dominantHand'] }))}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          userInfo.dominantHand === option.value
                            ? 'border-amber-400 bg-amber-400/20'
                            : 'border-purple-500/30 bg-purple-500/10 hover:border-purple-400'
                        }`}
                      >
                        <span className="text-3xl block mb-2">{option.icon}</span>
                        <span className="font-bold text-white block">{option.label}</span>
                        <span className="text-purple-300 text-xs">{option.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 안내 메시지 */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-200 font-medium mb-1">왜 이 정보가 필요한가요?</p>
                      <ul className="text-blue-300/80 space-y-1">
                        <li>• 성별/나이에 따라 손금 해석이 달라집니다</li>
                        <li>• 주사용 손 = 현재/미래, 비주사용 손 = 타고난 성향</li>
                        <li>• 더 정확하고 개인화된 분석을 제공합니다</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 다음 단계 버튼 */}
                <button
                  onClick={() => setCurrentStep('upload')}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500
                           text-slate-900 font-bold text-lg flex items-center justify-center gap-2
                           hover:from-amber-400 hover:to-orange-400 transition-all"
                >
                  다음 단계로
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: 손금 촬영/업로드 */}
            {currentStep === 'upload' && !isAnalyzing && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-white mb-2">손금 촬영</h2>
                  <p className="text-purple-300 text-sm">
                    {userInfo.dominantHand === 'right' ? '오른손' : '왼손'}(주사용 손)을 촬영해주세요
                  </p>
                </div>

                {/* 뒤로 가기 */}
                <button
                  onClick={() => setCurrentStep('userInfo')}
                  className="flex items-center gap-2 text-purple-300 hover:text-white transition mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">정보 수정하기</span>
                </button>

                {/* 현재 사용자 정보 요약 */}
                <div className="flex items-center justify-center gap-4 p-3 rounded-xl bg-purple-500/10 text-sm">
                  <span className="text-purple-200">
                    {userInfo.gender === 'male' ? '👨 남성' : userInfo.gender === 'female' ? '👩 여성' : '🧑 기타'}
                  </span>
                  <span className="text-purple-400">|</span>
                  <span className="text-purple-200">{userInfo.age}세</span>
                  <span className="text-purple-400">|</span>
                  <span className="text-purple-200">{userInfo.dominantHand === 'right' ? '오른손잡이' : '왼손잡이'}</span>
                </div>

                {/* 주사용 손 촬영 (필수) */}
                <div className="p-4 rounded-xl border-2 border-amber-500/50 bg-amber-500/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Hand className="w-5 h-5 text-amber-400" />
                      <span className="font-bold text-white">
                        {userInfo.dominantHand === 'right' ? '오른손' : '왼손'} (주사용 손)
                      </span>
                      <span className="text-xs bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full">필수</span>
                    </div>
                    {handImages.dominant && (
                      <Check className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <p className="text-amber-200/70 text-sm mb-4">현재 상태와 미래의 가능성을 보여줍니다</p>

                  {handImages.dominant ? (
                    <div className="relative">
                      <img
                        src={handImages.dominant}
                        alt="주사용 손"
                        className="w-full h-40 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => setHandImages(prev => ({ ...prev, dominant: '' }))}
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-500/80 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setCurrentHandType('dominant');
                          startCamera();
                        }}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-500/20
                                 border border-amber-500/30 hover:border-amber-400 transition"
                      >
                        <Camera className="w-8 h-8 text-amber-400" />
                        <span className="text-white text-sm">카메라 촬영</span>
                      </button>
                      <div
                        {...getRootProps()}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer
                                  bg-purple-500/20 border border-purple-500/30 hover:border-purple-400 transition
                                  ${isDragActive ? 'border-amber-400 bg-amber-400/10' : ''}`}
                      >
                        <input {...getInputProps()} />
                        <Image className="w-8 h-8 text-purple-400" />
                        <span className="text-white text-sm">갤러리 선택</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 비주사용 손 촬영 (선택) */}
                <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Hand className={`w-5 h-5 text-purple-400 ${userInfo.dominantHand === 'right' ? 'scale-x-[-1]' : ''}`} />
                      <span className="font-bold text-white">
                        {userInfo.dominantHand === 'right' ? '왼손' : '오른손'} (보조 손)
                      </span>
                      <span className="text-xs bg-purple-500/50 text-purple-200 px-2 py-0.5 rounded-full">선택</span>
                    </div>
                    {handImages.nonDominant && (
                      <Check className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <p className="text-purple-300/70 text-sm mb-4">타고난 성향과 잠재력을 보여줍니다 (더 정확한 분석)</p>

                  {handImages.nonDominant ? (
                    <div className="relative">
                      <img
                        src={handImages.nonDominant}
                        alt="보조 손"
                        className="w-full h-40 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => setHandImages(prev => ({ ...prev, nonDominant: '' }))}
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-500/80 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentHandType('nonDominant');
                        startCamera();
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-xl
                               bg-purple-500/20 border border-dashed border-purple-500/50
                               hover:border-purple-400 transition text-purple-300"
                    >
                      <Plus className="w-5 h-5" />
                      <span>보조 손 추가하기 (선택사항)</span>
                    </button>
                  )}
                </div>

                {/* 촬영 가이드 버튼 */}
                <button
                  onClick={() => setShowPhotoTips(true)}
                  className="w-full p-4 rounded-xl bg-purple-500/10 border border-purple-500/20
                           hover:border-purple-400/50 transition flex items-center justify-center gap-2"
                >
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span className="text-purple-200">손바닥 촬영 가이드 보기</span>
                </button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-200">{error}</p>
                  </motion.div>
                )}

                {/* 분석 시작 버튼 */}
                <button
                  onClick={async () => {
                    if (!handImages.dominant) {
                      setError('주사용 손 사진을 먼저 촬영해주세요.');
                      return;
                    }
                    // base64 이미지를 File로 변환
                    const response = await fetch(handImages.dominant);
                    const blob = await response.blob();
                    const file = new File([blob], 'dominant-hand.jpg', { type: 'image/jpeg' });
                    await processImage(file);
                  }}
                  disabled={!handImages.dominant}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    handImages.dominant
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 hover:from-amber-400 hover:to-orange-400'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  AI 손금 분석 시작하기
                </button>
              </motion.div>
            )}

            {/* STEP 3: 분석 중 */}
            {isAnalyzing && (
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

                {/* 분석 정보 표시 */}
                <div className="mt-6 p-4 rounded-xl bg-purple-500/10 text-sm">
                  <p className="text-purple-300">
                    {userInfo.gender === 'male' ? '남성' : userInfo.gender === 'female' ? '여성' : '기타'} · {userInfo.age}세 · {userInfo.dominantHand === 'right' ? '오른손잡이' : '왼손잡이'}
                  </p>
                  {handImages.nonDominant && (
                    <p className="text-green-400 mt-1">✓ 양손 분석 진행 중</p>
                  )}
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
            © 2024 PalmSeer AI. 손금 분석은 재미와 자기 성찰을 위한 것입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
