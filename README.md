# QuantumLayer Platform

![QuantumLayer Logo](docs/assets/quantum-layer-logo.png)

> QuantumLayer is an AI-native Agent Operating System that enables you to compose, orchestrate, and deploy intelligent agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/quantumctl.svg)](https://www.npmjs.com/package/quantumctl)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/satishgonella2024/quantum-layer/ci.yml?branch=main)](https://github.com/satishgonella2024/quantum-layer/actions)

## Overview

QuantumLayer abstracts the complexity of building agent-based workflows, offering a programmable and observable runtime for AI systems. Design your agents through a simple YAML interface, orchestrate complex workflows with our PromptGraph engine, and deploy with confidence using built-in observability and memory architecture.

## Features

- 🤖 **Agent Runtime** - Create and run LLM-powered agents with memory and tool support
- 📊 **PromptGraph Engine** - DAG-based orchestration for complex agent workflows 
- 🔄 **QuantumForge** - Advanced orchestration with task decomposition and ensemble strategies
- 📝 **Memory Architecture** - Flexible storage options with semantic search capabilities
- 📈 **Observability** - Track tokens, cost, latency and behavior with rich visualizations
- 🛠️ **CLI tool** - Use `quantumctl` for development, debugging and deployment

## Installation

```bash
# Via Homebrew
brew install quantum-layer/quantumctl

# Via NPM
npm install -g quantumctl

# Via Docker
docker pull quantumlayer/quantumctl
```

## Quick Start

```bash
# Initialize a new agent
quantumctl init my-agent

# Edit your agent config
quantumctl edit my-agent

# Run your agent
quantumctl run my-agent

# Start the interactive shell
quantumctl shell
```

## Architecture

QuantumLayer's architecture consists of several layered components:

```
┌─────────────────────────────────────────────────────────┐
│                       User Interfaces                    │
│    CLI (quantumctl)    │   Web UI   │   Desktop App     │
├─────────────────────────────────────────────────────────┤
│                      QuantumForge                        │
│   (Orchestration, Task Decomposition, Ensemble Agents)   │
├─────────────────────────────────────────────────────────┤
│                     PromptGraph Engine                   │
│        (DAG Execution, Conditional Routing, Loops)       │
├─────────────────────────────────────────────────────────┤
│                      Agent Runtime                       │
│        (Execution, Memory, Tool Integration, HITL)       │
├─────────────────────────────────────────────────────────┤
│                    Provider Integrations                 │
│     OpenAI   │   Claude   │   Gemini   │   Ollama       │
└─────────────────────────────────────────────────────────┘
```

## Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Agent Configuration](docs/agent-config.md)
- [PromptGraph Tutorial](docs/prompt-graph.md)
- [CLI Reference](docs/cli-reference.md)
- [Memory Architecture](docs/memory.md)
- [Web UI Guide](docs/web-ui.md)

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

QuantumLayer is [MIT licensed](LICENSE).
