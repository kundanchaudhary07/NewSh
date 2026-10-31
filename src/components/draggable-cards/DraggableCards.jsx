'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { imageAssets } from '@/config/assets.config';

const cardPositions = [
  "top-[8%] left-[8%] rotate-[-8deg]",
  "top-[15%] left-[35%] rotate-[6deg]",
  "top-[10%] right-[10%] rotate-[-5deg]",
  "top-[45%] left-[12%] rotate-[7deg]",
  "top-[50%] left-[40%] rotate-[-6deg]",
  "top-[40%] right-[12%] rotate-[10deg]",
  "bottom-[10%] left-[18%] rotate-[-10deg]",
  "bottom-[12%] left-[45%] rotate-[5deg]",
  "bottom-[8%] right-[15%] rotate-[-7deg]",
  "bottom-[18%] right-[32%] rotate-[-4deg]"
];

function DraggableCard({ photo, title, positionClass }) {
  const cardRef = useRef(null);
  // Drag state stored in refs to avoid re-renders
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0, currentX: 0, currentY: 0 });
  // Tilt state in ref
  const tiltState = useRef({ x: 0, y: 0 });

  const applyTransform = useCallback((tiltX = 0, tiltY = 0, dx = 0, dy = 0) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0) perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
  }, []);

  const handlePointerDown = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    const ds = dragState.current;
    ds.dragging = true;
    ds.startX = e.clientX - ds.currentX;
    ds.startY = e.clientY - ds.currentY;
    el.style.transition = 'none';
    el.style.zIndex = '60';
    el.style.cursor = 'grabbing';
  }, []);

  const handlePointerMove = useCallback((e) => {
    const ds = dragState.current;
    if (!ds.dragging) {
      // Tilt on hover (no drag)
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / 100));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / 100));
      tiltState.current = { x: nx * 12, y: -ny * 12 };
      applyTransform(nx * 12, -ny * 12, ds.currentX, ds.currentY);
      return;
    }
    const newX = e.clientX - ds.startX;
    const newY = e.clientY - ds.startY;
    ds.currentX = newX;
    ds.currentY = newY;
    applyTransform(tiltState.current.x, tiltState.current.y, newX, newY);
  }, [applyTransform]);

  const handlePointerUp = useCallback((e) => {
    const ds = dragState.current;
    ds.dragging = false;
    const el = cardRef.current;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.style.zIndex = '10';
      el.style.cursor = 'grab';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    tiltState.current = { x: 0, y: 0 };
    const ds = dragState.current;
    const el = cardRef.current;
    if (el) {
      el.style.transition = 'transform 0.3s ease-out';
      applyTransform(0, 0, ds.currentX, ds.currentY);
    }
  }, [applyTransform]);

  // Apply initial transform
  useEffect(() => {
    applyTransform(0, 0, 0, 0);
  }, [applyTransform]);

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseLeave={handleMouseLeave}
      className={`absolute ${positionClass} bg-white rounded-xl shadow-2xl p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10`}
      style={{ willChange: 'transform', transition: 'transform 0.15s ease-out' }}
    >
      <div className="relative overflow-visible">
        <img
          src={photo}
          alt={title}
          draggable={false}
          decoding="async"
          loading="lazy"
          className="h-56 w-56 rounded-lg object-cover pointer-events-none select-none"
        />
        <div className="absolute -top-7 -right-7 text-5xl z-50 pointer-events-none drop-shadow-md">
          ❤️
        </div>
        <p className="mt-3 text-center text-neutral-700 text-3xl font-semibold font-['Caveat',cursive] pointer-events-none">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function DraggableCards() {
  const polaroids = imageAssets.polaroids;

  return (
    <div className="[perspective:3000px] w-full h-full relative min-h-screen overflow-visible bg-[#d9d3c7] before:absolute before:inset-0 before:pointer-events-none before:bg-[linear-gradient(rgba(120,110,90,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,110,90,0.12)_1px,transparent_1px)] before:bg-[size:40px_40px] after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.08))]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap"
      />

      {polaroids.map((item, i) => (
        <DraggableCard
          key={item.src + i}
          photo={item.src}
          title={item.caption}
          positionClass={cardPositions[i % cardPositions.length]}
        />
      ))}

      <div className="absolute top-20 left-20 text-5xl opacity-30 pointer-events-none">
        ✿
      </div>
      <div className="absolute bottom-20 right-20 text-5xl opacity-30 pointer-events-none">
        ♡
      </div>
      <div className="absolute top-[45%] right-[5%] text-4xl opacity-30 pointer-events-none">
        ✨
      </div>
    </div>
  );
}
