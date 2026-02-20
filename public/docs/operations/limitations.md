---
layout: default
title: Limitations
parent: Operations
nav_order: 3
---

# Known Limitations

We aim for transparency regarding the capabilities of the current V1 Architecture.

1. **No Runtime Telemetry:** The agent only analyzes static configurations. It cannot tell you *why* an iFlow failed in production yesterday (unless you supply the error trace explicitly in the chat). It only finds structural anti-patterns.
2. **Read-Only Mode:** The system will not generate `.iwfl` files or modify existing ones. Users must implement the suggested fixes manually in the SAP CPI web IDE.
3. **Groovy Script Analysis is Shallow:** While the MCP parses the external Groovy script files attached to an iFlow, the LLM currently does not execute them to determine state changes. It performs static code analysis which may miss complex runtime dynamic variables.
4. **Context Window Limitations:** Asking "Summarize the configuration of every single node in a 200-node integration" will likely result in the LLM truncating the output or failing due to token limits. It is designed for targeted debugging, not mass aggregation.

---

[⬅️ Previous: Performance](performance.md) | [Next: Testing & Error Handling ➔](../testing/index.md)
