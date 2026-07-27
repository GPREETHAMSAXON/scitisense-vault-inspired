"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HEADLINE_LINES = [
  { text: "Building the",         gradient: false },
  { text: "Intelligent Systems",  gradient: true  },
  { text: "of Tomorrow",          gradient: false },
];

const DOMAIN_PILLS = [
  "Computer Vision",
  "IoT & Wearable Sensors",
  "Machine Learning",
  "NLP & LLMs",
  "Generative AI",
  "Agentic AI",
  "Training & Consulting",
];

const METRICS = [
  { value: "18+", label: "Projects" },
  { value: "5+",  label: "Clients" },
  { value: "4+",  label: "Workshops" },
  { value: "7",   label: "Domains" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbARef    = useRef<HTMLDivElement>(null);
  const orbBRef    = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;

      if (orbARef.current) {
        orbARef.current.style.transform = `translate(${nx * -20}px, ${ny * -20}px)`;
      }
      if (orbBRef.current) {
        orbBRef.current.style.transform = `translate(${nx * 15}px, ${ny * 15}px)`;
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const revealCls = `reveal-up${visible ? " revealed" : ""}`;
  const step = (i: number) => (visible ? { transitionDelay: `${i * 0.1}s` } : {});

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden grid-bg-light"
      style={{
        background: "linear-gradient(180deg, #F5F5F7 0%, #FAFAFA 60%, #FFFFFF 100%)",
        paddingTop: 160,
        paddingBottom: 0,
      }}
    >
      {/* Top-left Logo Watermark */}
      <div style={{
        position: "absolute",
        top: "40px",
        left: "-40px",
        zIndex: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <img
          src="/logo.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            width: "650px",
            height: "auto",
            objectFit: "contain",
            opacity: 0,
            animation: "logoFadeIn 2s cubic-bezier(0.22,1,0.36,1) 0.5s forwards, logoFloat 6s ease-in-out 2.5s infinite",
          }}
        />
      </div>

      {/* Background Logo Watermark */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <img
          src="/logo.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            width: "600px",
            height: "auto",
            opacity: 0.04,
            filter: "blur(2px) grayscale(30%)",
            objectFit: "contain",
          }}
        />
      </div>

      <div style={{
        position: "absolute",
        top: "10%",
        right: "-100px",
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <img
          src="/logo.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            width: "400px",
            height: "auto",
            opacity: 0.025,
            filter: "blur(3px)",
            objectFit: "contain",
            transform: "rotate(15deg)",
          }}
        />
      </div>

      <div style={{
        position: "absolute",
        bottom: "5%",
        left: "-60px",
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <img
          src="/logo.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            width: "280px",
            height: "auto",
            opacity: 0.03,
            filter: "blur(2px)",
            objectFit: "contain",
            transform: "rotate(-10deg)",
          }}
        />
      </div>

      {/* Mouse-reactive parallax orbs */}
      <div
        ref={orbARef}
        aria-hidden="true"
        style={{
          position: "absolute", top: "25%", left: "25%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 70%)",
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={orbBRef}
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "33%", right: "25%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,170,220,0.07) 0%, transparent 70%)",
          transition: "transform 1s cubic-bezier(0.23,1,0.32,1)",
          pointerEvents: "none",
        }}
      />

      {/* Vertical beams */}
      <div className="beam" style={{ left: "15%", top: 0 }} aria-hidden="true" />
      <div className="beam beam-delay-1" style={{ left: "35%", top: 0 }} aria-hidden="true" />
      <div className="beam beam-delay-2" style={{ left: "65%", top: 0 }} aria-hidden="true" />
      <div className="beam beam-delay-3" style={{ left: "85%", top: 0 }} aria-hidden="true" />

      <div className="relative container px-5 md:px-8" style={{ zIndex: 1, textAlign: "center" }}>
        {/* Eyebrow pill */}
        <div className={revealCls} style={step(0)}>
          <span className="tag-pill-light" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
            <span className="pulse-dot" />
            AI Research &amp; Technology Company
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-hero-xl" style={{ fontWeight: 800, marginBottom: 24 }}>
          {HEADLINE_LINES.map((line, i) => (
            <span
              key={line.text}
              className={revealCls}
              style={{
                display: "block",
                color: line.gradient ? undefined : "#6E6E73",
                ...step(i + 1),
              }}
            >
              <span className={line.gradient ? "text-gradient-teal" : undefined}>
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className={revealCls}
          style={{
            color: "#6E6E73",
            fontSize: "1.1rem",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.7,
            ...step(4),
          }}
        >
          Scitisense Futurize delivers end-to-end AI research, product development, and technology
          consulting across industries, academia, healthcare, manufacturing, defense, and smart cities.
        </p>

        {/* CTAs */}
        <div
          className={revealCls}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36, ...step(5) }}
        >
          <Link href="/services" className="btn-primary-light" style={{ padding: "14px 28px", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}>
            Explore Research Services <ArrowRight size={15} />
          </Link>
        </div>

        {/* Research domain pills */}
        <div
          className={revealCls}
          style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 64, ...step(6) }}
        >
          {DOMAIN_PILLS.map((label) => (
            <Link key={label} href="/services" className="tag-pill-light">
              {label}
            </Link>
          ))}
        </div>

        {/* Metrics bar — frosted glass */}
        <div
          style={{
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              maxWidth: 1000, margin: "0 auto",
              display: "grid", gridTemplateColumns: `repeat(${METRICS.length}, 1fr)`,
            }}
          >
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                style={{
                  textAlign: "center",
                  padding: "28px 0",
                  borderRight: i < METRICS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                }}
              >
                <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", fontWeight: 800, color: "#0071E3", letterSpacing: "-0.03em" }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 12, color: "#6E6E73", marginTop: 4, fontWeight: 500 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
