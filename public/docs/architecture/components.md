---
layout: default
title: Core Components
parent: Architecture
nav_order: 3
---

# Core Components

The CPI iFlow Analysis Agent architecture is comprised of several distinct components working in concert.

## 1. The Frontend Application (React/Vite)

The user-facing application providing the Chat Interface and the Graph Visualization pane.
- **Chat Interface:** A standard streaming interface that renders Markdown and code blocks dynamically.
- **React Flow Renderer:** Takes structural JSON outputs from the MCP server and draws the DAG (Directed Acyclic Graph), allowing the user to visually inspect the iFlow.
- **State Management:** Manages the active session ID, tying the user's browser to the sandboxed file on the backend.

## 2. The AI Orchestrator (Python)

Built on LangChain or a custom ReAct (Reason + Act) loop, this service runs the language models.
- **Agent Prompts:** Contains strictly crafted system prompts preventing the LLM from executing non-analytical tasks.
- **Tool Discovery:** Queries the MCP Server on startup to register available tools dynamically.
- **Memory:** Utilizes standard sliding-window memory to remember conversation context without overflowing token limits.

## 3. The Model Context Protocol (MCP) Server

The secure boundary running the deterministic logic.
- **IFlow Parser (Java/Python):** Extracts the `.iwfl` ZIP, parses XML schemas, and builds the DAG.
- **Schema Validations:** Contains static `.xsd` schema definitions of SAP CPI components to instantly flag invalid XML blocks.
- **Sandboxing Engine:** Ensures that processing files never leak out of isolated directories.

## 4. Ephemeral Storage (Redis)

- **Session Context:** Stores the parsed graph JSON temporarily, keyed by a session UUID. This prevents the MCP server from having to unzip and re-parse the source file for every single chat query.

---

[⬅️ Previous: Data Flow](data_flow.md) | [Next: Security Model ➔](../security/index.md)
