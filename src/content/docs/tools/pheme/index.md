---
title: Pheme
description: Universal agent-to-human notification layer powered by Apprise
---

> **GitHub:** [divyekant/pheme](https://github.com/divyekant/pheme) | **Powered by:** [Apprise](https://github.com/caronc/apprise)

## What it does

AI agents run autonomously but still need to reach humans: approvals, error alerts, status updates, task completions. Without a standard notification layer, every agent reinvents channel integration. Pheme wraps Apprise in an MCP server so any AI agent can notify humans across 100+ channels — Slack, Telegram, email, Discord, webhooks, and more — via a single tool call.

## Key Features

- **One interface** — 4 MCP tools cover all notification needs (`send`, `list_channels`, `get_routes`, `test_channel`)
- **100+ channels** — anything Apprise supports, Pheme supports (Slack, Telegram, email, Discord, webhooks, macOS native, and more)
- **Urgency-based routing** — critical alerts fan out to multiple channels; low-priority updates stay quiet
- **Zero channel lock-in** — channels are configured via `PHEME_*` env vars, not code
- **Security built in** — message length caps, secret detection warnings, audit logging
- **Custom route overrides** — project-level or user-level YAML route configs
- **Claude Code plugin + Codex support** — slash commands (`/pheme send`, `/pheme test`, `/pheme-status`) and an agent skill, with Codex MCP integration

## How it fits

Pheme is the notification backbone. Any tool in the Arkos ecosystem that needs to reach a human can route through Pheme instead of implementing its own channel integration. Argos can send issue alerts, Delphi can report test results, Conductor can notify on pipeline completions — all through a single, consistent notification layer. Channels are configured once and shared across all tools.

## Quick Start

```bash
# Clone and install
git clone https://github.com/divyekant/pheme.git
cd pheme
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

Configure at least one channel:

```bash
export PHEME_SLACK="slack://tokenA/tokenB/tokenC/#general"
```

Run the MCP server:

```bash
python -m server
```

## MCP Tools

| Tool | Description |
|---|---|
| `send` | Send a notification to channels by name or urgency level |
| `list_channels` | Show all configured channels from `PHEME_*` env vars |
| `get_routes` | Show urgency-to-channel routing table |
| `test_channel` | Verify a channel is properly configured |

## Urgency Routing

| Urgency | Default Channels | Use Case |
|---|---|---|
| `critical` | slack, telegram, system | Production down, security incidents |
| `high` | slack | PR reviews, build failures |
| `normal` | slack | Task completions, status updates |
| `low` | session | Background activity, FYI |

## Dependencies

- **Python 3.10+** — runtime
- **[Apprise](https://github.com/caronc/apprise)** — notification delivery engine (installed automatically)
- **[FastMCP](https://github.com/jlowin/fastmcp)** — MCP server framework (installed automatically)
