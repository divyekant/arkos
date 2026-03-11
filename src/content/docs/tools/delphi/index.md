---
title: Delphi
description: Test scenario generation and execution for coding agents
---

> **GitHub:** [divyekant/delphi](https://github.com/divyekant/delphi)

## What it does

Coding agents build software, run unit tests, and call it done. But the gap between "tests pass" and "this actually works for users" is enormous. Delphi fills that gap by generating exhaustive test scenarios -- guided cases -- covering positive, negative, edge, accessibility, and security paths. It can then execute those cases automatically via browser automation or programmatic verification and produce evidence-backed reports.

## Key Features

- **Surface discovery** — Analyzes code, docs, and running apps to identify all testable surfaces (UI, API, CLI, background jobs)
- **Guided case generation** — Produces structured Markdown test scenarios with metadata, preconditions, steps, expected outcomes, and success criteria
- **Five case types** — Positive (happy path), negative (error handling), edge (boundary conditions), accessibility, and security
- **Priority levels** — P0 (critical), P1 (important), P2 (nice-to-have) for test triage
- **Automated execution** — Runs generated cases step-by-step with browser automation or API calls, capturing screenshots and responses as evidence
- **Report generation** — Produces execution reports in `tests/guided-cases/reports/` with pass/fail status and evidence
- **Pipeline integration** — Plugs into Conductor's verify phase via `pipelines.yaml`

## How it fits

Delphi is the verification layer. In a typical Conductor pipeline, Delphi runs in the verify phase after code is built. It reads the codebase (optionally enhanced by Carto's index) to understand what was built, generates comprehensive test scenarios, and can execute them automatically. Apollo's project config tells Delphi which testing patterns to follow.

## Quick Start

```bash
# As a Claude Code plugin
claude plugins install github:divyekant/delphi

# Or manual install
git clone https://github.com/divyekant/delphi.git
ln -sf $(pwd)/delphi/skills/delphi ~/.claude/skills/delphi
```

Then in a Claude Code session:

```
Generate guided cases for this project
Execute guided cases
Run P0 guided cases
```

## Architecture

Delphi is a Claude Code / Codex skill (Markdown instructions, no runtime code). When invoked, it follows a structured workflow: first analyzing the codebase to discover testable surfaces, then presenting a surface map for confirmation, then generating structured Markdown case files to `tests/guided-cases/`.

Each guided case is a self-contained Markdown file with YAML-style metadata (type, priority, surface, flow), preconditions, numbered steps with expected outcomes, and success criteria checklists. For execution, Delphi walks through each step using the appropriate tool (browser automation for UI, curl/fetch for API, shell commands for CLI) and captures evidence at each step.
