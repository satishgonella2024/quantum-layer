# Agent Configuration Reference

This document provides detailed information about configuring agents in QuantumLayer.

## Configuration File Format

Agent configurations are stored as YAML files. By default, these files are located in `~/.quantum/agents/`. A typical agent configuration includes the following sections:

- Basic information (name, version, description)
- Provider configuration
- Memory configuration
- Tools configuration
- Prompts

## Basic Structure

```yaml
name: agent-name
version: 0.1.0
description: Description of the agent's purpose

provider:
  # Provider configuration

memory:
  # Memory configuration

tools:
  # Tools configuration

prompts:
  # Available prompts

defaultPrompt: default
```

## Provider Configuration

The `provider` section configures the LLM provider to use with this agent.

```yaml
provider:
  name: openai        # Provider name: 'openai', 'anthropic', 'gemini', 'ollama'
  model: gpt-4o       # Model identifier
  apiKey: optional-api-key  # Optional: Uses environment variable if not specified
  options:            # Provider-specific options
    temperature: 0.7
    max_tokens: 1000
    top_p: 0.95
```

### Supported Providers

- **openai**: OpenAI models (GPT-4o, GPT-4, GPT-3.5-Turbo)
- **anthropic**: Anthropic models (Claude 3 Opus, Sonnet, Haiku)
- **gemini**: Google's Gemini models
- **ollama**: Local models through Ollama

## Memory Configuration

The `memory` section defines how the agent stores and retrieves context information.

```yaml
memory:
  type: file          # Memory type: 'file', 'in-memory', 'vector', 'none'
  ttl: 3600           # Time-to-live in seconds (0 = infinite)
  scope: session      # Scope: 'global', 'session', 'task'
  vectorStore:        # Only needed for 'vector' type
    type: chroma      # Vector store type: 'chroma', 'qdrant'
    connection:       # Connection parameters
      path: ./.quantum/memory/agent-name
```

### Memory Types

- **file**: Stores memory in local files (default)
- **in-memory**: Keeps memory in RAM only (lost on restart)
- **vector**: Uses a vector database for semantic search
- **none**: No memory persistence

## Tools Configuration

The `tools` section defines external capabilities the agent can use.

```yaml
tools:
  - name: weather_lookup       # Tool name
    description: "Look up current weather"  # Description (shown to LLM)
    type: function             # Tool type: 'function', 'http', 'shell', 'custom'
    handler: tools/weather.js  # Path to implementation
    parameters:                # Schema for parameters
      location:
        type: string
        description: "City name or coordinates"
      units:
        type: string
        description: "Units (metric/imperial)"
        default: "metric"
    returnType: object         # Optional: type hint for return value
```

## Prompts

The `prompts` section defines templates for agent instructions.

```yaml
prompts:
  default:                     # Prompt name
    content: |
      You are a helpful assistant.
      
      {{#if memory}}           # Handlebars conditional
      Previous context:
      {{memory}}               # Variable substitution
      {{/if}}
      
      User query: {{input}}     # Required input variable
    inputVariables:            # Declare all variables used in template
      - input
      - memory
  
  specialized:                 # Additional named prompts
    content: |
      You are a specialized assistant.
      # ...
```

### Template Variables

- `{{input}}`: The user's input text
- `{{memory}}`: Relevant context from memory
- `{{current_date}}`: Current date/time
- `{{agent_name}}`: Name of the agent
- Custom variables can be defined and passed at runtime

## Default Prompt

The `defaultPrompt` field specifies which prompt to use when not explicitly specified.

```yaml
defaultPrompt: default
```

## Complete Example

See the [examples/agents](../examples/agents) directory for complete agent configuration examples.
