"use client";

import { useEffect, useState } from "react";

type ConnectionWithSaveData = {
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

export default function HeroBackgroundVideo() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: ConnectionWithSaveData;
      }
    ).connection;

    const updatePlaybackPreference = () => {
      setCanPlayVideo(
        mediaQuery.matches &&
          !reducedMotionQuery.matches &&
          !connection?.saveData,
      );
    };

    updatePlaybackPreference();

    mediaQuery.addEventListener("change", updatePlaybackPreference);
    reducedMotionQuery.addEventListener("change", updatePlaybackPreference);
    connection?.addEventListener?.("change", updatePlaybackPreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePlaybackPreference);
      reducedMotionQuery.removeEventListener(
        "change",
        updatePlaybackPreference,
      );
      connection?.removeEventListener?.("change", updatePlaybackPreference);
    };
  }, []);

  if (!canPlayVideo) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/bg_video_thumbnail.jpeg"
        aria-hidden="true"
      >
        <source src="/bg_video.webm" type="video/webm" />
        <source src="/bg_video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/85 " />
    </div>
  );
}
