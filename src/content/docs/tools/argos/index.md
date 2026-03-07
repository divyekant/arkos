---
title: Argos
description: The all-seeing issue guardian — zero-cost polling, local-first investigation, policy-governed autonomy
---

> **GitHub:** [divyekant/argos](https://github.com/divyekant/argos)

## What it does

GitHub issues pile up. Developers context-switch to triage, label, diagnose, and sometimes fix them — all before getting back to the work they were doing. Argos watches your repositories for new issues, investigates them against your local codebase, and acts within boundaries you define.

**Zero-cost when idle.** The entire polling pipeline is bash and `jq`. No LLM tokens are consumed until an issue actually needs attention. At 5-minute intervals across 10 repos, that's 2,880 daily polls that cost nothing — the LLM only activates when there's real work to do.

**Local-first investigation.** Unlike server-side tools, Argos runs on your machine with full access to your codebase. It can trace through source files, check test coverage, and identify affected functions — the same investigation you'd do manually, done before you context-switch.

## Key Features

- **Policy-governed autonomy** — Every action falls into one of three tiers: **auto** (execute immediately), **approve** (queue for review), or **deny** (never execute). Hard guardrails enforce rate limits, protected file paths, and max concurrent PRs regardless of policy.
- **5-level confidence system** — From full autonomy (level 1: fix, test, commit, PR) to hands-off (level 5: label and flag only). Policy floors can escalate based on file paths, issue type, and author trust.
- **Prompt injection detection** — 12+ patterns covering instruction overrides, identity manipulation, LLM control tokens, and obfuscation. Injection triggers automatic level 5 (can't touch), blocking all autonomous action.
- **Security hardening** — Shell injection prevention, path traversal protection, protected file paths (`.env*`, `secrets/`, `*.pem`), label whitelist validation, rate limiting (default: 10 actions/hour).
- **Pluggable notifications** — GitHub comments, macOS native, session context injection. Extensible via drop-in adapter scripts.
- **Cross-session learning** — Memories MCP stores patterns, outcomes, and resolution history. Argos improves over time — detecting duplicates, recognizing hotspots, learning assignment patterns.
- **Guided onboarding** — `/watch` walks you through a 9-step flow — one question at a time, sensible defaults, no YAML to write by hand. Creates your policy, runs a dry-run preview, and starts watching after you confirm.

## Confidence Levels

| Level | Name | What Argos Does |
|---|---|---|
| 1 | Should Fix | Full autonomy — fix, test, commit, open PR |
| 2 | Fix + Summary Review | Fix and PR, human gets summary to glance at |
| 3 | Fix + Thorough Review | Prepare fix on branch, PR opens after human reviews |
| 4 | Needs Approval | Investigate only, human decides whether to proceed |
| 5 | Can't Touch | Label and flag for human attention, no investigation |

## How it fits

Argos is the autonomous operations layer. While Conductor sequences skills for active development, Argos handles the reactive side — incoming issues that need triage, diagnosis, and sometimes fixes. It uses Carto's index to understand the codebase, Memories for persistent learning, and can invoke Delphi for test generation on fixes. Apollo's project conventions guide how Argos structures branches and commits. Notifications route through Pheme for multi-channel delivery.

## Quick Start

```bash
# Install as a Claude Code plugin
claude plugins install github:divyekant/argos
```

Then in a Claude Code session:

```
/watch owner/repo
```

Argos walks you through guided onboarding and starts monitoring.

## Commands

| Command | Description |
|---|---|
| `/watch owner/repo` | Start watching (with guided onboarding on first run) |
| `/unwatch owner/repo` | Stop watching |
| `/argos-status` | Watched repos, queue depth, recent actions, guardrail utilization |
| `/argos-approve` | Review and approve/reject pending actions |

## Architecture

```
/loop invokes Argos every N minutes
  → gh issue list          (GitHub CLI — no LLM)
  → jq filter pipeline     (bash — no LLM)
  → 0 new issues? Exit.    (zero tokens consumed)
  → New issues? Claude activates:
      → Read project context (CLAUDE.md, README, docs)
      → Classify (bug/enhancement/duplicate/question)
      → Assess confidence level (1-5)
      → Apply policy floors (can only escalate)
      → Execute based on final level
      → Notify via channels (internal/external content)
      → Store learnings in Memories MCP
```

## Dependencies

- **gh** — GitHub CLI, authenticated (`gh auth status`)
- **jq** — JSON processor
- **python3** + **pyyaml** — YAML policy parsing
- **Memories MCP** — Cross-session learning
- **Claude Code** — Runtime environment
