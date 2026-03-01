# Arkos Brand Site — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Arkos ecosystem landing page and documentation site with premium visual design (gold aurora, particle constellation, holographic cards) on Astro + Starlight, deployed to Cloudflare Pages.

**Architecture:** Astro + Starlight docs framework. Custom landing page at `src/pages/index.astro` (fully custom, no Starlight layout). All docs under `src/content/docs/tools/` using Starlight's content collections. CSS-first visual effects with minimal vanilla JS for particle canvas and card interactions. Cloudflare Pages auto-deploy from GitHub.

**Tech Stack:** Astro 5.x, Starlight, TypeScript, CSS (custom properties, @property, scroll-driven animations), vanilla JS (canvas particles, mousemove handlers), Cloudflare Pages.

**Design Doc:** `docs/plans/2026-03-01-arkos-brand-site-design.md`

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json` (via npm create)
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/content/docs/index.mdx` (Starlight default — will be overridden by custom landing)
- Create: `.gitignore`

**Step 1: Scaffold Astro + Starlight project**

Run inside `/Users/divyekant/Projects/arkos/`:

```bash
# Move existing docs out temporarily
mv docs /tmp/arkos-docs-backup

# Scaffold into current directory (arkos already exists as git repo)
cd /Users/divyekant/Projects/arkos
npm create astro@latest -- --template starlight --yes .
```

If the scaffolder refuses to use a non-empty directory, scaffold into a temp dir and move files:

```bash
cd /tmp
npm create astro@latest -- --template starlight --yes arkos-scaffold
# Copy scaffolded files into arkos
cp -r /tmp/arkos-scaffold/* /Users/divyekant/Projects/arkos/
cp /tmp/arkos-scaffold/.gitignore /Users/divyekant/Projects/arkos/
rm -rf /tmp/arkos-scaffold
```

Then restore docs:
```bash
mv /tmp/arkos-docs-backup /Users/divyekant/Projects/arkos/docs
```

**Step 2: Verify scaffold works**

```bash
cd /Users/divyekant/Projects/arkos
npm install
npm run dev
```

Expected: Dev server starts at `http://localhost:4321` showing default Starlight site.

**Step 3: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold Astro + Starlight project"
```

---

## Task 2: Astro + Starlight Configuration

**Files:**
- Modify: `astro.config.mjs`
- Create: `src/styles/custom.css` (empty initially)

**Step 1: Configure astro.config.mjs**

Replace the contents of `astro.config.mjs` with:

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://arkos.divyekant.com',
  integrations: [
    starlight({
      title: 'Arkos',
      logo: {
        src: './src/assets/arkos-logo.svg',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/niceguy135' },
      ],
      sidebar: [
        {
          label: 'Tools',
          items: [
            { label: 'Overview', slug: 'tools/index' },
            {
              label: 'Infrastructure',
              items: [
                { slug: 'tools/memories/index' },
                { slug: 'tools/carto/index' },
                { slug: 'tools/swarm-engine/index' },
              ],
            },
            {
              label: 'Dev Workflow',
              items: [
                { slug: 'tools/conductor/index' },
                { slug: 'tools/apollo/index' },
                { slug: 'tools/delphi/index' },
                { slug: 'tools/hermes/index' },
                { slug: 'tools/learning-skill/index' },
              ],
            },
            {
              label: 'Agent Frameworks',
              items: [
                { slug: 'tools/persona-smith/index' },
              ],
            },
          ],
        },
        {
          label: 'Ecosystem',
          autogenerate: { directory: 'ecosystem' },
        },
        {
          label: 'About',
          autogenerate: { directory: 'about' },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
    }),
  ],
});
```

**Step 2: Create empty custom CSS file**

Create `src/styles/custom.css`:

```css
/* Arkos brand overrides for Starlight */
```

**Step 3: Verify config loads**

```bash
npm run dev
```

Expected: Site loads with "Arkos" title and configured sidebar structure (pages will 404 until we create content).

**Step 4: Commit**

```bash
git add astro.config.mjs src/styles/custom.css
git commit -m "chore: configure Starlight with Arkos branding and sidebar"
```

---

## Task 3: Brand Assets — Logo and Favicon

**Files:**
- Create: `src/assets/arkos-logo.svg`
- Create: `public/favicon.svg`
- Create: `src/assets/tool-icons/apollo.svg`
- Create: `src/assets/tool-icons/hermes.svg`
- Create: `src/assets/tool-icons/delphi.svg`
- Create: `src/assets/tool-icons/carto.svg`
- Create: `src/assets/tool-icons/memories.svg`
- Create: `src/assets/tool-icons/conductor.svg`
- Create: `src/assets/tool-icons/swarm-engine.svg`
- Create: `src/assets/tool-icons/persona-smith.svg`
- Create: `src/assets/tool-icons/learning-skill.svg`

