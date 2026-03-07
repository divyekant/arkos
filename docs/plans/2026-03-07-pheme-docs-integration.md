# Pheme Docs Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Pheme (universal agent notification layer) to all Arkos documentation surfaces — tool page, sidebar, tools overview, landing page showcase, hero graph, ecosystem diagram, and ecosystem page.

**Architecture:** Follow the established tool integration pattern used for Argos and all other tools. New "Utilities" sidebar group. Apprise backlink following Pencil.dev pattern.

**Tech Stack:** Astro/Starlight (Markdown + `.astro` components), React (NetworkGraph.tsx), SVG icons

---

### Task 1: Create Pheme tool icon

**Files:**
- Create: `public/tool-icons/pheme.svg`

**Step 1: Create the SVG icon**

Follow the existing icon pattern (24x24 viewBox, gold stroke `#d4af37`, no fill, 1.5 stroke-width). Pheme is a notification/messaging tool — use a megaphone/broadcast icon:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Megaphone body -->
  <path d="M18 8a6 6 0 0 1-6 6H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7a6 6 0 0 1 6 6z"/>
  <!-- Sound waves -->
  <path d="M19 5c1.5 1 2.5 2.8 2.5 5s-1 4-2.5 5"/>
  <!-- Handle -->
  <line x1="5" y1="14" x2="5" y2="18"/>
  <line x1="9" y1="14" x2="9" y2="18"/>
</svg>
```

**Step 2: Verify icon renders**

Run: `npm run dev`
Check: `/tool-icons/pheme.svg` loads in browser at `http://localhost:4321/tool-icons/pheme.svg`

---

### Task 2: Create Pheme tool documentation page

**Files:**
- Create: `src/content/docs/tools/pheme/index.md`

**Step 1: Create the tool page**

```markdown
---
title: Pheme
description: Universal agent-to-human notification layer powered by Apprise
---

> **GitHub:** [divyekant/pheme](https://github.com/divyekant/pheme) | **Powered by:** [Apprise](https://github.com/caronc/apprise)

## What it does

AI agents run autonomously but still need to reach humans: approvals, error alerts, status updates, task completions. Without a standard notification layer, every agent reinvents channel integration. Pheme wraps Apprise in an MCP server so any AI agent can notify humans across 100+ channels — Slack, Telegram, email, Discord, webhooks, and more — via a single tool call.

## Key Features

- **One interface** — 4 MCP tools cover all notification needs (`send`, `list_channels`, `get_routes`, `test_channel`)
- **100+ channels** — anything Apprise supports, Pheme supports (Slack, Telegram, email, Discord, webhooks, macOS native, and more)
- **Urgency-based routing** — critical alerts fan out to multiple channels; low-priority updates stay quiet
- **Zero channel lock-in** — channels are configured via `PHEME_*` env vars, not code
- **Security built in** — message length caps, secret detection warnings, audit logging
- **Custom route overrides** — project-level or user-level YAML route configs
- **Claude Code plugin** — slash commands (`/pheme send`, `/pheme test`, `/pheme-status`) and an agent skill

## How it fits

Pheme is the notification backbone. Any tool in the Arkos ecosystem that needs to reach a human can route through Pheme instead of implementing its own channel integration. Argos can send issue alerts, Delphi can report test results, Conductor can notify on pipeline completions — all through a single, consistent notification layer. Channels are configured once and shared across all tools.

## Quick Start

```bash
# Clone and install
git clone https://github.com/divyekant/pheme.git
cd pheme
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

Configure at least one channel:

```bash
export PHEME_SLACK="slack://tokenA/tokenB/tokenC/#general"
```

Run the MCP server:

```bash
python -m server
```

## MCP Tools

| Tool | Description |
|---|---|
| `send` | Send a notification to channels by name or urgency level |
| `list_channels` | Show all configured channels from `PHEME_*` env vars |
| `get_routes` | Show urgency-to-channel routing table |
| `test_channel` | Verify a channel is properly configured |

## Urgency Routing

| Urgency | Default Channels | Use Case |
|---|---|---|
| `critical` | slack, telegram, system | Production down, security incidents |
| `high` | slack | PR reviews, build failures |
| `normal` | slack | Task completions, status updates |
| `low` | session | Background activity, FYI |

## Dependencies

