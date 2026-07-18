"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "motion/react";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { SERVICES, SERVICE_ICON_MAP, hexToRgb } from "@/lib/services-data";

const NAV_LINKS = [
  "Home",
  "Services",
  "Success Stories",
  "About",
  "Contact",
] as const;

const NAV_HREFS: Record<string, string> = {
  "Home":            "/",
  "Services":        "/services",
  "Success Stories": "/stories",
  "About":           "/aboutus",
  "Contact":         "/contact",
};

// ─── Magnetic nav-link hook ─────────────────────────────────────────────────

function useMagneticY(max = 4) {
  const rawY = useMotionValue(0);
  const y = useSpring(rawY, { stiffness: 400, damping: 25 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const relY = (e.clientY - (r.top + r.height / 2)) / (r.height / 2); // -1..1
    rawY.set(relY * max);
  }
  function onLeave() {
    rawY.set(0);
  }

  return { y, onMove, onLeave };
}

// ─── Underline that grows from center on hover ──────────────────────────────
// Plain CSS group-hover — more reliable than Motion gesture propagation for a
// simple always-on-hover cue, and avoids depending on pointer-event nuances.

function HoverUnderline() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 right-0 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
      style={{
        bottom: "-4px",
        height: "1px",
        background: "linear-gradient(90deg, #A371F7, #00E5C0)",
      }}
    />
  );
}

// ─── Nav link — magnetic + center-grow underline ────────────────────────────

