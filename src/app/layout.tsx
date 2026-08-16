import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ねこポモドーロ (Neko Pomodoro) | 00/30分連動 集中タイマー",
  description:
    "ミーティングの多いワークスタイルに合わせた00分・30分開始の25分集中・5分休憩ポモドーロタイマー。かわいい猫たちが勉強やお仕事をお手伝いします。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased font-sans selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
