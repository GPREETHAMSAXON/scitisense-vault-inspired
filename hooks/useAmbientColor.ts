"use client";
import { useEffect } from "react";

const SECTION_COLORS = [
  { id: "home",             bg: "#FBF3E7", accent: "#C2761A" },
  { id: "services",         bg: "#F8F0E3", accent: "#C2761A" },
  { id: "generative-ai",    bg: "#F5F0F8", accent: "#8B5CF6" },
  { id: "computer-vision",  bg: "#EFF6FF", accent: "#3B82F6" },
  { id: "biomedical",       bg: "#F0FDF4", accent: "#10B981" },
  { id: "it-services",      bg: "#FFF7ED", accent: "#F97316" },
  { id: "stats",            bg: "#14213D", accent: "#C2761A" },
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
