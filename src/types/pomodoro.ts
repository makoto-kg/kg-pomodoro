export type Phase = "focus" | "break";

export type TimerMode = "clock" | "manual";

export type Theme = "nordic" | "sunny" | "midnight" | "zen";

export type CatBreed =
  | "mike"
  | "chatora"
  | "kuro"
  | "shiro"
  | "hachiware"
  | "sabatora"
  | "siamese"
  | "pastel";

export type FocusActivity = "laptop" | "studying" | "writing" | "pomodoro";
export type BreakActivity = "sleeping" | "eating" | "playing" | "tea";
export type CatActivity = FocusActivity | BreakActivity;

export interface CatInstance {
  id: string;
  name: string;
  breed: CatBreed;
  x: number; // percentage (5 - 90)
  y: number; // percentage (10 - 85)
  targetX: number;
  targetY: number;
  direction: 1 | -1; // 1 = right, -1 = left
  state: "walking" | "active";
  activity: CatActivity;
  scale: number;
  speed: number;
  speechBubble?: {
    text: string;
    expiresAt: number;
  };
  isPet: boolean;
}

export interface PomodoroState {
  mode: TimerMode;
  phase: Phase;
  currentDate: Date;
  remainingSeconds: number;
  totalPhaseSeconds: number;
  progressPercent: number; // 0 to 100
  isRunning: boolean; // For manual mode
  blockLabel: string; // e.g. "13:00 - 13:25 集中タイム"
  nextPhaseTime: string; // e.g. "13:25"
  cycleCount: number;
}

export interface Settings {
  soundEnabled: boolean;
  volume: number; // 0 to 1
  notificationsEnabled: boolean;
  theme: Theme;
  catCount: number;
  soundType: "chime" | "bell" | "marimba" | "gentle";
}
