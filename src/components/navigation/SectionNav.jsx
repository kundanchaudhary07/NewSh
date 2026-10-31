'use client';

import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'section-theater', label: 'Theater Premiere' },
  { id: 'section-reveal', label: 'Birthday Reveal' },
  { id: 'section-hero', label: 'Editorial Hero' },
  { id: 'section-polaroids', label: 'Polaroids & Notes' },
  { id: 'section-scrapbook', label: 'Memory Scrapbook' },
  { id: 'section-universe', label: '3D Memory Universe' },
  { id: 'section-imessage', label: 'iMessage Surprise' },
  { id: 'section-finale', label: 'Grand Finale' }
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('section-theater');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1
      }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSection = () => {
    const currentIdx = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIdx < SECTIONS.length - 1) {
      scrollTo(SECTIONS[currentIdx + 1].id);
    }
  };

  const prevSection = () => {
    const currentIdx = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIdx > 0) {
      scrollTo(SECTIONS[currentIdx - 1].id);
    }
  };

  return (
    <nav
      aria-label="Section Navigation"
      className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* Up Button */}
      <button
        onClick={prevSection}
        aria-label="Previous Section"
        className="w-7 h-7 rounded-full bg-black/60 border border-amber-500/30 text-amber-400/80 hover:text-amber-300 hover:border-amber-400 flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-110 mb-1"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="flex flex-col gap-2.5 p-1.5 rounded-full bg-black/50 border border-amber-500/20 backdrop-blur-md shadow-2xl">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              aria-label={`Scroll to ${sec.label}`}
              className="group relative flex items-center justify-center p-1"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] scale-110'
                    : 'w-2 h-2 bg-white/30 hover:bg-amber-300/70'
                }`}
              />

              {/* Tooltip Label */}
              <span className="pointer-events-none absolute right-8 px-2.5 py-1 rounded bg-black/85 border border-amber-500/30 text-[11px] font-mono tracking-wider text-amber-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        onClick={nextSection}
        aria-label="Next Section"
        className="w-7 h-7 rounded-full bg-black/60 border border-amber-500/30 text-amber-400/80 hover:text-amber-300 hover:border-amber-400 flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-110 mt-1"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </nav>
  );
}
