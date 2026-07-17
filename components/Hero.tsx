"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Orb {
  x: number; y: number; r: number;
  color: [number, number, number]; alpha: number;
  vx: number; vy: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COMPANY         = "Scitisense Futurize";
const TYPEWRITER_TEXT = "Build, Optimize &";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

// ─── Magnetic button hook ─────────────────────────────────────────────────────

function useMagnetic() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 320, damping: 24 });
  const y    = useSpring(rawY, { stiffness: 320, damping: 24 });

  function onMove<T extends HTMLElement>(e: React.MouseEvent<T>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width  / 2)) * 0.38);
    rawY.set((e.clientY - (r.top  + r.height / 2)) * 0.38);
  }
  function onLeave() { rawX.set(0); rawY.set(0); }

  return { x, y, onMove, onLeave };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const noMotion      = reducedMotion === true;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btn1      = useMagnetic();
  const btn2      = useMagnetic();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const tr   = (d: number, delay = 0) =>
    noMotion ? { duration: 0, delay: 0 } : { duration: d, delay, ease };

  // Typewriter — 18 chars × 40ms ≈ 720ms total
  const { displayText: typedText, isComplete: typingDone } = useTypewriter(TYPEWRITER_TEXT, 40);
  const displayText = noMotion ? TYPEWRITER_TEXT : typedText;
  const isComplete  = noMotion || typingDone;

  // Content stagger delays (all relative to isComplete)
  const transformDelay = 0;
  const line2Delay     = 0.28;
  const subDelay       = 0.68;
  const trustDelay     = 0.90;
  const ctaDelay       = 0.95;
  const scrollDelay    = 1.40;

  // ── Orb canvas ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (noMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const orbs: Orb[] = [
      { x: 0.15, y: 0.25, r: 0.45, color: [194, 118, 26], alpha: 0.22, vx:  0.00015, vy:  0.00010 },
      { x: 0.80, y: 0.65, r: 0.38, color: [20,  33,  61], alpha: 0.15, vx: -0.00012, vy:  0.00008 },
      { x: 0.50, y: 0.80, r: 0.35, color: [194, 118, 26], alpha: 0.12, vx:  0.00010, vy: -0.00015 },
      { x: 0.85, y: 0.15, r: 0.30, color: [224, 148, 31], alpha: 0.16, vx: -0.00008, vy:  0.00012 },
      { x: 0.30, y: 0.70, r: 0.28, color: [20,  33,  61], alpha: 0.10, vx:  0.00014, vy: -0.00009 },
    ];

    const mouse = { x: 0.5, y: 0.5 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId: number;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) { rafId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);

      for (const orb of orbs) {
        // Drift
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -0.1 || orb.x > 1.1) orb.vx *= -1;
        if (orb.y < -0.1 || orb.y > 1.1) orb.vy *= -1;

        // Mouse parallax
        const px     = (mouse.x - 0.5) * 30;
        const py     = (mouse.y - 0.5) * 30;
        const cx     = orb.x * w + px;
        const cy     = orb.y * h + py;
        const radius = Math.min(w, h) * orb.r;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = orb.color;
        grad.addColorStop(0,   `rgba(${r},${g},${b},${orb.alpha})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${orb.alpha * 0.5})`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Subtle ring of particles
      const PARTICLE_COUNT = 60;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle  = (i / PARTICLE_COUNT) * Math.PI * 2;
        const spread = 0.35;
        const px2    = (0.5 + Math.cos(angle) * spread + (mouse.x - 0.5) * 0.1) * w;
        const py2    = (0.5 + Math.sin(angle) * spread * 0.6 + (mouse.y - 0.5) * 0.1) * h;

        ctx.beginPath();
        ctx.arc(px2, py2, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(194,118,26,0.25)";
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(() => {
      ctx.resetTransform();
      resize();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [noMotion]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        position:   "relative",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow:   "hidden",
        height:     "100dvh",
        minHeight:  "640px",
        background: "#FBF3E7",
      }}
    >
      {/* ── Background layer container ─────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>

        {/* Layer 1 — Rich radial gradient base */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset:    0,
            zIndex:   0,
            background: `
              radial-gradient(ellipse 80% 60% at 20% 30%, rgba(194,118,26,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 70%, rgba(20,33,61,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 100% 100% at 50% 50%, rgba(194,118,26,0.06) 0%, transparent 70%),
              linear-gradient(160deg, #FBF3E7 0%, #F0E4CC 40%, #EDD9B5 70%, #FBF3E7 100%)
            `,
          }}
        />

        {/* Layer 2 — Video texture (low opacity, multiply blend) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position:    "absolute",
            inset:       0,
            width:       "100%",
            height:      "100%",
            objectFit:   "cover",
            opacity:     0.12,
            zIndex:      1,
            mixBlendMode:"multiply",
            pointerEvents: "none",
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Layer 2b — Animated orb canvas */}
        {!noMotion && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset:    0,
              width:    "100%",
              height:   "100%",
              zIndex:   2,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Layer 3 — Grain texture overlay */}
        <div
          aria-hidden="true"
          style={{
            position:            "absolute",
            inset:               0,
            zIndex:              3,
            backgroundImage:     GRAIN_SVG,
            backgroundSize:      "200px 200px",
            opacity:             0.03,
            mixBlendMode:        "multiply",
            pointerEvents:       "none",
          }}
        />

        {/* Layer 4 — Mesh grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset:    0,
            zIndex:   3,
            backgroundImage: `
              linear-gradient(rgba(20,33,61,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20,33,61,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            pointerEvents:  "none",
          }}
        />

        {/* Layer 5 — Bottom fade into next section */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            right:      0,
            height:     "220px",
            background: "linear-gradient(to bottom, transparent, #FBF3E7)",
            zIndex:     4,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position:       "relative",
          zIndex:         10,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          textAlign:      "center",
          maxWidth:       "860px",
          margin:         "0 auto",
          padding:        "0 24px",
          paddingTop:     "100px",
          willChange:     "transform",
        }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2"
          style={{
            background:    "rgba(194,118,26,0.10)",
            border:        "1px solid rgba(194,118,26,0.30)",
            color:         "#C2761A",
            padding:       "6px 16px",
            borderRadius:  "999px",
            fontSize:      "0.8rem",
            fontWeight:    600,
            letterSpacing: "0.04em",
            marginBottom:  "32px",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(0.55)}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "#C2761A",
              boxShadow:       "0 0 6px #C2761A",
              animation:       noMotion ? "none" : "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
            }}
          />
          ServiceNow Elite Partner
        </motion.div>

        {/* ── Headline ─────────────────────────────────────────────────────── */}
        <h1
          style={{
            fontSize:      "clamp(2.4rem, 5vw, 4rem)",
            fontWeight:    800,
            lineHeight:    1.05,
            letterSpacing: "-0.03em",
            color:         "#14213D",
            marginBottom:  "20px",
          }}
        >
          {/* Line 1 — typewriter + "Transform" pop */}
          <span className="block mb-[0.12em]">
            <span style={{ display: "inline" }}>
              {displayText}
              {!isComplete && !noMotion && (
                <span className="cursor-blink" aria-hidden="true">|</span>
              )}
            </span>
            {" "}
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
              animate={{
                opacity: isComplete ? 1 : 0,
                scale:   isComplete ? 1 : 0.88,
                filter:  isComplete ? "blur(0px)" : "blur(8px)",
              }}
              transition={noMotion ? { duration: 0 } : { duration: 0.40, delay: transformDelay, ease }}
              style={{ willChange: "opacity, transform, filter" }}
            >
              Transform
            </motion.span>
          </span>

          {/* Line 2 — slides up after Transform appears */}
          <span className="block overflow-hidden" style={{ paddingBottom: "0.06em" }}>
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0, filter: "blur(4px)" }}
              animate={{
                y:       isComplete ? "0%" : "110%",
                opacity: isComplete ? 1 : 0,
                filter:  isComplete ? "blur(0px)" : "blur(4px)",
              }}
              transition={noMotion ? { duration: 0 } : { duration: 0.60, delay: line2Delay, ease }}
              style={{ willChange: "opacity, transform, filter" }}
            >
              Your IT Operations
            </motion.span>
          </span>
        </h1>

        {/* ── Subheadline ───────────────────────────────────────────────────── */}
        <motion.p
          style={{
            fontSize:   "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.8,
            color:      "#4A5568",
            maxWidth:   "580px",
            margin:     "0 auto 48px auto",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 18 }}
          transition={noMotion ? { duration: 0 } : { duration: 0.6, delay: subDelay, ease }}
        >
          <strong style={{ color: "#C2761A", fontWeight: 700 }}>{COMPANY}</strong>{" "}
          partners with enterprises to implement, optimize and scale ServiceNow
          solutions — delivering measurable outcomes across ITSM, ITOM, and beyond.
        </motion.p>

        {/* ── CTA buttons ───────────────────────────────────────────────────── */}
        <motion.div
          style={{
            display:        "flex",
            gap:            "16px",
            justifyContent: "center",
            alignItems:     "center",
            flexWrap:       "wrap",
            marginBottom:   "40px",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 18 }}
          transition={noMotion ? { duration: 0 } : { duration: 0.6, delay: ctaDelay, ease }}
        >
          {/* Primary CTA */}
          <motion.button
            data-cursor="cta"
            style={{
              x:            btn1.x,
              y:            btn1.y,
              padding:      "16px 36px",
              fontSize:     "1rem",
              fontWeight:   600,
              borderRadius: "999px",
              background:   "#C2761A",
              color:        "#FFFFFF",
              whiteSpace:   "nowrap",
              boxShadow:    "0 2px 0 rgba(140,80,10,0.3), 0 4px 20px rgba(194,118,26,0.25)",
              border:       "none",
              cursor:       "none",
            }}
            className="flex items-center gap-2"
            onMouseMove={noMotion ? undefined : btn1.onMove}
            onMouseLeave={noMotion ? undefined : btn1.onLeave}
            whileHover={noMotion ? {} : { scale: 1.04, boxShadow: "0 2px 0 rgba(140,80,10,0.3), 0 8px 32px rgba(194,118,26,0.40)" }}
            whileTap={noMotion ? {} : { scale: 0.97, y: 1, boxShadow: "0 1px 0 rgba(140,80,10,0.3)" } as Parameters<typeof motion.button>[0]["whileTap"]}
            transition={tr(0.2)}
          >
            Start Your Transformation
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>

          {/* Ghost CTA */}
          <motion.button
            style={{
              x:            btn2.x,
              y:            btn2.y,
              padding:      "16px 36px",
              fontSize:     "1rem",
              fontWeight:   600,
              borderRadius: "999px",
              background:   "transparent",
              color:        "#14213D",
              border:       "2px solid rgba(20,33,61,0.15)",
              whiteSpace:   "nowrap",
              cursor:       "none",
            }}
            className="flex items-center gap-2"
            onMouseMove={noMotion ? undefined : btn2.onMove}
            onMouseLeave={noMotion ? undefined : btn2.onLeave}
            whileHover={noMotion ? {} : { scale: 1.04, backgroundColor: "rgba(20,33,61,0.04)", borderColor: "rgba(20,33,61,0.25)" }}
            whileTap={noMotion ? {} : { scale: 0.97 }}
            transition={tr(0.2)}
          >
            View Our Work
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* ── Trust bar ─────────────────────────────────────────────────────── */}
        <motion.p
          style={{
            fontSize:             "0.8rem",
            color:                "#14213D",
            letterSpacing:        "0.02em",
            background:           "rgba(255,255,255,0.7)",
            padding:              "8px 20px",
            borderRadius:         "999px",
            backdropFilter:       "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display:              "inline-block",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={noMotion ? { duration: 0 } : { duration: 0.5, delay: trustDelay, ease }}
        >
          Trusted by 40+ enterprises&ensp;·&ensp;ISO 27001 certified&ensp;·&ensp;98% CSAT
        </motion.p>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={noMotion ? { duration: 0 } : { duration: 0.5, delay: scrollDelay, ease }}
        aria-hidden="true"
      >
        <span style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94A0B8" }}>
          Scroll
        </span>
        <motion.div
          animate={noMotion ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.65, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#94A0B8" }}
        >
          <ChevronDown size={16} strokeWidth={1.8} />
        </motion.div>
      </motion.div>
    </section>
  );
}
