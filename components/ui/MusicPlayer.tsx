/* =============================================================
 * MusicPlayer Component — The Stronger Life
 *
 * Jukebox-style player: audio controls on the left/top, scrollable
 * track list on the right/bottom. Fixed height so adding new songs
 * never grows the widget. Clicking a track loads and auto-plays it.
 * Auto-advances to the next track when the current one ends.
 *
 * Track data is sourced from lib/config.ts → musicTracks[].
 * To add a new song, add an entry there — no changes needed here.
 * ============================================================= */

"use client";

import { useState, useRef, useEffect } from "react";
import AudioPlayer from "@/components/ui/AudioPlayer";
import { musicTracks } from "@/lib/config";

export default function MusicPlayer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const activeItemRef = useRef<HTMLLIElement>(null);

  const track = musicTracks[selectedIndex];

  const selectTrack = (index: number) => {
    if (index === selectedIndex) return;
    setAutoPlay(true);
    setSelectedIndex(index);
  };

  // Auto-advance to next track (loops back to first after the last)
  const handleTrackEnded = () => {
    const next = (selectedIndex + 1) % musicTracks.length;
    setAutoPlay(true);
    setSelectedIndex(next);
  };

  // Scroll the active track into view whenever the selection changes
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedIndex]);

  return (
    <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden">

      {/* ── Top / Left: Audio Player ── */}
      <div className="flex-1 bg-brand-navy min-w-0">
        <AudioPlayer
          key={track.url}
          url={track.url}
          title={track.title}
          subtitle={track.subtitle}
          autoPlay={autoPlay}
          onEnded={handleTrackEnded}
        />
      </div>

      {/* ── Bottom / Right: Track List ── */}
      <div className="bg-brand-navy border-t md:border-t-0 md:border-l border-white/10 md:w-60 shrink-0 flex flex-col">

        {/* Header — never scrolls */}
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest px-6 pt-4 pb-2 shrink-0">
          Songs
        </p>

        {/* Scrollable list — 2 tracks visible, same on mobile and desktop */}
        <ul
          className="track-scroll overflow-y-auto max-h-[100px] px-2 pb-2 space-y-0.5"
          style={{ WebkitOverflowScrolling: "touch" }}
          role="list"
          aria-label="Track list"
        >
          {musicTracks.map((t, i) => {
            const isActive = i === selectedIndex;
            return (
              <li key={t.url} ref={isActive ? activeItemRef : null}>
                <button
                  onClick={() => selectTrack(i)}
                  className={`w-full text-left px-3 rounded-lg flex items-center gap-3
                              min-h-[44px] transition-colors duration-150
                              ${isActive
                                ? "bg-brand-gold/20"
                                : "hover:bg-white/5 active:bg-white/10"
                              }`}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Play ${t.title}`}
                >
                  {/* Track number / playing indicator */}
                  <span className="shrink-0 w-5 h-5 flex items-center justify-center">
                    {isActive ? (
                      <svg
                        className="w-3.5 h-3.5 text-brand-gold"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <span className="text-white/30 text-xs font-mono leading-none">
                        {i + 1}
                      </span>
                    )}
                  </span>

                  {/* Title & subtitle */}
                  <div className="min-w-0 py-2">
                    <p className={`text-sm font-medium leading-snug truncate
                                   ${isActive ? "text-white" : "text-white/60"}`}>
                      {t.title}
                    </p>
                    {t.subtitle && (
                      <p className="text-xs text-white/35 truncate mt-0.5">
                        {t.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}
