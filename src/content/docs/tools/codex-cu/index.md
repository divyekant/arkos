---
title: codex-cu
description: The Codex computer-use runtime, available inside Claude Code
---

> **GitHub:** [divyekant/codex-cu](https://github.com/divyekant/codex-cu)

## What it does

codex-cu is a Claude Code plugin that gives Claude the computer-use runtime of the Codex app (`cua_repl`). With it, Claude can control Chrome through the Codex Chrome extension, the Codex in-app browser, and macOS apps.

## Key Features

- **One MCP proxy** — The plugin starts `cua_repl` from the newest installed Codex version. It adds the turn metadata that Codex requires to each tool call.
- **Turn hand-off** — A Stop hook ends the Codex turn when the Claude turn ends. Codex then releases the browser tabs of that turn.
- **Session isolation** — Each proxy listens on its own socket for one Claude process. Other sessions do not get its messages.
- **No pinned config** — The proxy reads the Codex config each time it starts, so a Codex app update needs no plugin change.

## How it fits

codex-cu connects two agent hosts. Arkos tools work with Claude Code and Codex. codex-cu lets a Claude Code session use a capability that only the Codex app ships.

## Quick Start

You need macOS, the Codex app with its Chrome plugin and extension, and Node.js on `PATH`.

```bash
claude plugin marketplace add divyekant/dk-marketplace
claude plugin install codex-cu@dk-marketplace
```

Start a new Claude Code session. The tools show as `mcp__plugin_codex-cu_codex-cu__js` and `mcp__plugin_codex-cu_codex-cu__js_reset`.

## Limits

- The Stop hook does not run when you interrupt a turn. Tabs of an interrupted turn stay in use until the next turn ends.
- The proxy must be a direct child of the Claude process. Do not wrap the `node` command in `npx` or a shell.
