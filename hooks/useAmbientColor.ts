"use client";
import { useEffect } from "react";

const SECTION_COLORS = [
  { id: "home",             bg: "#080808", accent: "#00E5C0" },
  { id: "services",         bg: "#080808", accent: "#00E5C0" },
  { id: "generative-ai",    bg: "#080808", accent: "#00E5C0" },
  { id: "computer-vision",  bg: "#080808", accent: "#00E5C0" },
  { id: "biomedical",       bg: "#080808", accent: "#00E5C0" },
  { id: "it-services",      bg: "#080808", accent: "#00E5C0" },
  { id: "stats",            bg: "#080808", accent: "#00E5C0" },
] as const;

export function useAmbientColor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers: IntersectionObserver[] = [];

    SECTION_COLORS.forEach(({ id, bg, accent }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            document.body.style.transition = "background-color 0.8s ease";
            document.body.style.backgroundColor = bg;
            document.documentElement.style.setProperty("--current-accent", accent);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);
}
