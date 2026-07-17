"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export default function CustomCursor() {
  const noMotion = useReducedMotion() === true;

  // Position motion values — dot is instant, ring has spring lag
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const ringX = useSpring(rawX, { stiffness: 100, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 100, damping: 22 });

  // Skip on touch devices (detected after mount)
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs for direct DOM style updates (no re-render)
  const dotInnerRef  = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    if (noMotion) return;

    // Hide OS cursor globally
    document.documentElement.classList.add("custom-cursor-active");

    const setDefault = () => {
      const d = dotInnerRef.current;
      const r = ringInnerRef.current;
      const t = textRef.current;
      if (!d || !r || !t) return;
      d.style.width = "7px"; d.style.height = "7px"; d.style.opacity = "1";
      r.style.width = "28px"; r.style.height = "28px";
      r.style.background = "transparent";
      r.style.borderColor = "rgba(0,229,192,0.30)";
      t.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      const target = e.target as Element;
      const isCta     = !!target.closest("[data-cursor='cta']");
      const isCard    = !isCta && !!target.closest("[data-cursor='card']");
      const isPointer = !isCta && !isCard && !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='pointer']")
      );

      const d = dotInnerRef.current;
      const r = ringInnerRef.current;
      const t = textRef.current;
      if (!d || !r || !t) return;

      if (isCta) {
        d.style.opacity = "0";
        r.style.width = "64px"; r.style.height = "64px";
        r.style.background = "rgba(0,229,192,0.07)";
        r.style.borderColor = "rgba(0,229,192,0.6)";
        t.style.opacity = "1";
      } else if (isCard) {
        d.style.width = "5px"; d.style.height = "5px"; d.style.opacity = "1";
        r.style.width = "52px"; r.style.height = "52px";
        r.style.background = "rgba(0,229,192,0.04)";
        r.style.borderColor = "rgba(0,229,192,0.35)";
        t.style.opacity = "0";
      } else if (isPointer) {
        d.style.opacity = "0";
        r.style.width = "44px"; r.style.height = "44px";
        r.style.background = "rgba(0,229,192,0.05)";
        r.style.borderColor = "rgba(0,229,192,0.6)";
        t.style.opacity = "0";
      } else {
        setDefault();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Click ripple
    const onMouseDown = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.style.cssText = [
        "position:fixed",
        `left:${e.clientX}px`,
        `top:${e.clientY}px`,
        "width:0",
        "height:0",
        "border-radius:50%",
        "background:rgba(0,229,192,0.3)",
        "transform:translate(-50%,-50%)",
        "pointer-events:none",
        "z-index:9997",
        "animation:cursor-ripple 0.4s ease-out forwards",
      ].join(";");
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 420);
    };

    window.addEventListener("mousedown", onMouseDown, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [rawX, rawY, noMotion]);

  if (!mounted || noMotion || isTouch) return null;

  return (
    <>
      {/* Dot — positioned via instant motion value */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: rawX,
          y: rawY,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <div
          ref={dotInnerRef}
          style={{
            transform:    "translate(-50%, -50%)",
            width:        "7px",
            height:       "7px",
            borderRadius: "999px",
            background:   "#00E5C0",
            transition:   "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
          }}
        />
      </motion.div>

      {/* Ring — positioned via spring motion value (lagged) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        <div
          ref={ringInnerRef}
          style={{
            transform:    "translate(-50%, -50%)",
            width:        "28px",
            height:       "28px",
            borderRadius: "999px",
            border:       "1.5px solid rgba(0,229,192,0.5)",
            background:   "rgba(0,229,192,0.06)",
            mixBlendMode: "normal",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            transition:   "width 0.3s ease, height 0.3s ease, background 0.3s ease, border-color 0.3s ease",
          }}
        >
          <span
            ref={textRef}
            style={{
              fontSize:     "0.48rem",
              fontWeight:   700,
              color:        "#00E5C0",
              letterSpacing:"0.12em",
              opacity:      0,
              transition:   "opacity 0.2s ease",
              userSelect:   "none",
              whiteSpace:   "nowrap",
            }}
          >
            EXPLORE
          </span>
        </div>
      </motion.div>
    </>
  );
}
