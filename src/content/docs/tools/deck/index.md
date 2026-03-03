---
title: Deck
description: Local-first dashboard for Claude Code and Codex CLI analytics
---

> **GitHub:** [divyekant/deck](https://github.com/divyekant/deck)

![Deck Dashboard](/screenshots/deck-dashboard.png)

## What it does

Deck is a local-first dashboard that reads directly from `~/.claude/projects/` and `~/.codex/` to surface session data, costs, project health, and configuration. No cloud, no database, no telemetry — everything stays on your machine. It provides a single pane of glass for monitoring, analyzing, and managing your AI coding sessions.

## Key Features

- **Live session monitoring** — Real-time detection and monitoring of active Claude Code and Codex sessions
- **Session replay** — Full conversation replay with play/pause/speed controls, timeline scrubber, and thinking block expansion
- **Cost tracking** — Three-tab cost breakdown across overview, tokens, and models with budget alerts
- **Project health scoring** — Per-project health across 5 dimensions with diagnostic report generation
- **Workspace visualization** — Work graph, repo pulse heatmaps, timeline feeds, and diff tracking
- **Config inspector** — Browse skills, agents, memory files, and hooks across all projects
- **Dependency analysis** — Package version mismatch detection with cross-project shared dependency graphs
- **Security scanning** — Finds `.env` files and flags exposed secrets not in `.gitignore`
- **Session launcher** — Launch Claude Code or Codex sessions directly from the browser with model selection and project picker
- **Config linting** — CLAUDE.md and settings.json quality checker with actionable issues

## How it fits

Deck is the observability layer of the Arkos ecosystem. While other tools help you build, test, and document, Deck helps you understand how your AI-assisted development is going — session costs, project health, configuration hygiene, and active session state. It reads the artifacts that Claude Code and Codex produce and presents them in a browsable, searchable dashboard.

## Quick Start

```bash
# Clone and run with Docker
git clone https://github.com/divyekant/deck.git
cd deck
docker compose up -d --build
```

Open [http://localhost:3001](http://localhost:3001).

### Local development

```bash
bun install
bun dev
```

## Architecture

Deck is a Next.js application that reads directly from the filesystem. It scans Claude Code and Codex project directories to build session histories, cost data, and configuration views. The backend uses file-watching for live session detection and provides a REST API for the dashboard frontend.

### Pages

| Section | Pages |
|---------|-------|
| **Overview** | Home dashboard with aggregate stats, budgets, and project breakdowns |
| **Monitor** | Live sessions, session table, session replay, costs, setup inspector, ports |
| **Workspace** | Repos, work graph, repo pulse, timeline, diffs, snapshots |
| **Config** | Skills browser, agents, memory viewer, hooks inspector |
| **Health** | Hygiene scores, dependencies, worktrees, env scanner, config lint |
