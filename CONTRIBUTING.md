# Contributing to Minimal MCP Server Template

Thank you for your interest in contributing to this MCP server template! This document provides guidelines for contributing.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Start development: `npm run dev`

## Project Structure

- `src/` - Source code
  - `index.ts` - Main entry point
  - `server.ts` - MCP server setup
  - `tools/` - MCP tool implementations
  - `types/` - TypeScript type definitions
- `tests/` - Test files
- `bin/` - CLI scripts

## Adding New Tools

1. Create a new file in `src/tools/`
2. Define the tool schema and handler
3. Register the tool in `src/server.ts`
4. Add tests in `tests/tools/`

Example tool structure:
```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const myTool: Tool = {
  name: 'my_tool',
  description: 'Tool description',
  inputSchema: {
    // JSON schema for inputs
  }
};

export async function handleMyTool(args: any) {
  // Implementation
}
```

## Testing

- Write unit tests for all tools
- Ensure good test coverage
- Run `npm test` before submitting

## Code Style

- Use TypeScript
- Follow ESLint rules
- Add proper type annotations
- Write clear, descriptive comments

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Ensure all tests pass
5. Update documentation if needed
6. Submit a pull request

## Issues

When reporting issues:
- Use a clear, descriptive title
- Provide steps to reproduce
- Include relevant error messages
- Specify your environment (Node.js version, OS, etc.)

## Questions?

Feel free to open an issue for questions or discussion!
