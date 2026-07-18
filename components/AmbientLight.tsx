"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

export default function AmbientLight() {
  const noMotion = useReducedMotion() === true;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame((time) => {
    if (noMotion) return;
    x.set(Math.sin(time * 0.0003) * window.innerWidth * 0.3);
    y.set(Math.sin(time * 0.0002 + 1) * window.innerHeight * 0.3);
  });

  if (noMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,192,0.04), transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
        x,
        y,
        willChange: "transform",
      }}
    />
  );
}
