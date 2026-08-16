"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CatInstance,
  CatBreed,
  CatActivity,
  FocusActivity,
  BreakActivity,
  Phase,
} from "@/types/pomodoro";
import { CatSprite } from "./CatSprite";
import { soundManager } from "@/utils/audio";

interface CatCanvasProps {
  phase: Phase;
  catCount: number;
  soundEnabled: boolean;
  theme: string;
}

const CAT_NAMES = [
  "タマ",
  "カブ",
  "クロ",
  "ユキ",
  "ハチ",
  "ソラ",
  "モカ",
  "ルナ",
  "きなこ",
  "むぎ",
  "コテツ",
  "あんこ",
];

const CAT_BREEDS: CatBreed[] = [
  "mike",
  "chatora",
  "kuro",
  "shiro",
  "hachiware",
  "sabatora",
  "siamese",
  "pastel",
];

const FOCUS_ACTIVITIES: FocusActivity[] = [
  "laptop",
  "studying",
  "writing",
  "pomodoro",
];

const BREAK_ACTIVITIES: BreakActivity[] = [
  "sleeping",
  "eating",
  "playing",
  "tea",
];

const FOCUS_QUOTES = [
  "集中集中ニャ！💻",
  "コード書いてるニャ〜🐾",
  "お勉強がんばるニャ！📚",
  "ポモドーロで捗るニャ🍅",
  "一緒にがんばろうニャ✨",
  "あと少しで休憩ニャよ！",
  "タスク片付けるニャ！",
  "キリッとお仕事中ニャ👓",
];

