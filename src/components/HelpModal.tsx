"use client";

import React from "react";
import { X, Clock, Cat, Sparkles, CheckCircle2 } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              ねこポモドーロの使い方
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
        <div className="px-6 py-5 overflow-y-auto space-y-5 text-sm text-slate-700 dark:text-slate-200">
          {/* Section 1: 00/30-minute sync */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-base">
              <Clock className="w-4 h-4 text-rose-500" />
              なぜ 00分・30分 に集中開始？
            </h3>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              仕事やミーティングは <strong>毎時00分</strong> または <strong>30分</strong> から始まることが多く設定されています。
              このアプリは時計の時刻と連動し、空き時間を無駄なく活用できるように設計されています。
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 font-bold">
                <span>🍅 00分 〜 25分</span>
                <span>集中タイム (25分間)</span>
              </div>
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span>☕ 25分 〜 30分</span>
                <span>リラックスタイム (5分間)</span>
              </div>
              <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 font-bold">
                <span>🍅 30分 〜 55分</span>
                <span>集中タイム (25分間)</span>
              </div>
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span>☕ 55分 〜 00分</span>
                <span>リラックスタイム (5分間)</span>
              </div>
            </div>
          </div>

          {/* Section 2: Cats behavior */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-base">
              <Cat className="w-4 h-4 text-amber-500" />
              はたらく猫たちのアクション
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">💻 集中タイム:</span>
                <span>猫たちもノートPCでプログラミング、丸メガネで読書、メモ帳でお仕事やお勉強を一生懸命しています。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">😴 リラックス:</span>
                <span>クッションで丸くなってお昼寝したり、たい焼きやお魚を食べたり、毛糸玉で遊んでリフレッシュします。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">🐾 なでる:</span>
                <span>画面内の猫をクリック（タップ）すると、かわいい鳴き声とセリフを返してくれます。</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Sound & Notifications */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              通知とサウンド
            </h3>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              フェーズが切り替わると心地よいチャイムが鳴り、クラッカーが舞います。設定から音量や音色の変更、デスクトップ通知の有効化が可能です。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold hover:opacity-90 active:scale-95 transition-all text-xs"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
