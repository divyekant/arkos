# Arkos Brand Site — Design Document

**Date:** 2026-03-01
**Status:** Approved
**Project:** arkos

---

## Overview

Arkos is the umbrella brand for an open-source ecosystem of dev tools that handle everything around code — testing, documentation, memory, orchestration, project management — so AI coding agents focus on writing code and developers focus on shipping.

This document describes the design for the Arkos landing page and documentation site.

## Brand Identity

- **Name:** Arkos (from Greek *archō* — to lead, to begin)
- **Tagline:** "Tools forged for the age of AI-native development"
- **Positioning:** OSS ecosystem for AI-native dev workflow. Each tool handles a specific domain. Together they cover the other 80% that isn't code writing.
- **Naming convention:** Classical/mythological names for major tools
- **Primary audience:** Open source community, developers/builders using AI coding tools
- **Secondary audience (future):** Potential employers/clients (portfolio angle)

### Tools in the Ecosystem (at launch)

| Tool | Domain | Origin |
|------|--------|--------|
| Apollo | Project governance & conventions | God of order |
| Hermes | Audience-specific documentation | Messenger of the gods |
| Delphi | Test scenario generation & execution | The oracle |
| Carto | Codebase intelligence & indexing | Cartography |
| Memories | Persistent semantic memory | Mnemosyne |
| Conductor | Skill orchestration & pipelines | Ensemble leader |
| SwarmEngine | Multi-agent DAG orchestration | Swarm intelligence |
| PersonaSmith | AI agent personas library | The craftsman |
| Learning-Skill | Failure capture & cross-session learning | Experience |

**Excluded from launch:** Kai (personal EA — stays private), SnapAsset, HiveBuild (product apps, not dev tools)

## Technical Stack

- **Framework:** Astro + Starlight (docs framework)
- **Hosting:** Cloudflare Pages (auto-deploy from GitHub)
- **Domain:** `arkos.divyekant.com` (Cloudflare DNS)
- **Package manager:** npm
- **Language:** TypeScript

### Why Astro + Starlight

- Content-first: docs are `.md` files in content collections
- Zero JS by default — visual effects use CSS, minimal vanilla JS
- Starlight provides docs infrastructure (search, sidebar, dark mode, mobile)
- Custom landing page with full creative control via Astro components
- Cloudflare Pages has first-class Astro support
- Content model enables future Hermes auto-generation of docs

## Site Architecture

```
arkos.divyekant.com/
├── /                        # Custom landing page (not Starlight)
├── /tools/                  # Ecosystem overview — grid of all tools
├── /tools/[tool-name]/      # Individual tool pages (Starlight docs)
│   ├── overview             # What it does, key features
│   ├── getting-started      # Install + quick start
│   ├── guides/              # Usage guides
│   └── reference/           # API/CLI reference
├── /ecosystem/              # How tools connect — architecture diagram
├── /blog/                   # Ecosystem updates, release notes
└── /about/                  # About the project, contributing
```

## Visual Design

### Color Palette

- **Background:** `#0a0a0a` (near-black)
- **Dark gold:** `#d4af37`
- **Bright gold:** `#f5d060`
- **Near-white highlight:** `#fffbe6`
- **Muted gold (borders):** `rgba(212, 175, 55, 0.08)`
- **Text:** `#e5e5e5` (light gray), `#a3a3a3` (muted)

### Visual Techniques

All achievable with CSS + minimal vanilla JS. No heavy animation libraries.

#### 1. Gold Particle Constellation (Hero)
Gold particles float slowly on a dark canvas, connecting with thin lines when near each other — neural network / star map aesthetic. Lightweight canvas (~30 lines JS in an Astro island). Mouse hover gently attracts nearby particles.

#### 2. Aurora Glow (Hero Background)
Three CSS-animated gold-toned blobs behind the particle constellation. Slow-moving ambient light creates warmth on the dark canvas.

CSS: Three absolutely positioned divs with large `box-shadow` values in amber tones, animated along different paths at different durations (10s, 15s, 20s).

#### 3. Grain/Noise Overlay (Full Page)
SVG `feTurbulence` noise filter at 4% opacity with `mix-blend-mode: overlay`. Adds texture and depth, prevents flat sterile feel. Combined with aurora, creates a parchment-like warmth — ancient meets modern.

#### 4. Metallic Shimmer Text (Hero Heading)
"ARKOS" rendered with gold gradient (`#d4af37` → `#f5d060` → `#fffbe6` → `#f5d060` → `#d4af37`) using `background-clip: text`. Shimmer animation cycles the gradient position. Letter-by-letter gold fill entrance animation on page load (starts hollow/outlined, fills with gold left-to-right).

#### 5. Grid Pattern (Background)
Subtle gold-tinted CSS grid lines (`rgba(212,175,55,0.03)`) at 60px intervals below the hero. Provides structural visual texture.

#### 6. Rotating Border Glow (Tool Cards)
CSS `@property` conic gradient creates a gold light beam that orbits around each card border. Uses `--border-angle` custom property with `360deg` animation.

#### 7. Cursor Spotlight (Tool Cards)
Radial gold glow follows mouse position on card hover. CSS custom properties `--x`, `--y` set via ~6 lines of vanilla JS mousemove handler.

#### 8. Holographic Tilt (Tool Cards)
CSS `perspective` + `transform: rotateX/Y` — cards tilt slightly toward cursor on hover with a holographic light reflection that shifts across the surface. Combined with rotating border and cursor spotlight.

