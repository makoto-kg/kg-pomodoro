"use client";

import React from "react";
import { Phase } from "@/types/pomodoro";

interface TimelineBarProps {
  currentDate: Date;
  phase: Phase;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  currentDate,
  phase,
}) => {
  const m = currentDate.getMinutes();
  const s = currentDate.getSeconds();
  const currentTotalSeconds = m * 60 + s;
  const currentPercentage = Math.min(
    100,
    Math.max(0, (currentTotalSeconds / 3600) * 100)
  );

  return (
    <div className="w-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200/60 dark:border-slate-700/60 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            1時間スケジュール (00分 / 30分 集中スタート)
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            ミーティング対応
          </span>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          現在: {m.toString().padStart(2, "0")}:{s.toString().padStart(2, "0")} / 60:00
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-8 bg-slate-100 dark:bg-slate-900/60 rounded-xl overflow-hidden flex border border-slate-200/80 dark:border-slate-700/80">
        {/* Block 1: 00 - 25m Focus (25/60 = 41.67%) */}
        <div
          className={`h-full flex items-center justify-center text-[11px] font-bold transition-all relative ${
            m < 25
              ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 font-extrabold"
              : "bg-rose-500/10 text-rose-600/70 dark:text-rose-400/70"
          }`}
          style={{ width: "41.666%" }}
        >
          <span className="truncate px-1">🍅 集中 25分</span>
        </div>

        {/* Block 2: 25 - 30m Break (5/60 = 8.33%) */}
        <div
          className={`h-full flex items-center justify-center text-[11px] font-bold transition-all border-l border-r border-slate-300/40 dark:border-slate-700 ${
            m >= 25 && m < 30
              ? "bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-extrabold"
              : "bg-emerald-500/10 text-emerald-600/70 dark:text-emerald-400/70"
          }`}
          style={{ width: "8.333%" }}
        >
          <span className="truncate px-0.5">☕ 5分</span>
        </div>

        {/* Block 3: 30 - 55m Focus (25/60 = 41.67%) */}
        <div
          className={`h-full flex items-center justify-center text-[11px] font-bold transition-all ${
            m >= 30 && m < 55
              ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 font-extrabold"
              : "bg-rose-500/10 text-rose-600/70 dark:text-rose-400/70"
          }`}
          style={{ width: "41.666%" }}
        >
          <span className="truncate px-1">🍅 集中 25分</span>
        </div>

        {/* Block 4: 55 - 60m Break (5/60 = 8.33%) */}
        <div
          className={`h-full flex items-center justify-center text-[11px] font-bold transition-all border-l border-slate-300/40 dark:border-slate-700 ${
            m >= 55
              ? "bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-extrabold"
              : "bg-emerald-500/10 text-emerald-600/70 dark:text-emerald-400/70"
          }`}
          style={{ width: "8.333%" }}
        >
          <span className="truncate px-0.5">☕ 5分</span>
        </div>

        {/* Live Pointer Needle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-indigo-600 dark:bg-indigo-400 shadow-md z-10 transition-all duration-300 pointer-events-none"
          style={{ left: `${currentPercentage}%` }}
        >
          <div className="absolute -top-1 -left-1.5 w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
        </div>
      </div>

      {/* Axis Labels */}
      <div className="relative w-full flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1.5 px-0.5">
        <span className="font-semibold text-rose-600 dark:text-rose-400">:00 集中</span>
        <span className="text-emerald-600 dark:text-emerald-400" style={{ marginLeft: "36%" }}>
          :25 休憩
        </span>
        <span className="font-semibold text-rose-600 dark:text-rose-400" style={{ marginLeft: "2%" }}>
          :30 集中
        </span>
        <span className="text-emerald-600 dark:text-emerald-400" style={{ marginLeft: "36%" }}>
          :55 休憩
        </span>
        <span>:00</span>
      </div>
    </div>
  );
};
