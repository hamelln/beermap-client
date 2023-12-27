import React from "react";
import "@/styles/global.scss";
import "@/styles/normalize.scss";
import ThemeButton from "@/components/ThemeButton";
import Head from "next/head";
import { Metadata } from "next";

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

if (process.env.NODE_ENV === "test") {
  if (typeof window !== "undefined") {
    (async () => {
      const { worker } = await import("src/mocks/browser");
      worker.start();
    })();
  } else {
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
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x12.png"
        />
        <meta charSet="utf-8" />
      </Head>
      <body suppressHydrationWarning={true}>
        <ThemeButton />
        {children}
      </body>
    </html>
  );
}
