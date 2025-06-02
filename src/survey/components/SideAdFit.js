'use client';
import Script from 'next/script';

export default function SideAdFit() {
  return (
    <>
      {/* Kakao 광고 SDK */}
      <Script
        src="//t1.daumcdn.net/kas/static/ba.min.js"
        strategy="afterInteractive"
      />

      {/* 왼쪽 광고 */}
      <div
        style={{
          position: 'fixed',
          top: '120px',
          left: 'calc((100vw - 1200px) / 2 - 180px)',
          width: '160px',
          height: '600px',
          zIndex: 9999,
        }}
      >
        <ins
          className="kakao_ad_area"
          style={{ display: 'block', width: '160px', height: '600px' }}
          data-ad-unit="DAN-gsYH23NQM5ey3Yh1" // ← 본인 광고단위 ID
          data-ad-width="160"
          data-ad-height="600"
        ></ins>
      </div>

      {/* 오른쪽 광고 */}
      <div
        style={{
          position: 'fixed',
          top: '120px',
          right: 'calc((100vw - 1200px) / 2 - 180px)',
          width: '160px',
          height: '600px',
          zIndex: 9999,
        }}
      >
        <ins
          className="kakao_ad_area"
          style={{ display: 'block', width: '160px', height: '600px' }}
          data-ad-unit="DAN-gsYH23NQM5ey3Yh1" // ← 본인 광고단위 ID
          data-ad-width="160"
          data-ad-height="600"
        ></ins>
      </div>
    </>
  );
}
