"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPANY_LINKS = [
  { label: "Home",           href: "/"         },
  { label: "What We Do",     href: "/whatwedo"  },
  { label: "About Us",       href: "/aboutus"   },
  { label: "Success Stories",href: "/stories"   },
  { label: "Contact",        href: "/contact"   },
];

const SERVICE_LINKS = [
  { label: "ITSM",                  href: "/whatwedo" },
  { label: "ITOM",                  href: "/whatwedo" },
  { label: "ITAM",                  href: "/whatwedo" },
  { label: "HRSD",                  href: "/whatwedo" },
  { label: "GRC",                   href: "/whatwedo" },
  { label: "CSM",                   href: "/whatwedo" },
];

const CONTACT_ITEMS = [
  { icon: Mail,   text: "info@colabnowit.com",                                        href: "mailto:info@colabnowit.com" },
  { icon: Phone,  text: "+91 72071 65899",                                             href: "tel:+917207165899"          },
  { icon: MapPin, text: "MIG-678, Midhilapuri Vuda Colony, Madhurawada, Visakhapatnam, AP", href: null },
];

// ─── Logo mark SVG ────────────────────────────────────────────────────────────


// ─── Shared heading style ─────────────────────────────────────────────────────

const colHeadingStyle: React.CSSProperties = {
  color:          "#FFFFFF",
  fontSize:       "0.75rem",
  fontWeight:     700,
  letterSpacing:  "0.1em",
  textTransform:  "uppercase",
  marginBottom:   "20px",
  display:        "block",
};

// ─── Link hover helper — direct DOM, no re-render ────────────────────────────

function linkHover(e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) {
  e.currentTarget.style.color = enter ? "#FFFFFF" : "rgba(255,255,255,0.55)";
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#050505",
        borderTop:       "1px solid rgba(255,255,255,0.06)",
        padding:         "80px 0 0 0",
      }}
    >
      {/* Top connection glow — blends with CTABand above */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           0,
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "600px",
          height:        "200px",
          background:    "radial-gradient(ellipse at 50% 0%, rgba(0,229,192,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex:        0,
        }}
      />
      <div className="relative container px-5 md:px-8" style={{ zIndex: 1 }}>

        {/* ── 4-column grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr_3fr] gap-10 md:gap-8">

          {/* Col 1 — Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="Scitisense Futurize home">
              <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.03em" }}>
                SCITISENSE <span style={{ color: "#00E5C0" }}>FUTURIZE</span>
              </span>
            </a>

            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.75, maxWidth: "240px", marginBottom: "24px" }}>
              Enterprise IT consulting delivering measurable transformation through ServiceNow, BMC&nbsp;Remedy, and ManageEngine.
            </p>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/company/scitisense-futurize"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scitisense Futurize on LinkedIn"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }}
              whileHover={{ color: "#00E5C0", backgroundColor: "rgba(0,229,192,0.10)", boxShadow: "0 0 14px rgba(0,229,192,0.20)" }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </motion.a>
          </div>

          {/* Col 2 — Company links */}
          <div>
            <span style={colHeadingStyle}>Company</span>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", transition: "color 0.18s" }}
                    onMouseEnter={(e) => linkHover(e, true)}
                    onMouseLeave={(e) => linkHover(e, false)}
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", transition: "color 0.18s" }}
                    onMouseEnter={(e) => linkHover(e, true)}
                    onMouseLeave={(e) => linkHover(e, false)}
                  >
                    {link.label}
                  </a>
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
                  <Icon size={15} strokeWidth={1.8} style={{ color: "#00E5C0", marginTop: "2px", flexShrink: 0 }} />
                  {href ? (
                    <a
                      href={href}
                      style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.6, transition: "color 0.18s" }}
                      onMouseEnter={(e) => linkHover(e, true)}
                      onMouseLeave={(e) => linkHover(e, false)}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", marginTop: "60px", paddingBottom: "32px" }}
        >
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
            © {year} Scitisense Futurize Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {(["Privacy Policy", "Terms of Service"] as const).map((label) => (
              <a
                key={label}
                href="#"
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", transition: "color 0.18s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
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
