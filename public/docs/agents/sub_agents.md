---
layout: default
title: Sub-Agents
parent: Agents
nav_order: 2
---

# Sub-Agents

While the Orchestrator Agent handles general user queries, specific, cognitively dense tasks are delegated to specialized **Sub-Agents**. This multi-agent architecture improves accuracy by confining specific reasoning tasks to agents with highly tailored system prompts.

## Available Sub-Agents

### 1. The Security Reviewer Agent
- **Trigger:** Invoked when queries involve terms like "security," "credentials," "passwords," "auth," or when processing external inbound adapters.
- **Responsibility:** Strictly audits configuration payloads for plaintext secrets, weak authentication schemas, and missing SSL/TLS parameters.
- **Constraints:** Cannot generate architectural recommendations; strictly outputs risk assessments.

### 2. The Performance Analyzer Agent
- **Trigger:** Invoked when queries map to "slow," "bottleneck," "optimize," or "timeout."
- **Responsibility:** Evaluates the execution graph for anti-patterns. For instance, finding large loops containing sequential external HTTP calls instead of using local multicast or batching mechanisms.
- **Output:** Generates simulated bottlenecks and algorithmic restructuring recommendations.

### 3. The Documentation Generator Agent (Future Scope)
- **Trigger:** Explicit user request to document the integration.
- **Responsibility:** Automatically iterates through every node in the DAG, producing structured Markdown tables of parameters, input/output structures, and narrative descriptions of the business logic.

## Why Multi-Agent?

Passing thousands of lines of integration context to a single LLM prompt instructing it to simultaneously be a security auditor, a performance architect, and an exploratory debugger leads to "lost in the middle" phenomena and degraded reasoning.

By isolating tasks to Sub-Agents, we ensure:
- **Tighter System Prompts:** A prompt focusing only on finding HTTP security flaws performs significantly better than a generic programming prompt.
- **Independent Verification:** Sub-agents can double-check the Orchestrator's initial assumptions.

---

[⬅️ Previous: Agent Design](index.md) | [Next: MCP Integration ➔](../tools/index.md)
