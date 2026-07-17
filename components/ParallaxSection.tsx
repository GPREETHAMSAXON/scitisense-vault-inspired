"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  children:   React.ReactNode;
  speed?:     number;
  className?: string;
  style?:     React.CSSProperties;
}

export default function ParallaxSection({
  children,
  speed = 0.3,
  className,
  style,
}: ParallaxSectionProps) {
  const noMotion = useReducedMotion() === true;

  // Disable on touch/pointer-coarse devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const ref   = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Defer useScroll target until the ref is confirmed populated client-side.
  // Passing undefined avoids the "ref not hydrated" error during SSR.
  useEffect(() => {
    if (ref.current) setReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ready ? ref : undefined,
    offset: ["start end", "end start"],
  });

  const range = speed * 30;
  const y = useTransform(scrollYProgress, [0, 1], [`${range}px`, `${-range}px`]);

  const skip = noMotion || isTouch;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y:          skip ? 0 : y,
        willChange: skip ? "auto" : "transform",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
