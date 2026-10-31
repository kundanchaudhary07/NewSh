'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { imageAssets } from '@/config/assets.config';
import { birthdayConfig } from '@/config/birthday.config';

const SVG_PATH = "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";
const VIEWBOX = "0 0 996 330";

// Subtle individual rotation angles to give an authentic editorial contact-sheet / filmstrip look
const CARD_ROTATIONS = [-3, 2, -1.5, 3.5, -2, 1, -3.5, 2.5, -1, 3, -2.5, 1.5];

/**
 * CurvedMarqueeTrack
 *
 * Faithfully re-creates the reference hero photo animation with:
 * - Exact Bézier curve trajectory matching the reference ribbon
 * - Continuous smooth infinite looping without resets or jumps
 * - Rectangular editorial contact-strip cards with grayscale-to-color hover
 * - Drag-to-scrub with momentum decay (dragSensitivity: 0.08, dragDecay: 0.98)
 * - Hover slowdown with spring easing
 * - Viewport intersection observer to avoid unnecessary GPU/CPU cycles when out of view
 * - Fully responsive viewBox scaling
 */
function CurvedMarqueeTrack({
  items,
  path = SVG_PATH,
  viewBox = VIEWBOX,
  baseVelocity = 5,
  repeat = 2,
  slowdownOnHover = true,
  slowDownFactor = 0.05,
  draggable = true,
  dragSensitivity = 0.08,
  dragVelocityDecay = 0.98,
  className = ""
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const progressRef = useRef(0);
  const speedFactorRef = useRef(1);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragVelocityRef = useRef(0);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);

  // Check reduced motion
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Duplicate items for continuous seamless loop
  const totalItems = useMemo(() => {
    const repeated = [];
    for (let r = 0; r < repeat; r++) {
      items.forEach((item, idx) => {
        repeated.push({
          ...item,
          globalIndex: r * items.length + idx,
          rotation: CARD_ROTATIONS[(r * items.length + idx) % CARD_ROTATIONS.length]
        });
      });
    }
    return repeated;
  }, [items, repeat]);

  const updateCardPositions = useCallback((progressVal) => {
    const len = totalItems.length;
    const refs = cardRefs.current;
    for (let i = 0; i < len; i++) {
      const el = refs[i];
      if (el) {
        const raw = (progressVal + (100 * i) / len) % 100;
        el.style.offsetDistance = `${raw < 0 ? raw + 100 : raw}%`;
      }
    }
  }, [totalItems.length]);

  // Responsive scaling to fit container width while preserving 996x330 coordinate geometry
  useEffect(() => {
    const [,, w, h] = viewBox.split(" ").map(Number);
    const viewW = w || 996;
    const viewH = h || 330;

    const handleResize = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const clientW = container.clientWidth;
      const clientH = container.clientHeight || 330;
      const scale = clientW / viewW;

      track.style.width = `${viewW}px`;
      track.style.height = `${viewH}px`;
      track.style.transform = `translate(0px, ${(clientH - viewH * scale) / 2}px) scale(${scale})`;
      track.style.transformOrigin = "top left";
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewBox]);

  // Main high-performance Animation Frame Loop with strict viewport intersection idling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animId = null;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const deltaMs = Math.min(currentTime - lastTime, 64);
      lastTime = currentTime;

      if (isDraggingRef.current) {
        // Direct scrub during drag
        progressRef.current = (progressRef.current + dragVelocityRef.current) % 100;
        if (progressRef.current < 0) progressRef.current += 100;
        updateCardPositions(progressRef.current);
        dragVelocityRef.current *= 0.9;
        animId = requestAnimationFrame(loop);
        return;
      }

      // Smooth hover slowdown lerp
      const targetSpeed = (isHoveredRef.current && slowdownOnHover) ? slowDownFactor : 1;
      speedFactorRef.current += (targetSpeed - speedFactorRef.current) * 0.1;

      // If prefers-reduced-motion is active, do not auto-advance unless dragged
      if (reducedMotionRef.current && Math.abs(dragVelocityRef.current) < 0.001) {
        animId = requestAnimationFrame(loop);
        return;
      }

      let deltaMove = baseVelocity * (deltaMs / 1000) * speedFactorRef.current;

      // Inertial momentum from drag release
      if (draggable && Math.abs(dragVelocityRef.current) > 0.005) {
        deltaMove += dragVelocityRef.current;
        dragVelocityRef.current *= dragVelocityDecay;
      } else {
        dragVelocityRef.current = 0;
      }

      progressRef.current = (progressRef.current + deltaMove) % 100;
      if (progressRef.current < 0) progressRef.current += 100;
      updateCardPositions(progressRef.current);

      animId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.01, rootMargin: '100px 0px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stopLoop();
    };
  }, [baseVelocity, slowdownOnHover, slowDownFactor, draggable, dragVelocityDecay, updateCardPositions]);

  // Pointer drag event handlers
  const handlePointerDown = useCallback((e) => {
    if (!draggable) return;
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    dragVelocityRef.current = 0;
  }, [draggable]);

  const handlePointerMove = useCallback((e) => {
    if (!draggable || !isDraggingRef.current) return;
    const dx = e.clientX - lastPointerPosRef.current.x;
    const dy = e.clientY - lastPointerPosRef.current.y;
    const distance = Math.hypot(dx, dy);

    dragVelocityRef.current = (dx > 0 ? distance : -distance) * dragSensitivity;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
  }, [draggable, dragSensitivity]);

  const handlePointerUp = useCallback((e) => {
    if (!draggable) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
    isDraggingRef.current = false;
  }, [draggable]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320px] select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      style={{ cursor: draggable ? (isDraggingRef.current ? "grabbing" : "grab") : "default", touchAction: 'pan-y' }}
    >
      <div
        ref={trackRef}
        className="relative"
        style={{ contain: "layout style" }}
      >
        {/* Invisible SVG path trajectory */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full pointer-events-none"
        >
          <path d={path} stroke="none" fill="none" />
        </svg>

        {/* Filmstrip Rectangular Cards along the Bézier ribbon */}
        {totalItems.map((item, idx) => (
          <div
            key={`${item.src}-${idx}`}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="absolute top-0 left-0 cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              offsetPath: `path("${path}")`,
              offsetDistance: `${(100 * idx) / totalItems.length}%`,
              offsetRotate: "auto",
              zIndex: (idx % 12) + 1,
              willChange: "offset-distance",
              backfaceVisibility: "hidden"
            }}
          >
            <div
              className="relative -translate-x-1/2 -translate-y-1/2 w-16 h-22 sm:w-20 sm:h-28 md:w-24 md:h-32 p-1 rounded-md overflow-hidden bg-[#1A1815] shadow-xl border border-white/10 transition-transform duration-300 ease-out hover:scale-115 hover:z-50"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <img
                src={item.src}
                alt={`POOJA Moment ${idx + 1}`}
                draggable={false}
                decoding="async"
                className="w-full h-full object-cover rounded-[3px] grayscale transition-[filter,transform] duration-300 ease-out hover:grayscale-0 pointer-events-none select-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const photoItems = useMemo(() => {
    return Object.values(imageAssets.hero).map((src) => ({ src }));
  }, []);

  return (
    <div className="relative overflow-hidden flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FAFAF7]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Work+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      {/* Top Header Date Badge */}
      <div className="flex items-center justify-between px-8 pt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A8A80] sm:px-14 z-20 relative">
        <span>{birthdayConfig.displayDateShort}</span>
      </div>

      {/* Typography Hero Composition */}
      <div className="px-8 pt-14 sm:px-14 sm:pt-18 z-20 relative">
        <h1 className="font-['Bricolage_Grotesque',sans-serif] text-[clamp(2.8rem,11vw,7rem)] leading-[0.88] tracking-tight text-[#14140F] sm:text-7xl lg:text-8xl break-keep">
          <span className="font-light block">Happy</span>
          <span className="font-bold block">Birthday</span>
          <span className="font-bold block mt-1 text-amber-500">{birthdayConfig.name}</span>
        </h1>
        <div className="mt-6 h-px w-16 bg-[#9C7A3F]" />
        <p className="font-['Work_Sans',sans-serif] mt-6 max-w-sm text-base leading-relaxed text-[#4A4A42]">
          Wishing you a day filled with immense love, laughter, and all the happiness
          your heart can hold. May this year bring you endless joy and
          unforgettable memories. Happy Birthday, {birthdayConfig.name}!
        </p>
      </div>

      {/* Continuous Curved Photographic Filmstrip Ribbon */}
      <div className="absolute top-[38%] sm:top-[42%] md:top-[44%] left-1/2 mt-0 w-screen -rotate-10 -translate-x-1/2 z-10 pointer-events-auto">
        <CurvedMarqueeTrack items={photoItems} />
      </div>

      {/* Editorial Footer Divider */}
      <div className="mt-auto flex items-center justify-between px-8 pb-8 sm:px-14 z-20 relative">
        <div className="h-px flex-1 bg-[#14140F]/10" />
        <span className="font-mono px-4 text-[10px] uppercase tracking-[0.25em] text-[#8A8A80]">
          Made with love for {birthdayConfig.name}
        </span>
        <div className="h-px flex-1 bg-[#14140F]/10" />
      </div>
    </div>
  );
}
