---
title: UI-Val
description: Visual UI validation across viewports for any AI agent
---

> **GitHub:** [divyekant/ui-val](https://github.com/divyekant/ui-val)

## What it does

AI agents build UI but cannot tell if it looks right. They break layouts, overlap text, and drop content on mobile. A person sees these problems at once. UI-Val gives the agent that feedback loop. It captures screenshots with Playwright, and the agent reads them with its own vision. UI-Val needs no API key and no external service.

## How it works

```
Agent edits UI code
  → UI-Val captures screenshots at 3 viewports (Playwright)
  → Agent reads the screenshot files
  → Agent evaluates them against a 12-point visual rubric
  → Agent fixes issues and captures again to verify
```

The agent stops when the score is 8 or more, or after 3 repair attempts.

## Key Features

- **Three viewports** — Desktop (1440×900), tablet (768×1024), and mobile (375×812).
- **DOM metrics** — Element count, broken images, visible text length, empty body, and page title for each viewport.
- **Console errors** — The JSON report includes browser console errors.
- **Multiple routes** — `--pages=/,/about` checks several routes in one run.
- **12-point rubric** — Rendering, navigation, content visibility, readability, layout, spacing, images, interactive elements, color, hierarchy, overlap, and horizontal overflow.

## How it fits

UI-Val is the visual check of the dev workflow. Kalos defines design rules, Pencil Prototyping sketches layouts, and UI-Val checks the built result in a browser.

## Quick Start

```bash
claude plugins marketplace add divyekant/dk-marketplace
claude plugins install ui-val
cd ~/.claude/plugins/cache/*/ui-val/*/
npm install && npx playwright install chromium
```

In Claude Code:

```text
/ui-val http://localhost:5173
```

Any agent that can run a shell can use the CLI:

```bash
node ~/.claude/skills/ui-val/bin/ui-val.js check http://localhost:5173
```
