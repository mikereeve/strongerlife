/* =============================================================
 * PhotoGallery Component — The Stronger Life
 *
 * Masonry grid of couple photos with hover overlay and
 * a CSS-only lightbox for full-size viewing. No external
 * dependencies — uses native <dialog> element.
 *
 * Props:
 *   photos — Array of { src, alt, label, width, height } objects.
 *            Width/height are source pixel dimensions used by
 *            Next.js Image to compute aspect ratio and prevent
 *            layout shift. The masonry grid displays images at
 *            their natural aspect ratio via h-auto.
 * ============================================================= */

"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

/* Scale source dimensions to a target width, preserving aspect ratio */
function scaledSize(photo: Photo, targetWidth: number) {
  const ratio = targetWidth / photo.width;
  return { width: targetWidth, height: Math.round(photo.height * ratio) };
}

const GRID_WIDTH = 600;
const LIGHTBOX_WIDTH = 1200;

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : photos.length - 1));
  }, [photos.length]);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : 0));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, close, prev, next]);

  if (!photos.length) return null;

  return (
    <>
      {/* ========== MASONRY GRID ========== */}
      <div className="masonry-grid">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            onClick={() => setSelectedIndex(index)}
            className="masonry-item group relative block w-full overflow-hidden
                       rounded-xl cursor-pointer border-0 p-0 bg-transparent"
            aria-label={`View ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={scaledSize(photo, GRID_WIDTH).width}
              height={scaledSize(photo, GRID_WIDTH).height}
              className="w-full h-auto rounded-xl transition-transform duration-500
                         group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Hover overlay with label */}
            <div
              className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/50
                         transition-all duration-300 rounded-xl flex items-end"
            >
              <p
                className="text-white text-sm font-medium px-4 py-3 w-full
                           opacity-0 group-hover:opacity-100 translate-y-2
                           group-hover:translate-y-0 transition-all duration-300"
              >
                {photo.label}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ========== LIGHTBOX ========== */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/80 hover:text-white
                       text-3xl leading-none p-2 z-10"
            aria-label="Close lightbox"
          >
            &times;
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60
                       hover:text-white text-4xl p-2 z-10"
            aria-label="Previous photo"
          >
            &#8249;
          </button>

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={photos[selectedIndex].src}
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt}
              width={scaledSize(photos[selectedIndex], LIGHTBOX_WIDTH).width}
              height={scaledSize(photos[selectedIndex], LIGHTBOX_WIDTH).height}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
              sizes="100vw"
              priority
            />
            <p className="text-white/80 text-center text-sm mt-3">
              {photos[selectedIndex].label}
            </p>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60
                       hover:text-white text-4xl p-2 z-10"
            aria-label="Next photo"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
