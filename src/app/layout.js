'use client'; // ✅ 클라이언트 컴포넌트에서만 Firebase Analytics 실행 가능

import './globals.css';
import { useEffect } from 'react';
import '@/libs/firebase'; // ✅ firebase.js 경로에 맞게 import하세요

export const metadata = {
  title: '설문조사',
  description: '설문조사 생성',
};

export default function RootLayout({ children }) {
  useEffect(() => {
    console.log('📊 Firebase Analytics initialized');
    // firebase.js 내부에서 getAnalytics(app) 이미 실행됨
  }, []);

  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
