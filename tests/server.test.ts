import { describe, it, expect } from 'bun:test';
import { createMCPServer } from '../src/server.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

describe('MCP Server', () => {
  it('should create server instance', () => {
    const server = createMCPServer();
    expect(server).toBeInstanceOf(Server);
  });

  it('should be properly configured', () => {
    const server = createMCPServer();
    // Test that server is created without throwing errors
    expect(server).toBeDefined();
    expect(typeof server).toBe('object');
  });
});
