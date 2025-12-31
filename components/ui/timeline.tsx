"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import {
  BackgroundRippleEffect,
  type BackgroundRippleHandle,
} from "./background-ripple-effect";
import SectionTitle from "../SectionTitle";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const CELL_SIZE = 50;

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<BackgroundRippleHandle>(null);
  const [height, setHeight] = useState(0);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(40);

  useEffect(() => {
    const updateMeasurements = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);

        // Ensure the ripple grid spans the full timeline area.
        const nextRows = Math.max(10, Math.ceil(rect.height / CELL_SIZE) + 6);
        const nextCols = Math.max(24, Math.ceil(rect.width / CELL_SIZE) + 6);
        setRows(nextRows);
        setCols(nextCols);
      }
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 35%", "end 75%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden"
      ref={containerRef}
      onMouseDownCapture={(event) =>
        rippleRef.current?.triggerAt({
          x: event.clientX,
          y: event.clientY,
        })
      }
      onMouseMoveCapture={(event) =>
        rippleRef.current?.hoverAt({
          x: event.clientX,
          y: event.clientY,
        })
      }
      onMouseLeave={() => rippleRef.current?.clearHover()}
    >
      <BackgroundRippleEffect
        ref={rippleRef}
        rows={rows}
        cols={cols}
        cellSize={CELL_SIZE}
        interactive
        className="opacity-100 [--cell-fill-color:#ffffff] [--cell-hover-color:rgba(0,0,0,0.08)] [--cell-ripple-color:rgba(0,0,0,0.16)] [--cell-border-color:rgba(0,0,0,0.16)] [--cell-shadow-color:rgba(0,0,0,0.3)] [mask-image:linear-gradient(to_left,rgba(0,0,0,1)_0%,transparent_100%)]"
      />
      <div
        ref={ref}
        className="relative z-10 mx-auto max-w-7xl px-4 pb-20 md:px-0 pointer-events-none"
      >
        <SectionTitle
          title="Five AI Agents Every Sales Leader Needs to Know"
          subtitle=" Humans and AI are beginning to work as coordinated systems.
          Specialized AI agents now connect across the revenue stack to
          orchestrate workflows, uncover opportunities, and drive customer
          adoption with precision."
          nomb={false}
          center={true}
        />
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 pointer-events-auto"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full pointer-events-auto">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white  flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200  border border-neutral-300  p-2" />
              </div>
              <h3 className="hidden md:block text-2xl md:pl-20 md:text-5xl font-bold text-neutral-500  ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full pointer-events-auto">
              <h3 className="md:hidden block text-3xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-dcg-lightBlue via-dcg-lightGreen to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
