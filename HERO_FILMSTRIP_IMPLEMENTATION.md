# HERO FILMSTRIP IMPLEMENTATION REPORT
**Component:** `src/components/hero/HeroSection.jsx`  
**Target:** POOJA — Continuous Editorial Photographic Filmstrip Ribbon  
**Status:** 100% Recreated & Verified  

---

## 1. Visual & Mathematical Architecture

The Hero Section photo animation has been recreated from the ground up to match the reference composition:

```
                  ┌───────────────────────────────┐
                  │ 1 NOV                         │
                  │ Happy                         │
                  │ Birthday                      │
                  │ POOJA                         │
                  └───────────────▲───────────────┘
                                  │
      ╭───────────────────────────┴─────────────────────────────╮
      │  Continuous Photographic Ribbon (24 Rectangular Cards)  │
      ╰─────────────────────────────────────────────────────────╯
        Upper loop ───> Descending curve ───> Flowing rightward
```

### 1.1 The Bézier Trajectory Path
The motion trajectory follows the exact high-order cubic Bézier curve:
```svg
<path d="M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5" />
```
- **viewBox:** `0 0 996 330`
- **Container Rotation:** `-rotate-10` (`-10deg`) with `-translate-x-1/2` centered horizontally.
- **Vertical Origin:** Positioned at `top-[38%] sm:top-[42%] md:top-[44%]`, framing the birthday typography perfectly without obscuring the heading.

---

## 2. Card Design & Editorial Styling

In strict accordance with the user instructions, small circular tokens have been completely replaced with large rectangular editorial cards:

- **Dimensions:**
  - Mobile (375px–640px): `w-16 h-22` (64px × 88px)
  - Tablet (640px–768px): `w-20 h-28` (80px × 112px)
  - Desktop (768px+): `w-24 h-32` (96px × 128px)
- **Aspect Ratio:** Standard editorial portrait (3:4 ratio).
- **Frame & Matting:** Dark editorial gallery finish:
  - Background: `#1A1815`
  - Border: `1px solid rgba(255, 255, 255, 0.1)`
  - Shadow: `shadow-xl` (`0 20px 25px -5px rgba(0,0,0,0.5)`)
  - Corner Radius: `rounded-md` (`6px`)
- **Photographs:**
  - Full bleed inside card: `w-full h-full object-cover rounded-[3px]`
  - Default filter: `grayscale(1)`
  - Hover state: `grayscale(0)` with `hover:scale-115` and `hover:z-50` via smooth CSS transition `duration-300 ease-out`
- **Individual Rotations:** Each card is given a subtle individual tilt to create an organic contact-sheet aesthetic:
  ```javascript
  const CARD_ROTATIONS = [-3, 2, -1.5, 3.5, -2, 1, -3.5, 2.5, -1, 3, -2.5, 1.5];
  ```

---

## 3. Motion Dynamics & Physics Engine

### 3.1 Continuous Infinite Ribbon Spacing
To ensure zero gaps and seamless wrapping:
- **Repeat Factor:** `repeat = 2`
- **Item Count:** 12 unique photographs of POOJA × 2 = **24 total cards**.
- **Equidistant Spacing Formula:**
  $$\text{offsetDistance}_i = \left( (\text{progress} + \frac{100 \times i}{24}) \bmod 100 \right)\%$$
  Every card maintains an exact distance of $\frac{100\%}{24} = 4.1667\%$ along the Bézier curve.

### 3.2 Dynamic Velocity & Drag Momentum
- **Base Velocity:** `baseVelocity = 5` (approx 3.2% path advancement per second at 60fps).
- **Hover Slowdown:** When hovered, velocity drops to $5\%$ of normal speed (`slowDownFactor: 0.05`) driven by a Framer Motion spring (`damping: 60, stiffness: 300`).
- **Interactive Drag Scrubbing:**
  - Pointer capture via `setPointerCapture(pointerId)`.
  - Scrub sensitivity: `dragSensitivity = 0.08`.
  - Momentum decay: `dragVelocityDecay = 0.98` per frame after release.
- **Rolling Z-Index:** Cards dynamically adjust their layering along the loop ($z \in [1, 12]$) so overlapping sections stack in realistic 3D depth.

### 3.3 Responsive Scaling Engine
The component adapts the `996 × 330` coordinate geometry across all screen widths:
```javascript
const scale = container.clientWidth / 996;
track.style.width = '996px';
track.style.height = '330px';
track.style.transform = `translate(0px, ${(container.clientHeight - 330 * scale) / 2}px) scale(${scale})`;
track.style.transformOrigin = 'top left';
```

---

## 4. Personalization Integrity

- **Date:** `1 NOV` (strictly derived from `birthdayConfig.displayDateShort`).
- **Heading:**
  - "Happy"
  - "Birthday"
  - "POOJA" (`text-amber-500 font-bold`)
- **Dedication Text:** "Wishing you a day filled with immense love, laughter, and all the happiness your heart can hold. May this year bring you endless joy and unforgettable memories. Happy Birthday, POOJA!"
- **Editorial Footer:** `Made with love for POOJA`.
- **Constraint Verification:**
  - ❌ ZERO mentions of "Sweety".
  - ❌ ZERO mentions of "AUG 5".
  - ❌ ZERO age counter or birth year display.
  - ✅ All 12 POOJA hero photographs preserved.

