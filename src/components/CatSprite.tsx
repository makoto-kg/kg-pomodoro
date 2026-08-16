"use client";

import React from "react";
import { CatBreed, CatActivity, Phase } from "@/types/pomodoro";

interface CatSpriteProps {
  breed: CatBreed;
  activity: CatActivity;
  state: "walking" | "active";
  direction: 1 | -1;
  phase: Phase;
  isPet?: boolean;
}

// Color palettes for different breeds
const BREED_COLORS: Record<
  CatBreed,
  {
    body: string;
    patch1?: string;
    patch2?: string;
    ears: string;
    innerEar: string;
    eyes: string;
    eyeRight?: string;
    nose: string;
    stripes?: string;
  }
> = {
  mike: {
    body: "#FDFBF7",
    patch1: "#E7843B", // warm orange
    patch2: "#3A3638", // charcoal
    ears: "#E7843B",
    innerEar: "#FFB8B8",
    eyes: "#3D7B58",
    nose: "#FF8E8E",
  },
  chatora: {
    body: "#F79A45", // warm ginger orange
    stripes: "#D26214", // vivid ginger stripes
    patch1: "#FFFFFF", // white patches for muzzle, belly, paw
    ears: "#F79A45",
    innerEar: "#FFB8B8",
    eyes: "#4C9A4B",
    nose: "#FF9B9B",
  },
  kuro: {
    body: "#2A282D",
    patch1: "#1E1C20",
    ears: "#2A282D",
    innerEar: "#5A4E58",
    eyes: "#FCD34D", // bright amber
    nose: "#E57373",
  },
  shiro: {
    body: "#FFFFFF",
    ears: "#FFFFFF",
    innerEar: "#FFCCD5",
    eyes: "#60A5FA", // blue
    eyeRight: "#FBBF24", // amber (odd eyes)
    nose: "#FFAAA6",
  },
  hachiware: {
    body: "#FFFFFF",
    patch1: "#2B2D42", // dark mask
    ears: "#2B2D42",
    innerEar: "#FFB6C1",
    eyes: "#4ADE80",
    nose: "#FF8DA1",
  },
  sabatora: {
    body: "#CBD5E1",
    stripes: "#64748B",
    ears: "#CBD5E1",
    innerEar: "#FBCFE8",
    eyes: "#2DD4BF",
    nose: "#F472B6",
  },
  siamese: {
    body: "#F5EBE6",
    patch1: "#5D4037", // chocolate mask
    ears: "#5D4037",
    innerEar: "#8D6E63",
    eyes: "#38BDF8", // bright sky blue
    nose: "#3E2723",
  },
  pastel: {
    body: "#FAF5FF",
    patch1: "#E9D5FF", // soft violet
    patch2: "#FDE047", // soft yellow
    ears: "#E9D5FF",
    innerEar: "#FCE7F3",
    eyes: "#818CF8",
    nose: "#F472B6",
  },
};

