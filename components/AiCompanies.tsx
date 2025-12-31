import React from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { HeroHighlight } from "./ui/hero-highlight";
import { Highlighter } from "./ui/highlighter";

const AiCompanies = () => {
  return (
    <div className="flex flex-col min-h-[80vh] justify-evenly mt-10 md:mt-20 items-center self-center text-center">
      <TextHoverEffect text="Only 5%" />

      <div className="md:w-2/3 self-center flex flex-col items-center">
        <p className="pb-6 md:pb-8 text-3xl md:text-5xl font-semibold">
          of companies are AI future-built
        </p>

        <p className="opacity-70 space-y-3 text-lg md:text-2xl leading-relaxed">
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

export default AiCompanies;
