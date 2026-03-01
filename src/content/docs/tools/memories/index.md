---
title: Memories
description: Local semantic memory for AI assistants with hybrid BM25+vector search
---

> **GitHub:** [divyekant/memories](https://github.com/divyekant/memories)

## What it does

AI assistants lose all context when a session ends. Memories gives them persistent, searchable memory that survives across sessions, projects, and machines. It runs locally as a Docker service, provides sub-50ms hybrid search combining BM25 keyword matching with vector similarity, and works with any AI client that supports MCP or REST.

## Key Features

- **Hybrid search** — BM25 keyword + vector similarity with Reciprocal Rank Fusion, under 50ms
- **AUDN extraction pipeline** — Automatically classifies facts as Add, Update, Delete, or Noop to keep memory clean over time
- **Multi-client support** — MCP for Claude Code, Cursor, Codex; REST API for ChatGPT, OpenClaw, and anything else
- **Automatic memory hooks** — 5-event lifecycle (session start, prompt, response, pre-compact, session end) for hands-free memory management
- **Novelty detection** — Checks if information is already known before storing, preventing duplicates
- **Auto-backups** — Snapshots after every write, with optional cron and Google Drive/S3 off-site backup
- **ONNX Runtime inference** — Same model quality as PyTorch (all-MiniLM-L6-v2) in a 68% smaller Docker image
- **Web UI** — Built-in memory browser at `/ui` for viewing and managing stored memories
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
