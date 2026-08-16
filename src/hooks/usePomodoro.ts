"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Phase, TimerMode, PomodoroState, Settings } from "@/types/pomodoro";
import { soundManager } from "@/utils/audio";
import confetti from "canvas-confetti";

const FOCUS_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

function format2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}

function calculateClockSyncState(now: Date): {
  phase: Phase;
  remainingSeconds: number;
  totalPhaseSeconds: number;
  progressPercent: number;
  blockLabel: string;
  nextPhaseTime: string;
} {
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const nextH = (h + 1) % 24;

  let phase: Phase;
  let totalPhaseSeconds: number;
  let elapsedSeconds: number;
  let blockLabel: string;
  let nextPhaseTime: string;

  if (m < 25) {
    // 00:00 - 24:59 (Focus 25m)
    phase = "focus";
    totalPhaseSeconds = FOCUS_DURATION;
    elapsedSeconds = m * 60 + s;
    blockLabel = `${format2Digits(h)}:00 - ${format2Digits(h)}:25 集中タイム`;
    nextPhaseTime = `${format2Digits(h)}:25`;
  } else if (m < 30) {
    // 25:00 - 29:59 (Break 5m)
    phase = "break";
    totalPhaseSeconds = BREAK_DURATION;
    elapsedSeconds = (m - 25) * 60 + s;
    blockLabel = `${format2Digits(h)}:25 - ${format2Digits(h)}:30 休憩タイム`;
    nextPhaseTime = `${format2Digits(h)}:30`;
  } else if (m < 55) {
    // 30:00 - 54:59 (Focus 25m)
    phase = "focus";
    totalPhaseSeconds = FOCUS_DURATION;
    elapsedSeconds = (m - 30) * 60 + s;
    blockLabel = `${format2Digits(h)}:30 - ${format2Digits(h)}:55 集中タイム`;
    nextPhaseTime = `${format2Digits(h)}:55`;
  } else {
    // 55:00 - 59:59 (Break 5m)
    phase = "break";
    totalPhaseSeconds = BREAK_DURATION;
    elapsedSeconds = (m - 55) * 60 + s;
    blockLabel = `${format2Digits(h)}:55 - ${format2Digits(nextH)}:00 休憩タイム`;
    nextPhaseTime = `${format2Digits(nextH)}:00`;
  }

  const remainingSeconds = Math.max(0, totalPhaseSeconds - elapsedSeconds);
  const progressPercent = Math.min(
    100,
    Math.max(0, (elapsedSeconds / totalPhaseSeconds) * 100)
  );

  return {
    phase,
    remainingSeconds,
    totalPhaseSeconds,
    progressPercent,
    blockLabel,
    nextPhaseTime,
  };
}

