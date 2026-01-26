'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hand, Upload, Camera, Sparkles, Heart, Briefcase,
  Coins, Activity, Star, ChevronRight, Info, CheckCircle,
  AlertCircle, History, X, Image, Lightbulb, Sun, Focus
} from 'lucide-react';
import { useAnalysisStore } from '@/lib/store';
import { validateImageForPalmReading } from '@/lib/gemini';
import { saveReading, generateId, createThumbnail, getReadings, type Reading } from '@/lib/storage';
import ResultView from '@/components/ResultView';
import HistoryView from '@/components/HistoryView';

export default function HomePage() {
  const [showResult, setShowResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showPhotoTips, setShowPhotoTips] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

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

  // 스트림이 변경되면 비디오에 연결
  useEffect(() => {
    if (stream && videoRef.current && showCamera) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(console.error);
    }
  }, [stream, showCamera]);

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
      // 먼저 카메라 UI를 보여줌
      setShowCamera(true);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // 후면 카메라 우선
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setStream(mediaStream);

      // 비디오 요소에 스트림 연결 (약간의 딜레이 후)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);

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
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.log('Video or canvas ref not available');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // 비디오가 재생 중이고 크기가 있는지 확인
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
      console.log('Video not ready:', video.readyState, video.videoWidth, video.videoHeight);
      setError('카메라가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      canvas.toBlob(async (blob) => {
        if (blob) {
          stopCamera();
          const file = new File([blob], 'palm-photo.jpg', { type: 'image/jpeg' });
          await processImage(file);
        } else {
          setError('사진 촬영에 실패했습니다. 다시 시도해주세요.');
        }
      }, 'image/jpeg', 0.95);
    }
  };

  // 이미지 처리 - 서버 API 호출
  const processImage = async (file: File) => {
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

      // 1. 서버 API로 손금 분석 요청
      setProgress(25, '손바닥 이미지 분석 중...');
      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          mimeType: mimeType,
          action: 'analyze'
        })
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || '분석 중 오류가 발생했습니다.');
      }

      const { analysis } = await analyzeResponse.json();

      // 유효성 검사
      const validation = validateImageForPalmReading(analysis);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // 2. 서버 API로 해석 생성 요청
      setProgress(70, 'AI 해석 생성 중...');
      const interpretResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis: analysis,
          action: 'interpret'
        })
      });

      if (!interpretResponse.ok) {
        const errorData = await interpretResponse.json();
        throw new Error(errorData.error || '해석 중 오류가 발생했습니다.');
      }

      const { interpretation } = await interpretResponse.json();

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
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    await processImage(file);
  }, []);

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
      title: '손바닥 펴기',
      desc: '손가락을 자연스럽게 펴고, 손바닥이 평평하게 보이도록 해주세요.'
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
    '📏 손바닥 전체가 화면에 들어오도록 거리를 조절하세요',
    '🧴 손이 너무 건조하면 손금이 잘 안 보여요, 약간 촉촉하게',
    '🚫 반지나 액세서리는 빼고 촬영하면 더 정확해요',
    '📱 후면 카메라가 화질이 더 좋으니 추천드려요',
    '🔄 처음 결과가 이상하면 다시 촬영해보세요'
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
              <h2 className="text-white font-bold">손바닥 촬영</h2>
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
                onLoadedMetadata={() => console.log('Video metadata loaded')}
                onCanPlay={() => console.log('Video can play')}
                className="w-full h-full object-cover"
              />
              {/* 가이드 오버레이 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-96 border-2 border-amber-400/50 rounded-3xl flex items-center justify-center">
                  <Hand className="w-24 h-24 text-amber-400/30" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-amber-200 text-sm bg-black/50 rounded-lg px-3 py-2">
                  손바닥을 가이드 안에 맞추고 촬영하세요
                </p>
              </div>
            </div>

            <div className="p-6 pb-10 bg-black/50 flex justify-center safe-area-bottom">
              <button
                type="button"
                onClick={capturePhoto}
                onTouchEnd={(e) => {
                  e.preventDefault();
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
                  <p className="text-green-200 text-sm">
                    손바닥이 밝고, 손금이 선명하게 보이며, 손가락 끝까지 다 나온 사진
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    피해야 할 사진
                  </h3>
                  <ul className="text-red-200 text-sm space-y-1">
                    <li>• 어둡거나 그림자가 진 사진</li>
                    <li>• 흔들려서 흐릿한 사진</li>
                    <li>• 손이 일부만 나온 사진</li>
                    <li>• 손을 쥐거나 구부린 사진</li>
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
                {/* 카메라 & 갤러리 버튼 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={startCamera}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl
                             bg-gradient-to-br from-amber-500/20 to-orange-500/20
                             border border-amber-500/30 hover:border-amber-400
                             transition-all hover:scale-[1.02]"
                  >
                    <Camera className="w-12 h-12 text-amber-400" />
                    <span className="text-white font-bold">카메라로 촬영</span>
                    <span className="text-amber-200/70 text-xs">직접 손바닥을 찍어보세요</span>
                  </button>

                  <div
                    {...getRootProps()}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl cursor-pointer
                              bg-gradient-to-br from-purple-500/20 to-indigo-500/20
                              border border-purple-500/30 hover:border-purple-400
                              transition-all hover:scale-[1.02]
                              ${isDragActive ? 'border-amber-400 bg-amber-400/10' : ''}`}
                  >
                    <input {...getInputProps()} />
                    <Image className="w-12 h-12 text-purple-400" />
                    <span className="text-white font-bold">갤러리에서 선택</span>
                    <span className="text-purple-200/70 text-xs">이미지를 업로드하세요</span>
                  </div>
                </div>

                {/* 촬영 가이드 버튼 */}
                <button
                  onClick={() => setShowPhotoTips(true)}
                  className="w-full p-4 rounded-xl bg-purple-500/10 border border-purple-500/20
                           hover:border-purple-400/50 transition flex items-center justify-center gap-2"
                >
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span className="text-purple-200">손바닥 촬영 가이드 보기</span>
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                </button>

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

                {/* 간단 팁 */}
                <div className="mt-6 p-4 rounded-xl bg-purple-500/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h4 className="font-medium text-white">빠른 팁</h4>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-start gap-2 text-sm text-purple-200">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      밝은 조명에서 촬영하세요
                    </li>
                    <li className="flex items-start gap-2 text-sm text-purple-200">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      손바닥을 활짝 펴세요
                    </li>
                    <li className="flex items-start gap-2 text-sm text-purple-200">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      카메라를 수직으로 내려보세요
                    </li>
                    <li className="flex items-start gap-2 text-sm text-purple-200">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      손금이 선명하게 보이게 초점 맞추기
                    </li>
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
            © 2024 PalmSeer AI. 손금 분석은 재미와 자기 성찰을 위한 것입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
