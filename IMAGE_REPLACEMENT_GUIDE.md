# Comprehensive Image & Photograph Replacement Guide

Welcome! This guide explains how to replace all the placeholder photographs in this project with your own personal photos, while **100% preserving the animations, 3D tilts, spring physics, and visual aesthetics**.

---

## 🚀 Two Simple Ways to Replace Images

You can choose whichever method is easiest for you:

### Method 1: The Zero-Code Overwrite Method (Recommended & Fast)
All photographs live inside the `public/` directory. You can simply copy your photos into `public/ref/` using the exact same filenames (e.g. rename your favorite photo to `girl.jpg`, another to `girl2.jpg`, etc.).
- **No code changes needed!**
- The site automatically loads your new photos immediately.

### Method 2: The Centralized Config Method (`assets.config.js`)
If you want to keep your own custom filenames (e.g., `vacation.jpg`, `dinner.jpg`):
1. Place your photos in `public/images/` (or any subfolder inside `public/`).
2. Open [`src/config/assets.config.js`](src/config/assets.config.js).
3. Update the path mapping to point to your new file paths.

---

## 📸 Master Image Mapping Table

| Section & Component | Purpose | Current File Path | Dimensions (W × H) | Aspect Ratio | Display Mode | Configuration Key (`assets.config.js`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Section 1: Mini Player** | Rotating Album Art A | `/ref/girl1.jpg` | 735 × 538 px | ~4:3 | `cover` | `imageAssets.revealPlayer.albumArtA` |
| **Section 1: Mini Player** | Rotating Album Art B | `/ref/girl2.jpg` | 720 × 736 px | ~1:1 | `cover` | `imageAssets.revealPlayer.albumArtB` |
| **Section 2: Hero Track** | Curved Track Token (Heart) | `/ref/heart.jpg` | 736 × 884 px | ~5:6 | `cover` (circle) | `imageAssets.hero.heart` |
| **Section 2: Hero Track** | Orbiting Photo 1 | `/ref/girl.jpg` | 736 × 736 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo1` |
| **Section 2: Hero Track** | Orbiting Photo 2 | `/ref/girl2.jpg` | 720 × 736 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo2` |
| **Section 2: Hero Track** | Orbiting Photo 3 | `/ref/girl3.jpg` | 736 × 694 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo3` |
| **Section 2: Hero Track** | Orbiting Photo 4 | `/ref/girl4.jpg` | 736 × 736 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo4` |
| **Section 2: Hero Track** | Orbiting Photo 5 | `/ref/girl5.jpg` | 736 × 736 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo5` |
| **Section 2: Hero Track** | Orbiting Photo 6 | `/ref/girl6.jpg` | 736 × 736 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo6` |
| **Section 2: Hero Track** | Orbiting Photo 7 | `/ref/girl7.jpg` | 720 × 720 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo7` |
| **Section 2: Hero Track** | Orbiting Photo 8 | `/ref/girl8.jpg` | 736 × 736 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo8` |
| **Section 2: Hero Track** | Orbiting Photo 9 | `/ref/girl9.jpg` | 735 × 744 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo9` |
| **Section 2: Hero Track** | Orbiting Photo 10 | `/ref/girl10.jpg` | 735 × 790 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo10` |
| **Section 2: Hero Track** | Orbiting Photo 11 | `/ref/girl11.jpg` | 736 × 736 px | 1:1 | `cover` (circle) | `imageAssets.hero.photo11` |
| **Section 3: Polaroids** | Polaroid 1 ("Cutie 🥹") | `/ref/girl2.jpg` | 720 × 736 px | 1:1 | `cover` | `imageAssets.polaroids[0].src` |
| **Section 3: Polaroids** | Polaroid 2 ("Baddie 😎") | `/ref/girl3.jpg` | 736 × 694 px | 1:1 | `cover` | `imageAssets.polaroids[1].src` |
| **Section 3: Polaroids** | Polaroid 3 ("Pretty ✨") | `/ref/girl4.jpg` | 736 × 736 px | 1:1 | `cover` | `imageAssets.polaroids[2].src` |
| **Section 3: Polaroids** | Polaroid 4 ("My Love 🤍") | `/ref/girl5.jpg` | 736 × 736 px | 1:1 | `cover` | `imageAssets.polaroids[3].src` |
| **Section 3: Polaroids** | Polaroid 5 ("Sunshine ☀️") | `/ref/girl6.jpg` | 736 × 736 px | 1:1 | `cover` | `imageAssets.polaroids[4].src` |
| **Section 3: Polaroids** | Polaroid 6 ("Beautiful 🌸") | `/ref/girl7.jpg` | 720 × 720 px | 1:1 | `cover` | `imageAssets.polaroids[5].src` |
| **Section 3: Polaroids** | Polaroid 7 ("Dream Girl 💫")| `/ref/girl8.jpg` | 736 × 736 px | 1:1 | `cover` | `imageAssets.polaroids[6].src` |
| **Section 3: Polaroids** | Polaroid 8 ("Queen 👑") | `/ref/girl9.jpg` | 735 × 744 px | 1:1 | `cover` | `imageAssets.polaroids[7].src` |
| **Section 3: Polaroids** | Polaroid 9 ("Princess 💖") | `/ref/girl10.jpg` | 735 × 790 px | 1:1 | `cover` | `imageAssets.polaroids[8].src` |
| **Section 3: Polaroids** | Polaroid 10 ("Angel 🕊️") | `/ref/girl11.jpg` | 736 × 736 px | 1:1 | `cover` | `imageAssets.polaroids[9].src` |
| **Section 4: Scrapbook** | Page 1 Collage Photo | `/ref/girl.jpg` | 736 × 736 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page1` |
| **Section 4: Scrapbook** | Page 2 Strip Photo A | `/ref/girl.jpg` | 736 × 736 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page2A` |
| **Section 4: Scrapbook** | Page 2 Strip Photo B | `/ref/girl2.jpg` | 720 × 736 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page2B` |
| **Section 4: Scrapbook** | Page 2 Strip Photo C | `/ref/girl3.jpg` | 736 × 694 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page2C` |
| **Section 4: Scrapbook** | Page 3 Photo | `/ref/girl4.jpg` | 736 × 736 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page3` |
| **Section 4: Scrapbook** | Page 4 Photo | `/ref/girl5.jpg` | 736 × 736 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page4` |
| **Section 4: Scrapbook** | Page 5 Photo A | `/ref/girl4.jpg` | 736 × 736 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page5A` |
| **Section 4: Scrapbook** | Page 5 Photo B | `/ref/girl10.jpg` | 735 × 790 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page5B` |
| **Section 4: Scrapbook** | Page 6 Photo A | `/ref/girl9.jpg` | 735 × 744 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page6A` |
| **Section 4: Scrapbook** | Page 6 Photo B | `/ref/girl8.jpg` | 736 × 736 px | 1:1 | `contain` / framed | `imageAssets.scrapbook.photos.page6B` |
| **Section 5: 3D Universe**| 12 Orbiting 3D Capsules | `/ref/heart.jpg`, `/ref/girl.jpg`... | ~736 × 736 px | 1:1 | `cover` | `imageAssets.universe[0..11]` |
| **Section 6: iMessage** | Chat Profile Picture | `/ref/girl3.jpg` | 736 × 694 px | 1:1 | `cover` (circle) | `imageAssets.iMessage.profilePicture` |

---

## 🛠️ Section-by-Section Instructions

### 1. How to Replace Hero Orbiting Photographs
In **Section 2**, 12 circular badges glide continuously along a gold bezier curve.
- **Recommended format:** JPG, PNG, or WEBP.
- **Recommended dimensions:** 600 × 600 px to 800 × 800 px (Square 1:1).
- **Tip:** Faces should be centered in the photo so they fit nicely within the circular crop.

### 2. How to Replace Draggable Polaroid Photographs
In **Section 3**, 10 polaroids are scattered across the desk with custom cursive captions.
- **Recommended dimensions:** 700 × 700 px to 800 × 800 px.
- **Customizing captions:** In [`src/config/assets.config.js`](src/config/assets.config.js), change the `caption` field (e.g. change `"Cutie 🥹"` to `"Our First Date ☕"`).

### 3. How to Replace Scrapbook Photographs
In **Section 4**, the realistic turning album features 8 pages with stickers and washi tape.
- The photos appear behind cute retro frames (`frame7.png`, `frame8.png`, `frame10.png`, `frame11.png`).
- Square photos (1:1) work best. The existing scaling and rotation parameters will automatically frame your new pictures.

### 4. How to Replace 3D Gallery Photographs
In **Section 5**, 12 memory capsules orbit in a 3D galaxy.
- You can customize the image, title, and alt text inside `imageAssets.universe`.
- When visitors click a card, the high-res image will pop open in the 3D inspection modal.

### 5. How to Replace the iMessage Chat Profile Picture
In **Section 6** (`/last.html`), the smartphone chat header displays the profile avatar.
- Overwrite `/ref/girl3.jpg` or edit the `src` attribute in `public/last.html` (line 462).

### 6. How to Replace the Background Music
To use your own special song:
1. Copy your MP3 file into `public/sounds/my-song.mp3`.
2. Update `songSrc` in [`src/components/countdown/CountdownOverlay.jsx`](src/components/countdown/CountdownOverlay.jsx) and `src` in `public/birthday.html`.

---

## ✅ Best Practices
- **Square Photos (1:1):** Most photo holders in this project use 1:1 square crops. Using square or near-square photos prevents awkward letterboxing.
- **Optimization:** Keep image files under 500KB each for super fast loading and smooth 60fps animations.
- **Supported Formats:** `.jpg`, `.jpeg`, `.png`, `.webp`.
