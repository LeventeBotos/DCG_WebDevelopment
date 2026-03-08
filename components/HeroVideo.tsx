"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

type ConnectionWithSaveData = {
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

const Hero = () => {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const connection = (navigator as Navigator & {
      connection?: ConnectionWithSaveData;
    }).connection;

    const updatePlaybackPreference = () => {
      setCanPlayVideo(
        mediaQuery.matches &&
          !reducedMotionQuery.matches &&
          !connection?.saveData
      );
    };

    updatePlaybackPreference();

    mediaQuery.addEventListener("change", updatePlaybackPreference);
    reducedMotionQuery.addEventListener("change", updatePlaybackPreference);
    connection?.addEventListener?.("change", updatePlaybackPreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePlaybackPreference);
      reducedMotionQuery.removeEventListener("change", updatePlaybackPreference);
      connection?.removeEventListener?.("change", updatePlaybackPreference);
    };
  }, []);

  return (
    <section className="relative h-[100svh] md:min-h-screen flex text-white flex-col items-center w-full justify-center overflow-hidden ">
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
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="">Transform ambition into</span>
            <br />
            <span className="bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen bg-clip-text text-transparent">
              AI-driven impact
            </span>
          </h1>

          <p className="md:text-lg px-4 text-sm opacity-75 max-w-2xl  leading-relaxed">
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
        <motion.div
          className="pt-8 w-full bottom-2 md:bottom-4 absolute flex flex-col md:items-start items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <p className="text-xs md:text-sm text-gray-500 mb-4">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap w-full items-center justify-center lg:justify-start gap-2 md:gap-6">
            {[
              "https://1000logos.net/wp-content/uploads/2016/10/BP-Logo.png",
              "https://www.pngplay.com/wp-content/uploads/3/Royal-Dutch-Shell-Logo-PNG-HD-Quality.png",
              "https://1000logos.net/wp-content/uploads/2016/10/British-Airways-Logo.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
            ].map((client, index) => (
              <motion.img
                key={client}
                className="px-4 py-2 h-8 md:h-14 object-contain opacity-75 grayscale"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                src={client}
                alt=""
                loading="lazy"
                decoding="async"
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              ></motion.img>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
