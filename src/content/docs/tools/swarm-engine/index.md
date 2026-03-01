---
title: SwarmEngine
description: Multi-agent DAG orchestration engine for TypeScript
---

> **GitHub:** [divyekant/swarm-engine](https://github.com/divyekant/swarm-engine)

## What it does

SwarmEngine lets you define AI agents as nodes, wire them into directed acyclic graphs, and execute workflows with built-in cost tracking, streaming events, and pluggable adapters. It supports five execution patterns -- sequential pipelines, parallel fan-out/fan-in, conditional routing, iterative loops, and dynamic planning -- so you can model any multi-agent workflow as a typed DAG.

## Key Features

- **5 execution patterns** — Sequential pipelines, parallel fan-out/fan-in, conditional routing, iterative loops, dynamic planning (agents spawn sub-agents at runtime)
- **Actor-style agents** — Each node has inbox, outbox, and shared scratchpad for inter-agent communication
- **Multi-provider LLM support** — Anthropic, OpenAI, Ollama, and custom adapters via the `ProviderAdapter` interface
- **Agentic backends** — Nodes can use Claude Code or Codex as backends for real tool use (file I/O, shell commands, web access)
- **Per-agent and per-swarm cost tracking** — Token usage with configurable budget enforcement and budget warning/exceeded events
- **Streaming events** — Real-time `AsyncGenerator` yielding typed events (agent_start, agent_chunk, agent_done, route_decision, loop_iteration, etc.)
- **Conditional routing** — Route between agents using rules, regex, or LLM-based evaluation
- **Cancellation** — Pass an `AbortSignal` to cancel a running swarm with partial results
- **Pluggable adapters** — Persistence, memory, context, codebase, persona, and lifecycle hooks

## How it fits

SwarmEngine is the execution engine for multi-agent workflows in the Arkos ecosystem. While individual tools like Conductor orchestrate skills within a single coding session, SwarmEngine orchestrates multiple agents working in parallel across a larger task. PersonaSmith personas can be dropped into SwarmEngine agents to give them specialized professional behavior.

## Quick Start

```bash
npm install @swarmengine/core
```

```ts
import { SwarmEngine } from '@swarmengine/core';

const engine = new SwarmEngine({
  providers: {
    anthropic: { type: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY },
  },
  defaults: { provider: 'anthropic', model: 'claude-sonnet-4-5-20250929' },
});

const dag = engine.dag()
  .agent('planner', { id: 'planner', name: 'Planner', role: 'planner',
    systemPrompt: 'Break the task into steps.' })
  .agent('developer', { id: 'developer', name: 'Developer', role: 'developer',
    systemPrompt: 'Implement the plan.' })
  .edge('planner', 'developer')
  .build();

for await (const event of engine.run({ dag, task: 'Build a REST API' })) {
  if (event.type === 'agent_done') {
    console.log(`[${event.agentRole}] done`);
  }
}
```

## Architecture

SwarmEngine is a TypeScript-first ESM package. The core DAG builder validates the graph at build time (cycle detection, orphan checks). At runtime, a topological executor walks the DAG, running agents whose dependencies are satisfied. Agents with no dependency between them execute in parallel automatically.

Each agent node wraps an LLM provider call (or an agentic backend like Claude Code/Codex). The provider adapter interface abstracts away LLM differences. Cost tracking aggregates token usage from all nodes, and budget limits can halt execution when thresholds are crossed.

All execution produces a stream of typed events via `AsyncGenerator`, making it straightforward to build UIs, loggers, or dashboards on top.
