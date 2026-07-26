"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"

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
            display: 'flex', alignItems: 'center',
            gap: '10px', textDecoration: 'none',
          }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #0071E3, #34AADC)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                color: '#fff', fontSize: 14,
                fontWeight: 800, letterSpacing: '-0.05em',
              }}>SF</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: '#1D1D1F', lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}>Scitisense</span>
              <span style={{
                fontSize: 9, fontWeight: 600,
                color: '#0071E3', letterSpacing: '0.12em',
                textTransform: 'uppercase', lineHeight: 1.2,
              }}>Futurize</span>
            </div>
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

          {/* CTA — desktop only */}
          <Link
            href="/contact"
            className="hidden md:inline-flex"
            style={{
              background: '#0071E3',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: 980,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#0077ED'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#0071E3'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
          >
            Request Consultation
            <ArrowRight size={14} />
          </Link>

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
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                background: '#0071E3',
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: 980,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                marginTop: 12,
              }}
            >
              Request Consultation
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
