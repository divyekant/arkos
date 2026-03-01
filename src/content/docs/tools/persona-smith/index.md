---
title: PersonaSmith
description: 75 research-backed AI agent personas across 15 enterprise departments
---

> **GitHub:** [divyekant/PersonaSmith](https://github.com/divyekant/PersonaSmith)

## What it does

PersonaSmith is a library of production-ready system prompts that turn AI agents into specialized enterprise professionals. Each persona is a self-contained Markdown file covering everything an agent needs to behave authentically in that role -- knowledge domains, decision frameworks, communication style, collaboration maps, constraints, and success metrics. Drop any persona into an agent's system prompt and it becomes that professional.

## Key Features

- **75 personas across 15 departments** — Engineering, Executive Leadership, Marketing, HR, Finance, Sales, Operations, Data & Analytics, Legal, Security, Customer Support, Product, Design, QA, Procurement
- **Research-backed** — Each persona cites 10-12 authoritative sources (IEEE, DORA, BABOK, SHRM, IAPP, OWASP, MITRE ATT&CK, and others)
- **Standardized 10-section framework** — Identity, Objective, Responsibilities, Decision Framework, Communication Style, Collaboration Map, Tools & Artifacts, Constraints & Rules, Success Metrics, Example Scenarios
- **Self-contained** — One file equals one fully operational agent, no config or setup required
- **Swarm-ready** — Includes collaboration maps with key relationships, handoff protocols, and escalation rules for multi-agent systems
- **Industry overlays** — Combine any persona with an industry overlay (fintech, healthcare, SaaS) to specialize it without modifying the base persona
- **Universal LLM compatibility** — Works with Claude, GPT-4o, Gemini, Llama, Mistral, and any model that accepts system prompts

## How it fits

PersonaSmith provides the identity layer for multi-agent systems. SwarmEngine agents can be assigned PersonaSmith personas to give them specialized professional behavior, decision frameworks, and collaboration protocols. When building agent teams, the collaboration maps in each persona define who hands off to whom and what information flows between roles.

## Quick Start

1. Browse the `personas/` directory or the Index file
2. Find the role you need (e.g., `personas/engineering/software-engineer.md`)
3. Copy the entire file into your agent's system prompt
4. The agent is now that role

To add industry context:

```
System Prompt = [Software Engineer persona] + [industries/fintech.md]
= Fintech Software Engineer agent
```

## Architecture

PersonaSmith is a pure content library -- no runtime code, no dependencies. Each persona is a Markdown file with XML-style tags for section boundaries. This format was chosen for universal LLM comprehension, precise section extraction, human readability, and token efficiency.

The standardized 10-section template ensures consistent behavior across all 75 personas. The collaboration map section is what makes personas swarm-ready: it defines key relationships, handoff protocols, information shared and needed, and escalation rules, so agents in a multi-agent system know how to coordinate without explicit orchestration logic.

Templates for creating new personas (`TEMPLATE.md`) and industry overlays (`INDUSTRY_TEMPLATE.md`) are included for extending the library.
