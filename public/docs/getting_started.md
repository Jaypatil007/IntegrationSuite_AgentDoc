---
layout: default
title: Getting Started
nav_order: 2
---

# Getting Started

Welcome to the **CPI iFlow Analysis Agent**. This guide will walk you through your first analysis session using the AI agent.

## Prerequisites

Before starting your first session, ensure you have:
1. Access to the Agent Web UI (usually `http://localhost:3000` for local deployments).
2. An exported `.iwfl` archive file from your SAP BTP Integration Suite tenant.

## Step 1: Uploading an iFlow

1. Navigate to the main dashboard.
2. Click the **"Upload iFlow"** button in the center of the screen.
3. Select your `.iwfl` zip file.
4. The system will take 2-5 seconds to parse the binary. Upon completion, you will see a high-level graph of the integration flow appear on the right pane.

## Step 2: Running a Base Analysis

It is good practice to ask the agent to run a complete baseline analysis before diving into specific questions.

In the chat prompt, type:
> *"Run a baseline analysis on this integration flow."*

The agent will systematically call `get_graph_topology` and `detect_errors_and_warnings` to produce a high-level summary of:
- the number of external adapters
- the number of processing steps
- any immediate critical errors (like missing exception handlers).

## Step 3: Asking Targeted Questions

Once the baseline is established, you can query specific components.

**To debug a specific node:**
> *"Why is the node named `Call_Salesforce_OData` failing? What are its parameters?"*

**To analyze security:**
> *"Check the authentication methods used in all Sender HTTPS adapters. Are any of them using basic auth without a CSRF token requirement?"*

**To analyze flow logic:**
> *"What happens if the main `Process_Step` fails? Describe the configured exception handling path."*

## Understanding the Output

The Agent will respond with Markdown-formatted text. It uses the right-side Graph Visualization pane to highlight nodes it is currently analyzing, providing you a clear visual context of what the AI is "looking at".

---

[⬅️ Previous: Introduction](index.md) | [Next: Architecture Overview ➔](architecture/index.md)
