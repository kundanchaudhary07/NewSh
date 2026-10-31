'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { birthdayConfig, getTimeUntilNextBirthday } from '@/config/birthday.config';
import './countdown.css';

export default function CountdownOverlay({
  tickerText = birthdayConfig.tickerText,
  marqueeTitle = birthdayConfig.marqueeTitle,
  marqueeSub = birthdayConfig.marqueeSub,
  doorsText = birthdayConfig.doorsText,
  songSrc = "/sounds/pipi-song.mp3",
  songVolume = 0.6,
  onCurtainsOpened,
  showPreviewButton = true
}) {
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const flickerRef = useRef(null);
  const curtainLRef = useRef(null);
  const curtainRRef = useRef(null);
  const contentRef = useRef(null);
  const topBulbsRef = useRef(null);
  const bottomBulbsRef = useRef(null);
  const audioRef = useRef(null);
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  const initializedRef = useRef({ days: false, hours: false, minutes: false, seconds: false });
  const openingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMounted(true);
  }, []);

  // Populate bulbs
  useEffect(() => {
    if (!mounted) return;
    const populateBulbs = (el, count) => {
      if (!el) return;
      el.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("span");
        dot.className = "bulb-dot";
        el.appendChild(dot);
      }
    };
    populateBulbs(topBulbsRef.current, 22);
    populateBulbs(bottomBulbsRef.current, 22);
  }, [mounted]);

  // Animate bulbs & projector flicker with gsap.context (pauses when revealed or off-screen)
  useEffect(() => {
    if (!mounted || reducedMotionRef.current || revealed) return;
    
    let stopped = false;
    let ctx = null;

    const startTweens = () => {
      if (ctx || stopped) return;
      ctx = gsap.context(() => {
        const dots = rootRef.current?.querySelectorAll(".bulb-dot");
        if (dots?.length) {
          gsap.to(dots, {
            opacity: 1,
            scale: 1.5,
            duration: 0.5,
            ease: "power1.inOut",
            stagger: { each: 0.045, repeat: -1, yoyo: true }
          });
        }

        const flicker = () => {
          if (stopped || !flickerRef.current) return;
          gsap.to(flickerRef.current, {
            opacity: () => 0.045 * Math.random(),
            duration: () => 0.06 + 0.18 * Math.random(),
            ease: "power1.inOut",
            onComplete: flicker
          });
        };
        flicker();
      }, rootRef);
    };

    const stopTweens = () => {
      if (ctx) {
        ctx.revert();
        ctx = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          startTweens();
        } else {
          stopTweens();
        }
      },
      { threshold: 0.05 }
    );

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => {
      stopped = true;
      observer.disconnect();
      stopTweens();
    };
  }, [mounted, revealed]);

  // Audio ambient setup
  useEffect(() => {
    if (!songSrc || !mounted) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = songVolume;
    const playAudio = () => {
      audio.play().catch(() => {});
    };
    playAudio();
    window.addEventListener("pointerdown", playAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", playAudio);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [songSrc, songVolume, mounted]);

  const renderOdometerCols = useCallback((container, digits) => {
    if (!container) return;
    container.innerHTML = "";
    for (let _ of digits) {
      const col = document.createElement("span");
      col.className = "od-col";
      const strip = document.createElement("span");
      strip.className = "od-strip";
      for (let d = 0; d < 10; d++) {
        const digit = document.createElement("span");
        digit.className = "od-digit";
        digit.textContent = String(d);
        strip.appendChild(digit);
      }
      col.appendChild(strip);
      container.appendChild(col);
    }
  }, []);

  const updateOdometerCols = useCallback((container, digits, animate) => {
    if (!container) return;
    [...container.children].forEach((col, idx) => {
      const h = col.getBoundingClientRect().height || 40;
      const strip = col.querySelector(".od-strip");
      if (strip) {
        if (animate && !reducedMotionRef.current) {
          gsap.to(strip, { y: -digits[idx] * h, duration: 0.5, ease: "power3.out" });
        } else {
          gsap.set(strip, { y: -digits[idx] * h });
        }
      }
    });
  }, []);

  const setOdometerValue = useCallback((container, key, strVal) => {
    if (!container) return;
    const digits = strVal.split("").map(Number);
    if (!initializedRef.current[key]) {
      renderOdometerCols(container, digits);
      initializedRef.current[key] = true;
      requestAnimationFrame(() => updateOdometerCols(container, digits, false));
      return;
    }
    updateOdometerCols(container, digits, true);
  }, [renderOdometerCols, updateOdometerCols]);

  const triggerOpen = useCallback(() => {
    if (openingRef.current) {
      // If already opened, smooth scroll to Section 2
      document.getElementById('section-reveal')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    openingRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const finish = () => {
      setRevealed(true);
      document.body.style.overflow = "";
      onCurtainsOpened?.();
    };

    const curtainL = curtainLRef.current;
    const curtainR = curtainRRef.current;

    if (!reducedMotionRef.current && curtainL && curtainR) {
      if (audioRef.current && !audioRef.current.paused) {
        gsap.to(audioRef.current, { volume: 0, duration: 1.1, ease: "power1.in" });
      }
      gsap.timeline({ onComplete: finish })
        .to(contentRef.current, { opacity: 0, y: -10, duration: 0.35, ease: "power2.inOut" })
        .addLabel("open", "+=0.05")
        .to(curtainL, { xPercent: -100, duration: 1, ease: "power3.inOut", force3D: true }, "open")
        .to(curtainR, { xPercent: 100, duration: 1, ease: "power3.inOut", force3D: true }, "open")
        .to(bgRef.current, { opacity: 0.3, duration: 0.6, ease: "power2.out" }, "open");
    } else {
      if (curtainL) curtainL.style.transform = 'translateX(-100%)';
      if (curtainR) curtainR.style.transform = 'translateX(100%)';
      if (contentRef.current) contentRef.current.style.opacity = '0';
      finish();
    }
  }, [onCurtainsOpened]);

  const handleReplay = useCallback(() => {
    const curtainL = curtainLRef.current;
    const curtainR = curtainRRef.current;
    if (!curtainL || !curtainR) return;

    setRevealed(false);
    openingRef.current = false;
    gsap.timeline()
      .to([curtainL, curtainR], { xPercent: 0, duration: 0.8, ease: "power3.inOut" })
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .to(bgRef.current, { opacity: 1, duration: 0.4 });
  }, []);

  const calculateRemaining = useCallback(async () => {
    let now = Date.now();
    try {
      const res = await fetch("/api/time", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        now = data.now;
      }
    } catch (_) {}

    return getTimeUntilNextBirthday(now);
  }, []);

  useEffect(() => {
    const updateCountdown = async () => {
      const remaining = await calculateRemaining();
      setOdometerValue(daysRef.current, "days", String(Math.min(remaining.days, 99)).padStart(2, "0"));
      setOdometerValue(hoursRef.current, "hours", String(remaining.hours).padStart(2, "0"));
      setOdometerValue(minutesRef.current, "minutes", String(remaining.minutes).padStart(2, "0"));
      setOdometerValue(secondsRef.current, "seconds", String(remaining.seconds).padStart(2, "0"));

      if (remaining.isBirthdayToday || remaining.total <= 0) {
        triggerOpen();
      }
    };

    updateCountdown();
    intervalRef.current = setInterval(updateCountdown, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [calculateRemaining, setOdometerValue, triggerOpen]);

  // If user scrolls down or presses ArrowDown while curtains are closed, open curtains automatically
  useEffect(() => {
    // Once revealed, remove listeners immediately — they must not block page scrolling
    if (revealed) return;

    const handleWheel = (e) => {
      if (!openingRef.current && e.deltaY > 15) {
        triggerOpen();
      }
    };

    const handleKeyDown = (e) => {
      if (!openingRef.current && ['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        triggerOpen();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerOpen, revealed]);

  return (
    <div
      className="showtime-root relative w-full h-screen min-h-screen overflow-hidden select-none"
      ref={rootRef}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Caveat:wght@500;600&family=JetBrains+Mono:wght@500;700&display=swap"
      />
      {songSrc && <audio ref={audioRef} src={songSrc} loop preload="auto" />}

      {/* Atmospheric lighting and sprocket rails */}
      <div ref={bgRef}>
        <div className="rail left pointer-events-none" />
        <div className="rail right pointer-events-none" />
        <div className="flicker" ref={flickerRef} />
        <div className="vignette" />
        <div className="spotlight" />
        <div className="grain" />
      </div>

      {/* Preview / Replay Button */}
      {showPreviewButton && (
        <button
          type="button"
          className="preview-btn pointer-events-auto cursor-pointer"
          onClick={revealed ? handleReplay : triggerOpen}
        >
          {revealed ? "Replay Curtains ✦" : "Preview"}
        </button>
      )}

      {/* Curtains and Content Lockscreen */}
      <div className="lock pointer-events-none">
        <div className="curtain-l" ref={curtainLRef} />
        <div className="curtain-r" ref={curtainRRef} />

        <div className="screen" style={revealed ? { pointerEvents: 'none' } : undefined}>
          <span className="corner corner-tl" aria-hidden="true">✦</span>
          <span className="corner corner-tr" aria-hidden="true">✦</span>
          <span className="corner corner-bl" aria-hidden="true">✦</span>
          <span className="corner corner-br" aria-hidden="true">✦</span>

          {/* Marquee Content */}
          <div className="lock-content" ref={contentRef}>
            <div className="bulb-rail top" ref={topBulbsRef} />
            <div className="ticker">
              <div className="ticker-track">
                <span>{tickerText}</span>
                <span>{tickerText}</span>
                <span>{tickerText}</span>
                <span>{tickerText}</span>
              </div>
            </div>
            <div className="bulb-rail bottom" ref={bottomBulbsRef} />

            <h1 className="marquee-title">
              <span className="marquee-title-star" aria-hidden="true">✦</span>
              {marqueeTitle}
              <span className="marquee-title-star" aria-hidden="true">✦</span>
            </h1>
            <p className="marquee-sub">{marqueeSub}</p>

            <div className="hero-days">
              <div className="od-number" ref={daysRef} />
              <div className="hero-caption">days to curtain</div>
            </div>

            <div className="rest-row">
              <div className="bulb-tile">
                <div className="od-number" ref={hoursRef} />
                <span className="bulb-label">hrs</span>
              </div>
              <div className="bulb-tile">
                <div className="od-number" ref={minutesRef} />
                <span className="bulb-label">min</span>
              </div>
              <div className="bulb-tile">
                <div className="od-number" ref={secondsRef} />
                <span className="bulb-label">sec</span>
              </div>
            </div>

            <div className="perforation" aria-hidden="true" />
            <p className="lock-foot">{doorsText}</p>
          </div>
        </div>
      </div>

      {/* Revealed Archway Enter Prompt */}
      {revealed && (
        <button
          type="button"
          onClick={() => {
            document.getElementById('section-reveal')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="enter-celebration-btn"
          style={{ pointerEvents: 'auto', cursor: 'pointer', zIndex: 50, position: 'relative' }}
          aria-label="Scroll down to POOJA Birthday Reveal"
        >
          <span>✦ Enter Celebration for POOJA ✦</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  );
}
