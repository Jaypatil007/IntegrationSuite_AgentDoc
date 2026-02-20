---
layout: default
title: FAQ
nav_order: 100
---

# Frequently Asked Questions (FAQ)

## 1. Does the Agent modify the iFlow?
No. The **CPI iFlow Analysis Agent** is purely read-only and analytical. It explicitly does not edit, deploy, or otherwise mutate the iFlow source code or configuration parameters.

## 2. Does this agent connect to our SAP CPI tenant to fetch logs?
No, the agent operates directly on the `.iwfl` files that you upload to it. It does not perform runtime execution, track active logs from your tenant during execution, or interact directly with SAP BTP APIs unless explicitly configured with specialized credentials (not supported in V1 architecture).

## 3. Can it handle large iFlows?
Yes. The parsing engine and graph abstraction tools are built to handle enterprise-scale, sprawling integrations efficiently by selectively mapping node dependencies without overloading the LLM context window.

## 4. Why an MCP Server?
Because the complexity of parsing `.iwfl` XML and mapping graph edges is too computationally strict for an LLM to reliably "guess." The Model Context Protocol (MCP) server offloads deterministic operations (parsing, validation) to localized code runtimes, letting the LLM focus on *explaining* and *reasoning* about the parsed data.

## 5. Is it secure for enterprise environments?
Yes. We strictly adhere to isolation policies. iFlow files are analyzed locally/sandboxed, and external web calls are forbidden. Please refer to our [Security Model](security/index.md) for complete details.

## 6. What types of misconfigurations will it find?
Examples include missing exception sub-processes, unencrypted credentials blocks, unused parameters, highly coupled sequential nodes that limit performance, and circular logic.

> [!TIP]
> **Still have questions?** Check out the [Operations](operations/index.md) guide or submit an issue on GitHub.

---

[⬅️ Previous: Roadmap](roadmap.md) | [Next: Glossary ➔](glossary.md)
