# Carto & Memories Docs Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the Arkos docs site to reflect Carto v1.1.0+v1.2.0 and Memories v1.5.0+v2.0.0 features.

**Architecture:** In-place updates to 4 existing Starlight markdown pages + 1 screenshot capture. No new pages, no structural changes.

**Tech Stack:** Astro/Starlight (markdown content), browser automation for screenshot capture.

---

### Task 1: Capture Carto Dashboard Screenshot

**Files:**
- Create: `public/screenshots/carto-dashboard.png` (overwrite existing)

**Step 1: Open Carto dashboard in browser**

Navigate to `http://localhost:8950` in Chrome. The dashboard should show the v1.1.0 redesign with stat cards, always-expanded sidebar, and monochrome slate theme.

**Step 2: Capture screenshot**

Take a screenshot of the dashboard page at a clean viewport (1280x800). Save to `public/screenshots/carto-dashboard.png`, replacing the existing file.

**Step 3: Verify screenshot**

View the saved file to confirm it shows the updated dashboard with stat cards and sidebar.

---

### Task 2: Update Carto Page

**Files:**
- Modify: `src/content/docs/tools/carto/index.md`

**Step 1: Update frontmatter description**

Change line 3 from:
```
description: Intent-aware codebase intelligence for AI assistants
```
to:
```
description: Intent-aware codebase intelligence with CLI and web dashboard
```

**Step 2: Update "What it does" paragraph**

Replace line 12 with:
```
Carto scans your codebase, builds a layered semantic index using LLMs, and stores it in Memories for fast retrieval. A full CLI with TTY-aware output, JSON envelope contract, and 15 commands covers everything from interactive setup to streaming exports. It produces skill files (`CLAUDE.md`, `.cursorrules`) that give AI coding assistants instant, structured context about your project -- architecture, patterns, conventions, and cross-component wiring.
```

**Step 3: Update Key Features section**

Replace lines 16-25 (the feature bullet list) with:
```markdown
- **5-phase indexing pipeline** — Scan, Chunk+Atoms, History+Signals, Deep Analysis, Store
- **7-layer context graph** — Map, Atoms, History, Signals, Wiring, Zones, Blueprint -- each layer captures a different dimension of understanding
- **Tree-sitter AST parsing** — Language-aware chunking for Go, TypeScript, JavaScript, Python, Java, Rust (30+ languages detected)
- **Two-tier LLM strategy** — Fast tier (Haiku) for high-volume atom summaries, deep tier (Opus) for architectural analysis
- **Tiered retrieval** — mini (~5KB), standard (~50KB), or full (~500KB) context depending on task complexity
- **Incremental indexing** — SHA-256 manifest tracks file changes so subsequent runs only process what changed
- **Skill file generation** — Produces `CLAUDE.md` and `.cursorrules` with architecture, patterns, and conventions
- **Module detection** — Automatically identifies project boundaries from go.mod, package.json, Cargo.toml, pom.xml, pyproject.toml
- **15-command CLI** — `index`, `query`, `modules`, `patterns`, `status`, `serve`, `projects`, `config`, `init`, `completions`, `export`, `import`, `logs`, `upgrade`, plus shell completions for bash/zsh/fish
- **JSON envelope + TTY detection** — All commands wrap output in `{"ok": true, "data": ...}` for scripts; human-friendly tables in the terminal
- **Built-in web dashboard** — Stat cards, always-expanded sidebar, settings UI, quick query suggestions with relevance badges
- **Natural language queries** — Ask questions about your codebase and get answers from the index
- **Typed errors** — 5 error codes mapped to exit codes for reliable scripting
- **Confirmation guards** — Destructive operations require `--yes` flag, preventing accidental data loss
```

**Step 4: Update Quick Start section**

Replace lines 33-50 (the code block) with:
```bash
# Build
git clone https://github.com/divyekant/carto.git
cd carto/go
go build -o carto ./cmd/carto

# Configure interactively
carto init

# Or configure via environment
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Index a codebase
carto index /path/to/your/project

# Query the index
carto query "How does authentication work?"

# Generate skill files
carto patterns /path/to/your/project --format all

# Export index as NDJSON
carto export my-project --layers atoms,wiring

# Enable shell completions
carto completions zsh > ~/.zfunc/_carto
```

