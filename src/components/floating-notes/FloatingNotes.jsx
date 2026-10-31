'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultNotes = [
  {
    id: "n1",
    title: "01",
    text: "Every butterfly escapes... except me. I've been happily stuck with you since day one. 🤍",
    accent: "#D98E7E"
  },
  {
    id: "n2",
    title: "02",
    text: "Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai. 🫶",
    accent: "#C9A15E"
  },
  {
    id: "n3",
    title: "03",
    text: "Tumne butterfly ko touch kiya... aur meri heartbeat phir se skip kar gayi. 😭❤️",
    accent: "#7E9C68"
  },
  {
    id: "n4",
    title: "04",
    text: "Looks like you're really good at catching butterflies... no wonder you caught my heart so easily. ❤️",
    accent: "#B27A94"
  },
  {
    id: "n5",
    title: "05",
    text: "This butterfly landed in your hands for a moment... my heart chose to stay with you forever, Pooja. 🦋",
    accent: "#7C8FA6"
  }
];

function ButterflyWing({ side, idPrefix, accent, flapMs, delay = 0, isVisible }) {
  const gradId = `${idPrefix}-grad-${side}`;
  const isLeft = side === "left";

  return (
    <svg
      viewBox="0 0 84 120"
      className={isLeft ? "wing-anim-left" : "wing-anim-right"}
      style={{
        position: "absolute",
        left: isLeft ? undefined : "50%",
        right: isLeft ? "50%" : undefined,
        top: 0,
        width: 42,
        height: 60,
        transformOrigin: isLeft ? "100% 18%" : "0% 18%",
        overflow: "visible",
        animationDuration: `${flapMs / 1000}s`,
        animationDelay: `${delay}s`,
        animationPlayState: isVisible ? "running" : "paused",
        willChange: "transform"
      }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity={0.9} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.4} />
        </linearGradient>
      </defs>
      <path
        d="M4 18 C 18 4, 44 2, 62 14 C 76 23, 78 40, 66 48 C 54 55, 34 52, 20 44 C 10 38, 3 28, 4 18 Z"
        fill={`url(#${gradId})`}
        stroke={accent}
        strokeOpacity={0.4}
        strokeWidth={0.8}
      />
      <path
        d="M4 42 C 6 56, 16 70, 32 76 C 42 80, 50 74, 48 64 C 46 56, 36 52, 26 50 C 16 48, 6 46, 4 42 Z"
        fill={`url(#${gradId})`}
        opacity={0.92}
        stroke={accent}
        strokeOpacity={0.35}
        strokeWidth={0.8}
      />
      <circle cx="30" cy="63" r="3" fill="none" stroke={accent} strokeOpacity={0.6} strokeWidth={0.8} />
    </svg>
  );
}

function Butterfly({ note, onClick, index, isVisible }) {
  const divRef = useRef(null);
  const posRef = useRef({
    x: 80 + (index * 220) % 800,
    y: 100 + (index * 140) % 500
  });

  useEffect(() => {
    // Apply initial position immediately without transition
    const el = divRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const moveToNewPos = () => {
      const x = Math.max(40, Math.min(window.innerWidth - 120, Math.random() * (window.innerWidth - 120)));
      const y = Math.max(40, Math.min(window.innerHeight - 120, Math.random() * (window.innerHeight - 120)));
      posRef.current = { x, y };
      const el = divRef.current;
      if (el) {
        const dur = 5 + Math.random() * 3;
        el.style.transition = `transform ${dur}s ease-in-out`;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    // First movement after mount
    const firstTimer = setTimeout(moveToNewPos, 300);
    const interval = setInterval(moveToNewPos, 7000 + Math.random() * 4000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [isVisible]);

  const handleMouseEnter = () => {
    if (divRef.current) divRef.current.style.scale = '1.25';
  };
  const handleMouseLeave = () => {
    if (divRef.current) divRef.current.style.scale = '1';
  };
  const handleMouseDown = () => {
    if (divRef.current) divRef.current.style.scale = '0.95';
  };
  const handleMouseUp = () => {
    if (divRef.current) divRef.current.style.scale = '1';
  };

  return (
    <div
      ref={divRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 84,
        height: 70,
        cursor: "pointer",
        zIndex: 40,
        pointerEvents: "auto",
        willChange: "transform",
        transitionProperty: "transform",
      }}
    >
      <ButterflyWing side="left" idPrefix={note.id} accent={note.accent} flapMs={320} delay={0} isVisible={isVisible} />
      <ButterflyWing side="right" idPrefix={note.id} accent={note.accent} flapMs={320} delay={0} isVisible={isVisible} />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 41,
          width: 2,
          height: 38,
          borderRadius: 2,
          backgroundColor: "#1F1B18",
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
        }}
      />
    </div>
  );
}

function NoteModal({ note, onClose }) {
  if (!note) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(12,10,9,0.65)",
        backdropFilter: "blur(6px)",
        pointerEvents: "auto"
      }}
    >
      <motion.div
        layoutId={`note-${note.id}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        style={{
          width: "min(400px, 90vw)",
          padding: "2.6rem 2.2rem 2.2rem",
          background: "#1E1A17",
          position: "relative",
          clipPath:
            "polygon(0% 1.5%,3% 0%,9% 1.2%,16% 0%,24% 1.4%,32% 0.2%,40% 1.1%,48% 0%,56% 1.3%,64% 0.1%,72% 1.2%,80% 0%,88% 1%,94% 0.2%,100% 1.4%,100% 98.5%,96% 100%,90% 98.7%,83% 100%,75% 98.6%,67% 100%,59% 98.8%,51% 100%,43% 98.7%,35% 100%,27% 98.6%,19% 100%,11% 98.8%,4% 100%,0% 98.6%)",
          boxShadow: "0 24px 60px -18px rgba(0,0,0,0.8)"
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close note"
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            border: "none",
            background: "transparent",
            color: "rgba(237,230,218,0.55)",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            lineHeight: 1
          }}
        >
          close
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              color: note.accent,
              fontWeight: 600
            }}
          >
            N° {note.title}
          </span>
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.14)" }} />
        </div>

        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontWeight: 400,
            fontSize: "1.25rem",
            lineHeight: 1.65,
            color: "#EDE6DA",
            margin: 0,
            letterSpacing: "0.005em"
          }}
        >
          {note.text}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingNotes({ notes = defaultNotes }) {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const activeNote = notes.find((n) => n.id === activeNoteId) || null;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '100px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fn-root"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 35,
        pointerEvents: "none"
      }}
    >
      <style>{`
        @keyframes wingFlapLeft {
          0%, 100% { transform: scaleX(-1) rotateY(10deg) rotateZ(0deg); }
          50% { transform: scaleX(-1) rotateY(64deg) rotateZ(-4deg); }
        }
        @keyframes wingFlapRight {
          0%, 100% { transform: rotateY(10deg) rotateZ(0deg); }
          50% { transform: rotateY(64deg) rotateZ(-4deg); }
        }
        .wing-anim-left {
          animation-name: wingFlapLeft;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .wing-anim-right {
          animation-name: wingFlapRight;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
      />

      {notes.map((note, idx) => (
        <Butterfly
          key={note.id}
          note={note}
          index={idx}
          isVisible={isVisible}
          onClick={() => setActiveNoteId(note.id)}
        />
      ))}

      <AnimatePresence>
        {activeNote && (
          <NoteModal note={activeNote} onClose={() => setActiveNoteId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
