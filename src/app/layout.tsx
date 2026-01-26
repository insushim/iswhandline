import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PalmSeer AI - AI 손금 분석 전문가',
  description: 'AI가 당신의 손금을 분석하여 성격, 운명, 연애운, 재물운, 건강운을 전문가 수준으로 해석해 드립니다.',
  keywords: ['손금', '손금 분석', 'AI 손금', '운세', '손금 보기', 'palm reading', '무료 손금', '손금 앱'],
  authors: [{ name: 'PalmSeer AI' }],
  creator: 'PalmSeer AI',
  publisher: 'PalmSeer AI',
  robots: 'index, follow',
  openGraph: {
    title: 'PalmSeer AI - AI 손금 분석 전문가',
    description: 'AI가 당신의 손금을 분석하여 전문가 수준의 해석을 제공합니다.',
    url: 'https://iswhandline.pages.dev',
    siteName: 'PalmSeer AI',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PalmSeer AI - AI 손금 분석 전문가',
    description: 'AI가 당신의 손금을 분석하여 전문가 수준의 해석을 제공합니다.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#581c87',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
        {children}
      </body>
    </html>
  );
}
