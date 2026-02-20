---
layout: default
title: Deployment & Installation Guide
parent: Guides
nav_order: 1
has_children: true
---

# Deployment & Installation Guide

The **CPI iFlow Analysis Agent** is distributed as a suite of Docker containers to ensure consistent execution environments across different host operating systems.

## Prerequisites

Before installing the agent, ensure your environment meets the following requirements:
- **Docker Engine** (v20.10+) & Docker Compose (v2.0+)
- **System Memory:** Minimum 8GB RAM (16GB recommended if running local LLMs).
- **Disk Space:** 20GB free space for images and sandboxed volumes.
- (Optional) **GPU:** NVIDIA Drivers and `nvidia-container-toolkit` for hardware-accelerated local inference.

## Installation via Docker Compose

The standard deployment method utilizes `docker-compose` to orchestrate the AI Agent frontend/backend, the MCP Server, and the isolated Redis cache.

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/cpi-iflow-analysis-agent.git
cd cpi-iflow-analysis-agent
```

### 2. Configure Environment Variables
Copy the template environment file:
```bash
cp .env.example .env
```
Edit the `.env` file to include your LLM API keys (e.g., OpenAI, Anthropic) or point to your local Ollama instance (see [Configuration Guide](configuration.md) for details).

### 3. Build and Start the Stack
Initialize the containers in detached mode:
```bash
docker-compose up -d --build
```

### 4. Verify Services
Check the logs to ensure all services started correctly without port binding errors:
```bash
docker-compose logs -f
```
The web interface should now be accessible at `http://localhost:3000`.

## Architecture of the Deployment Stack
- **`frontend` (Node.js/React):** Serves the chat interface and graph visualization UI.
- **`orchestrator` (Python/FastAPI):** Hosts the Agent, manages context history, and talks to the LLM.
- **`mcp-server` (Java/SpringBoot):** The strict sandboxed environment running the iFlow parsing libraries.
- **`redis`:** Ephemeral storage for session state and graph caching.

---

[Next: Configuration Guide ➔](configuration.md)
