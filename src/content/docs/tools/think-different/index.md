---
title: Think Different
description: On-demand lateral thinking when straight-line problem solving stalls
---

> **GitHub:** [divyekant/think-different](https://github.com/divyekant/think-different)

## What it does

When the direct approach does not work, invoke Think Different. The skill changes how the agent approaches the problem:

1. **Diagnose** — Find the type of block.
2. **Reframe** — Apply the simplest framework that fits. Escalate only if it does not help.
3. **Present** — Give 2 or 3 alternative paths, ranked, with a recommendation.

Occam's Razor governs the skill. It applies at most 3 frameworks for each invocation, and you see the result, not the machinery.

## Block types

| Block | Example signal |
|---|---|
| Wrong problem | "The solution works but does not help" |
| Wrong assumptions | "Same wall from every angle" |
| Overcomplicated | "This feels too heavy" |
| Tunnel vision | "Only one approach considered" |
| Treating symptoms | "Fixes keep causing new issues" |

## Frameworks

The skill uses 15 established frameworks, including Lateral Thinking, First Principles, Inversion, TRIZ, 5 Whys, SCAMPER, Premortem, Polya's method, and Chesterton's Fence.

## When to use it

- The same approach keeps failing.
- You want the agent to challenge its current framing.
- You want alternatives before work starts.

Do not use it before you try the obvious approach, for debugging, or for a problem that is straightforward.

## Quick Start

```bash
claude plugins marketplace add divyekant/dk-marketplace
claude plugins install think-different
```

Restart Claude Code, then say `/think-different` or "Think different about this problem."
