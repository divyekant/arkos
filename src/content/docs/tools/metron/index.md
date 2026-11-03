---
title: Metron
description: Token metering per PR for AI coding agents, with billing reconciliation
---

> **GitHub:** [divyekant/metron](https://github.com/divyekant/metron)

## What it does

AI coding agents use tokens across sessions that go far beyond one pull request: exploration, debugging, and chat that never becomes a diff. Provider dashboards show spend per user, but they do not join that spend to the work it produced. Metron records every token on a ledger, attributes each entry to a PR or marks it as unattributed, and reconciles the totals against what the provider billed.

## Key Features

- **Collectors** — Lifecycle hooks for Claude Code (`SessionEnd`) and Codex CLI (`Stop`) parse the agents' own session logs. They send token counts and metadata only. No prompt or response content leaves the machine.
- **Attribution ledger** — Every usage event lands in exactly one level:
  - **L1 direct** — The session ran on the PR's own branch.
  - **L2 exploration** — Same repository, no PR branch yet. The next PR that the same user opens in that repository within 14 days claims it.
  - **L3 unattributed** — No repository context. It counts in organization totals only.
- **PR comments** — Metron keeps one marker comment on each PR with direct and exploration usage by model. It edits the comment in place.
- **Reconciliation** — Hourly pollers read the OpenRouter, Anthropic, and OpenAI billing APIs and report a **coverage %** for each provider.
- **Dashboard** — A read-only, server-rendered view of the ledger.

## How it fits

Metron is the cost layer for agent-led work. Deck shows sessions and cost on one machine. Metron joins cost to pull requests across a team and checks the numbers against provider billing.

## Quick Start

Start the server (one Fastify process, SQLite by default):

```bash
pnpm --filter @metron/server build
ORG_TOKEN=... DATABASE_PATH=/data/metron.db PORT=3000 node packages/server/dist/main.js
```

Install the collector on each developer machine:

```bash
npx metron install --server https://metron.your-org.com --token <org-token> --user you@your-org.com
```

`metron doctor` checks the hooks and the server connection. `metron uninstall` removes the hooks.

## Accuracy

Client-reported numbers are attribution weights, not billing truth. Coverage below 100% is expected. It points to machines without hooks, usage outside tracked agents, or known undercounts in transcripts.