**Step 5: Update Architecture section**

Replace lines 56-58 with:
```markdown
Carto is a Go binary with CGO (for Tree-sitter grammars). The CLI entry point uses Cobra with 15 commands, all wrapped in a JSON envelope contract (`{"ok": true, "data": ...}` / `{"ok": false, "error": ..., "code": ...}`). TTY detection auto-switches between human-friendly tables and machine-readable JSON. Internally, a pipeline orchestrator runs five phases sequentially: the scanner walks directories respecting `.gitignore`, the chunker uses Tree-sitter ASTs to split files at function/class boundaries, the atom extractor sends chunks to a fast-tier LLM for structured summaries, the deep analyzer uses a deep-tier LLM for cross-component wiring and architecture narratives, and finally everything is serialized to Memories with structured source tags enabling precise retrieval and cleanup. Every command is audit-logged, and destructive operations require explicit `--yes` confirmation.

A React SPA dashboard is embedded in the binary for visual browsing and querying, featuring stat cards, an always-expanded sidebar, and a monochrome slate design language.
```

**Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

---

### Task 3: Update Memories Page

**Files:**
- Modify: `src/content/docs/tools/memories/index.md`

**Step 1: Update frontmatter description**

Change line 3 from:
```
description: Local semantic memory for AI assistants with hybrid search, disciplined capture, and a built-in dashboard
```
to:
```
description: Local semantic memory for AI assistants with hybrid search, CLI, multi-auth, and a built-in dashboard
```

**Step 2: Update "What it does" paragraph**

Replace line 12 with:
```
AI assistants lose all context when a session ends. Memories gives them persistent, searchable memory that survives across sessions, projects, and machines. It runs locally as a Docker service, provides sub-50ms hybrid search combining BM25 keyword matching with vector similarity, and works with any AI client that supports MCP or REST. A full CLI with 30+ commands provides terminal-native access to every API endpoint with TTY-aware output. Multi-auth with prefix-scoped API keys lets teams share a single Memories instance with isolated access. A bundled Memories Skill teaches Claude Code disciplined memory capture — when to store, when to recall, and when to clean up — while the Web Dashboard provides a full management interface for browsing, searching, and monitoring memory usage.
```

**Step 3: Update Key Features section**

Replace lines 16-26 (the feature bullet list) with:
```markdown
- **Hybrid search** — BM25 keyword + vector similarity with Reciprocal Rank Fusion, under 50ms
- **AUDN extraction pipeline** — Automatically classifies facts as Add, Update, Delete, or Noop to keep memory clean over time
- **Memories Skill** — Bundled Claude Code skill with three responsibilities: Read (proactive recall before questions), Write (hybrid `memory_add` + `memory_extract` for intelligent storage), and Maintain (AUDN-driven lifecycle cleanup). +43% eval improvement over baseline
- **`memory_extract` tool** — Synchronous MCP tool that analyzes conversations and classifies facts through the AUDN loop before storing, handling adds, updates, and deletions in a single call
- **Web Dashboard** — Full management UI at `/ui` with sidebar navigation, usage analytics, list+detail and grid views, source filtering, dark/light theme, API key management, and responsive mobile layout
- **Multi-auth** — Prefix-scoped API keys with three role tiers (read-only, read-write, admin) for team-safe shared instances
- **Key management** — 5 REST endpoints for creating, listing, updating, and revoking API keys, plus a Web UI management page
- **Full CLI** — 30+ commands covering every API endpoint with TTY auto-detection, layered config (flags > config file > env vars > defaults), shell completion, stdin support, and batch operations
- **NDJSON export/import** — Stream your entire memory store as newline-delimited JSON with source remapping for backup, migration, or cross-instance sync
- **Multi-client support** — MCP for Claude Code, Cursor, Codex; REST API for ChatGPT, OpenClaw, and anything else
- **Automatic memory hooks** — 5-event lifecycle (session start, prompt, response, pre-compact, session end) for hands-free memory management
- **Novelty detection** — Checks if information is already known before storing, preventing duplicates
- **Auto-backups** — Snapshots after every write, with optional cron and Google Drive/S3 off-site backup
- **ONNX Runtime inference** — Same model quality as PyTorch (all-MiniLM-L6-v2) in a 68% smaller Docker image
- **Extraction providers** — Anthropic, OpenAI, ChatGPT Subscription, Ollama, or skip entirely
```

