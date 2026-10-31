'use client';

import './scrapbook.css';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { imageAssets } from '@/config/assets.config';

const bgLayouts = [
  { top: "10%", left: "8%", size: 130, rotate: -12, delay: 0.2 },
  { top: "18%", left: "82%", size: 140, rotate: 14, delay: 0.4 },
  { top: "72%", left: "10%", size: 150, rotate: 8, delay: 0.6 },
  { top: "75%", left: "84%", size: 135, rotate: -15, delay: 0.8 },
  { top: "45%", left: "4%", size: 120, rotate: -6, delay: 0.3 },
  { top: "42%", left: "88%", size: 145, rotate: 10, delay: 0.5 },
  { top: "5%", left: "45%", size: 110, rotate: -8, delay: 0.7 },
  { top: "85%", left: "48%", size: 125, rotate: 12, delay: 0.9 }
];

export default function ScrapbookFlip() {
  const bookRef = useRef(null);
  const pageFlipInstance = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { covers, backgroundPages, photos, ambientFloatingPhotos } = imageAssets.scrapbook;

  useEffect(() => {
    let isMounted = true;

    async function initPageFlip() {
      if (!bookRef.current) return;
      try {
        const { PageFlip } = await import('page-flip');
        if (!isMounted || !bookRef.current) return;

        const isMobile = window.innerWidth < 960;
        const pageWidth = isMobile ? Math.min(340, Math.max(280, window.innerWidth - 40)) : 440;
        const pageHeight = isMobile ? Math.round(pageWidth * 1.25) : 520;

        // Ensure page elements match target dimensions
        bookRef.current.querySelectorAll('.book-page').forEach((p) => {
          p.style.width = `${pageWidth}px`;
          p.style.height = `${pageHeight}px`;
        });

        const flip = new PageFlip(bookRef.current, {
          width: pageWidth,
          height: pageHeight,
          size: "fixed",
          minWidth: 280,
          maxWidth: 480,
          minHeight: 350,
          maxHeight: 560,
          showCover: true,
          drawShadow: true,
          maxShadowOpacity: 0.5,
          usePortrait: isMobile,
          startPage: 0,
          clickEventForward: true,
          mobileScrollSupport: false
        });

        flip.loadFromHTML(bookRef.current.querySelectorAll('.book-page'));
        pageFlipInstance.current = flip;

        flip.on('flip', (e) => {
          setCurrentPage(e.data);
        });
      } catch (err) {
        console.warn('PageFlip initialization error:', err);
      }
    }

    // Lazy-initialize only when the section scrolls into view (saves ~80ms of init work at page load)
    const sectionEl = bookRef.current?.closest('section') || bookRef.current;
    if (!sectionEl) {
      initPageFlip();
    } else {
      const initObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !pageFlipInstance.current && isMounted) {
            initPageFlip();
            initObserver.disconnect();
          }
        },
        { rootMargin: '300px' }
      );
      initObserver.observe(sectionEl);
    }

    return () => {
      isMounted = false;
      if (pageFlipInstance.current) {
        try {
          pageFlipInstance.current.destroy();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0e0b09] select-none py-10">
      {/* Background ambient lighting */}
      <div className="stage__spotlight" />
      <div className="stage__vignette" />
      <div className="stage__grain" />

      {/* Floating background photo traces */}
      {ambientFloatingPhotos.map((src, idx) => {
        const layout = bgLayouts[idx % bgLayouts.length];
        return (
          <div
            key={idx}
            className="bg-photo pointer-events-none hidden md:block"
            style={{
              top: layout.top,
              left: layout.left,
              width: layout.size,
              height: layout.size,
              '--rot': `${layout.rotate}deg`,
              '--delay': `${layout.delay}s`
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}

      {/* Main Flipbook */}
      <div className="stage__book relative z-20 flex flex-col items-center">
        <div className="stage__book-shadow" />

        <div ref={bookRef} className="book-container shadow-2xl">
          {/* Page 0: Cover */}
          <div
            className="book-page bg-[#1a237e] text-white overflow-hidden relative"
            data-density="hard"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={covers.front}
              alt="Front Cover"
              fill
              priority
              draggable={false}
              className="object-contain scale-110 pointer-events-none select-none"
            />
          </div>

          {/* Page 1: Left */}
          <div
            className="book-page bg-amber-50 text-black overflow-hidden relative"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={backgroundPages.left}
              alt="Left Background"
              fill
              draggable={false}
              className="object-contain pointer-events-none select-none"
            />
            <Image
              src="/elements/fwine.png"
              alt="Wine"
              fill
              draggable={false}
              className="object-contain -rotate-12 -translate-x-28 -translate-y-28 scale-50"
            />
            <Image
              src="/elements/side3.png"
              alt="Decoration"
              fill
              draggable={false}
              className="object-contain -translate-x-18 -translate-y-10 scale-85"
            />
            <Image
              src="/elements/butter.png"
              alt="Butterfly"
              fill
              draggable={false}
              className="object-contain scale-45 rotate-30 -translate-x-24 translate-y-28"
            />
            <Image
              src={photos.page1}
              alt="Photo"
              fill
              draggable={false}
              className="object-contain scale-35 rotate-10 translate-x-12 -translate-y-18"
            />
            <Image
              src="/elements/frame10.png"
              alt="Frame"
              fill
              draggable={false}
              className="object-contain scale-70 rotate-10 translate-x-12 -translate-y-16"
            />
            <Image
              src="/elements/mouse.png"
              alt="Mouse"
              fill
              draggable={false}
              className="object-contain z-50 translate-x-16 translate-y-36 scale-60"
            />
            <Image
              src="/elements/text1.png"
              alt="Text Note"
              fill
              draggable={false}
              className="object-contain scale-50 translate-x-8 translate-y-12"
            />
          </div>

          {/* Page 2: Right */}
          <div
            className="book-page bg-amber-50 text-black overflow-hidden relative"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={backgroundPages.right}
              alt="Right Background"
              fill
              draggable={false}
              className="object-contain pointer-events-none select-none"
            />
            <Image
              src="/elements/paper.png"
              alt="Paper"
              fill
              draggable={false}
              className="object-contain rotate-90 translate-x-14 translate-y-32 scale-55"
            />
            <Image
              src="/elements/starB.png"
              alt="Star"
              fill
              draggable={false}
              className="object-contain -rotate-45 -translate-x-14 translate-y-24 scale-50"
            />
            <Image
              src={photos.page2A}
              alt="Photo 1"
              fill
              draggable={false}
              className="object-contain rotate-15 translate-x-16 -translate-y-18 scale-26"
            />
            <Image
              src={photos.page2B}
              alt="Photo 2"
              fill
              draggable={false}
              className="object-contain rotate-15 translate-x-22 -translate-y-36 scale-26"
            />
            <Image
              src={photos.page2C}
              alt="Photo 3"
              fill
              draggable={false}
              className="object-contain rotate-15 translate-x-8 translate-y-4 scale-26"
            />
            <Image
              src="/elements/frame9.png"
              alt="Frame"
              fill
              draggable={false}
              className="object-contain rotate-12 translate-x-14 -translate-y-16 scale-85"
            />
            <Image
              src="/elements/text2.png"
              alt="Text 2"
              fill
              draggable={false}
              className="object-contain -translate-x-10 -translate-y-34 scale-65"
            />
            <Image
              src="/elements/kit.png"
              alt="Sticker"
              fill
              draggable={false}
              className="object-contain -translate-x-10 -translate-y-12 scale-65"
            />
          </div>

          {/* Page 3: Left */}
          <div
            className="book-page bg-amber-50 text-black overflow-hidden relative"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={backgroundPages.left}
              alt="Left Background"
              fill
              draggable={false}
              className="object-contain pointer-events-none select-none"
            />
            <Image
              src="/elements/billa6.png"
              alt="Cat Sticker"
              fill
              draggable={false}
              className="object-contain scale-60 rotate-2 -translate-x-24 -translate-y-8"
            />
            <Image
              src="/elements/side1.png"
              alt="Side Ribbon"
              fill
              draggable={false}
              className="object-contain scale-55 rotate-180 -translate-x-20 translate-y-26"
            />
            <Image
              src="/elements/starem.png"
              alt="Star Sparkle"
              fill
              draggable={false}
              className="object-contain scale-20 -rotate-18 translate-x-14 -translate-y-48 z-20"
            />
            <Image
              src={photos.page3}
              alt="Photo"
              fill
              draggable={false}
              className="object-contain scale-36 rotate-16 translate-x-10 -translate-y-18 z-30"
            />
            <Image
              src="/elements/frame11.png"
              alt="Frame"
              fill
              draggable={false}
              className="object-contain scale-80 rotate-16 translate-x-8 -translate-y-8 z-30"
            />
            <Image
              src="/elements/moon.png"
              alt="Moon"
              fill
              draggable={false}
              className="object-contain scale-38 -rotate-14 -translate-x-16 translate-y-26 z-40"
            />
            <Image
              src="/elements/fits.png"
              alt="Badge"
              fill
              draggable={false}
              className="object-contain scale-48 -rotate-14 -translate-x-24 -translate-y-42 z-40"
            />
            <Image
              src="/elements/note1.png"
              alt="Note"
              fill
              draggable={false}
              className="object-contain scale-70 -rotate-6 z-50 translate-x-10 translate-y-32"
            />
            <Image
              src="/elements/lovetape.png"
              alt="Washi Tape"
              fill
              draggable={false}
              className="object-contain scale-22 z-50 translate-x-8 translate-y-20"
            />
          </div>

          {/* Page 4: Right */}
          <div
            className="book-page bg-amber-50 text-black overflow-hidden relative"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={backgroundPages.right}
              alt="Right Background"
              fill
              draggable={false}
              className="object-contain pointer-events-none select-none"
            />
            <Image
              src="/elements/side2.png"
              alt="Side Decor"
              fill
              draggable={false}
              className="object-contain scale-72 z-40 translate-x-14 translate-y-20"
            />
            <Image
              src="/elements/billa.png"
              alt="Cat"
              fill
              draggable={false}
              className="object-contain scale-42 z-40 -translate-x-12 -translate-y-24"
            />
            <Image
              src="/elements/boqey.png"
              alt="Bouquet"
              fill
              draggable={false}
              className="object-contain scale-50 z-40 -translate-x-12 translate-y-24"
            />
            <Image
              src={photos.page4}
              alt="Photo"
              fill
              draggable={false}
              className="object-contain scale-36 z-40 translate-x-16 -translate-y-26"
            />
            <Image
              src="/frames/frame5.png"
              alt="Frame"
              fill
              draggable={false}
              className="object-contain scale-72 z-40 translate-x-14 -translate-y-24"
            />
            <Image
              src="/elements/miss.png"
              alt="Miss You"
              fill
              draggable={false}
              className="object-contain scale-52 rotate-16 z-50 translate-x-22 translate-y-2"
            />
          </div>

          {/* Page 5: Left */}
          <div
            className="book-page bg-amber-50 text-black overflow-hidden relative"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={backgroundPages.left}
              alt="Left Background"
              fill
              draggable={false}
              className="object-contain pointer-events-none select-none"
            />
            <Image
              src="/elements/side4.png"
              alt="Side Decor"
              fill
              draggable={false}
              className="object-contain scale-72 z-40 -translate-x-18 translate-y-20"
            />
            <Image
              src="/elements/disk.png"
              alt="Vinyl Disk"
              fill
              draggable={false}
              className="object-contain scale-70 z-40 -translate-x-42 -translate-y-12"
            />
            <Image
              src="/elements/billa5.png"
              alt="Cat"
              fill
              draggable={false}
              className="object-contain scale-70 z-40 translate-x-16 translate-y-28"
            />
            <Image
              src={photos.page5A}
              alt="Photo 1"
              fill
              draggable={false}
              className="object-contain scale-28 -rotate-10 z-40 translate-x-4 -translate-y-10"
            />
            <Image
              src={photos.page5B}
              alt="Photo 2"
              fill
              draggable={false}
              className="object-contain scale-28 rotate-10 z-40 translate-x-14 -translate-y-34"
            />
            <Image
              src="/elements/frame8.png"
              alt="Frame"
              fill
              draggable={false}
              className="object-contain scale-72 z-40 translate-x-8 -translate-y-22"
            />
            <Image
              src="/elements/twoStar.png"
              alt="Two Stars"
              fill
              draggable={false}
              className="object-contain scale-42 z-50 -translate-x-12 translate-y-16"
            />
            <Image
              src="/elements/text3.png"
              alt="Text Note"
              fill
              draggable={false}
              className="object-contain scale-52 z-50 -translate-x-18 -translate-y-42"
            />
          </div>

          {/* Page 6: Right */}
          <div
            className="book-page bg-amber-50 text-black overflow-hidden relative"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={backgroundPages.right}
              alt="Right Background"
              fill
              draggable={false}
              className="object-contain pointer-events-none select-none"
            />
            <Image
              src="/elements/side5.png"
              alt="Side Decor"
              fill
              draggable={false}
              className="object-contain scale-80 z-40 translate-x-18 translate-y-12"
            />
            <Image
              src="/elements/text4.png"
              alt="Text 4"
              fill
              draggable={false}
              className="object-contain scale-62 z-40 -translate-x-4 -translate-y-36"
            />
            <Image
              src={photos.page6A}
              alt="Photo 1"
              fill
              draggable={false}
              className="object-contain scale-30 -rotate-4 z-40 -translate-x-14 -translate-y-14"
            />
            <Image
              src={photos.page6B}
              alt="Photo 2"
              fill
              draggable={false}
              className="object-contain scale-29 rotate-10 z-40 -translate-x-8 translate-y-10"
            />
            <Image
              src="/elements/frame7.png"
              alt="Frame"
              fill
              draggable={false}
              className="object-contain scale-72 z-40 -translate-x-10 translate-y-1"
            />
            <Image
              src="/elements/billa4.png"
              alt="Cat"
              fill
              draggable={false}
              className="object-contain scale-62 z-50 -translate-x-14 translate-y-34"
            />
          </div>

          {/* Page 7: Back Cover */}
          <div
            className="book-page bg-[#1a237e] text-white overflow-hidden relative"
            data-density="hard"
            style={{ width: 440, height: 520 }}
          >
            <Image
              src={covers.back}
              alt="Back Cover"
              fill
              draggable={false}
              className="object-contain scale-110 pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Flipping hints & controls */}
        <div className="mt-8 flex items-center gap-6 z-30">
          <button
            onClick={() => {
              if (pageFlipInstance.current?.getState?.() !== 'flipping') {
                pageFlipInstance.current?.flipPrev();
              }
            }}
            className="px-4 py-2 rounded-full border border-amber-500/30 text-amber-300 text-sm hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            ← Previous Page
          </button>
          <span className="text-amber-200/60 font-mono text-xs">
            Drag or click corners to flip pages
          </span>
          <button
            onClick={() => {
              if (pageFlipInstance.current?.getState?.() !== 'flipping') {
                pageFlipInstance.current?.flipNext();
              }
            }}
            className="px-4 py-2 rounded-full border border-amber-500/30 text-amber-300 text-sm hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            Next Page →
          </button>
        </div>
      </div>

      </div>
  );
}
