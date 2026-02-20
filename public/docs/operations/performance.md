---
layout: default
title: Performance & Scaling
parent: Operations
nav_order: 2
---

# Performance & Scaling Strategy

As enterprise adoption deepens, the platform will handle larger iFlows and higher concurrency.

## Current Benchmarks (v1.0)
- **Max iFlow Size Supported:** 50MB
- **Avg. Parse Time (MCP):** < 2.5 seconds
- **Avg. Query Resolution (LLM):** 4–12 seconds (Dependent on OpenAI/Anthropic API latency, or local GPU specifications).

## Scaling the Architecture

Because the Orchestrator and the MCP Server are decoupled, they can be scaled asymmetrically.

### 1. Scaling the MCP Server (CPU Bound)
The MCP Server is mostly deterministic and strictly CPU/memory bound during the XML parsing and graph construction phases.
- **Strategy:** Deploy behind a standard Kubernetes Horizontal Pod Autoscaler (HPA) targeting 70% CPU utilization.
- **Statelessness:** Parsing tasks are stateless if offloaded to a shared Redis cache immediately after extraction.

### 2. Scaling the Orchestrator (I/O Bound)
The Python orchestrator spends 90% of its time waiting for the LLM API to return streaming tokens.
- **Strategy:** Scale horizontally using Uvicorn/Gunicorn workers.
- **Local Inference:** If using local Ollama, the Orchestrator scaling is intrinsically gated by VRAM availability. You must implement a queuing system (like Celery/RabbitMQ) to prevent CUDA Out Of Memory (OOM) kills during concurrent requests.

## Caching Strategy
To avoid re-parsing the identical XML graph for every new question in a chat session:
- The `mcp-server` caches the generated Graph DAG in Redis using the uploaded file's SHA-256 hash as the key.
- A Time-To-Live (TTL) of 24 hours is applied to purge idle session data.

---

[⬅️ Previous: Troubleshooting](index.md) | [Next: Limitations ➔](limitations.md)
