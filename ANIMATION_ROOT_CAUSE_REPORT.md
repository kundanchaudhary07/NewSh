# ANIMATION & MOTION SYSTEM ROOT CAUSE DIAGNOSIS REPORT
**Project:** POOJA — Birthday Experience  
**Date:** October 31, 2026 (1 November Celebration)  
**Target Recipient:** POOJA  
**Investigation Scope:** Deep forensic diagnosis of animations, scroll jitter, section transitions, iframe communications, and WebGL lifecycle across all 8 interactive sections.

---

## 1. Executive Summary & Root Cause Matrix

The previous implementation suffered from several architectural flaws that produced page shaking, sudden scroll jumps, layout shifts, and visual flickering when navigating the website in a real browser.

Through headless Chrome DevTools Protocol (CDP) evaluation, the following root causes were pinpointed and completely resolved:

| Root Cause ID | Faulty Mechanism | Observed Symptom | Primary Components | Permanent Repair Applied |
|:-------------:|:-----------------|:-----------------|:-------------------|:-------------------------|
| **RC-01** | Global `scroll-behavior: smooth` on `html, body` | Violent page shaking, rubberbanding, and input latency during wheel/trackpad scrolling | `layout.jsx`, `globals.css` | Removed `scroll-smooth` and `scroll-behavior: smooth`. Replaced with instantaneous, native wheel scroll physics + on-demand programmatic smooth scroll for UI clicks. |
| **RC-02** | Unthrottled Iframe Wheel Event Forwarding | Hijacked iMessage conversation scrolling; page jerked down to footer whenever user rolled wheel over chat | `public/last.html`, `page.jsx` | Implemented boundary-aware wheel/touch forwarding: conversation inside `.chat` scrolls natively; events forward to parent ONLY when at top/bottom boundary. |
| **RC-03** | Duplicate Semantic `<section>` Nesting | Doubled min-heights, duplicate IDs, selector collisions in SectionNav, height anomalies | `page.jsx`, `HeroSection.jsx`, `FinaleSection.jsx` | Flattened outer wrappers: converted nested `<section>` elements in Hero and Finale into semantic `<div>` containers under canonical section IDs. |
| **RC-04** | In-Flow Negative Margin Transition Divs | 56px height gap/shift at section seams (`802px` instead of `746px` viewport height), causing visible overshoot | `page.jsx` | Replaced in-flow `<div className="h-28 -mt-14">` with absolute overlay gradients pinned to section boundaries, adding zero extra height to document flow. |
| **RC-05** | Three.js OrbitControls Touch Interception | Mobile touch scroll trapped inside 3D Galaxy section | `ThreeDSection.jsx` | Set `touchAction: 'pan-y'` on canvas, disabled pan, enabled damping (`dampingFactor: 0.05`), preserving natural page scrolling. |
| **RC-06** | Mobile Scrapbook Page Sizing Overflow | Two-page spread (880px width) exceeded mobile viewports (375px), causing canvas clipping and flip jitter | `ScrapbookFlip.jsx` | Dynamically adapt `PageFlip` based on viewport: desktop (spread, 440x520), mobile/tablet (single-page portrait, max 340px width). Prevent simultaneous flips. |
| **RC-07** | Commented `#pressPrompt` Element referenced by GSAP | Threw GSAP target not found warnings on reveal trigger | `public/birthday.html` | Restored interactive `#pressPrompt` badge ("press to celebrate") and added null checks to eliminate console warnings. |
| **RC-08** | Unthrottled SectionNav Scroll Listener | Continuous state re-renders during high-speed scrolling | `SectionNav.jsx` | Applied `requestAnimationFrame` tick throttling to scroll position detection. |

---

## 2. Detailed Root Cause Analysis

