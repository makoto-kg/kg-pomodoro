"use client";

import React from "react";
import { PomodoroState } from "@/types/pomodoro";
import { Play, Pause, RotateCcw, SkipForward, Clock } from "lucide-react";

interface ClockDisplayProps {
  state: PomodoroState;
  onToggleManualPlay?: () => void;
  onResetManualTimer?: () => void;
  onSwitchManualPhase?: () => void;
}

function formatTime(totalSeconds: number): { minutes: string; seconds: string } {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return {
    minutes: m.toString().padStart(2, "0"),
    seconds: s.toString().padStart(2, "0"),
  };
}

function formatClockTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
  state,
  onToggleManualPlay,
  onResetManualTimer,
  onSwitchManualPhase,
}) => {
  const { minutes, seconds } = formatTime(state.remainingSeconds);
  const isFocus = state.phase === "focus";
  const progressPercent = state.progressPercent;

  // SVG Circular Gauge calculations
  const radius = 115;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      {/* Current Real-time Clock Header */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-md border border-slate-900/15 dark:border-white/15 mb-4 transition-all">
        <Clock className="w-4 h-4 text-slate-700 dark:text-slate-200 animate-pulse" />
        <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">
          現在時刻:
        </span>
        <span className="text-sm font-mono font-black text-slate-900 dark:text-white tracking-wider">
          {formatClockTime(state.currentDate)}
        </span>
      </div>

      {/* Main Circular Timer Gauge */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* SVG Progress Ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
          <defs>
            <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx="130"
            cy="130"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-200/90 dark:text-slate-700/80"
          />

          {/* Progress Arc */}
          <circle
            cx="130"
            cy="130"
            r={radius}
            stroke={isFocus ? "url(#focusGradient)" : "url(#breakGradient)"}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Inner Timer Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          {/* Phase Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm transition-all mb-1 ${
              isFocus
                ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-300 dark:border-rose-700"
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700"
            }`}
          >
            <span>{isFocus ? "🍅 集中タイム" : "☕ リラックスタイム"}</span>
          </div>

          {/* Remaining Countdown MM:SS (High contrast & crisp on mobile) */}
          <div className="flex items-baseline justify-center font-mono font-black text-slate-900 dark:text-white tracking-tighter my-1">
            <span className="text-5xl sm:text-6xl text-slate-900 dark:text-white drop-shadow-xs">{minutes}</span>
            <span className="text-4xl sm:text-5xl text-slate-700 dark:text-slate-300 mx-0.5 animate-pulse font-bold">:</span>
            <span className="text-5xl sm:text-6xl text-slate-900 dark:text-white drop-shadow-xs">{seconds}</span>
          </div>

          {/* Next Transition Time info */}
          <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
            あと <span className="font-extrabold text-slate-950 dark:text-white underline decoration-amber-400 decoration-2">{minutes}分{seconds}秒</span> で
            <br />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {state.nextPhaseTime} に{isFocus ? "リラックス" : "集中"}へ
            </span>
          </div>
        </div>
      </div>

      {/* Manual Timer Action Buttons (Only in Manual Mode) */}
      {state.mode === "manual" && (
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={onToggleManualPlay}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all ${
              state.isRunning
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-rose-500 hover:bg-rose-600"
            }`}
          >
            {state.isRunning ? (
              <>
                <Pause className="w-4 h-4" /> 一時停止
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> スタート
              </>
            )}
          </button>

          <button
            onClick={onResetManualTimer}
            title="タイマーをリセット"
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onSwitchManualPhase}
            title="次のフェーズへスキップ"
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
