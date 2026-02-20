---
layout: default
title: Operations & Troubleshooting
parent: Operations
nav_order: 1
has_children: true
---

# Operations & Troubleshooting

Operating the **CPI iFlow Analysis Agent** in a production or enterprise staging environment requires an understanding of its logging outputs and common failure modes.

## Logging & Monitoring

The Agent utilizes a structured JSON logging format built on Python's native `logging` library for the orchestrator, and SLF4J for the MCP Server.

### Log Levels
- **INFO:** Standard execution steps (e.g., "Received file", "Parsing complete", "Agent invoked tool X").
- **WARN:** Recoverable errors (e.g., "MCP tool returned timeout, agent retrying", "XML node missing expected Attribute Y").
- **ERROR:** Unrecoverable failures (e.g., "Context window exceeded", "File malformed and unzippable").

### Traces
Traces map the full execution timeline of a single user query. If an answer seems inaccurate, administrators can pull the trace ID to see exactly:
1. What the LLM thought initially.
2. What tools it decided to call.
3. What data the tools returned.

## Common Troubleshooting Scenarios

### 1. "Failed to parse iFlow archive"
**Symptom:** The user uploads a file, and the UI immediately returns a parsing error before the AI starts typing.
**Fix:**
- Ensure the uploaded file is strictly a valid `.iwfl` archive exported directly from the SAP BTP integration suite.
- Check if the file is encrypted with a proprietary zipper; the system requires standard ZIP compliance.

### 2. The Agent Hallucinates or Answers "I don't know"
**Symptom:** The AI returns generic answers that don't match the uploaded graph.
**Fix:**
- Check the MCP Server logs. Often, this means the MCP tool threw an exception internally (e.g., a NullPointer on an unexpected XML tag), returning an empty string to the LLM. Without context, the LLM fails.

### 3. High Latency During Query Validation
**Symptom:** It takes >30 seconds to answer "What are the security flaws?"
**Fix:**
- This occurs if the graph is exceptionally large (100+ nodes) and the LLM models are attempting to iteratively call `get_node_config` sequentially.
- Adjust the `MAX_PARALLEL_TOOL_CALLS` environment variable to allow the agent to fetch configurations concurrently.

---

[Next: Performance & Scaling ➔](performance.md)
