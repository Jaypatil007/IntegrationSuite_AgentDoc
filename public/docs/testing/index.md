---
layout: default
title: Testing & Error Handling
nav_order: 50
has_children: false
---

# Testing & Error Handling

System reliability relies on a layered testing strategy and graceful failure pathways.

## Testing Strategy

### 1. Deterministic Unit Testing (MCP Server)
The parsing logic in the Java MCP server is strictly validated against a repository of 200+ mock `.iwfl` files representing various SAP CPI anti-patterns.
- **Graph Coverage:** We assert that a 5-node XML file always yields exactly 5 graph vertices and correct edge definitions.
- **Validation:** Missing `[encrypted]` password aliases are unit-tested to ensure the regex/parser captures the gap correctly without throwing exceptions.

### 2. LLM Evaluation (Agent Layer)
Evaluating an AI agent is non-deterministic. We utilize a framework tracking:
- **Tool Selection Accuracy:** Did the model call the correct MCP tool when asked a specific question?
- **Answer Relevancy:** Measured quantitatively using LLM-as-a-Judge paradigms mapping the final answer against bounded ground truth data.

## Graceful Error Handling

The system defines clear boundaries on how errors cascade to the user UI.

- **Parsing Failures:** If the `.iwfl` file is corrupt, the MCP server returns a standard JSON-RPC internal error code. The Agent translates this gracefully: *"I was unable to analyze this file because the internal XML structure is malformed."*
- **Context Overloads:** If a tool returns too much JSON data for the LLM to ingest, a middleware truncates the JSON list and sets a flag: `"TRUNCATED: True"`. The LLM sees this flag and informs the user: *"The node dependencies are too large to process at once. Please narrow your query to a specific step."*
- **Auth Rejections:** If external provider APIs (e.g., OpenAI) return 429 Rate Limits, the orchestrator implements Exponential Backoff. If it still fails, the UI is updated with a system status alert.

---

[⬅️ Previous: Limitations](../operations/limitations.md) | [Next: Appendix ➔](../appendix/index.md)
