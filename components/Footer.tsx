"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPANY_LINKS = [
  { label: "Home",          href: "/"         },
  { label: "Services",      href: "/services" },
  { label: "Announcements", href: "/stories"  },
  { label: "About",         href: "/aboutus"  },
  { label: "Contact",       href: "/contact"  },
];

const SERVICE_LINKS = [
  { label: "Computer Vision",       href: "/services#computer-vision" },
  { label: "IoT & Wearable",        href: "/services#iot-wearable"     },
  { label: "ML & DL",               href: "/services#ml-dl"            },
  { label: "NLP & LLM",             href: "/services#nlp-llm"          },
  { label: "Generative AI",         href: "/services#generative-ai"   },
  { label: "Agentic AI",            href: "/services#agentic-ai"      },
  { label: "Medical IT",            href: "/services#medical-it"      },
  { label: "Training",              href: "/whatwedo"                 },
];

const CONTACT_ITEMS = [
  { icon: Mail,  text: "info@scitisensefuturize.in", href: "mailto:info@scitisensefuturize.in" },
  { icon: Phone, text: "+91 8500631655",              href: "tel:+918500631655"                 },
];

const FOOTER_ADDRESS = "House No 65-6-131, New Gajuwaka MH Colony, Visakhapatnam, AP 530026";

// ─── Shared heading style ─────────────────────────────────────────────────────

const colHeadingStyle: React.CSSProperties = {
  color:          "#86868B",
  fontSize:       "0.6875rem",
  fontWeight:     700,
  letterSpacing:  "0.08em",
  textTransform:  "uppercase",
  marginBottom:   "20px",
  display:        "block",
};

// ─── Link hover helper — direct DOM, no re-render ────────────────────────────

function linkHover(e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) {
  e.currentTarget.style.color = enter ? "#0071E3" : "#6E6E73";
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop:       "1px solid rgba(0,0,0,0.08)",
        padding:         "60px 0 0 0",
      }}
    >
      <div className="relative container px-5 md:px-8" style={{ zIndex: 1 }}>

        {/* ── 4-column grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr_3fr] gap-10 md:gap-8">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="Scitisense Futurize home">
              <div style={{
                width: 36, height: 36,
                background: "linear-gradient(135deg, #0071E3, #34AADC)",
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: "-0.05em" }}>SF</span>
              </div>
              <span style={{ color: "#0A0A0A", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.03em" }}>
                Scitisense <span style={{ color: "#0071E3" }}>Futurize</span>
              </span>
            </Link>

            <p style={{ color: "#6E6E73", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "10px" }}>
              AI Research &amp; Technology
            </p>

            <p style={{ color: "#6E6E73", fontSize: "0.875rem", lineHeight: 1.75, maxWidth: "260px", marginBottom: "24px" }}>
              Recognized leader in Scientific R&amp;D and Information Technology — solving complex challenges in modern science and healthcare.
            </p>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/scitisense-futurize"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scitisense Futurize on LinkedIn"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
              style={{
                backgroundColor: "#F5F5F7",
                border: "1px solid #D2D2D7",
                color: "#6E6E73",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0071E3";
                e.currentTarget.style.backgroundColor = "rgba(0,113,227,0.08)";
                e.currentTarget.style.borderColor = "rgba(0,113,227,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6E6E73";
                e.currentTarget.style.backgroundColor = "#F5F5F7";
                e.currentTarget.style.borderColor = "#D2D2D7";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          {/* Col 2 — Company links */}
          <div>
            <span style={colHeadingStyle}>Company</span>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "#6E6E73", fontSize: "0.875rem", transition: "color 0.18s" }}
                    onMouseEnter={(e) => linkHover(e, true)}
                    onMouseLeave={(e) => linkHover(e, false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Service links */}
          <div>
            <span style={colHeadingStyle}>Services</span>
            <ul className="flex flex-col gap-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "#6E6E73", fontSize: "0.875rem", transition: "color 0.18s" }}
                    onMouseEnter={(e) => linkHover(e, true)}
                    onMouseLeave={(e) => linkHover(e, false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <span style={colHeadingStyle}>Contact Us</span>
            <ul className="flex flex-col gap-4">
              {CONTACT_ITEMS.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={15} strokeWidth={1.8} style={{ color: "#0071E3", marginTop: "2px", flexShrink: 0 }} />
                  <a
                    href={href}
                    style={{ color: "#6E6E73", fontSize: "0.875rem", lineHeight: 1.6, transition: "color 0.18s" }}
                    onMouseEnter={(e) => linkHover(e, true)}
                    onMouseLeave={(e) => linkHover(e, false)}
                  >
                    {text}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.8} style={{ color: "#0071E3", marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "0.8rem", color: "#86868B", lineHeight: 1.5 }}>
                  {FOOTER_ADDRESS}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "24px", marginTop: "48px", paddingBottom: "40px" }}
        >
          <p style={{ color: "#86868B", fontSize: "0.8rem" }}>
            © {year} Scitisense Futurize Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {(["Privacy Policy", "Terms"] as const).map((label) => (
              <a
                key={label}
                href="#"
                style={{ color: "#6E6E73", fontSize: "0.8rem", transition: "color 0.18s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6E6E73")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