export const CatSprite: React.FC<CatSpriteProps> = ({
  breed,
  activity,
  state,
  direction,
  phase,
  isPet,
}) => {
  const colors = BREED_COLORS[breed] || BREED_COLORS.mike;
  const isWalking = state === "walking";

  return (
    <div
      className={`relative select-none transition-transform duration-300 ${
        isPet ? "animate-bounce" : ""
      }`}
      style={{
        transform: `scaleX(${direction})`,
      }}
    >
      <svg
        width="110"
        height="95"
        viewBox="0 0 110 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md overflow-visible"
      >
        <defs>
          <radialGradient id={`bellyGrad-${breed}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- CUSHION FOR SLEEPING BREAK ACTIVITY --- */}
        {!isWalking && activity === "sleeping" && (
          <g className="animate-pulse" style={{ animationDuration: "3s" }}>
            <ellipse cx="55" cy="78" rx="42" ry="14" fill="#FDE2E4" stroke="#F8B4B8" strokeWidth="2" />
            <ellipse cx="55" cy="77" rx="36" ry="10" fill="#FFF0F2" />
            {/* Cushion tufts */}
            <circle cx="45" cy="76" r="1.5" fill="#E89BA1" />
            <circle cx="65" cy="76" r="1.5" fill="#E89BA1" />
          </g>
        )}

        {/* --- CAT BODY & TAIL --- */}
        {/* Tail */}
        {isWalking ? (
          <path
            d="M 28 58 Q 14 42 20 28 Q 24 24 26 28 Q 24 38 32 54"
            fill={breed === "mike" ? colors.patch2 : (colors.stripes || colors.patch1 || colors.body)}
            className="animate-wiggle origin-bottom-right"
          />
        ) : activity === "sleeping" ? (
          <path
            d="M 32 68 C 22 68 18 56 24 50 C 26 48 29 52 28 56 C 25 60 28 64 34 65"
            fill={breed === "mike" ? colors.patch2 : (colors.stripes || colors.patch1 || colors.body)}
          />
        ) : (
          <path
            d="M 26 62 Q 10 52 14 36 Q 16 30 20 34 Q 18 46 30 58"
            fill={breed === "mike" ? colors.patch2 : (colors.stripes || colors.patch1 || colors.body)}
            className="animate-tail origin-bottom-right"
          />
        )}

        {/* Main Body */}
        {activity === "sleeping" && !isWalking ? (
          // Curled up sleeping body
          <g>
            <ellipse cx="54" cy="64" rx="26" ry="18" fill={colors.body} />
            {/* White belly for chatora */}
            {breed === "chatora" && (
              <ellipse cx="54" cy="66" rx="18" ry="11" fill="#FFFFFF" />
            )}
            {/* Calico spots - large brown & black coverage for Mike */}
            {breed === "mike" && (
              <>
                <path d="M 30 48 Q 50 44 48 66 Q 28 66 30 48 Z" fill={colors.patch1} />
                <path d="M 48 46 Q 78 48 76 70 Q 48 70 48 54 Z" fill={colors.patch2} />
                <path d="M 28 62 Q 36 64 34 70 Q 26 70 28 62 Z" fill={colors.patch1} />
              </>
            )}
            {/* Tabby stripes (not on chatora belly) */}
            {colors.stripes && breed !== "chatora" && (
              <>
                <path d="M 44 52 Q 48 58 45 66" stroke={colors.stripes} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 54 50 Q 56 58 55 68" stroke={colors.stripes} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 64 53 Q 66 59 65 67" stroke={colors.stripes} strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}
          </g>
        ) : (
          // Sitting or walking body
          <g>
            <ellipse cx="50" cy="58" rx="20" ry="17" fill={colors.body} />
            {/* Chest & belly highlight / White belly for chatora */}
            {breed === "chatora" ? (
              <ellipse cx="52" cy="60" rx="14" ry="12" fill="#FFFFFF" />
            ) : (
              <ellipse cx="52" cy="60" rx="13" ry="11" fill={`url(#bellyGrad-${breed})`} />
            )}

            {/* Breed patterns on body */}
            {breed === "mike" && (
              <>
                {/* Large brown patch covering back and upper left */}
                <path d="M 30 46 Q 48 42 46 62 Q 32 68 28 54 Z" fill={colors.patch1} />
                {/* Large black patch covering right side and hip */}
                <path d="M 46 44 Q 69 46 68 64 Q 50 68 46 56 Z" fill={colors.patch2} />
                {/* Additional brown marking near lower flank */}
                <path d="M 34 62 Q 44 64 42 71 Q 32 71 34 62 Z" fill={colors.patch1} />
              </>
            )}
            {breed === "hachiware" && (
              <path d="M 34 50 Q 42 46 38 64 Q 32 60 34 50 Z" fill={colors.patch1} />
            )}
            {/* Tabby stripes on body (not on chatora belly) */}
            {colors.stripes && breed !== "chatora" && (
              <>
                <path d="M 40 48 Q 44 54 42 62" stroke={colors.stripes} strokeWidth="2" strokeLinecap="round" />
                <path d="M 50 46 Q 52 53 50 62" stroke={colors.stripes} strokeWidth="2" strokeLinecap="round" />
                <path d="M 60 48 Q 62 55 60 63" stroke={colors.stripes} strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </g>
        )}

        {/* --- LEGS & PAWS --- */}
        {isWalking ? (
          <g className="animate-walk">
            {/* Left back leg */}
            <ellipse cx="36" cy="74" rx="4" ry="7" fill={colors.body} className="animate-leg-1" />
            {/* Left front leg (Creamy whitish sock for chatora) */}
            <ellipse cx="46" cy="74" rx="4" ry="7" fill={breed === "chatora" ? "#F6EDE4" : colors.body} stroke={breed === "chatora" ? "#DAC4B0" : "none"} strokeWidth="0.6" className="animate-leg-2" />
            {/* Right back leg */}
            <ellipse cx="56" cy="74" rx="4" ry="7" fill={colors.body} className="animate-leg-1" />
            {/* Right front leg */}
            <ellipse cx="66" cy="74" rx="4" ry="7" fill={colors.body} className="animate-leg-2" />
          </g>
        ) : activity === "sleeping" ? (
          <g>
            <ellipse cx="44" cy="72" rx="5" ry="3.5" fill={breed === "chatora" ? "#F6EDE4" : colors.body} stroke={breed === "chatora" ? "#DAC4B0" : "none"} strokeWidth="0.6" />
            <ellipse cx="62" cy="72" rx="5" ry="3.5" fill={colors.body} />
          </g>
        ) : (
          <g>
            {/* Front paws neatly placed (Left front paw creamy whitish for chatora) */}
            <ellipse cx="45" cy="73" rx="5" ry="4" fill={breed === "chatora" ? "#F6EDE4" : colors.body} stroke={breed === "chatora" ? "#DAC4B0" : "#E2E8F0"} strokeWidth="0.8" />
            <ellipse cx="58" cy="73" rx="5" ry="4" fill={colors.body} stroke="#E2E8F0" strokeWidth="0.5" />
            {/* Toe lines */}
            <line x1="43" y1="73" x2="43" y2="76" stroke={breed === "chatora" ? "#BFA38E" : "#CBD5E1"} strokeWidth="1" strokeLinecap="round" />
            <line x1="46" y1="73" x2="46" y2="76" stroke={breed === "chatora" ? "#BFA38E" : "#CBD5E1"} strokeWidth="1" strokeLinecap="round" />
            <line x1="56" y1="73" x2="56" y2="76" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
            <line x1="59" y1="73" x2="59" y2="76" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
          </g>
        )}

        {/* --- CAT HEAD --- */}
        <g transform={activity === "sleeping" && !isWalking ? "translate(8, 12)" : "translate(0, 0)"}>
          {/* Ears (Shorter, cute cat proportions) */}
          {/* Left Ear */}
          <path
            d="M 40 30 L 34 18 Q 43 20 47 28 Z"
            fill={breed === "mike" ? colors.patch1 : colors.ears}
            stroke={colors.patch1 || colors.body}
            strokeWidth="1"
          />
          <path d="M 39 27 L 36 20 Q 42 21 44 26 Z" fill={colors.innerEar} />

          {/* Right Ear */}
          <path
            d="M 63 28 Q 67 20 76 18 L 70 30 Z"
            fill={breed === "mike" ? colors.patch2 : colors.ears}
            stroke={colors.patch1 || colors.body}
            strokeWidth="1"
          />
          <path d="M 66 26 Q 68 21 74 20 L 71 27 Z" fill={colors.innerEar} />

          {/* Head Base */}
          <ellipse cx="55" cy="38" rx="19" ry="16" fill={colors.body} />

          {/* Breed Head markings */}
          {breed === "hachiware" && (
            <path
              d="M 36 32 Q 42 22 55 30 Q 68 22 74 32 Q 74 46 68 50 Q 55 38 42 50 Q 36 46 36 32 Z"
              fill={colors.patch1}
            />
          )}
          {breed === "mike" && (
            <>
              {/* Large Brown/Orange on left face */}
              <path
                d="M 36 24 Q 49 23 52 34 Q 48 48 37 46 Q 33 38 36 24 Z"
                fill={colors.patch1}
              />
              {/* Large Black/Charcoal on right face */}
              <path
                d="M 58 23 Q 74 24 74 44 Q 69 49 59 46 Q 54 35 58 23 Z"
                fill={colors.patch2}
              />
            </>
          )}
          {breed === "siamese" && (
            <ellipse cx="55" cy="40" rx="13" ry="10" fill={colors.patch1} />
          )}
          {colors.stripes && (
            <>
              {/* Parallel vertical forehead stripes */}
              <line x1="55" y1="24" x2="55" y2="30" stroke={colors.stripes} strokeWidth="2" strokeLinecap="round" />
              <line x1="49" y1="25" x2="49" y2="30" stroke={colors.stripes} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="61" y1="25" x2="61" y2="30" stroke={colors.stripes} strokeWidth="1.8" strokeLinecap="round" />
            </>
          )}

          {/* White muzzle around mouth for chatora (茶トラ白) */}
          {breed === "chatora" && (
            <ellipse cx="55" cy="43" rx="10" ry="6.5" fill="#FFFFFF" />
          )}

          {/* Cheeks Blush */}
          <circle cx="43" cy="42" r="3.5" fill="#FFAAA6" opacity="0.6" />
          <circle cx="67" cy="42" r="3.5" fill="#FFAAA6" opacity="0.6" />

          {/* Eyes */}
          {activity === "sleeping" && !isWalking ? (
            // Peaceful sleeping eyes ^ ^
            <g stroke="#4B5563" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M 44 38 Q 48 42 52 38" />
              <path d="M 58 38 Q 62 42 66 38" />
            </g>
          ) : (
            // Open cute eyes
            <g>
              {/* Left Eye */}
              <ellipse cx="48" cy="37" rx="3.5" ry="4.5" fill={colors.eyes} />
              <circle cx="47" cy="35.5" r="1.5" fill="#FFFFFF" />
              <circle cx="49.5" cy="39" r="0.7" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="62" cy="37" rx="3.5" ry="4.5" fill={colors.eyeRight || colors.eyes} />
              <circle cx="61" cy="35.5" r="1.5" fill="#FFFFFF" />
              <circle cx="63.5" cy="39" r="0.7" fill="#FFFFFF" />
            </g>
          )}

          {/* Nose & Mouth */}
          <polygon points="53.5,41 56.5,41 55,43" fill={colors.nose} />
          <path
            d="M 52 44 Q 55 46 55 43 Q 55 46 58 44"
            fill="none"
            stroke="#64748B"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Whiskers */}
          <g stroke="#94A3B8" strokeWidth="1" strokeLinecap="round">
            <line x1="38" y1="41" x2="28" y2="39" />
            <line x1="38" y1="44" x2="27" y2="45" />
            <line x1="72" y1="41" x2="82" y2="39" />
            <line x1="72" y1="44" x2="83" y2="45" />
          </g>

          {/* --- FOCUS ACCESSORIES --- */}
          {phase === "focus" && !isWalking && (
            <>
              {/* Smart Glasses for reading / laptop */}
              {(activity === "laptop" || activity === "studying") && (
                <g stroke="#8B5CF6" strokeWidth="1.6" fill="none">
                  <circle cx="48" cy="37" r="5.5" fill="#EDE9FE" fillOpacity="0.25" />
                  <circle cx="62" cy="37" r="5.5" fill="#EDE9FE" fillOpacity="0.25" />
                  <path d="M 53.5 37 Q 55 35 56.5 37" />
                  <path d="M 42.5 37 L 35 34" strokeLinecap="round" />
                  <path d="M 67.5 37 L 75 34" strokeLinecap="round" />
                </g>
              )}

              {/* Tomato headband for pomodoro activity */}
              {activity === "pomodoro" && (
                <g>
                  {/* Headband */}
                  <path d="M 38 28 Q 55 24 72 28" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                  {/* Mini Tomato on headband */}
                  <circle cx="55" cy="22" r="6" fill="#DC2626" />
                  <path d="M 55 16 Q 54 13 56 12" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <polygon points="53,16 57,16 55,14" fill="#22C55E" />
                </g>
              )}
            </>
          )}
        </g>

        {/* --- ACTIVITY PROPS (DESK / OBJECTS) --- */}
        {!isWalking && (
          <g>
            {/* 1. LAPTOP (Focus) */}
            {activity === "laptop" && (
              <g transform="translate(68, 52)">
                {/* Desk surface */}
                <ellipse cx="14" cy="24" rx="22" ry="6" fill="#E2E8F0" />
                {/* Laptop Base */}
                <polygon points="0,22 28,22 24,18 4,18" fill="#94A3B8" />
                {/* Laptop Screen */}
                <polygon points="4,18 24,18 22,2 6,2" fill="#334155" />
                <rect x="7" y="4" width="14" height="12" rx="1" fill="#38BDF8" className="animate-pulse" />
                {/* Code lines on screen */}
                <line x1="9" y1="7" x2="16" y2="7" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                <line x1="9" y1="10" x2="19" y2="10" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" />
                <line x1="9" y1="13" x2="14" y2="13" stroke="#86EFAC" strokeWidth="1" strokeLinecap="round" />
                {/* Cat typing paws */}
                <ellipse cx="2" cy="18" rx="3.5" ry="2.5" fill={colors.body} className="animate-bounce" style={{ animationDuration: "0.4s" }} />
              </g>
            )}

            {/* 2. STUDYING / BOOKS (Focus) */}
            {activity === "studying" && (
              <g transform="translate(65, 54)">
                {/* Stack of books */}
                <rect x="0" y="16" width="24" height="6" rx="2" fill="#3B82F6" />
                <rect x="2" y="10" width="22" height="6" rx="2" fill="#10B981" />
                {/* Open book on top */}
                <path d="M 2 8 Q 12 11 22 8 L 22 2 Q 12 5 2 2 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.8" />
                <line x1="12" y1="3" x2="12" y2="10" stroke="#B45309" strokeWidth="1" />
                {/* Bookmark */}
                <path d="M 18 2 L 18 12 L 20 10 L 22 12 L 22 2 Z" fill="#EF4444" />
              </g>
            )}

            {/* 3. WRITING / NOTEBOOK (Focus) */}
            {activity === "writing" && (
              <g transform="translate(64, 52)">
                {/* Notepad */}
                <rect x="4" y="8" width="18" height="18" rx="2" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1" transform="rotate(8 13 17)" />
                <line x1="7" y1="13" x2="17" y2="15" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
                <line x1="8" y1="17" x2="18" y2="19" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="22" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
                {/* Pencil */}
                <g transform="translate(18, 4) rotate(45)" className="animate-bounce" style={{ animationDuration: "0.6s" }}>
                  <polygon points="0,0 4,0 4,14 0,14" fill="#FBBF24" />
                  <polygon points="0,14 4,14 2,18" fill="#FDE68A" />
                  <polygon points="1,16 3,16 2,18" fill="#1F2937" />
                  <rect x="0" y="0" width="4" height="3" fill="#F43F5E" />
                </g>
              </g>
            )}

            {/* 4. POMODORO TIMER DESK (Focus) */}
            {activity === "pomodoro" && (
              <g transform="translate(70, 56)">
                <ellipse cx="10" cy="18" rx="14" ry="5" fill="#E2E8F0" />
                {/* Tomato Timer */}
                <circle cx="10" cy="12" r="7" fill="#EF4444" />
                {/* White dial on tomato */}
                <rect x="6" y="11" width="8" height="2.5" rx="1" fill="#FFFFFF" />
                <polygon points="9,6 11,6 10,4" fill="#22C55E" />
                <path d="M 10 4 Q 10 2 12 1" stroke="#15803D" strokeWidth="1.5" fill="none" />
              </g>
            )}

            {/* 5. SLEEPING ZZZ (Break) */}
            {activity === "sleeping" && (
              <g className="animate-float" transform="translate(72, 8)">
                <text x="0" y="16" fill="#818CF8" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
                  Z
                </text>
                <text x="8" y="10" fill="#A78BFA" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  z
                </text>
                <text x="14" y="4" fill="#C084FC" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                  z
                </text>
              </g>
            )}

            {/* 6. EATING TAIYAKI / FISH (Break) */}
            {activity === "eating" && (
              <g transform="translate(68, 52)">
                <ellipse cx="12" cy="20" rx="16" ry="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                {/* Golden Taiyaki */}
                <g className="animate-wiggle" style={{ transformOrigin: "center" }}>
                  <path
                    d="M 4 16 C 6 12 14 11 18 14 C 20 12 24 14 22 17 C 24 19 20 21 18 19 C 14 22 6 21 4 16 Z"
                    fill="#F59E0B"
                    stroke="#D97706"
                    strokeWidth="1"
                  />
                  <circle cx="8" cy="15" r="1" fill="#78350F" />
                  <path d="M 10 14 Q 12 17 14 14" stroke="#D97706" strokeWidth="1" fill="none" />
                  <path d="M 14 14 Q 16 17 18 14" stroke="#D97706" strokeWidth="1" fill="none" />
                </g>
                {/* Floating love hearts */}
                <path
                  d="M 16 4 C 16 2 13 0 11 2 C 9 0 6 2 6 4 C 6 8 11 11 11 11 C 11 11 16 8 16 4 Z"
                  fill="#F43F5E"
                  className="animate-float"
                  transform="scale(0.7) translate(10, -5)"
                />
              </g>
            )}

            {/* 7. PLAYING YARN (Break) */}
            {activity === "playing" && (
              <g transform="translate(66, 50)">
                {/* Bouncing Yarn ball */}
                <g className="animate-bounce" style={{ animationDuration: "1.2s" }}>
                  <circle cx="14" cy="14" r="10" fill="#EC4899" />
                  {/* Yarn texture lines */}
                  <path d="M 6 12 Q 14 8 22 14" stroke="#BE185D" strokeWidth="1.5" fill="none" />
                  <path d="M 8 18 Q 14 22 20 16" stroke="#BE185D" strokeWidth="1.5" fill="none" />
                  <path d="M 10 7 Q 18 14 12 21" stroke="#BE185D" strokeWidth="1.5" fill="none" />
                  {/* Loose thread */}
                  <path d="M 22 18 Q 28 24 20 28 Q 14 26 8 26" stroke="#EC4899" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
                </g>
              </g>
            )}

            {/* 8. TEA TIME (Break) */}
            {activity === "tea" && (
              <g transform="translate(66, 50)">
                <ellipse cx="14" cy="22" rx="14" ry="5" fill="#E2E8F0" />
                {/* Teacup & Saucer */}
                <ellipse cx="14" cy="20" rx="10" ry="3.5" fill="#CBD5E1" />
                <path d="M 6 12 Q 6 19 14 19 Q 22 19 22 12 Z" fill="#10B981" stroke="#059669" strokeWidth="1" />
                <ellipse cx="14" cy="12" rx="8" ry="2.5" fill="#6EE7B7" />
                {/* Cup handle */}
                <path d="M 21 13 Q 25 15 21 17" stroke="#059669" strokeWidth="1.5" fill="none" />
                {/* Rising Steam */}
                <g className="animate-float">
                  <path d="M 12 8 Q 14 5 12 2" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M 16 8 Q 14 5 16 2" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </g>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
