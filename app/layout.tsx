import React from "react";
import "@/styles/global.scss";
import "@/styles/normalize.scss";
import ThemeButton from "@/components/ThemeButton";
import Head from "next/head";
import { Metadata } from "next";
import { cookies } from 'next/headers'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  themeColor: "#FFFFFF",
  robots: "index,follow",
  viewport: "width=device-width, initial-scale=1",
  title: "비어맵",
  description: "맛있는 브루어리를 찾아서",
  openGraph: {
    type: "website",
    title: "비어맵",
    siteName: "비어맵",
    description: "맛있는 브루어리를 찾아서",
    images: "/image-og-800x400.webp",
    locale: "ko_KR",
    alternateLocale: "ko_KR",
  },
};

// MSW(Mock Service Worker) 코드: Jest, StoryBook, Cypress 테스트에 사용합니다.
// 테스트 환경에서 MSW로 요청을 가로채 응답합니다.
if (process.env.NODE_ENV === "test") {
  // 브라우저 런타임(StoryBook, Cypress)
  if (typeof window !== "undefined") {
    (async () => {
      const { worker } = await import("src/mocks/browser");
      worker.start();
    })();
  } else {
    // 서버 런타임(Jest 등 Node.js)
    (async () => {
      const { server } = await import("src/mocks/server");
      server.listen();
    })();
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  console.log(theme);
  

  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x12"
          href="/favicon-16x12.png"
        />
        <meta charSet="utf-8" />
      </Head>
      {/* 하이드레이션 시 서버측 HTML과 실제 렌더링이 다르면 개발 환경에서 콘솔 에러가 나옵니다. */}
      {/* suppressHydrationWarning={true}는 콘솔 에러를 숨기는 용도입니다. */}
      <body suppressHydrationWarning={true} className="dark">
        <ThemeButton />
        {children}
      </body>
    </html>
  );
}
