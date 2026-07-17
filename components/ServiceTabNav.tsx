"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const TABS = [
  { id: "services",       label: "ServiceNow"    },
  { id: "generative-ai",  label: "Generative AI" },
  { id: "computer-vision",label: "Computer Vision" },
  { id: "biomedical",     label: "Biomedical"    },
  { id: "it-services",    label: "IT Services"   },
] as const;

type TabId = typeof TABS[number]["id"];

export default function ServiceTabNav() {
  const noMotion = useReducedMotion() === true;
  const [active,  setActive]  = useState<TabId | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRefsRef = useRef<Map<TabId, Element>>(new Map());

  useEffect(() => {
    setMounted(true);

    // Build section refs
    const refs = sectionRefsRef.current;
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) refs.set(id, el);
    });

    // Visibility: appear after scrolling past hero (1 × vh), hide after last section
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if ((entry.target as HTMLElement).id === "services") {
            setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80% 0px" }
    );

    // Also hide when footer is visible
    const footerObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(false);
      },
      { threshold: 0.1 }
    );

    const serviceEl = document.getElementById("services");
    const footerEl  = document.querySelector("footer");
    if (serviceEl) visibilityObserver.observe(serviceEl);
    if (footerEl)  footerObserver.observe(footerEl);

    // Active section detection
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive((entry.target as HTMLElement).id as TabId);
          }
        });
      },
      { threshold: 0.4 }
    );

    refs.forEach((el) => activeObserver.observe(el));

    // Scroll-based visibility fallback
    const onScroll = () => {
      if (serviceEl) {
        const rect = serviceEl.getBoundingClientRect();
        setVisible(rect.top < window.innerHeight * 0.5);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      visibilityObserver.disconnect();
      footerObserver.disconnect();
      activeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Service sections"
          initial={noMotion ? {} : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={noMotion ? {} : { opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:      "fixed",
            top:           "76px",
            left:          "50%",
            transform:     "translateX(-50%)",
            zIndex:        900,
            display:       "flex",
            gap:           "4px",
            background:    "rgba(8,8,8,0.90)",
            backdropFilter:"blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:        "1px solid rgba(255,255,255,0.10)",
            borderRadius:  "999px",
            padding:       "5px",
            whiteSpace:    "nowrap",
          }}
        >
          {TABS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => {
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActive(id);
                }}
                style={{
                  position:     "relative",
                  padding:      "7px 16px",
                  borderRadius: "999px",
                  border:       "none",
                  background:   "transparent",
                  fontSize:     "0.78rem",
                  fontWeight:   isActive ? 700 : 500,
                  color:        isActive ? "#080808" : "rgba(255,255,255,0.5)",
                  cursor:       "pointer",
                  zIndex:       1,
                  transition:   "color 0.2s ease",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position:     "absolute",
                      inset:        0,
                      borderRadius: "999px",
                      background:   "#00E5C0",
                      zIndex:       -1,
                      display:      "block",
                    }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
