---
layout: default
title: Installation Guide
parent: Guides
nav_order: 1.5
---

# Advanced Installation Guide

While the standard `docker-compose` setup covers 90% of deployments, enterprise users may require deployment into a managed Kubernetes cluster.

## Deployment to Kubernetes

We provide `helm` charts for enterprise deployment.

### 1. Configure the `values.yaml`

Customize the deployment for your cluster:

```yaml
orchestrator:
  replicaCount: 3
  env:
    LLM_PROVIDER: "azure_openai"
mcpServer:
  replicaCount: 2
  resources:
    requests:
      cpu: 1000m
      memory: 2Gi
    limits:
      cpu: 2000m
      memory: 4Gi
redis:
  enabled: true
  architecture: "standalone"
```

### 2. Apply Kubernetes Secrets

Create the necessary secrets for your LLM APIs before applying the deployment.

```bash
kubectl create secret generic cpi-agent-secrets \
  --from-literal=OPENAI_API_KEY="sk-..." \
  --from-literal=AZURE_API_KEY="..."
```

### 3. Install the Helm Chart

```bash
helm install cpi-iflow-agent ./charts/cpi-agent -f my-values.yaml -n integration-tools
```

## Security Constraints Note

When deploying to Kubernetes, it is critical that the `mcp-server` pods are deployed with tight `SecurityContext` parameters:
- `runAsNonRoot: true`
- `allowPrivilegeEscalation: false`
- Network policies restricting all Egress traffic except the internal Redis instance.

---

[⬅️ Previous: Deployment Guide](index.md) | [Next: Configuration Guide ➔](configuration.md)
