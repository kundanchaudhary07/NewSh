/**
 * Centralized Asset Configuration for POOJA Birthday Website
 *
 * All original photograph paths, filenames, and aspect ratios are 100% preserved.
 */

export interface PolaroidAsset {
  src: string;
  caption: string;
}

export interface UniverseAsset {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
}

export const imageAssets = {
  // Section 1 & Standalone /birthday.html: Mini Player & Reveal
  revealPlayer: {
    albumArtA: "/ref/girl1.jpeg",
    albumArtB: "/ref/girl2.jpeg",
    audioTrack: "/sounds/pipi-song.mp3",
    songTitle: "Pooja's Melody",
    artistName: "Birthday Playlist"
  },

  // Section 2: Birthday Hero Editorial Curved Motion Track
  hero: {
    heart: "/ref/heart.jpeg",
    photo1: "/ref/girl.jpeg",
    photo2: "/ref/girl2.jpeg",
    photo3: "/ref/girl3.jpeg",
    photo4: "/ref/girl4.jpeg",
    photo5: "/ref/girl5.jpeg",
    photo6: "/ref/girl6.jpeg",
    photo7: "/ref/girl7.jpeg",
    photo8: "/ref/girl8.jpeg",
    photo9: "/ref/girl9.jpeg",
    photo10: "/ref/girl10.jpeg",
    photo11: "/ref/girl11.jpeg"
  },

  // Section 3: Draggable 3D Polaroid Memories Canvas (Personalized for POOJA)
  polaroids: [
    { src: "/ref/girl2.jpeg", caption: "My Love 🤍" },
    { src: "/ref/girl3.jpeg", caption: "Dream Girl 💫" },
    { src: "/ref/girl4.jpeg", caption: "Queen 👑" },
    { src: "/ref/girl5.jpeg", caption: "Sunshine ☀️" },
    { src: "/ref/girl6.jpeg", caption: "Beautiful 🌸" },
    { src: "/ref/girl7.jpeg", caption: "My Happiness 🥹" },
    { src: "/ref/girl8.jpeg", caption: "Special One ✨" },
    { src: "/ref/girl9.jpeg", caption: "Forever 💍" },
    { src: "/ref/girl10.jpeg", caption: "My Favorite Person ❤️" },
    { src: "/ref/girl11.jpeg", caption: "POOJA 🕊️" }
  ] as PolaroidAsset[],

  // Section 4: Turning Memory Scrapbook (8 Pages)
  scrapbook: {
    covers: {
      front: "/pages/front.png",
      back: "/pages/back.png"
    },
    backgroundPages: {
      left: "/pages/left.jpg",
      right: "/pages/right.jpg"
    },
    photos: {
      page1: "/ref/girl.jpeg",
      page2A: "/ref/girl.jpeg",
      page2B: "/ref/girl2.jpeg",
      page2C: "/ref/girl3.jpeg",
      page3: "/ref/girl4.jpeg",
      page4: "/ref/girl5.jpeg",
      page5A: "/ref/girl4.jpeg",
      page5B: "/ref/girl10.jpeg",
      page6A: "/ref/girl9.jpeg",
      page6B: "/ref/girl8.jpeg"
    },
    ambientFloatingPhotos: [
      "/ref/girl.jpeg",
      "/ref/girl2.jpeg",
      "/ref/girl4.jpeg",
      "/ref/girl5.jpeg",
      "/ref/girl7.jpeg",
      "/ref/girl8.jpeg",
      "/ref/girl10.jpeg",
      "/ref/girl9.jpeg"
    ]
  },

  // Section 5: WebGL 3D Floating Memory Universe (Personalized for POOJA)
  universe: [
    { id: "1", imageUrl: "/ref/heart.jpeg", alt: "Special Heart", title: "Special Heart" },
    { id: "2", imageUrl: "/ref/girl.jpeg", alt: "POOJA", title: "POOJA · Gorgeous" },
    { id: "3", imageUrl: "/ref/girl2.jpeg", alt: "Angel", title: "Angel" },
    { id: "4", imageUrl: "/ref/girl3.jpeg", alt: "Dream Girl", title: "Dream Girl" },
    { id: "5", imageUrl: "/ref/girl4.jpeg", alt: "Sweetheart", title: "Sweetheart" },
    { id: "6", imageUrl: "/ref/girl5.jpeg", alt: "My Queen", title: "My Queen" },
    { id: "7", imageUrl: "/ref/girl6.jpeg", alt: "Stunner", title: "Stunner" },
    { id: "8", imageUrl: "/ref/girl7.jpeg", alt: "My Happiness", title: "My Happiness" },
    { id: "9", imageUrl: "/ref/girl8.jpeg", alt: "Darling", title: "Darling" },
    { id: "10", imageUrl: "/ref/girl9.jpeg", alt: "Sunshine", title: "Sunshine" },
    { id: "11", imageUrl: "/ref/girl10.jpeg", alt: "Special One", title: "Special One" },
    { id: "12", imageUrl: "/ref/girl11.jpeg", alt: "Forever Mine", title: "Forever Mine" }
  ] as UniverseAsset[],

  // Section 6 & Standalone /last.html: iMessage Phone Interface
  iMessage: {
    profilePicture: "/ref/girl3.jpeg",
    recipientName: "POOJA ❤️",
    statusText: "iMessage · online now"
  }
};
