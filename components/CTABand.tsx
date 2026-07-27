"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface CTABandProps {
  heading?:    React.ReactNode;
  subtext?:    string;
  primary?:    { label: string; href: string };
  secondary?:  { label: string; href: string };
}

export default function CTABand({
  heading = <>Ready to <span className="text-gradient-teal">Co-Innovate With Us?</span></>,
  subtext = "Partner with Scitisense Futurize for cutting-edge scientific research, AI product development, and medical IT solutions.",
  primary = { label: "Book a Free Consult", href: "/contact" },
  secondary = { label: "View Success Stories", href: "/stories" },
}: CTABandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{
        background:   "#F5F5F7",
        padding:      "100px 24px",
        borderTop:    "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        ref={ref}
        className={`relative container text-center flex flex-col items-center reveal-up${visible ? " revealed" : ""}`}
        style={{ zIndex: 1 }}
      >
        {/* Heading */}
        <h2
          className="font-extrabold tracking-tight mb-5"
          style={{
            fontSize:      "clamp(2rem, 4vw, 3.5rem)",
            lineHeight:    1.08,
            letterSpacing: "-0.03em",
            color:         "#0A0A0A",
          }}
        >
          {heading}
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontSize:   "clamp(1rem, 1.8vw, 1.15rem)",
            color:      "#6E6E73",
            lineHeight: 1.7,
            maxWidth:   "560px",
            margin:     "0 auto 40px",
          }}
        >
          {subtext}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a
            href={primary.href}
            className="btn-primary-light flex items-center gap-2"
            style={{ padding: "14px 32px", fontSize: "0.95rem" }}
          >
            {primary.label}
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>

          <a
            href={secondary.href}
            className="btn-outline-light flex items-center gap-2"
            style={{ padding: "14px 32px", fontSize: "0.95rem" }}
          >
            {secondary.label}
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
