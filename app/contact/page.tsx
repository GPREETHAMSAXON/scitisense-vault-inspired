"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

export default function Contact() {
  const noMotion = useReducedMotion() === true;

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputBase: React.CSSProperties = {
    backgroundColor:  "var(--bg-surface)",
    border:           "1px solid var(--border)",
    borderRadius:     "10px",
    color:            "var(--text-primary)",
    fontSize:         "0.92rem",
    padding:          "0.75rem 1rem",
    width:            "100%",
    outline:          "none",
    transition:       "border-color 0.2s",
  };

  const LOCATIONS = [
    {
      country: "India",
      icon: MapPin,
      address: "House No 65-6-131, New Gajuwaka MH Colony, Visakhapatnam, Andhra Pradesh 530026",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="relative" style={{ backgroundColor: "transparent" }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative text-center overflow-hidden"
          style={{
            paddingTop: "160px",
            paddingBottom: "80px",
            backgroundImage:
              "radial-gradient(ellipse at 25% 55%, rgba(0,229,192,0.08) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 75% 30%, rgba(0,229,192,0.04) 0%, transparent 55%)",
          }}
        >
          <div className="container px-5 md:px-8">
            <motion.p
              className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
              {...fadeUp(noMotion)}
            >
              Contact Us
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
              Get in Touch With Our Team
            </motion.h1>
            <motion.p
              style={{
                fontSize:  "clamp(0.95rem, 1.7vw, 1.05rem)",
                color:     "var(--text-secondary)",
                lineHeight: 1.78,
                maxWidth:  "600px",
                margin:    "0 auto",
                textAlign: "center",
              }}
              {...fadeUp(noMotion, 0.16)}
            >
              Ready to start your transformation? Drop us a message and
              a consultant will respond within one business day.
            </motion.p>
          </div>
        </section>

        {/* ── Form + Info ───────────────────────────────────────────────────── */}
        <section style={{ paddingTop: "80px", paddingBottom: "120px" }}>
          <div className="container px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

              {/* Form — 3 cols */}
              <motion.div className="lg:col-span-3" {...fadeUp(noMotion)}>
                <div className="glass-card" style={{ padding: "32px" }}>
                  {sent ? (
                    <div className="text-center py-12">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: "var(--accent-dim)" }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 13l4 4L19 7" stroke="#00E5C0" strokeWidth="2.2"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Message Sent!
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        We&apos;ll be in touch within one business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold mb-2 tracking-wide"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={handleChange}
                          style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "rgba(163,113,247,0.50)"; e.target.style.boxShadow = "0 0 0 3px rgba(163,113,247,0.15)"; }}
                          onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold mb-2 tracking-wide"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Contact Number *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 8500631655"
                          value={form.phone}
                          onChange={handleChange}
                          style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "rgba(163,113,247,0.50)"; e.target.style.boxShadow = "0 0 0 3px rgba(163,113,247,0.15)"; }}
                          onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold mb-2 tracking-wide"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={handleChange}
                          style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "rgba(163,113,247,0.50)"; e.target.style.boxShadow = "0 0 0 3px rgba(163,113,247,0.15)"; }}
                          onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold mb-2 tracking-wide"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell us about your project or challenge…"
                          value={form.message}
                          onChange={handleChange}
                          style={{ ...inputBase, resize: "vertical" }}
                          onFocus={(e) => { e.target.style.borderColor = "rgba(163,113,247,0.50)"; e.target.style.boxShadow = "0 0 0 3px rgba(163,113,247,0.15)"; }}
                          onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold"
                        style={{ background: "linear-gradient(135deg, #A371F7, #00E5C0)", color: "#0D1117", fontWeight: 700, boxShadow: "0 0 30px rgba(163,113,247,0.3)" }}
                        whileHover={noMotion ? {} : { scale: 1.02, boxShadow: "0 0 48px rgba(163,113,247,0.5)" }}
                        whileTap={noMotion ? {}  : { scale: 0.97 }}
                        transition={{ duration: 0.2, ease }}
                      >
                        Send Message
                        <ArrowRight size={15} strokeWidth={2.5} />
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Info — 2 cols */}
              <motion.div
                className="lg:col-span-2 flex flex-col gap-6"
                {...fadeUp(noMotion, 0.12)}
              >
                {/* Direct contact */}
                <div className="glass-card" style={{ padding: "28px 24px" }}>
                  <p
                    className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase mb-5"
                    style={{ color: "var(--accent)" }}
                  >
                    Direct Contact
                  </p>
                  <div className="flex flex-col" style={{ gap: "20px" }}>
                    <a
                      href="mailto:info@scitisensefuturize.in"
                      className="flex items-start gap-3 group"
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                      >
                        <Mail size={14} />
                      </span>
                      <span>
                        <span
                          className="block text-xs font-medium mb-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Email
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          info@scitisensefuturize.in
                        </span>
                      </span>
                    </a>

                    <a
                      href="tel:+918500631655"
                      className="flex items-start gap-3 group"
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                      >
                        <Phone size={14} />
                      </span>
                      <span>
                        <span
                          className="block text-xs font-medium mb-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Phone
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          +91 8500631655
                        </span>
                      </span>
                    </a>
                  </div>
                </div>

                {/* Offices */}
                <div className="glass-card" style={{ padding: "28px 24px" }}>
                  <p
                    className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase mb-5"
                    style={{ color: "var(--accent)" }}
                  >
                    Our Offices
                  </p>
                  <div className="flex flex-col" style={{ gap: "24px" }}>
                    {LOCATIONS.map((loc) => (
                      <div key={loc.country} className="flex items-start gap-3">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                        >
                          <MapPin size={14} />
                        </span>
                        <span>
                          <span
                            className="block text-xs font-semibold"
                            style={{ color: "var(--text-primary)", marginBottom: "8px" }}
                          >
                            {loc.country}
                          </span>
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {loc.address}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
