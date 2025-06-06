import { describe, it, expect } from 'vitest';
import { mathTool, handleMathTool } from '../../src/tools/math.js';

describe('Math Tool', () => {
  it('should have correct tool definition', () => {
    expect(mathTool.name).toBe('calculate');
    expect(mathTool.description).toContain('mathematical calculations');
    expect(mathTool.inputSchema.properties).toHaveProperty('operation');
    expect(mathTool.inputSchema.properties).toHaveProperty('a');
    expect(mathTool.inputSchema.properties).toHaveProperty('b');
  });

  it('should add two numbers', async () => {
    const result = await handleMathTool({ operation: 'add', a: 5, b: 3 });
    
    expect(result.content[0].text).toBe('5 + 3 = 8');
  });

  it('should subtract two numbers', async () => {
    const result = await handleMathTool({ operation: 'subtract', a: 10, b: 4 });
    
    expect(result.content[0].text).toBe('10 - 4 = 6');
  });

  it('should multiply two numbers', async () => {
    const result = await handleMathTool({ operation: 'multiply', a: 6, b: 7 });
    
    expect(result.content[0].text).toBe('6 × 7 = 42');
  });

  it('should divide two numbers', async () => {
    const result = await handleMathTool({ operation: 'divide', a: 15, b: 3 });
    
    expect(result.content[0].text).toBe('15 ÷ 3 = 5');
  });

  it('should handle division by zero', async () => {
    await expect(handleMathTool({ operation: 'divide', a: 10, b: 0 }))
      .rejects.toThrow('Division by zero is not allowed');
  });

  it('should handle decimal results', async () => {
    const result = await handleMathTool({ operation: 'divide', a: 10, b: 3 });
    
    expect(result.content[0].text).toBe('10 ÷ 3 = 3.3333333333333335');
  });
});
