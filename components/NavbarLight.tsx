"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Announcements', href: '/stories' },
  { label: 'About', href: '/aboutus' },
  { label: 'Contact', href: '/contact' },
]

export default function NavbarLight() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(250,250,250,0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.5s ease',
        }}
      >
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '16px 40px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            {/* Logo image */}
            <img
              src="/logosci2.png"
              alt="Scitisense Futurize Logo"
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
              }}
            />

            {/* Company name text */}
            <span style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#1D1D1F",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-plus-jakarta-sans)",
              lineHeight: 1.2,
            }}>
              Scitisense Futurize Pvt Ltd
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{
            alignItems: 'center', gap: 32,
          }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14, fontWeight: 500,
                  color: '#6E6E73', textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1D1D1F')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6E6E73')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#1D1D1F',
              padding: 4,
              cursor: 'pointer',
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden"
            style={{
              background: 'rgba(255,255,255,0.98)',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              padding: '16px 40px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 15, fontWeight: 500,
                  color: '#1D1D1F', textDecoration: 'none',
                  padding: '10px 0',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