function NavLink({
  href,
  label,
  onHoverStart,
}: {
  href: string;
  label: string;
  onHoverStart?: () => void;
}) {
  const mag = useMagneticY();

  return (
    <motion.a
      href={href}
      className="group"
      style={{
        position: "relative",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "#8B949E",
        textDecoration: "none",
        y: mag.y,
      }}
      onMouseMove={mag.onMove}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#E6EDF3";
        onHoverStart?.();
      }}
      onMouseLeave={(e) => {
        mag.onLeave();
        (e.currentTarget as HTMLElement).style.color = "#8B949E";
      }}
    >
      {label}
      <HoverUnderline />
    </motion.a>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <span
      className="font-bold text-[1.05rem] tracking-[-0.03em]"
      style={{ color: "#E6EDF3" }}
    >
      SCITISENSE <span style={{ color: "#00E5C0" }}>FUTURIZE</span>
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaLeft, setMegaLeft] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const reducedMotion   = useReducedMotion();
  const megaCloseTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const servicesTrigger = useRef<HTMLDivElement>(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  // Close mobile menu when viewport goes ≥ 768px
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Mega-menu hover with grace period ────────────────────────────────────
  const openMega = () => {
    clearTimeout(megaCloseTimer.current);
    if (servicesTrigger.current) {
      const rect = servicesTrigger.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const menuWidth = 720;
      const left = Math.min(
        Math.max(center - menuWidth / 2, 16),
        window.innerWidth - menuWidth - 16,
      );
      setMegaLeft(left);
    }
    setMegaOpen(true);
  };

  const closeMega = () => {
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  // ── Magnetic CTA button ───────────────────────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const btnX = useSpring(rawX, { stiffness: 320, damping: 24 });
  const btnY = useSpring(rawY, { stiffness: 320, damping: 24 });

  const onBtnMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    rawY.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  };

  const onBtnLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  // ── Transition factory ────────────────────────────────────────────────────
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const tr = (d = 0.4) =>
    reducedMotion ? { duration: 0 } : { duration: d, ease };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Fixed nav bar ─────────────────────────────────────────────────── */}
      <motion.header
        role="banner"
        style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 300 }}
      >
        {/* Dark frosted background — fades in on scroll or when mobile menu is open */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:           "rgba(13,17,23,0.92)",
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom:         scrolled ? "1px solid #21262D" : "1px solid transparent",
            willChange:           "opacity",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled || mobileOpen ? 1 : 0 }}
          transition={tr()}
        />

        {/* Nav row */}
        <div className="relative container flex items-center justify-between h-16 md:h-20 px-5 md:px-8">

          {/* Logo ─────────────────────────────────────────────────────────── */}
          <a
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Scitisense Futurize home"
          >
            <LogoMark />
          </a>

          {/* Desktop nav links — plain links, Vault style ───────────────────── */}
          <nav
            className="hidden md:flex items-center"
            aria-label="Primary navigation"
            style={{ gap: "36px" }}
          >
            {NAV_LINKS.map((link) =>
              link === "Services" ? (
                <div
                  key={link}
                  ref={servicesTrigger}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <motion.a
                    href="/services"
                    className="group"
                    style={{
                      position:     "relative",
                      fontSize:     "0.875rem",
                      fontWeight:   500,
                      color:        megaOpen ? "#E6EDF3" : "#8B949E",
                      background:   "transparent",
                      display:      "flex",
                      alignItems:   "center",
                      gap:          "4px",
                      textDecoration: "none",
                      cursor:       "pointer",
                      transition:   "color 0.2s ease",
                    }}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                  >
                    {link}
                    <motion.span
                      animate={{ rotate: megaOpen ? 180 : 0 }}
                      transition={tr(0.28)}
                      style={{ marginTop: "1px" }}
                    >
                      <ChevronDown size={13} strokeWidth={2.2} />
                    </motion.span>
                    <HoverUnderline />
                  </motion.a>
                </div>
              ) : (
                <NavLink
                  key={link}
                  href={NAV_HREFS[link] ?? `#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  label={link}
                  onHoverStart={() => setMegaOpen(false)}
                />
              )
            )}
          </nav>

          {/* Right side ────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Magnetic CTA — desktop only */}
            <motion.a
              href="/contact"
              className="hidden md:flex items-center gap-2 px-6 py-[0.62rem] text-sm font-medium rounded-full"
              style={{
                x:            btnX,
                y:            btnY,
                background:   "linear-gradient(135deg, #A371F7, #00E5C0)",
                border:       "1px solid transparent",
                color:        "#0D1117",
                fontWeight:   700,
                boxShadow:    "0 0 0 0px rgba(163,113,247,0.3)",
              }}
              onMouseMove={onBtnMove}
              onMouseLeave={onBtnLeave}
              whileHover={
                reducedMotion
                  ? {}
                  : {
                      scale: 1.03,
                      boxShadow: "0 0 24px rgba(163,113,247,0.5)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }
              }
              whileTap={
                reducedMotion
                  ? {}
                  : {
                      scale: 0.96,
                      boxShadow: "0 0 0 0px rgba(163,113,247,0.3)",
                      transition: { duration: 0.15, ease: "easeOut" },
                    }
              }
              transition={tr(0.3)}
              aria-label="Book a consultation"
            >
              Book a Consult
              <ArrowRight size={13} strokeWidth={2.5} />
            </motion.a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#8B949E" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={reducedMotion ? {} : { rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={reducedMotion ? {} : { rotate: 45, opacity: 0 }}
                    transition={tr(0.18)}
                    className="block"
                  >
                    <X size={20} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={reducedMotion ? {} : { rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={reducedMotion ? {} : { rotate: -45, opacity: 0 }}
                    transition={tr(0.18)}
                    className="block"
                  >
                    <Menu size={20} strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu ────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={tr(0.38)}
              className="overflow-hidden md:hidden border-t relative"
              style={{ borderColor: "#21262D" }}
            >
              <div className="px-5 py-4 flex flex-col gap-0.5">
                {NAV_LINKS.map((link) =>
                  link === "Services" ? (
                    <div key={link}>
                      <button
                        className="w-full flex items-center justify-between px-3 py-3 text-sm rounded-lg transition-colors duration-200"
                        style={{ color: "#8B949E" }}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        aria-expanded={mobileServicesOpen}
                      >
                        {link}
                        <motion.span
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          transition={tr(0.25)}
                        >
                          <ChevronDown size={13} strokeWidth={2.2} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={tr(0.3)}
                            className="overflow-hidden"
                          >
                            <div className="mt-0.5 ml-3 mb-2 flex flex-col gap-0.5">
                              {SERVICES.map((service) => {
                                const Icon = SERVICE_ICON_MAP[service.icon];
                                const rgb = hexToRgb(service.color);
                                return (
                                  <a
                                    key={service.id}
                                    href={`/services#${service.slug}`}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200"
                                    style={{ color: "#8B949E" }}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    <span
                                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                                      style={{
                                        background: `rgba(${rgb},0.08)`,
                                        color: service.color,
                                      }}
                                    >
                                      <Icon size={14} />
                                    </span>
                                    <span className="text-sm">{service.name}</span>
                                  </a>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={link}
                      href={NAV_HREFS[link] ?? `#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-3 py-3 text-sm rounded-lg transition-colors duration-200"
                      style={{ color: "#8B949E" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link}
                    </a>
                  )
                )}

                {/* Mobile CTA */}
                <div
                  className="mt-3 pt-4 border-t"
                  style={{ borderColor: "#21262D" }}
                >
                  <a
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #A371F7, #00E5C0)",
                      color: "#0D1117",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Book a Consult
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Desktop mega-menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key="mega-menu"
            role="region"
            aria-label="Services menu"
            className="fixed z-[290] hidden md:block"
            style={{
              top:          "5.5rem",
              left:         megaLeft,
              width:        "720px",
              background:   "#161B22",
              border:       "1px solid #30363D",
              borderRadius: "16px",
              boxShadow:    "0 24px 60px rgba(0,0,0,0.5)",
              padding:      "32px",
            }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header label */}
            <p
              style={{
                color:         "#00E5C0",
                fontSize:      "0.75rem",
                fontWeight:    700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom:  "20px",
              }}
            >
              AI Research & Services
            </p>

            {/* 2-col grid — Training spans full width at the bottom */}
            <div className="grid grid-cols-2" style={{ gap: "8px" }}>
              {SERVICES.filter((s) => s.id !== "training-consultancy").map((service) => {
                const Icon = SERVICE_ICON_MAP[service.icon];
                const rgb = hexToRgb(service.color);
                return (
                  <a
                    key={service.id}
                    href={`/services#${service.slug}`}
                    className="flex items-start group"
                    style={{
                      gap:            "12px",
                      padding:        "12px 16px",
                      borderRadius:   "10px",
                      textDecoration: "none",
                      transition:     "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(${rgb},0.06)`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    onClick={() => setMegaOpen(false)}
                  >
                    {/* Icon box */}
                    <span
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width:        "36px",
                        height:       "36px",
                        background:   `rgba(${rgb},0.08)`,
                        border:       `1px solid rgba(${rgb},0.15)`,
                        borderRadius: "8px",
                        color:        service.color,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </span>

                    {/* Text */}
                    <span>
                      <span
                        className="block"
                        style={{ fontSize: "0.875rem", fontWeight: 600, color: "#E6EDF3" }}
                      >
                        {service.name}
                      </span>
                      <span
                        className="block"
                        style={{ fontSize: "0.78rem", color: "#8B949E", marginTop: "2px", lineHeight: 1.5 }}
                      >
                        {service.tagline}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Training & Consultancy — full width */}
            {(() => {
              const training = SERVICES.find((s) => s.id === "training-consultancy")!;
              const Icon = SERVICE_ICON_MAP[training.icon];
              const rgb = hexToRgb(training.color);
              return (
                <a
                  href={`/services#${training.slug}`}
                  className="flex items-start group"
                  style={{
                    gap:            "12px",
                    padding:        "12px 16px",
                    borderRadius:   "10px",
                    textDecoration: "none",
                    marginTop:      "8px",
                    border:         "1px solid #30363D",
                    transition:     "background 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `rgba(${rgb},0.06)`;
                    e.currentTarget.style.borderColor = `rgba(${rgb},0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#30363D";
                  }}
                  onClick={() => setMegaOpen(false)}
                >
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width:        "36px",
                      height:       "36px",
                      background:   `rgba(${rgb},0.08)`,
                      border:       `1px solid rgba(${rgb},0.15)`,
                      borderRadius: "8px",
                      color:        training.color,
                    }}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#E6EDF3" }}>
                      {training.name}
                    </span>
                    <span className="block" style={{ fontSize: "0.78rem", color: "#8B949E", marginTop: "2px", lineHeight: 1.5 }}>
                      {training.tagline}
                    </span>
                  </span>
                </a>
              );
            })()}

            {/* Footer CTA */}
            <div style={{ borderTop: "1px solid #30363D", padding: "16px 16px 0" }}>
              <a
                href="/contact"
                className="flex items-center gap-1.5 text-sm font-medium transition-opacity duration-200 hover:opacity-80"
                style={{ color: "#00E5C0" }}
                onClick={() => setMegaOpen(false)}
              >
                Book a free discovery call
                <ArrowRight size={13} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
