"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

type Direction = "up" | "left" | "right" | "perspective";

interface RevealBlockProps {
  children:    React.ReactNode;
  direction?:  Direction;
  delay?:      number;
  className?:  string;
  style?:      React.CSSProperties;
}

export default function RevealBlock({
  children,
  direction = "up",
  delay = 0,
  className,
  style,
}: RevealBlockProps) {
  const noMotion = useReducedMotion() === true;

  if (noMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const base = {
    viewport:   { once: false, margin: "-60px" } as const,
    transition: { duration: 0.8, delay, ease, staggerChildren: 0.08 },
  };

  if (direction === "perspective") {
    return (
      <div style={{ perspective: "1200px", ...style }} className={className}>
        <motion.div
          initial={{ opacity: 0, rotateX: 6, y: 24, scale: 0.98, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, filter: "blur(0px)" }}
          {...base}
          style={{ transformOrigin: "50% 0%", willChange: "opacity, transform, filter" }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  const variants: Record<
    Exclude<Direction, "perspective">,
    { initial: Record<string, number | string>; animate: Record<string, number | string> }
  > = {
    up:    { initial: { opacity: 0, y: 24,  filter: "blur(6px)" }, animate: { opacity: 1, y: 0,  filter: "blur(0px)" } },
    left:  { initial: { opacity: 0, x: -30, filter: "blur(6px)" }, animate: { opacity: 1, x: 0,  filter: "blur(0px)" } },
    right: { initial: { opacity: 0, x: 30,  filter: "blur(6px)" }, animate: { opacity: 1, x: 0,  filter: "blur(0px)" } },
  };

  const v = variants[direction as Exclude<Direction, "perspective">];

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      className={className}
      style={{ willChange: "opacity, transform, filter", ...style }}
      {...base}
    >
      {children}
    </motion.div>
  );
}
