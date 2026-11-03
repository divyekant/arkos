---
title: Deep Research
description: Parallel web research with query variance and citations
---

> **GitHub:** [divyekant/deep-research](https://github.com/divyekant/deep-research)

## What it does

One web search returns one slice of the available information. Deep Research runs many queries in parallel, with different phrasing and different source filters. It reads the full pages, not only the snippets. It compares the findings, runs a second wave for the gaps, and writes a report with confidence-tagged citations.

## The pipeline

```
SCOPE       → Classify the question, break it into sub-questions
PLAN        → Generate query variants × source-type filters
RETRIEVE    → Parallel agents: search, then fetch the top results
TRIANGULATE → Cross-reference, flag contradictions, find gaps
DEEPEN      → Second wave for the gaps, if needed
SYNTHESIZE  → findings.md + sources.md with citations
```

## Output

The skill writes to `RESEARCH/<topic-slug>/`:

- **findings.md** — Executive summary, key findings with inline citations, confidence tags (confirmed, single-source, contested), contradictions, and method notes.
- **sources.md** — Every source URL with its type and confidence rating.

## Benchmark

Results across 4 research topics:

| Metric | With skill | Without skill |
|---|---|---|
| Pass rate | 100% | 70% |
| Average time | 325 s | 509 s |
| Average tokens | 50K | 53K |

The main value is structure (citations, confidence tags, contradictions) and focus (less time on unrelated paths).

## How it fits

Deep Research is the research step before design and decisions. It adds no new tools. It orchestrates the agent's own search, fetch, and subagent tools.

## Quick Start

```bash
git clone https://github.com/divyekant/deep-research.git
mkdir -p ~/.claude/skills/research
ln -sf "$(pwd)/deep-research/SKILL.md" ~/.claude/skills/research/SKILL.md
```

The skill starts when you ask Claude Code to research something:

```text
> Compare SQLite vs Postgres for a new SaaS product
```
