---
title: Ecosystem
description: How Arkos tools work together
---

# How It All Connects

The Arkos ecosystem follows a **skill-per-problem architecture**: each tool is focused on one domain, and they compose through Conductor rather than being bundled into a monolithic platform.

## The Flow

```
Developer → AI Coding Agent (Claude Code / Cursor / Codex)
    ↓
Apollo (enforces project conventions)
    ↓
Kalos (enforces design conventions → tokens, validation, import)
    ↓
Conductor (classifies task → selects pipeline → sequences skills)
    ↓
[Build Phase] → Code written by AI agent
    ↓
Carto (indexes codebase → 7-layer knowledge graph)
    ↓
Memories (stores index, learnings, context across sessions)
    ↓
Delphi (generates test scenarios from built software)
    ↓
Hermes (generates docs for internal, external, marketing audiences)
    ↓
Pheme (notifies humans across 100+ channels based on urgency)
    ↓
Argos (monitors repos for issues → triages and acts within policy)
    ↓
Learning-Skill (captures failures and fixes for future sessions)
```

## Layer Architecture

### Infrastructure Layer
**Memories** stores everything. Every other tool reads from or writes to Memories — codebase indexes (Carto), test results (Delphi), learnings (Learning-Skill), project conventions (Apollo). Multi-backend routing lets a single agent session search multiple instances in parallel with scenario-based config and provenance tracking. 5-signal hybrid search (BM25, vector, recency, feedback, confidence), an operator workbench with bulk actions and conflict resolution, lifecycle policies with per-prefix TTL and confidence-based auto-archive, a full audit trail, and quality benchmarks via LongMemEval make it production-ready for teams.

**Carto** builds a 7-layer semantic map of your codebase and stores it in Memories. A 15-command CLI with JSON envelope output, interactive setup, and streaming exports lets you script indexing into any workflow.

**SwarmEngine** orchestrates multiple AI agents in parallel or sequential DAGs. Uses PersonaSmith personas to give agents specialized roles.

### Workflow Layer
**Conductor** is the entry point. It reads your task, classifies it (quick fix, feature, complex/0-to-1), and routes it through the right pipeline of skills.

**Apollo** enforces project conventions by injecting them into every agent's instruction file. It works across Claude Code, Cursor, Codex, and other AI tools.

**Kalos** governs design conventions — the visual counterpart to Apollo. Define design tokens once and enforce them across Pencil, Tailwind, and CSS. Can also reverse-engineer tokens from existing code or live URLs.

### Quality Layer
**Delphi** generates guided test scenarios (positive, negative, edge, accessibility, security) and can execute them via browser automation.

**Hermes** generates documentation for three audiences from a single codebase: internal (CS/Support), external (users/devs), and marketing.

**Argos** watches GitHub repos for new issues and acts within policy-defined boundaries — labeling, triaging, diagnosing, and even opening PRs, all governed by a 5-level confidence system (from full autonomy to hands-off) with policy floors and security guardrails.

**Learning-Skill** auto-captures failures and their fixes, storing them in Memories so you never repeat the same mistake across sessions.

### Agent Layer
**PersonaSmith** provides 75 research-backed AI agent personas across 15 enterprise departments, ready for use with SwarmEngine.

### Observability Layer
**Deck** is a local-first dashboard that reads directly from `~/.claude/projects/` and `~/.codex/` to surface session data, costs, project health, and configuration. Live session monitoring, session replay, cost tracking, dependency analysis, security scanning, and config linting — all without any cloud dependency or telemetry.

**Pencil Prototyping** bridges design thinking and implementation. Before writing code, use Pencil.dev to sketch UI layouts, explore component arrangements, and validate visual ideas — all from within a Claude Code session.

### Utilities Layer
**Pheme** is the notification backbone. Rather than each tool implementing its own channel integration, Pheme provides a single MCP interface for reaching humans across 100+ channels via [Apprise](https://github.com/caronc/apprise). Urgency-based routing means tools just say "this is critical" and Pheme decides where it goes.

## Design Principles

1. **Specialized tools over monolithic platforms** — each tool does one thing well
2. **Compose through orchestration** — Conductor wires tools into pipelines
3. **Memory as the backbone** — Memories is the shared state layer
4. **Agent-agnostic** — works with Claude Code, Cursor, Codex, and others
