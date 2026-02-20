---
layout: default
title: Appendix
nav_order: 98
has_children: false
---

# Appendix A: Supported SAP CPI Components

The Agent's parsing tools currently support rich metadata extraction for the following SAP CPI Adapter and Node types:

### Senders / Receivers
- HTTP / HTTPS
- OData V2/V4
- SFTP / FTP
- SOAP (1.x, RM)
- SuccessFactors
- Mail (SMTP, IMAP, POP3)
- ProcessDirect
- Kafka
- JDBC

### Flow Steps
- Content Modifier
- Groovy/JavaScript Scripting
- Message Mapping
- XSLT Mapping
- Request-Reply
- Send
- Multicast (Sequential / Parallel)
- Router
- Splitter / Gather
- Exception Sub-Process

*Note: Components not listed above will still be parsed as generic `Unknown_Node` structural blocks in the graph, preserving dependency mapping, but deep configuration parameter extraction will map as a generic JSON blob.*

---

[⬅️ Previous: Testing & Error Handling](../testing/index.md) | [Next: Roadmap ➔](../roadmap.md)
