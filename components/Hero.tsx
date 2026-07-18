"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const HEADLINE_LINES = [
  { text: "At the Intersection of", gradient: false },
  { text: "Research & Technology", gradient: false },
  { text: "We Co-Innovate.", gradient: true },
];

// ─── Magnetic button hook ─────────────────────────────────────────────────────

function useMagnetic() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 24 });
  const y = useSpring(rawY, { stiffness: 320, damping: 24 });

  function onMove<T extends HTMLElement>(e: React.MouseEvent<T>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    rawY.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  }
  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { x, y, onMove, onLeave };
}

// ─── Sparkle star canvas — twinkling dots + 4-point sparkles + nebula clusters ─

interface Star {
  x: number;
  y: number;
  size: number;
  kind: "dot" | "sparkle";
  baseOpacity: number;
  phase: number;
  speed: number;
}

interface NebulaBlob {
  x: number;
  y: number;
  radius: number;
  color: string;
}

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

function SparkleCanvas({ noMotion }: { noMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let nebulas: NebulaBlob[] = [];
    let rafId = 0;

    const STAR_COUNT = 300;

    function makeStars() {
      return Array.from({ length: STAR_COUNT }, () => {
        const r = Math.random();
        const kind: Star["kind"] = r < 0.8 ? "dot" : "sparkle";
        const size =
          kind === "dot"
            ? 0.6 + Math.random() * 0.8
            : r < 0.95
            ? 2 + Math.random() * 1.5
            : 3.5 + Math.random() * 1.5;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          kind,
          baseOpacity: kind === "dot" ? 0.2 + Math.random() * 0.3 : 0.4 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0008 + Math.random() * 0.0015,
        };
      });
    }

    function makeNebulas(): NebulaBlob[] {
      const colors = ["rgba(163,113,247,0.06)", "rgba(0,229,192,0.04)", "rgba(163,113,247,0.05)"];
      return Array.from({ length: 3 }, (_, i) => ({
        x: (0.15 + Math.random() * 0.7) * width,
        y: (0.1 + Math.random() * 0.6) * height,
        radius: 300 + Math.random() * 200,
        color: colors[i % colors.length],
      }));
    }

    function resize() {
      if (!canvas || !ctx) return;
      width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      height = canvas.parentElement?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars();
      nebulas = makeNebulas();
      draw(0);
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nebulas) {
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
      }

      for (const star of stars) {
        const opacity = noMotion
          ? star.baseOpacity
          : star.baseOpacity * (0.5 + 0.5 * Math.sin(time * star.speed + star.phase));

        if (star.kind === "dot") {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fill();
        } else {
          drawSparkle(ctx, star.x, star.y, star.size, opacity);
        }
      }
    }

    function loop(time: number) {
      draw(time);
      rafId = requestAnimationFrame(loop);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    if (!noMotion) rafId = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [noMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
    />
  );
}

// ─── Floating 3D orbs — service lines ───────────────────────────────────────

interface Orb {
  id: number;
  label: string;
  glyph: string;
  gradient: string;
  shadow: string;
  glow: string;
  pos: { left: string; top: string };
  duration: number;
}

