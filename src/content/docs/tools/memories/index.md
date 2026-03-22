---
title: Memories
description: Self-hosted semantic memory for AI assistants with 5-signal hybrid search, operator workbench, lifecycle policies, and audit trail
---

> **GitHub:** [divyekant/memories](https://github.com/divyekant/memories) · **Website:** [memories.divyekant.com](https://memories.divyekant.com)

![Memory Observatory](/screenshots/memories-dashboard.png)

## What it does

AI assistants lose all context when a session ends. Memories gives them persistent, searchable memory that survives across sessions, projects, and machines. It runs locally as a Docker service, provides sub-50ms hybrid search fusing five signals (BM25 keyword, vector similarity, recency, feedback, confidence), and works with any AI client that supports MCP or REST — Claude Code, Claude Desktop, Claude Chat, Codex, Cursor, ChatGPT, OpenClaw, and anything that can call HTTP.

An operator workbench lets you create, edit, merge, and bulk-manage memories with dry-run extraction, per-fact approval, and conflict resolution. Lifecycle policies enforce per-prefix TTL and confidence-based auto-archive with operator-visible evidence. A full audit trail tracks every mutation with lifecycle timelines and evidence strength badges. Quality benchmarks via a LongMemEval eval harness provide regression tracking per release.

A full CLI with 30+ commands provides terminal-native access to every API endpoint with TTY-aware output. Multi-auth with prefix-scoped API keys lets teams share a single instance with isolated access. A bundled Memories Skill teaches Claude Code disciplined memory capture — when to store, when to recall, and when to clean up — while the Web Dashboard provides a full management interface.

## Key Features

- **5-signal hybrid search** — BM25 keyword + vector similarity + recency + feedback + confidence, fused with Reciprocal Rank Fusion, under 50ms
- **Operator workbench** — Create, inline edit, merge, pin/archive with undo, bulk actions (archive/delete/retag/re-source/merge), extraction trigger with dry-run preview and per-fact approve/reject
- **Feedback-weighted ranking** — Search learns from `useful`/`not_useful` signals over time
- **Lifecycle policies** — Per-prefix TTL and confidence-based auto-archive with operator-visible evidence
- **Full audit trail** — Every mutation tracked, lifecycle timeline in UI, evidence strength badges
- **Quality benchmarks** — LongMemEval eval harness with regression tracking per release
- **Conflict resolution** — Detects contradictory memories with Keep A / Keep B / Merge / Defer options and soft archive
- **AUDN extraction pipeline** — Automatically classifies facts as Add, Update, Delete, or Noop to keep memory clean over time
- **Memories Skill** — Bundled Claude Code skill with three responsibilities: Read (proactive recall), Write (hybrid `memory_add` + `memory_extract`), and Maintain (AUDN-driven lifecycle cleanup). +43% eval improvement over baseline
- **`memory_extract` tool** — Synchronous MCP tool that analyzes conversations and classifies facts through the AUDN loop before storing
- **Web Dashboard** — Dashboard (stats, extraction metrics, server info), Memories (tabbed detail: Overview / Lifecycle / Links), Extractions, Health (conflicts, problem queries, stale memories), API Keys, Settings — dark/light/system theme
- **Multi-auth** — Prefix-scoped API keys with three role tiers (read-only, read-write, admin) for team-safe shared instances
- **Full CLI** — 30+ commands with TTY auto-detection, layered config (flags > config file > env vars > defaults), shell completion, batch operations, and JSON/pretty output modes
- **Multi-client support** — MCP for Claude Code, Claude Desktop, Codex, Cursor; REST API for ChatGPT, Claude Chat, OpenClaw, and anything else
- **Automatic memory hooks** — 5-event lifecycle (session start, prompt, response, pre-compact, session end) for hands-free memory management
- **Novelty detection** — Checks if information is already known before storing, preventing duplicates
- **NDJSON export/import** — Filtered export with date ranges, smart dedup import, source remapping for migration or cross-instance sync
- **Auto-backups** — Snapshots after every write, with optional cron and Google Drive/S3 off-site backup
- **ONNX Runtime inference** — Same model quality as PyTorch (all-MiniLM-L6-v2) in a 68% smaller Docker image
- **Extraction providers** — Anthropic, OpenAI, ChatGPT Subscription, Ollama, or skip entirely

## How it fits

Memories is the foundational persistence layer of the Arkos ecosystem. Carto stores its codebase index in Memories. Learning stores failure-fix patterns in Memories. Hermes writes generated documentation entries to Memories. Any tool that needs to remember something across sessions uses Memories as its backend.

## Quick Start

```bash
# Clone and start
git clone https://github.com/divyekant/memories.git
cd memories
docker compose -f docker-compose.snippet.yml up -d

# Verify
curl http://localhost:8900/health

# Add a memory (REST)
curl -X POST http://localhost:8900/memory/add \
  -H "Content-Type: application/json" \
  -d '{"text": "Always use TypeScript strict mode", "source": "standards.md"}'

# Search (REST)
curl -X POST http://localhost:8900/search \
  -H "Content-Type: application/json" \
  -d '{"query": "TypeScript config", "k": 3, "hybrid": true}'

# Or use the CLI
memories add "Always use TypeScript strict mode" --source standards.md
memories search "TypeScript config" --hybrid
memories list --source standards.md
memories export -o backup.jsonl
```

The service runs at `http://localhost:8900`. API docs at `/docs`, web dashboard at `/ui`.

## Architecture

```
AI Client (Claude Code, Claude Desktop, Codex, Cursor, ChatGPT, OpenClaw)
    |
    |-- MCP protocol (Claude Code / Desktop / Codex / Cursor)
    |-- REST API (everything else)
    v
MCP Server (mcp-server/index.js)
    |
    v
Memories Service (Docker :8900)
    |-- FastAPI REST API
    |-- Hybrid Search (vector + BM25, 5-signal RRF fusion)
    |-- Markdown-aware chunking
    |-- Event Bus (SSE stream + webhook delivery)
    |-- Audit Log (append-only trail)
    |-- Memory Relationships (graph edges between memories)
    |-- Confidence Decay (time-based relevance attenuation)
    |-- Auto-backups
    v
Persistent Storage (data/)
    |-- Qdrant vector store (embeddings + metadata)
    |-- metadata.json (memory text + metadata)
    |-- backups/ (auto, keeps last 10)
```

Multi-auth middleware enforces prefix-scoped API keys at three tiers: read-only (search and list within allowed prefixes), read-write (add, update, delete within allowed prefixes), and admin (full access including key management, backups, and usage stats).

The engine maintains a Qdrant vector store alongside a BM25 keyword index. Search queries hit both and results are fused using 5-signal Reciprocal Rank Fusion (BM25, vector, recency, feedback, confidence). An event bus streams mutations via SSE and webhooks. An append-only audit log tracks every change with evidence strength badges.

The optional extraction pipeline uses an LLM (Anthropic, OpenAI, Ollama, or ChatGPT Subscription) to analyze conversation transcripts and classify facts through the AUDN loop before storing them. Lifecycle policies enforce per-prefix TTL and confidence-based auto-archive.

The Memories Skill is the Claude Code integration layer. It wraps the MCP tools with a disciplined workflow: proactively searching memories before asking clarifying questions, using `memory_add` for simple novel facts and `memory_extract` for complex multi-fact conversations or lifecycle decisions (updates, deletions, reversals). Source prefixes like `claude-code/{project}` and `learning/{project}` keep memories organized across projects.
