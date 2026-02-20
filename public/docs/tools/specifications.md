---
layout: default
title: Tool Specifications
parent: Tools
nav_order: 2
---

# Tool Specifications

This section details the specific tools hosted on the MCP Server which the Orchestrator Agent can invoke. Understanding these tools clarifies how the agent extracts data from the `.iwfl`.

## 1. `parse_iflow`
**Description:** Initializes the analysis session. Ingests the raw uploaded `.iwfl` binary, unzips it in memory, and builds the baseline internal representations.
**Inputs:** None (operates on the uploaded session file).
**Outputs:**
- Base metadata (Integration Name, Version, Author).
- Status: `Success` or `Parsing_Error`.

## 2. `get_graph_topology`
**Description:** Returns a summarized map of the entire integration flow. Optimized for LLM context windows (omits complex configurations, providing only names, IDs, and edges).
**Inputs:** None.
**Outputs:**
- Array of `Nodes` (ID, Type, Name).
- Array of `Edges` (Source ID, Target ID).

## 3. `get_node_config`
**Description:** Retrieves the deep configuration parameters for a specific processing step, router, or adapter.
**Inputs:**
- `node_id` (String): The unique identifier of the node.
**Outputs:**
- JSON object containing all explicitly defined parameters (e.g., Timeout, Credential Alias, URI, Retry Count).

## 4. `get_node_dependencies`
**Description:** Traverses the graph from a specified node and returns all immediate upstream (parents) and downstream (children) nodes.
**Inputs:**
- `node_id` (String).
- `direction` (String): `upstream`, `downstream`, or `both`.
- `depth` (Integer): How many hops to traverse (default 1).
**Outputs:** Nested list of dependent nodes.

## 5. `detect_errors_and_warnings`
**Description:** Runs hardcoded, regex-based, and deterministic schema checks against the parsed XML. Finds known SAP CPI anti-patterns.
**Inputs:** None (Runs globally).
**Outputs:**
- Array of `Warnings` (e.g., "Missing Exception Sub-Process", "Hardcoded URL in HTTP Receiver").

## 6. `search_nodes`
**Description:** Allows the agent to find specific nodes by name, type, or configuration value without downloading the whole graph.
**Inputs:**
- `query` (String): e.g., "OData", "Salesforce", "CustomerName".
**Outputs:**
- Array of Node IDs matching the criteria.

---

[⬅️ Previous: MCP Integration](index.md) | [Next: Developer Guides ➔](../guides/index.md)