const ORBS: (Orb & { sparkles: { dx: number; dy: number; delay: number; duration: number }[] })[] = [
  {
    id: 0,
    label: "Generative AI",
    glyph: "AI",
    gradient: "radial-gradient(circle at 35% 35%, #C084FC, #7C3AED, #3B0764)",
    shadow: "0 0 40px rgba(163,113,247,0.5), inset -10px -10px 20px rgba(0,0,0,0.3)",
    glow: "rgba(163,113,247,0.20)",
    pos: { left: "18%", top: "30%" },
    duration: 3.8,
    sparkles: [
      { dx: -34, dy: -28, delay: 0, duration: 2.4 },
      { dx: 30, dy: -20, delay: 0.8, duration: 3.1 },
      { dx: -20, dy: 32, delay: 1.4, duration: 2.8 },
    ],
  },
  {
    id: 1,
    label: "Computer Vision",
    glyph: "CV",
    gradient: "radial-gradient(circle at 35% 35%, #5EEAD4, #0D9488, #042F2E)",
    shadow: "0 0 40px rgba(0,229,192,0.4), inset -10px -10px 20px rgba(0,0,0,0.3)",
    glow: "rgba(0,229,192,0.20)",
    pos: { left: "37%", top: "55%" },
    duration: 4.5,
    sparkles: [
      { dx: 36, dy: 12, delay: 0.4, duration: 3.4 },
      { dx: -30, dy: -24, delay: 1.2, duration: 2.6 },
      { dx: 18, dy: -36, delay: 2.0, duration: 3.8 },
      { dx: -36, dy: 28, delay: 0.2, duration: 2.2 },
    ],
  },
  {
    id: 2,
    label: "Biomedical",
    glyph: "BIO",
    gradient: "radial-gradient(circle at 35% 35%, #93C5FD, #2563EB, #1E3A5F)",
    shadow: "0 0 40px rgba(88,166,255,0.4), inset -10px -10px 20px rgba(0,0,0,0.3)",
    glow: "rgba(88,166,255,0.20)",
    pos: { left: "58%", top: "45%" },
    duration: 3.2,
    sparkles: [
      { dx: -32, dy: 20, delay: 0.6, duration: 2.9 },
      { dx: 28, dy: -32, delay: 1.6, duration: 3.6 },
      { dx: 34, dy: 18, delay: 0, duration: 2.3 },
    ],
  },
  {
    id: 3,
    label: "IT Services",
    glyph: "IT",
    gradient: "radial-gradient(circle at 35% 35%, #FDE68A, #D97706, #78350F)",
    shadow: "0 0 40px rgba(251,191,36,0.3), inset -10px -10px 20px rgba(0,0,0,0.3)",
    glow: "rgba(251,191,36,0.20)",
    pos: { left: "76%", top: "25%" },
    duration: 5.1,
    sparkles: [
      { dx: -30, dy: -18, delay: 1.0, duration: 3.2 },
      { dx: 32, dy: 24, delay: 0.3, duration: 2.5 },
      { dx: -18, dy: 34, delay: 1.8, duration: 3.9 },
      { dx: 36, dy: -20, delay: 0.9, duration: 2.7 },
    ],
  },
];

