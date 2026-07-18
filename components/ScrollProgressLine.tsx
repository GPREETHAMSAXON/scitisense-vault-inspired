"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from "motion/react";

const DOTS = [
  { pct: 0.12, label: "Home" },
  { pct: 0.30, label: "Services" },
  { pct: 0.52, label: "Capabilities" },
  { pct: 0.72, label: "Results" },
  { pct: 0.90, label: "Get Started" },
];

export default function ScrollProgressLine() {
  const noMotion                         = useReducedMotion() === true;
  const [isMounted, setIsMounted]        = useState(false);
  const { scrollYProgress }              = useScroll();
  const scaleY                           = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [scrollPct, setScrollPct]        = useState(0);
  const [hoveredDot, setHoveredDot]      = useState<number | null>(null);

  useEffect(() => setIsMounted(true), []);
  useMotionValueEvent(scrollYProgress, "change", (v) => setScrollPct(v));

  // Fixed overlay — skip SSR entirely to avoid spring/scroll hook hydration issues.
  if (!isMounted || noMotion) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:   "fixed",
        left:       0,
        top:        0,
        width:      "3px",
        height:     "100vh",
        zIndex:     50,
        pointerEvents: "none",
      }}
      // Hide on narrow viewports via inline media check — we use a client-side class instead
      className="hidden md:block"
    >
      {/* Track */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "rgba(48,54,61,0.5)",
        }}
      />

      {/* Fill bar */}
      <motion.div
        style={{
          position:        "absolute",
          top:             0,
          left:            0,
          width:           "100%",
          height:          "100%",
          background:      "linear-gradient(to bottom, #A371F7, #00E5C0)",
          scaleY,
          transformOrigin: "top",
          boxShadow:       "2px 0 12px rgba(163,113,247,0.4)",
          willChange:      "transform",
        }}
      />

      {/* Trailing glow at the tip of the fill */}
      <motion.div
        aria-hidden="true"
        style={{
          position:     "absolute",
          left:         "50%",
          top:          `${scrollPct * 100}%`,
          transform:    "translate(-50%, -50%)",
          width:        "6px",
          height:       "6px",
          borderRadius: "50%",
          background:   "#A371F7",
          boxShadow:    "0 0 8px rgba(163,113,247,0.8)",
          willChange:   "top",
        }}
      />

      {/* Section dots */}
      {DOTS.map((dot, i) => {
        const active  = scrollPct >= dot.pct - 0.05;
        const hovered = hoveredDot === i;

        return (
          <div
            key={i}
            style={{
              position:    "absolute",
              left:        "50%",
              top:         `${dot.pct * 100}%`,
              transform:   "translate(-50%, -50%)",
              pointerEvents: "auto",
              cursor:      "default",
            }}
            onMouseEnter={() => setHoveredDot(i)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            {/* Dot */}
            <motion.div
              animate={{
                width:     active ? "10px" : "6px",
                height:    active ? "10px" : "6px",
                boxShadow: active ? "0 0 8px 2px rgba(0,229,192,0.7)" : "none",
                backgroundColor: active ? "#00E5C0" : "rgba(0,229,192,0.35)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: "50%",
                transform:    "translate(-50%, -50%)",
                position:     "absolute",
              }}
            />

            {/* Tooltip */}
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.15 }}
                style={{
                  position:        "absolute",
                  left:            "16px",
                  top:             "50%",
                  transform:       "translateY(-50%)",
                  background:      "rgba(15,15,15,0.92)",
                  color:           "#FFFFFF",
                  fontSize:        "11px",
                  fontWeight:      500,
                  padding:         "4px 8px",
                  borderRadius:    "4px",
                  whiteSpace:      "nowrap",
                  backdropFilter:  "blur(8px)",
                  border:          "1px solid rgba(0,229,192,0.2)",
                  pointerEvents:   "none",
                }}
              >
                {dot.label}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
