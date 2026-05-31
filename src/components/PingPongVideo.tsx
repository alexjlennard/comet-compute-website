"use client";

import { useEffect, useRef } from "react";

interface PingPongVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * Plays a video forward to the end, then scrubs it backward to the start,
 * looping as a "boomerang". Negative playbackRate is unreliable across
 * browsers, so the reverse pass is driven manually with requestAnimationFrame.
 */
export default function PingPongVideo({ src, poster, className }: PingPongVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let direction: "forward" | "reverse" = "forward";
    let raf = 0;
    let lastTs = 0;

    const startForward = () => {
      direction = "forward";
      const p = video.play();
      if (p) p.catch(() => {});
    };

    const startReverse = () => {
      direction = "reverse";
      video.pause();
      lastTs = 0;
      raf = requestAnimationFrame(stepBackward);
    };

    const stepBackward = (ts: number) => {
      if (direction !== "reverse") return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const next = video.currentTime - dt;
      if (next <= 0) {
        video.currentTime = 0;
        startForward();
        return;
      }
      video.currentTime = next;
      raf = requestAnimationFrame(stepBackward);
    };

    // When the forward pass reaches the end, flip to reverse.
    const onEnded = () => startReverse();
    // Safety: some browsers don't fire 'ended' precisely; catch near-end too.
    const onTimeUpdate = () => {
      if (
        direction === "forward" &&
        video.duration &&
        video.currentTime >= video.duration - 0.05
      ) {
        startReverse();
      }
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);

    if (video.readyState >= 2) startForward();
    else video.addEventListener("loadeddata", startForward, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      playsInline
      autoPlay
      poster={poster}
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
