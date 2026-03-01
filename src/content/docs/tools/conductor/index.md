---
title: Conductor
description: Skill composition framework for Claude Code with configurable pipelines
---

## What it does

As the Claude Code skill ecosystem grows, you accumulate skills from different sources that conflict, lack sequencing, and require manual wiring. Conductor solves this by reading a `pipelines.yaml` config and routing your task through the right workflow -- classifying the task, selecting the pipeline, sequencing skills through ordered phases, and handling user overrides.

## Key Features

- **Pipeline-based routing** — Define named workflows (quick-fix, feature, refactor) with different phase sequences and skill assignments
- **Phase system** — Ordered lifecycle slots: explore, shape, plan, build, verify, review, finish -- use as many or few as you need
- **Three skill types** — Phase skills (run in sequence), modifier skills (trigger conditionally), always-available skills (invokable anytime)
- **Task classification** — Automatically identifies whether a task is a quick fix, feature, or something else and selects the right pipeline
- **User overrides** — Skip phases, jump ahead, change pipeline, or invoke any skill directly at any point
- **First-run onboarding** — Discovers your installed skills and generates a tailored `pipelines.yaml` through conversation
- **Vendor management** — External skills pinned via git submodules with a `vendor.lock` for reproducible setups
- **Bundled skills** — Ships with shaping, breadboarding, and breadboard-reflection skills from the Shape Up methodology

## How it fits

Conductor is the orchestration layer that wires all the other Arkos skills together. A typical feature pipeline might invoke Conductor to explore (brainstorming), then plan, then build, then use Delphi to verify, then review. Apollo sets the project conventions, Conductor sequences the workflow. It integrates with any Claude Code skill -- both Arkos tools and community skills like Superpowers, ui-val, and claude-review-loop.

## Quick Start

```bash
# As a Claude Code plugin
claude plugins install github:divyekant/skill-conductor

# Or manual install
git clone --recursive https://github.com/divyekant/skill-conductor.git \
  ~/.local/share/skill-conductor
cd ~/.local/share/skill-conductor
./install.sh
```

Start a new Claude Code session. The conductor loads automatically and on first run walks you through configuration.

## Architecture

The conductor is a Claude Code skill (`skill.md`) that reads `pipelines.yaml` at the start of each session. The YAML config defines available skills (with their sources and types), phases, and named pipelines mapping phases to skill sequences.

At runtime, when you describe a task, the conductor classifies it against the defined pipelines, presents the selected workflow for confirmation, then invokes each skill in phase order. Skills can be sourced from the vendor directory (git submodules), external installs, or Claude Code plugins. The `install.sh` script symlinks everything into `~/.claude/skills/`.
