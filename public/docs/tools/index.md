---
layout: default
title: MCP Integration & Tools
parent: Tools
nav_order: 1
has_children: true
---

# Tools & MCP Integration

The **Model Context Protocol (MCP)** server acts as the deterministic execution engine for the CPI iFlow Analysis Agent. It hosts the parser, validation schemas, and graph algorithms, exposing them to the AI agent as callable tools.

## What is MCP?
The Model Context Protocol establishes a standardized, client-server architecture. The AI Model (acting as the client) discovers available tools hosted by the MCP Server and executes them over a secure JSON-RPC interface.

This architecture is crucial because Language Models cannot reliably execute code, parse complex graph structures mathematically, or securely access local file systems on their own.

## MCP Server Responsibilities

1. **File Management:** Safely loading the `.iwfl` zip archive, extracting its contents exclusively into memory/sandboxes.
2. **Deterministic Processing:** Running standard Java/Python/Node.js XML parsers (e.g., DOM or SAX parsing) to guarantee 100% accurate extraction of configuration values, something LLMs frequently hallucinate.
3. **Graph Algorithms:** Utilizing standard graph libraries to build the DAG, compute execution paths, and find unconnected or unreachable nodes (dead code).
4. **Schema Validation:** Running XSD validations against standard SAP CPI schemas to find missing XML elements instantly.

## The Tool Execution Cycle

When the Agent requires information, it formats a tool execution request:

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "get_node_config",
    "arguments": {
      "node_id": "Process_Step_5"
    }
  },
  "id": 1
}
```

The MCP Server receives this, looks up `Process_Step_5` in its parsed memory state, formats the raw XML data into clean JSON, and returns it to the agent.

> [!NOTE]
> Detailed breakdowns of every tool available to the agent can be found in the Tool Specifications page.

---

[Next: Tool Specifications ➔](specifications.md)
