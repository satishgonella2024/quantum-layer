# Web User Interface Guide

This document provides information about using the QuantumLayer Web UI for managing and monitoring your agents.

## Overview

The QuantumLayer Web UI provides a graphical interface for:

- Creating and editing agents
- Running and testing agents
- Visualizing and designing PromptGraphs
- Monitoring agent performance and metrics
- Exploring agent execution history

## Installation

### Running the Web Server

```bash
# Start the web server
quantumctl serve

# Start with specific host and port
quantumctl serve --host 0.0.0.0 --port 3030
```

By default, the server runs on http://localhost:3000

### Desktop Application

Alternatively, you can use the desktop application:

```bash
# Install the desktop app
npm install -g quantum-desktop

# Run the desktop app
quantum-desktop
```

## User Interface Sections

### Dashboard

The dashboard provides an overview of your QuantumLayer environment:

- Agent summary and quick access
- Recent execution statistics
- System status and metrics
- Resource usage (tokens, API calls)

### Agent Management

The Agents section allows you to manage your agents:

- Create new agents from templates
- Edit existing agents with the configuration editor
- Clone and modify agents
- Import/export agent configurations
- Test agents with different inputs

### PromptGraph Editor

The visual PromptGraph editor allows you to design complex workflows:

- Drag-and-drop node creation
- Visual connection of nodes
- Node configuration through forms
- Real-time validation
- Input/output simulation
- Export to YAML or JSON

### History and Logs

Explore past executions and performance:

- Session history with filtering
- Detailed execution logs
- Token usage and cost tracking
- Response time analysis
- Memory access patterns

### Settings

Configure the QuantumLayer environment:

- Provider API keys and defaults
- Memory storage options
- Registry configuration
- Theme and UI preferences

## Working with Agents

### Creating a New Agent

1. Click the "New Agent" button in the Agents section
2. Select a template or start from scratch
3. Configure the basic settings and provider
4. Define prompts in the prompt editor
5. Configure memory and tools if needed
6. Click "Save" to create the agent

### Testing an Agent

1. Navigate to the agent detail page
2. Enter a test input in the "Test" panel
3. Click "Run" to execute the agent
4. View the response and execution details
5. Check token usage and performance metrics

### Managing Memory

1. Navigate to the agent detail page
2. Click the "Memory" tab
3. View current memory contents
4. Clear specific entries or all memory
5. Export memory for backup

## Working with PromptGraphs

### Creating a New PromptGraph

1. Navigate to the "PromptGraphs" section
2. Click "New PromptGraph"
3. Set a name and description
4. Add nodes using the toolbar
5. Connect nodes by dragging between endpoints
6. Configure each node's settings
7. Save the graph

### Running a PromptGraph

1. Select the PromptGraph from the list
2. Click the "Run" tab
3. Enter input values for the graph
4. Click "Execute" to run the graph
5. View the execution results and node outputs

### Analyzing Graph Execution

1. Run the graph with the "Debug" option enabled
2. View the execution path highlighted in the graph
3. Check individual node inputs/outputs
4. See variable values at each step
5. Identify bottlenecks or errors

## Monitoring and Analytics

### Token Usage

Track token consumption across agents:

- Daily/monthly token usage charts
- Cost estimates by provider and model
- Usage breakdown by agent and operation
- Set and monitor usage limits

### Performance Metrics

Analyze agent performance:

- Response time distribution
- Error rates and types
- Memory usage patterns
- Tool call frequency

### Export Reports

Generate reports for analysis:

1. Navigate to the Analytics section
2. Set the date range and filters
3. Select metrics to include
4. Click "Generate Report"
5. Download in PDF, CSV, or JSON format

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| New Agent | Ctrl+N |
| Save | Ctrl+S |
| Run/Execute | Ctrl+Enter |
| Stop Execution | Esc |
| Zoom In (Graph) | Ctrl++ |
| Zoom Out (Graph) | Ctrl+- |
| Pan Graph | Space+Drag |
| Select Multiple Nodes | Shift+Click |
| Delete Selected | Delete |
| Search | Ctrl+F |
| Show Help | F1 |

## Troubleshooting

### Common Issues

- **Connection Error**: Check your network and API key configuration
- **Graph Validation Failed**: Look for missing connections or required fields
- **High Token Usage**: Check for inefficient prompts or excessive requests
- **Slow Response Times**: Consider using a faster model or optimizing your graph

### Getting Help

In the Web UI, you can access help in several ways:

- Click the "?" icon in any section
- Use the "Help" menu in the top navigation
- Check the "Troubleshooting" section in Settings

## Next Steps

- [API Reference](api-reference.md) - Learn how to integrate the UI with custom applications
- [Advanced UI Features](advanced-ui.md) - Discover power-user features and customizations