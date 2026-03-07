---
title: Argos
description: Autonomous GitHub issue monitoring and action for coding agents
---

> **GitHub:** [divyekant/argos](https://github.com/divyekant/argos)

## What it does

GitHub issues pile up. Developers context-switch to triage, label, diagnose, and sometimes fix them — all before getting back to the work they were doing. Argos watches your repositories for new issues and acts on them within explicitly configured boundaries, so the backlog stays managed while you stay focused.

Argos is a Claude Code plugin that polls for new issues, classifies them, and takes tiered actions (auto, approve, deny) based on a per-repo policy YAML. It leverages the full CC ecosystem — skills, hooks, memories, MCP servers, and your local codebase — to investigate and respond with rich context.

## Key Features

- **Policy-driven autonomy** — Per-repo YAML policies define which actions are auto, require approval, or are denied. Actions not listed are implicitly denied.
- **Three approval modes** — `wait` (block until explicit approval), `timeout` (skip if no response), `default` (proceed if no rejection)
- **Guardrails** — Hard limits on actions per hour, max open PRs, required tests, protected paths, and max files changed
- **Issue filters** — Watch specific labels, ignore others, set max age, only process new issues
- **Pluggable notifications** — GitHub comments, macOS native notifications, session context injection. Extensible via drop-in shell scripts.
- **Cross-session learning** — Memories MCP stores patterns, outcomes, and resolution history. Argos improves over time — detecting duplicates, recognizing hotspots, learning assignment patterns.
- **Guided onboarding** — `/watch` walks you through policy creation one question at a time, then runs a dry run before going live

## How it fits

Argos is the autonomous operations layer. While Conductor sequences skills for active development, Argos handles the reactive side — incoming issues that need triage, diagnosis, and sometimes fixes. It uses Carto's index to understand the codebase, Memories for persistent learning, and can invoke Delphi for test generation on fixes. Apollo's project conventions guide how Argos structures branches and commits.

## Quick Start

```bash
# Install as a Claude Code plugin
claude plugins install github:divyekant/argos
```

Then in a Claude Code session:

```
/watch owner/repo
```

Argos walks you through policy creation and starts monitoring.

## Commands

| Command | Description |
|---|---|
| `/watch owner/repo` | Start watching a repository for new issues |
| `/unwatch owner/repo` | Stop watching a repository |
| `/argos-status` | Show all watched repos, queue depth, and recent actions |
| `/argos-approve` | Review and approve/reject pending actions |

## Architecture

Argos is a CC plugin — commands, hooks, a core skill, and shell scripts. It uses `/loop` as the scheduler, `gh` CLI for GitHub API, and Memories MCP for persistent state.

```
/watch owner/repo
    |
    v
/loop 5m "invoke argos skill for owner/repo"
    |
    v  (every 5 minutes)
poll.sh -> "any new issues?" (bash, no LLM cost)
    |
    +-> NO  -> sleep (zero tokens)
    +-> YES -> invoke SKILL.md with issue data
                |
                v
           Read policy YAML -> classify -> check tier -> act or queue
```

Polling is pure bash — no LLM tokens burned when there are no new issues.

## Dependencies

- **gh** — GitHub CLI, authenticated (`gh auth status`)
- **jq** — JSON processor for parsing API responses
- **Memories MCP** — Persistent memory for patterns, decisions, and outcomes across sessions
