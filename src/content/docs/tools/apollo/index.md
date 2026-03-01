---
title: Apollo
description: Agent-agnostic project lifecycle manager that enforces development conventions
---

> **GitHub:** [divyekant/apollo](https://github.com/divyekant/apollo)

## What it does

Apollo encodes your development preferences into a universal YAML config and enforces them by injecting rules into every coding agent's instruction file simultaneously. Whether you use Claude Code, Cursor, Codex, Copilot, Windsurf, or Aider, Apollo writes the same conventions to each agent's native format so your project standards are consistent everywhere.

## Key Features

- **Multi-agent injection** — Writes conventions to CLAUDE.md, .cursor/rules/apollo.mdc, AGENTS.md, .windsurfrules, .github/copilot-instructions.md, and CONVENTIONS.md simultaneously
- **Three-tier config** — Global defaults, project-type templates, and per-project overrides
- **Built-in templates** — oss (open source), personal (side projects), and work (corporate) templates with sensible defaults
- **Conversational setup** — `/apollo config` walks you through preferences interactively
- **Project scaffolding** — `/apollo init` creates a new project from a template
- **Health checks** — `/apollo check` validates repo state and surfaces gaps in conventions, docs, or tooling
- **Mid-session updates** — Say "add to Apollo: always use feature branches" to update config on the fly
- **Managed sections** — Apollo owns only the content between `<!-- APOLLO:START -->` and `<!-- APOLLO:END -->` markers, leaving your own instructions untouched
- **Release workflow** — `/apollo release` guides you through version bumps, changelog, tagging, and publishing

## How it fits

Apollo is the governance layer. It sits at the project level and defines the rules that all other tools respect. When Conductor sequences a workflow, it follows the conventions Apollo set. When Delphi generates test scenarios, it knows the project's testing framework from Apollo's config. Apollo is typically the first tool you set up in a new project.

## Quick Start

```bash
# As a Claude Code plugin
claude plugins install github:divyekant/apollo

# Or manual install
ln -s /path/to/apollo/skills/apollo ~/.claude/skills/apollo
```

Then in a Claude Code session:

```
/apollo config    # Set up global preferences
/apollo init      # Create a new project from a template
/apollo check     # Validate an existing project
```

## Architecture

Apollo is a pure skill (Markdown instructions, no runtime code). The config system uses three-tier YAML resolution: `~/.apollo/defaults.yaml` for global preferences, `~/.apollo/templates/<name>.yaml` for project-type templates, and `.apollo.yaml` in the project root for per-project overrides. Each tier inherits from and can override the previous one.

On every injection action (`init`, `check`, config update), Apollo reads the merged config and writes a managed section to each configured agent's instruction file using the agent-appropriate format (Markdown with markers for most, MDC frontmatter for Cursor). An optional session-start hook can run `/apollo check` automatically at the beginning of each coding session.
