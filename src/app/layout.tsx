import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-maru",
  display: "swap",
});

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
    <html lang="ja" className={`${zenMaruGothic.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen antialiased font-sans selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
