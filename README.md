# Minimal MCP Server Template

A comprehensive template for creating Model Context Protocol (MCP) servers using TypeScript, Vite, and Vitest. Optimized for **Bun** with npm compatibility.

## 🚀 Quick Start

### Create a New MCP Server (Recommended)

```bash
# Scaffold a new server
bunx minimal-mcp-server create my-mcp-server

# Navigate to your project
cd my-mcp-server

# Start developing
bun run dev
```

### Alternative: Clone This Repository

```bash
git clone https://github.com/MrBrunoWolff/minimal-mcp-server.git
cd minimal-mcp-server
bun install
```

## ✨ Features

- 🚀 **TypeScript** - Full type safety and modern JavaScript features
- ⚡ **Vite** - Fast build tool and development server  
- 🧪 **Vitest** - Fast unit testing framework
- 🏃 **Bun** - Ultra-fast JavaScript runtime (npm compatible)
- 🔧 **ESLint & Prettier** - Code linting and formatting
- 📦 **Ready to publish** - Pre-configured for npm publishing
- 🎯 **MCP SDK** - Built on the official Model Context Protocol SDK
- 🛠️ **CLI Tool** - One-command project creation
- 📚 **Complete Documentation** - Getting started guide and examples
- ✅ **15+ Tests** - Comprehensive test coverage

## 🏗️ Project Structure

```text
my-mcp-server/
├── src/
│   ├── index.ts          # Main entry point
│   ├── server.ts         # MCP server setup
│   ├── tools/            # Your MCP tools
│   │   ├── example.ts    # Example text processing tool
│   │   └── math.ts       # Mathematical calculations tool
│   └── types/            # TypeScript type definitions
├── tests/                # Comprehensive test suite
├── docs/                 # Documentation
├── examples/             # Usage examples
└── dist/                 # Built output
```

## 🛠️ Development Commands

```bash
# Development (with hot reload)
bun run dev              # Start dev server

# Testing
bun test                 # Run tests
bun test --watch         # Watch mode
bun test --coverage      # With coverage

# Building
bun run build            # Build for production
bun run type-check       # TypeScript type checking

# Code Quality
bun run lint             # Lint code
bun run format           # Format code
bun run lint:fix         # Auto-fix linting issues

# Server Testing
bun run test:server      # Test server functionality
bun run start            # Start built server
```

## 🎯 Example Tools Included

### Text Processing Tool
```typescript
// Process text with various operations
{
  "name": "process_text",
  "arguments": {
    "text": "Hello World",
    "operation": "reverse"
  }
}
// Returns: "dlroW olleH"
```

### Mathematical Tool
```typescript
// Perform calculations
{
  "name": "calculate",
  "arguments": {
    "expression": "2 + 3 * 4"
  }
}
// Returns: 14
```

## 🔧 Claude Desktop Integration

Add this to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "node",
      "args": ["/path/to/your/project/dist/index.js"],
      "env": {}
    }
  }
}
```

## 📦 What You Get

When you create a new project with this template:

- **Complete MCP Server**: Ready to run with example tools
- **TypeScript Setup**: Modern configuration with type safety
- **Development Environment**: Hot reload, testing, linting
- **Example Tools**: Text processing and math calculations
- **Test Suite**: 15+ comprehensive tests
- **Build System**: Optimized Vite configuration
- **Documentation**: Getting started guide and API docs
- **Claude Integration**: Ready-to-use configuration examples

## 🚀 Publishing Your MCP Server

### 1. Prepare for Publication

```bash
# Build and test
bun run build
bun test
bun run lint

# Update package.json with your details
# - name: your-mcp-server-name
# - description: your server description
# - author: your name
# - repository: your repository URL
```

### 2. Publish to npm

```bash
# Login to npm
npm login

# Publish
npm publish
```

### 3. Test Your Published Package

```bash
# Test creating a project with your package
bunx your-package-name create test-project
cd test-project
bun run dev
```

## 🔄 Updating Your Template

To keep your MCP server up to date:

```bash
# Pull latest changes from template
git remote add template https://github.com/MrBrunoWolff/minimal-mcp-server.git
git fetch template
git merge template/main
```

## 📋 Publishing Checklist

Before publishing your MCP server:

- [ ] **Tests Pass**: All 15+ tests should pass
- [ ] **Build Works**: `bun run build` completes without errors
- [ ] **Linting Clean**: `bun run lint` passes
- [ ] **Types Valid**: `bun run type-check` passes
- [ ] **Package Name**: Choose unique name on npm
- [ ] **Documentation**: Update README with your server details
- [ ] **Repository**: Push to GitHub/GitLab
- [ ] **Version**: Follow semantic versioning

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/MrBrunoWolff/minimal-mcp-server/issues)
- **Documentation**: [Getting Started Guide](docs/GETTING_STARTED.md)
- **Examples**: [Example Configurations](examples/)

## ⭐ Why This Template?

- **Battle-tested**: 15+ comprehensive tests
- **Modern Stack**: TypeScript + Vite + Vitest + Bun
- **Developer Experience**: Hot reload, type safety, linting
- **Production Ready**: Optimized builds, CI/CD pipeline
- **Community**: Open source with active maintenance
- **Fast Setup**: One command to create new projects

---

**Happy coding! 🎉** Start building your MCP server in seconds with modern TypeScript tooling.
