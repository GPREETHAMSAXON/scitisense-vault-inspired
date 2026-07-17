"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface SectionCurtainProps {
  fromColor: string;
  toColor:   string;
  height?:   string;
}

export default function SectionCurtain({
  fromColor,
  toColor,
  height = "40vh",
}: SectionCurtainProps) {
  const noMotion             = useReducedMotion() === true;
  const ref                  = useRef<HTMLDivElement>(null);
  const [ready, setReady]    = useState(false);

  // Defer target ref until DOM is committed — avoids "ref not hydrated" during SSR.
  useEffect(() => {
    if (ref.current) setReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ready ? ref : undefined,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  if (noMotion) {
    // Just show the destination color immediately
    return <div style={{ height, background: toColor }} />;
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "relative",
        height,
        overflow: "hidden",
      }}
    >
      {/* Bottom layer — destination colour, always visible underneath */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: toColor,
        }}
      />

      {/* Top layer — slides up as the user scrolls through */}
      <motion.div
        style={{
          position:   "absolute",
          inset:      0,
          background: fromColor,
          y,
          willChange: "transform",
        }}
      />
    </div>
  );
}