**Step 4: Update Quick Start section**

Replace lines 34-52 (the code block) with:
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
memories export --format ndjson > backup.ndjson
```

**Step 5: Update Architecture section**

Replace lines 58-64 with:
```markdown
Memories runs as a FastAPI service inside Docker. Clients connect via MCP protocol (Claude Code, Codex, Cursor), REST API (everything else), or the CLI. The MCP server is a thin Node.js wrapper that translates MCP tool calls into REST requests. The CLI provides 30+ commands with TTY-aware output and layered configuration (CLI flags > config file > env vars > defaults).

Multi-auth middleware enforces prefix-scoped API keys at three tiers: read-only (search and list within allowed prefixes), read-write (add, update, delete within allowed prefixes), and admin (full access including key management, backups, and usage stats).

Internally, the engine maintains a vector index (ONNX Runtime embeddings) alongside a BM25 keyword index. Search queries hit both and results are fused using Reciprocal Rank Fusion. All data is persisted to disk as `vector_index.bin` + `metadata.json` with automatic backups after every write.

The optional extraction pipeline uses an LLM (Anthropic, OpenAI, Ollama, or ChatGPT Subscription) to analyze conversation transcripts and classify facts through the AUDN loop before storing them.

The Memories Skill is the Claude Code integration layer. It wraps the MCP tools with a disciplined workflow: proactively searching memories before asking clarifying questions, using `memory_add` for simple novel facts and `memory_extract` for complex multi-fact conversations or lifecycle decisions (updates, deletions, reversals). Source prefixes like `claude-code/{project}` and `learning/{project}` keep memories organized across projects.
```

**Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

---

### Task 4: Update Tools Overview Page

**Files:**
- Modify: `src/content/docs/tools/index.md`

**Step 1: Update one-liner descriptions**

Replace line 14:
```
- **[Memories](/tools/memories/)** — Persistent semantic memory engine
```
with:
```
- **[Memories](/tools/memories/)** — Persistent semantic memory with CLI, multi-auth, and hybrid search
```

Replace line 15:
```
- **[Carto](/tools/carto/)** — Codebase intelligence and indexing
```
with:
```
- **[Carto](/tools/carto/)** — Codebase intelligence with 15-command CLI and web dashboard
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

---

### Task 5: Update Ecosystem Page

**Files:**
- Modify: `src/content/docs/ecosystem/index.md`

**Step 1: Update Infrastructure Layer descriptions**

Replace lines 37-39:
```
**Memories** stores everything. Every other tool reads from or writes to Memories — codebase indexes (Carto), test results (Delphi), learnings (Learning-Skill), project conventions (Apollo).

**Carto** builds a 7-layer semantic map of your codebase and stores it in Memories. Other tools query this map to understand code structure without re-reading files.
```
with:
```
**Memories** stores everything. Every other tool reads from or writes to Memories — codebase indexes (Carto), test results (Delphi), learnings (Learning-Skill), project conventions (Apollo). A full CLI, multi-auth with scoped API keys, and NDJSON export/import make it production-ready for teams.

**Carto** builds a 7-layer semantic map of your codebase and stores it in Memories. A 15-command CLI with JSON envelope output, interactive setup, and streaming exports lets you script indexing into any workflow.
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

---

### Task 6: Preview and Visual Verification

**Step 1: Run dev server**

Run: `npm run dev`

**Step 2: Verify all four updated pages visually**

Open each page in the browser and confirm:
- Carto page: new screenshot renders, features list is complete, Quick Start has `carto init` and `carto export`
- Memories page: features list has multi-auth and CLI entries, Quick Start has CLI examples
- Tools overview: updated one-liners display correctly
- Ecosystem: updated descriptions read well

**Step 3: Stop dev server**

---

### Task 7: Commit

**Step 1: Stage and commit**

```bash
git add public/screenshots/carto-dashboard.png \
  src/content/docs/tools/carto/index.md \
  src/content/docs/tools/memories/index.md \
  src/content/docs/tools/index.md \
  src/content/docs/ecosystem/index.md
git commit -m "docs: update Carto and Memories pages for v1.2.0 and v2.0.0"
```
