import { describe, it, expect } from 'vitest';
import { exampleTool, handleExampleTool } from '../../src/tools/example.js';

describe('Example Tool', () => {
  it('should have correct tool definition', () => {
    expect(exampleTool.name).toBe('example');
    expect(exampleTool.description).toContain('example tool');
    expect(exampleTool.inputSchema.type).toBe('object');
    expect(exampleTool.inputSchema.properties).toHaveProperty('message');
  });

  it('should process message correctly', async () => {
    const result = await handleExampleTool({ message: 'Hello World' });
    
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('Hello World');
  });

  it('should repeat message multiple times', async () => {
    const result = await handleExampleTool({ 
      message: 'Test', 
      count: 3 
    });
    
    expect(result.content[0].text).toContain('Test | Test | Test');
  });

  it('should handle default count', async () => {
    const result = await handleExampleTool({ message: 'Single' });
    
    expect(result.content[0].text).toContain('Single');
    expect(result.content[0].text).not.toContain('|');
  });

  it('should throw error for invalid message', async () => {
    await expect(handleExampleTool({ message: '' }))
      .rejects.toThrow('Message must be a non-empty string');
  });

  it('should throw error for invalid count', async () => {
    await expect(handleExampleTool({ message: 'Test', count: 11 }))
      .rejects.toThrow('Count must be between 1 and 10');
  });
});
