# CLI Reference

This document provides a comprehensive reference for the `quantumctl` command-line interface.

## Global Options

These options can be used with any command:

```bash
--help, -h        # Show help for a command
--version, -v     # Show CLI version
--config <path>   # Use alternative config file
--debug           # Enable debug logging
--json            # Output results as JSON
```

## Agent Commands

### Initialize a New Agent

```bash
quantumctl init [agent-name] [options]
```

Options:
- `--template, -t <template>`: Use a template from the registry
- `--provider, -p <provider>`: Specify LLM provider (openai, anthropic, etc.)

Example:
```bash
quantumctl init customer-support --template assistant --provider anthropic
```

### Edit an Agent

```bash
quantumctl edit <agent-name> [options]
```

Options:
- `--editor, -e <editor>`: Text editor to use

Example:
```bash
quantumctl edit customer-support --editor vim
```

### Run an Agent

```bash
quantumctl run <agent-name> [input] [options]
```

Options:
- `--interactive, -i`: Run in interactive mode
- `--debug, -d`: Show debug information
- `--stream, -s`: Stream the output
- `--prompt <prompt-name>`: Use a specific prompt
- `--trace, -t`: Show the reasoning trace

Examples:
```bash
# Run with direct input
quantumctl run tech-support "How do I reset my router?"

# Run in interactive mode
quantumctl run customer-support --interactive

# Run with a specific prompt
quantumctl run researcher "Climate change effects" --prompt detailed
```

## Provider Commands

### List Providers

```bash
quantumctl provider list
```

### Test Provider Connection

```bash
quantumctl provider test <provider>
```

Example:
```bash
quantumctl provider test openai
```

### List Available Models

```bash
quantumctl provider models <provider>
```

Example:
```bash
quantumctl provider models anthropic
```

### Add Provider Configuration

```bash
quantumctl provider add <provider> [options]
```

Options:
- `--key, -k <apiKey>`: API key for the provider
- `--default, -d`: Set as default provider

Example:
```bash
quantumctl provider add openai --key "sk-..." --default
```

## Registry Commands

### Search Registry

```bash
quantumctl registry search [query] [options]
```

Options:
- `--tag, -t <tags>`: Filter by tags (comma separated)

Example:
```bash
quantumctl registry search "customer support" --tag "business,support"
```

### Push Agent to Registry

```bash
quantumctl registry push <agent> [options]
```

Options:
- `--public, -p`: Make the agent public
- `--message, -m <message>`: Publish message

Example:
```bash
quantumctl registry push tech-support --public --message "Initial release"
```

### Pull Agent from Registry

```bash
quantumctl registry pull <agent> [options]
```

Options:
- `--version, -v <version>`: Specific version to pull

Example:
```bash
quantumctl registry pull research-assistant --version 1.2.0
```

## History Commands

```bash
quantumctl history [options]
```

Options:
- `--limit, -l <number>`: Limit number of history entries
- `--agent, -a <agent>`: Filter by agent name
- `--grep, -g <pattern>`: Filter by pattern
- `--json, -j`: Output as JSON
- `--replay, -r <sessionId>`: Replay a specific session

Examples:
```bash
# View recent history
quantumctl history --limit 20

# Filter history by agent
quantumctl history --agent customer-support

# Search history for a keyword
quantumctl history --grep "database"

# Replay a specific session
quantumctl history --replay sess_1234567890
```

## Shell Command

```bash
quantumctl shell [options]
```

Options:
- `--agent, -a <agent>`: Start with a specific agent
- `--debug, -d`: Enable debug mode

Example:
```bash
quantumctl shell --agent tech-support
```

Shell Commands:
- `.help`: Show available commands
- `.exit`: Exit the shell
- `.agent <name>`: Switch active agent
- `.list`: List available agents
- `.debug [on|off]`: Toggle debug mode
- `.history`: Show command history
- `.clear`: Clear the screen

## PromptGraph Commands

```bash
quantumctl graph [command] [options]
```

Subcommands:
- `init <name>`: Initialize a new PromptGraph
- `edit <name>`: Edit a PromptGraph
- `run <name>`: Run a PromptGraph
- `visualize <name>`: Generate a visualization
- `validate <name>`: Validate a PromptGraph

Examples:
```bash
# Initialize a new graph
quantumctl graph init customer-journey

# Run a graph with input
quantumctl graph run data-analysis --input '{"dataset": "sales-2023.csv"}'

# Visualize a graph
quantumctl graph visualize workflow --format png --output workflow.png
```