"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleDelay: number;
  sparkle: boolean;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
}

const NEBULA_COLORS = ["rgba(163,113,247,0.08)", "rgba(0,229,192,0.05)", "rgba(88,166,255,0.04)"];

function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#FFFFFF";
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 2);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.2, -size * 0.2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-size * 0.2, -size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
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
    sparkle: Math.random() < 0.2,
  }));
}

function makeNebulas(width: number, height: number): Nebula[] {
  return Array.from({ length: NEBULA_COUNT }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 300 + Math.random() * 200,
    color: NEBULA_COLORS[i % NEBULA_COLORS.length],
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
    let shootingStars: ShootingStar[] = [];
    let pulsePhase = 0;
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

      nebulas.forEach((n, blobIndex) => {
        // Slow ambient pulse — each blob on its own phase
        const pulse = reduceMotion
          ? 1
          : 0.7 + Math.sin(pulsePhase + blobIndex * 1.2) * 0.3;

        const gradient = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          n.radius
        );
        const [, colorBody] = n.color.match(/rgba\(([^)]+)\)/) ?? [, "255,255,255,0.04"];
        const parts = colorBody.split(",").map((p) => p.trim());
        const baseAlpha = parseFloat(parts[3] ?? "0.04");
        gradient.addColorStop(0, `rgba(${parts[0]},${parts[1]},${parts[2]},${baseAlpha * pulse})`);
        gradient.addColorStop(1, `rgba(${parts[0]},${parts[1]},${parts[2]},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(
          n.x - n.radius,
          n.y - n.radius,
          n.radius * 2,
          n.radius * 2
        );
      });

      for (const star of stars) {
        const opacity = reduceMotion
          ? star.baseOpacity
          : star.baseOpacity *
            (0.5 +
              0.5 *
                Math.sin(time / star.twinkleSpeed + star.twinkleDelay));

        if (star.sparkle) {
          drawSparkle(ctx, star.x, star.y, star.size * 2.5, opacity);
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fill();
        }
      }

      // Shooting stars — rare, premium accent
      shootingStars = shootingStars.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const progress = s.life / s.maxLife;
        const alpha =
          progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        const tailX = s.x - s.vx * 15;
        const tailY = s.y - s.vy * 15;
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(0,229,192,${alpha * 0.8})`);
        grad.addColorStop(1, "rgba(0,229,192,0)");

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        return s.life < s.maxLife;
      });
    }

    function loop(time: number) {
      if (!reduceMotion) {
        pulsePhase += 0.002;

        if (Math.random() < 0.0008) {
          shootingStars.push({
            x: Math.random() * width,
            y: 0,
            vx: -3 - Math.random() * 2,
            vy: 2 + Math.random() * 2,
            life: 0,
            maxLife: 50,
          });
        }
      }

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
