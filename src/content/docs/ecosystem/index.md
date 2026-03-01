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
Learning-Skill (captures failures and fixes for future sessions)
```

## Layer Architecture

### Infrastructure Layer
**Memories** stores everything. Every other tool reads from or writes to Memories — codebase indexes (Carto), test results (Delphi), learnings (Learning-Skill), project conventions (Apollo).

**Carto** builds a 7-layer semantic map of your codebase and stores it in Memories. Other tools query this map to understand code structure without re-reading files.

**SwarmEngine** orchestrates multiple AI agents in parallel or sequential DAGs. Uses PersonaSmith personas to give agents specialized roles.

### Workflow Layer
**Conductor** is the entry point. It reads your task, classifies it (quick fix, feature, complex/0-to-1), and routes it through the right pipeline of skills.

**Apollo** enforces project conventions by injecting them into every agent's instruction file. It works across Claude Code, Cursor, Codex, and other AI tools.

### Quality Layer
**Delphi** generates guided test scenarios (positive, negative, edge, accessibility, security) and can execute them via browser automation.

**Hermes** generates documentation for three audiences from a single codebase: internal (CS/Support), external (users/devs), and marketing.

**Learning-Skill** auto-captures failures and their fixes, storing them in Memories so you never repeat the same mistake across sessions.

### Agent Layer
**PersonaSmith** provides 75 research-backed AI agent personas across 15 enterprise departments, ready for use with SwarmEngine.

## Design Principles

1. **Specialized tools over monolithic platforms** — each tool does one thing well
2. **Compose through orchestration** — Conductor wires tools into pipelines
3. **Memory as the backbone** — Memories is the shared state layer
4. **Agent-agnostic** — works with Claude Code, Cursor, Codex, and others
