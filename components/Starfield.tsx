"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleDelay: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
}

const STAR_COUNT = 200;
const NEBULA_COUNT = 4;

function makeStars(width: number, height: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.5 + Math.random() * 1.5,
    baseOpacity: 0.2 + Math.random() * 0.6,
    twinkleSpeed: 2000 + Math.random() * 4000,
    twinkleDelay: Math.random() * 4000,
  }));
}

function makeNebulas(width: number, height: number): Nebula[] {
  return Array.from({ length: NEBULA_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 300 + Math.random() * 200,
  }));
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let nebulas: Nebula[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(width, height);
      nebulas = makeNebulas(width, height);
      draw(0);
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nebulas) {
        const gradient = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          n.radius
        );
        gradient.addColorStop(0, "rgba(0,229,192,0.04)");
        gradient.addColorStop(1, "rgba(0,229,192,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(
          n.x - n.radius,
          n.y - n.radius,
          n.radius * 2,
          n.radius * 2
        );
      }

      for (const star of stars) {
        const opacity = reduceMotion
          ? star.baseOpacity
          : star.baseOpacity *
            (0.5 +
              0.5 *
                Math.sin(time / star.twinkleSpeed + star.twinkleDelay));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }
    }

    function loop(time: number) {
      draw(time);
      rafId = requestAnimationFrame(loop);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    if (!reduceMotion) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
