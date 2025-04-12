/**
 * Tests for the Agent Runtime
 */

import { AgentRuntime } from '../agent-runtime';
import { AgentConfig } from '../../types';

// Mock config for testing
const mockConfig: AgentConfig = {
  name: 'test-agent',
  version: '0.1.0',
  provider: {
    name: 'openai',
    model: 'gpt-4o',
  },
  prompts: {
    default: {
      content: 'You are a test agent. User query: {{input}}',
      inputVariables: ['input'],
    },
  },
  defaultPrompt: 'default',
};

describe('AgentRuntime', () => {
  let runtime: AgentRuntime;

  beforeEach(() => {
    runtime = new AgentRuntime(mockConfig);
  });

  test('should initialize a session', async () => {
    const session = await runtime.initSession();
    
    expect(session).toBeDefined();
    expect(session.agentName).toBe('test-agent');
    expect(session.messages).toEqual([]);
    expect(session.startTime).toBeDefined();
    expect(session.endTime).toBeUndefined();
  });

  test('should process input and add messages to session', async () => {
    const response = await runtime.processInput('Hello world');
    
    // This is just testing the placeholder implementation
    expect(response).toContain('Hello world');
    
    // Check that the session has messages
    const session = runtime.endSession();
    expect(session?.messages.length).toBe(2);
    expect(session?.messages[0].role).toBe('user');
    expect(session?.messages[0].content).toBe('Hello world');
    expect(session?.messages[1].role).toBe('assistant');
  });

  test('should end a session', async () => {
    await runtime.initSession();
    const session = runtime.endSession();
    
    expect(session).toBeDefined();
    expect(session?.endTime).toBeDefined();
    
    // Should return null when ending a session that's already ended
    const nullSession = runtime.endSession();
    expect(nullSession).toBeNull();
  });

  test('should calculate token costs', () => {
    const costs = runtime.getTokenCost();
    
    expect(costs).toBeDefined();
    expect(costs.promptTokens).toBe(0); // This is just the placeholder implementation
    expect(costs.completionTokens).toBe(0);
    expect(costs.totalTokens).toBe(0);
    expect(costs.estimatedCost).toBe(0);
  });
});