---
layout: default
title: API Reference & Query Examples
parent: Reference
nav_order: 1
has_children: false
---

# API Reference & Query Examples

The interaction with the Agent happens primarily through conversational prompts or pre-built dashboard queries. Below is a reference of effective prompts and how the underlying orchestration translates them.

## Effective Prompt Framework

Because the LLM translates English into explicit MCP Tool calls, structuring your prompt effectively yields faster, more accurate results.

### Good Prompts
Provide scope and specify the domain of analysis:
- *"Are there any sequential HTTP external calls in this flow that could be parallelized?"* `(Triggers: get_graph_topology, get_node_config)`
- *"Find all adapters using Basic Authentication and check if they are missing SSL configuration."* `(Triggers: search_nodes, get_node_config, get_security_warnings)`
- *"Why is the file `payload.json` failing to parse at step 4?"* `(Triggers: get_node_dependencies, schema_validator)`

### Ineffective Prompts
Avoid generic or overly broad requests that require the LLM to dump massive XML files into its context:
- *"Review this entire iFlow."* (Too vague, might hit context limits).
- *"Rewrite this iFlow to be better."* (Violates read-only constraint).

## Developer API (REST)

If integrating the Agent into a CI/CD pipeline, you can bypass the Chat UI and use the REST API exposed by the Orchestrator service.

### `POST /api/v1/analyze`

Executes a targeted query against an uploaded `.iwfl` binary.

**Request (Multipart Form):**
- `file`: The `.iwfl` binary.
- `query` (String): The analysis command.
- `mode` (String): `chat` (returns markdown) or `json` (returns structured warnings).

**Response (JSON Mode):**
```json
{
  "status": "success",
  "warnings": [
    {
      "severity": "HIGH",
      "node_id": "Receiver_1",
      "message": "JDBC Adapter configured with empty credential alias."
    }
  ],
  "graph_nodes_processed": 14
}
```

This REST endpoint is ideal for setting up automated Pull Request annotations in GitHub that run every time an Integration Developer commits a new CPI flow.

---

[⬅️ Previous: Developer Guide](../guides/developer.md) | [Next: Operations ➔](../operations/index.md)