- **Python 3.10+** — runtime
- **[Apprise](https://github.com/caronc/apprise)** — notification delivery engine (installed automatically)
- **[FastMCP](https://github.com/jlowin/fastmcp)** — MCP server framework (installed automatically)
```

**Step 2: Verify page renders**

Run: `npm run dev`
Check: `http://localhost:4321/tools/pheme/` loads correctly

---

### Task 3: Add Pheme to sidebar navigation

**Files:**
- Modify: `astro.config.mjs:51-56` (after Agent Frameworks group)

**Step 1: Add Utilities group**

Add after the Agent Frameworks block (after line 56, before the closing `]` of the Tools items array):

```javascript
{
  label: 'Utilities',
  items: [
    { slug: 'tools/pheme' },
  ],
},
```

**Step 2: Verify sidebar renders**

Run: `npm run dev`
Check: Sidebar shows "Utilities" group with "Pheme" entry under Tools

---

### Task 4: Add Pheme to tools overview page

**Files:**
- Modify: `src/content/docs/tools/index.md`

**Step 1: Update tool count in frontmatter**

Change description from "thirteen" to "fourteen":
```
description: The Arkos ecosystem — fourteen specialized tools for AI-native development
```

**Step 2: Add Utilities section**

Append after the Agent Frameworks section:

```markdown
## Utilities

Cross-cutting capabilities used by other tools.

- **[Pheme](/tools/pheme/)** — Universal agent-to-human notifications across 100+ channels, powered by [Apprise](https://github.com/caronc/apprise)
```

**Step 3: Verify overview page**

Run: `npm run dev`
Check: `http://localhost:4321/tools/` shows Utilities section with Pheme

---

### Task 5: Add Pheme to landing page tool showcase

**Files:**
- Modify: `src/components/ToolShowcase.astro:4-96`

**Step 1: Add Pheme to tools array**

Add after the Argos entry (after line 95, before the closing `];`):

```javascript
{
  name: 'Pheme',
  description: 'Universal notification layer. Agents reach humans across 100+ channels — Slack, Telegram, email, Discord — via one MCP tool call.',
  category: 'Utilities',
  href: '/tools/pheme/',
  iconPath: '/tool-icons/pheme.svg',
},
```

**Step 2: Update showcase subtitle**

Change line 102 from "Thirteen tools" to "Fourteen tools":
```
<p class="showcase-subtitle">Fourteen tools. One mission. Ship better software.</p>
```

**Step 3: Verify showcase renders**

Run: `npm run dev`
Check: Landing page shows Pheme card with "Utilities" category badge

---

### Task 6: Add Pheme to hero network graph

**Files:**
- Modify: `src/components/NetworkGraph.tsx:3-17` (NODES array) and `:19-46` (EDGES array)

**Step 1: Add Pheme node**

Add to the NODES array (after the `argos` entry, before `conductor`):

```typescript
{ id: "pheme", label: "Pheme", sub: "notify", x: 0.32, y: 0.88, size: 42 },
```

Position: bottom-left area (x: 0.32, y: 0.88) — mirrors Argos on bottom-right. Size 42 (same tier as Pencil, Kalos, Argos).

**Step 2: Add Pheme edges**

Add to the EDGES array:

```typescript
["pheme", "memories"],
["pheme", "argos"],
["pheme", "hermes"],
```

Rationale: Pheme connects to Memories (logging), Argos (issue alerts), Hermes (doc notifications).

**Step 3: Verify graph renders**

Run: `npm run dev`
Check: Landing page hero graph shows Pheme node at bottom-left with connections

---

### Task 7: Add Pheme to ecosystem diagram

**Files:**
- Modify: `src/components/EcosystemDiagram.astro:5-16` (tools array) and `:18-31` (connections array)

**Step 1: Add Pheme node**

Add to the tools array:

```javascript
{ id: 'pheme', label: 'Pheme', letter: 'P', x: 80, y: 400, r: 28, primary: false },
```

Position: bottom-left (x: 80, y: 400) — mirrors Pencil on the right side. Radius 28 (same as Pencil).

**Step 2: Add Pheme connections**

Add to the connections array:

```javascript
{ from: 'conductor', to: 'pheme', duration: '3.4s' },
{ from: 'pheme', to: 'personasmith', duration: '2.8s' },
```

**Step 3: Add pulse animation delay**

Add CSS rule for the 11th node (after line 207):

```css
.eco-node:nth-child(11) { animation-delay: 3.0s; }
```

**Step 4: Verify diagram renders**

Run: `npm run dev`
Check: Ecosystem diagram on landing page shows Pheme node with animated connections

---

### Task 8: Add Pheme to ecosystem page

**Files:**
- Modify: `src/content/docs/ecosystem/index.md`

**Step 1: Add Pheme to the flow diagram**

Insert after the Hermes line (after line 29) in the flow diagram:

```
    ↓
Pheme (notifies humans across 100+ channels based on urgency)
```

**Step 2: Add Utilities layer**

Add after the Agent Layer section (after line 62):

```markdown
### Utilities Layer
**Pheme** is the notification backbone. Rather than each tool implementing its own channel integration, Pheme provides a single MCP interface for reaching humans across 100+ channels via [Apprise](https://github.com/caronc/apprise). Urgency-based routing means tools just say "this is critical" and Pheme decides where it goes.
```

**Step 3: Verify ecosystem page**

Run: `npm run dev`
Check: `http://localhost:4321/ecosystem/` shows Pheme in flow and Utilities layer

---

### Task 9: Commit

**Step 1: Verify dev server**

Run: `npm run dev`
Check: All pages render correctly, no build errors

**Step 2: Build check**

Run: `npm run build`
Expected: Clean build with no errors

**Step 3: Commit all changes**

```bash
git add public/tool-icons/pheme.svg \
  src/content/docs/tools/pheme/index.md \
  astro.config.mjs \
  src/content/docs/tools/index.md \
  src/components/ToolShowcase.astro \
  src/components/NetworkGraph.tsx \
  src/components/EcosystemDiagram.astro \
  src/content/docs/ecosystem/index.md
git commit -m "docs: add Pheme to ecosystem — tool #14, hero graph, showcase, ecosystem page"
```
