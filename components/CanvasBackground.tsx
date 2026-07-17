"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  r: number; g: number; b: number;   // pre-parsed rgb channels
  opacity: number;
}

const N               = 120;
const CONNECT_DIST    = 130;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const REPEL_RADIUS    = 90;
const REPEL_STRENGTH  = 0.55;
const MAX_SPEED       = 1.2;

// Butterscotch 60%, navy 25%, amber 15%
const PALETTE: [number, number, number][] = [
  [194, 118, 26],   // butterscotch
  [194, 118, 26],
  [194, 118, 26],
  [20,  33,  61],   // navy
  [20,  33,  61],
  [224, 148, 31],   // amber
];

const BASE_BG = "linear-gradient(160deg, #FBF3E7 0%, #F0E8D8 50%, #FBF3E7 100%)";

export default function CanvasBackground({ noMotion }: { noMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (noMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];

    function initParticles() {
      particles = Array.from({ length: N }, () => {
        const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        return {
          x:       Math.random() * W,
          y:       Math.random() * H,
          vx:      (Math.random() - 0.5) * 0.5,
          vy:      (Math.random() - 0.5) * 0.5,
          radius:  Math.random() * 1.8 + 0.8,
          r, g, b,
          opacity: Math.random() * 0.45 + 0.25,
        };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
      // Re-scatter particles within new bounds
      if (particles.length > 0) {
        for (const p of particles) {
          p.x = Math.min(p.x, W);
          p.y = Math.min(p.y, H);
        }
      } else {
        initParticles();
      }
    }

    const onResize = () => {
      ctx!.resetTransform();
      resize();
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    resize();

    window.addEventListener("resize", onResize, { passive: true });
    canvas.addEventListener("mousemove", onMouse, { passive: true });
    canvas.addEventListener("mouseleave", onLeave, { passive: true });

    let rafId: number;

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update particles
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
          const d     = Math.sqrt(d2);
          const force = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        // Speed cap + damping
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges softly
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity})`;
        ctx.fill();
      }

      // Connection lines — O(n²) is fine at N=120 (7140 pairs)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b  = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST_SQ) {
            const alpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(194,118,26,${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [noMotion]);

  return (
    <>
      {/* Base gradient — always visible (before canvas paints + fallback) */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          background: BASE_BG,
          zIndex:     0,
        }}
      />

      {/* Particle canvas — skipped in reduced-motion mode */}
      {!noMotion && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset:    0,
            width:    "100%",
            height:   "100%",
            zIndex:   1,
          }}
        />
      )}
    </>
  );
}
