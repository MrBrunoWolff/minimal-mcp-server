#!/usr/bin/env bun
/**
 * Smoke-tests the built MCP server: starts dist/index.js over stdio, gives it a
 * moment to come up, and reports how to wire it into Claude Desktop.
 *
 * Was CommonJS using child_process; Bun.spawn replaces that, and awaiting a
 * timer replaces the setTimeout-plus-process.exit dance so the exit path is one
 * return rather than three handlers racing each other.
 *
 * The child stays `node`, deliberately. This package is published Node-targeted
 * (engines.node >=18, vite builds target node18) and Claude Desktop launches it
 * with `node`, so the smoke test has to exercise that shape. Running the bundle
 * under bun instead fails outright: the SDK's StdioServerTransport gets an
 * undefined process.stdin and throws before the server is up.
 */
import { resolve } from 'node:path';

const serverPath = resolve(import.meta.dir, '..', 'dist', 'index.js');

console.log('🧪 Testing MCP Server...');
console.log(`Server path: ${serverPath}`);
console.log('');

const server = Bun.spawn(['node', serverPath], {
  stdin: 'pipe',
  stdout: 'pipe',
  stderr: 'pipe',
});

// Surface anything the server complains about while starting.
const stderr = (async () => {
  for await (const chunk of server.stderr) {
    process.stderr.write(chunk);
  }
})();

await Bun.sleep(2000);

if (server.exitCode !== null) {
  console.error(`❌ Server exited early with code ${server.exitCode}`);
  await stderr;
  process.exit(1);
}

console.log('✅ Server started successfully!');
console.log('');
console.log('To test with Claude Desktop:');
console.log('1. Build the project: bun run build');
console.log('2. Add to Claude Desktop config:');
console.log(
  JSON.stringify(
    {
      mcpServers: {
        'minimal-mcp-server': { command: 'node', args: [serverPath] },
      },
    },
    null,
    2
  )
);
console.log('3. Restart Claude Desktop');
console.log('');
console.log('Available tools: example, calculate');

server.kill();
