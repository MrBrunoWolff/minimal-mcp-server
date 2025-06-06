#!/usr/bin/env node

/**
 * Simple test script to verify the MCP server is working correctly
 */

const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, '..', 'dist', 'index.js');

console.log('🧪 Testing MCP Server...');
console.log(`Server path: ${serverPath}`);
console.log('');

// Start the server process
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let errorOutput = '';

server.stdout.on('data', (data) => {
  output += data.toString();
});

server.stderr.on('data', (data) => {
  errorOutput += data.toString();
  console.log('Server output:', data.toString());
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Send a simple MCP message to test
setTimeout(() => {
  console.log('✅ Server started successfully!');
  console.log('');
  console.log('To test with Claude Desktop:');
  console.log('1. Build the project: npm run build');
  console.log('2. Add to Claude Desktop config:');
  console.log(JSON.stringify({
    "mcpServers": {
      "minimal-mcp-server": {
        "command": "node",
        "args": [path.resolve(serverPath)]
      }
    }
  }, null, 2));
  console.log('3. Restart Claude Desktop');
  console.log('');
  console.log('Available tools: example, calculate');
  
  // Kill the server
  server.kill('SIGTERM');
  process.exit(0);
}, 2000);

// Handle script termination
process.on('SIGINT', () => {
  console.log('\nStopping test...');
  server.kill('SIGTERM');
  process.exit(0);
});
