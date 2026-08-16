"use client";

import React from "react";
import { Settings, TimerMode, Theme } from "@/types/pomodoro";
import {
  Volume2,
  VolumeX,
  Bell,
  Sparkles,
  Cat,
  Palette,
  Clock,
  Timer,
  X,
  Play,
} from "lucide-react";
import { soundManager } from "@/utils/audio";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (newSettings: Partial<Settings>) => void;
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  mode,
  onModeChange,
}) => {
  if (!isOpen) return null;

  const handleTestSound = () => {
    soundManager.playBreakStart(settings.volume, settings.soundType);
  };

  const handleTestFocusSound = () => {
    soundManager.playFocusStart(settings.volume, settings.soundType);
  };

  const requestNotificationPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        onUpdateSettings({ notificationsEnabled: true });
        new Notification("🎉 通知が有効になりました！", {
          body: "集中タイム・リラックスタイムの切り替え時にお知らせしますニャ🐾",
        });
      } else {
        onUpdateSettings({ notificationsEnabled: false });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              設定 (Settings)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-200">
          {/* 1. Timer Mode */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <Clock className="w-4 h-4 text-rose-500" />
              タイマー動作モード
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onModeChange("clock")}
                className={`p-3 rounded-2xl border text-left flex flex-col transition-all ${
                  mode === "clock"
                    ? "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/30"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                }`}
              >
                <div className="flex items-center justify-between w-full font-bold">
                  <span>時計同期モード</span>
                  <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
                    推奨
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  00分・30分に集中開始。ミーティングや予定に自動で合致します。
                </span>
              </button>

              <button
                type="button"
                onClick={() => onModeChange("manual")}
                className={`p-3 rounded-2xl border text-left flex flex-col transition-all ${
                  mode === "manual"
                    ? "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/30"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                }`}
              >
                <div className="flex items-center justify-between w-full font-bold">
                  <span>マニュアルモード</span>
                  <Timer className="w-3.5 h-3.5 opacity-60" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  好きなタイミングでスタート・一時停止できる25分/5分タイマー。
                </span>
              </button>
            </div>
          </div>

          {/* 2. Sound Settings */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                {settings.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
                切り替え音・通知音
              </label>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) =>
                  onUpdateSettings({ soundEnabled: e.target.checked })
                }
                className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
              />
            </div>

            {settings.soundEnabled && (
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                {/* Volume slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400 w-12">
                    音量 ({Math.round(settings.volume * 100)}%)
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.volume}
                    onChange={(e) =>
                      onUpdateSettings({ volume: parseFloat(e.target.value) })
                    }
                    className="flex-1 accent-rose-500 cursor-pointer"
                  />
                </div>

                {/* Sound type selector & preview buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    音色:
                  </span>
                  {(["chime", "bell", "marimba"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onUpdateSettings({ soundType: type })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        settings.soundType === type
                          ? "bg-rose-500 text-white font-bold"
                          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {type === "chime"
                        ? "🔔 チャイム"
                        : type === "bell"
                        ? "🛎️ ベル"
                        : "🎵 マリンバ"}
                    </button>
                  ))}

                  <div className="flex gap-1.5 ml-auto">
                    <button
                      type="button"
                      onClick={handleTestFocusSound}
                      className="px-2 py-1 text-[11px] font-bold bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-lg hover:bg-rose-200 transition-all flex items-center gap-1"
                    >
                      <Play className="w-2.5 h-2.5" /> 集中音
                    </button>
                    <button
                      type="button"
                      onClick={handleTestSound}
                      className="px-2 py-1 text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 transition-all flex items-center gap-1"
                    >
                      <Play className="w-2.5 h-2.5" /> 休憩音
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Cat Count Settings */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <Cat className="w-4 h-4 text-amber-500" />
                登場する猫の匹数 ({settings.catCount}匹)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">少なめ (3匹)</span>
              <input
                type="range"
                min="3"
                max="8"
                step="1"
                value={settings.catCount}
                onChange={(e) =>
                  onUpdateSettings({ catCount: parseInt(e.target.value, 10) })
                }
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <span className="text-xs text-slate-400">多め (8匹)</span>
            </div>
          </div>

          {/* 4. Room Theme Selection */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-700">
            <label className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <Palette className="w-4 h-4 text-indigo-500" />
              お部屋のテーマ (Theme)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "nordic", name: "☕ 北欧カフェ", desc: "あたたかいラテ色" },
                { id: "sunny", name: "☀️ 陽だまりリビング", desc: "明るいクリーム色" },
                { id: "midnight", name: "🌙 夜カフェ・書斎", desc: "落ち着いたダーク" },
                { id: "zen", name: "🌸 和モダン・縁側", desc: "爽やかな抹茶・若草" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onUpdateSettings({ theme: t.id as Theme })}
                  className={`p-2.5 rounded-2xl border text-left flex flex-col transition-all ${
                    settings.theme === t.id
                      ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-400/30"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  }`}
                >
                  <span className="font-bold text-xs">{t.name}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Browser Notifications */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <Bell className="w-4 h-4 text-purple-500" />
                デスクトップ通知
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                別タブで作業中でも切り替えをお知らせ
              </span>
            </div>
            <button
              type="button"
              onClick={requestNotificationPermission}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                settings.notificationsEnabled
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
              }`}
            >
              {settings.notificationsEnabled ? "✓ 有効" : "許可する"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold hover:opacity-90 active:scale-95 transition-all text-xs"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
};
