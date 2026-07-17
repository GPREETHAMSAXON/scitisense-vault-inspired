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
- Background: #0A0B0F | Navy: #0D1424 | Accent: #22D3EE
- Motion curve: cubic-bezier(0.22, 1, 0.36, 1), 0.4–0.8s
- Cards: glassmorphic (rgba(255,255,255,0.04) + backdrop-blur-md)
- Section padding: 120px desktop, 64px mobile
- Max width: 1200px

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