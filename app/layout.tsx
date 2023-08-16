import "./normalize.scss";
import "./global.scss";
import ThemeButton from "./theme-button/ThemeButton";

export const metadata = {
  title: "BeerMap",
  description: "맥주 맛집 찾기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeButton />
        {children}
      </body>
    </html>
  );
}
