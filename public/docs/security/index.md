---
layout: default
title: Security Model
nav_order: 3
has_children: false
---

# Security Model

The **CPI iFlow Analysis Agent** is explicitly designed for enterprise deployments, mandating rigorous security constraints to protect proprietary integration logic, passwords, and architectures.

## Threat Model and Isolation Strategy

Because users upload integration flows that often contain sensitive configurations or trace data, the system relies on physical and logical boundaries preventing any cross-contamination.

### File Sandboxing Engine

All uploaded artifacts (`.iwfl` files, scripts, properties) are loaded directly into an ephemeral sandbox environment. This ensures:
- **Zero Local Access:** Tools executed by the MCP server cannot traverse upward `../` to read host system files or configuration `.env` files.
- **Impermanence:** Sandboxes are completely wiped and dereferenced upon the completion of a user's session. They do not persist.

### Network Isolation boundaries

One of our primary requirements is the prevention of unintended data exfiltration.

- **No Remote Execution / Outbound Calls:** The deterministic tools executed by the MCP server run with strict `iptables` or standard network-layer bans preventing all external HTTP/TCP requests. This prevents arbitrary scripts within an iFlow from calling out.
- **Local LLM Compliance:** When combined with a local LLM API instance (e.g., Llama 3 via Ollama), the entire technology stack requires precisely zero outbound internet access.

## Data Redaction & Minimization

The agent and its MCP tooling strictly operate on a data-minimization approach:
- Only requested metadata is passed back dynamically to the Orchestrator Agent.
- Raw password configuration blocks `[encrypted]` are safely ignored by parsing engines to prevent exposing or attempting to decode credentials present in deployment profiles.

## Logs and Tracing Compliance

The Observability tooling explicitly avoids logging PII or actual logic variables inside the iFlow.
Execution logs trace module invocation times, tool IDs, and input parameters, enabling operational monitoring without compromising the codebase.

> [!CAUTION]
> It is strictly recommended to avoid uploading production tenant iFlow configurations containing unencrypted secrets or embedded tokens, even though the platform operates with strict isolation constraints.

---

[⬅️ Previous: Data Flow](../architecture/data_flow.md) | [Next: Agents ➔](../agents/index.md)
