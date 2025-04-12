# PromptGraph Tutorial

PromptGraph is QuantumLayer's workflow engine for creating complex agent interactions. This tutorial will help you understand how to create and use PromptGraphs effectively.

## What is a PromptGraph?

A PromptGraph is a directed acyclic graph (DAG) that defines the execution flow of multiple nodes. Each node performs a specific operation - such as running a prompt, checking a condition, or interacting with memory - and then passes control to the next node(s) in the graph.

This allows you to create sophisticated agent workflows that can:

- Branch based on user input or agent responses
- Chain multiple agents together for complex tasks
- Access and manipulate shared memory
- Use external tools for enhanced capabilities

## Basic Concepts

### Graph Structure

A PromptGraph consists of:

- An entry node where execution begins
- Multiple interconnected nodes that perform operations
- Edges defining the flow between nodes

### Node Types

QuantumLayer supports several types of nodes:

- **Prompt**: Executes an agent with a specific prompt
- **Condition**: Branches based on a logical condition
- **Tool**: Calls an external tool or function
- **Memory**: Reads from or writes to the memory store
- **Input**: Accepts input values into the graph
- **Output**: Returns results from the graph

## Creating a Simple PromptGraph

Here's a basic example of a PromptGraph that classifies a query and then routes it to specialized agents:

```yaml
name: query-router
version: 0.1.0
description: Routes queries to specialized agents based on classification

# Entry point node
entryNode: input_node

# Node definitions
nodes:
  # Input node - starting point
  input_node:
    id: input_node
    type: input
    config:
      inputKey: userQuery
    next: classify_query
  
  # Classify the query type
  classify_query:
    id: classify_query
    type: prompt
    config:
      agent: classifier
      prompt: |
        Classify the following query into exactly one of these categories:
        - technical (coding, programming, tech support)
        - factual (general knowledge, facts, information)
        - creative (writing, ideas, brainstorming)
        
        Reply with ONLY the category name, nothing else.
        
        Query: {{userQuery}}
    next:
      technical: technical_agent
      factual: factual_agent
      creative: creative_agent
  
  # Technical agent node
  technical_agent:
    id: technical_agent
    type: prompt
    config:
      agent: tech-expert
      prompt: |
        Answer this technical question with detailed information and examples:
        
        {{userQuery}}
    next: output_node
  
  # Factual agent node
  factual_agent:
    id: factual_agent
    type: prompt
    config:
      agent: knowledge-base
      prompt: |
        Provide factual, accurate information for this query:
        
        {{userQuery}}
    next: output_node
  
  # Creative agent node
  creative_agent:
    id: creative_agent
    type: prompt
    config:
      agent: creative-writer
      prompt: |
        Respond to this creative request with originality and imagination:
        
        {{userQuery}}
    next: output_node
  
  # Output node
  output_node:
    id: output_node
    type: output
    config:
      outputKey: result
```

## Advanced PromptGraph Features

### Conditional Branching

You can use condition nodes to branch based on variables or node results:

```yaml
check_condition:
  id: check_condition
  type: condition
  config:
    condition: "{{complexity}} > 5"
  next:
    true: complex_handler
    false: simple_handler
```

### Memory Operations

Memory nodes allow you to store and retrieve values during execution:

```yaml
store_result:
  id: store_result
  type: memory
  config:
    operation: store
    key: "analysis_result"
    value: "{{analysisOutput}}"
  next: next_node
```

### Parallel Execution

You can execute nodes in parallel by providing an array of next nodes:

```yaml
parallel_tasks:
  id: parallel_tasks
  type: prompt
  config:
    # configuration...
  next: [task1, task2, task3]
```

### Loops

Create loops by having nodes reference previous nodes in the chain:

```yaml
check_more_items:
  id: check_more_items
  type: condition
  config:
    condition: "{{hasMoreItems}}"
  next:
    true: process_item
    false: end_processing

process_item:
  id: process_item
  type: prompt
  config:
    # process current item
  next: check_more_items  # Back to the condition
```

## Running a PromptGraph

You can run a PromptGraph using the CLI:

```bash
quantumctl graph run query-router --input '{"userQuery": "How do I implement quicksort in Python?"}'
```

Or programmatically via the API:

```javascript
const { PromptGraph } = require('quantum-layer');

async function runGraph() {
  const graph = new PromptGraph('query-router');
  const result = await graph.execute({
    userQuery: "How do I implement quicksort in Python?"
  });
  console.log(result);
}

runGraph();
```

## Visualizing a PromptGraph

QuantumLayer can generate visualizations of your PromptGraphs. Use the CLI command:

```bash
quantumctl graph visualize query-router --format dot
```

This will generate a DOT file that can be visualized with Graphviz or other graph visualization tools.

## Best Practices

1. **Keep nodes focused**: Each node should do one thing well
2. **Use descriptive IDs**: Make node IDs intuitive and descriptive
3. **Add comments**: Document complex logic in graph and node descriptions
4. **Test thoroughly**: Test different paths through your graph
5. **Use conditions wisely**: Break complex conditions into multiple nodes

## Examples

See the [examples/prompt-graphs](../examples/prompt-graphs) directory for more complex PromptGraph examples.