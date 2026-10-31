# Feature Inventory

Comprehensive breakdown of every discovered interactive feature, visual component, and media system recovered from [https://second-birthday-version.vercel.app/](https://second-birthday-version.vercel.app/).

---

## 1. Cinematic Premiere Marquee & Countdown Overlay (`CountdownOverlay.jsx`)
- **Feature Name:** Premiere Marquee Lockscreen & Live Countdown
- **Purpose:** Creates high-suspense theatrical countdown until the target reveal date (`August 11`), styled after vintage movie cinema marquees.
- **User Interaction:**
  - Dynamic live odometer counting down days, hours, minutes, and seconds.
  - Interactive "PREVIEW" button in top-right corner to bypass timer immediately.
  - Pointer down auto-unlocks and plays ambient theme music (`/sounds/pipi-song.mp3`).
- **Expected Output:**
  - Staggered illuminated bulb dots flicker around the marquee border using GSAP.
  - Projector flicker, moving ambient spotlight beam, film sprocket rails, and vintage grain.
  - Clicking "PREVIEW" or reaching 00:00:00:00 triggers split velvet curtains (`curtain-l`, `curtain-r`) to smoothly part open and reveal the main experience with volume fadeout.
- **Dependencies:** `gsap`, `react`, `react-dom` (Portals).
- **Status:** **Fully Recovered & Verified**.

---

## 2. Interactive Birthday Reveal Landing Page (`/birthday.html`)
- **Feature Name:** Interactive Greeting & Reveal Overlay
- **Purpose:** Standalone immersive introduction with typography, floating element effects, and reveal interaction.
- **User Interaction:**
  - Floating decorative photo elements (`/ref/girl1.jpg`, `/ref/girl2.jpg`).
  - Audio playback synchronization with background audio element.
  - Interactive reveal click animations.
- **Expected Output:** Fullscreen greeting with smooth typography (`Space Mono` and `Archivo Black`), floating physics, and backdrop blur.
- **Dependencies:** Vanilla HTML5, CSS3, GSAP.
- **Status:** **Fully Recovered & Verified** (Original source downloaded 100%).

---

## 3. Hero Section with Typography & Orbiting Photo Track (`HeroSection.jsx`)
- **Feature Name:** Hero Birthday Greeting with Curved Motion Path
- **Purpose:** Bold editorial birthday wish headline with continuous animated photo carousel along an intricate bezier curve.
- **User Interaction:**
  - Hovering slows down the carousel velocity.
  - Draggable / interactive curve interaction.
- **Expected Output:**
  - Big editorial typography ("Happy Birthday Sweety" in `Bricolage Grotesque`).
  - 12 circular photo tokens (`/ref/heart.jpg` through `/ref/girl11.jpg`) continuously orbiting along path `M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434...`.
- **Dependencies:** `framer-motion`, Google Fonts (`Bricolage Grotesque`, `Work Sans`, `JetBrains Mono`).
- **Status:** **Fully Recovered & Verified**.

---

## 4. Draggable Memory Cards & Photo Canvas (`DraggableCards.jsx`)
- **Feature Name:** Polaroid Memories Canvas
- **Purpose:** Tactile desk experience with scattered draggable photo cards.
- **User Interaction:**
  - Click and drag photos anywhere on screen with spring physics.
  - 3D cursor tilt on mouse hover (cards tip towards pointer).
  - Hover enlargement (`hover:scale-105`) and cursor grab styling.
- **Expected Output:**
  - 10 distinct polaroid cards featuring girl photos with custom captions in `Caveat` font:
    - "Cutie 🥹", "Baddie 😎", "Pretty ✨", "My Love 🤍", "Sunshine ☀️", "Beautiful 🌸", "Dream Girl 💫", "Queen 👑", "Princess 💖", "Angel 🕊️"
  - Heart badges (`❤️`) drop-shadowed on top-right corners.
  - Grid desk background `#d9d3c7` with decorative hand-drawn symbols (`✿`, `♡`, `✨`).
- **Dependencies:** `framer-motion`, `react`.
- **Status:** **Fully Recovered & Verified**.

---

## 5. Wandering Flutter Butterflies with Handwritten Love Notes (`FloatingNotes.jsx`)
- **Feature Name:** Fluttering Butterfly Love Notes
- **Purpose:** Playful romantic surprise with animated butterflies floating organically over the cards.
- **User Interaction:**
  - Hovering over a butterfly pauses flight and highlights wings.
  - Clicking any butterfly opens a vintage deckled handmade paper love letter modal.
- **Expected Output:**
  - 5 fluttering butterflies with flapping SVG wings in custom gradient pastel accents.
  - Random wandering flight path generation across the viewport.
  - 5 romantic notes in Hindi/English with `Newsreader` and `JetBrains Mono` fonts:
    - Note 01: "Every butterfly escapes... except me. I've been happily stuck with you since day one. 🤍"
    - Note 02: "Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai. 🫶"
    - Note 03: "Tumne butterfly ko touch kiya... aur meri heartbeat phir se skip kar gayi. 😭❤️"
    - Note 04: "Looks like you're really good at catching butterflies... no wonder you caught my heart so easily. ❤️"
    - Note 05: "This butterfly landed in your hands for a moment... my heart chose to stay there forever. 🦋"
- **Dependencies:** `framer-motion`, `react`.
- **Status:** **Fully Recovered & Verified**.

---

## 6. Realistic 3D Scrapbook Turning Book (`ScrapbookFlip.jsx`)
- **Feature Name:** Memory Scrapbook with Page-Flip Physics
- **Purpose:** Realistic turning page photo book filled with collages, washi tape, stickers, frames, and heartfelt notes.
- **User Interaction:**
  - Click and drag page corners to turn pages realistically with paper shadows.
  - "Previous Page" and "Next Page" navigation controls.
- **Expected Output:**
  - 8 realistic pages:
    - Cover: Front cover hard cover (`/pages/front.png`).
    - Pages 1-2: Memories with stickers (`/elements/fwine.png`, `/elements/mouse.png`, `/elements/butter.png`, photo `/ref/girl.jpg`, `/elements/frame10.png`, `/elements/paper.png`, etc.).
    - Pages 3-4: Cute moments with cats (`/elements/billa6.png`, `/elements/moon.png`, `/elements/fits.png`, `/elements/note1.png`, washi tape `/elements/lovetape.png`, bouquet `/elements/boqey.png`, etc.).
    - Pages 5-6: Music and stars (`/elements/disk.png`, `/elements/billa5.png`, `/elements/twoStar.png`, frames, and notes).
    - Back Cover: Hard cover finish (`/pages/back.png`).
- **Dependencies:** `page-flip` (StPageFlip), Next.js `Image`.
- **Status:** **Fully Recovered & Verified**.

---

## 7. WebGL 3D Memory Galaxy (`ThreeDSection.jsx`)
- **Feature Name:** 3D Memory Sphere & Starfield Universe
- **Purpose:** Full WebGL space environment with 12 memory cards suspended on a spherical Fibonacci orbit.
- **User Interaction:**
  - Left-click drag to freely orbit and inspect in 360 degrees.
  - Hovering on a card zooms and highlights its cyan border.
  - Clicking any 3D card opens a detailed inspection modal with download and favorite actions.
- **Expected Output:**
  - 6,000 particle slowly rotating starfield.
  - 12 memory capsules orbiting wireframe cybernetic spheres (`#31b8c6`).
  - Full-resolution card viewing modal with Save button.
- **Dependencies:** `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`.
- **Status:** **Fully Recovered & Verified**.

---

## 8. Grand Celebration Finale (`/last.html`)
- **Feature Name:** Celebration Fireworks & Dedication Card
- **Purpose:** Final grand climax of the storytelling flow.
- **User Interaction:**
  - Visual celebration with animated balloons and fireworks.
  - Final sweet closing love letter scroll.
- **Expected Output:** Fireworks particles, floating celebratory balloons, and dedication closing.
- **Dependencies:** Vanilla HTML5, CSS3, GSAP.
- **Status:** **Fully Recovered & Verified** (Original source downloaded 100%).
