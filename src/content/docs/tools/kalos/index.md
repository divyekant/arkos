---
title: Kalos
description: Format-agnostic design governance for AI coding agents
---

> **GitHub:** [divyekant/kalos](https://github.com/divyekant/kalos)

## What it does

AI agents can write code, but they don't enforce design consistency. Kalos solves this by letting you define design tokens and rules once — colors, typography, spacing, radii — and enforcing them across every design surface. Ships with Pencil and Tailwind adapters, with raw CSS support planned.

## Key Features

- **Three-tier config** — Global defaults, shared templates, per-project overrides. Deep-merge resolution so teams share a baseline while projects diverge where needed.
- **Interactive onboarding** — `/kalos init` walks through template choice, brand colors, typography, spacing, strictness, and optional multi-brand setup one question at a time.
- **Token sync** — `/kalos sync` pushes resolved tokens into Pencil variables via MCP and generates `kalos.tailwind.config.ts` + `kalos-tokens.css` for Tailwind projects. One command, every design surface updated.
- **Design validation** — `/kalos check` scans `.pen` files and Tailwind configs for off-token colors, non-scale font sizes, irregular spacing, low-contrast text. Reports `[OK]`, `[WARN]`, `[ERROR]` per rule.
- **Extract from existing** — `/kalos extract` reads existing Pencil files, Tailwind configs, or CSS custom properties and bootstraps a `.kalos.yaml` from discovered values. No manual token entry needed.
- **Multi-brand support** — Define named brand palettes (colors, typography) and switch between them with a single command. Sync generates `[data-brand]` CSS selectors for each palette.
- **CLAUDE.md injection** — Writes a managed `<!-- KALOS:START -->` section into your instruction file so every agent in the session inherits design standards automatically.
- **Adapter architecture** — Pencil and Tailwind adapters ship in v0.2.0. Adapters are modular sections; new targets plug in without touching core logic.

## How it fits

Kalos lives in the Dev Workflow layer alongside Apollo and Conductor. Apollo manages project conventions, Conductor sequences phases, and Kalos governs the visual layer. In practice: run `/kalos init` during project setup (or `/kalos extract` to bootstrap from existing artifacts), `/kalos sync` before designing in Pencil or building with Tailwind, and `/kalos check` in the verify phase to catch drift. For multi-brand projects, define palettes once and switch with "switch to {brand}" — all adapters re-sync automatically.

## Quick Start

```bash
# As a Claude Code skill (part of the superpowers plugin)
claude plugins install github:divyekant/kalos

# Or manual install
git clone https://github.com/divyekant/kalos.git
ln -sf $(pwd)/kalos/skills/kalos ~/.claude/skills/kalos
```

Then in a Claude Code session:

```
/kalos init          # Set up design tokens for this project
/kalos extract       # Bootstrap config from existing artifacts
/kalos sync          # Push tokens to Pencil + generate Tailwind files
/kalos check         # Validate designs against rules
switch to acme       # Switch active brand palette
/kalos               # Context-aware next action
```

## Architecture

Kalos is a Claude Code skill (Markdown instructions, no runtime code). Config lives in YAML files — `~/.kalos/defaults.yaml` for global preferences, `~/.kalos/templates/` for shared baselines like "modern", "minimal", or "brand", and `.kalos.yaml` per project. The three-tier resolution deep-merges these layers so project-level overrides are surgical.

Adapters handle the bridge between abstract tokens and concrete targets. The Pencil adapter uses MCP tools (`set_variables`, `search_all_unique_properties`) to sync and validate. The Tailwind adapter generates a theme config (`kalos.tailwind.config.ts`) with CSS variable references and a tokens file (`kalos-tokens.css`) with `:root` custom properties. Multi-brand projects get per-brand `[data-brand]` selector blocks. Each adapter is a self-contained section in the skill file — no external dependencies, no build step.