export function usePomodoro(settings: Settings) {
  const [mode, setMode] = useState<TimerMode>("clock");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [manualPhase, setManualPhase] = useState<Phase>("focus");
  const [manualRemaining, setManualRemaining] = useState<number>(FOCUS_DURATION);
  const [isManualRunning, setIsManualRunning] = useState<boolean>(false);
  const [cycleCount, setCycleCount] = useState<number>(0);

  const prevPhaseRef = useRef<Phase | null>(null);
  const isInitialMount = useRef(true);

  // Trigger phase transition alert & sound & confetti
  const handlePhaseTransition = useCallback(
    (newPhase: Phase) => {
      if (settings.soundEnabled) {
        if (newPhase === "break") {
          soundManager.playBreakStart(settings.volume, settings.soundType);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#f43f5e", "#fb923c", "#facc15", "#4ade80", "#60a5fa"],
            });
          } catch {
            // Ignore confetti errors if any
          }
        } else {
          soundManager.playFocusStart(settings.volume, settings.soundType);
        }
      }

      if (settings.notificationsEnabled && typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "granted") {
          const title =
            newPhase === "break"
              ? "☕ リラックスタイムが始まりました！"
              : "🍅 集中タイムが始まりました！";
          const body =
            newPhase === "break"
              ? "25分間の集中お疲れ様でした。5分間リフレッシュしましょう♪"
              : "次の25分間、集中して取り組みましょう！";
          new Notification(title, { body, icon: "/favicon.ico" });
        }
      }
    },
    [settings.soundEnabled, settings.volume, settings.soundType, settings.notificationsEnabled]
  );

  // Clock sync ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(now);

      if (mode === "clock") {
        const clockState = calculateClockSyncState(now);
        
        if (isInitialMount.current) {
          prevPhaseRef.current = clockState.phase;
          isInitialMount.current = false;
        } else if (prevPhaseRef.current !== clockState.phase) {
          handlePhaseTransition(clockState.phase);
          if (clockState.phase === "break") {
            setCycleCount((c) => c + 1);
          }
          prevPhaseRef.current = clockState.phase;
        }
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [mode, handlePhaseTransition]);

  // Manual timer ticker
  useEffect(() => {
    if (mode !== "manual" || !isManualRunning) return;

    const timer = setInterval(() => {
      setManualRemaining((prev) => {
        if (prev <= 1) {
          // Switch phase
          const nextPhase: Phase = manualPhase === "focus" ? "break" : "focus";
          setManualPhase(nextPhase);
          handlePhaseTransition(nextPhase);
          if (nextPhase === "break") {
            setCycleCount((c) => c + 1);
          }
          return nextPhase === "focus" ? FOCUS_DURATION : BREAK_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isManualRunning, manualPhase, handlePhaseTransition]);

  // Manual timer controls
  const toggleManualPlay = useCallback(() => {
    setIsManualRunning((r) => !r);
  }, []);

  const resetManualTimer = useCallback(() => {
    setIsManualRunning(false);
    setManualRemaining(manualPhase === "focus" ? FOCUS_DURATION : BREAK_DURATION);
  }, [manualPhase]);

  const switchManualPhase = useCallback(
    (targetPhase?: Phase) => {
      const next = targetPhase || (manualPhase === "focus" ? "break" : "focus");
      setManualPhase(next);
      setManualRemaining(next === "focus" ? FOCUS_DURATION : BREAK_DURATION);
      setIsManualRunning(false);
    },
    [manualPhase]
  );

  // Compute overall state
  let currentState: PomodoroState;

  if (mode === "clock") {
    const clockState = calculateClockSyncState(currentDate);
    currentState = {
      mode: "clock",
      phase: clockState.phase,
      currentDate,
      remainingSeconds: clockState.remainingSeconds,
      totalPhaseSeconds: clockState.totalPhaseSeconds,
      progressPercent: clockState.progressPercent,
      isRunning: true,
      blockLabel: clockState.blockLabel,
      nextPhaseTime: clockState.nextPhaseTime,
      cycleCount,
    };
  } else {
    const totalPhaseSeconds = manualPhase === "focus" ? FOCUS_DURATION : BREAK_DURATION;
    const elapsed = totalPhaseSeconds - manualRemaining;
    const progressPercent = Math.min(
      100,
      Math.max(0, (elapsed / totalPhaseSeconds) * 100)
    );

    const m = Math.floor(manualRemaining / 60);
    const s = manualRemaining % 60;
    const blockLabel =
      manualPhase === "focus"
        ? "マニュアル 集中タイム (25分)"
        : "マニュアル 休憩タイム (5分)";

    currentState = {
      mode: "manual",
      phase: manualPhase,
      currentDate,
      remainingSeconds: manualRemaining,
      totalPhaseSeconds,
      progressPercent,
      isRunning: isManualRunning,
      blockLabel,
      nextPhaseTime: `${format2Digits(m)}:${format2Digits(s)}`,
      cycleCount,
    };
  }

  return {
    state: currentState,
    mode,
    setMode,
    toggleManualPlay,
    resetManualTimer,
    switchManualPhase,
  };
}
