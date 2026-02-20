---
layout: default
title: Agent Design
parent: Agents
nav_order: 1
has_children: true
---

# Agent Design & Orchestration

The **CPI iFlow Analysis Agent** acts as the intelligent orchestration layer of the system. While it relies on external tools to parse raw bytes and perform syntax checking, the Agent itself is responsible for reasoning, intent recognition, and formulating actionable responses.

## Core Responsibilities

1. **Intent Recognition:** Determining what the developer is asking. Is it a request for visualization, a debugging query about a specific error, or a request for a general summary of the iFlow?
2. **Tool Selection & Chaining:** Deciding which MCP tools to call. If asked "Why does node `Router_1` fail?", the agent knows to first call `get_node_by_name`, and then subsequently call `get_node_dependencies` based on the first result.
3. **Context Window Management:** Large iFlows converted to text would exceed LLM token limits. The agent selectively queries only the necessary branches of the integration graph to formulate its answer, keeping its context window lean and focused.
4. **Synthesis & Articulation:** Converting raw JSON dumps representing XML nodes into human-readable, enterprise-grade explanations and recommendations.

## The Cognitive Loop

The agent operates on a standard ReAct (Reason + Act) loop pattern:
1. **Observation:** "The user uploaded `finance_update.iwfl` and asked to find security flaws."
2. **Thought:** "To find security flaws, I should first extract all authentication and adapter nodes using the `get_adapters` tool."
3. **Action:** `Call Tool: get_adapters`
4. **Observation:** "Tool returned 3 adapters: one FTP, two HTTPS with Basic Auth."
5. **Thought:** "Basic Auth without a secure tunnel is a risk. I will query the `HTTPS` nodes for their specific configurations."
6. **Action:** `Call Tool: get_node_config(id="HTTPS_1")`
7. **Synthesis:** *Final response generated alerting the user to insecure Basic Auth parameters.*

## System Constraints

To prevent unpredictable behavior, the agent operates under strictly enforced prompt boundaries:
- It is physically barred from generating code that edits the `.iwfl`.
- It is instructed to reject prompts asking it to assume roles outside the scope of integration analysis (e.g., "Write me a Python script to...").
- When a tool returns an error (e.g., "Invalid XML format"), the agent is programmed to gracefully degrade and inform the user of the parsing failure, rather than attempting to guess the missing content.

---

[Next: Sub-Agents ➔](sub_agents.md)
