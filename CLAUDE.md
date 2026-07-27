# CLAUDE.md

## Project
Premium IT-services startup marketing site.
Stack: Next.js 15, Tailwind CSS, Motion (motion.dev), TypeScript.

## UI/UX Skill Usage
Before making ANY design decision, query the ui-ux-pro-max skill:

- For overall style:
  python ../.claude/skills/scripts/search.py "dark glassmorphism SaaS" --domain style --stack nextjs

- For color palette:
  python ../.claude/skills/scripts/search.py "dark tech enterprise" --domain color

- For typography:
  python ../.claude/skills/scripts/search.py "modern SaaS landing page" --domain typography

- For landing page structure:
  python ../.claude/skills/scripts/search.py "IT consulting landing page" --domain landing

- For UX patterns:
  python ../.claude/skills/scripts/search.py "enterprise B2B" --domain ux

ALWAYS run these queries first, then apply what they return.

## Design System (locked)
- Background: #FAFAFA | Card/Surface: #FFFFFF | Secondary surface: #F5F5F7
- Foreground: #0A0A0A | Muted foreground: #6E6E73
- Primary/Accent: #0071E3 (Apple blue) → #34AADC gradient | Primary-foreground: #FFFFFF
- Border: #D2D2D7 | Radius: 0.875rem (cards), 980px (pill buttons)
- Font: Plus Jakarta Sans (single family, weights 400–800)
- Motion curve: cubic-bezier(0.22, 1, 0.36, 1) / cubic-bezier(0.23, 1, 0.32, 1), 0.4–0.9s
- Reveal pattern: IntersectionObserver + CSS transition (`.animate-on-scroll`/`.reveal-up`), not Framer Motion, for new sections
- Cards: `.service-card-light` / `.spotlight-card` (white bg, #D2D2D7 border, soft shadow, blue spotlight hover glow)
- Section padding: 120px desktop, 64px mobile
- Max width: 1200px (1280px on some full-bleed sections)

## Components (one file each)
/components/Navbar.tsx
/components/Hero.tsx
/components/Services.tsx
/components/Stats.tsx
/components/Logos.tsx
/components/Stories.tsx
/components/CTABand.tsx
/components/Footer.tsx

## Rules
- Mobile-first: 375 / 768 / 1440px
- Motion: transform + opacity ONLY
- prefers-reduced-motion fallback on everything
- No Lorem Ipsum — real IT consulting copy
- No placeholder images — CSS gradients or SVG only