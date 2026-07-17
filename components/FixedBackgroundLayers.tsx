"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function FixedBackgroundLayers() {
  const noMotion = useReducedMotion() === true;
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const { scrollY } = useScroll();

  // Layer 1 — large butterscotch blob, top-right, very slow drift
  const y1 = useTransform(scrollY, [0, 3000], ["0px", "-75px"]);
  // Layer 2 — navy blob, left, medium drift
  const y2 = useTransform(scrollY, [0, 3000], ["0px", "-150px"]);
  // Layer 3 — small butterscotch circle, right-mid, faster drift
  const y3 = useTransform(scrollY, [0, 3000], ["0px", "-225px"]);

  if (noMotion || isTouch) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        -1,
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >
      {/* Layer 1 — butterscotch blob, top-right, 1.5% opacity */}
      <motion.div
        style={{
          position: "absolute",
          top:      "10%",
          right:    "-200px",
          width:    "800px",
          height:   "800px",
          y:        y1,
          background:   "radial-gradient(circle, rgba(0,229,192,0.015) 0%, transparent 65%)",
          borderRadius: "50%",
          filter:       "blur(60px)",
        }}
      />

      {/* Layer 2 — navy blob, left, 2% opacity */}
      <motion.div
        style={{
          position: "absolute",
          top:      "60%",
          left:     "-150px",
          width:    "600px",
          height:   "600px",
          y:        y2,
          background:   "radial-gradient(circle, rgba(0,229,192,0.02) 0%, transparent 65%)",
          borderRadius: "50%",
          filter:       "blur(50px)",
        }}
      />

      {/* Layer 3 — small butterscotch circle, right-mid, 2.5% opacity */}
      <motion.div
        style={{
          position: "absolute",
          top:      "40%",
          right:    "10%",
          width:    "200px",
          height:   "200px",
          y:        y3,
          background:   "radial-gradient(circle, rgba(0,229,192,0.025) 0%, transparent 65%)",
          borderRadius: "50%",
          filter:       "blur(30px)",
        }}
      />
    </div>
  );
}
