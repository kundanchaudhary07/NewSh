# Setup & Execution Instructions

## Prerequisites
- **Node.js:** v18.0.0 or higher (verified on Node v24.18.1).
- **Package Manager:** `npm` (v9+ or v10+).
- **Supported Browsers:** Chrome, Firefox, Edge, Safari, Brave (with standard WebGL enabled).

---

## Quick Start Guide

### 1. Navigate to Project Directory
```bash
cd second-birthday-recovered
```

### 2. Install Dependencies
Dependencies are already configured in `package.json`:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The local application will start immediately at:
[http://localhost:3000](http://localhost:3000)

### 4. Build for Production
To generate an optimized production bundle:
```bash
npm run build
npm run start
```

---

## Project Structure Overview
```text
second-birthday-recovered/
├── docs/                               # Comprehensive recovery and audit reports
│   ├── FEATURE_INVENTORY.md            # Detailed feature and interaction breakdown
│   ├── TECH_STACK_REPORT.md            # Deep technology stack specifications
│   ├── MISSING_FUNCTIONALITY_REPORT.md # Delta between remote and recovered code
│   ├── SETUP_AND_EXECUTION.md          # Local run and deploy instructions
│   └── VERIFICATION_REPORT.md          # Quality assurance and verification log
├── public/                             # 100% recovered public assets
│   ├── birthday.html                   # Standalone intro reveal animation
│   ├── last.html                       # Standalone closing celebration
│   ├── favicon.ico                     # Original site favicon
│   ├── bg2.jpg                         # Backdrop image
│   ├── ref/                            # High-res memory photos (girl.jpg - girl11.jpg, heart.jpg)
│   ├── pages/                          # Scrapbook covers & spreads (front, left, right, back)
│   ├── elements/                       # Scrapbook washi tape, cats, notes, stars, stickers
│   ├── frames/                         # Polaroid photo frame overlays
│   └── sounds/                         # Romantic melody (pipi-song.mp3, 3.15 MB)
├── src/
│   ├── app/
│   │   ├── api/time/route.js           # Realtime server time endpoint for odometer sync
│   │   ├── globals.css                 # Tailwind base styles and snap-scroll layout
│   │   ├── layout.jsx                  # Root document layout with Google Fonts
│   │   └── page.jsx                    # Multi-section snap-scroll container
│   ├── components/
│   │   ├── countdown/CountdownOverlay.jsx # Theater marquee, bulb dots, odometer & curtains
│   │   ├── hero/HeroSection.jsx        # Editorial typography with orbiting curved photo track
│   │   ├── draggable-cards/DraggableCards.jsx # 3D polaroid cards with drag physics
│   │   ├── floating-notes/FloatingNotes.jsx  # Fluttering butterflies & vintage deckled notes
│   │   ├── scrapbook/ScrapbookFlip.jsx # Realistic StPageFlip memory album
│   │   └── three-d/ThreeDSection.jsx   # Three.js 3D starfield universe & card galaxy
│   └── lib/
│       └── utils.js                    # Style merging utility (clsx + tailwind-merge)
├── package.json                        # Dependencies and scripts
├── tailwind.config.js                  # Design tokens, fonts, and responsive breakpoints
├── postcss.config.js                   # CSS processing pipeline
└── next.config.js                      # Next.js configuration
```
