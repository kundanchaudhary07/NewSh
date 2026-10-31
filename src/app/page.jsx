'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import CountdownOverlay from '@/components/countdown/CountdownOverlay';
import HeroSection from '@/components/hero/HeroSection';
import SectionNav from '@/components/navigation/SectionNav';

// Dynamically import client components to prevent SSR issues with window/canvas
const DraggableCards = dynamic(() => import('@/components/draggable-cards/DraggableCards'), {
  ssr: false
});
const FloatingNotes = dynamic(() => import('@/components/floating-notes/FloatingNotes'), {
  ssr: false
});
const ScrapbookFlip = dynamic(() => import('@/components/scrapbook/ScrapbookFlip'), {
  ssr: false
});
const ThreeDSection = dynamic(() => import('@/components/three-d/ThreeDSection'), {
  ssr: false
});
const FinaleSection = dynamic(() => import('@/components/finale/FinaleSection'), {
  ssr: false
});

export default function BirthdayPage() {
  const revealIframeRef = useRef(null);
  const imessageIframeRef = useRef(null);
  const [theaterRevealed, setTheaterRevealed] = useState(false);

  // When theater curtains open, instruct birthday.html to start ambient melody
  const handleCurtainsOpened = useCallback(() => {
    setTheaterRevealed(true);
    try {
      if (revealIframeRef.current?.contentWindow) {
        revealIframeRef.current.contentWindow.postMessage({ type: 'START_MUSIC' }, '*');
      }
    } catch (_) {}
  }, []);

  // Listen for forwarded scroll, touch, and keyboard events from embedded iframes
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data) return;

      if (event.data.type === 'FORWARD_SCROLL') {
        const delta = event.data.deltaY || 0;
        window.scrollBy({
          top: delta,
          behavior: 'auto'
        });
      } else if (event.data.type === 'FORWARD_KEY') {
        const key = event.data.key;
        const pageStep = window.innerHeight * 0.8;
        if (['ArrowDown', 'PageDown', ' '].includes(key)) {
          window.scrollBy({ top: pageStep, behavior: 'smooth' });
        } else if (['ArrowUp', 'PageUp'].includes(key)) {
          window.scrollBy({ top: -pageStep, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-white relative selection:bg-amber-500 selection:text-black">
      {/* Floating Section-Aware Navigation Indicator */}
      <SectionNav />

      {/* Section 1: Theater Premiere & Live Countdown */}
      <section
        id="section-theater"
        className="relative w-full min-h-screen overflow-hidden"
        style={theaterRevealed ? { zIndex: 1 } : { zIndex: 20 }}
      >
        <CountdownOverlay
          showPreviewButton={true}
          onCurtainsOpened={handleCurtainsOpened}
        />
      </section>

      {/* Section 2: POOJA Birthday Reveal / Watermark Burn & Music Player */}
      <section id="section-reveal" className="relative w-full min-h-screen overflow-hidden z-10 bg-black">
        <iframe
          ref={revealIframeRef}
          src="/birthday.html"
          title="POOJA Birthday Reveal"
          className="w-full h-screen border-none block"
          allow="autoplay"
        />
        {/* Seamless Cinematic Transition into Warm Paper */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20 bg-gradient-to-b from-transparent via-[#1c1813]/70 to-[#FAFAF7]" />
      </section>

      {/* Section 3: Editorial Birthday Hero with Orbiting Photos */}
      <section id="section-hero" className="relative w-full min-h-screen overflow-hidden z-10">
        <HeroSection />
      </section>

      {/* Section 4: Polaroid Photo Gallery & Wandering Butterflies */}
      <section id="section-polaroids" className="relative w-full min-h-screen overflow-visible z-10 bg-[#d9d3c7]">
        <FloatingNotes />
        <DraggableCards />
        {/* Seamless Cinematic Transition into Dark Scrapbook Stage */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20 bg-gradient-to-b from-transparent via-[#241a12]/70 to-[#0d0b09]" />
      </section>

      {/* Section 5: Interactive Scrapbook Memory Album */}
      <section id="section-scrapbook" className="relative w-full min-h-screen overflow-visible z-10 bg-[#0d0b09]">
        <ScrapbookFlip />
      </section>

      {/* Section 6: Floating 3D WebGL Memory Universe */}
      <section id="section-universe" className="relative w-full min-h-screen overflow-hidden z-10 bg-black">
        <ThreeDSection />
      </section>

      {/* Section 7: Interactive iMessage Smartphone Experience */}
      <section id="section-imessage" className="relative w-full min-h-screen overflow-hidden z-10 bg-[#070709]">
        <iframe
          ref={imessageIframeRef}
          src="/last.html"
          title="iMessage Birthday Surprise"
          className="w-full h-screen border-none block"
          allow="autoplay"
          loading="lazy"
        />
      </section>

      {/* Section 8: Final Birthday Ending & Grand Climax Finale */}
      <section id="section-finale" className="relative w-full min-h-screen overflow-hidden z-10 bg-[#070709]">
        <FinaleSection />
      </section>
    </main>
  );
}