const BREAK_QUOTES = [
  "ふあぁ〜おやすみニャ😴",
  "たい焼きおいしいニャ〜🐟",
  "毛糸玉たのしいニャ🧶",
  "お茶でほっこりニャ🍵",
  "なでてくれてありがとうニャ♡",
  "ゴロゴロ…しあわせニャ♪",
  "のび〜っとストレッチニャ🐱",
  "リフレッシュ完了ニャ✨",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomCat(id: number, phase: Phase, existingCats: CatInstance[]): CatInstance {
  const breed = CAT_BREEDS[id % CAT_BREEDS.length];
  // Specific names: Mike is "タマ", Chatora is "カブ"
  const breedNames: Partial<Record<CatBreed, string>> = {
    mike: "タマ",
    chatora: "カブ",
  };
  const name = breedNames[breed] || CAT_NAMES[id % CAT_NAMES.length];
  const activity =
    phase === "focus"
      ? getRandomItem(FOCUS_ACTIVITIES)
      : getRandomItem(BREAK_ACTIVITIES);

  // Distribute cats across horizontal space
  const section = 80 / Math.max(1, existingCats.length + 1);
  const baseX = 8 + id * section + (Math.random() * 10 - 5);
  const x = Math.min(88, Math.max(6, baseX));
  const y = 35 + (id % 3) * 16 + Math.random() * 10; // spread vertically

  return {
    id: `cat-${id}-${Date.now()}`,
    name,
    breed,
    x,
    y,
    targetX: x,
    targetY: y,
    direction: Math.random() > 0.5 ? 1 : -1,
    state: "active",
    activity,
    scale: 0.85 + Math.random() * 0.25,
    speed: 0.35 + Math.random() * 0.3,
    isPet: false,
  };
}

export const CatCanvas: React.FC<CatCanvasProps> = ({
  phase,
  catCount,
  soundEnabled,
  theme,
}) => {
  const [cats, setCats] = useState<CatInstance[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<
    { id: string; x: number; y: number; text: string }[]
  >([]);

  // Initialize cats or adjust count
  useEffect(() => {
    setCats((prev) => {
      if (prev.length === catCount) return prev;
      const nextCats: CatInstance[] = [];
      for (let i = 0; i < catCount; i++) {
        if (prev[i]) {
          nextCats.push(prev[i]);
        } else {
          nextCats.push(createRandomCat(i, phase, nextCats));
        }
      }
      return nextCats;
    });
  }, [catCount, phase]);

  // Update cat activities when phase changes
  useEffect(() => {
    setCats((prev) =>
      prev.map((cat) => ({
        ...cat,
        activity:
          phase === "focus"
            ? getRandomItem(FOCUS_ACTIVITIES)
            : getRandomItem(BREAK_ACTIVITIES),
        // When break starts, sleeping or eating is common
        state: "active",
      }))
    );
  }, [phase]);

  // AI roaming ticker loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCats((prev) =>
        prev.map((cat) => {
          // If currently walking towards target
          if (cat.state === "walking") {
            const dx = cat.targetX - cat.x;
            const dy = cat.targetY - cat.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 1.5) {
              // Reached destination! Switch to active state
              const nextActivity =
                phase === "focus"
                  ? getRandomItem(FOCUS_ACTIVITIES)
                  : getRandomItem(BREAK_ACTIVITIES);
              return {
                ...cat,
                x: cat.targetX,
                y: cat.targetY,
                state: "active",
                activity: nextActivity,
              };
            } else {
              // Step towards target
              const step = cat.speed;
              const nextX = cat.x + (dx / dist) * step;
              const nextY = cat.y + (dy / dist) * step;
              return {
                ...cat,
                x: nextX,
                y: nextY,
                direction: dx > 0 ? 1 : -1,
              };
            }
          } else {
            // Cat is active in place. Random chance to start walking somewhere new
            // Cats sleep more in break phase, walk slightly less
            const walkChance = phase === "break" ? 0.08 : 0.12;
            if (Math.random() < walkChance) {
              const targetX = 6 + Math.random() * 80;
              const targetY = 32 + Math.random() * 45;
              return {
                ...cat,
                targetX,
                targetY,
                state: "walking",
                direction: targetX > cat.x ? 1 : -1,
              };
            }
            return cat;
          }
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  // Handle clicking / petting a cat
  const handlePetCat = useCallback(
    (catId: string, e: React.MouseEvent) => {
      e.stopPropagation();

      if (soundEnabled) {
        soundManager.playCatMeow();
      }

      // Add floating heart effect
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const heartX = ((e.clientX - rect.left) / rect.width) * 100;
        const heartY = ((e.clientY - rect.top) / rect.height) * 100;
        const heartId = `heart-${Date.now()}-${Math.random()}`;
        const emojis = ["❤️", "✨", "🐾", "🐟", "💖", "🌸", "⭐"];
        const heartEmoji = getRandomItem(emojis);

        setHearts((prev) => [
          ...prev,
          { id: heartId, x: heartX, y: heartY, text: heartEmoji },
        ]);

        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== heartId));
        }, 1500);
      }

      // Trigger speech bubble and bounce
      setCats((prev) =>
        prev.map((cat) => {
          if (cat.id !== catId) return cat;
          const quotes = phase === "focus" ? FOCUS_QUOTES : BREAK_QUOTES;
          return {
            ...cat,
            isPet: true,
            speechBubble: {
              text: getRandomItem(quotes),
              expiresAt: Date.now() + 3500,
            },
          };
        })
      );

      setTimeout(() => {
        setCats((prev) =>
          prev.map((cat) => (cat.id === catId ? { ...cat, isPet: false } : cat))
        );
      }, 700);
    },
    [phase, soundEnabled]
  );

  // Clean expired speech bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCats((prev) =>
        prev.map((cat) => {
          if (cat.speechBubble && cat.speechBubble.expiresAt < now) {
            return { ...cat, speechBubble: undefined };
          }
          return cat;
        })
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-inner border border-white/20 select-none backdrop-blur-sm transition-all duration-700"
      style={{
        background:
          theme === "midnight"
            ? "linear-gradient(180deg, rgba(24, 24, 37, 0.8) 0%, rgba(15, 15, 23, 0.95) 100%)"
            : theme === "sunny"
            ? "linear-gradient(180deg, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.4) 60%, rgba(254, 249, 195, 0.8) 100%)"
            : theme === "zen"
            ? "linear-gradient(180deg, rgba(236, 253, 245, 0.7) 0%, rgba(209, 250, 229, 0.6) 60%, rgba(243, 244, 246, 0.8) 100%)"
            : "linear-gradient(180deg, rgba(255, 247, 237, 0.8) 0%, rgba(254, 237, 213, 0.6) 50%, rgba(255, 251, 235, 0.9) 100%)",
      }}
    >
      {/* Background Room Decor based on theme */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Floor Plank Lines */}
        <div className="absolute bottom-0 w-full h-32 border-t border-amber-900/10 flex flex-col justify-evenly">
          <div className="w-full h-[1px] bg-amber-900/5" />
          <div className="w-full h-[1px] bg-amber-900/5" />
          <div className="w-full h-[1px] bg-amber-900/5" />
        </div>

        {/* Cozy Window in background */}
        <div className="absolute top-4 right-8 w-24 h-24 rounded-t-full border-4 border-amber-800/20 bg-sky-100/40 flex items-center justify-center overflow-hidden">
          <div className="w-full h-[2px] bg-amber-800/20" />
          <div className="absolute h-full w-[2px] bg-amber-800/20" />
          {theme === "midnight" ? (
            <div className="absolute top-2 right-4 text-amber-200 text-xs">🌙</div>
          ) : (
            <div className="absolute top-2 right-3 text-amber-400 text-xs">☀️</div>
          )}
        </div>

        {/* Potted Houseplant */}
        <div className="absolute bottom-16 left-6 flex flex-col items-center">
          <div className="text-xl">🌿</div>
          <div className="w-6 h-5 bg-amber-700/40 rounded-b-md border border-amber-800/30" />
        </div>

        {/* Bookshelf / Wall Clock */}
        <div className="absolute top-6 left-8 flex items-center gap-2">
          <div className="px-2 py-0.5 bg-amber-800/20 rounded text-[10px] text-amber-900/60 font-mono">
            {phase === "focus" ? "📚 集中中・しずかにニャ" : "☕ 休憩中・のんびりニャ"}
          </div>
        </div>
      </div>

      {/* Roaming Cats */}
      {cats.map((cat) => {
        return (
          <div
            key={cat.id}
            onClick={(e) => handlePetCat(cat.id, e)}
            className="absolute cursor-pointer transition-all duration-200 group hover:scale-105 z-10"
            style={{
              left: `${cat.x}%`,
              top: `${cat.y}%`,
              transform: `translate(-50%, -50%) scale(${cat.scale})`,
              zIndex: Math.floor(cat.y),
            }}
            title={`${cat.name} (${cat.breed}) - クリックしてなでる`}
          >
            {/* Speech Bubble on click */}
            {cat.speechBubble && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-2xl shadow-lg border border-amber-200 animate-bounce pointer-events-none z-30">
                <span>{cat.speechBubble.text}</span>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-amber-200 transform rotate-45" />
              </div>
            )}

            {/* Cat Name Tag on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/80 text-white text-[10px] px-2 py-0.5 rounded-full pointer-events-none z-20">
              {cat.name}
            </div>

            {/* The Animated Cat Sprite */}
            <CatSprite
              breed={cat.breed}
              activity={cat.activity}
              state={cat.state}
              direction={cat.direction}
              phase={phase}
              isPet={cat.isPet}
            />
          </div>
        );
      })}

      {/* Floating Hearts / Particles when pet */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-xl pointer-events-none animate-float-up z-40"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {h.text}
        </div>
      ))}

      {/* Interactive Helper Banner */}
      <div className="absolute bottom-2 right-3 text-[11px] text-amber-900/60 bg-white/50 backdrop-blur-md px-2.5 py-1 rounded-full pointer-events-none border border-amber-900/10">
        💡 猫をクリックすると撫でられます🐾
      </div>
    </div>
  );
};
