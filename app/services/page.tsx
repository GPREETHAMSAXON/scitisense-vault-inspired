"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle, ChevronRight, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICES, SERVICE_ICON_MAP, hexToRgb, type ServiceData } from "@/lib/services-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "50+", label: "Expert Researchers" },
  { value: "30+", label: "Industry Partners" },
  { value: String(SERVICES.length), label: "Research Domains" },
] as const;

function fadeUp(noMotion: boolean, delay = 0) {
  if (noMotion) return { initial: false as const };
  return {
    initial: { opacity: 0, y: 24 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: false, margin: "-60px" } as const,
    transition: { duration: 0.6, delay, ease },
  };
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ServicesHero() {
  const noMotion = useReducedMotion() === true;

  return (
    <section
      className="relative overflow-hidden text-center"
      style={{ paddingTop: "160px", paddingBottom: "80px", background: "transparent" }}
    >
      <div className="container px-5 md:px-8" style={{ position: "relative", zIndex: 1 }}>
        <motion.p
          {...fadeUp(noMotion)}
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#00E5C0",
            marginBottom: "20px",
          }}
        >
          Our Services & Research
        </motion.p>

        <motion.h1
          {...fadeUp(noMotion, 0.08)}
          className="text-gradient font-bold"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          Research. Build. Deploy. Transform.
        </motion.h1>

        <motion.p
          {...fadeUp(noMotion, 0.16)}
          style={{
            fontSize: "1.1rem",
            color: "#8B949E",
            lineHeight: 1.75,
            maxWidth: "680px",
            margin: "0 auto 56px",
          }}
        >
          Scitisense Futurize is an applied AI research house — we take ideas from lab-grade
          prototypes to production systems across computer vision, IoT, machine learning,
          language, generative and agentic AI, backed by hands-on training and consultancy.
        </motion.p>

        <motion.div
          {...fadeUp(noMotion, 0.24)}
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "0" }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "0 32px",
                borderRight: i < STATS.length - 1 ? "1px solid #30363D" : "none",
              }}
            >
              <span
                className="text-gradient block"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1 }}
              >
                {s.value}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#8B949E", marginTop: "6px", display: "block" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sticky service tabs ──────────────────────────────────────────────────────

