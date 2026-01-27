'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // iOS 감지
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // 이미 설치되었는지 확인
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // 이미 닫았는지 확인
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      // 7일 후에 다시 보여주기
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // beforeinstallprompt 이벤트 리스닝 (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS는 자동으로 배너 표시
    if (isIOSDevice) {
      setTimeout(() => {
        setShowInstallBanner(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    setShowIOSGuide(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showInstallBanner) return null;

  return (
    <>
      {/* 설치 배너 */}
      <AnimatePresence>
        {showInstallBanner && !showIOSGuide && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 shadow-2xl border border-purple-400/30">
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 p-1 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">앱으로 설치하기</h3>
                  <p className="text-purple-200 text-sm">
                    홈 화면에 추가하여 더 빠르게 사용하세요!
                  </p>
                </div>
              </div>

              <button
                onClick={handleInstallClick}
                className="mt-3 w-full bg-white text-purple-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors"
              >
                <Download className="w-5 h-5" />
                {isIOS ? '설치 방법 보기' : '지금 설치하기'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS 설치 가이드 모달 */}
      <AnimatePresence>
        {showIOSGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleDismiss}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 max-w-sm w-full border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">iOS 앱 설치 방법</h3>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-white font-medium">공유 버튼 탭</p>
                    <p className="text-gray-400 text-sm">
                      Safari 하단의 <span className="text-purple-400">공유</span> 버튼을 탭하세요
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-white font-medium">홈 화면에 추가</p>
                    <p className="text-gray-400 text-sm">
                      스크롤하여 <span className="text-purple-400">"홈 화면에 추가"</span>를 탭하세요
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-white font-medium">추가 완료!</p>
                    <p className="text-gray-400 text-sm">
                      홈 화면에서 앱처럼 바로 실행할 수 있어요
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-purple-500 transition-colors"
              >
                확인
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
