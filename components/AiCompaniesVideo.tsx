import React from "react";

import { VideoText } from "./ui/video-text";
import { Highlighter } from "./ui/highlighter";

const AiCompaniesVideo = () => {
  return (
    <div className="mt-10 flex min-h-[80vh] flex-col items-center self-center text-center md:mt-20">
      <div className="w-full aspect-[16/7] sm:aspect-[3/1]">
        <VideoText
          src="/testingvideo.mp4"
          className="h-full w-full"
          preload="metadata"
          // fontSize={24}
          fontWeight="1000"
          fontFamily="helvetica"
        >
          Only 5%
        </VideoText>
      </div>

      <div className="flex flex-col items-center self-center px-4 md:w-2/3 md:px-0">
        <p className="pb-5 text-2xl font-semibold sm:text-3xl md:pb-8 md:text-5xl">
          of companies are AI future-built
        </p>

        <p className="space-y-3 text-base leading-relaxed opacity-70 sm:text-lg md:text-2xl">
          Yet these leaders achieve{" "}
          <Highlighter action="box" color="#009ACA" isView>
            5× higher revenue growth
          </Highlighter>{" "}
          and
          <Highlighter action="underline" color="#00CACA" isView>
            3× greater cost reductions
          </Highlighter>{" "}
          than their peers.
        </p>
      </div>
    </div>
  );
};

export default AiCompaniesVideo;