#### 9. Scroll-Driven Animations (All Sections)
CSS `animation-timeline: view()` — elements fade up on scroll with zero JS. Progressive enhancement with `@supports` fallback. Tool cards use staggered `nth-child` delays for cascade reveal effect with subtle gold glow burst on appearance.

#### 10. Animated Ecosystem Diagram
SVG with:
- Gold-bordered circles as tool nodes with icons
- Animated flowing dashes on connection lines (direction = data flow)
- Hover on a node highlights its connections, dims unrelated ones
- Subtle pulse on each node (heartbeat)

#### 11. Terminal Typing Demo (Quick Start)
Styled code block that types itself out letter-by-letter with blinking gold cursor. Simulated output appears after command "completes." Not a real terminal — pure animation.

#### 12. Background Parallax Layers
Three depth layers at different scroll speeds:
- Far: aurora glow (slowest)
- Middle: grid pattern (medium)
- Front: grain overlay (fixed)

#### 13. Glassmorphism (Nav, Panels)
`backdrop-filter: blur(12px) brightness(0.8) saturate(150%)` with gold-tinted border. Used on sticky navigation bar and feature panels.

#### 14. View Transitions (Page Navigation)
Astro built-in view transitions for smooth cross-page fade/slide.

#### 15. Gold Shiki Theme (Code Blocks)
Custom syntax highlighting theme with gold/amber token colors matching Arkos branding.

#### 16. Footer Constellation
Sparse version of hero particle constellation forming an abstract shape.

### Landing Page Sections

1. **Hero** — Particle constellation + aurora background. "ARKOS" metallic shimmer heading. Tagline. Dual CTA (solid gold "Get Started" + ghost "View on GitHub").

2. **Problem Statement** — "AI writes code. Who handles everything else?" Each capability word (Testing, Docs, Memory, etc.) glows gold briefly as it scroll-reveals. "Arkos handles the other 80%."

3. **Tool Showcase** — 9 cards in 3x3 grid. Cascade reveal on scroll. Each card: tool icon, name, one-liner description, "Learn more" link. Holographic tilt + rotating border + cursor spotlight on hover.

4. **Ecosystem Architecture** — Animated SVG showing how tools connect. Conductor at center. Flowing dash animations on connections. Interactive hover highlighting.

5. **Quick Start** — Terminal typing demo showing `npx carto index .` with simulated output. Gold-themed Shiki code block.

6. **Footer** — Sparse constellation background. GitHub, Docs, Contributing links.

### Tool Page Template

Each tool follows a consistent docs structure:

```markdown
---
title: [Tool Name]
description: [One-liner]
---

## What it does
[2-3 sentences — problem it solves and how]

## Key Features
[Bullet list of capabilities]

## How it fits
[Where it sits in the ecosystem, what it connects to]

## Quick Start
[Install + first command/usage]

## Architecture
[How it works internally — diagram if useful]
```

## Project Structure

```
arkos/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── src/
│   ├── assets/
│   │   ├── arkos-logo.svg
│   │   └── tool-icons/          # One SVG icon per tool
│   ├── components/
│   │   ├── Landing.astro        # Full landing page
│   │   ├── Hero.astro           # Particle constellation + aurora
│   │   ├── ParticleCanvas.astro # Canvas island for particles
│   │   ├── ProblemStatement.astro
│   │   ├── ToolCard.astro       # Holographic tilt card
│   │   ├── ToolShowcase.astro   # 3x3 grid with cascade
│   │   ├── EcosystemDiagram.astro  # Animated SVG
│   │   ├── TerminalDemo.astro   # Typing animation
│   │   └── Footer.astro         # Constellation footer
│   ├── content/
│   │   ├── docs/
│   │   │   ├── tools/
│   │   │   │   ├── memories/
│   │   │   │   ├── carto/
│   │   │   │   ├── apollo/
│   │   │   │   ├── delphi/
│   │   │   │   ├── hermes/
│   │   │   │   ├── conductor/
│   │   │   │   ├── swarm-engine/
│   │   │   │   ├── persona-smith/
│   │   │   │   └── learning-skill/
│   │   │   ├── ecosystem/
│   │   │   │   └── index.md
│   │   │   └── about/
│   │   │       └── index.md
│   │   └── blog/
│   ├── pages/
│   │   └── index.astro          # Landing page entry
│   └── styles/
│       ├── custom.css           # Brand overrides for Starlight
│       ├── aurora.css           # Aurora glow effect
│       ├── grain.css            # Noise overlay
│       └── animations.css       # Scroll, shimmer, cascade
├── public/
│   └── favicon.svg
├── docs/
│   └── plans/
│       └── 2026-03-01-arkos-brand-site-design.md
└── wrangler.toml                # Cloudflare Pages config (optional)
```

## Deployment

1. GitHub repo: `arkos` under user account
2. Cloudflare Pages: connect to GitHub repo, auto-deploy on push
3. Custom domain: `arkos.divyekant.com` via Cloudflare DNS CNAME
4. Preview deploys: automatic for PRs

## Future Considerations (Not in Scope)

- Hermes auto-sync: tool repos push docs to arkos site repo
- Search analytics: track what people search for in docs
- Interactive demos: embedded live playgrounds per tool
- `arkos.dev` domain: when ecosystem is mature enough for independent brand
- Portfolio/prospect angle: add "Built by" section when targeting employers
