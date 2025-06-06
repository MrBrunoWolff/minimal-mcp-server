# Getting Started with Minimal MCP Server

This guide will walk you through creating your first MCP (Model Context Protocol) server using this template.

## Prerequisites

- Node.js 18 or higher
- npm, yarn, or bun

## Quick Start

### Method 1: Use the CLI (Recommended)

```bash
# Create a new MCP server project
npx create-mcp-server my-awesome-mcp-server
cd my-awesome-mcp-server

# Start development
npm run dev
```

### Method 2: Clone the Template

```bash
git clone https://github.com/your-username/minimal-mcp-server.git my-mcp-server
cd my-mcp-server
npm install
npm run dev
```

## Understanding the Template Structure

### Core Files

1. **`src/index.ts`** - Entry point that starts the MCP server
2. **`src/server.ts`** - Main server configuration and tool registration
3. **`src/tools/`** - Directory containing your tool implementations
4. **`src/types/`** - TypeScript type definitions

### Example Tools Included

The template comes with two example tools:

1. **Example Tool** (`src/tools/example.ts`)
   - Demonstrates basic text processing
   - Shows input validation
   - Illustrates proper error handling

2. **Math Tool** (`src/tools/math.ts`)
   - Performs basic calculations
   - Shows enum-based inputs
   - Demonstrates numeric operations

## Creating Your First Custom Tool

Let's create a simple "hello" tool:

1. Create `src/tools/hello.ts`:

```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { MCPToolResponse } from '../types/index.js';

export const helloTool: Tool = {
  name: 'hello',
  description: 'Greets the user with a personalized message',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the person to greet'
      },
      formal: {
        type: 'boolean',
        description: 'Whether to use formal greeting',
        default: false
      }
    },
    required: ['name']
  }
};

interface HelloToolArgs {
  name: string;
  formal?: boolean;
}

export async function handleHelloTool(args: HelloToolArgs): Promise<MCPToolResponse> {
  const { name, formal = false } = args;
  
  const greeting = formal ? `Good day, ${name}!` : `Hello, ${name}!`;
  
  return {
    content: [
      {
        type: 'text',
        text: greeting
      }
    ]
  };
}
```

2. Register the tool in `src/server.ts`:

```typescript
// Add import
import { helloTool, handleHelloTool } from './tools/hello.js';

// Add to tools list
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      exampleTool,
      mathTool,
      helloTool  // Add here
    ],
  };
});

// Add to tool handler
switch (name) {
  case 'example':
    return await handleExampleTool(args as any) as any;
  case 'calculate':
    return await handleMathTool(args as any) as any;
  case 'hello':  // Add this case
    return await handleHelloTool(args as any) as any;
  default:
    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
}
```

3. Create tests in `tests/tools/hello.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { helloTool, handleHelloTool } from '../../src/tools/hello.js';

describe('Hello Tool', () => {
  it('should greet informally by default', async () => {
    const result = await handleHelloTool({ name: 'Alice' });
    expect(result.content[0].text).toBe('Hello, Alice!');
  });

  it('should greet formally when requested', async () => {
    const result = await handleHelloTool({ name: 'Bob', formal: true });
    expect(result.content[0].text).toBe('Good day, Bob!');
  });
});
```

## Development Workflow

### Running in Development Mode

```bash
npm run dev
```

This watches for changes and rebuilds automatically.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Linting and Formatting

```bash
# Check for linting issues
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Building for Production

```bash
npm run build
```

This creates optimized builds in the `dist/` directory.

## Integrating with Claude Desktop

Once your server is built, you can integrate it with Claude Desktop:

1. Build your server:
   ```bash
   npm run build
   ```

2. Find your Claude Desktop config file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

3. Add your server configuration:
   ```json
   {
     "mcpServers": {
       "my-awesome-server": {
         "command": "node",
         "args": ["/absolute/path/to/your/project/dist/index.js"]
       }
     }
   }
   ```

4. Restart Claude Desktop

## Best Practices

### Tool Design

1. **Clear Descriptions**: Write descriptive tool names and descriptions
2. **Input Validation**: Always validate inputs in your tool handlers
3. **Error Handling**: Use try-catch blocks and meaningful error messages
4. **Type Safety**: Define proper TypeScript interfaces for your tool arguments

### Project Organization

1. **One Tool Per File**: Keep tools in separate files for maintainability
2. **Comprehensive Tests**: Write tests for all tools and edge cases
3. **Documentation**: Document your tools with JSDoc comments
4. **Type Definitions**: Use the `types/` directory for shared interfaces

### Performance

1. **Async Operations**: Make tool handlers async for I/O operations
2. **Error Boundaries**: Handle errors gracefully without crashing the server
3. **Resource Management**: Clean up resources properly

## Common Patterns

### File System Operations

```typescript
import { promises as fs } from 'fs';
import { join } from 'path';

export async function handleFileReadTool(args: FileReadArgs): Promise<MCPToolResponse> {
  try {
    const content = await fs.readFile(args.path, 'utf-8');
    return {
      content: [{ type: 'text', text: content }]
    };
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}
```

### HTTP Requests

```typescript
export async function handleHttpGetTool(args: HttpGetArgs): Promise<MCPToolResponse> {
  try {
    const response = await fetch(args.url);
    const data = await response.text();
    return {
      content: [{ type: 'text', text: data }]
    };
  } catch (error) {
    throw new Error(`HTTP request failed: ${error.message}`);
  }
}
```

## Troubleshooting

### Common Issues

1. **"Module not found" errors**: Ensure you're using `.js` extensions in imports
2. **TypeScript errors**: Check that all types are properly defined
3. **Server won't start**: Verify Node.js version is 18 or higher
4. **Claude can't connect**: Check file paths are absolute in config

### Debugging

1. **Server Logs**: Check console output when running the server
2. **Claude Logs**: Check Claude Desktop logs for connection issues
3. **Test Isolation**: Test tools individually with unit tests

## Next Steps

- Explore the [MCP Documentation](https://modelcontextprotocol.io/)
- Study the [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- Join the MCP community for support and examples
- Publish your server to npm for others to use

Happy building! 🚀
