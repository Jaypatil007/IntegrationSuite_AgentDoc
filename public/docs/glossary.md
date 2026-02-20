---
layout: default
title: Glossary
nav_order: 101
---

# Glossary of Terms

The vocabulary used throughout this documentation may vary slightly based on context. Here are standard definitions to help clarify core concepts.

| Term | Definition |
| --- | --- |
| **Agent** | The orchestrating AI application. Responsible for receiving user queries, selecting the appropriate MCP tools to invoke, and synthesizing final answers. |
| **Sub-Agent** | A specialized worker agent dedicated to a narrow domain (e.g., exclusively performing XML schema validation or purely handling security review) instead of generalized reasoning. |
| **iFlow (.iwfl)** | The file format representing an SAP Cloud Platform Integration flow. It contains structural XML configurations defining steps, connections, and metadata. |
| **Graph Model / Nodes & Edges** | The abstracted representation of an iFlow parsed by the tool. **Nodes** represent steps (routers, modifiers, adapters). **Edges** represent the data/control flow connections linking them together. |
| **Model Context Protocol (MCP)**| An open standard that enables AI models to connect securely to local or remote data sources and deterministic execution engines. Used heavily here to parse and execute non-LLM logic. |
| **Dependency Mapper** | The algorithm that analyzes the connections between nodes to identify bottlenecks, upstream data sources, and downstream consumers. |
| **Sandboxing** | A security mechanism providing an isolated environment where iFlow files and code are executed or analyzed safely, ensuring zero cross-contamination or unauthorized access. |

---

[⬅️ Previous: FAQ](faq.md)
