---
title: Learning
description: Failure capture and cross-session learning for Claude Code
---

> **GitHub:** [divyekant/learning-skill](https://github.com/divyekant/learning-skill)

## What it does

Claude's context resets every session. When it spends 20 minutes debugging something, that knowledge is lost. The Learning skill makes Claude automatically record what went wrong and what fixed it, so it (or you) never repeats the same mistake. It captures failure-to-fix patterns in real time and retrieves relevant learnings at the start of new tasks.

## Key Features

- **Automatic capture** — Claude recognizes failures during a session and records them without manual invocation
- **Structured schema** — Every learning follows a consistent format: category, one-line summary, what was tried, what worked, and context
- **Five categories** — debugging, implementation, infra/config, api-usage, tooling
- **Two storage backends** — Auto-memory files (zero dependencies, built into Claude Code) or Memories MCP (semantic search, dedup, cross-project retrieval)
- **Auto-detection** — The skill detects which backend is available and uses Memories MCP if present, otherwise falls back to file-based storage
- **Staleness management** — When a better fix is found, old learnings are superseded, not just accumulated. Entries older than 6 months are treated as lower-confidence hints
- **Stop hook safety net** — A hook analyzes the transcript at session end for failure-fix patterns that were not captured in real time
- **Cross-project retrieval** — With Memories backend, learnings from one project are searchable in all projects

## How it fits

Learning is the institutional memory of the development workflow. While Memories provides the raw storage, Learning adds the specific pattern of capturing what went wrong and what fixed it. Conductor can invoke Learning implicitly during any build or debug phase. The learnings it captures make every subsequent session more efficient, especially for recurring infrastructure, config, and tooling issues.

## Quick Start

```bash
# As a Claude Code plugin
claude plugins install github:divyekant/learning-skill

# Or manual install
git clone https://github.com/divyekant/learning-skill.git
cd learning-skill
bash install.sh
```

Restart Claude Code. The skill activates automatically when Claude encounters a failure and finds the fix -- no manual invocation needed.

## Architecture

The Learning skill has two layers. The real-time layer is a Claude Code skill (`SKILL.md`) that instructs Claude to recognize failure-to-fix patterns during a session and record them using a structured schema. The safety-net layer is a Stop hook (`learning-extract.sh`) that runs at session end, analyzing the full transcript for patterns that were not captured during the session.

Storage uses either auto-memory files (`learnings.md` for active learnings, `learnings-archive.md` for superseded ones) or the Memories MCP server. With Memories, deduplication and reconciliation are handled by the API. With files, the skill manages its own supersession logic, moving outdated entries to the archive when better fixes are found.
