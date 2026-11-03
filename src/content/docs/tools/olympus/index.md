---
title: Olympus
description: Markdown-only build system for reliable agent-led software development
---

> **GitHub:** [divyekant/Olympus](https://github.com/divyekant/Olympus)
>
> **Status:** Experimental `0.x` release.

## What it does

Long agent sessions lose scope on large codebases. One context mixes discovery, implementation, and self-review. Olympus separates those duties. It gives a coding agent one fixed orchestration graph and a fixed catalog of sixteen roles, the **Pantheon**. Each role runs in a fresh session, and only accepted evidence moves between roles. Olympus adds no runtime, service, database, package, or scheduler. It is Markdown and Git.

## Key Features

- **One Orchestrator** — A repository-root Orchestrator owns routing and goal records.
- **Separate duties** — Explorers answer questions without edits. Builders make the smallest approved change. Fresh Reviewers check each change and return `pass`, `repair`, or `blocked`.
- **Spec and plan checks** — Spec Writers, Claims Reviewers, and Spec Reviewers define and test substantial goals. Plan Writers and Plan Verifiers cover dependent or cross-layer steps.
- **Bounded review** — Review rounds have limits, so a goal cannot loop forever.
- **Worktree per goal** — Each goal runs in its own Git worktree by default. Olympus removes the worktree only after merge, safe hand-off, or explicit abandonment.
- **Owner gates** — Release actions and remote pushes need separate owner approval.
- **Guided onboarding** — Onboarding inspects the repository first, proposes a configuration, and makes one local commit after approval.

## How it fits

Olympus is the orchestration layer for one goal from spec to merge. Conductor picks the right pipeline of skills for a task. Olympus fixes who does each step and what evidence each step must hand over.

## Quick Start

Give an authorized agent the repository URL and ask it to follow the installation guide:

```text
Install Olympus from https://github.com/divyekant/Olympus. Follow docs/INSTALLATION.md.
```

Then use it:

- One goal: `Use Olympus for: <goal>`
- This session: `Activate Olympus orchestration`
- Help: `Olympus help`

## Limits

Markdown rules are behavioral controls. They are not a security sandbox. Host permissions, Git review, and branch protection can add enforcement.
