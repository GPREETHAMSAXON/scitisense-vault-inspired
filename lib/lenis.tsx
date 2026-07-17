"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      prevent: (node: Element) => node.hasAttribute("data-lenis-prevent"),
    });

    let animFrame: number;
    function raf(time: number) {
      lenis.raf(time);
      animFrame = requestAnimationFrame(raf);
    }
    animFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}