**Step 1: Create Arkos logo SVG**

Create `src/assets/arkos-logo.svg` — a clean, minimal wordmark in gold (#d4af37) on transparent background. Use a geometric sans-serif style with slight Greek architectural motifs (tapered strokes, subtle serifs on the A and K). Keep it simple — a wordmark, not an icon+wordmark combo. Height: 32px intended display size.

**Step 2: Create favicon**

Create `public/favicon.svg` — the letter "A" from the Arkos logo in gold on a dark (#0a0a0a) circle. Simple, recognizable at 16x16.

**Step 3: Create 9 tool icons**

Create minimal geometric SVG icons in `src/assets/tool-icons/`, one per tool. Each icon should be a single recognizable symbol in gold (#d4af37), 24x24 viewBox, stroke-based (not filled), 2px stroke width:

| Tool | Icon Concept |
|------|-------------|
| Apollo | Laurel wreath (governance/order) |
| Hermes | Winged message/envelope |
| Delphi | Eye/oracle (truth/vision) |
| Carto | Compass/map pin |
| Memories | Brain/neural node |
| Conductor | Baton/wand |
| SwarmEngine | Connected nodes/mesh |
| PersonaSmith | Mask/face silhouette |
| Learning-Skill | Book with lightning bolt |

**Step 4: Verify logo renders in nav**

```bash
npm run dev
```

Expected: Arkos gold logo appears in top-left nav.

**Step 5: Commit**

```bash
git add src/assets/ public/favicon.svg
git commit -m "feat: add Arkos logo, favicon, and tool icons"
```

---

## Task 4: Global Styles — Dark Theme, Colors, Grain, Grid

**Files:**
- Modify: `src/styles/custom.css`
- Create: `src/styles/aurora.css`
- Create: `src/styles/grain.css`
- Create: `src/styles/animations.css`

**Step 1: Write Starlight dark theme overrides**

Update `src/styles/custom.css`:

```css
/* Arkos Brand Overrides for Starlight */

:root {
  /* Gold palette */
  --arkos-gold: #d4af37;
  --arkos-gold-bright: #f5d060;
  --arkos-gold-highlight: #fffbe6;
  --arkos-gold-muted: rgba(212, 175, 55, 0.08);
  --arkos-gold-border: rgba(212, 175, 55, 0.15);
  --arkos-bg: #0a0a0a;
  --arkos-bg-elevated: #111111;
  --arkos-text: #e5e5e5;
  --arkos-text-muted: #a3a3a3;
}

/* Override Starlight's dark theme colors */
:root[data-theme='dark'] {
  --sl-color-bg: var(--arkos-bg);
  --sl-color-bg-nav: rgba(10, 10, 10, 0.8);
  --sl-color-bg-sidebar: var(--arkos-bg);
  --sl-color-text: var(--arkos-text);
  --sl-color-text-accent: var(--arkos-gold);
  --sl-color-accent-high: var(--arkos-gold-bright);
  --sl-color-accent: var(--arkos-gold);
  --sl-color-accent-low: rgba(212, 175, 55, 0.15);
  --sl-color-hairline: var(--arkos-gold-muted);
}

/* Force dark theme as default */
:root {
  color-scheme: dark;
}

/* Glassmorphism header */
header {
  backdrop-filter: blur(12px) brightness(0.8) saturate(150%);
  -webkit-backdrop-filter: blur(12px) brightness(0.8) saturate(150%);
  border-bottom: 1px solid var(--arkos-gold-muted);
}

/* Gold-tinted grid background for docs pages */
.sl-markdown-content {
  background-image:
    linear-gradient(rgba(212, 175, 55, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212, 175, 55, 0.015) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Link styling */
a:hover {
  color: var(--arkos-gold-bright);
}
```

**Step 2: Create grain overlay**

Create `src/styles/grain.css`:

```css
/* SVG noise grain overlay — applied via inline SVG in layout */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04;
  mix-blend-mode: overlay;
}

.grain-overlay svg {
  width: 100%;
  height: 100%;
}
```

**Step 3: Create aurora glow styles**

Create `src/styles/aurora.css`:

```css
/* Aurora glow — three animated gold-toned blobs */
.aurora {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.aurora-blob:nth-child(1) {
  width: 40vmax;
  height: 40vmax;
  background: rgba(212, 175, 55, 0.12);
  top: -10%;
  left: -10%;
  animation: aurora-drift-1 15s ease-in-out infinite alternate;
}

.aurora-blob:nth-child(2) {
  width: 35vmax;
  height: 35vmax;
  background: rgba(245, 208, 96, 0.08);
  top: 50%;
  right: -15%;
  animation: aurora-drift-2 20s ease-in-out infinite alternate;
}

.aurora-blob:nth-child(3) {
  width: 30vmax;
  height: 30vmax;
  background: rgba(180, 130, 20, 0.10);
  bottom: -10%;
  left: 30%;
  animation: aurora-drift-3 12s ease-in-out infinite alternate;
}

@keyframes aurora-drift-1 {
  from { transform: translate(0, 0) rotate(0deg); }
  to { transform: translate(15vw, 10vh) rotate(30deg); }
}

@keyframes aurora-drift-2 {
  from { transform: translate(0, 0) rotate(0deg); }
  to { transform: translate(-20vw, -15vh) rotate(-20deg); }
}

@keyframes aurora-drift-3 {
  from { transform: translate(0, 0) rotate(0deg); }
  to { transform: translate(10vw, -20vh) rotate(15deg); }
}
```

**Step 4: Create scroll-driven animations**

Create `src/styles/animations.css`:

```css
/* Metallic shimmer for gold text */
.shimmer-text {
  background: linear-gradient(
    90deg,
    #d4af37 0%,
    #f5d060 25%,
    #fffbe6 50%,
    #f5d060 75%,
    #d4af37 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 200% center; }
  50% { background-position: -200% center; }
}

/* Scroll-driven fade-in-up */
@supports (animation-timeline: view()) {
  .scroll-reveal {
    animation: fade-in-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Staggered cascade for tool cards */
  .cascade-item:nth-child(1) { animation-range: entry 0% entry 80%; }
  .cascade-item:nth-child(2) { animation-range: entry 5% entry 85%; }
  .cascade-item:nth-child(3) { animation-range: entry 10% entry 90%; }
  .cascade-item:nth-child(4) { animation-range: entry 15% entry 95%; }
  .cascade-item:nth-child(5) { animation-range: entry 20% entry 100%; }
  .cascade-item:nth-child(6) { animation-range: entry 25% entry 100%; }
  .cascade-item:nth-child(7) { animation-range: entry 30% entry 100%; }
  .cascade-item:nth-child(8) { animation-range: entry 35% entry 100%; }
  .cascade-item:nth-child(9) { animation-range: entry 40% entry 100%; }
}

/* Fallback: just show elements without animation */
@supports not (animation-timeline: view()) {
  .scroll-reveal,
  .cascade-item {
    opacity: 1;
    transform: none;
  }
}

/* Rotating border glow for cards */
@property --border-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}

@keyframes rotate-border {
  to { --border-angle: 360deg; }
}

.glow-border {
  background:
    linear-gradient(var(--arkos-bg-elevated), var(--arkos-bg-elevated)) padding-box,
    conic-gradient(
      from var(--border-angle),
      #d4af37,
      transparent 40%,
      transparent 60%,
      #d4af37
    ) border-box;
  border: 1.5px solid transparent;
  border-radius: 12px;
  animation: rotate-border 4s linear infinite;
}

/* Gold cursor spotlight */
.spotlight-card {
  position: relative;
  overflow: hidden;
}

.spotlight-card::after {
  content: '';
  position: absolute;
  width: 250px;
  height: 250px;
  opacity: 0;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.2),
    transparent 70%
  );
  transition: opacity 0.3s;
  top: calc(var(--mouse-y, 0) * 1px - 125px);
  left: calc(var(--mouse-x, 0) * 1px - 125px);
  pointer-events: none;
}

.spotlight-card:hover::after {
  opacity: 1;
}

/* Holographic tilt */
.holo-tilt {
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  perspective: 800px;
}

/* Typing cursor blink */
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.typing-cursor {
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background: var(--arkos-gold);
  animation: cursor-blink 1s step-end infinite;
  vertical-align: text-bottom;
  margin-left: 2px;
}
```

**Step 5: Add aurora and grain CSS to Starlight config**

Update `astro.config.mjs` — add to the `customCss` array:

```javascript
customCss: [
  './src/styles/custom.css',
  './src/styles/aurora.css',
  './src/styles/grain.css',
  './src/styles/animations.css',
],
```

**Step 6: Verify dark theme renders**

```bash
npm run dev
```

Expected: Site shows dark background (#0a0a0a), gold accent colors on links and sidebar, glassmorphism header.

**Step 7: Commit**

```bash
git add src/styles/ astro.config.mjs
git commit -m "feat: add Arkos dark theme with gold palette, aurora, grain, and animations"
```

---

## Task 5: Custom Landing Page — Layout and Hero

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/ParticleCanvas.astro`
- Remove or rename: `src/content/docs/index.mdx` (Starlight default)

**Step 1: Remove default Starlight index**

The default Starlight template creates `src/content/docs/index.mdx`. Since we're using a custom `src/pages/index.astro`, we need to either delete the default or ensure no route conflict. Starlight's docs typically live at `/` by default — our `src/pages/index.astro` will override it.

Delete or rename:
```bash
rm -f src/content/docs/index.mdx
```

**Step 2: Create the particle canvas island**

Create `src/components/ParticleCanvas.astro`:

```astro
---
// Particle constellation — canvas with gold floating particles
// Connected by thin lines when near each other
// Mouse hover gently attracts nearby particles
---

<canvas id="particle-canvas" class="particle-canvas"></canvas>

<style>
  .particle-canvas {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: auto;
  }
</style>

<script>
  const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  let mouse = { x: -1000, y: -1000 };
  let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

  function resize() {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  function init() {
    resize();
    const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000);
    particles = Array.from({ length: Math.min(count, 80) }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const connectDist = 120;
    const mouseDist = 200;

    for (const p of particles) {
      // Mouse attraction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseDist && dist > 0) {
        const force = (mouseDist - dist) / mouseDist * 0.02;
        p.vx += dx / dist * force;
        p.vy += dy / dist * force;
      }

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectDist) {
          const alpha = (1 - dist / connectDist) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => {
    resize();
  });

  init();
  draw();
</script>
```

**Step 3: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---
import ParticleCanvas from './ParticleCanvas.astro';
---

<section class="hero">
  <!-- Aurora background -->
  <div class="aurora">
    <div class="aurora-blob"></div>
    <div class="aurora-blob"></div>
    <div class="aurora-blob"></div>
  </div>

  <!-- Particle constellation -->
  <ParticleCanvas />

  <!-- Content -->
  <div class="hero-content">
    <h1 class="hero-title shimmer-text">ARKOS</h1>
    <p class="hero-tagline">Tools forged for the age of AI-native development</p>
    <div class="hero-ctas">
      <a href="/tools/" class="btn-primary">Get Started</a>
      <a href="https://github.com/niceguy135" class="btn-ghost" target="_blank" rel="noopener">
        View on GitHub
      </a>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--arkos-bg);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
  }

  .hero-title {
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 800;
    letter-spacing: 0.15em;
    line-height: 1;
    margin: 0 0 1rem;
  }

  .hero-tagline {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: var(--arkos-text-muted);
    margin: 0 0 2.5rem;
    text-wrap: balance;
  }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 2rem;
    background: var(--arkos-gold);
    color: #0a0a0a;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }

  .btn-primary:hover {
    background: var(--arkos-gold-bright);
    transform: translateY(-1px);
    color: #0a0a0a;
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 2rem;
    border: 1.5px solid var(--arkos-gold-border);
    color: var(--arkos-text);
    font-weight: 500;
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s, transform 0.2s;
  }

  .btn-ghost:hover {
    border-color: var(--arkos-gold);
    color: var(--arkos-gold);
    transform: translateY(-1px);
  }
</style>
```

**Step 4: Create the landing page**

Create `src/pages/index.astro`:

```astro
---
import Hero from '../components/Hero.astro';
import '../styles/custom.css';
import '../styles/aurora.css';
import '../styles/grain.css';
import '../styles/animations.css';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Arkos — Tools forged for the age of AI-native development</title>
    <meta name="description" content="An open-source ecosystem of dev tools that handle everything around code — testing, documentation, memory, orchestration, project management." />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </head>
  <body>
    <!-- Grain overlay -->
    <div class="grain-overlay">
      <svg>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>

    <Hero />

    <!-- More sections will be added in subsequent tasks -->
  </body>
</html>

<style is:global>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--arkos-bg);
    color: var(--arkos-text);
    font-family: system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
</style>
```

**Step 5: Verify landing page renders**

```bash
npm run dev
```

Expected: Custom landing page at `http://localhost:4321/` with:
- Dark background
- Gold aurora glow blobs moving slowly
- Gold particle constellation with mouse interaction
- "ARKOS" heading with metallic shimmer
- Tagline and two CTA buttons
- Grain texture overlay

Starlight docs should still be accessible at `/tools/` paths (once content exists).

**Step 6: Commit**

```bash
git add src/pages/index.astro src/components/Hero.astro src/components/ParticleCanvas.astro
git commit -m "feat: add custom landing page with hero, particle constellation, aurora glow"
```

---

## Task 6: Landing Page — Problem Statement Section

**Files:**
- Create: `src/components/ProblemStatement.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create ProblemStatement component**

Create `src/components/ProblemStatement.astro`:

```astro
---
const capabilities = [
  'Testing',
  'Documentation',
  'Memory',
  'Orchestration',
  'Project Setup',
  'Codebase Intelligence',
];
---

<section class="problem scroll-reveal">
  <div class="problem-inner">
    <h2 class="problem-headline">
      AI writes code.<br />
      <span class="shimmer-text">Who handles everything else?</span>
    </h2>
    <div class="capabilities">
      {capabilities.map((cap) => (
        <span class="capability">{cap}</span>
      ))}
    </div>
    <p class="problem-answer">
      Arkos handles the other <strong class="shimmer-text">80%</strong>.
    </p>
  </div>
</section>

<style>
  .problem {
    position: relative;
    z-index: 1;
    padding: 8rem 2rem;
    text-align: center;
    background: var(--arkos-bg);
    background-image:
      linear-gradient(rgba(212, 175, 55, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212, 175, 55, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .problem-inner {
    max-width: 700px;
    margin: 0 auto;
  }

  .problem-headline {
    font-size: clamp(1.8rem, 5vw, 3rem);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 3rem;
    color: var(--arkos-text);
  }

  .capabilities {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .capability {
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--arkos-gold-border);
    border-radius: 100px;
    color: var(--arkos-gold);
    font-size: 0.95rem;
    font-weight: 500;
    transition: border-color 0.3s, background 0.3s;
  }

  .capability:hover {
    border-color: var(--arkos-gold);
    background: rgba(212, 175, 55, 0.08);
  }

  .problem-answer {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: var(--arkos-text-muted);
  }

  .problem-answer strong {
    font-size: 1.2em;
  }
</style>
```

**Step 2: Add to landing page**

In `src/pages/index.astro`, add the import and component after `<Hero />`:

```astro
---
import Hero from '../components/Hero.astro';
import ProblemStatement from '../components/ProblemStatement.astro';
// ... existing imports
---

<!-- In body, after Hero: -->
<Hero />
<ProblemStatement />
```

**Step 3: Verify**

```bash
npm run dev
```

Expected: Scroll down from hero to see the problem statement section with gold capability pills and shimmer text.

**Step 4: Commit**

```bash
git add src/components/ProblemStatement.astro src/pages/index.astro
git commit -m "feat: add problem statement section with capability pills"
```

---

## Task 7: Landing Page — Tool Showcase Section

**Files:**
- Create: `src/components/ToolCard.astro`
- Create: `src/components/ToolShowcase.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create ToolCard component**

Create `src/components/ToolCard.astro`:

```astro
---
interface Props {
  name: string;
  description: string;
  icon: string;
  href: string;
  category: string;
}

const { name, description, icon, href, category } = Astro.props;
---

<a href={href} class="tool-card glow-border spotlight-card holo-tilt cascade-item">
  <div class="tool-card-category">{category}</div>
  <div class="tool-card-icon" set:html={icon} />
  <h3 class="tool-card-name">{name}</h3>
  <p class="tool-card-desc">{description}</p>
  <span class="tool-card-link">Learn more →</span>
</a>

<style>
  .tool-card {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background: var(--arkos-bg-elevated);
    text-decoration: none;
    color: var(--arkos-text);
    transition: transform 0.2s ease-out;
    cursor: pointer;
    min-height: 200px;
  }

  .tool-card:hover {
    transform: translateY(-4px);
  }

  .tool-card-category {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--arkos-gold);
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .tool-card-icon {
    width: 32px;
    height: 32px;
    margin-bottom: 1rem;
    color: var(--arkos-gold);
  }

  .tool-card-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .tool-card-name {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .tool-card-desc {
    font-size: 0.9rem;
    color: var(--arkos-text-muted);
    line-height: 1.5;
    flex-grow: 1;
    margin: 0;
  }

  .tool-card-link {
    font-size: 0.85rem;
    color: var(--arkos-gold);
    margin-top: 1rem;
    font-weight: 500;
  }

  .tool-card:hover .tool-card-link {
    color: var(--arkos-gold-bright);
  }
</style>
```

**Step 2: Create ToolShowcase component**

Create `src/components/ToolShowcase.astro`:

```astro
---
import ToolCard from './ToolCard.astro';

const tools = [
  {
    name: 'Apollo',
    description: 'Project governance and conventions. Encodes your preferences into every agent\'s instruction file.',
    category: 'Dev Workflow',
    href: '/tools/apollo/',
  },
  {
    name: 'Hermes',
    description: 'One codebase, three voices. Generates docs for internal teams, external users, and marketing.',
    category: 'Dev Workflow',
    href: '/tools/hermes/',
  },
  {
    name: 'Delphi',
    description: 'The oracle for QA. Generates and executes guided test scenarios from your built software.',
    category: 'Dev Workflow',
    href: '/tools/delphi/',
  },
  {
    name: 'Carto',
    description: 'Builds a 7-layer semantic map of your codebase. Intent-aware intelligence for AI assistants.',
    category: 'Infrastructure',
    href: '/tools/carto/',
  },
  {
    name: 'Memories',
    description: 'Persistent semantic memory. Hybrid search, <50ms latency, works across every AI coding tool.',
    category: 'Infrastructure',
    href: '/tools/memories/',
  },
  {
    name: 'Conductor',
    description: 'Orchestrates skills through pipelines. Classifies tasks, sequences phases, keeps everything in order.',
    category: 'Dev Workflow',
    href: '/tools/conductor/',
  },
  {
    name: 'SwarmEngine',
    description: 'Multi-agent DAG orchestration. Sequential, parallel, conditional, iterative — with cost tracking.',
    category: 'Infrastructure',
    href: '/tools/swarm-engine/',
  },
  {
    name: 'PersonaSmith',
    description: '75 research-backed AI agent personas across 15 enterprise departments. Swarm-ready.',
    category: 'Agent Framework',
    href: '/tools/persona-smith/',
  },
  {
    name: 'Learning',
    description: 'Auto-captures failures and fixes. Retrieves learnings to avoid repeating mistakes across sessions.',
    category: 'Dev Workflow',
    href: '/tools/learning-skill/',
  },
];

// Placeholder SVG icon (will be replaced with real icons from Task 3)
const placeholderIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>';
---

<section class="showcase scroll-reveal">
  <div class="showcase-inner">
    <h2 class="showcase-heading">The Ecosystem</h2>
    <p class="showcase-subtitle">Nine tools. One mission. Ship better software.</p>
    <div class="showcase-grid">
      {tools.map((tool) => (
        <ToolCard
          name={tool.name}
          description={tool.description}
          icon={placeholderIcon}
          href={tool.href}
          category={tool.category}
        />
      ))}
    </div>
  </div>
</section>

<style>
  .showcase {
    position: relative;
    z-index: 1;
    padding: 6rem 2rem;
    background: var(--arkos-bg);
  }

  .showcase-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .showcase-heading {
    text-align: center;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .showcase-subtitle {
    text-align: center;
    color: var(--arkos-text-muted);
    margin-bottom: 3rem;
    font-size: 1.1rem;
  }

  .showcase-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 900px) {
    .showcase-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 560px) {
    .showcase-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<!-- Cursor spotlight + holographic tilt JS -->
<script>
  document.querySelectorAll<HTMLElement>('.spotlight-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', String(x));
      card.style.setProperty('--mouse-y', String(y));

      // Holographic tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
</script>
```

**Step 3: Add to landing page**

In `src/pages/index.astro`, import and add after ProblemStatement:

```astro
import ToolShowcase from '../components/ToolShowcase.astro';

<!-- In body: -->
<ProblemStatement />
<ToolShowcase />
```

**Step 4: Verify**

```bash
npm run dev
```

Expected: 3x3 grid of tool cards with rotating gold borders, cursor spotlight glow, and holographic tilt on hover. Cards cascade in on scroll.

**Step 5: Commit**

```bash
git add src/components/ToolCard.astro src/components/ToolShowcase.astro src/pages/index.astro
git commit -m "feat: add tool showcase with holographic cards and cursor spotlight"
```

---

## Task 8: Landing Page — Ecosystem Diagram Section

**Files:**
- Create: `src/components/EcosystemDiagram.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create animated ecosystem diagram**

Create `src/components/EcosystemDiagram.astro`:

This component renders an SVG with:
- 9 tool nodes as gold-bordered circles with names
- Animated flowing dashes on connection lines
- Hover on a node highlights connections, dims others
- Conductor node at center
- Layout: Conductor center, connected to all others arranged in a circle/arc around it

The SVG should be ~600px wide, responsive. Nodes positioned with fixed coordinates. Connection lines use `stroke-dasharray` and `stroke-dashoffset` animation for flowing dash effect. Each node has a subtle pulse animation (scale 1 → 1.05 → 1, 3s infinite).

Interactive hover via inline `<script>`: on mouseenter of a node group, add class `highlighted` to its connections and `dimmed` to everything else.

**Step 2: Add to landing page**

Import and add after ToolShowcase.

**Step 3: Verify**

Expected: Animated diagram with Conductor at center, lines flowing between connected tools, hover highlighting.

**Step 4: Commit**

```bash
git add src/components/EcosystemDiagram.astro src/pages/index.astro
git commit -m "feat: add animated ecosystem diagram with flowing connections"
```

---

## Task 9: Landing Page — Terminal Demo and Footer

**Files:**
- Create: `src/components/TerminalDemo.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create terminal typing demo**

Create `src/components/TerminalDemo.astro`:

A styled terminal window (dark bg, rounded corners, traffic light dots at top) that types out commands letter by letter when scrolled into view. Uses IntersectionObserver to trigger.

Commands to type:
```
$ npx carto index .
  ⠿ Scanning 847 files...
  ⠿ Building 7-layer knowledge graph...
  ✓ Index complete — 12 modules mapped
```

Gold cursor blinks during typing, disappears after output. Each character typed at 40ms intervals. Output lines appear all at once after command finishes typing. Spinner characters cycle (⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏) during "processing" phase.

**Step 2: Create footer**

Create `src/components/Footer.astro`:

Simple footer with sparse particle canvas (reuse ParticleCanvas with fewer particles), GitHub/Docs/Contributing links, and "Built with Astro" attribution. Gold text on dark background.

**Step 3: Add to landing page**

Import and add after EcosystemDiagram:

```astro
<EcosystemDiagram />
<TerminalDemo />
<Footer />
```

**Step 4: Verify**

Expected: Terminal demo types itself when scrolled into view. Footer renders with links.

**Step 5: Commit**

```bash
git add src/components/TerminalDemo.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add terminal typing demo and footer with constellation"
```

---

## Task 10: Landing Page — Glassmorphism Nav Bar

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create sticky glassmorphism nav**

Create `src/components/Nav.astro`:

Fixed position at top, `backdrop-filter: blur(12px)`, gold-tinted border bottom. Contains:
- Left: Arkos logo SVG (links to /)
- Right: "Docs" (links to /tools/), "GitHub" (external link), theme toggle (optional, dark is default)

Nav becomes visible/opaque after scrolling past the hero (use IntersectionObserver on hero section). Starts transparent, transitions to glassmorphism on scroll.

**Step 2: Add to landing page body, before Hero**

**Step 3: Verify**

Expected: Transparent nav at top, becomes glassmorphism on scroll past hero.

**Step 4: Commit**

```bash
git add src/components/Nav.astro src/pages/index.astro
git commit -m "feat: add glassmorphism sticky navigation"
```

---

## Task 11: Documentation Content — Tool Overview Pages

**Files:**
- Create: `src/content/docs/tools/index.md`
- Create: `src/content/docs/tools/memories/index.md`
- Create: `src/content/docs/tools/carto/index.md`
- Create: `src/content/docs/tools/apollo/index.md`
- Create: `src/content/docs/tools/delphi/index.md`
- Create: `src/content/docs/tools/hermes/index.md`
- Create: `src/content/docs/tools/conductor/index.md`
- Create: `src/content/docs/tools/swarm-engine/index.md`
- Create: `src/content/docs/tools/persona-smith/index.md`
- Create: `src/content/docs/tools/learning-skill/index.md`

**Step 1: Create tools overview page**

Create `src/content/docs/tools/index.md` — a landing page for the tools section with a brief intro and links to each tool, organized by category (Infrastructure, Dev Workflow, Agent Frameworks).

**Step 2: Create 9 individual tool overview pages**

For each tool, create `src/content/docs/tools/[tool-name]/index.md` following the template:

```markdown
---
title: [Tool Name]
description: [One-liner]
---

## What it does
[2-3 sentences — problem and solution]

## Key Features
[Bullet list]

## How it fits
[Ecosystem connections]

## Quick Start
[Install + first command]

## Architecture
[Brief internal overview]
```

Content for each tool should be sourced from the project exploration done earlier (README files, CLAUDE.md files). Keep it accurate and concise.

**Step 3: Verify docs render**

```bash
npm run dev
```

Expected: Navigate to `/tools/` and see the overview page. Click through to each tool page. Sidebar shows the configured structure.

**Step 4: Commit**

```bash
git add src/content/docs/
git commit -m "feat: add documentation for all 9 ecosystem tools"
```

---

## Task 12: Documentation Content — Ecosystem and About Pages

**Files:**
- Create: `src/content/docs/ecosystem/index.md`
- Create: `src/content/docs/about/index.md`

**Step 1: Create ecosystem page**

`src/content/docs/ecosystem/index.md` — explains how all tools connect. Include a text-based architecture diagram (mermaid or ASCII) showing data flow: User → Claude Code → Apollo (conventions) → Conductor (routing) → Skills (Delphi, Hermes, Learning) → Carto (index) → Memories (store). SwarmEngine for multi-agent orchestration. PersonaSmith for agent personas.

**Step 2: Create about page**

`src/content/docs/about/index.md` — about the project, philosophy (specialized tools > monolithic platforms, skill-per-problem architecture), and contributing guidelines.

**Step 3: Verify**

```bash
npm run dev
```

Expected: Ecosystem and About pages render in sidebar and are accessible.

**Step 4: Commit**

```bash
git add src/content/docs/ecosystem/ src/content/docs/about/
git commit -m "feat: add ecosystem architecture and about pages"
```

---

## Task 13: Shiki Gold Theme for Code Blocks

**Files:**
- Create: `src/themes/arkos-shiki.json`
- Modify: `astro.config.mjs`

**Step 1: Create custom Shiki theme**

Create `src/themes/arkos-shiki.json` — a VS Code TextMate theme with:
- Background: `#0a0a0a`
- Default text: `#e5e5e5`
- Keywords: `#d4af37` (gold)
- Strings: `#f5d060` (bright gold)
- Comments: `#666666`
- Functions: `#fffbe6` (near-white gold)
- Numbers: `#f5d060`
- Types: `#d4af37`
- Operators: `#a3a3a3`

Follow the VS Code TextMate theme schema.

**Step 2: Configure in astro.config.mjs**

Add to the Astro config:

```javascript
import arkosTheme from './src/themes/arkos-shiki.json';

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: arkosTheme,
    },
  },
  // ... rest of config
});
```

**Step 3: Verify code blocks render with gold theme**

Add a code block to any tool's docs page and check it renders with gold syntax highlighting.

**Step 4: Commit**

```bash
git add src/themes/ astro.config.mjs
git commit -m "feat: add gold Shiki syntax highlighting theme"
```

---

## Task 14: View Transitions

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Add view transitions to landing page**

In `src/pages/index.astro`, add to `<head>`:

```astro
---
import { ViewTransitions } from 'astro:transitions';
---

<head>
  <!-- existing meta tags -->
  <ViewTransitions />
</head>
```

Add `transition:animate` directives to key elements in Hero and other sections for smooth entrance effects.

**Step 2: Verify transitions**

Navigate between landing page and docs pages. Should see smooth fade/slide transitions.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Astro view transitions for smooth page navigation"
```

---

## Task 15: Build Verification and Production Build

**Files:**
- Modify: `package.json` (if needed for build script)
- Create: `wrangler.toml` (optional, for Cloudflare Pages config)

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/`.

**Step 2: Preview production build**

```bash
npm run preview
```

Expected: Site runs at `http://localhost:4321` with all features working:
- Landing page: hero with particles, aurora, shimmer text
- Problem statement with capability pills
- Tool showcase with holographic cards
- Ecosystem diagram with animated connections
- Terminal typing demo
- Footer
- Glassmorphism nav
- All docs pages accessible
- Gold Shiki code blocks
- View transitions between pages
- Grain overlay visible
- Responsive at mobile, tablet, desktop widths

**Step 3: Fix any build issues**

If build fails, fix TypeScript errors, missing imports, or asset references.

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve production build issues"
```

---

## Task 16: Cloudflare Pages Setup

**Step 1: Create GitHub repo**

```bash
cd /Users/divyekant/Projects/arkos
gh repo create arkos --public --source=. --push
```

**Step 2: Configure Cloudflare Pages**

This step requires manual action in the Cloudflare dashboard:
1. Go to Cloudflare Pages → Create project → Connect to GitHub
2. Select the `arkos` repo
3. Build settings: Framework preset = Astro, Build command = `npm run build`, Output directory = `dist`
4. Deploy

**Step 3: Configure custom domain**

In Cloudflare DNS for `divyekant.com`:
1. Add CNAME record: `arkos` → `arkos.pages.dev`
2. In Cloudflare Pages → Custom domains → Add `arkos.divyekant.com`

**Step 4: Verify live site**

Navigate to `https://arkos.divyekant.com` and verify everything works.

**Step 5: Commit wrangler.toml if needed**

```bash
git add wrangler.toml
git commit -m "chore: add Cloudflare Pages configuration"
```

---

## Summary

| Task | Description | Key Output |
|------|------------|------------|
| 1 | Project scaffolding | Working Astro + Starlight project |
| 2 | Starlight configuration | Sidebar, title, logo, custom CSS refs |
| 3 | Brand assets | Logo, favicon, 9 tool icons |
| 4 | Global styles | Dark theme, aurora, grain, animations CSS |
| 5 | Landing page hero | Particle canvas, aurora, shimmer text, CTAs |
| 6 | Problem statement | Capability pills, scroll reveal |
| 7 | Tool showcase | 3x3 holographic card grid |
| 8 | Ecosystem diagram | Animated SVG with flowing connections |
| 9 | Terminal + footer | Typing demo, constellation footer |
| 10 | Navigation | Glassmorphism sticky nav |
| 11 | Tool docs | 9 tool overview pages + tools index |
| 12 | Ecosystem + about docs | Architecture page, contributing guide |
| 13 | Shiki theme | Gold syntax highlighting |
| 14 | View transitions | Smooth page navigation |
| 15 | Build verification | Production build, full test |
| 16 | Deployment | GitHub → Cloudflare Pages → arkos.divyekant.com |
