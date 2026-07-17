"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface LightBeamProps {
  color?:     string;
  position?:  "left" | "right" | "center";
  intensity?: number;
}

export default function LightBeam({
  color     = "#00E5C0",
  position  = "center",
  intensity = 0.4,
}: LightBeamProps) {
  const noMotion                = useReducedMotion() === true;
  const [isMounted, setIsMounted] = useState(false);
  const ref                     = useRef<HTMLDivElement>(null);
  // Trigger when the 0-height boundary marker is in the middle 40% of viewport
  const inView                  = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });

  useEffect(() => setIsMounted(true), []);

  // Render nothing until client has mounted — avoids IntersectionObserver SSR issues
  if (!isMounted || noMotion) return null;

  // Bake intensity into hex alpha (padded to 2 chars for valid 8-digit CSS hex)
  const alphaHex = Math.floor(intensity * 40).toString(16).padStart(2, "0");
  const bg       = `radial-gradient(ellipse at center, ${color}${alphaHex} 0%, transparent 70%)`;

  const posStyle: React.CSSProperties =
    position === "center" ? { left: "50%", transform: "translateX(-50%)" }
    : position === "left"  ? { left: "-80px" }
    :                        { right: "-80px" };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: "relative", height: 0, overflow: "visible", pointerEvents: "none", zIndex: 1 }}
    >
      {/* Opacity wrapper — fades in/out with inView */}
      <motion.div
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top:      "-400px",
          width:    "600px",
          height:   "800px",
          ...posStyle,
        }}
      >
        {/* Pulse wrapper — continuous breathe animation */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          style={{
            width:        "100%",
            height:       "100%",
            borderRadius: "50%",
            background:   bg,
            filter:       "blur(60px)",
            willChange:   "transform",
          }}
        />
      </motion.div>
    </div>
  );
}
