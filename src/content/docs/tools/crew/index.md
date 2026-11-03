---
title: Crew
description: Multi-model build orchestrator. The session model leads, other models build.
---

> **GitHub:** [divyekant/crew](https://github.com/divyekant/crew)

## What it does

Crew makes your session model the controller of a build. The controller splits implementation work by domain, sends each part to the worker model for that domain, reviews every diff, and integrates the results. One shared skill supports Claude Code and Codex as the controller.

## Workers

| Worker | Domain |
|---|---|
| `frontend` | Components, styling, layout, UX states, accessibility |
| `backend` | APIs, services, database and schema, auth, business logic |
| `mechanical` | Tests, fixtures, renames, codemods, boilerplate |

Each worker definition is one Markdown file. It sets the model, reasoning effort, transport, brief additions, failure behavior, and review focus for that domain.

## How it works

1. **Decompose** — The controller classifies each work item by its main domain. For a full-stack feature, it writes the interface contract first. Then frontend and backend work starts in parallel against that contract.
2. **Brief** — Each worker gets a self-contained brief: the goal, the files it owns, what is out of scope, constraints, acceptance criteria, an iteration limit, and the return format.
3. **Dispatch** — Independent workers run in parallel. Work in the same repository uses Git worktree isolation. Each file has one owner.
4. **Review** — The controller applies a review gate before it accepts any worker output.
5. **Report** — The report attributes each change to its worker and lists what was verified.

## How it fits

Crew is the build step for substantial work. Conductor can add Crew to the build phase of large pipelines and leave it out of small-fix pipelines.

## Quick Start

```bash
claude plugin marketplace add divyekant/dk-marketplace
claude plugin install crew
```

Crew needs Claude Code with subagent support and the Codex plugin with `codex login` completed. Then work as usual, or invoke it directly:

```text
/crew build the share-link feature: API endpoint + settings UI + tests
```
