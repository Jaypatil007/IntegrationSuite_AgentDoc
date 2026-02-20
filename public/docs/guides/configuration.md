---
layout: default
title: Configuration Guide
parent: Guides
nav_order: 2
---

# Configuration Guide

Properly configuring the Agent ensures it operates securely while utilizing the preferred language models and performance constraints mapping to your enterprise policies.

## Environment Variables (`.env`)

The core configuration operates via the `.env` file located in the root of the project.

### Required Settings

| Variable | Description | Default |
| --- | --- | --- |
| `LLM_PROVIDER` | `openai`, `anthropic`, or `ollama` (for local). | `openai` |
| `OPENAI_API_KEY` | Your API key if using OpenAI. | `""` |
| `MCP_HOST_URL` | Internal Docker DNS route to the MCP server. | `http://mcp-server:8080/jsonrpc` |

### Security & Sandboxing Settings

| Variable | Description |
| --- | --- |
| `MAX_IFLOW_MB` | Maximum file upload size to prevent memory exhaustion (Default: 50). |
| `ENABLE_WEB_SEARCH` | Should never be true for secure environments. (Default: false) |
| `SANDBOX_TIMEOUT_SEC`| Maximum execution time for the MCP parser before termination. (Default: 30) |

## Local LLM Configuration (Ollama)

For strict air-gapped environments, you can configure the orchestrator to point to a local Ollama instance hosting a model like `llama3` or `mistral`.

1. Ensure Ollama is running on your host machine (or as a container on the same Docker network).
2. Set your environment variables:
   ```env
   LLM_PROVIDER=ollama
   OLLAMA_BASE_URL=http://host.docker.internal:11434
   OLLAMA_MODEL=llama3:8b-instruct-q8_0
   ```
3. Restart the orchestrator service:
   `docker-compose restart orchestrator`

## Advanced MCP Configuration

The MCP server properties can be adjusted in `mcp/config/application.yml` (mapped as a volume to the host). Here you can configure specific schema definitions or adjust how aggressive the deterministic error validation should be.

---

[⬅️ Previous: Deployment Guide](index.md) | [Next: Developer Guide ➔](developer.md)
