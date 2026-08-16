"use client";

import React from "react";
import { Settings, TimerMode, Phase } from "@/types/pomodoro";
import { Volume2, VolumeX, Settings as SettingsIcon, Sparkles, HelpCircle } from "lucide-react";

interface HeaderNavProps {
  settings: Settings;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  mode: TimerMode;
  phase: Phase;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  settings,
  onToggleSound,
  onOpenSettings,
  onOpenHelp,
  mode,
  phase,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20 text-xl select-none">
          🐱
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-lg sm:text-xl text-slate-800 dark:text-slate-100 tracking-tight">
              ねこポモドーロ
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              {mode === "clock" ? "00/30分 同期中" : "手動モード"}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            25分集中・5分休憩 × はたらく猫たち
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Sound Quick Toggle */}
        <button
          onClick={onToggleSound}
          title={settings.soundEnabled ? "音声をミュート" : "音声をオン"}
          className={`p-2.5 rounded-2xl transition-all shadow-sm active:scale-95 border ${
            settings.soundEnabled
              ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              : "bg-slate-100 dark:bg-slate-800/50 text-slate-400 border-transparent"
          }`}
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* How it works button */}
        <button
          onClick={onOpenHelp}
          title="使い方・スケジュール説明"
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 shadow-sm active:scale-95 transition-all"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="設定を開く"
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 shadow-sm active:scale-95 transition-all"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
