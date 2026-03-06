# Carto & Memories Documentation Update Design

> **Date:** 2026-03-06
> **Status:** Approved
> **Scope:** Update Arkos docs site for Carto v1.1.0+v1.2.0 and Memories v1.5.0+v2.0.0

## Goal

Bring the Carto and Memories documentation pages up to date with their latest released versions. Update in place — no structural changes to the page format.

## Pages to Update

### 1. Carto Page (`src/content/docs/tools/carto/index.md`)

**Description line:** Update to reflect CLI capabilities alongside intelligence features.

**Screenshot:** Capture fresh dashboard screenshot from `localhost:8950` to replace current one.

**Key Features — add/update:**
- Dashboard with stat cards, always-expanded sidebar, settings reorganization, quick query suggestions, monochrome slate theme (v1.1.0)
- 6 new CLI commands: `init`, `completions`, `export`, `import`, `logs`, `upgrade` (v1.2.0)
- JSON envelope contract with TTY auto-detection — human output in terminal, JSON when piped (v1.2.0)
- Typed error system with 5 error codes mapped to exit codes (v1.2.0)
- Gold brand palette for CLI output (v1.2.0)
- Confirmation guards for destructive operations with `--yes` flag (v1.2.0)

**Quick Start:** Add `carto init` as configuration entry point, mention `carto completions` for shell setup.

**Architecture:** Note JSON envelope contract, audit logging, TTY detection as infrastructure additions.

### 2. Memories Page (`src/content/docs/tools/memories/index.md`)

**Description line:** Add CLI and multi-auth to the tagline.

**Screenshot:** Keep current — already accurate.

**Key Features — add/update:**
- Multi-Auth: prefix-scoped API keys with read-only, read-write, admin tiers (v1.5.0)
- Key management: 5 endpoints + Web UI API Keys page (v1.5.0)
- Full CLI: 30+ commands covering all API endpoints (v2.0.0)
- TTY auto-detection, layered config (CLI flags > config file > env vars > defaults) (v2.0.0)
- Shell completion, stdin support, batch operations (v2.0.0)
- Streaming NDJSON export/import with source remapping (v2.0.0)

**Quick Start:** Add CLI examples alongside existing curl/Docker examples.

**Architecture:** Mention CLI layer and auth middleware.

### 3. Tools Overview (`src/content/docs/tools/index.md`)

Refresh one-liner descriptions for Carto and Memories to mention CLI and (for Memories) multi-auth.

### 4. Ecosystem Page (`src/content/docs/ecosystem/index.md`)

Update capability descriptions referencing Carto and Memories if they mention outdated feature sets.

## Out of Scope

- Memories screenshot update (current is accurate)
- Unreleased security hardening content
- New page creation
- Structural changes to page format
