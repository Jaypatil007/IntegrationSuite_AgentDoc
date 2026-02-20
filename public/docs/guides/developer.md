---
layout: default
title: Developer Guide
parent: Guides
nav_order: 3
---

# Developer Guide

This guide is intended for engineers who wish to extend the **CPI iFlow Analysis Agent** by building custom MCP tools or integrating new Sub-Agents.

## Project Structure

If you wish to modify the source, familiarize yourself with the monorepo layout:

```text
/
├── frontend/           # React/Vite UI
├── orchestrator/       # Python/LangChain Agent framework
├── mcp-server/         # Java based parsing and tooling
└── tests/              # End-to-end integration tests
```

## Adding a Custom MCP Tool

If your organization has strict, custom design guidelines for CPI flows (e.g., "All HTTP adapters must use our specific header"), you can write a deterministic tool to check this, rather than relying on the LLM to guess.

### 1. Write the Java Validator
In the `mcp-server` module, implement the `ToolExecutor` interface:

```java
public class CustomHeaderValidator implements ToolExecutor {
    @Override
    public ToolResponse execute(Map<String, Object> params) {
        // Parse the graph and validate
        return new ToolResponse("Missing Organization Header in Node " + nodeId);
    }
}
```

### 2. Register the Tool in MCP
Update the `ToolRegistry` so the LLM is aware this tool exists:

```java
registry.register(new ToolDefinition(
    "validate_custom_headers",
    "Checks if external adapters inject the mandatory X-Org-Auth header.",
    List.of() // params
));
```

### 3. Update the Agent Prompt
The Orchestrator Agent now automatically discovers this tool on boot via the `mcp/discover` RPC call. You may optionally update the primary system prompt (`orchestrator/prompts/main.txt`) to explicitly instruct the agent to use this tool when users ask about "compliance" or "standards."

## Modifying the UI Visualizer

The frontend uses `react-flow-renderer` to display the graph. When the Agent completes its analysis, it passes a JSON object mapping to nodes/edges which the UI binds to.

To add new node styles (e.g., coloring database nodes purple), edit `frontend/src/components/Graph/NodeTypes.jsx`.

---

[⬅️ Previous: Configuration Guide](configuration.md) | [Next: API Reference ➔](../reference/index.md)
