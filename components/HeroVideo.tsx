"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { hasMediaCredits } from "@/lib/media-credits";

type ConnectionWithSaveData = {
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

const Hero = () => {
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const showCreditsLink = hasMediaCredits();
  const trustedClients = [
    {
      name: "BP",
      url: "/bp.png",
      width: 3840,
      height: 2399,
    },
    {
      name: "Shell",
      url: "/shell.png",
      width: 820,
      height: 251,
    },
    {
      name: "British Airways",
      url: "/ba.png",
      width: 3840,
      height: 2160,
    },
    {
      name: "Infosys",
      url: "/infosys.png",
      width: 1280,
      height: 512,
    },
  ];

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

  return (
    <section
      className="relative h-[100svh] md:min-h-screen flex text-white flex-col items-center w-full justify-center overflow-hidden "
      aria-labelledby="home-hero-title"
      aria-describedby="home-hero-copy"
    >
      {canPlayVideo ? (
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
      ) : null}

      {/* Static background for mobile / fallback */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 "
        style={{
          backgroundImage:
            "image-set(url('/bg_video_thumbnail_sm.jpeg') 1x, url('/bg_video_thumbnail.jpeg') 2x)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/85" />
      </div>
      <div className="h-full px-2 md:px-4 relative flex justify-center flex-col w-full">
        <div className="gap-10 flex flex-col items-center md:items-start">
          <h1
            id="home-hero-title"
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            <span className="">Transform ambition into</span>
            <br />
            <span className="bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen bg-clip-text text-transparent">
              AI-driven impact
            </span>
          </h1>

          <p
            id="home-hero-copy"
            className="md:text-lg px-4 text-sm opacity-75 max-w-2xl  leading-relaxed"
          >
            We enable organisations to achieve sustained, measurable growth
            through end-to-end digital, technology, and data solutions,
            combining strategic thinking with advanced engineering to turn
            complex transformation into scalable, real-world impact.
          </p>

          <Button asChild variant="primary" className="self-start" size="lg">
            <Link
              href="/projects"
              className="text-xs md:text-sm"
              onClick={() =>
                track("cta_click", {
                  label: "Digital, Technology & Data",
                  href: "/projects",
                  location: "home_hero",
                })
              }
            >
              Digital, Technology & Data
            </Link>
          </Button>
        </div>
        {/* Trust Indicators */}
        <div className="pt-8 w-full bottom-2 md:bottom-4 absolute flex flex-col md:items-start items-center">
          <p className="text-xs md:text-sm text-gray-500 mb-4">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap w-full items-center justify-center lg:justify-start gap-2 md:gap-6">
            {trustedClients.map((client) => (
              <Image
                key={client.name}
                className="px-4 py-2 h-8 md:h-14 object-contain opacity-75 grayscale"
                alt={client.name}
                src={client.url}
                width={client.width}
                height={client.height}
                sizes="(max-width: 768px) 120px, 180px"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        {/* {showCreditsLink ? (
          <Link
            href="/credits"
            className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-medium text-white/75 backdrop-blur transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-5 md:right-5 md:text-xs"
            onClick={() =>
              track("nav_click", {
                label: "Media Credits",
                href: "/credits",
                location: "home_hero",
              })
            }
          >
            Footage credits
          </Link>
        ) : null} */}
      </div>
    </section>
  );
};

export default Hero;
