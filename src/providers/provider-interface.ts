/**
 * Provider Interface - Base interface for LLM provider integrations
 */

import { AgentMessage, TokenCost } from '../types';

export interface ProviderInterface {
  /**
   * Generate a response using the LLM provider
   */
  generateResponse(messages: AgentMessage[], options?: ResponseOptions): Promise<ProviderResponse>;
  
  /**
   * Stream a response using the LLM provider
   */
  streamResponse(messages: AgentMessage[], callback: StreamCallback, options?: ResponseOptions): Promise<void>;
  
  /**
   * Get a list of available models from the provider
   */
  listModels(): Promise<ModelInfo[]>;
  
  /**
   * Estimate token usage for a request
   */
  estimateTokens(messages: AgentMessage[]): TokenCost;
  
  /**
   * Test connection to the provider
   */
  testConnection(): Promise<boolean>;
}

export interface ResponseOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
  tools?: ToolDefinition[];
  toolChoice?: string | null;
}

export interface ProviderResponse {
  content: string;
  toolCalls?: ToolCall[];
  tokenCost: TokenCost;
  raw?: any; // Raw response from the provider
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description?: string;
    parameters: Record<string, any>;
  };
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface ModelInfo {
  id: string;
  name: string;
  description?: string;
  contextWindow: number;
  maxOutputTokens?: number;
  supportsFunctions?: boolean;
}

export type StreamCallback = (chunk: string, toolCalls?: ToolCall[]) => void;
