/* =============================================================
 * AudioPlayer Component — The Stronger Life
 *
 * For direct audio files (MP3, WAV, OGG), uses a native HTML5
 * <audio> element with custom brand-styled controls:
 *   - Play/Pause button
 *   - Progress bar with scrub
 *   - Elapsed / total time display
 *   - Volume control with mute toggle
 *
 * For external embeds (YouTube, SoundCloud, Vimeo), lazy-loads
 * react-player only when needed.
 *
 * Usage:
 *   <AudioPlayer url="/audio/somebody-knew.mp3" title="Somebody Knew" />
 *   <AudioPlayer url="https://youtube.com/watch?v=..." title="..." />
 * ============================================================= */

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

interface ExternalPlayerProps {
  url: string;
  playing?: boolean;
  controls?: boolean;
  light?: boolean;
  width?: number | string;
  height?: number | string;
  onError?: () => void;
  onEnded?: () => void;
}

// Lazy-load react-player only for external embeds (YouTube, Vimeo, etc.)
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as React.ComponentType<ExternalPlayerProps>;

interface AudioPlayerProps {
  /** Media URL — MP3, YouTube, SoundCloud, Vimeo, etc. */
  url: string;
  /** Display title shown above the player */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** If true, begins playback immediately on mount (requires prior user gesture) */
  autoPlay?: boolean;
  /** Called when the track finishes playing */
  onEnded?: () => void;
}

/* Detect direct audio files by extension */
function isDirectAudio(url: string): boolean {
  return /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i.test(url);
}

/* Format seconds as M:SS */
function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ url, title, subtitle, autoPlay = false, onEnded }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevVolumeRef = useRef(1);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Auto-play on mount when triggered by a user gesture (e.g. track selection)
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {}); // browser blocked autoplay; user can click play manually
    }
    // Intentionally runs only on mount — `key` prop forces remount on track change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(handleError);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, handleError]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    onEnded?.();
  }, [onEnded]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      // Some MP3s don't report duration via loadedmetadata/durationchange,
      // but it becomes available once playback starts.
      if (audioRef.current.duration && isFinite(audioRef.current.duration)) {
        setDuration((prev) => prev || audioRef.current!.duration);
      }
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current && isFinite(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleDurationChange = useCallback(() => {
    if (audioRef.current && isFinite(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      const restored = prevVolumeRef.current || 0.5;
      audioRef.current.volume = restored;
      setVolume(restored);
      setIsMuted(false);
    } else {
      prevVolumeRef.current = volume;
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  if (hasError) {
    return (
      <div className="rounded-xl bg-brand-navy/5 p-8 text-center">
        <p className="text-brand-stone text-sm">
          Unable to load media. Please try again later.
        </p>
      </div>
    );
  }

  /* --- Direct audio files: native HTML5 <audio> with full controls --- */
  if (isDirectAudio(url)) {
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const volumePercent = (isMuted ? 0 : volume) * 100;

    return (
      <div className="rounded-xl overflow-hidden">
        <div className="bg-brand-navy rounded-xl p-4 md:p-5">
          {/* Top row: play button + info + time */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="shrink-0 w-10 h-10 rounded-full bg-brand-gold
                         flex items-center justify-center
                         hover:bg-brand-gold-light transition-colors shadow-md"
              aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="min-w-0 flex-grow">
              <p className="text-white font-heading font-semibold text-base truncate">
                {title}
              </p>
              {subtitle && (
                <p className="text-white/50 text-xs truncate">{subtitle}</p>
              )}
            </div>

            {/* Time display */}
            <p className="shrink-0 text-white/60 text-xs font-mono tabular-nums">
              {formatTime(currentTime)}<span className="text-white/30 mx-1">/</span>{formatTime(duration)}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="audio-range w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #C8913A ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
              }}
              aria-label="Seek through track"
            />
          </div>

          {/* Volume control */}
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              onClick={toggleMute}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                </svg>
              ) : volume < 0.5 ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.5 12A4.5 4.5 0 0 0 16 8.97v6.06A4.48 4.48 0 0 0 18.5 12zM5 9v6h4l5 5V4L9 9H5z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.97v6.06c1.48-.73 2.5-2.25 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="audio-range w-20 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #C8913A ${volumePercent}%, rgba(255,255,255,0.15) ${volumePercent}%)`,
              }}
              aria-label="Volume"
            />
          </div>

          <audio
            ref={audioRef}
            src={url}
            preload="auto"
            onEnded={handleEnded}
            onError={handleError}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleDurationChange}
          />
        </div>
      </div>
    );
  }

  /* --- External embeds: lazy-loaded react-player --- */
  return (
    <div className="rounded-xl overflow-hidden">
      <div>
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-xl font-heading font-semibold text-brand-navy">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-brand-stone text-sm mt-1">{subtitle}</p>
            )}
          </div>
        )}
        <div className="aspect-video rounded-xl overflow-hidden bg-brand-navy/5">
          <ReactPlayer
            url={url}
            controls
            width="100%"
            height="100%"
            onError={handleError}
            light
          />
        </div>
      </div>
    </div>
  );
}