function FloatingOrbs({ noMotion }: { noMotion: boolean }) {
  return (
    <div
      style={{ position: "relative", width: "100%", height: "260px", marginTop: "48px" }}
      aria-hidden="true"
    >
      {ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          style={{ position: "absolute", left: orb.pos.left, top: orb.pos.top, textAlign: "center" }}
          animate={noMotion ? {} : { y: [0, -18 + orb.id * 2, 0] }}
          transition={
            noMotion
              ? {}
              : { duration: orb.duration, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {/* Ball + sparkles anchor — sparkles positioned relative to ball center */}
          <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto" }}>
            {orb.sparkles.map((s, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${s.dx}px)`,
                  top: `calc(50% + ${s.dy}px)`,
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.4)",
                  pointerEvents: "none",
                  animation: noMotion ? undefined : `orbSparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                }}
              >
                ✦
              </span>
            ))}

            <motion.div
              data-cursor="card"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: orb.gradient,
                boxShadow: orb.shadow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              whileHover={
                noMotion
                  ? {}
                  : { scale: 1.15, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
              }
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.02em" }}>
                {orb.glyph}
              </span>
            </motion.div>
          </div>

          {/* Ambient glow under orb */}
          <div
            style={{
              width: "70px",
              height: "16px",
              margin: "4px auto 0",
              background: orb.glow,
              filter: "blur(15px)",
              borderRadius: "50%",
            }}
          />

          <div style={{ fontSize: "0.75rem", color: "#8B949E", marginTop: "8px" }}>{orb.label}</div>
        </motion.div>
      ))}

      <style>{`
        @keyframes orbSparkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const noMotion = reducedMotion === true;

  const btn1 = useMagnetic();
  const btn2 = useMagnetic();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const tr = (d: number, delay = 0) =>
    noMotion ? { duration: 0, delay: 0 } : { duration: d, delay, ease };

  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        minHeight: "100dvh",
        background: "#0D1117",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      {/* ── Background layers ─────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Layer 1 — deep navy base */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, background: "#0D1117" }} />

        {/* Layer 2 — GitHub-style radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: `
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(163,113,247,0.15) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 20% 50%, rgba(0,229,192,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 40% 40% at 80% 60%, rgba(88,166,255,0.05) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Layer 3 — sparkle star canvas */}
        <SparkleCanvas noMotion={noMotion} />

        {/* Layer 4 — subtle grid mesh */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            backgroundImage: `
              linear-gradient(rgba(48,54,61,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(48,54,61,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
            pointerEvents: "none",
          }}
        />

        {/* Layer 5 — bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "300px",
            zIndex: 3,
            background: "linear-gradient(to bottom, transparent, #0D1117)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Announcement bar */}
        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(163,113,247,0.08)",
            border: "1px solid rgba(163,113,247,0.25)",
            borderRadius: "999px",
            padding: "6px 16px 6px 10px",
            marginBottom: "32px",
            cursor: "pointer",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(0.5, 0)}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #A371F7, #00E5C0)",
              borderRadius: "999px",
              padding: "2px 10px",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            NEW
          </span>
          <span style={{ fontSize: "0.8rem", color: "#8B949E" }}>DPIIT &amp; Startup India Recognized Company</span>
          <span style={{ color: "#A371F7", fontSize: "0.8rem" }}>→</span>
        </motion.div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden" style={{ paddingBottom: "0.08em" }}>
              <motion.span
                className={line.gradient ? "inline-block text-gradient" : "inline-block"}
                style={{ color: line.gradient ? undefined : "#E6EDF3", willChange: "opacity, transform, filter" }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={tr(1.0, i * 0.12)}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          style={{
            color: "#8B949E",
            fontSize: "1.15rem",
            maxWidth: "560px",
            margin: "28px auto 48px",
            lineHeight: 1.7,
            willChange: "opacity, transform",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(0.6, 0.6)}
        >
          Scitisense Futurize is a recognized leader in Scientific R&amp;D and
          Information Technology — providing intellectual infrastructure and
          technological solutions to solve complex challenges in modern
          science and healthcare.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "16px" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(0.6, 0.75)}
        >
          <motion.button
            data-cursor="cta"
            style={{
              x: btn1.x,
              y: btn1.y,
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: 700,
              borderRadius: "999px",
              background: "linear-gradient(135deg, #A371F7, #00E5C0)",
              color: "#0D1117",
              boxShadow: "0 0 30px rgba(163,113,247,0.3)",
              border: "none",
              whiteSpace: "nowrap",
            }}
            className="flex items-center gap-2"
            onMouseMove={noMotion ? undefined : btn1.onMove}
            onMouseLeave={noMotion ? undefined : btn1.onLeave}
            whileHover={
              noMotion
                ? {}
                : {
                    scale: 1.04,
                    boxShadow: "0 0 48px rgba(163,113,247,0.5)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }
            }
            whileTap={
              noMotion
                ? {}
                : {
                    scale: 0.96,
                    boxShadow: "0 0 30px rgba(163,113,247,0.3)",
                    transition: { duration: 0.15, ease: "easeOut" },
                  }
            }
            transition={tr(0.2)}
          >
            Start Your Transformation
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>

          <motion.button
            style={{
              x: btn2.x,
              y: btn2.y,
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "999px",
              background: "transparent",
              color: "#E6EDF3",
              border: "1px solid #30363D",
              whiteSpace: "nowrap",
            }}
            className="flex items-center gap-2"
            onMouseMove={noMotion ? undefined : btn2.onMove}
            onMouseLeave={noMotion ? undefined : btn2.onLeave}
            whileHover={
              noMotion
                ? {}
                : {
                    scale: 1.04,
                    borderColor: "#8B949E",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }
            }
            whileTap={
              noMotion
                ? {}
                : {
                    scale: 0.96,
                    transition: { duration: 0.15, ease: "easeOut" },
                  }
            }
            transition={tr(0.2)}
          >
            View Our Work
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* Floating 3D service orbs */}
        <FloatingOrbs noMotion={noMotion} />
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={tr(0.5, 1.4)}
        aria-hidden="true"
      >
        <span style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#484F58" }}>
          Scroll
        </span>
        <motion.div
          animate={noMotion ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.65, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#A371F7" }}
        >
          <ChevronDown size={16} strokeWidth={1.8} />
        </motion.div>
      </motion.div>
    </section>
  );
}
