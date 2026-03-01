---
title: Hermes
description: Audience-specific documentation generation from a single codebase
---

> **GitHub:** [divyekant/hermes](https://github.com/divyekant/hermes)

## What it does

Software teams ship code, then the translation tax kicks in: support discovers features from customer questions, marketing reverse-engineers announcements from Slack threads, docs teams read raw code because nobody wrote it down. Hermes reads one source -- your code, docs, specs, and git history -- and generates structured documentation tailored for three distinct audiences with the right voice, structure, and depth for each.

## Key Features

- **Three audience outputs** — Internal (CS/Support: practical, scenario-driven), External (Users/Devs: clear, second-person), Marketing (PMM/Sales: benefit-focused, value-driven)
- **Multiple doc types per audience** — Feature handoffs, use cases, troubleshooting, FAQ, API reference, getting started, changelog, feature briefs, sales one-pagers, and more
- **Carto-enhanced, not Carto-dependent** — Best results with Carto's semantic index, but works with direct codebase reading for any project
- **Context file layering** — Layer PRDs, design docs, and specs on top of code analysis for richer documentation
- **YAML frontmatter** — Every generated document includes structured metadata for programmatic parsing
- **Update mode** — Generate delta documentation since the last run, not just full rewrites
- **Custom templates** — Override any audience's templates per-project by placing files in `.hermes/templates/`
- **Efficient context usage** — Skill is split into orchestration logic + per-audience templates, so single-audience runs load only what they need

## How it fits

Hermes is the communication layer -- the final mile that takes everything the ecosystem knows about a codebase and makes it useful to everyone in the org. It reads from Carto's index (or directly from code), uses Apollo's project conventions for context, and outputs documentation both as Markdown files in `docs/generated/` and as structured entries in Memories for AI consumption.

## Quick Start

```bash
# As a Claude Code plugin
claude plugins install github:divyekant/hermes

# Or manual install
git clone https://github.com/divyekant/hermes.git
ln -s $(pwd)/hermes/skills/hermes ~/.claude/skills/hermes
```

Then in a Claude Code session:

```
Generate docs for this project
Generate internal docs
Generate marketing docs
Update docs
Generate release docs for v2.0
```

## Architecture

Hermes is a Claude Code skill split for efficient context usage: a main `skill.md` (orchestration logic, always loaded) plus per-audience template files (`internal.md`, `external.md`, `marketing.md`) loaded only when generating for that audience. Single-audience runs use roughly half the context of a full generation.

The skill operates in three modes: Generate (full project documentation), Update (delta since last generation), and single-audience mode. It uses a tiered source system -- Carto index (best quality, function-level understanding), direct codebase reading (works for any project), and context files (PRDs, specs) -- falling back gracefully if higher-tier sources are unavailable.

Output goes to `docs/generated/` as version-controlled Markdown and optionally to Memories for AI retrieval.
