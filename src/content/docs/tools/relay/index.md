---
title: Relay
description: Peer-to-peer messaging between Claude Code and Codex CLI sessions
---

> **Status:** Private repository. Not available for install yet.

## What it does

Relay lets local AI coding sessions find each other and send messages. A Claude Code session can ask a Codex session a question, give it an instruction, or reply to it. Relay has no central server and no cloud service. Each session runs a small Relay server, and peers talk to each other directly.

## Key Features

- **Session discovery** — Each session registers an alias and a summary. Other sessions list and address it by name.
- **Pairing** — Invites connect sessions on different machines.
- **Signed messages** — Every envelope has an HMAC signature. The receiver also checks a JWT, permissions, and the maximum message depth.
- **Four message types** — `ask`, `instruct`, `inform`, and `reply`.
- **Boundaries** — A `boundaries.md` file sets guardrails. A session rejects an instruction that breaks them.
- **Durable delivery** — Relay stores every message in a JSONL thread and records a delivery receipt. If live delivery fails, the message waits in a polling inbox.

## Delivery modes

| Receiver | Mode | Behavior |
|---|---|---|
| Claude Code | Push | Native `<channel source="relay">` notification |
| Codex CLI | Poll | The agent calls `relay_check_messages` |
| Codex CLI | Native socket | Relay writes JSONL to the Codex TUI inbound socket (`codex-relay` launcher) |

## How it fits

Relay is the communication layer between agent sessions. It connects sessions that run apart, on one machine or on paired machines. It uses the same agent-agnostic approach as the rest of Arkos: Claude Code and Codex use one shared control plane.

## MCP tools

| Tool | Purpose |
|---|---|
| `relay_send` | Send an ask, instruct, inform, or reply message |
| `relay_list` | List local sessions or paired peers |
| `relay_connect` | Create or accept a pairing invite |
| `relay_threads` | List and read message history |
| `relay_status` | Show identity, host, mode, and health |
| `relay_set_identity` | Set the alias and summary for discovery |
| `relay_check_messages` | Read the polling inbox |

All state is in `~/.relay/`: the shared secret, the session registry, peers, threads, and delivery receipts.
