"use client";

import React from "react";
import { Theme, Phase } from "@/types/pomodoro";

interface RoomDecorProps {
  theme: Theme;
  phase: Phase;
}

export const RoomDecor: React.FC<RoomDecorProps> = ({ theme, phase }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* ------------------------------------------------------------- */}
      {/* 1. NORDIC THEME (☕ 北欧カフェ)                              */}
      {/* ------------------------------------------------------------- */}
      {theme === "nordic" && (
        <div className="w-full h-full relative">
          {/* Wall texture / Upper 38% */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F2EB] via-[#EFE6DB] to-[#E5D8C8]" />

          {/* Wooden Floor Planks (Spacious Bottom 62%) */}
          <div className="absolute bottom-0 w-full h-[62%] bg-gradient-to-b from-[#DEC4A6] via-[#D3B796] to-[#C4A683] border-t-4 border-[#A88762] shadow-inner">
            {/* Plank horizontal grain lines */}
            <div className="w-full h-full opacity-35 flex flex-col justify-between py-2">
              <div className="w-full h-[1px] bg-[#8C6D48]" />
              <div className="w-full h-[1px] bg-[#8C6D48]" />
              <div className="w-full h-[1px] bg-[#8C6D48]" />
              <div className="w-full h-[1px] bg-[#8C6D48]" />
              <div className="w-full h-[1px] bg-[#8C6D48]" />
              <div className="w-full h-[1px] bg-[#8C6D48]" />
            </div>
            {/* Vertical plank joints */}
            <div className="absolute inset-0 opacity-20 flex justify-around">
              <div className="h-full w-[1px] bg-[#8C6D48]" />
              <div className="h-full w-[1px] bg-[#8C6D48]" />
              <div className="h-full w-[1px] bg-[#8C6D48]" />
              <div className="h-full w-[1px] bg-[#8C6D48]" />
              <div className="h-full w-[1px] bg-[#8C6D48]" />
            </div>
          </div>

          {/* Geometric Oval Rug on floor */}
          <div className="absolute bottom-5 left-[18%] w-[64%] h-24 sm:h-32 rounded-[100px] bg-[#EBE2D5] border-2 border-[#D5C2AF] opacity-90 shadow-sm flex items-center justify-center overflow-hidden">
            {/* Scandinavian geometric pattern */}
            <div className="w-full h-full opacity-25 flex items-center justify-around">
              <div className="w-14 h-14 border-2 border-[#8A6A47] rounded-full" />
              <div className="w-18 h-18 border-2 border-[#8A6A47] rotate-45" />
              <div className="w-14 h-14 border-2 border-[#8A6A47] rounded-full" />
            </div>
          </div>

          {/* WINDOW: Nordic Arched Wooden Window (Top Right) */}
          <div className="absolute top-2 right-6 sm:right-10 w-24 sm:w-28 h-28 sm:h-32 rounded-t-full bg-sky-200 border-4 border-[#9C7A53] shadow-md overflow-hidden z-0">
            {/* Sky, gentle clouds & sun */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#BAE6FD]">
              {/* Sun */}
              <div className="absolute top-2 right-3 w-6 h-6 rounded-full bg-amber-200/90 shadow-sm" />
              {/* Cloud 1 */}
              <div className="absolute top-6 left-2 w-9 h-3 bg-white/80 rounded-full blur-[0.5px]" />
              {/* Cloud 2 */}
              <div className="absolute top-12 right-2 w-10 h-3.5 bg-white/70 rounded-full blur-[0.5px]" />
            </div>
            {/* Window Wooden Grids */}
            <div className="absolute inset-0 flex flex-col justify-center">
              <div className="w-full h-1.5 bg-[#9C7A53]" />
            </div>
            <div className="absolute inset-0 flex justify-center">
              <div className="h-full w-1.5 bg-[#9C7A53]" />
            </div>
            {/* Window Sill with Flower Pot */}
            <div className="absolute bottom-0 w-full h-2.5 bg-[#7A5B37] flex items-center justify-center">
              <div className="absolute -top-3.5 w-3.5 h-3.5 bg-amber-700 rounded-b-sm flex items-center justify-center">
                <div className="text-[9px] -mt-1.5">🌱</div>
              </div>
            </div>
          </div>

          {/* WALL SHELF (Top Left) */}
          <div className="absolute top-4 left-6 sm:left-10 flex flex-col items-center z-0">
            {/* Shelf items */}
            <div className="flex items-end gap-2 mb-0.5">
              <div className="w-2.5 h-5 bg-[#C25953] rounded-t-sm" />
              <div className="w-3 h-6 bg-[#4E7D96] rounded-t-sm" />
              <div className="w-2.5 h-4.5 bg-[#E0A96D] rounded-t-sm" />
              <div className="text-[11px]">🌵</div>
            </div>
            {/* Wood plank */}
            <div className="w-26 sm:w-30 h-2 bg-[#9C7A53] rounded-sm shadow-sm" />
            <div className="w-22 flex justify-between px-1">
              <div className="w-1.5 h-2 bg-[#7A5B37]" />
              <div className="w-1.5 h-2 bg-[#7A5B37]" />
            </div>
          </div>

          {/* HANGING PENDANT LAMP (Top Center) */}
          <div className="absolute top-0 left-[48%] flex flex-col items-center z-0">
            <div className="w-[1.5px] h-8 bg-slate-700" />
            <div className="w-6 h-3.5 bg-[#3E3E3E] rounded-t-full shadow-sm" />
            {/* Soft Warm Glow */}
            <div className="w-10 h-10 -mt-1.5 rounded-full bg-amber-300/30 blur-md pointer-events-none" />
          </div>

          {/* LEFT FURNITURE: Scandinavian Wooden Desk & Chair (On Floor) */}
          <div className="absolute bottom-10 left-4 sm:left-8 flex items-end z-10">
            {/* Wooden Desk */}
            <div className="relative">
              {/* Laptop & mug on desk */}
              <div className="flex items-end justify-between px-2 mb-0.5">
                <div className="w-7 h-5 bg-slate-300 rounded-t-sm border border-slate-400 flex items-center justify-center">
                  <div className="w-5 h-3 bg-sky-100 rounded-[1px]" />
                </div>
                <div className="w-2.5 h-3 bg-amber-700 rounded-sm" />
              </div>
              {/* Desk Top */}
              <div className="w-24 sm:w-28 h-3.5 bg-[#A8835C] rounded-sm shadow-sm border-t border-[#C7A37C]" />
              {/* Desk Legs */}
              <div className="w-full flex justify-between px-2">
                <div className="w-2 h-14 bg-[#8A6640] rounded-b-sm transform -rotate-3" />
                <div className="w-2 h-14 bg-[#8A6640] rounded-b-sm transform rotate-3" />
              </div>
            </div>
            {/* Wooden Chair */}
            <div className="relative -ml-3 -mb-1">
              <div className="w-2 h-9 bg-[#7A5B37] rounded-t-sm transform -rotate-6" />
              <div className="w-8 h-2 bg-[#A8835C] rounded-sm" />
              <div className="w-8 flex justify-between px-1">
                <div className="w-1.5 h-10 bg-[#7A5B37]" />
                <div className="w-1.5 h-10 bg-[#7A5B37]" />
              </div>
            </div>
          </div>

          {/* CENTER-RIGHT FURNITURE: Cozy Nordic Sofa (Mustard Fabric) */}
          <div className="absolute bottom-10 right-24 sm:right-32 flex flex-col items-center z-10">
            {/* Sofa Backrest & Cushions */}
            <div className="flex gap-1 mb-[-2px] z-0">
              <div className="w-12 h-12 bg-[#D4A359] rounded-t-xl border-t-2 border-[#E5B86F] shadow-sm flex items-center justify-center">
                <div className="w-6 h-6 rounded-md bg-[#5B7B88] rotate-12 opacity-80" />
              </div>
              <div className="w-12 h-12 bg-[#D4A359] rounded-t-xl border-t-2 border-[#E5B86F] shadow-sm flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#E58F7D] opacity-80" />
              </div>
            </div>
            {/* Sofa Seat Cushion */}
            <div className="w-30 h-6 bg-[#C49247] rounded-xl border-t border-[#E5B86F] shadow-md z-10 flex items-center justify-between px-1.5">
              <div className="w-3.5 h-7 -mt-2 bg-[#B88439] rounded-t-lg shadow-sm" />
              <div className="w-3.5 h-7 -mt-2 bg-[#B88439] rounded-t-lg shadow-sm" />
            </div>
            {/* Sofa Wooden Legs */}
            <div className="w-24 flex justify-between px-2 z-0">
              <div className="w-1.5 h-3 bg-[#694A28] rounded-b-sm transform -rotate-12" />
              <div className="w-1.5 h-3 bg-[#694A28] rounded-b-sm transform rotate-12" />
            </div>
          </div>

          {/* RIGHT FURNITURE: Natural Wood Cat Tree (Far Right) */}
          <div className="absolute bottom-8 right-3 sm:right-6 flex flex-col items-center z-10">
            {/* Top platform */}
            <div className="w-12 h-2.5 bg-[#CBB59D] rounded-full shadow-sm" />
            {/* Sisal pole 1 */}
            <div className="w-3 h-10 bg-[#DECDBC] border-y border-[#B59D84]" />
            {/* Middle platform & hanging ball */}
            <div className="relative w-14 h-2.5 bg-[#CBB59D] rounded-full shadow-sm flex justify-end pr-2">
              <div className="absolute top-2 right-3 flex flex-col items-center animate-wiggle">
                <div className="w-[1px] h-3 bg-slate-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              </div>
            </div>
            {/* Sisal pole 2 */}
            <div className="w-3 h-12 bg-[#DECDBC] border-y border-[#B59D84]" />
            {/* Base platform */}
            <div className="w-16 h-3 bg-[#A89077] rounded-lg shadow-md" />
          </div>

          {/* Potted Monstera Plant (Left Corner) */}
          <div className="absolute bottom-12 left-1 flex flex-col items-center z-10">
            <div className="text-2xl filter drop-shadow-sm">🌿</div>
            <div className="w-6 h-5 bg-[#C27D56] rounded-b-md shadow-sm" />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. SUNNY THEME (☀️ 陽だまりリビング)                           */}
      {/* ------------------------------------------------------------- */}
      {theme === "sunny" && (
        <div className="w-full h-full relative">
          {/* Wall: Bright warm sunny pastel gradient (Upper 38%) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFEEF] via-[#FEF9C3] to-[#FEF08A]/70" />

          {/* Floor: Bright maple wood floor (Spacious Bottom 62%) */}
          <div className="absolute bottom-0 w-full h-[62%] bg-gradient-to-b from-[#FDE68A] via-[#FCD34D] to-[#FBBF24] border-t-4 border-[#F59E0B]/50 shadow-inner">
            <div className="w-full h-full opacity-35 flex flex-col justify-between py-2">
              <div className="w-full h-[1px] bg-[#D97706]" />
              <div className="w-full h-[1px] bg-[#D97706]" />
              <div className="w-full h-[1px] bg-[#D97706]" />
              <div className="w-full h-[1px] bg-[#D97706]" />
              <div className="w-full h-[1px] bg-[#D97706]" />
            </div>
          </div>

          {/* Fluffy Round Shaggy Rug (Pastel Cream & Pink) */}
          <div className="absolute bottom-4 left-[20%] w-[60%] h-24 sm:h-32 rounded-full bg-[#FFFBEB] border-4 border-dashed border-[#FDE68A] opacity-90 shadow-sm flex items-center justify-center">
            <div className="text-2xl opacity-30">🌸</div>
          </div>

          {/* WINDOW: Large Panorama Sunlit Window with Lace Curtains */}
          <div className="absolute top-2 right-4 sm:right-10 w-36 sm:w-44 h-28 sm:h-32 rounded-2xl bg-sky-100 border-4 border-white shadow-lg overflow-hidden z-0">
            {/* Vivid Sky & Gentle Sunbeams */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#60A5FA] to-[#BAE6FD]">
              {/* Glowing Sun */}
              <div className="absolute top-2 right-4 w-8 h-8 rounded-full bg-amber-300 shadow-[0_0_20px_#FDE047] animate-pulse" />
              {/* Sunbeams */}
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-gradient-to-br from-yellow-200/40 via-transparent to-transparent rotate-12 pointer-events-none" />
              <div className="absolute top-5 left-4 text-xs opacity-70">🕊️</div>
            </div>
            {/* White window grid */}
            <div className="absolute inset-0 flex flex-col justify-center">
              <div className="w-full h-1 bg-white/90" />
            </div>
            <div className="absolute inset-0 flex justify-center">
              <div className="h-full w-1 bg-white/90" />
            </div>
            {/* Lace Curtains on sides */}
            <div className="absolute inset-y-0 left-0 w-6 bg-white/70 backdrop-blur-[1px] rounded-r-2xl" />
            <div className="absolute inset-y-0 right-0 w-6 bg-white/70 backdrop-blur-[1px] rounded-l-2xl" />
            {/* Window Sill with Flower Pot */}
            <div className="absolute bottom-0 w-full h-3 bg-white flex items-center justify-around">
              <span className="text-[10px] -mt-1.5">🌷</span>
              <span className="text-[10px] -mt-1.5">🌼</span>
            </div>
          </div>

          {/* SUN CATCHER (Top Left) */}
          <div className="absolute top-0 left-16 flex flex-col items-center z-0">
            <div className="w-[1px] h-10 bg-amber-300" />
            <div className="w-4 h-4 rotate-45 bg-gradient-to-tr from-pink-300 via-yellow-200 to-sky-300 rounded-sm shadow-sm animate-pulse" />
          </div>

          {/* LEFT FURNITURE: White & Wood Low Table with Flowers */}
          <div className="absolute bottom-10 left-4 sm:left-8 flex flex-col items-center z-10">
            <div className="flex items-end gap-2 mb-[-1px]">
              <div className="flex flex-col items-center">
                <span className="text-xs">🌺</span>
                <div className="w-3.5 h-4 bg-white/90 rounded-b-md border border-amber-200 shadow-sm" />
              </div>
              <div className="w-3 h-2.5 bg-rose-300 rounded-sm" />
            </div>
            <div className="w-24 sm:w-28 h-3 bg-white rounded-md shadow-sm border border-amber-100" />
            <div className="w-20 flex justify-between">
              <div className="w-2 h-8 bg-[#FCD34D] rounded-b-sm" />
              <div className="w-2 h-8 bg-[#FCD34D] rounded-b-sm" />
            </div>
          </div>

          {/* RIGHT FURNITURE: Pastel Coral & Mint Couch */}
          <div className="absolute bottom-10 right-24 sm:right-32 flex flex-col items-center z-10">
            <div className="flex gap-1 mb-[-2px]">
              <div className="w-12 h-12 bg-[#FDA4AF] rounded-t-2xl shadow-sm flex items-center justify-center">
                <span className="text-xs">💖</span>
              </div>
              <div className="w-12 h-12 bg-[#FDA4AF] rounded-t-2xl shadow-sm flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#A7F3D0]" />
              </div>
            </div>
            <div className="w-30 h-6 bg-[#F43F5E]/80 rounded-xl shadow-md flex items-center justify-between px-1.5">
              <div className="w-3 h-7 -mt-2 bg-[#E11D48]/70 rounded-t-lg" />
              <div className="w-3 h-7 -mt-2 bg-[#E11D48]/70 rounded-t-lg" />
            </div>
            <div className="w-24 flex justify-between px-2">
              <div className="w-1.5 h-3 bg-[#B45309] rounded-b-sm transform -rotate-12" />
              <div className="w-1.5 h-3 bg-[#B45309] rounded-b-sm transform rotate-12" />
            </div>
          </div>

          {/* Cat Scratching Post & Pastel Tower (Far Right) */}
          <div className="absolute bottom-8 right-2 sm:right-6 flex flex-col items-center z-10">
            <div className="w-11 h-2 bg-[#A7F3D0] rounded-full shadow-sm" />
            <div className="w-3.5 h-12 bg-[#FED7AA] border-y border-[#FDBA74]" />
            <div className="w-14 h-3 bg-[#FDE047] rounded-lg shadow-md" />
          </div>

          {/* Potted Sunflower / Plant (Far Left) */}
          <div className="absolute bottom-12 left-1 flex flex-col items-center z-10">
            <span className="text-2xl">🌻</span>
            <div className="w-6 h-5 bg-[#FDE68A] rounded-b-md border border-amber-300 shadow-sm" />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. MIDNIGHT THEME (🌙 夜カフェ・書斎)                          */}
      {/* ------------------------------------------------------------- */}
      {theme === "midnight" && (
        <div className="w-full h-full relative">
          {/* Wall: Deep Midnight Blue (Upper 38%) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#1E293B]" />

          {/* Floor: Dark Mahogany Wood Floor (Spacious Bottom 62%) */}
          <div className="absolute bottom-0 w-full h-[62%] bg-gradient-to-b from-[#2E1810] via-[#22100A] to-[#160805] border-t-4 border-[#451A03] shadow-inner">
            <div className="w-full h-full opacity-25 flex flex-col justify-between py-2">
              <div className="w-full h-[1px] bg-[#78350F]" />
              <div className="w-full h-[1px] bg-[#78350F]" />
              <div className="w-full h-[1px] bg-[#78350F]" />
              <div className="w-full h-[1px] bg-[#78350F]" />
              <div className="w-full h-[1px] bg-[#78350F]" />
            </div>
          </div>

          {/* Vintage Persian-style Wine Red Rug */}
          <div className="absolute bottom-4 left-[18%] w-[64%] h-24 sm:h-32 rounded-2xl bg-[#881337]/75 border-4 border-[#9F1239] opacity-85 shadow-md flex items-center justify-center overflow-hidden">
            <div className="w-full h-full border border-[#BE123C] opacity-40 flex items-center justify-around">
              <div className="w-12 h-12 border border-amber-400 rotate-45" />
              <div className="w-14 h-14 border border-amber-400 rounded-full" />
              <div className="w-12 h-12 border border-amber-400 rotate-45" />
            </div>
          </div>

          {/* WINDOW: Classic Night Sky Window with Crescent Moon & Stars */}
          <div className="absolute top-2 right-4 sm:right-10 w-28 sm:w-32 h-28 sm:h-32 rounded-t-full bg-[#020617] border-4 border-[#334155] shadow-lg overflow-hidden z-0">
            {/* Deep Starry Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-[#0F172A]">
              {/* Crescent Moon */}
              <div className="absolute top-2.5 right-3.5 w-6 h-6 rounded-full bg-amber-200 shadow-[0_0_12px_#FDE047] flex items-center justify-center overflow-hidden">
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#020617]" />
              </div>
              {/* Twinkling Stars */}
              <div className="absolute top-3 left-3 text-[9px] text-amber-100 animate-pulse">✨</div>
              <div className="absolute top-10 left-6 text-[8px] text-sky-200 animate-pulse" style={{ animationDelay: "1s" }}>⭐</div>
              <div className="absolute top-14 right-5 text-[7px] text-amber-200 animate-pulse" style={{ animationDelay: "1.5s" }}>✨</div>
              <div className="absolute top-6 left-12 w-1 h-1 bg-white rounded-full" />
              <div className="absolute top-16 left-4 w-1 h-1 bg-white rounded-full" />
              {/* Distant city silhouette */}
              <div className="absolute bottom-0 w-full h-5 bg-[#020617] flex items-end justify-around px-1 opacity-80">
                <div className="w-2 h-3 bg-slate-800" />
                <div className="w-3 h-4 bg-slate-800" />
                <div className="w-2 h-2.5 bg-slate-800" />
                <div className="w-4 h-5 bg-slate-800" />
              </div>
            </div>
            {/* Grids */}
            <div className="absolute inset-0 flex flex-col justify-center">
              <div className="w-full h-1 bg-[#334155]" />
            </div>
            <div className="absolute inset-0 flex justify-center">
              <div className="h-full w-1 bg-[#334155]" />
            </div>
          </div>

          {/* ANTIQUE BOOKSHELF (Top Left) */}
          <div className="absolute top-2 left-4 sm:left-8 flex flex-col items-center z-0">
            <div className="w-28 sm:w-32 bg-[#2E1810] border-2 border-[#451A03] rounded-t-md p-1 shadow-md">
              <div className="flex items-end gap-1 border-b border-[#451A03] pb-0.5">
                <div className="w-3 h-6 bg-[#991B1B] rounded-t-xs" />
                <div className="w-2.5 h-5.5 bg-[#1E3A8A] rounded-t-xs" />
                <div className="w-3.5 h-7 bg-[#065F46] rounded-t-xs" />
                <div className="w-3 h-5.5 bg-[#854D0E] rounded-t-xs" />
                <div className="text-[9px] ml-auto">⌛</div>
              </div>
            </div>
          </div>

          {/* LEFT FURNITURE: Mahogany Study Desk & Bankers Lamp */}
          <div className="absolute bottom-10 left-4 sm:left-8 flex items-end z-10">
            <div className="relative">
              <div className="flex items-end gap-2 mb-[-1px] px-2">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-3 bg-[#047857] rounded-t-full shadow-[0_0_10px_#34D399]" />
                  <div className="w-1 h-3 bg-amber-400" />
                  <div className="w-3 h-1 bg-amber-400 rounded-sm" />
                </div>
                <div className="w-2 h-4 bg-amber-100 rounded-t-xs" />
              </div>
              <div className="w-24 sm:w-28 h-4 bg-[#451A03] rounded-sm shadow-md border-t border-[#78350F]" />
              <div className="w-full flex justify-between px-1">
                <div className="w-6 h-14 bg-[#2E1810] border border-[#1A0C08] rounded-b-sm" />
                <div className="w-2 h-14 bg-[#2E1810] rounded-b-sm" />
              </div>
            </div>
            <div className="relative -ml-2 -mb-1">
              <div className="w-2 h-10 bg-[#78350F] rounded-t-sm" />
              <div className="w-8 h-3 bg-[#881337] rounded-sm shadow-sm" />
              <div className="w-8 flex justify-between px-1">
                <div className="w-1.5 h-10 bg-[#451A03]" />
                <div className="w-1.5 h-10 bg-[#451A03]" />
              </div>
            </div>
          </div>

          {/* RIGHT FURNITURE: Classic Vintage Leather Sofa */}
          <div className="absolute bottom-10 right-24 sm:right-32 flex flex-col items-center z-10">
            <div className="flex gap-1 mb-[-2px]">
              <div className="w-12 h-13 bg-[#4A1512] rounded-t-xl border-t-2 border-[#782823] shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A0C08]" />
              </div>
              <div className="w-12 h-13 bg-[#4A1512] rounded-t-xl border-t-2 border-[#782823] shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A0C08]" />
              </div>
            </div>
            <div className="w-30 h-6 bg-[#3B110E] rounded-xl shadow-lg border-t border-[#782823] flex items-center justify-between px-1.5">
              <div className="w-4 h-7 -mt-2 bg-[#2D0D0B] rounded-t-lg" />
              <div className="w-4 h-7 -mt-2 bg-[#2D0D0B] rounded-t-lg" />
            </div>
            <div className="w-24 flex justify-between px-2">
              <div className="w-2 h-3 bg-[#1A0C08] rounded-b-sm" />
              <div className="w-2 h-3 bg-[#1A0C08] rounded-b-sm" />
            </div>
          </div>

          {/* STANDING FLOOR LAMP (Warm Amber Glow, Far Right) */}
          <div className="absolute bottom-10 right-3 sm:right-6 flex flex-col items-center z-10">
            <div className="relative">
              <div className="w-9 h-7 bg-amber-100 rounded-t-lg shadow-[0_0_20px_#FBBF24] border border-amber-200 flex items-center justify-center" />
              <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-md pointer-events-none" />
            </div>
            <div className="w-1.5 h-20 bg-amber-600" />
            <div className="w-8 h-2 bg-amber-700 rounded-full shadow-md" />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. ZEN THEME (🌸 和モダン・縁側 & コタツ)                      */}
      {/* ------------------------------------------------------------- */}
      {theme === "zen" && (
        <div className="w-full h-full relative">
          {/* Wall: Traditional Washi Paper Wall (Upper 38%) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F3FAF5] via-[#E8F5EC] to-[#D5EAD9]" />

          {/* Floor: Engawa Wooden Veranda Board (Spacious Bottom 62%) */}
          <div className="absolute bottom-0 w-full h-[62%] bg-gradient-to-b from-[#CBB090] via-[#BA9C7A] to-[#A88864] border-t-4 border-[#8C6D48] shadow-inner">
            <div className="w-full h-full opacity-35 flex flex-col justify-between py-2">
              <div className="w-full h-[1px] bg-[#654829]" />
              <div className="w-full h-[1px] bg-[#654829]" />
              <div className="w-full h-[1px] bg-[#654829]" />
              <div className="w-full h-[1px] bg-[#654829]" />
              <div className="w-full h-[1px] bg-[#654829]" />
            </div>
          </div>

          {/* Large Spacious Tatami Mat (い草畳マット) in center */}
          <div className="absolute bottom-3 left-[12%] w-[76%] h-28 sm:h-38 rounded-xl bg-[#DDE9D1] border-4 border-[#3D5A40] opacity-95 shadow-md flex items-center justify-center overflow-hidden">
            {/* Tatami Weave texture */}
            <div className="w-full h-full opacity-30 flex justify-between px-3">
              <div className="h-full w-[1px] bg-[#3D5A40]" />
              <div className="h-full w-[1px] bg-[#3D5A40]" />
              <div className="h-full w-[1px] bg-[#3D5A40]" />
              <div className="h-full w-[1px] bg-[#3D5A40]" />
              <div className="h-full w-[1px] bg-[#3D5A40]" />
              <div className="h-full w-[1px] bg-[#3D5A40]" />
            </div>
            {/* Center border cloth tape */}
            <div className="absolute h-full w-4 bg-[#2D4530] opacity-40" />
          </div>

          {/* WINDOW: Shoji Sliding Screen with Garden View (Bamboo & Sakura) */}
          <div className="absolute top-2 right-4 sm:right-10 w-34 sm:w-42 h-28 sm:h-32 bg-[#F0FDF4] border-4 border-[#785434] shadow-lg overflow-hidden z-0">
            {/* Outside Garden View */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#BAE6FD] to-[#DCFCE7]">
              {/* Bamboo & Sakura Tree outside */}
              <div className="absolute top-2 right-2 flex flex-col items-end">
                <span className="text-sm">🌸</span>
                <span className="text-xs -mt-1 mr-2">🌸</span>
              </div>
              <div className="absolute bottom-0 left-2 flex items-end gap-1">
                <div className="w-2 h-14 bg-[#15803D] rounded-t-sm" />
                <div className="w-2 h-18 bg-[#16A34A] rounded-t-sm" />
                <div className="w-2 h-10 bg-[#15803D] rounded-t-sm" />
              </div>
              {/* Stone Lantern (Toro) */}
              <div className="absolute bottom-1 right-6 flex flex-col items-center">
                <div className="w-5 h-2 bg-[#64748B] rounded-t-sm" />
                <div className="w-3 h-3 bg-[#94A3B8] border border-amber-200 shadow-sm" />
                <div className="w-4 h-4 bg-[#64748B] rounded-b-sm" />
              </div>
            </div>
            {/* Shoji Wood Lattice (障子の格子) */}
            <div className="absolute inset-0 flex flex-col justify-around opacity-75 pointer-events-none">
              <div className="w-full h-1 bg-[#785434]" />
              <div className="w-full h-1 bg-[#785434]" />
            </div>
            <div className="absolute inset-0 flex justify-around opacity-75 pointer-events-none">
              <div className="h-full w-1 bg-[#785434]" />
              <div className="h-full w-1 bg-[#785434]" />
              <div className="h-full w-1 bg-[#785434]" />
            </div>
          </div>

          {/* HANGING SCROLL (Kakejiku / 掛け軸) (Top Left) */}
          <div className="absolute top-2 left-6 sm:left-10 flex flex-col items-center z-0">
            <div className="w-11 h-1.5 bg-[#4A321D] rounded-sm" />
            <div className="w-9 h-14 bg-[#FAF5EE] border-x-2 border-[#8C6D48] shadow-sm flex flex-col items-center justify-center p-0.5">
              <span className="text-[11px] font-bold font-serif text-[#78350F]">和</span>
              <div className="text-[8px] text-rose-500">🐾</div>
            </div>
            <div className="w-11 h-2 bg-[#4A321D] rounded-sm shadow-sm" />
          </div>

          {/* LEFT FURNITURE: AUTHENTIC JAPANESE KOTATSU (コタツ) ON TATAMI */}
          <div className="absolute bottom-6 left-4 sm:left-8 flex flex-col items-center z-10">
            {/* Items on Kotatsu: Bowl of Mikan 🍊 & Teapot 🍵 */}
            <div className="flex items-end gap-2 mb-[-1px] z-20">
              <div className="flex items-center gap-1.5 bg-[#78350F]/80 px-2 py-0.5 rounded-sm shadow-sm">
                <span className="text-xs filter drop-shadow">🍊</span>
                <span className="text-[10px]">🍵</span>
              </div>
            </div>
            {/* Kotatsu Wooden Top Board (天板) */}
            <div className="w-26 sm:w-30 h-3 bg-[#451A03] rounded-sm shadow-md border-t border-[#78350F] z-20" />
            {/* Kotatsu Quilt / Futon (ふかふかコタツ布団 - 深みのある和風格子/エンジ色) */}
            <div className="relative w-32 sm:w-36 h-12 bg-gradient-to-b from-[#881337] to-[#701A2B] rounded-t-lg rounded-b-xl shadow-lg border-t-2 border-[#BE123C] flex flex-col justify-between overflow-hidden z-10">
              {/* Futon pattern lines */}
              <div className="w-full h-full opacity-25 flex flex-col justify-around py-1">
                <div className="w-full h-[1px] bg-amber-200" />
                <div className="w-full h-[1px] bg-amber-200" />
              </div>
              {/* Bottom Futon drape flare */}
              <div className="w-full h-3 bg-[#500724] opacity-80" />
            </div>
            {/* Chirimen Zabuton Cushions placed on sides */}
            <div className="w-36 sm:w-40 flex justify-between -mt-2 z-0">
              <div className="w-11 h-3.5 bg-[#1E3A8A] rounded-lg shadow-sm border border-[#172554]" />
              <div className="w-11 h-3.5 bg-[#065F46] rounded-lg shadow-sm border border-[#064E3B]" />
            </div>
          </div>

          {/* RIGHT FURNITURE: Rattan / Wood Low Bench Sofa with Cushions */}
          <div className="absolute bottom-8 right-22 sm:right-28 flex flex-col items-center z-10">
            <div className="flex gap-1 mb-[-2px]">
              <div className="w-11 h-10 bg-[#065F46] rounded-t-lg shadow-sm flex items-center justify-center">
                <span className="text-[10px] text-amber-200">🌿</span>
              </div>
              <div className="w-11 h-10 bg-[#854D0E] rounded-t-lg shadow-sm flex items-center justify-center">
                <span className="text-[10px] text-amber-200">🌸</span>
              </div>
            </div>
            <div className="w-28 h-5 bg-[#A16207] rounded-lg shadow-md border-t border-[#CA8A04] flex items-center justify-between px-1">
              <div className="w-2.5 h-6 -mt-2 bg-[#713F12] rounded-t-sm" />
              <div className="w-2.5 h-6 -mt-2 bg-[#713F12] rounded-t-sm" />
            </div>
            <div className="w-22 flex justify-between px-1">
              <div className="w-2 h-3 bg-[#451A03] rounded-b-sm" />
              <div className="w-2 h-3 bg-[#451A03] rounded-b-sm" />
            </div>
          </div>

          {/* BONSAI & ANDON LAMP (Far Right) */}
          <div className="absolute bottom-8 right-2 sm:right-5 flex flex-col items-center z-10">
            {/* Japanese Andon Lantern (行灯 - Glowing paper lamp) */}
            <div className="w-8 h-10 bg-[#FEF3C7] border-2 border-[#78350F] rounded-xs shadow-[0_0_12px_#FDE047] flex flex-col justify-around p-0.5">
              <div className="w-full h-[1px] bg-[#78350F]" />
              <div className="w-full h-[1px] bg-[#78350F]" />
            </div>
            <div className="w-9 h-2 bg-[#451A03] rounded-sm shadow-sm" />
          </div>

          {/* Potted Pine Bonsai (Far Left) */}
          <div className="absolute bottom-10 left-1 flex flex-col items-center z-10">
            <span className="text-xl">🌲</span>
            <div className="w-7 h-3.5 bg-[#52525B] rounded-b-md border border-[#3F3F46] shadow-sm" />
          </div>
        </div>
      )}

      {/* PHASE BANNER / STATUS DISPLAY ON WALL */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full shadow-sm border border-black/5 z-0">
        <span className="text-xs">{phase === "focus" ? "📚" : "☕"}</span>
        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 font-mono">
          {phase === "focus" ? "集中タイム中（静かに作業中ニャ）" : "リラックスタイム中（のんびり休憩中ニャ）"}
        </span>
      </div>
    </div>
  );
};
