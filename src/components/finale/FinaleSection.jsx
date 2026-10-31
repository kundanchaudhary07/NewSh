'use client';

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '@/config/birthday.config';

export default function FinaleSection() {
  const containerRef = useRef(null);

  const fireConfettiCannons = () => {
    // Left side burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors: ['#f0a83c', '#d4af6a', '#ff7a7a', '#ffffff', '#e06b75']
    });

    // Right side burst
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors: ['#f0a83c', '#d4af6a', '#ff7a7a', '#ffffff', '#e06b75']
    });

    // Center starburst
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ffd700', '#ff9a4d', '#ffffff']
      });
    }, 250);
  };

  useEffect(() => {
    // Fire celebratory confetti when this section enters view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            fireConfettiCannons();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#070709] px-4 py-20 select-none text-center"
    >
      {/* Aurora Ambient Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-amber-600/20 via-rose-500/15 to-amber-300/10 blur-[100px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Star Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-lg shadow-amber-500/5">
          <span>✦</span>
          <span>{birthdayConfig.displayDateShort} · Special Celebration</span>
          <span>✦</span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-['Bricolage_Grotesque',sans-serif] text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4">
          Happy Birthday <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]">
            {birthdayConfig.name}
          </span>
        </h1>

        {/* Romantic Subtitle */}
        <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-amber-200/90 max-w-lg mb-8 leading-relaxed">
          May your year ahead be as luminous, sweet, and breathtaking as your smile.
        </p>

        {/* Dedication Card */}
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80 mb-10 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
              Birthday Dedication
            </span>
            <span className="text-rose-400 text-base">❤️</span>
          </div>

          <p className="font-['Work_Sans',sans-serif] text-sm sm:text-base leading-relaxed text-zinc-300 mb-4">
            Every moment captured here is a reminder of how extraordinary you are.
            Thank you for bringing your radiant joy, kindness, and warmth into every single day.
          </p>

          <p className="font-['Caveat',cursive] text-xl text-amber-300 text-right">
            Always celebrating you, Pooja 🤍
          </p>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={fireConfettiCannons}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
          >
            <span>Celebrate Again</span>
            <span>✨</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white font-medium text-sm hover:bg-white/10 hover:border-amber-400/50 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>Back to Premiere</span>
            <span>✦</span>
          </button>
        </div>
      </div>

      {/* Decorative Bottom Credit */}
      <div className="relative z-10 mt-16 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-600">
        1 November · Dedicated to {birthdayConfig.name}
      </div>
    </div>
  );
}

