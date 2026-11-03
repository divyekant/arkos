---
title: Resilience
description: Agent skill for software where failures can cross component boundaries
---

> **GitHub:** [divyekant/resilience](https://github.com/divyekant/resilience)

## What it does

Resilience is a cross-runtime agent skill. It applies systems thinking to specifications, implementation, reviews, operations, incidents, and remediation. It does not add a mandatory process, a generic checklist, or speculative architecture.

## What it asks agents to do

- **Specifications** — Define degraded behavior, blast radius, signals, and recovery.
- **Implementation** — Contain retries, timeouts, ambiguous outcomes, and state transitions.
- **Reviews** — Check changes for coupling, amplification, visibility, recovery, and operator control.
- **Incidents** — Treat an incident as a network of contributing factors, not one root cause.
- **Remediation** — Fix the failure family at the smallest proven boundary.

## Two modes

| Mode | When | Behavior |
|---|---|---|
| Passive | Automatic discovery selects the skill | Adds only the relevant constraints to the requested work |
| Active | You invoke it | Makes its failure analysis and decisions visible |

## How it fits

Resilience covers the failure side of design and review. Use it with a simplicity skill when both matter: build the smallest solution that contains the demonstrated failure. Its conceptual source is Richard I. Cook's [How Complex Systems Fail](https://how.complexsystems.fail/).

## Quick Start

```bash
git clone https://github.com/divyekant/resilience.git ~/projects/resilience
mkdir -p ~/.agents/skills
ln -s ~/projects/resilience ~/.agents/skills/resilience
```

Claude Code also reads this path. If your setup needs an explicit link, add one in `~/.claude/skills/`. Start a new session, then:

- Codex: `Use $resilience to review this change.`
- Claude Code: `Use /resilience to review this change.`

The behavioral evaluations are in `evals/`. Run each prompt with and without the skill, at least five times, and compare the decisions.
