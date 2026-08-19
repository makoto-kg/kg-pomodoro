"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Settings, Theme } from "@/types/pomodoro";
import { usePomodoro } from "@/hooks/usePomodoro";
import { HeaderNav } from "./HeaderNav";
import { ClockDisplay } from "./ClockDisplay";
import { TimelineBar } from "./TimelineBar";
import { CatCanvas } from "./CatCanvas";
import { SettingsModal } from "./SettingsModal";
import { HelpModal } from "./HelpModal";
import { Coffee, BookOpen, Heart } from "lucide-react";

const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  volume: 0.6,
  notificationsEnabled: false,
  theme: "nordic",
  catCount: 5,
  soundType: "chime",
};

const THEME_STYLES: Record<
  Theme,
  {
    bg: string;
    cardBg: string;
    text: string;
    accent: string;
  }
> = {
  nordic: {
    bg: "bg-[#FBF8F3] text-slate-800",
    cardBg: "bg-white/80 border-amber-900/10 shadow-amber-900/5",
    text: "text-slate-800",
    accent: "text-amber-700",
  },
  sunny: {
    bg: "bg-[#FEFCE8] text-amber-950",
    cardBg: "bg-white/85 border-amber-200/80 shadow-amber-500/5",
    text: "text-amber-950",
    accent: "text-amber-600",
  },
  midnight: {
    bg: "bg-[#0F111A] text-slate-100",
    cardBg: "bg-slate-900/85 border-slate-700/60 shadow-black/40",
    text: "text-slate-100",
    accent: "text-indigo-400",
  },
  zen: {
    bg: "bg-[#F0FDF4] text-emerald-950",
    cardBg: "bg-white/85 border-emerald-200/80 shadow-emerald-700/5",
    text: "text-emerald-950",
    accent: "text-emerald-700",
  },
};

const emptySubscribe = () => () => {};

export const PomodoroTimer: React.FC = () => {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("neko_pomodoro_settings");
        if (saved) {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_SETTINGS;
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("neko_pomodoro_settings", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const {
    state,
    mode,
    setMode,
    toggleManualPlay,
    resetManualTimer,
    switchManualPhase,
  } = usePomodoro(settings);

  const themeConfig = THEME_STYLES[settings.theme] || THEME_STYLES.nordic;
  const isFocus = state.phase === "focus";

  // Prevent SSR hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl animate-bounce">🐱</div>
          <p className="text-slate-500 text-sm font-bold">ねこポモドーロ 読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-700 ${themeConfig.bg} ${
        settings.theme === "midnight" ? "dark" : ""
      }`}
    >
      {/* Top Header */}
      <HeaderNav
        settings={settings}
        onToggleSound={() =>
          updateSettings({ soundEnabled: !settings.soundEnabled })
        }
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        mode={mode}
      />

      {/* Main Content Area */}
      <main className="w-full max-w-4xl mx-auto px-4 py-2 sm:py-4 flex-1 flex flex-col gap-5">
        {/* Top Info Banner / Phase status */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full animate-ping ${
                isFocus ? "bg-rose-500" : "bg-emerald-500"
              }`}
            />
            <span className="text-sm font-extrabold tracking-tight">
              {state.blockLabel}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 font-semibold">
            {mode === "clock" && (
              <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 px-3 py-1 rounded-full font-bold border border-amber-200 dark:border-amber-700 shadow-2xs">
                🕒 00分 / 30分 集中自動スタート
              </span>
            )}
            {state.cycleCount > 0 && (
              <span className="flex items-center gap-1 font-extrabold text-rose-600 dark:text-rose-400">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                {state.cycleCount} サイクル完了
              </span>
            )}
          </div>
        </div>

        {/* Top Grid: Timer Display + 1-Hour Schedule Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left / Center: Main Clock & Gauge */}
          <div
            className={`md:col-span-6 rounded-3xl p-6 flex flex-col items-center justify-center backdrop-blur-md border shadow-lg transition-all ${themeConfig.cardBg}`}
          >
            <ClockDisplay
              state={state}
              onToggleManualPlay={toggleManualPlay}
              onResetManualTimer={resetManualTimer}
              onSwitchManualPhase={switchManualPhase}
            />
          </div>

          {/* Right: Schedule Explanation & Timeline Bar */}
          <div className="md:col-span-6 flex flex-col justify-between gap-4">
            {/* 60-min Timeline Bar */}
            <TimelineBar
              currentDate={state.currentDate}
            />

            {/* Current Phase Activity Description Card */}
            <div
              className={`rounded-3xl p-5 backdrop-blur-md border shadow-sm flex flex-col justify-between flex-1 ${themeConfig.cardBg}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  {isFocus ? (
                    <>
                      <BookOpen className="w-4 h-4 text-rose-500" /> 現在のフェーズ: 集中
                    </>
                  ) : (
                    <>
                      <Coffee className="w-4 h-4 text-emerald-500" /> 現在のフェーズ: リラックス
                    </>
                  )}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {isFocus ? "25分間" : "5分間"}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {isFocus ? (
                  <>
                    猫たちもPCで作業したり、本を読んだりメモを取って集中しています。
                    この時間はタスクに専念して生産性を高めましょう！
                  </>
                ) : (
                  <>
                    猫たちがお昼寝したり、おやつを食べたり、遊んでいます。
                    目を休め、水分補給や軽いストレッチでリフレッシュしましょう♪
                  </>
                )}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>次の切り替え:</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm">
                  {state.nextPhaseTime} ({isFocus ? "☕ 休憩" : "🍅 集中"})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area: Interactive Animated Cat Room */}
        <section className="w-full">
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>🐱</span>
              はたらく猫たちの部屋 ({settings.catCount}匹が生活中)
            </h2>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {isFocus ? "💻 お仕事・勉強中" : "😴 休憩・お食事中"}
            </span>
          </div>

          <CatCanvas
            phase={state.phase}
            catCount={settings.catCount}
            soundEnabled={settings.soundEnabled}
            theme={settings.theme}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto py-4 px-4 text-center text-xs text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200/40 dark:border-slate-800/40 mt-4">
        <span>© {state.currentDate.getFullYear()} ねこポモドーロ (Neko Pomodoro)</span>
        <span className="flex items-center gap-1">
          Made with 🐾 for productive meetings & focus
        </span>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        mode={mode}
        onModeChange={setMode}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};