function StickyTabs({ activeSlug, onTabClick }: { activeSlug: string; onTabClick: (slug: string) => void }) {
  return (
    <nav
      aria-label="Service sections"
      className="hidden md:block"
      style={{
        position: "sticky",
        top: "73px",
        zIndex: 40,
        background: "rgba(13,17,23,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #21262D",
      }}
    >
      <div
        className="container px-5 md:px-8 flex items-center overflow-x-auto"
        style={{ gap: "4px", paddingBlock: "10px" }}
      >
        {SERVICES.map((s) => {
          const isActive = activeSlug === s.slug;
          const rgb = hexToRgb(s.color);
          return (
            <button
              key={s.slug}
              onClick={() => onTabClick(s.slug)}
              style={{
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
                fontWeight: isActive ? 700 : 500,
                padding: "8px 16px",
                borderRadius: "999px",
                color: isActive ? s.color : "#8B949E",
                background: isActive ? `rgba(${rgb},0.08)` : "transparent",
                border: isActive ? `1px solid rgba(${rgb},0.35)` : "1px solid transparent",
                transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider({ color }: { color: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "1px",
        background: `linear-gradient(90deg, transparent, #30363D, ${color}, #30363D, transparent)`,
        opacity: 0.5,
      }}
    />
  );
}

// ─── Industries card ──────────────────────────────────────────────────────────

function IndustriesCard({ service }: { service: ServiceData }) {
  const rgb = hexToRgb(service.color);
  return (
    <div
      style={{
        background: "rgba(22,27,34,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid #30363D",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#8B949E",
          marginBottom: "16px",
        }}
      >
        Industries Served
      </p>
      <div className="flex flex-wrap" style={{ gap: "8px" }}>
        {service.industries.map((industry) => (
          <span
            key={industry}
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: service.color,
              background: `rgba(${rgb},0.1)`,
              border: `1px solid rgba(${rgb},0.25)`,
              borderRadius: "999px",
              padding: "5px 12px",
            }}
          >
            {industry}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Algorithms grid ──────────────────────────────────────────────────────────

function AlgorithmChip({ text, color }: { text: string; color: string }) {
  const rgb = hexToRgb(color);
  return (
    <span
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.75rem",
        color: "#E6EDF3",
        background: "rgba(13,17,23,0.6)",
        border: "1px solid #30363D",
        borderRadius: "6px",
        padding: "5px 10px",
        transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `rgba(${rgb},0.12)`;
        e.currentTarget.style.borderColor = `rgba(${rgb},0.4)`;
        e.currentTarget.style.color = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(13,17,23,0.6)";
        e.currentTarget.style.borderColor = "#30363D";
        e.currentTarget.style.color = "#E6EDF3";
      }}
    >
      {text}
    </span>
  );
}

function AlgorithmsGrid({ service }: { service: ServiceData }) {
  const categories = Object.entries(service.algorithms);
  if (categories.length === 0) return null;

  return (
    <div style={{ marginTop: "48px" }}>
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#8B949E",
          marginBottom: "20px",
        }}
      >
        Algorithms & Technologies
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "16px" }}>
        {categories.map(([category, items]) => (
          <div
            key={category}
            style={{
              background: "rgba(22,27,34,0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid #30363D",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#E6EDF3", marginBottom: "12px" }}>
              {category}
            </p>
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {items.map((item) => (
                <AlgorithmChip key={item} text={item} color={service.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projects grid ────────────────────────────────────────────────────────────

function ProjectsGrid({ service }: { service: ServiceData }) {
  const rgb = hexToRgb(service.color);
  return (
    <div style={{ marginTop: "48px" }}>
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#8B949E",
          marginBottom: "20px",
        }}
      >
        Representative Projects
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "12px" }}>
        {service.projects.map((project, i) => (
          <div
            key={project}
            className="flex items-center"
            style={{
              gap: "14px",
              background: "rgba(22,27,34,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid #30363D",
              borderRadius: "12px",
              padding: "14px 18px",
              transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateX(4px)";
              el.style.borderColor = `rgba(${rgb},0.4)`;
              el.style.boxShadow = `0 4px 20px rgba(${rgb},0.1)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateX(0)";
              el.style.borderColor = "#30363D";
              el.style.boxShadow = "none";
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: service.color,
                background: `rgba(${rgb},0.12)`,
                borderRadius: "8px",
                minWidth: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "0.9rem", color: "#E6EDF3", fontWeight: 500 }}>{project}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Deliverables + Tools ─────────────────────────────────────────────────────

function DeliverablesTools({ service }: { service: ServiceData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px", marginTop: "48px" }}>
      <div>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#8B949E",
            marginBottom: "16px",
          }}
        >
          Deliverables
        </p>
        <div className="flex flex-col" style={{ gap: "10px" }}>
          {service.deliverables.map((d) => (
            <div key={d} className="flex items-start" style={{ gap: "10px" }}>
              <CheckCircle size={16} style={{ color: service.color, flexShrink: 0, marginTop: "2px" }} strokeWidth={2} />
              <span style={{ fontSize: "0.88rem", color: "#E6EDF3" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#8B949E",
            marginBottom: "16px",
          }}
        >
          Tools & Stack
        </p>
        <div className="flex flex-wrap" style={{ gap: "8px" }}>
          {service.tools.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.78rem",
                color: "#8B949E",
                background: "rgba(13,17,23,0.6)",
                border: "1px solid #30363D",
                borderRadius: "6px",
                padding: "6px 12px",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Training special layout ──────────────────────────────────────────────────

function TrainingSpecial({ service }: { service: ServiceData }) {
  const rgb = hexToRgb(service.color);

  return (
    <div style={{ marginTop: "48px" }}>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "24px" }}>
        {/* Col 1 — Training Domains */}
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8B949E",
              marginBottom: "16px",
            }}
          >
            Training Domains
          </p>
          <div className="flex flex-wrap" style={{ gap: "8px" }}>
            {service.trainingDomains?.map((d) => (
              <span
                key={d}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#00E5C0",
                  background: "rgba(0,229,192,0.08)",
                  border: "1px solid rgba(0,229,192,0.2)",
                  borderRadius: "999px",
                  padding: "5px 12px",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — Consultancy Services */}
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8B949E",
              marginBottom: "16px",
            }}
          >
            Consultancy Services
          </p>
          <div className="flex flex-col" style={{ gap: "10px" }}>
            {service.consultancyServices?.map((c) => (
              <div key={c} className="flex items-center" style={{ gap: "8px" }}>
                <ChevronRight size={14} style={{ color: service.color, flexShrink: 0 }} strokeWidth={2.5} />
                <span style={{ fontSize: "0.85rem", color: "#E6EDF3" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — Training Formats */}
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8B949E",
              marginBottom: "16px",
            }}
          >
            Training Formats
          </p>
          <div className="grid grid-cols-2" style={{ gap: "10px" }}>
            {service.trainingFormats?.map((f) => {
              const FormatIcon = SERVICE_ICON_MAP[f.icon];
              return (
                <div
                  key={f.name}
                  style={{
                    background: "rgba(22,27,34,0.6)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid #30363D",
                    borderRadius: "12px",
                    padding: "14px",
                  }}
                >
                  {FormatIcon && (
                    <FormatIcon size={18} style={{ color: service.color, marginBottom: "8px" }} strokeWidth={1.8} />
                  )}
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#E6EDF3", marginBottom: "4px" }}>
                    {f.name}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "#8B949E", lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section CTA ──────────────────────────────────────────────────────────────

function SectionCTA({ color }: { color: string }) {
  const noMotion = useReducedMotion() === true;
  return (
    <div className="flex flex-wrap items-center" style={{ gap: "16px", marginTop: "48px" }}>
      <motion.a
        href="/contact"
        className="inline-flex items-center gap-2 font-bold"
        style={{
          background: `linear-gradient(135deg, ${color}, #00E5C0)`,
          color: "#0D1117",
          padding: "12px 28px",
          borderRadius: "999px",
          fontSize: "0.9rem",
        }}
        whileHover={noMotion ? {} : { scale: 1.04 }}
        whileTap={noMotion ? {} : { scale: 0.97 }}
        transition={{ duration: 0.2, ease }}
      >
        Start a Project
        <ArrowRight size={15} strokeWidth={2.5} />
      </motion.a>
      <motion.a
        href="/contact"
        className="inline-flex items-center gap-2 font-semibold"
        style={{
          background: "transparent",
          color: "#E6EDF3",
          border: "1px solid #30363D",
          padding: "12px 28px",
          borderRadius: "999px",
          fontSize: "0.9rem",
        }}
        whileHover={noMotion ? {} : { scale: 1.03, borderColor: color, color }}
        whileTap={noMotion ? {} : { scale: 0.97 }}
        transition={{ duration: 0.2, ease }}
      >
        Request Consultation
      </motion.a>
    </div>
  );
}

// ─── Service section ──────────────────────────────────────────────────────────

function ServiceSection({
  service,
  registerRef,
}: {
  service: ServiceData;
  registerRef: (slug: string, el: HTMLElement | null) => void;
}) {
  const noMotion = useReducedMotion() === true;
  const Icon = SERVICE_ICON_MAP[service.icon];
  const rgb = hexToRgb(service.color);
  const isTraining = service.id === "training-consultancy";

  return (
    <section
      id={service.slug}
      ref={(el) => registerRef(service.slug, el)}
      className="relative overflow-hidden"
      style={{ background: "transparent", padding: "96px 24px", scrollMarginTop: "140px" }}
    >
      {/* Ambient glow tinted to service color */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: `radial-gradient(ellipse, rgba(${rgb},0.06) 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header — 60/40 split */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]" style={{ gap: "40px" }}>
          <motion.div {...fadeUp(noMotion)}>
            <div className="flex items-center" style={{ gap: "14px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `rgba(${rgb},0.12)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} strokeWidth={1.8} style={{ color: service.color }} />
              </div>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: service.color,
                  background: `rgba(${rgb},0.1)`,
                  border: `1px solid rgba(${rgb},0.25)`,
                  borderRadius: "999px",
                  padding: "4px 12px",
                }}
              >
                {service.label}
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: "#E6EDF3",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
                lineHeight: 1.15,
              }}
            >
              {service.name}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                fontStyle: "italic",
                color: service.color,
                marginBottom: "20px",
              }}
            >
              {service.tagline}
            </p>
            <p style={{ fontSize: "0.98rem", color: "#8B949E", lineHeight: 1.78, maxWidth: "620px" }}>
              {service.overview}
            </p>
          </motion.div>

          <motion.div {...fadeUp(noMotion, 0.12)}>
            <IndustriesCard service={service} />
          </motion.div>
        </div>

        {/* Algorithms OR training special */}
        {isTraining ? <TrainingSpecial service={service} /> : <AlgorithmsGrid service={service} />}

        {/* Projects */}
        <ProjectsGrid service={service} />

        {/* Deliverables + tools */}
        <DeliverablesTools service={service} />

        {/* CTA */}
        <SectionCTA color={service.color} />
      </div>
    </section>
  );
}

// ─── Bottom CTA ────────────────────────────────────────────────────────────────

function BottomCTA() {
  const noMotion = useReducedMotion() === true;
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        background: "transparent",
        padding: "100px 24px",
        borderTop: "1px solid rgba(163,113,247,0.15)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(163,113,247,0.15) 0%, rgba(0,229,192,0.06) 50%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="relative container" style={{ zIndex: 1 }}>
        <motion.h2
          {...fadeUp(noMotion)}
          className="font-bold"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#E6EDF3", marginBottom: "20px", lineHeight: 1.15 }}
        >
          Ready to Start Your <span className="text-gradient">AI Research Journey?</span>
        </motion.h2>
        <motion.p
          {...fadeUp(noMotion, 0.08)}
          style={{ fontSize: "1.05rem", color: "#8B949E", maxWidth: "560px", margin: "0 auto 40px" }}
        >
          Tell us what you&apos;re building — we&apos;ll match it to the right research team.
        </motion.p>
        <motion.div {...fadeUp(noMotion, 0.16)} className="flex flex-wrap items-center justify-center" style={{ gap: "16px", marginBottom: "40px" }}>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 font-bold"
            style={{
              background: "linear-gradient(135deg, #A371F7, #00E5C0)",
              color: "#0D1117",
              padding: "14px 32px",
              borderRadius: "999px",
              fontSize: "0.95rem",
              boxShadow: "0 0 30px rgba(163,113,247,0.3)",
            }}
          >
            Book a Free Consultation
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </motion.div>
        <motion.div
          {...fadeUp(noMotion, 0.22)}
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "28px", fontSize: "0.9rem", color: "#8B949E" }}
        >
          <span className="inline-flex items-center gap-2">
            <Mail size={15} style={{ color: "#00E5C0" }} />
            info@scitisensefuturize.in
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={15} style={{ color: "#00E5C0" }} />
            +91 8500631655
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeSlug, setActiveSlug] = useState<string>(SERVICES[0].slug);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const registerRef = (slug: string, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(slug, el);
    else sectionRefs.current.delete(slug);
  };

  const onTabClick = (slug: string) => {
    const el = sectionRefs.current.get(slug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSlug(slug);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = (entry.target as HTMLElement).id;
            setActiveSlug(slug);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative" style={{ backgroundColor: "transparent" }}>
        <ServicesHero />
        <StickyTabs activeSlug={activeSlug} onTabClick={onTabClick} />

        {SERVICES.map((service, i) => (
          <div key={service.id}>
            <ServiceSection service={service} registerRef={registerRef} />
            {i < SERVICES.length - 1 && <Divider color={service.color} />}
          </div>
        ))}

        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
