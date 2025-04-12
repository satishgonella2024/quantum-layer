/**
 * Tests for the Memory Manager
 */

import { MemoryManager } from '../manager';
import { MemoryConfig } from '../../types';

describe('MemoryManager', () => {
  describe('in-memory storage', () => {
    const config: MemoryConfig = {
      type: 'in-memory',
      ttl: 60, // 1 minute TTL
      scope: 'session',
    };
    
    let memory: MemoryManager;
    
    beforeEach(() => {
      memory = new MemoryManager(config);
    });
    
    test('should store and retrieve items', async () => {
      const testData = { name: 'test-item', value: 42 };
      await memory.store('test-key', testData);
      
      const retrieved = await memory.retrieve('test-key');
      expect(retrieved).toEqual(testData);
    });
    
    test('should return null for non-existent keys', async () => {
      const retrieved = await memory.retrieve('nonexistent-key');
      expect(retrieved).toBeNull();
    });
    
    test('should respect TTL for items', async () => {
      // Create memory with very short TTL
      const shortMemory = new MemoryManager({
        ...config,
        ttl: 0.1, // 100ms TTL
      });
      
      await shortMemory.store('expiring-key', 'This will expire');
      
      // Should retrieve before expiration
      let retrieved = await shortMemory.retrieve('expiring-key');
      expect(retrieved).toBe('This will expire');
      
      // Wait for TTL to expire
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Should be null after expiration
      retrieved = await shortMemory.retrieve('expiring-key');
      expect(retrieved).toBeNull();
    });
  });
  
  describe('no memory storage', () => {
    const config: MemoryConfig = {
      type: 'none',
    };
    
    let memory: MemoryManager;
    
    beforeEach(() => {
      memory = new MemoryManager(config);
    });
    
    test('should always return null regardless of storage', async () => {
      await memory.store('test-key', 'test-value');
      const retrieved = await memory.retrieve('test-key');
      expect(retrieved).toBeNull();
    });
  });
});