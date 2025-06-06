import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMCPServer } from './server.js';

async function main() {
  // Create the MCP server
  const server = createMCPServer();

  // Create transport (stdio for command line usage)
  const transport = new StdioServerTransport();

  // Connect server to transport
  await server.connect(transport);
  
  console.error('MCP Server started successfully');
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.error('Shutting down MCP server...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.error('Shutting down MCP server...');
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
