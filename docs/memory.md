# Memory Architecture in QuantumLayer

This document explains how the memory system works in QuantumLayer and how to configure it effectively for your agents.

## Overview

Memory in QuantumLayer enables agents to maintain context across interactions and access relevant past information. The memory architecture is designed to be flexible, offering different storage types and scoping options.

## Memory Types

QuantumLayer supports several memory types, each with different characteristics:

### File-based Memory

Data is stored in local files, persisting across restarts:

```yaml
memory:
  type: file
  ttl: 3600 # 1 hour in seconds
  scope: session
```

File-based memory is the default and a good choice for most use cases. It provides persistence without external dependencies.

### In-Memory

Data is stored in RAM only, not persisting across restarts:

```yaml
memory:
  type: in-memory
  ttl: 1800 # 30 minutes in seconds
  scope: session
```

In-memory storage is useful for temporary agents or when persistence is not required.

### Vector Store

Data is stored in a vector database, enabling semantic search:

```yaml
memory:
  type: vector
  ttl: 0 # No expiration
  scope: global
  vectorStore:
    type: chroma
    connection:
      path: ./.quantum/memory/agent-name
```

Vector storage is ideal for agents that need to search through large amounts of contextual information.

### No Memory

Disable memory storage entirely:

```yaml
memory:
  type: none
```

Useful for stateless agents that don't need to remember previous interactions.

## Memory Scopes

The `scope` property determines how memory is partitioned and accessed:

### Global Scope

```yaml
scope: global
```

Memory is shared across all sessions with the agent. Use this when an agent should maintain consistent knowledge regardless of which user is interacting with it.

### Session Scope

```yaml
scope: session
```

Memory is isolated to a specific conversation session. This is the default and most commonly used scope, appropriate for most chatbots and assistants.

### Task Scope

```yaml
scope: task
```

Memory is limited to a single task or request. Once the task is complete, the memory is discarded. This is useful for agents that perform discrete operations.

## Time-to-Live (TTL)

The `ttl` property defines how long memory items should be retained, in seconds:

```yaml
ttl: 86400 # 24 hours
```

Special values:
- `0`: No expiration (keep forever)
- `-1`: Session only (clear on session end)

## Memory Management

### Memory Selection

When retrieving context for an agent, QuantumLayer uses different strategies depending on the memory type:

- **File/In-Memory**: Recent interactions are retrieved based on timestamps
- **Vector**: Semantic similarity is used to find relevant past interactions

### Memory Optimization

For large conversation histories, QuantumLayer will automatically:

1. Truncate conversations to fit token limits
2. Summarize older conversation segments
3. Prioritize recent or relevant interactions

## Programmatic Memory Access

In custom tools or applications, you can access the memory system programmatically:

```javascript
const { MemoryManager } = require('quantum-layer');

async function exampleMemoryAccess() {
  // Initialize memory manager with config
  const memoryConfig = {
    type: 'file',
    ttl: 3600,
    scope: 'session'
  };
  
  const memory = new MemoryManager(memoryConfig);
  
  // Store a memory item
  await memory.store('user_preference', {
    theme: 'dark',
    language: 'english'
  }, {
    source: 'user_settings',
    importance: 'high'
  });
  
  // Retrieve a memory item
  const preference = await memory.retrieve('user_preference');
  console.log(preference);
  
  // Search for relevant memory items
  const searchResults = await memory.search('language preferences', 3);
  console.log(searchResults);
}
```

## Vector Store Integration

When using vector memory, QuantumLayer supports several vector databases:

### Chroma Integration

```yaml
memory:
  type: vector
  vectorStore:
    type: chroma
    connection:
      path: ./.quantum/memory/agent-name
```

### Qdrant Integration

```yaml
memory:
  type: vector
  vectorStore:
    type: qdrant
    connection:
      url: http://localhost:6333
      collection_name: agent_memory
```

## Best Practices

1. **Choose the right scope**: Use session scope for most conversational agents, global for shared knowledge bases

2. **Set appropriate TTL**: Consider your use case - shorter for sensitive info, longer for knowledge that should persist

3. **Use vector memory for large contexts**: When your agent needs to reference a large knowledge base

4. **Monitor memory usage**: Watch for excessive memory consumption with large histories

5. **Clear unused memory**: Periodically run cleanup operations for long-running agents

```bash
# Clear memory for an agent
quantumctl memory clear agent-name

# View memory usage
quantumctl memory stats agent-name
```

## Advanced Memory Techniques

### Memory Hierarchies

For complex applications, you can implement memory hierarchies by having:

- Short-term memory (session scope with short TTL)
- Working memory (session scope with medium TTL)
- Long-term memory (global scope with long TTL)

### Semantic Indexing

When using vector stores, you can create custom indexing strategies:

```javascript
const { MemoryManager } = require('quantum-layer');

async function createSemanticIndex(documents) {
  const memory = new MemoryManager({
    type: 'vector',
    vectorStore: {
      type: 'chroma',
      connection: { path: './semantic-index' }
    }
  });
  
  // Create chunks and store with metadata
  for (const doc of documents) {
    const chunks = chunkDocument(doc.content);
    for (const [i, chunk] of chunks.entries()) {
      await memory.store(`doc:${doc.id}:chunk:${i}`, chunk, {
        source: doc.source,
        title: doc.title,
        chunkIndex: i,
        totalChunks: chunks.length
      });
    }
  }
}

// Example function to chunk documents
function chunkDocument(text, maxChunkSize = 1000) {
  // Implementation for chunking text into semantic units
}
```