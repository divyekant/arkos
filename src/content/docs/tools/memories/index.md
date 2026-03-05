---
title: Memories
description: Local semantic memory for AI assistants with hybrid search, disciplined capture, and a built-in dashboard
---

> **GitHub:** [divyekant/memories](https://github.com/divyekant/memories)

![Memory Observatory](/screenshots/memories-dashboard.png)

## What it does

AI assistants lose all context when a session ends. Memories gives them persistent, searchable memory that survives across sessions, projects, and machines. It runs locally as a Docker service, provides sub-50ms hybrid search combining BM25 keyword matching with vector similarity, and works with any AI client that supports MCP or REST. A bundled Memories Skill teaches Claude Code disciplined memory capture — when to store, when to recall, and when to clean up — while the Web Dashboard provides a full management interface for browsing, searching, and monitoring memory usage.

## Key Features

- **Hybrid search** — BM25 keyword + vector similarity with Reciprocal Rank Fusion, under 50ms
- **AUDN extraction pipeline** — Automatically classifies facts as Add, Update, Delete, or Noop to keep memory clean over time
- **Memories Skill** — Bundled Claude Code skill with three responsibilities: Read (proactive recall before questions), Write (hybrid `memory_add` + `memory_extract` for intelligent storage), and Maintain (AUDN-driven lifecycle cleanup). +43% eval improvement over baseline
- **`memory_extract` tool** — Synchronous MCP tool that analyzes conversations and classifies facts through the AUDN loop before storing, handling adds, updates, and deletions in a single call
- **Web Dashboard** — Full management UI at `/ui` with sidebar navigation, usage analytics, list+detail and grid views, source filtering, dark/light theme, and responsive mobile layout
- **Multi-client support** — MCP for Claude Code, Cursor, Codex; REST API for ChatGPT, OpenClaw, and anything else
- **Automatic memory hooks** — 5-event lifecycle (session start, prompt, response, pre-compact, session end) for hands-free memory management
- **Novelty detection** — Checks if information is already known before storing, preventing duplicates
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

# Add a memory
curl -X POST http://localhost:8900/memory/add \
  -H "Content-Type: application/json" \
  -d '{"text": "Always use TypeScript strict mode", "source": "standards.md"}'

# Search
curl -X POST http://localhost:8900/search \
  -H "Content-Type: application/json" \
  -d '{"query": "TypeScript config", "k": 3, "hybrid": true}'
```

The service runs at `http://localhost:8900`. API docs at `/docs`, memory browser at `/ui`.

## Architecture

Memories runs as a FastAPI service inside Docker. Clients connect via MCP protocol (Claude Code, Codex, Cursor) or REST API (everything else). The MCP server is a thin Node.js wrapper that translates MCP tool calls into REST requests.

Internally, the engine maintains a vector index (ONNX Runtime embeddings) alongside a BM25 keyword index. Search queries hit both and results are fused using Reciprocal Rank Fusion. All data is persisted to disk as `vector_index.bin` + `metadata.json` with automatic backups after every write.

The optional extraction pipeline uses an LLM (Anthropic, OpenAI, Ollama, or ChatGPT Subscription) to analyze conversation transcripts and classify facts through the AUDN loop before storing them.

The Memories Skill is the Claude Code integration layer. It wraps the MCP tools with a disciplined workflow: proactively searching memories before asking clarifying questions, using `memory_add` for simple novel facts and `memory_extract` for complex multi-fact conversations or lifecycle decisions (updates, deletions, reversals). Source prefixes like `claude-code/{project}` and `learning/{project}` keep memories organized across projects.
