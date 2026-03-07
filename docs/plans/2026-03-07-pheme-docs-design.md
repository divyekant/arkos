# Design: Add Pheme to Arkos Docs

**Date:** 2026-03-07
**Status:** Approved

## Overview

Add Pheme (universal agent-to-human notification layer) to the Arkos documentation site, following the established tool integration pattern.

## Integration Points

### 1. Tool documentation page

- **Path:** `src/content/docs/tools/pheme/index.md`
- **Template:** Standard tool page (What it does, Key Features, How it fits, Quick Start)
- **GitHub link:** `divyekant/pheme`
- **Backlink:** "Powered by: Apprise" (same pattern as Pencil Prototyping -> Pencil.dev)
- **Content source:** Pheme README on GitHub

### 2. Sidebar navigation

- **File:** `astro.config.mjs`
- **Change:** Add new "Utilities" group after Agent Frameworks
- **Entry:** Pheme (`tools/pheme`)

### 3. Tools overview page

- **File:** `src/content/docs/tools/index.md`
- **Change:** Add Pheme under new "Utilities" heading

### 4. Landing page — Tool showcase

- **File:** `src/components/ToolShowcase.astro`
- **Change:** Add Pheme card to tools array
- **Category:** "Utilities"
- **Description:** "Universal notification layer. Lets agents reach humans across 100+ channels — Slack, Telegram, email, Discord — via a single MCP tool call."

### 5. Landing page — Ecosystem diagram

- **File:** `src/components/EcosystemDiagram.astro`
- **Change:** Add Pheme as a ring/outer node, connected to Argos and Conductor (tools that consume notifications)

### 6. Landing page — Hero graph (if separate from ecosystem diagram)

- Update node count and connections to include Pheme

### 7. Ecosystem page

- **File:** `src/content/docs/ecosystem/index.md`
- **Change:** Add Pheme to the flow diagram and create Utilities layer or add to existing layer description

### 8. Tool icon

- **Path:** `public/tool-icons/pheme.svg`
- **Design:** SVG icon consistent with existing tool icons

### 9. Footer

- No changes needed (links generically to /tools/ and /ecosystem/)

## Category

**Utilities** — new sidebar group. Pheme is a foundational utility that other tools consume rather than belonging to Infrastructure, Dev Workflow, or Agent Frameworks.

## Backlink pattern

Following Pencil Prototyping's pattern:
```
> **GitHub:** [divyekant/pheme](https://github.com/divyekant/pheme) | **Powered by:** [Apprise](https://github.com/caronc/apprise)
```
