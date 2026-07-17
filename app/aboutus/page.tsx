"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Count-up (inline, no shared hook across files) ──────────────────────────
import { useEffect, useState } from "react";

function useCountUp(target: number, inView: boolean, noMotion: boolean) {
  const [count, setCount] = useState(noMotion ? target : 0);
  useEffect(() => {
    if (noMotion) { setCount(target); return; }
    if (!inView)  return;
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setCount(Math.round((1 - Math.pow(2, -10 * p)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, noMotion]);
  return count;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  value, suffix, label, noMotion,
}: { value: number; suffix: string; label: string; noMotion: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const count  = useCountUp(value, inView, noMotion);
  return (
    <div ref={ref} className="glass-card text-center" style={{ padding: "32px" }}>
      <span
        className="block font-bold tabular-nums tracking-tight"
        style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)", color: "var(--accent)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-sm font-medium mt-2 block" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
    </div>
  );
}

function fadeUp(noMotion: boolean, delay = 0) {
  if (noMotion) return { initial: false as const };
  return {
    initial:     { opacity: 0, y: 28 } as const,
    whileInView: { opacity: 1, y: 0  } as const,
    viewport:    { once: false, margin: "-80px" } as const,
    transition:  { duration: 0.65, delay, ease },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutUs() {
  const noMotion = useReducedMotion() === true;

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: "var(--bg-base)" }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative text-center overflow-hidden"
          style={{
            paddingTop: "160px",
            paddingBottom: "100px",
            backgroundImage:
              "radial-gradient(ellipse at 20% 60%, rgba(194,118,26,0.06) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 80% 30%, rgba(20,33,61,0.05) 0%, transparent 55%)",
          }}
        >
          <div className="container px-5 md:px-8">
            <motion.p
              className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
              {...fadeUp(noMotion)}
            >
              Who We Are
            </motion.p>
            <motion.h1
              className="font-bold tracking-[-0.028em] mb-6"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                color: "var(--text-primary)",
                lineHeight: 1.08,
              }}
              {...fadeUp(noMotion, 0.08)}
            >
              About Scitisense Futurize
            </motion.h1>
            <motion.p
              style={{
                fontSize:  "clamp(0.95rem, 1.7vw, 1.1rem)",
                color:     "var(--text-secondary)",
                lineHeight: 1.78,
                maxWidth:  "600px",
                margin:    "0 auto",
                textAlign: "center",
              }}
              {...fadeUp(noMotion, 0.16)}
            >
              We exist at the intersection of wellness and productivity — helping
              enterprises build IT environments where people and technology thrive together.
            </motion.p>
          </div>
        </section>

        {/* ── Mission ───────────────────────────────────────────────────────── */}
        <section style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          <div className="container px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div {...fadeUp(noMotion)}>
                <p
                  className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Our Mission
                </p>
                <h2
                  className="font-bold tracking-[-0.025em] mb-6"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    color: "var(--text-primary)",
                  }}
                >
                  Empowering Enterprises to Operate at Their Best
                </h2>
                <p
                  style={{
                    fontSize: "clamp(0.92rem, 1.5vw, 1rem)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.82,
                  }}
                >
                  Our mission is to help organizations build resilient, efficient,
                  and human-centered IT operations. We partner with enterprises
                  across industries to implement technology that doesn&apos;t just
                  work — it works for people. By combining deep platform expertise
                  with a genuine understanding of how teams operate, we design
                  solutions that reduce friction, restore focus, and unlock
                  sustainable growth.
                </p>
              </motion.div>

              <motion.div
                className="glass-card"
                style={{ padding: "32px" }}
                {...fadeUp(noMotion, 0.12)}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#C2761A" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5" stroke="#C2761A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12l10 5 10-5" stroke="#C2761A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                  </svg>
                </div>
                <p
                  className="font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Built for the Modern Enterprise
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
                >
                  From fast-growing mid-market companies to large government
                  bodies, we bring the same rigour, transparency, and commitment
                  to outcomes — regardless of scale.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Vision ────────────────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: "80px",
            paddingBottom: "80px",
            backgroundColor: "var(--bg-navy)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                className="glass-card"
                style={{ padding: "32px" }}
                {...fadeUp(noMotion)}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" stroke="#C2761A" strokeWidth="1.8"/>
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#C2761A" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="#C2761A" strokeWidth="1.3" opacity="0.35"/>
                  </svg>
                </div>
                <p
                  className="font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  A Future Where IT Serves People
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
                >
                  We envision enterprises where IT is invisible in the best sense —
                  running smoothly in the background, freeing people to focus
                  entirely on the work that matters.
                </p>
              </motion.div>

              <motion.div {...fadeUp(noMotion, 0.12)}>
                <p
                  className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Our Vision
                </p>
                <h2
                  className="font-bold tracking-[-0.025em] mb-6"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    color: "var(--text-primary)",
                  }}
                >
                  A World Where Technology Amplifies Human Potential
                </h2>
                <p
                  style={{
                    fontSize: "clamp(0.92rem, 1.5vw, 1rem)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.82,
                  }}
                >
                  We believe that great IT infrastructure shouldn&apos;t be a
                  burden — it should be an enabler. Our vision is an enterprise
                  world where IT services are so seamless and reliable that
                  employees can redirect their full attention to innovation,
                  collaboration, and growth. Every implementation we deliver is
                  a step toward that future.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Customer success principle ─────────────────────────────────────── */}
        <section style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          <div className="container px-5 md:px-8 text-center">
            <motion.p
              className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
              {...fadeUp(noMotion)}
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              className="font-bold tracking-[-0.025em] mb-6"
              style={{
                fontSize:  "clamp(1.8rem, 3.5vw, 2.8rem)",
                color:     "var(--text-primary)",
                lineHeight: 1.12,
                maxWidth:  "840px",
                margin:    "0 auto 24px",
                textAlign: "center",
              }}
              {...fadeUp(noMotion, 0.08)}
            >
              Our Success Depends On Our Customer Success
            </motion.h2>
            <motion.p
              style={{
                fontSize:  "clamp(0.92rem, 1.5vw, 1rem)",
                color:     "var(--text-secondary)",
                lineHeight: 1.82,
                maxWidth:  "720px",
                margin:    "0 auto",
                textAlign: "center",
              }}
              {...fadeUp(noMotion, 0.16)}
            >
              We don&apos;t measure our performance in hours billed or tickets closed.
              We measure it in your outcomes — uptime restored, processes automated,
              costs reduced, and teams empowered. When you win, we win. That alignment
              is the foundation of every engagement we take on.
            </motion.p>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: "80px",
            paddingBottom: "120px",
            backgroundColor: "var(--bg-navy)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container px-5 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <StatCard value={10}  suffix="+" label="Happy Clients"      noMotion={noMotion} />
              <StatCard value={20}  suffix="+" label="Completed Projects"  noMotion={noMotion} />
              <StatCard value={30}  suffix="+" label="Professionals"       noMotion={noMotion} />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
