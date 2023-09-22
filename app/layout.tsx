import "./normalize.scss";
import "./global.scss";
import ThemeButton from "@/components/ThemeButton";
import Head from "next/head";

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
          href="/favicon-16x16.png"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <title>비어맵</title>
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="description" content="맛있는 브루어리를 찾아서" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="비어맵" />
        <meta property="og:description" content="맛있는 브루어리를 찾아서" />
        <meta property="og:image" content="/image-og-800x400.jpg" />
        <meta property="og:image:alt" content="BeerMap Image Thumbnail" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="비어맵" />
        <meta property="og:locale:alternate" content="ko_KR" />
      </Head>
      <body suppressHydrationWarning={true}>
        <ThemeButton />
        {children}
      </body>
    </html>
  );
}
