import './globals.css';

export const metadata = {
  title: '설문조사',
  description: '설문조사 생성',
};

export default function RootLayout({ children }) {
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
