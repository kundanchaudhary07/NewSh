# Technology Stack Report

## Target Architecture
The reference website **[https://second-birthday-version.vercel.app/](https://second-birthday-version.vercel.app/)** is an application built with modern React / Next.js ecosystem components, Turbopack, and high-performance animation and 3D rendering engines.

---

### 1. Framework & Core Runtime
- **Next.js:** App Router architecture (`next/navigation`, React Server Components with Turbopack bundler).
- **React 18 / 19:** Functional components, hooks (`useRef`, `useState`, `useEffect`, `useCallback`, `useMemo`), and concurrent features (`Suspense`, `createPortal`).
- **Node.js:** v18+ runtime for API route (`/api/time`) and SSR lifecycle.

---

### 2. Styling & Layout
- **Tailwind CSS (v3.4):** Modern utility styling, custom arbitrary values, snap-scrolling classes (`snap-y`, `snap-mandatory`, `snap-start`, `snap-always`).
- **CSS 3D Transforms:** `perspective: 3000px`, `transform-style: preserve-3d`, `rotateX`, `rotateY`, `backface-visibility`.
- **CSS SVG Motion Paths:** `offset-path: path(...)`, `offset-distance`, `offset-rotate: auto`.
- **Clip-Path Geometry:** Hand-crafted deckled paper edge polygons for vintage cards.

---

### 3. Animation & Physics Libraries
- **GSAP (GreenSock Animation Platform 3.12.5):**
  - Timeline sequencing (`gsap.timeline()`).
  - Odometer digit strip rolling animations (`power3.out`).
  - Bulb light marquee stagger sequences (`power1.inOut`, `yoyo: true`).
  - Screen curtain parting animation with labels.
- **Framer Motion (v11):**
  - Physics-based spring animations (`useSpring`, `damping: 20`, `stiffness: 150`).
  - Gesture tracking for draggable polaroids (`drag`, `dragConstraints`).
  - Layout morphing and presence transitions (`AnimatePresence`, `layoutId`).
- **Page-Flip (StPageFlip v2.0.7):**
  - Real-world book folding mechanics, hard cover support, drop-shadow rendering, corner dragging, and page turn physics.

---

### 4. 3D Graphics & WebGL
- **Three.js (r170):** Perspective camera, ambient/directional/point lights, buffer geometries, points material, wireframe standard materials.
- **@react-three/fiber (R3F v8):** Declarative Three.js scene graph in React.
- **@react-three/drei:** `OrbitControls` for spherical orbital manipulation, `Html` component for rendering interactive DOM nodes in 3D WebGL space.

---

### 5. Media & Sound
- **HTML5 Web Audio:** Background theme melody (`/sounds/pipi-song.mp3`, 3.15 MB, 128kbps stereo), synchronized with interaction events.
- **Assets:** High-resolution optimized photos, vector stickers, polaroids, washi tape PNGs, and retro book covers.

---

### 6. Typography
- **Google Fonts:**
  - `Anton` & `Bebas Neue`: Cinema marquee and retro theater display titles.
  - `Bricolage Grotesque`: Bold modern editorial headlines.
  - `Caveat`: Intimate handwritten script captions.
  - `Newsreader`: Literary serif letter body text.
  - `JetBrains Mono`: Technical timestamps and note indexing.
  - `Space Mono` & `Archivo Black`: Futuristic countdown and intro branding.
  - `Work Sans`: Clean body copy.
