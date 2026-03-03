---
title: Kalos
description: Format-agnostic design governance for AI coding agents
---

> **GitHub:** [divyekant/kalos](https://github.com/divyekant/kalos)

## What it does

AI agents can write code, but they don't enforce design consistency. Kalos solves this by letting you define design tokens and rules once — colors, typography, spacing, radii — and enforcing them across every design surface. Currently supports Pencil via MCP, with Tailwind and raw CSS adapters planned.

## Key Features

- **Three-tier config** — Global defaults, shared templates, per-project overrides. Deep-merge resolution so teams share a baseline while projects diverge where needed.
- **Interactive onboarding** — `/kalos init` walks through template choice, brand colors, typography, spacing, and strictness level one question at a time.
- **Token sync** — `/kalos sync` pushes resolved tokens (colors, fonts, spacing, radii) into Pencil variables via MCP. One command, every design file updated.
- **Design validation** — `/kalos check` scans `.pen` files for off-token colors, non-scale font sizes, irregular spacing, low-contrast text. Reports `[OK]`, `[WARN]`, `[ERROR]` per rule.
- **CLAUDE.md injection** — Writes a managed `<!-- KALOS:START -->` section into your instruction file so every agent in the session inherits design standards automatically.
- **Adapter architecture** — Pencil adapter ships in v0.1.0. Adapters are modular sections; new targets (Tailwind, CSS variables) plug in without touching core logic.

## How it fits

Kalos lives in the Dev Workflow layer alongside Apollo and Conductor. Apollo manages project conventions, Conductor sequences phases, and Kalos governs the visual layer. In practice: run `/kalos init` during project setup, `/kalos sync` before designing in Pencil, and `/kalos check` in the verify phase to catch drift.

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
/kalos sync          # Push tokens to Pencil
/kalos check         # Validate .pen files against rules
/kalos               # Context-aware next action
```

## Architecture

Kalos is a Claude Code skill (Markdown instructions, no runtime code). Config lives in YAML files — `~/.kalos/defaults.yaml` for global preferences, `~/.kalos/templates/` for shared baselines like "modern" or "minimal", and `.kalos.yaml` per project. The three-tier resolution deep-merges these layers so project-level overrides are surgical.

Adapters handle the bridge between abstract tokens and concrete targets. The Pencil adapter uses MCP tools (`set_variables`, `search_all_unique_properties`) to sync and validate. Each adapter is a self-contained section in the skill file — no external dependencies, no build step.
