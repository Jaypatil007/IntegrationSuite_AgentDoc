---
layout: default
title: Logging & Monitoring
parent: Operations
nav_order: 1.5
---

# Logging & Monitoring Configuration

Robust observability is key to diagnosing complex LLM interactions.

## Structured Logging

By default, the Python Orchestrator and the Java/Node MCP Server output logs in a unified, structured JSON format directly to `stdout`.

A typical log entry looks like this:

```json
{
  "timestamp": "2024-05-12T14:32:01Z",
  "level": "INFO",
  "service": "mcp-server",
  "trace_id": "req-98f2c3-4d2a",
  "event": "TOOL_INVOKED",
  "message": "Agent invoked get_node_config for node Process_Step_3",
  "duration_ms": 142
}
```

## Integrating with DataDog / Splunk

Because all services output standard structured JSON to `stdout`, they integrate perfectly with standard Kubernetes DaemonSets (like Promtail for Loki, or FluentBit for Splunk/Datadog).

## OpenTelemetry Distributed Tracing

For deep debugging of LLM reasoning latency, the Orchestrator supports OpenTelemetry (OTel).

When `OTEL_EXPORTER_OTLP_ENDPOINT` is set in the `.env` file, the orchestrator begins exporting traces.

### Example Spans captured:
1. `User_Query_Received`
2. `LLM_Inference`
3. `Tool_Execution_Request` -> (Crosses boundary to MCP Server)
4. `MCP_Parse_XML`
5. `LLM_Synthesis`
6. `Final_Response_Sent`

This allows administrators to see exactly where latency occurs—whether it's the external OpenAI API being slow, or a massive 50MB XML file taking a long time to parse on the local MCP server.

---

[⬅️ Previous: Operations & Troubleshooting](index.md) | [Next: Performance & Scaling ➔](performance.md)