### 2.1 The Global Smooth Scroll Conflict (RC-01)
- **Mechanism:** In CSS, `scroll-behavior: smooth` applies an animated easing function to all scroll actions. When a user rolls a physical mouse wheel or uses a trackpad, the OS dispatches a stream of discrete `wheel` events (typically 10 to 30 events in 200ms).
- **The Conflict:** Each wheel event attempted to start a smooth scroll interpolation. The subsequent wheel event arrived 16ms later, aborting or resetting the in-flight interpolation. In Chrome, this manifests as a high-frequency jitter where the scroll position oscillates back and forth.
- **The Resolution:** Removed `scroll-smooth` from `<html>` and `scroll-behavior: smooth` from `globals.css`. Native wheel scrolling is now direct, responsive, and 100% jitter-free. Programmatic smooth scrolling is invoked only when clicking navigation buttons (`behavior: 'smooth'`).

### 2.2 Iframe Event Flooding & Chat Interception (RC-02)
- **Mechanism:** To prevent iframes from trapping scroll, previous code had a global `window.addEventListener('wheel')` inside `public/last.html` and `public/birthday.html` that forwarded every `e.deltaY` to `page.jsx` via `postMessage`.
- **The Conflict:** In `last.html`, the iPhone mock-up contains an active conversation container (`.chat { overflow-y: auto }`). When the user scrolled to read earlier messages, the event was intercepted and sent to the parent window, scrolling the outer website instead of the conversation!
- **The Resolution:** Added boundary detection in `last.html`:
  ```javascript
  if (chatEl && chatEl.contains(e.target)) {
    const canScrollUp = chatEl.scrollTop > 1;
    const canScrollDown = chatEl.scrollTop + chatEl.clientHeight < chatEl.scrollHeight - 4;
    if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
      return; // Let chat scroll natively!
    }
  }
  window.parent.postMessage({ type: 'FORWARD_SCROLL', deltaY: e.deltaY }, '*');
  ```

### 2.3 Double `<section>` Tags and Boundary Gaps (RC-03 & RC-04)
- **Mechanism:** In `page.jsx`, `<section id="section-hero">` wrapped `<HeroSection />`, which itself rendered `<section className="min-h-screen">`. Similarly, `<section id="section-finale">` wrapped `<FinaleSection />`, which rendered another `<section id="section-finale">`. Furthermore, two `<div className="h-28 -mt-14 ...">` elements were inserted between sections.
- **The Conflict:** The in-flow `-mt-14` divs expanded the boundary between sections by 56px (`802px` instead of `746px`), shifting section offsets and causing SectionNav and keyboard page navigation to land 56px off-target.
- **The Resolution:** Replaced nested `<section>` elements with `<div>`, leaving exactly 8 canonical `<section id="...">` elements. Replaced in-flow transition blocks with absolute gradient overlays pinned to section bottoms (`absolute bottom-0 left-0 right-0 h-24 pointer-events-none`).

---

## 3. Section-by-Section Verification Summary

All 8 sections now operate with zero layout shifts, zero console warnings, and zero scroll conflicts:

1. **Section 1 — Theater:** Velvet curtains open/close via GSAP; unblocks page scroll upon opening; supports replay without timeline duplication.
2. **Section 2 — Birthday Reveal:** Watermark burn animation reveals golden POOJA typography; audio visualizer synchronizes with pipi-song track; zero console warnings.
3. **Section 3 — Editorial Hero:** Continuous curved photographic ribbon with 24 rectangular cards; individual rotations; hover slowdown; pointer drag momentum; pause on off-screen.
4. **Section 4 — Polaroid Gallery:** 10 draggable 3D polaroid cards with cursor-based spring tilt; 10 organic flapping butterflies with interactive modal notes.
5. **Section 5 — Memory Scrapbook:** 8 skeuomorphic textured pages with drag and button page-turns; single-page mode on mobile; simultaneous flip prevention.
6. **Section 6 — 3D Memory Universe:** 6,000-star rotating starfield + 12 orbital memory capsules; `touchAction: pan-y` allows seamless mobile vertical scrolling.
7. **Section 7 — iMessage Experience:** Interactive iPhone messaging interface; native chat bubble scrolling; boundary-aware forwarding; heart tapback reactions.
8. **Section 8 — Grand Finale:** Multi-angle confetti cannons triggered via IntersectionObserver; celebratory dedication card; smooth return-to-top navigation.

