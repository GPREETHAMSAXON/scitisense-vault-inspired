"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to all descendants matching `selector`
 * and adds the `.animate` class once each enters the viewport.
 * Pairs with the `.animate-on-scroll` CSS utility in globals.css.
 */
export function useScrollReveal<T extends HTMLElement>(selector = ".animate-on-scroll") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate");
      }),
      { threshold: 0.05 },
    );

    root.querySelectorAll(selector).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);

  return ref;
}
