---
title: Pencil Prototyping
description: Visual design prototyping skill for Claude Code and Codex powered by Pencil.dev
---

> **GitHub:** [divyekant/pencil-prototyping](https://github.com/divyekant/pencil-prototyping) | **Powered by:** [Pencil.dev](https://pencil.dev)

## What it does

Pencil Prototyping is a Claude Code / Codex skill that launches [Pencil.dev](https://pencil.dev) and lets you prototype UI designs directly from your coding session. It handles installation, MCP server connection, canvas creation, drawing operations, and screenshot capture — turning Claude Code into a design tool.

## Key Features

- **Auto-install and launch** — Detects if Pencil.dev is installed, installs it if needed, and launches the editor
- **MCP integration** — Connects to the Pencil MCP server for direct canvas manipulation from Claude Code
- **Canvas prototyping** — Create screens, draw UI components, and arrange layouts on a visual canvas
- **Screenshot capture** — Take screenshots of your prototypes for documentation or review
- **Design-to-code workflow** — Prototype visually, then implement in code within the same session

## How it fits

Pencil Prototyping bridges the gap between design thinking and implementation. Before writing code, use Pencil to sketch out UI layouts, explore component arrangements, and validate visual ideas. It integrates into the Conductor pipeline as a design phase tool, sitting alongside brainstorming and before implementation.

## Usage

Pencil Prototyping is invoked as a Claude Code or Codex skill:

```
/pencil-prototyping
```

This launches Pencil.dev, connects the MCP server, and opens a canvas where you can collaboratively design with Claude.
